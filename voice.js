/* May Học Tin: giọng đọc của May.
   Dùng giọng đọc có sẵn trong máy (Web Speech), không cần tệp âm thanh nên vẫn chạy khi mất mạng.
   - Nút "Nghe" (rdBtn) đọc phần chữ trong khung [data-rdbox] gần nhất.
   - "May tự đọc" (S.vauto): mỗi lần vẽ lại trang, đọc khung [data-rdauto] có số ưu tiên lớn nhất nếu nội dung vừa đổi.
   - Lời khen bằng lời khi trả lời đúng, sai, hoàn thành (voxPraise, gọi từ sfx trong app.js).
   Máy không có giọng tiếng Việt thì các nút tự ẩn. Nạp trước app.js. */
const VOX={v:{},n:0,box:null,grp:0,auto:'',praiseAt:0,keep:[]};
const voxApi=()=>typeof speechSynthesis!=='undefined'&&typeof SpeechSynthesisUtterance!=='undefined';
function voxLoad(){if(!voxApi())return;let vs=[];try{vs=speechSynthesis.getVoices()||[]}catch(e){}VOX.n=vs.length;
 const pick=(lg,pref)=>{const c=vs.filter(x=>(x.lang||'').toLowerCase().replace('_','-').startsWith(lg));if(!c.length)return null;
  for(const p of pref){const f=c.find(x=>p.test(x.name+' '+x.lang));if(f)return f}return c.find(x=>x.localService)||c[0]};
 VOX.v.vi=pick('vi',[/linh/i,/hoai ?my/i,/google/i]);VOX.v.en=pick('en',[/samantha/i,/google us/i,/en[-_]US/i,/en[-_]GB/i])}
/* có giọng cho ngôn ngữ này không; máy chưa báo danh sách giọng thì cứ thử đọc theo mã ngôn ngữ */
const voxHas=lg=>voxApi()&&(!VOX.n||!!VOX.v[lg]);
const voxLang=()=>S.lang==='en'?'en':'vi';
const voxOn=()=>S.vox!==false&&voxHas(voxLang());
const voxRate=()=>+S.vrate||0.95;

