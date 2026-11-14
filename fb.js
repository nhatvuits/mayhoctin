/* May Học Tin: Góp ý.
   - fbOpen(): mở bảng trắng để bé hoặc ba mẹ viết, vẽ bằng tay, hoặc gõ chữ.
   - Mỗi góp ý thành một tờ ghi chú trên "Bảng góp ý" vô hạn ở cuối trang chủ: kéo nền để di chuyển, phóng to thu nhỏ, kéo từng tờ để sắp xếp,
     xem toàn màn hình, lọc theo trạng thái. Mỗi tờ có thể có phản hồi và trạng thái Mới / Đang xem / Đã xong.
   - NƠI LƯU:
       FB_API để trống  → góp ý chỉ lưu trên máy này (localStorage); ai dùng máy cũng phản hồi, xóa được.
       FB_API có địa chỉ → góp ý được gửi lên máy chủ nhỏ trên Cloudflare (xem cloud/worker.js và cloud/HUONG-DAN-CLOUD.md) để xem được từ mọi máy.
                           Khi đó chỉ người có mật khẩu quản trị mới duyệt, phản hồi, đổi trạng thái; người viết vẫn xóa được góp ý của mình.
   Nét vẽ lưu dạng tọa độ (không lưu ảnh) nên rất nhẹ. Tên của bé không được gửi lên mạng. Nạp trước app.js. */
