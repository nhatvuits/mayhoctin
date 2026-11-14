/* May Học Tin: Góp ý.
   - fbOpen(): mở bảng trắng để bé hoặc ba mẹ viết, vẽ bằng tay, hoặc gõ chữ.
   - Mỗi góp ý thành một tờ ghi chú dán lên "Bảng góp ý" vô hạn ở cuối trang chủ: kéo để di chuyển bảng, phóng to thu nhỏ, kéo từng tờ để sắp xếp.
   - Góp ý lưu NGAY TRÊN MÁY NÀY (localStorage, khóa riêng, dùng chung cho mọi hồ sơ trên máy). Trang không có máy chủ nên góp ý không tự gửi đi đâu;
     nút Chia sẻ trên mỗi tờ xuất ra một tấm ảnh để gửi qua Zalo, email...
   Nét vẽ được lưu dạng tọa độ (không lưu ảnh) nên rất nhẹ. Nạp trước app.js. */
const FB_KEY='may-hoc-tin-gopy-v1',FB_MAX=80,FB_W=1000,FB_H=640;
const FB_PEN=['#12305a','#e2574c','#f08a24','#2f9e6e','#2f6fed','#8a4fd6'];
const FB_CAT=[['like','Em thích','I like this','#fff3c4'],['idea','Em muốn có thêm','I wish it had','#d9f2e3'],['fix','Chưa ổn, cần sửa','Needs fixing','#ffdcd6'],['other','Điều khác','Something else','#dbe9ff']];
const FB={notes:[],cam:{x:0,y:0,z:1},ed:null,ptr:{},drag:null};
try{const d=JSON.parse(localStorage.getItem(FB_KEY)||'[]');if(Array.isArray(d))FB.notes=d.filter(n=>n&&n.id)}catch(e){}
function fbSave(){try{localStorage.setItem(FB_KEY,JSON.stringify(FB.notes));return true}catch(e){toast(t('Máy hết chỗ lưu. Em xóa bớt góp ý cũ nhé.','Storage is full. Please delete some old notes.'));return false}}
const fbCat=id=>FB_CAT.find(c=>c[0]===id)||FB_CAT[3];
const fbDate=ts=>{try{return new Date(ts).toLocaleDateString(en()?'en-GB':'vi-VN')}catch(e){return ''}};
/* nét vẽ: [chỉ số màu (-1 là tẩy), độ dày, [x,y,x,y...]] trong khung FB_W × FB_H */
const fbStrokeSvg=s=>{const p=s[2],col=s[0]<0?'#fff':FB_PEN[s[0]]||FB_PEN[0];
 if(p.length<=2)return `<circle cx="${p[0]}" cy="${p[1]}" r="${s[1]/2}" fill="${col}"/>`;
 let d='';for(let i=0;i<p.length;i+=2)d+=(i?'L':'M')+p[i]+' '+p[i+1];return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${s[1]}" stroke-linecap="round" stroke-linejoin="round"/>`};
const fbDrawSvg=n=>`<svg class="fbn-draw" viewBox="0 0 ${FB_W} ${FB_H}" aria-label="${t('Hình vẽ góp ý','Drawn feedback')}" role="img"><rect width="${FB_W}" height="${FB_H}" fill="#fff"/>${n.s.map(fbStrokeSvg).join('')}</svg>`;

/* ============ BẢNG GÓP Ý VÔ HẠN (trang chủ) ============ */
const FB_NW=240,FB_GX=280,FB_GY=320,FB_COLS=4;
function fbSpot(){/* chỗ trống đầu tiên trên lưới 4 cột, để tờ mới không đè lên tờ cũ */
 for(let i=0;i<400;i++){const x=(i%FB_COLS)*FB_GX,y=Math.floor(i/FB_COLS)*FB_GY;if(!FB.notes.some(n=>Math.abs(n.x-x)<FB_GX*.7&&Math.abs(n.y-y)<FB_GY*.7))return [x,y]}return [0,0]}
function fbNoteH(n){const c=fbCat(n.cat),del=FB.del===n.id;
 return `<article class="fbn" data-fbn="${n.id}" style="left:${n.x}px;top:${n.y}px;background:${c[3]};transform:rotate(${n.r||0}deg)">
 <header class="fbn-top" title="${t('Kéo để di chuyển tờ này','Drag to move this note')}"><b>${t(c[1],c[2])}</b><span>${n.who==='par'?t('Phụ huynh','Parent'):t('Bé','Child')}${n.name?' · '+esc(n.name):''}</span></header>
 ${n.s&&n.s.length?fbDrawSvg(n):''}${n.txt?`<p class="fbn-txt">${esc(n.txt)}</p>`:''}
 <footer class="fbn-foot"><span>${fbDate(n.t)}</span><span class="fbn-acts"><button class="linkbtn" data-act="fb" data-k="share" data-v="${n.id}">${t('Chia sẻ','Share')}</button>${del?`<button class="linkbtn fbn-del" data-act="fb" data-k="del2" data-v="${n.id}">${t('Xóa thật?','Really delete?')}</button>`:`<button class="linkbtn" data-act="fb" data-k="del" data-v="${n.id}">${t('Xóa','Delete')}</button>`}</span></footer></article>`}
function fbBoardH(){const n=FB.notes.length;
 return `<section class="card stack fb-sec" id="gop-y"><div class="row" style="justify-content:space-between"><div><h2>${t('Bảng góp ý','Feedback board')}</h2><p class="muted">${t('Em và ba mẹ thích gì, muốn có thêm gì ở May Học Tin? Viết hoặc vẽ rồi dán lên bảng nhé.','What do you and your parents like, or wish May Học Tin had? Write or draw it and stick it on the board.')}</p></div><button class="btn sun" data-act="fb" data-k="open">${ic(FB_ICON)} ${t('Viết góp ý','Write feedback')}</button></div>
 <div class="fbw" id="fbw" tabindex="0" aria-label="${t('Bảng góp ý, kéo để di chuyển','Feedback board, drag to move around')}"><div class="fbworld" id="fbworld">${FB.notes.map(fbNoteH).join('')}</div>
 ${n?'':`<div class="fb-empty">${CLOUD}<p>${t('Chưa có góp ý nào. Em hãy là người đầu tiên nhé!','No feedback yet. Be the first!')}</p></div>`}
 <div class="fb-ctl"><button data-act="fb" data-k="zoom" data-v="-1" aria-label="${t('Thu nhỏ','Zoom out')}">−</button><span id="fbz">100%</span><button data-act="fb" data-k="zoom" data-v="1" aria-label="${t('Phóng to','Zoom in')}">+</button><button class="wide" data-act="fb" data-k="fit">${t('Xem tất cả','Show all')}</button></div></div>
 <p class="muted fb-hint">${t(`${n} góp ý. Kéo nền để di chuyển bảng, kéo một tờ để sắp xếp. Góp ý được lưu ngay trên máy này; bấm Chia sẻ trên một tờ để gửi nó đi dưới dạng ảnh.`,`${n} notes. Drag the background to move around, drag a note to rearrange. Notes are saved on this device; tap Share on a note to send it as a picture.`)}</p></section>`}
const FB_ICON='<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>';
function fbApply(){const w=document.getElementById('fbworld'),v=document.getElementById('fbw');if(!w||!v)return;const c=FB.cam;
 w.style.transform=`translate(${c.x}px,${c.y}px) scale(${c.z})`;v.style.backgroundSize=`${28*c.z}px ${28*c.z}px`;v.style.backgroundPosition=`${c.x}px ${c.y}px`;
 const z=document.getElementById('fbz');if(z)z.textContent=Math.round(c.z*100)+'%'}
function fbFit(only){const v=document.getElementById('fbw');if(!v)return;const W=v.clientWidth,H=v.clientHeight,ns=only?[only]:FB.notes;
 if(!ns.length){FB.cam={x:W/2-FB_NW/2,y:40,z:1};fbApply();return}
 const x0=Math.min(...ns.map(n=>n.x)),x1=Math.max(...ns.map(n=>n.x))+FB_NW,y0=Math.min(...ns.map(n=>n.y)),y1=Math.max(...ns.map(n=>n.y))+280;
 const z=Math.max(.3,Math.min(1,(W-32)/(x1-x0),(H-32)/(y1-y0)));FB.cam={z,x:(W-(x1-x0)*z)/2-x0*z,y:Math.max(16,(H-(y1-y0)*z)/2)-y0*z};fbApply()}
function fbZoom(f,cx,cy){const v=document.getElementById('fbw');if(!v)return;const c=FB.cam,z=Math.max(.3,Math.min(2.5,c.z*f));if(cx==null){cx=v.clientWidth/2;cy=v.clientHeight/2}
 c.x=cx-(cx-c.x)*(z/c.z);c.y=cy-(cy-c.y)*(z/c.z);c.z=z;fbApply()}
/* gọi sau mỗi lần vẽ lại trang */
function fbAfter(){if(!document.getElementById('fbw'))return;if(!FB.fitted){FB.fitted=true;fbFit()}else fbApply()}

/* ============ BẢNG TRẮNG ĐỂ VIẾT GÓP Ý ============ */
function fbOpen(){if(FB.ed)return;const E=FB.ed={s:[],pen:0,w:8,who:'kid',cat:'like',cur:null};
 const d=document.createElement('div');d.className='fbm';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-label',t('Viết góp ý','Write feedback'));E.el=d;document.body.appendChild(d);fbEdDraw();document.body.classList.add('fb-open')}
function fbClose(){const E=FB.ed;if(!E)return;E.el.remove();FB.ed=null;document.body.classList.remove('fb-open')}
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
 if(FB.notes.length>=FB_MAX){toast(t('Bảng đã đầy. Em xóa bớt góp ý cũ rồi dán tiếp nhé.','The board is full. Delete some old notes first.'));return}
 const sp=fbSpot(),n={id:'g'+Date.now().toString(36)+Math.floor(Math.random()*1e3),t:Date.now(),who:E.who,name:E.who==='kid'?String(S.name||'').slice(0,20):'',cat:E.cat,txt,s:E.s,x:sp[0],y:sp[1],r:Math.round((Math.random()*5-2.5)*10)/10};
 FB.notes.push(n);if(!fbSave()){FB.notes.pop();return}
 fbClose();sfx('snap');sfx('star');toast(t('Cảm ơn em! Góp ý đã được dán lên bảng.','Thank you! Your note is on the board.'));
 if(view!=='trang-chu')go('trang-chu');else render();
 setTimeout(()=>{const s=document.getElementById('gop-y');if(s)s.scrollIntoView({block:'center'});fbFit(n)},60)}
/* xuất một tờ góp ý thành ảnh PNG để chia sẻ hoặc tải về */
function fbShare(id){const n=FB.notes.find(x=>x.id===id);if(!n)return;const c=fbCat(n.cat),W=800,pad=32,hasD=n.s&&n.s.length,dh=hasD?Math.round((W-pad*2)*FB_H/FB_W):0;
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
 case 'share':fbShare(v);return false;
 case 'del':FB.del=v;return true;
 case 'del2':FB.notes=FB.notes.filter(n=>n.id!==v);FB.del=null;fbSave();sfx('flip');return true}
 return false}