/* ---- lấy phần chữ cần đọc trong một khung ---- */
const VOX_SKIP=['rd','nord','work-top','sim','try','sm-stage','sm-pic','tkb','kb','hands','stars','bar'];
const VOX_BLOCK=/^(P|LI|H1|H2|H3|H4|DIV|BUTTON|TR|TD|TH|BR|UL|OL|SECTION|SUMMARY|LABEL)$/;
const voxClean=s=>s.replace(/[→←↑↓★☆✓✕•·]/g,', ').replace(/\s+/g,' ').replace(/([!?:;,…])\s*\.(?=\s|$)/g,'$1').replace(/(\.\s*){2,}/g,'. ').replace(/(,\s*){2,}/g,', ').replace(/^[\s.,]+/,'').trim();
function voxText(el){const out=[];let cur={l:null,t:''};
 const push=(l,s)=>{if(!s)return;if(cur.l!==l){if(cur.t.trim())out.push(cur);cur={l,t:''}}cur.t+=s};
 (function walk(n,l){n.childNodes.forEach(c=>{
  if(c.nodeType===3){push(l,c.nodeValue);return}
  if(c.nodeType!==1)return;const tag=c.tagName.toUpperCase();
  if(tag==='SVG'||tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT'||c.getAttribute('aria-hidden')==='true')return;
  if(VOX_SKIP.some(k=>c.classList.contains(k)))return;
  if(c.classList.contains('chips')&&c.parentElement&&c.parentElement.classList.contains('srow'))return;
  const l2=c.getAttribute('data-vl')||l;walk(c,l2);
  if(VOX_BLOCK.test(tag)||c.classList.contains('mk')||c.classList.contains('qtype')||n.classList.contains('flash'))push(l2,'. ')})})(el,voxLang());
 if(cur.t.trim())out.push(cur);
 return out.map(s=>({l:s.l,t:voxClean(s.t)})).filter(s=>s.t)}
const voxKey=segs=>segs.map(s=>s.l+':'+s.t).join('|');
/* cắt thành từng đoạn ngắn: một số trình duyệt tự dừng khi một lượt đọc quá dài */
function voxChunks(t){const parts=t.match(/[^.!?…]+[.!?…]*\s*/g)||[t],out=[];let cur='';
 parts.forEach(p=>{if(cur&&(cur+p).length>190){out.push(cur.trim());cur=''}cur+=p});if(cur.trim())out.push(cur.trim());return out}

/* ---- đọc ---- */
function voxStop(){if(!voxApi())return;VOX.grp++;VOX.box=null;VOX.keep=[];try{speechSynthesis.cancel()}catch(e){}voxMark()}
/* o.box: khóa của khung đang đọc (để nút đổi thành "Dừng"); o.queue: đọc nối sau câu đang nói thay vì ngắt */
function voxSay(segs,o){o=o||{};if(!voxApi()||S.vox===false)return false;const ss=speechSynthesis;
 if(!o.queue){VOX.keep=[];try{ss.cancel()}catch(e){}}
 const g=++VOX.grp;let left=0;VOX.box=o.box||null;
 const done=()=>{if(--left<=0&&VOX.grp===g){VOX.box=null;voxMark()}};
 segs.forEach(s=>{if(!voxHas(s.l))return;voxChunks(s.t).forEach(c=>{let u;try{u=new SpeechSynthesisUtterance(c)}catch(e){return}
  const v=VOX.v[s.l];if(v)u.voice=v;u.lang=v?v.lang:(s.l==='en'?'en-US':'vi-VN');
  u.rate=voxRate()*(s.l==='en'&&voxLang()==='vi'?0.9:1);u.pitch=o.pitch||1.12;u.onend=done;u.onerror=done;left++;VOX.keep.push(u);
  try{ss.speak(u)}catch(e){done()}})});
 if(!left)VOX.box=null;return left>0}
const voxSayText=(txt,o)=>voxSay([{l:voxLang(),t:txt}],o);

/* ---- nút Nghe ---- */
const VOX_ICON='<path d="M4 9.500h3.500L12 6v12l-4.500-3.500H4z"/><path d="M15.500 9a4 4 0 0 1 0 6M18 6.500a7.500 7.500 0 0 1 0 11"/>';
function rdBtn(forId){if(!voxOn())return '';return `<button class="rd" data-act="read"${forId?` data-rdfor="${forId}"`:''} aria-label="${t('Nghe May đọc','Listen to May read this')}">${ic(VOX_ICON)}<span class="a">${t('Nghe','Listen')}</span><span class="b">${t('Dừng','Stop')}</span></button>`}
const voxBoxOf=b=>b.dataset.rdfor?document.getElementById(b.dataset.rdfor):b.closest('[data-rdbox]')||b.closest('.card');
function voxToggle(b){const box=voxBoxOf(b);if(!box)return;const segs=voxText(box),key=voxKey(segs);
 if(VOX.box===key){voxStop();return}voxSay(segs,{box:key});voxMark()}
/* cập nhật trạng thái các nút Nghe theo khung đang được đọc */
function voxMark(){if(typeof document==='undefined')return;document.querySelectorAll('.rd').forEach(b=>{const box=voxBoxOf(b);b.classList.toggle('on',!!(VOX.box&&box&&voxKey(voxText(box))===VOX.box))})}
/* gọi sau mỗi lần vẽ lại trang */
function voxAuto(){if(typeof document==='undefined')return;
 /* sang trang khác thì ngừng đọc trang cũ, trừ khi May vừa khen xong */
 if(view!==VOX.view){VOX.view=view;VOX.auto='';if(Date.now()-VOX.praiseAt>500)voxStop()}
 if(S.vauto&&voxOn()){let best=null,bp=0;document.querySelectorAll('[data-rdauto]').forEach(e=>{const p=+e.dataset.rdauto||1;if(p>bp){bp=p;best=e}});
  if(!best)VOX.auto='';else{const segs=voxText(best),key=voxKey(segs),k2=view+'|'+key;
   if(k2!==VOX.auto){VOX.auto=k2;voxSay(segs,{box:key,queue:Date.now()-VOX.praiseAt<500})}}}
 voxMark()}

/* ---- lời khen của May ---- */
const VOX_PRAISE={
 ok:[['Đúng rồi!','That’s right!'],['Giỏi lắm!','Well done!'],['Chính xác!','Correct!'],['Tuyệt vời!','Great job!'],['Hay quá!','Brilliant!'],['Em làm tốt lắm!','You’re doing really well!']],
 bad:[['Chưa đúng rồi, mình xem lại nhé.','Not quite, let’s look again.'],['Gần đúng rồi, em cố lên nhé.','Nearly there, keep going.'],['Không sao, sai thì mình học thêm.','No worries, mistakes help us learn.']],
 win:[['Hoan hô! Em đã hoàn thành rồi!','Hooray! You finished it!'],['Tuyệt vời! Em giỏi quá!','Wonderful! You did so well!'],['Xuất sắc! May vỗ tay cho em nào!','Excellent! May is clapping for you!']]};
function voxPraise(kind){if(!voxOn())return;const a=VOX_PRAISE[kind];if(!a)return;let i=Math.floor(Math.random()*a.length);if(a.length>1&&i===VOX['p_'+kind])i=(i+1)%a.length;VOX['p_'+kind]=i;
 VOX.praiseAt=Date.now();voxSayText(t(a[i][0],a[i][1]),{pitch:1.25})}

/* ---- phần cài đặt trong bảng "Hồ sơ, màu, âm thanh" ---- */
function voxPanel(){const seg=(act,cur,opts)=>`<div class="seg">${opts.map(o=>`<button class="${cur===o[0]?'on':''}" data-act="${act}" data-v="${o[0]}">${t(o[1],o[2])}</button>`).join('')}</div>`;
 if(!voxApi()||!voxHas(voxLang()))return `<h2>${t('Giọng đọc của May','May’s reading voice')}</h2><p class="muted">${t('Máy này chưa có giọng đọc tiếng Việt nên May chưa đọc thành lời được. Phụ huynh có thể thêm giọng tiếng Việt trong phần Cài đặt của máy (mục Trợ năng hoặc Ngôn ngữ, phần Giọng nói), rồi mở lại trang.','This device has no reading voice for this language yet, so May cannot read aloud. A grown-up can add one in the device Settings (Accessibility or Language, under Speech), then reopen the page.')}</p>`;
 const on=S.vox!==false,r=voxRate();
 return `<h2>${t('Giọng đọc của May','May’s reading voice')}</h2>
 <div class="row"><span class="lbl">${t('Nút Nghe và lời khen của May','Listen buttons and May’s praise')}</span>${seg('vox',on?'1':'0',[['1','Bật','On'],['0','Tắt','Off']])}</div>
 ${on?`<div class="row"><span class="lbl">${t('May tự đọc câu hỏi và lời hướng dẫn','May reads questions and guidance by herself')}</span>${seg('vauto',S.vauto?'1':'0',[['1','Bật','On'],['0','Tắt','Off']])}</div>
 <div class="row"><span class="lbl">${t('Tốc độ đọc','Reading speed')}</span>${seg('vrate',r<0.9?'0.8':r>1.05?'1.15':'0.95',[['0.8','Chậm','Slow'],['0.95','Vừa','Normal'],['1.15','Nhanh','Fast']])}<button class="btn" data-act="vtest">${t('Nghe thử','Try it')}</button></div>`:''}`}
function voxAct(a,v){switch(a){
 case 'vox':S.vox=v==='1';if(!S.vox)voxStop();save();return true;
 case 'vauto':S.vauto=v==='1';VOX.auto='';save();return true;
 case 'vrate':S.vrate=+v;save();
 case 'vtest':voxSayText(t('Chào em! Mình là May. Mình sẽ đọc bài cho em nghe nhé.','Hello! I am May. I will read the lessons to you.'),{pitch:1.2});return true}
 return false}

if(voxApi()){voxLoad();try{speechSynthesis.addEventListener('voiceschanged',()=>{const had=voxHas('vi')+'|'+VOX.n;voxLoad();if(had!==voxHas('vi')+'|'+VOX.n){try{render()}catch(e){}}})}catch(e){}
 window.addEventListener('pagehide',()=>{try{speechSynthesis.cancel()}catch(e){}})}