const FB_API='';
const FB_KEY='may-hoc-tin-gopy-v1',FB_MAX=80,FB_W=1000,FB_H=640;
const FB_PEN=['#12305a','#e2574c','#f08a24','#2f9e6e','#2f6fed','#8a4fd6'];
const FB_CAT=[['like','Em thích','I like this','#fff3c4'],['idea','Em muốn có thêm','I wish it had','#d9f2e3'],['fix','Chưa ổn, cần sửa','Needs fixing','#ffdcd6'],['other','Điều khác','Something else','#dbe9ff']];
const FB_ST=[['Mới','New'],['Đang xem','In progress'],['Đã xong','Done']];
/* notes: góp ý viết trên máy này; remote: góp ý tải từ máy chủ; pos: chỗ đặt riêng của từng tờ trên máy này */
const FB={notes:[],remote:[],pos:{},admin:'',isAdmin:false,mod:true,cam:{x:0,y:0,z:1},ed:null,dlg:null,full:false,filter:'all',ptr:{},drag:null,syncAt:0,busy:false,err:false,view:[]};
const fbLS=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k)||'null');return v==null?d:v}catch(e){return d}};
{const d=fbLS(FB_KEY,[]);if(Array.isArray(d))FB.notes=d.filter(n=>n&&n.id);const r=fbLS(FB_KEY+'-r',[]);if(Array.isArray(r))FB.remote=r.filter(n=>n&&n.id);const p=fbLS(FB_KEY+'-pos',{});if(p&&typeof p==='object')FB.pos=p;try{FB.admin=localStorage.getItem(FB_KEY+'-admin')||''}catch(e){}}
const fbCloud=()=>!!FB_API;
function fbSave(){try{localStorage.setItem(FB_KEY,JSON.stringify(FB.notes));localStorage.setItem(FB_KEY+'-pos',JSON.stringify(FB.pos));if(fbCloud())localStorage.setItem(FB_KEY+'-r',JSON.stringify(FB.remote));return true}catch(e){toast(t('Máy hết chỗ lưu. Em xóa bớt góp ý cũ nhé.','Storage is full. Please delete some old notes.'));return false}}
const fbCat=id=>FB_CAT.find(c=>c[0]===id)||FB_CAT[3];
const fbDate=ts=>{try{return new Date(ts).toLocaleDateString(en()?'en-GB':'vi-VN')}catch(e){return ''}};
/* quyền: không dùng máy chủ thì ai trên máy cũng sửa được; có máy chủ thì chỉ quản trị */
const fbCanEdit=()=>!fbCloud()||FB.isAdmin;
const fbCanDel=n=>!fbCloud()||FB.isAdmin||n.mine;
/* nét vẽ: [chỉ số màu (-1 là tẩy), độ dày, [x,y,x,y...]] trong khung FB_W × FB_H */
const fbStrokeSvg=s=>{const p=s[2],col=s[0]<0?'#fff':FB_PEN[s[0]]||FB_PEN[0];
 if(p.length<=2)return `<circle cx="${p[0]}" cy="${p[1]}" r="${s[1]/2}" fill="${col}"/>`;
 let d='';for(let i=0;i<p.length;i+=2)d+=(i?'L':'M')+p[i]+' '+p[i+1];return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${s[1]}" stroke-linecap="round" stroke-linejoin="round"/>`};
const fbDrawSvg=n=>`<svg class="fbn-draw" viewBox="0 0 ${FB_W} ${FB_H}" aria-label="${t('Hình vẽ góp ý','Drawn feedback')}" role="img"><rect width="${FB_W}" height="${FB_H}" fill="#fff"/>${n.s.map(fbStrokeSvg).join('')}</svg>`;

/* ============ DANH SÁCH HIỂN THỊ ============ */
const FB_NW=240,FB_GX=280,FB_GY=340,FB_COLS=4;
/* gộp góp ý từ máy chủ với góp ý viết trên máy này, xếp theo thời gian vào lưới 4 cột; tờ nào đã được kéo thì giữ chỗ riêng.
   wait: 'unsent' chưa gửi được, 'review' đã gửi và đang chờ duyệt */
function fbAll(nofilter){const m=new Map();
 if(fbCloud())FB.remote.forEach(n=>m.set(n.id,Object.assign({},n)));
 FB.notes.forEach(n=>{const r=m.get(n.id);if(r){r.mine=true;r.name=n.name}else m.set(n.id,Object.assign({},n,{mine:true,ap:fbCloud()?0:1,wait:fbCloud()?(n.sent?'review':'unsent'):''}))});
 const a=[...m.values()].sort((x,y)=>x.t-y.t);
 a.forEach((n,i)=>{const p=FB.pos[n.id];n.x=p?p[0]:(i%FB_COLS)*FB_GX;n.y=p?p[1]:Math.floor(i/FB_COLS)*FB_GY;n.st=n.st||0;if(fbCloud()&&!n.wait&&!n.ap)n.wait='review'});
 if(nofilter)return a;const f=FB.filter;
 return a.filter(n=>f==='open'?n.st<2:f==='done'?n.st===2:f==='wait'?!!n.wait:true)}

/* ============ BẢNG GÓP Ý VÔ HẠN (trang chủ) ============ */
function fbNoteH(n){const c=fbCat(n.cat),del=FB.del===n.id,edit=fbCanEdit();
 return `<article class="fbn${n.st===2?' done':''}${n.wait?' wait':''}" data-fbn="${n.id}" style="left:${n.x}px;top:${n.y}px;background:${c[3]};transform:rotate(${((n.t%50)/10-2.5).toFixed(1)}deg)">
 <header class="fbn-top" title="${t('Kéo để di chuyển tờ này','Drag to move this note')}"><b>${t(c[1],c[2])}</b><span>${n.who==='par'?t('Phụ huynh','Parent'):t('Bé','Child')}${n.name?' · '+esc(n.name):''} · ${fbDate(n.t)}</span></header>
 ${n.s&&n.s.length?fbDrawSvg(n):''}${n.txt?`<p class="fbn-txt">${esc(n.txt)}</p>`:''}
 ${n.reply?`<div class="fbn-reply"><b>${t('May Học Tin trả lời','May Học Tin replied')}</b><p>${esc(n.reply)}</p></div>`:''}
 <div class="fbn-tags"><span class="fbn-st s${n.st}">${n.st===2?'✓ ':''}${t(FB_ST[n.st][0],FB_ST[n.st][1])}</span>${n.wait?`<span class="fbn-st w">${n.wait==='unsent'?t('Chưa gửi được','Not sent yet'):t('Chờ duyệt','Awaiting approval')}</span>`:''}</div>
 <footer class="fbn-foot">${edit&&fbCloud()&&!n.ap&&n.wait!=='unsent'?`<button class="linkbtn fbn-ok" data-act="fb" data-k="approve" data-v="${n.id}">${t('Duyệt','Approve')}</button>`:''}${edit&&n.wait!=='unsent'?`<button class="linkbtn" data-act="fb" data-k="reply" data-v="${n.id}">${t('Phản hồi','Reply')}</button>`:''}<button class="linkbtn" data-act="fb" data-k="share" data-v="${n.id}">${t('Chia sẻ','Share')}</button>${fbCanDel(n)?(del?`<button class="linkbtn fbn-del" data-act="fb" data-k="del2" data-v="${n.id}">${t('Xóa thật?','Really delete?')}</button>`:`<button class="linkbtn" data-act="fb" data-k="del" data-v="${n.id}">${t('Xóa','Delete')}</button>`):''}</footer></article>`}
function fbBoardH(){const all=fbAll(true),list=FB.view=fbAll(),cnt=k=>all.filter(n=>k==='open'?n.st<2:k==='done'?n.st===2:k==='wait'?!!n.wait:true).length;
 const tabs=[['all','Tất cả','All'],['open','Chưa xong','Open'],['done','Đã xong','Done']];if(fbCloud()&&cnt('wait'))tabs.push(['wait','Chờ duyệt','Awaiting approval']);
 const where=!fbCloud()?t('Góp ý được lưu ngay trên máy này; bấm Chia sẻ trên một tờ để gửi nó đi dưới dạng ảnh.','Notes are saved on this device; tap Share on a note to send it as a picture.')
  :FB.err?t('Chưa kết nối được nơi lưu chung. Góp ý mới sẽ được gửi khi có mạng.','Could not reach the shared board. New notes will be sent when you are online.')
  :FB.mod?t('Góp ý được lưu trên mạng, xem được từ mọi máy. Góp ý mới sẽ hiện cho mọi người sau khi được duyệt.','Notes are saved online and can be seen from any device. A new note shows to everyone once it has been approved.')
  :t('Góp ý được lưu trên mạng, xem được từ mọi máy.','Notes are saved online and can be seen from any device.');
 return `<section class="card stack fb-sec${FB.full?' full':''}" id="gop-y"><div class="row fb-headrow" style="justify-content:space-between"><div><h2>${t('Bảng góp ý','Feedback board')}</h2><p class="muted fb-intro">${t('Em và ba mẹ thích gì, muốn có thêm gì ở May Học Tin? Viết hoặc vẽ rồi dán lên bảng nhé.','What do you and your parents like, or wish May Học Tin had? Write or draw it and stick it on the board.')}</p></div><button class="btn sun" data-act="fb" data-k="open">${ic(FB_ICON)} ${t('Viết góp ý','Write feedback')}</button></div>
 <div class="row fb-bar"><div class="chips">${tabs.map(x=>`<button class="chip sm ${FB.filter===x[0]?'sel':''}" data-act="fb" data-k="filter" data-v="${x[0]}">${t(x[1],x[2])} (${cnt(x[0])})</button>`).join('')}</div>
 ${fbCloud()?`<span class="row fb-cloud">${FB.isAdmin?`<span class="pill ok">${t('Quản trị','Admin')}</span><button class="linkbtn" data-act="fb" data-k="logout">${t('Thoát quản trị','Leave admin')}</button>`:`<button class="linkbtn" data-act="fb" data-k="login">${t('Quản trị','Admin')}</button>`}<button class="linkbtn" data-act="fb" data-k="sync">${t('Tải lại','Refresh')}</button></span>`:''}</div>
 <div class="fbw" id="fbw" tabindex="0" aria-label="${t('Bảng góp ý, kéo để di chuyển','Feedback board, drag to move around')}"><div class="fbworld" id="fbworld">${list.map(fbNoteH).join('')}</div>
 ${list.length?'':`<div class="fb-empty">${CLOUD}<p>${all.length?t('Không có góp ý nào trong mục này.','No notes in this group.'):t('Chưa có góp ý nào. Em hãy là người đầu tiên nhé!','No feedback yet. Be the first!')}</p></div>`}
 <div class="fb-ctl"><button data-act="fb" data-k="zoom" data-v="-1" aria-label="${t('Thu nhỏ','Zoom out')}">−</button><span id="fbz">100%</span><button data-act="fb" data-k="zoom" data-v="1" aria-label="${t('Phóng to','Zoom in')}">+</button><button class="wide" data-act="fb" data-k="fit">${t('Xem tất cả','Show all')}</button><button class="wide" data-act="fb" data-k="tidy">${t('Xếp gọn','Tidy up')}</button><button class="wide on" data-act="fb" data-k="full" aria-pressed="${FB.full}">${FB.full?t('Thu nhỏ bảng','Exit full screen'):t('Toàn màn hình','Full screen')}</button></div></div>
 <p class="muted fb-hint">${t('Kéo nền để di chuyển bảng, kéo một tờ để sắp xếp.','Drag the background to move around, drag a note to rearrange.')} ${where}</p></section>`}
const FB_ICON='<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>';
function fbApply(){const w=document.getElementById('fbworld'),v=document.getElementById('fbw');if(!w||!v)return;const c=FB.cam;
 w.style.transform=`translate(${c.x}px,${c.y}px) scale(${c.z})`;v.style.backgroundSize=`${28*c.z}px ${28*c.z}px`;v.style.backgroundPosition=`${c.x}px ${c.y}px`;
 const z=document.getElementById('fbz');if(z)z.textContent=Math.round(c.z*100)+'%'}
function fbFit(only){const v=document.getElementById('fbw');if(!v)return;const W=v.clientWidth,H=v.clientHeight,ns=only?[only]:FB.view;
 if(!ns.length){FB.cam={x:W/2-FB_NW/2,y:40,z:1};fbApply();return}
 const x0=Math.min(...ns.map(n=>n.x)),x1=Math.max(...ns.map(n=>n.x))+FB_NW,y0=Math.min(...ns.map(n=>n.y)),y1=Math.max(...ns.map(n=>n.y))+300;
 const z=Math.max(.25,Math.min(1,(W-32)/(x1-x0),(H-32)/(y1-y0)));FB.cam={z,x:(W-(x1-x0)*z)/2-x0*z,y:Math.max(16,(H-(y1-y0)*z)/2)-y0*z};fbApply()}
function fbZoom(f,cx,cy){const v=document.getElementById('fbw');if(!v)return;const c=FB.cam,z=Math.max(.25,Math.min(2.5,c.z*f));if(cx==null){cx=v.clientWidth/2;cy=v.clientHeight/2}
 c.x=cx-(cx-c.x)*(z/c.z);c.y=cy-(cy-c.y)*(z/c.z);c.z=z;fbApply()}
/* gọi sau mỗi lần vẽ lại trang */
function fbAfter(){document.body.classList.toggle('fb-open',!!(FB.ed||FB.dlg||(FB.full&&document.getElementById('fbw'))));
 if(!document.getElementById('fbw'))return;if(!FB.fitted||FB.refit){FB.fitted=true;FB.refit=false;fbFit()}else fbApply();fbSync()}

/* ============ LƯU TRÊN MẠNG (khi có FB_API) ============ */
async function fbReq(method,path,body,hdr){try{const h=Object.assign({},hdr||{});if(body)h['content-type']='application/json';if(FB.admin)h['x-admin-key']=FB.admin;
 const r=await fetch(FB_API.replace(/\/+$/,'')+path,{method,headers:h,body:body?JSON.stringify(body):undefined});return await r.json()}catch(e){return null}}
const fbWire=n=>({id:n.id,who:n.who,cat:n.cat,txt:n.txt,s:n.s,tok:n.tok});
/* gửi các góp ý chưa gửi rồi tải danh sách mới; tự gọi tối đa mỗi phút một lần */
async function fbSync(force){if(!fbCloud()||FB.busy)return;if(!force&&Date.now()-FB.syncAt<60000)return;FB.busy=true;FB.syncAt=Date.now();const before=JSON.stringify([FB.remote,FB.isAdmin,FB.err,FB.notes.map(n=>n.sent)]);
 try{for(const n of FB.notes.filter(x=>!x.sent)){const r=await fbReq('POST','/notes',fbWire(n));if(r&&r.ok)n.sent=1}
  const r=await fbReq('GET','/notes');if(r&&r.ok&&Array.isArray(r.notes)){FB.remote=r.notes;FB.isAdmin=!!r.admin;FB.mod=r.moderate!==false;FB.err=false}else FB.err=true}
 finally{FB.busy=false;fbSave();if(before!==JSON.stringify([FB.remote,FB.isAdmin,FB.err,FB.notes.map(n=>n.sent)])&&typeof view!=='undefined'&&view==='trang-chu'&&!FB.drag&&!FB.ed&&!FB.dlg)render()}}
/* quản trị sửa một góp ý trên máy chủ, hoặc sửa tại chỗ khi không dùng máy chủ */
async function fbPatch(id,ch){if(!fbCloud()){const n=FB.notes.find(x=>x.id===id);if(n){Object.assign(n,ch);if('reply' in ch)n.rt=ch.reply?Date.now():0;fbSave()}return true}
 const r=await fbReq('POST','/notes/'+id,ch);if(r&&r.ok&&r.note){const i=FB.remote.findIndex(x=>x.id===id);if(i>=0)FB.remote[i]=r.note;else FB.remote.push(r.note);fbSave();return true}
 toast(t('Chưa lưu được. Kiểm tra mạng và mật khẩu quản trị nhé.','Could not save. Check the connection and the admin password.'));return false}

/* ============ BẢNG TRẮNG ĐỂ VIẾT GÓP Ý ============ */
function fbOpen(){if(FB.ed)return;const E=FB.ed={s:[],pen:0,w:8,who:'kid',cat:'like',cur:null};
 const d=document.createElement('div');d.className='fbm';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-label',t('Viết góp ý','Write feedback'));E.el=d;document.body.appendChild(d);fbEdDraw();document.body.classList.add('fb-open')}
function fbClose(){const E=FB.ed;if(!E)return;E.el.remove();FB.ed=null;document.body.classList.toggle('fb-open',!!(FB.full&&document.getElementById('fbw')))}
function fbEdDraw(){const E=FB.ed,old=E.el.querySelector('#fb-txt'),txt=old?old.value:(E.txt||'');
 const seg=(k,cur,opts)=>`<div class="seg">${opts.map(o=>`<button class="${cur===o[0]?'on':''}" data-act="fb" data-k="${k}" data-v="${o[0]}">${t(o[1],o[2])}</button>`).join('')}</div>`;
 const first=!E.shown;E.shown=true;
 E.el.innerHTML=`<div class="fbm-box${first?' in':''}"><div class="fbm-head"><h2>${t('Góp ý cho May Học Tin','Feedback for May Học Tin')}</h2><button class="toolbtn" data-act="fb" data-k="close" aria-label="${t('Đóng','Close')}">✕</button></div>
 <div class="row fbm-row"><span class="lbl">${t('Người góp ý','Who is writing')}</span>${seg('who',E.who,[['kid','Em là bé','I am a child'],['par','Tôi là phụ huynh','I am a parent']])}</div>
 <div class="chips fbm-cats">${FB_CAT.map(c=>`<button class="chip ${E.cat===c[0]?'sel':''}" style="--fbc:${c[3]}" data-act="fb" data-k="cat" data-v="${c[0]}">${t(c[1],c[2])}</button>`).join('')}</div>
 <div class="fbm-pad"><canvas id="fb-cv" width="${FB_W}" height="${FB_H}" aria-label="${t('Bảng trắng, dùng ngón tay hoặc chuột để viết','Whiteboard, write with a finger or the mouse')}"></canvas><span class="fbm-ph" id="fb-ph">${t('Viết hoặc vẽ góp ý vào đây','Write or draw your feedback here')}</span></div>
 <div class="row fbm-tools"><span class="fbm-pens">${FB_PEN.map((c,i)=>`<button class="fbm-pen ${E.pen===i?'on':''}" style="background:${c}" data-act="fb" data-k="pen" data-v="${i}" aria-label="${t('Màu','Colour')} ${i+1}" aria-pressed="${E.pen===i}"></button>`).join('')}</span>
 ${seg('w',String(E.w),[['5','Nét nhỏ','Thin'],['8','Nét vừa','Medium'],['16','Nét to','Thick']])}
 <button class="btn ${E.pen<0?'primary':''}" data-act="fb" data-k="pen" data-v="-1" aria-pressed="${E.pen<0}">${t('Tẩy','Eraser')}</button><button class="btn" data-act="fb" data-k="undo">${t('Hoàn tác','Undo')}</button><button class="btn" data-act="fb" data-k="clear">${t('Xóa hết','Clear')}</button></div>
 <label class="lbl" for="fb-txt">${t('Hoặc gõ góp ý ở đây','Or type your feedback here')}</label><textarea id="fb-txt" rows="2" maxlength="300" placeholder="${t('Ví dụ: Em muốn có thêm trò chơi về chuột máy tính.','For example: I wish there was a game about the mouse.')}"></textarea>
 <p class="muted fbm-warn" id="fb-warn" hidden>${t('Em hãy viết, vẽ hoặc gõ một điều gì đó trước nhé.','Please write, draw or type something first.')}</p>
 <div class="row fbm-end"><span class="muted">${t('Đừng ghi họ tên đầy đủ, địa chỉ hay số điện thoại.','Please do not write a full name, address or phone number.')}</span><span class="row"><button class="btn" data-act="fb" data-k="close">${t('Hủy','Cancel')}</button><button class="btn primary" data-act="fb" data-k="post">${t('Dán lên bảng góp ý','Stick it on the board')}</button></span></div></div>`;
 E.el.querySelector('#fb-txt').value=txt;fbRedraw()}
function fbLine(g,s){const p=s[2];g.strokeStyle=g.fillStyle=s[0]<0?'#fff':FB_PEN[s[0]]||FB_PEN[0];g.lineWidth=s[1];g.lineCap=g.lineJoin='round';
 if(p.length<=2){g.beginPath();g.arc(p[0],p[1],s[1]/2,0,7);g.fill();return}g.beginPath();g.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)g.lineTo(p[i],p[i+1]);g.stroke()}
function fbRedraw(){const E=FB.ed;if(!E)return;const cv=E.el.querySelector('#fb-cv');if(!cv)return;const g=cv.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,FB_W,FB_H);E.s.forEach(s=>fbLine(g,s));if(E.cur)fbLine(g,E.cur);
 const ph=E.el.querySelector('#fb-ph');if(ph)ph.hidden=!!(E.s.length||E.cur)}