/* ============ CHUỘT VÀ CẢM ỨNG: vẽ trên bảng trắng, kéo bảng, kéo từng tờ, chụm hai ngón để phóng to ============ */
if(typeof document!=='undefined'){
document.addEventListener('pointerdown',e=>{const tg=e.target;if(!tg.closest)return;
 if(FB.ed){if(tg.id==='fb-cv'){e.preventDefault();const E=FB.ed;E.pid=e.pointerId;E.cur=[E.pen,E.pen<0?Math.max(28,E.w*3):E.w,fbPt(tg,e)];try{tg.setPointerCapture(e.pointerId)}catch(x){}fbRedraw()}return}
 const v=tg.closest('#fbw');if(!v||tg.closest('button'))return;
 FB.ptr[e.pointerId]=[e.clientX,e.clientY];const ids=Object.keys(FB.ptr);
 if(ids.length===2){const a=FB.ptr[ids[0]],b=FB.ptr[ids[1]];FB.drag={k:'pinch',d:Math.hypot(a[0]-b[0],a[1]-b[1]),z:FB.cam.z};return}
 const ne=tg.closest('[data-fbn]');
 if(ne){const n=FB.notes.find(x=>x.id===ne.dataset.fbn);if(n)FB.drag={k:'note',n,el:ne,sx:e.clientX,sy:e.clientY,ox:n.x,oy:n.y,moved:false}}
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
 if(d&&d.k==='note'&&d.moved){d.el.classList.remove('drag');fbSave()}
 FB.drag=Object.keys(FB.ptr).length?FB.drag:null;if(d&&d.k==='pinch')FB.drag=null};
document.addEventListener('pointerup',fbUp);document.addEventListener('pointercancel',fbUp);
/* chặn trình duyệt coi nét vẽ, cú kéo là thao tác cuộn; nếu không, cú chạm ngay sau đó (ví dụ bấm Hoàn tác) có thể bị bỏ qua */
document.addEventListener('touchmove',e=>{const g=e.target;if(!g.closest)return;if(g.id==='fb-cv'||(g.closest('#fbw')&&!g.closest('button'))||g.closest('[data-drag]')){if(e.cancelable)e.preventDefault()}},{passive:false});
document.addEventListener('wheel',e=>{const v=e.target.closest&&e.target.closest('#fbw');if(!v||!(e.ctrlKey||e.metaKey))return;e.preventDefault();const r=v.getBoundingClientRect();fbZoom(e.deltaY<0?1.1:.9,e.clientX-r.left,e.clientY-r.top)},{passive:false});
document.addEventListener('keydown',e=>{if(FB.ed&&e.key==='Escape'){fbClose();return}
 if(document.activeElement&&document.activeElement.id==='fbw'){const st=40;if(e.key==='ArrowLeft')FB.cam.x+=st;else if(e.key==='ArrowRight')FB.cam.x-=st;else if(e.key==='ArrowUp')FB.cam.y+=st;else if(e.key==='ArrowDown')FB.cam.y-=st;else if(e.key==='+'||e.key==='=')return fbZoom(1.25);else if(e.key==='-')return fbZoom(.8);else return;e.preventDefault();fbApply()}});
window.addEventListener('resize',()=>{if(document.getElementById('fbw'))fbApply()});
}
