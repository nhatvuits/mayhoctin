/* May Học Tin: máy chủ nhỏ cho Bảng góp ý (Cloudflare Worker + KV, gói miễn phí).
   Cần cấu hình trong Cloudflare:
     - KV binding tên  FB         (nơi lưu góp ý)
     - Secret     tên  ADMIN_KEY  (mật khẩu quản trị, chỉ chủ trang biết)
     - Biến (không bắt buộc)  MODERATE = "0" để góp ý hiện ngay không cần duyệt (mặc định: phải duyệt)
   Đường dẫn:
     GET    /notes            danh sách góp ý đã duyệt; kèm header x-admin-key thì thấy cả góp ý chờ duyệt
     POST   /notes            gửi một góp ý mới
     POST   /notes/<id>       (quản trị) duyệt, phản hồi, đổi trạng thái: {ap,st,reply}
     DELETE /notes/<id>       xóa: quản trị (x-admin-key) hoặc chính người viết (x-note-token)
   Mọi góp ý nằm trong một khóa KV duy nhất ("notes"); đủ cho vài trăm góp ý. */
const MAX_NOTES = 500, MAX_DAY = 200, MAX_BYTES = 60000;
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'GET,POST,DELETE,OPTIONS', 'access-control-allow-headers': 'content-type,x-admin-key,x-note-token', 'access-control-max-age': '86400' };
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...CORS } });
const isAdmin = (req, env) => { const k = req.headers.get('x-admin-key') || ''; return !!env.ADMIN_KEY && k.length >= 6 && k === env.ADMIN_KEY; };
const load = async env => { try { const d = await env.FB.get('notes', 'json'); if (d && Array.isArray(d.notes)) return d; } catch (e) {} return { notes: [], day: '', n: 0 }; };
const pub = n => ({ id: n.id, t: n.t, who: n.who, cat: n.cat, txt: n.txt, s: n.s, st: n.st || 0, reply: n.reply || '', rt: n.rt || 0, ap: n.ap ? 1 : 0 });
function clean(b) {
  if (!b || typeof b !== 'object') return null;
  const id = String(b.id || ''); if (!/^g[a-z0-9]{6,24}$/.test(id)) return null;
  const who = b.who === 'par' ? 'par' : 'kid', cat = ['like', 'idea', 'fix', 'other'].includes(b.cat) ? b.cat : 'other';
  const txt = String(b.txt || '').slice(0, 300), tok = String(b.tok || '').slice(0, 40);
  const s = [];
  if (Array.isArray(b.s)) for (const k of b.s.slice(0, 400)) {
    if (!Array.isArray(k) || !Array.isArray(k[2])) continue;
    const p = k[2].slice(0, 1200).map(v => Math.max(0, Math.min(1000, Math.round(+v) || 0)));
    if (p.length >= 2 && p.length % 2 === 0) s.push([Math.max(-1, Math.min(5, Math.round(+k[0]) || 0)), Math.max(2, Math.min(60, Math.round(+k[1]) || 8)), p]);
  }
  if (!txt.trim() && !s.length) return null;
  return { id, t: Date.now(), who, cat, txt, s, tok, st: 0, reply: '', rt: 0, ap: 0 };
}
export default {
  async fetch(req, env) {
    try {
      if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
      if (!env.FB) return json({ ok: false, err: 'no-kv' }, 500);
      const url = new URL(req.url), parts = url.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
      if (parts[0] !== 'notes') return json({ ok: true, name: 'may-hoc-tin-gopy' });
      const admin = isAdmin(req, env), id = parts[1] || '';
      if (req.method === 'GET' && !id) {
        const d = await load(env);
        return json({ ok: true, admin, moderate: env.MODERATE !== '0', notes: d.notes.filter(n => admin || n.ap).map(pub) });
      }
      if (req.method === 'POST' && !id) {
        const raw = await req.text(); if (raw.length > MAX_BYTES) return json({ ok: false, err: 'too-big' }, 413);
        let body; try { body = JSON.parse(raw); } catch (e) { return json({ ok: false, err: 'bad-json' }, 400); }
        const n = clean(body); if (!n) return json({ ok: false, err: 'invalid' }, 400);
        const d = await load(env), day = new Date().toISOString().slice(0, 10);
        const old = d.notes.find(x => x.id === n.id); if (old) return json({ ok: true, note: pub(old), dup: true });
        if (d.day !== day) { d.day = day; d.n = 0; }
        if (d.notes.length >= MAX_NOTES || d.n >= MAX_DAY) return json({ ok: false, err: 'full' }, 507);
        n.ap = env.MODERATE === '0' ? 1 : 0; d.notes.push(n); d.n++;
        await env.FB.put('notes', JSON.stringify(d));
        return json({ ok: true, note: pub(n) });
      }
      if (id && (req.method === 'POST' || req.method === 'DELETE')) {
        const d = await load(env), i = d.notes.findIndex(x => x.id === id);
        if (i < 0) return json({ ok: req.method === 'DELETE', err: 'not-found' }, req.method === 'DELETE' ? 200 : 404);
        const n = d.notes[i];
        if (req.method === 'DELETE') {
          const tok = req.headers.get('x-note-token') || '';
          if (!admin && !(n.tok && tok && tok === n.tok)) return json({ ok: false, err: 'forbidden' }, 403);
          d.notes.splice(i, 1);
        } else {
          if (!admin) return json({ ok: false, err: 'forbidden' }, 403);
          let b; try { b = await req.json(); } catch (e) { return json({ ok: false, err: 'bad-json' }, 400); }
          if ('ap' in b) n.ap = b.ap ? 1 : 0;
          if ('st' in b) n.st = [0, 1, 2].includes(+b.st) ? +b.st : 0;
          if ('reply' in b) { n.reply = String(b.reply || '').slice(0, 400); n.rt = n.reply ? Date.now() : 0; }
        }
        await env.FB.put('notes', JSON.stringify(d));
        return json({ ok: true, note: req.method === 'DELETE' ? null : pub(n) });
      }
      return json({ ok: false, err: 'not-found' }, 404);
    } catch (e) { return json({ ok: false, err: 'server' }, 500); }
  }
};