const fbPt=(cv,e)=>{const r=cv.getBoundingClientRect();return [Math.round(Math.max(0,Math.min(FB_W,(e.clientX-r.left)/r.width*FB_W))),Math.round(Math.max(0,Math.min(FB_H,(e.clientY-r.top)/r.height*FB_H)))]};
function fbPost(){const E=FB.ed;if(!E)return;const txt=(E.el.querySelector('#fb-txt').value||'').trim().slice(0,300);
 if(!E.s.length&&!txt){const w=E.el.querySelector('#fb-warn');if(w)w.hidden=false;sfx('err');return}
 if(FB.notes.length>=FB_MAX){toast(t('Em đã viết rất nhiều góp ý rồi. Xóa bớt tờ cũ rồi dán tiếp nhé.','You have written a lot of notes. Delete some old ones first.'));return}
 const rnd=()=>Math.random().toString(36).slice(2,10),n={id:'g'+Date.now().toString(36)+rnd().slice(0,4),t:Date.now(),who:E.who,name:E.who==='kid'?String(S.name||'').slice(0,20):'',cat:E.cat,txt,s:E.s,tok:rnd()+rnd(),sent:0,st:0,reply:''};
 FB.notes.push(n);if(!fbSave()){FB.notes.pop();return}
 fbClose();sfx('snap');sfx('star');toast(fbCloud()&&FB.mod?t('Cảm ơn em! Góp ý đã được gửi và sẽ hiện cho mọi người sau khi được duyệt.','Thank you! Your note was sent and will show to everyone once it is approved.'):t('Cảm ơn em! Góp ý đã được dán lên bảng.','Thank you! Your note is on the board.'));
 FB.filter='all';if(view!=='trang-chu')go('trang-chu');else render();
 setTimeout(()=>{const s=document.getElementById('gop-y');if(s&&!FB.full)s.scrollIntoView({block:'center'});const d=FB.view.find(x=>x.id===n.id);if(d)fbFit(d)},60);fbSync(true)}
/* ============ HỘP THOẠI NHỎ: phản hồi một góp ý, nhập mật khẩu quản trị ============ */
function fbDlg(o){fbDlgClose();const d=document.createElement('div');d.className='fbm';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');FB.dlg=Object.assign({el:d},o);document.body.appendChild(d);fbDlgDraw();document.body.classList.add('fb-open');const f=d.querySelector('textarea,input');if(f)try{f.focus()}catch(e){}}
function fbDlgClose(){if(!FB.dlg)return;FB.dlg.el.remove();FB.dlg=null;document.body.classList.toggle('fb-open',!!(FB.ed||(FB.full&&document.getElementById('fbw'))))}
function fbDlgDraw(){const D=FB.dlg;if(!D)return;const old=D.el.querySelector('#fb-in'),val=old?old.value:(D.val||'');
 if(D.k==='reply'){const n=fbAll(true).find(x=>x.id===D.id)||{};
  D.el.innerHTML=`<div class="fbm-box sm${D.shown?'':' in'}"><div class="fbm-head"><h2>${t('Phản hồi góp ý','Reply to this note')}</h2><button class="toolbtn" data-act="fb" data-k="dlgx" aria-label="${t('Đóng','Close')}">✕</button></div>
  ${n.txt?`<p class="fbm-quote">${esc(n.txt)}</p>`:`<p class="muted">${t('Góp ý này là hình vẽ.','This note is a drawing.')}</p>`}
  <div class="row fbm-row"><span class="lbl">${t('Trạng thái','Status')}</span><div class="seg">${FB_ST.map((x,i)=>`<button class="${D.st===i?'on':''}" data-act="fb" data-k="dlgst" data-v="${i}">${t(x[0],x[1])}</button>`).join('')}</div></div>
  <label class="lbl" for="fb-in">${t('Lời phản hồi (ai xem bảng cũng đọc được)','Your reply (everyone who sees the board can read it)')}</label><textarea id="fb-in" rows="3" maxlength="400" placeholder="${t('Ví dụ: Cảm ơn em! May sẽ thêm trò chơi này trong bản sau.','For example: Thank you! We will add this game in the next version.')}"></textarea>
  <div class="row fbm-end"><span></span><span class="row"><button class="btn" data-act="fb" data-k="dlgx">${t('Hủy','Cancel')}</button><button class="btn primary" data-act="fb" data-k="dlgok">${t('Lưu phản hồi','Save reply')}</button></span></div></div>`}
 else D.el.innerHTML=`<div class="fbm-box sm${D.shown?'':' in'}"><div class="fbm-head"><h2>${t('Quản trị Bảng góp ý','Feedback board admin')}</h2><button class="toolbtn" data-act="fb" data-k="dlgx" aria-label="${t('Đóng','Close')}">✕</button></div>
  <p class="muted">${t('Dành cho người làm trang: nhập mật khẩu quản trị để duyệt, phản hồi và đánh dấu góp ý đã xong. Mật khẩu chỉ được lưu trên máy này.','For the site owner: enter the admin password to approve, reply to and resolve notes. The password is kept on this device only.')}</p>
  <label class="lbl" for="fb-in">${t('Mật khẩu quản trị','Admin password')}</label><input id="fb-in" type="password" autocomplete="off">
  ${D.bad?`<p class="fbm-warn">${t('Mật khẩu chưa đúng hoặc chưa kết nối được.','Wrong password, or no connection.')}</p>`:''}
  <div class="row fbm-end"><span></span><span class="row"><button class="btn" data-act="fb" data-k="dlgx">${t('Hủy','Cancel')}</button><button class="btn primary" data-act="fb" data-k="dlgok">${t('Vào quản trị','Sign in')}</button></span></div></div>`;
 D.shown=true;D.el.querySelector('#fb-in').value=val}
async function fbDlgOk(){const D=FB.dlg;if(!D)return;const val=(D.el.querySelector('#fb-in').value||'').trim();
 if(D.k==='reply'){if(await fbPatch(D.id,{reply:val.slice(0,400),st:D.st})){fbDlgClose();sfx('star');render()}return}
 FB.admin=val;const r=await fbReq('GET','/notes');
 if(r&&r.ok&&r.admin){try{localStorage.setItem(FB_KEY+'-admin',val)}catch(e){}FB.remote=r.notes;FB.isAdmin=true;fbSave();fbDlgClose();toast(t('Đã vào chế độ quản trị.','Admin mode is on.'));render()}
 else{FB.admin='';D.bad=true;D.val='';fbDlgDraw()}}
/* xuất một tờ góp ý thành ảnh PNG để chia sẻ hoặc tải về */
function fbShare(id){const n=fbAll(true).find(x=>x.id===id);if(!n)return;const c=fbCat(n.cat),W=800,pad=32,hasD=n.s&&n.s.length,dh=hasD?Math.round((W-pad*2)*FB_H/FB_W):0;
 const cv=document.createElement('canvas'),g0=cv.getContext('2d');g0.font='28px sans-serif';
 const lines=[];(n.txt||'').split(/\n/).forEach(par=>{let cur='';par.split(/\s+/).forEach(w=>{const tr=cur?cur+' '+w:w;if(g0.measureText(tr).width>W-pad*2&&cur){lines.push(cur);cur=w}else cur=tr});if(cur)lines.push(cur)});
 cv.width=W;cv.height=pad+50+(hasD?dh+20:0)+lines.length*38+(lines.length?16:0)+56;const g=cv.getContext('2d');
 g.fillStyle=c[3];g.fillRect(0,0,cv.width,cv.height);g.fillStyle='#12305a';g.textBaseline='top';g.font='bold 30px sans-serif';g.fillText(t(c[1],c[2]),pad,pad);
 let y=pad+50;if(hasD){g.save();g.translate(pad,y);g.scale((W-pad*2)/FB_W,(W-pad*2)/FB_W);g.fillStyle='#fff';g.fillRect(0,0,FB_W,FB_H);n.s.forEach(s=>fbLine(g,s));g.restore();y+=dh+20}
 g.fillStyle='#12305a';g.font='28px sans-serif';lines.forEach(l=>{g.fillText(l,pad,y);y+=38});if(lines.length)y+=16;
 g.font='20px sans-serif';g.fillStyle='#516b8c';g.fillText('May Học Tin · '+t('Góp ý','Feedback')+' · '+(n.who==='par'?t('Phụ huynh','Parent'):t('Bé','Child'))+' · '+fbDate(n.t),pad,y+8);
 cv.toBlob(async b=>{if(!b)return;const name='gop-y-may-hoc-tin.png';
  try{const f=new File([b],name,{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:t('Góp ý cho May Học Tin','Feedback for May Học Tin')});return}}catch(e){if(e&&e.name==='AbortError')return}
  const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000);toast(t('Đã lưu góp ý thành ảnh trong máy.','The note was saved as a picture.'))},'image/png')}

/* ============ HÀNH ĐỘNG ============ */
/* trả về true nếu cần vẽ lại trang */
function fbAct(k,v){const E=FB.ed;switch(k){
 case 'open':fbOpen();sfx('pop');return false;
 case 'close':fbClose();return false;
 case 'who':case 'cat':if(E){E[k]=v;fbEdDraw()}return false;
 case 'pen':if(E){E.pen=+v;fbEdDraw()}return false;
 case 'w':if(E){E.w=+v;fbEdDraw()}return false;
 case 'undo':if(E){E.s.pop();fbRedraw()}return false;
 case 'clear':if(E){E.s=[];fbRedraw()}return false;
 case 'post':fbPost();return false;
 case 'zoom':fbZoom(+v>0?1.25:.8);return false;
 case 'fit':fbFit();return false;
 case 'tidy':FB.pos={};fbSave();FB.refit=true;return true;
 case 'full':FB.full=!FB.full;FB.refit=true;sfx('tap');return true;
 case 'filter':FB.filter=v;FB.refit=true;sfx('tap');return true;
 case 'share':fbShare(v);return false;
 case 'del':FB.del=v;return true;
 case 'del2':{const n=fbAll(true).find(x=>x.id===v),mine=FB.notes.find(x=>x.id===v);FB.del=null;FB.notes=FB.notes.filter(x=>x.id!==v);FB.remote=FB.remote.filter(x=>x.id!==v);delete FB.pos[v];fbSave();sfx('flip');
  if(fbCloud()&&n&&(FB.isAdmin||(mine&&mine.sent)))fbReq('DELETE','/notes/'+v,null,mine&&mine.tok?{'x-note-token':mine.tok}:{});return true}
 case 'reply':{if(!fbCanEdit())return false;const n=fbAll(true).find(x=>x.id===v);if(n)fbDlg({k:'reply',id:v,st:n.st||0,val:n.reply||''});return false}
 case 'approve':if(fbCanEdit())fbPatch(v,{ap:1}).then(ok=>{if(ok){sfx('star');render()}});return false;
 case 'login':fbDlg({k:'login'});return false;
 case 'logout':FB.admin='';FB.isAdmin=false;try{localStorage.removeItem(FB_KEY+'-admin')}catch(e){}fbSync(true);return true;
 case 'sync':fbSync(true).then(()=>{toast(FB.err?t('Chưa kết nối được nơi lưu chung.','Could not reach the shared board.'):t('Đã tải lại bảng góp ý.','The board is up to date.'))});return false;
 case 'dlgx':fbDlgClose();return false;
 case 'dlgst':if(FB.dlg){FB.dlg.st=+v;fbDlgDraw()}return false;
 case 'dlgok':fbDlgOk();return false}
 return false}

/* ============ CHUỘT VÀ CẢM ỨNG: vẽ trên bảng trắng, kéo bảng, kéo từng tờ, chụm hai ngón để phóng to ============ */
if(typeof document!=='undefined'){
document.addEventListener('pointerdown',e=>{const tg=e.target;if(!tg.closest)return;
 if(FB.dlg)return;
 if(FB.ed){if(tg.id==='fb-cv'){e.preventDefault();const E=FB.ed;E.pid=e.pointerId;E.cur=[E.pen,E.pen<0?Math.max(28,E.w*3):E.w,fbPt(tg,e)];try{tg.setPointerCapture(e.pointerId)}catch(x){}fbRedraw()}return}
 const v=tg.closest('#fbw');if(!v||tg.closest('button'))return;
 FB.ptr[e.pointerId]=[e.clientX,e.clientY];const ids=Object.keys(FB.ptr);
 if(ids.length===2){const a=FB.ptr[ids[0]],b=FB.ptr[ids[1]];FB.drag={k:'pinch',d:Math.hypot(a[0]-b[0],a[1]-b[1]),z:FB.cam.z};return}
 const ne=tg.closest('[data-fbn]');
 if(ne){const n=FB.view.find(x=>x.id===ne.dataset.fbn);if(n)FB.drag={k:'note',n,el:ne,sx:e.clientX,sy:e.clientY,ox:n.x,oy:n.y,moved:false}}
 else FB.drag={k:'pan',sx:e.clientX,sy:e.clientY,ox:FB.cam.x,oy:FB.cam.y};
 if(FB.del){FB.del=null}});
document.addEventListener('pointermove',e=>{
 if(FB.ed){const E=FB.ed;if(E.cur&&e.pointerId===E.pid){const cv=E.el.querySelector('#fb-cv');if(!cv)return;const p=fbPt(cv,e),q=E.cur[2],n=q.length;if(Math.hypot(p[0]-q[n-2],p[1]-q[n-1])>=4){q.push(p[0],p[1]);fbRedraw()}e.preventDefault()}return}
 if(!(e.pointerId in FB.ptr))return;FB.ptr[e.pointerId]=[e.clientX,e.clientY];const d=FB.drag;if(!d)return;
 if(d.k==='pinch'){const ids=Object.keys(FB.ptr);if(ids.length<2)return;const a=FB.ptr[ids[0]],b=FB.ptr[ids[1]],v=document.getElementById('fbw');if(!v)return;const r=v.getBoundingClientRect(),nz=d.z*Math.hypot(a[0]-b[0],a[1]-b[1])/Math.max(d.d,1);fbZoom(nz/FB.cam.z,(a[0]+b[0])/2-r.left,(a[1]+b[1])/2-r.top)}
 else if(d.k==='pan'){FB.cam.x=d.ox+e.clientX-d.sx;FB.cam.y=d.oy+e.clientY-d.sy;fbApply()}
 else if(d.k==='note'){const dx=e.clientX-d.sx,dy=e.clientY-d.sy;if(!d.moved&&Math.hypot(dx,dy)<6)return;d.moved=true;d.n.x=Math.round(d.ox+dx/FB.cam.z);d.n.y=Math.round(d.oy+dy/FB.cam.z);d.el.style.left=d.n.x+'px';d.el.style.top=d.n.y+'px';d.el.classList.add('drag')}
 e.preventDefault()},{passive:false});
const fbUp=e=>{
 if(FB.ed){const E=FB.ed;if(E.cur&&e.pointerId===E.pid){if(E.s.length<400)E.s.push(E.cur);E.cur=null;fbRedraw()}return}
 if(!(e.pointerId in FB.ptr))return;delete FB.ptr[e.pointerId];const d=FB.drag;
 if(d&&d.k==='note'&&d.moved){d.el.classList.remove('drag');FB.pos[d.n.id]=[d.n.x,d.n.y];fbSave()}
 FB.drag=Object.keys(FB.ptr).length?FB.drag:null;if(d&&d.k==='pinch')FB.drag=null};
document.addEventListener('pointerup',fbUp);document.addEventListener('pointercancel',fbUp);
/* chặn trình duyệt coi nét vẽ, cú kéo là thao tác cuộn; nếu không, cú chạm ngay sau đó (ví dụ bấm Hoàn tác) có thể bị bỏ qua */
document.addEventListener('touchmove',e=>{const g=e.target;if(!g.closest)return;if(g.id==='fb-cv'||(g.closest('#fbw')&&!g.closest('button'))||g.closest('[data-drag]')){if(e.cancelable)e.preventDefault()}},{passive:false});
document.addEventListener('wheel',e=>{const v=e.target.closest&&e.target.closest('#fbw');if(!v||!(e.ctrlKey||e.metaKey))return;e.preventDefault();const r=v.getBoundingClientRect();fbZoom(e.deltaY<0?1.1:.9,e.clientX-r.left,e.clientY-r.top)},{passive:false});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(FB.dlg){fbDlgClose();return}if(FB.ed){fbClose();return}if(FB.full&&document.getElementById('fbw')){FB.full=false;FB.refit=true;render();return}}
 if(document.activeElement&&document.activeElement.id==='fbw'){const st=40;if(e.key==='ArrowLeft')FB.cam.x+=st;else if(e.key==='ArrowRight')FB.cam.x-=st;else if(e.key==='ArrowUp')FB.cam.y+=st;else if(e.key==='ArrowDown')FB.cam.y-=st;else if(e.key==='+'||e.key==='=')return fbZoom(1.25);else if(e.key==='-')return fbZoom(.8);else return;e.preventDefault();fbApply()}});
window.addEventListener('resize',()=>{if(document.getElementById('fbw'))fbApply()});
}
