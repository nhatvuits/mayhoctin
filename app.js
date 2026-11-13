/* May Học Tin: giao diện, âm thanh, điều hướng. Dữ liệu ở data.js (tiếng Việt) và en.js (tiếng Anh). */
const GLOSS=[
['Hardware','Phần cứng','Các bộ phận sờ được của máy tính.','The parts of a computer you can touch.'],['Software','Phần mềm','Các chương trình chạy trên máy tính.','The programs that run on a computer.'],
['Operating system','Hệ điều hành','Phần mềm quản lý cả máy tính, ví dụ Windows.','The software that manages the whole computer, like Windows.'],['Input device','Thiết bị vào','Đưa thông tin vào máy: bàn phím, chuột.','Sends information in: keyboard, mouse.'],
['Output device','Thiết bị ra','Đưa thông tin ra: màn hình, loa, máy in.','Brings information out: monitor, speakers, printer.'],['Keyboard','Bàn phím','Dùng để gõ chữ và số.','Used to type letters and numbers.'],
['Mouse','Chuột','Dùng để trỏ và bấm chọn.','Used to point and click.'],['Monitor','Màn hình','Hiện hình ảnh và chữ.','Shows pictures and text.'],
['Printer','Máy in','In ra giấy.','Prints onto paper.'],['Storage','Lưu trữ','Nơi giữ dữ liệu lâu dài: ổ cứng, USB.','Where data is kept for a long time: hard drive, USB.'],
['File','Tệp','Một bài văn, bức ảnh hay bài hát lưu trong máy.','An essay, photo or song saved on the computer.'],['Folder','Thư mục','Ngăn chứa nhiều tệp.','A place that holds many files.'],
['Desktop','Màn hình nền','Màn hình chính sau khi mở máy.','The main screen after the computer starts.'],['Taskbar','Thanh tác vụ','Thanh dưới cùng màn hình Windows.','The bar at the bottom of the Windows screen.'],
['Recycle Bin','Thùng rác','Nơi chứa tệp đã xoá.','Where deleted files go.'],['Save','Lưu','Ghi bài vào máy để không mất.','Keep your work so it is not lost.'],
['Copy','Sao chép','Tạo thêm một bản giống hệt.','Make another identical one.'],['Cut','Cắt','Lấy ra để chuyển sang chỗ khác.','Take out to move somewhere else.'],
['Paste','Dán','Đặt thứ vừa sao chép hoặc cắt vào chỗ mới.','Put what you copied or cut in a new place.'],['Undo','Hoàn tác','Quay lại bước trước.','Go back one step.'],
['Bold','Chữ đậm','Nút B.','The B button.'],['Italic','Chữ nghiêng','Nút I.','The I button.'],['Underline','Gạch chân','Nút U.','The U button.'],
['Font','Phông chữ','Kiểu dáng của chữ.','The style of the letters.'],['Insert','Chèn','Thêm hình, bảng vào bài.','Add pictures or tables.'],
['Table','Bảng','Gồm các hàng và cột.','Made of rows and columns.'],['Cell','Ô','Nơi hàng và cột gặp nhau trong bảng tính.','Where a row meets a column in a spreadsheet.'],
['Row','Hàng','Chạy ngang, đánh số 1, 2, 3.','Goes across, numbered 1, 2, 3.'],['Column','Cột','Chạy dọc, đặt tên A, B, C.','Goes down, named A, B, C.'],
['Formula','Công thức','Phép tính bắt đầu bằng dấu =.','A calculation that starts with =.'],['Chart','Biểu đồ','Hình vẽ biểu diễn số liệu.','A picture that shows numbers.'],
['Slide','Trang chiếu','Một trang trong PowerPoint.','One page in PowerPoint.'],['Transition','Hiệu ứng chuyển slide','Xảy ra giữa hai slide.','Happens between two slides.'],
['Animation','Hiệu ứng động','Cho chữ, hình trong slide.','For text and pictures inside a slide.'],['Browser','Trình duyệt','Phần mềm xem trang web.','The program for viewing websites.'],
['Search engine','Máy tìm kiếm','Công cụ tìm thông tin như Google.','A tool for finding information, like Google.'],['Download','Tải xuống','Lấy tệp từ Internet về máy.','Bring a file from the Internet to your computer.'],
['Upload','Tải lên','Đưa tệp từ máy lên Internet.','Send a file from your computer to the Internet.'],['Hyperlink','Siêu liên kết','Bấm vào để mở trang khác.','Click it to open another page.'],
['Attachment','Tệp đính kèm','Tệp gửi kèm theo email.','A file sent with an email.'],['Password','Mật khẩu','Chìa khoá bí mật của tài khoản.','The secret key to your account.'],
['Copyright','Bản quyền','Quyền của tác giả với sản phẩm của mình.','An author’s right over their own work.'],['Sign out','Đăng xuất','Thoát khỏi tài khoản.','Leave your account.'],
['Update','Cập nhật','Nâng lên bản mới hơn.','Move to a newer version.']
];

/* ============ TIỆN ÍCH + LƯU TRỮ ============ */
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const KEY='may-tin-hoc-v1';
const FRESH=()=>({name:'',best:{},read:{},wrong:[],exams:[],typing:{},lang:'vi',skin:'sky',sfx:true,keys:'thock',song:'twinkle',okSnd:'chime',days:[],maxStreak:0,fixed:0,badges:[],doneDate:'',tstar:{},level:1,done:{}});
const KEY2='may-hoc-tin-v2';
let DB={cur:'p1',profiles:{}};
try{const d=JSON.parse(localStorage.getItem(KEY2)||'null');if(d&&d.profiles&&d.profiles[d.cur])DB=d;else{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o&&typeof o==='object')DB.profiles.p1=o}}catch(e){}
Object.keys(DB.profiles).forEach(k=>DB.profiles[k]=Object.assign(FRESH(),DB.profiles[k]));
if(!DB.profiles[DB.cur]){DB.cur=Object.keys(DB.profiles)[0]||'p1';if(!DB.profiles[DB.cur])DB.profiles[DB.cur]=FRESH()}
let S=DB.profiles[DB.cur];
const save=()=>{try{localStorage.setItem(KEY2,JSON.stringify(DB))}catch(e){}};
const en=()=>S.lang==='en';
const t=(v,e)=>en()?e:v;
const starN=p=>p>=90?3:p>=70?2:p>=50?1:0;
const starsH=n=>`<span class="stars" aria-label="${n}/3">${'<b>★</b>'.repeat(n)}${'★'.repeat(3-n)}</span>`;
const fmt=s=>{s=Math.max(0,Math.round(s));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};
/* tiến độ, chuỗi ngày học, huy hiệu */
const dayStr=o=>{const d=new Date();d.setDate(d.getDate()-(o||0));return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
function streak(){let n=0,o=S.days.includes(dayStr(0))?0:1;while(S.days.includes(dayStr(o))){n++;o++}return n}
function touch(){const d=dayStr(0);if(!S.days.includes(d)){S.days.push(d);S.days=S.days.slice(-120)}S.maxStreak=Math.max(S.maxStreak||0,streak());save()}
const LEVELS=[[1,'Nhận biết','Know'],[2,'Thực hành','Do'],[3,'Nâng cao','Lead']],EXN=[31,36,42];
const lvOf=()=>S.level>=1&&S.level<=3?S.level:1;
const bk=(id,lv)=>{lv=lv||lvOf();return lv===1?id:id+'@'+lv};
const Lof=(x,lv)=>{lv=lv||lvOf();return lv===1?x.L:(x['L'+lv]||[])};
const tstate=(id,lv)=>{const k=bk(id,lv);return S.read[k]&&(S.best[k]||0)>=70?'done':(S.read[k]||S.best[k]!=null)?'doing':'new'};
const tpct=(id,lv)=>{const k=bk(id,lv);return Math.round((S.read[k]?40:0)+Math.min(S.best[k]||0,70)/70*60)};
const doneN=lv=>TOPICS.filter(x=>tstate(x.id,lv)==='done').length;
function levelBar(){return `<div class="lvbar" role="group" aria-label="${t('Cấp độ','Level')}">${LEVELS.map(l=>`<button class="${lvOf()===l[0]?'on':''}" data-act="level" data-v="${l[0]}"><b>${t('Cấp độ','Level')} ${l[0]}</b><span>${t(l[1],l[2])} · ${doneN(l[0])}/${TOPICS.length}</span></button>`).join('')}</div>`}
const BI={book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',star:'<path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z"/>',trophy:'<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 20h8"/>',flame:'<path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/>',keys:'<rect x="3" y="7" width="18" height="11" rx="2"/><path d="M7 11h.01M11 11h.01M15 11h.01M8 15h8"/>',check:'<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',flag:'<path d="M5 21V4h11l-2 4 2 4H5"/>',chip:'<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>'};
const BADGES=[
['first','Bước đầu tiên','First step','Đọc xong 1 bài học','Read 1 lesson','book',()=>Object.keys(S.read).length>=1],
['reader','Mọt sách','Bookworm','Đọc bài của mọi chủ đề','Read the lessons of every topic','book',()=>TOPICS.every(x=>S.read[bk(x.id,1)])],
['star3','Ba sao lấp lánh','Three shiny stars','Đạt 3 sao ở một chủ đề','Get 3 stars in one topic','star',()=>Object.values(S.best).some(v=>v>=90)],
['half','Nửa chặng đường','Halfway there','Hoàn thành 5 chủ đề','Finish 5 topics','flag',()=>doneN(1)>=5],
['all','Chinh phục mọi chủ đề','Every topic conquered','Hoàn thành mọi chủ đề ở Cấp độ 1','Finish every topic at Level 1','trophy',()=>doneN(1)>=TOPICS.length],
['lv2','Chinh phục Cấp độ 2','Level 2 conquered','Hoàn thành mọi chủ đề ở Cấp độ 2','Finish every topic at Level 2','trophy',()=>doneN(2)>=TOPICS.length],
['lv3','Chinh phục Cấp độ 3','Level 3 conquered','Hoàn thành mọi chủ đề ở Cấp độ 3','Finish every topic at Level 3','trophy',()=>doneN(3)>=TOPICS.length],
['fix','Sửa sai giỏi','Mistake fixer','Sửa đúng 10 câu từng làm sai','Fix 10 questions you once missed','check',()=>(S.fixed||0)>=10],
['exam','Thí sinh dũng cảm','Brave candidate','Làm xong 1 bài thi thử','Finish 1 practice exam','flag',()=>S.exams.length>=1],
['e800','Vượt mốc 800','Over 800','Thi thử đạt từ 800 điểm','Score 800 or more in an exam','trophy',()=>S.exams.some(e=>e.score>=800)],
['type','Tay gõ nhanh','Quick fingers','Gõ đạt 100 ký tự/phút','Type 100 keys per minute','keys',()=>Object.values(S.typing).some(v=>v>=100)],
['d3','Chăm chỉ 3 ngày','3-day habit','Học 3 ngày liên tục','Study 3 days in a row','flame',()=>(S.maxStreak||0)>=3],
['d7','Chăm chỉ 7 ngày','7-day habit','Học 7 ngày liên tục','Study 7 days in a row','flame',()=>(S.maxStreak||0)>=7],
['builder','Kỹ sư lắp máy','Computer builder','Lắp xong máy tính trong phòng mô phỏng','Build the computer in the simulation lab','chip',()=>!!(S.sim&&S.sim.build>0)],
['pcpro','Chuyên gia máy tính','Computer expert','Đạt đủ 8 sao trong phòng mô phỏng','Get all 8 stars in the simulation lab','chip',()=>!!S.sim&&simStars()>=8]];
function toast(msg){try{const d=document.createElement('div');d.className='toast';d.textContent=msg;document.body.appendChild(d);setTimeout(()=>d.remove(),4200)}catch(e){}}
function checkBadges(){if(!S.done)S.done={};if(S.doneDate&&!S.done[1])S.done[1]=S.doneDate;[1,2,3].forEach(l=>{if(doneN(l)>=TOPICS.length&&!S.done[l]){S.done[l]=new Date().toLocaleDateString('vi-VN');save()}});
 const nw=BADGES.filter(b=>b[6]()&&!S.badges.includes(b[0]));if(!nw.length)return;S.badges=S.badges.concat(nw.map(b=>b[0]));save();toast(t('Huy hiệu mới: ','New badge: ')+nw.map(b=>t(b[1],b[2])).join(', '));sfx('star');confetti()}
/* nội dung theo ngôn ngữ */
function tp(x){const e=en()&&EN_T[x.id];if(!e)return x;const o=Object.assign({},x,{name:e.name,sub:e.sub,tip:e.tip,L:x.L.map((l,i)=>[e.L[i][0],e.L[i][1],l[2]])});if(e.L2)o.L2=e.L2;if(e.L3)o.L3=e.L3;return o}
const T=id=>{const x=TOPICS.find(t=>t.id===id);return x&&tp(x)};
function lq(q){if(!en())return q;const e=EN_Q[q.id];if(!e)return q;
 if(q.k==='one'||q.k==='multi')return Object.assign({},q,{q:e[0],o:e[1],e:e[2]});
 if(q.k==='sort')return Object.assign({},q,{q:e[0],g:e[1],items:q.items.map((it,i)=>[e[2][i],it[1]]),e:e[3]});
 if(q.k==='type')return Object.assign({},q,{q:e[0],e:e[2]});
 if(q.k==='order')return Object.assign({},q,{q:e[0],steps:e[1],e:e[2]});
 return Object.assign({},q,{q:e[0],al:e[1],e:e[2]})}

/* ============ ÂM THANH (tổng hợp bằng Web Audio, không cần tệp) ============ */
let AC=null,NB=null,lastKey=0;
function actx(){try{if(!AC){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;AC=new C()}if(AC.state==='suspended')AC.resume();return AC}catch(e){return null}}
function tone(f,at,d,type,g,f2){const a=actx();if(!a)return;const t0=a.currentTime+at,o=a.createOscillator(),v=a.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+d);
 v.gain.setValueAtTime(.0001,t0);v.gain.exponentialRampToValueAtTime(g||.15,t0+.008);v.gain.exponentialRampToValueAtTime(.0001,t0+d);o.connect(v);v.connect(a.destination);o.start(t0);o.stop(t0+d+.03)}
function noise(at,d,ftype,freq,g){const a=actx();if(!a)return;if(!NB){NB=a.createBuffer(1,Math.floor(a.sampleRate*.2),a.sampleRate);const ch=NB.getChannelData(0);for(let i=0;i<ch.length;i++)ch[i]=Math.random()*2-1}
 const t0=a.currentTime+at,s=a.createBufferSource(),f=a.createBiquadFilter(),v=a.createGain();s.buffer=NB;f.type=ftype;f.frequency.value=freq;v.gain.setValueAtTime(g,t0);v.gain.exponentialRampToValueAtTime(.0001,t0+d);s.connect(f);f.connect(v);v.connect(a.destination);s.start(t0);s.stop(t0+d+.02)}
function sfx(n,k){if(!S.sfx)return;try{
 if(n==='ok'&&S.okSnd==='coin')coin();
 else if(n==='ok'){const up=Math.min(k||0,6)*40;tone(660+up,0,.12,'triangle',.16);tone(880+up,.09,.2,'triangle',.16)}
 else if(n==='bad'){tone(230,0,.16,'sine',.12);tone(185,.13,.24,'sine',.1)}
 else if(n==='err')tone(160,0,.09,'square',.05);
 else if(n==='win')[523,659,784,1047,1319].forEach((f,i)=>tone(f,i*.1,.28,'triangle',.15));
 else if(n==='end'){tone(440,0,.2,'triangle',.12);tone(523,.16,.3,'triangle',.12)}
 else if(n==='tap')tone(540,0,.05,'sine',.05);
 else if(n==='flip')noise(0,.06,'highpass',2500,.12);
 else if(n==='star'){tone(988,0,.1,'sine',.12);tone(1319,.08,.25,'sine',.12)}
}catch(e){}}
/* Giai điệu dân gian, cổ điển thuộc phạm vi công cộng. Mỗi nốt: tên nốt, quãng tám (mặc định 4), mỗi dấu - kéo dài thêm một phách. */
const SONGS=[
['twinkle','Ngôi sao lấp lánh','Twinkle, Twinkle','C C G G A A G- F F E E D D C- G G F F E E D- G G F F E E D- C C G G A A G- F F E E D D C-'],
['frere','Kìa con bướm vàng','Frère Jacques','C D E C C D E C E F G- E F G- G A G F E- C- G A G F E- C- C G3 C- C G3 C-'],
['birthday','Chúc mừng sinh nhật','Happy Birthday','G G A- G- C5- B-- G G A- G- D5- C5-- G G G5- E5- C5- B- A- F5 F5 E5- C5- D5- C5--'],
['jingle','Jingle Bells','Jingle Bells','E E E- E E E- E G C D E--- F F F F F E E E E D D E D- G- E E E- E E E- E G C D E--- F F F F F E E E G G F D C---'],
['mary','Mary có chú cừu con','Mary Had a Little Lamb','E D C D E E E- D D D- E G G- E D C D E E E E D D E D C-'],
['ode','Khúc hoan ca','Ode to Joy','E E F G G F E D C C D E E- D D- E E F G G F E D C C D E D- C C-'],
['farm','Nông trại của bác MacDonald','Old MacDonald','G G G D E E D- B B A A G-- D G G G D E E D- B B A A G--'],
['bridge','Cầu London','London Bridge','G A G F E F G- D E F- E F G- G A G F E F G- D- G- E C-']];
const SEMI={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
const parseSong=str=>str.split(' ').map(x=>{const m=/^([A-G])(\d?)(-*)$/.exec(x);return [261.63*Math.pow(2,(SEMI[m[1]]+12*((+m[2]||4)-4))/12),1+m[3].length]});
const SONGN={};SONGS.forEach(s=>SONGN[s[0]]=parseSong(s[3]));
let songPos=0,listenEnd=0;
function pnote(f,at,d){tone(f,at,d,'triangle',.17);tone(f*2,at,d*.6,'sine',.04)}
function coin(at){at=at||0;tone(1047,at,.07,'square',.06);tone(1568,at+.07,.38,'square',.06);tone(3136,at+.07,.2,'sine',.03)}
function playSong(id){if(Date.now()<listenEnd)return;const ns=SONGN[id];let tm=0;const beat=.3;try{ns.forEach(([f,l])=>{pnote(f,tm,Math.max(.4,l*beat));tm+=l*beat})}catch(e){}listenEnd=Date.now()+tm*1000}
const PENTA=[262,294,330,392,440,523,587,659,784,880];
function keySnd(kind,ch,force){const m=force||S.keys;if(m==='off')return;try{const r=.94+Math.random()*.12,sp=kind==='space';
 if(m==='blue'){noise(0,.025,'highpass',3600*r,.22);tone(2200*r,0,.012,'square',.04);noise(.045,.02,'highpass',5200,.08);if(sp)tone(170,0,.05,'sine',.1)}
 else if(m==='thock'){noise(0,.045,'lowpass',(sp?380:680)*r,.5);tone((sp?95:135)*r,0,.07,'sine',.26)}
 else if(m==='type'){noise(0,.035,'bandpass',2400*r,.45);tone(1100*r,0,.02,'square',.05);if(kind==='enter')tone(1760,.03,.7,'sine',.13)}
 else if(m==='bubble')tone((sp?260:400)*r,0,.09,'sine',.2,(sp?620:980)*r);
 else if(m==='song'){const ns=SONGN[S.song]||SONGN.twinkle;pnote(ns[songPos++%ns.length][0],0,.5)}
 else if(m==='coin')coin();
 else if(m==='piano')tone(sp?131:PENTA[((ch||'a').charCodeAt(0))%10],0,.4,'triangle',.16)
}catch(e){}}
const KEYMODES=[['off','Tắt','Off'],['thock','Thock trầm êm','Soft thock'],['blue','Blue switch lách cách','Clicky blue switch'],['type','Máy đánh chữ','Typewriter'],['bubble','Bong bóng','Bubbles'],['piano','Đàn piano','Piano'],['song','Piano đàn bài hát','Piano plays a song'],['coin','Ăn đồng xu','Coin collect']];
const SKINS=[['sky','Trời xanh','Blue sky','linear-gradient(#9fd3ff,#fff)'],['pink','Hồng kẹo ngọt','Candy pink','linear-gradient(#ff8fc2,#ffe3f0)'],['purple','Tím mộng mơ','Dreamy purple','linear-gradient(#a488ff,#ece3ff)'],['rainbow','Cầu vồng','Rainbow','linear-gradient(135deg,#ff7b7b,#ffb347,#ffe94d,#6fdc8c,#6bb8ff,#a98bff)'],['banana','Xanh chuối','Banana green','linear-gradient(#aee11a,#f4fcc9)'],['night','Đêm sao','Starry night','linear-gradient(#16224d,#4a5ca8)']];
function confetti(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const box=document.createElement('div');box.className='cfbox';const cs=['#ff5b5b','#ff9f1a','#ffd21f','#3ec46d','#3a9bff','#8b5bff','#ff6fb5'];
 for(let i=0;i<46;i++){const s=document.createElement('i');s.style.left=Math.random()*100+'%';s.style.background=cs[i%cs.length];s.style.animationDelay=Math.random()*.6+'s';s.style.animationDuration=1.6+Math.random()*1.2+'s';box.appendChild(s)}
 document.body.appendChild(box);setTimeout(()=>box.remove(),3600)}catch(e){}}

/* ============ MÔ PHỎNG GIAO DIỆN ============ */
const WB=[['save','Lưu','Save','<path d="M4 3h12l4 4v14H4z"/><path d="M8 3v5h7V3M7 21v-7h10v7"/>'],['undo','Hoàn tác','Undo','<path d="M8 6 4 10l4 4"/><path d="M4 10h9a5 5 0 0 1 0 10h-3"/>'],['redo','Làm lại','Redo','<path d="M16 6l4 4-4 4"/><path d="M20 10h-9a5 5 0 0 0 0 10h3"/>'],0,
['cut','Cắt','Cut','<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 16 18 4M16 16 6 4"/>'],['copy','Sao chép','Copy','<rect x="8" y="8" width="12" height="13" rx="1.5"/><path d="M16 8V4H4v13h4"/>'],['paste','Dán','Paste','<rect x="5" y="5" width="14" height="16" rx="1.5"/><rect x="9" y="3" width="6" height="4" rx="1"/>'],0,
['bold','Đậm','Bold','B'],['italic','Nghiêng','Italic','<i>I</i>'],['underline','Gạch chân','Underline','<u>U</u>'],0,
['alignL','Căn trái','Align left','<path d="M4 6h16M4 10h10M4 14h16M4 18h10"/>'],['alignC','Căn giữa','Center','<path d="M4 6h16M7 10h10M4 14h16M7 18h10"/>'],['alignR','Căn phải','Align right','<path d="M4 6h16M10 10h10M4 14h16M10 18h10"/>'],0,
['print','In','Print','<path d="M7 8V3h10v5M7 17H3V8h18v9h-4"/><rect x="7" y="13" width="10" height="8"/>']];
function wordUI(cls,labels){return `<div class="sim"><div class="wordui">${WB.map(b=>{if(!b)return '<span class="sep"></span>';const inner=/^<(path|rect|circle)/.test(b[3])?ic(b[3]):b[3];
 return labels?`<div class="tb">${inner}<small>${t(b[1],b[2])}</small></div>`:`<button class="tb ${cls(b[0])}" data-act="spot" data-v="${b[0]}" aria-label="${t('Nút công cụ','Toolbar button')}">${inner}</button>`}).join('')}</div></div>`}
function excelUI(cls,demo){const cols=['A','B','C','D'];let h='<div class="sim"><table class="xl"><tr><th></th>'+cols.map(c=>`<th>${c}</th>`).join('')+'</tr>';
 for(let r=1;r<=5;r++){h+=`<tr><th>${r}</th>`+cols.map(c=>{const id=c+r;return '<td>'+(demo?`<span class="cell ${id==='B3'?'hl':''}">${id==='B3'?'B3':''}</span>`:`<button class="${cls(id)}" data-act="spot" data-v="${id}" aria-label="${t('Một ô','A cell')}"></button>`)+'</td>'}).join('')+'</tr>'}
 return h+'</table></div>'}
const KB=[['`','1','2','3','4','5','6','7','8','9','0','-','=',['backspace','Backspace',2]],
[['tab','Tab',1.5],'q','w','e','r','t','y','u','i','o','p','[',']','\\'],
[['caps','Caps Lock',1.9],'a','s','d','f','g','h','j','k','l',';',"'",['enter','Enter',2.2]],
[['shift','Shift',2.4],'z','x','c','v','b','n','m',',','.','/',['shift2','Shift',2.6]],
[['ctrl','Ctrl',1.5],['alt','Alt',1.5],['space','',7],['alt2','Alt',1.5],['ctrl2','Ctrl',1.5]]];
function kbUI(cls,click){return `<div class="sim"><div class="kb">${KB.map(r=>`<div class="kr">${r.map(k=>{const id=Array.isArray(k)?k[0]:k,lb=Array.isArray(k)?k[1]:k,w=Array.isArray(k)?k[2]:1;
 const c=`key ${Array.isArray(k)?'wide':''} ${cls(id)}`;return click?`<button class="${c}" style="flex-grow:${w}" data-act="spot" data-v="${esc(id)}">${esc(lb)}</button>`:`<div class="${c}" style="flex-grow:${w}">${esc(lb)}</div>`}).join('')}</div>`).join('')}</div></div>`}

/* ============ PHIÊN LÀM BÀI ============ */
let W=null,view='trang-chu',tick=null,panelOpen=false;
const tnorm=x=>String(x==null?'':x).toLowerCase().replace(/\s+/g,'');
function newItem(q){const st={v:null,flag:false,checked:false};
 if(q.k==='type')st.v='';
 if(q.k==='one')st.perm=shuffle(q.o.map((_,i)=>i));
 if(q.k==='multi'){st.perm=shuffle(q.o.map((_,i)=>i));st.v=[]}
 if(q.k==='sort'){st.perm=shuffle(q.items.map((_,i)=>i));st.v={}}
 if(q.k==='order'){let p;do{p=shuffle(q.steps.map((_,i)=>i))}while(p.every((x,i)=>x===i));st.perm=p;st.v=[]}
 return {q,st}}
function answered({q,st}){if(q.k==='type')return tnorm(st.v)!=='';return q.k==='one'||q.k==='spot'?st.v!==null:q.k==='multi'?st.v.length===q.n:q.k==='sort'?Object.keys(st.v).length===q.items.length:st.v.length===q.steps.length}
function touched({q,st}){if(q.k==='type')return tnorm(st.v)!=='';return q.k==='one'||q.k==='spot'?st.v!==null:q.k==='sort'?Object.keys(st.v).length>0:st.v.length>0}
function correct({q,st}){if(q.k==='type')return q.a.some(a=>tnorm(a)===tnorm(st.v));if(q.k==='one')return st.v===0;if(q.k==='spot')return st.v===q.a;
 if(q.k==='multi')return st.v.length===q.n&&st.v.every(x=>x<q.n);
 if(q.k==='sort')return q.items.every((it,i)=>st.v[i]===it[1]);
 return st.v.length===q.steps.length&&st.v.every((x,i)=>x===i)}
function ansText(q0){const q=lq(q0);if(q.k==='type')return q.a[0];if(q.k==='one')return q.o[0];if(q.k==='multi')return q.o.slice(0,q.n).join('; ');if(q.k==='spot')return q.al;
 if(q.k==='order')return q.steps.join(' → ');return q.g.map((g,gi)=>g+': '+q.items.filter(it=>it[1]===gi).map(it=>it[0]).join(', ')).join('. ')}
function wTitle(){const L=' · '+t('Cấp độ','Level')+' '+(W.lv||1);return W.topic?T(W.topic).name+L:W.kind==='review'?t('Ôn câu em làm sai','Fix my mistakes'):W.kind==='full'?t('Thi thử như thật','Practice exam')+L:t('Thi thử nhanh','Quick practice exam')+L}
function wTitleOld(){return W.topic?T(W.topic).name:W.kind==='review'?t('Ôn câu em làm sai','Fix my mistakes'):W.kind==='full'?t('Thi thử như thật','Practice exam'):t('Thi thử nhanh','Quick practice exam')}
function start(mode,qs,opt){W=Object.assign({mode,items:qs.map(newItem),i:0,done:false,confirm:false,combo:0},opt||{});
 if(mode==='exam'){W.end=Date.now()+W.mins*60000;clearInterval(tick);tick=setInterval(onTick,1000)}
 go('lam-bai')}
function left(){return (W.end-Date.now())/1000}
function onTick(){if(!W||W.mode!=='exam'||W.done){clearInterval(tick);return}
 const l=left();if(l<=0){finish();if(view==='lam-bai')render();return}
 const el=document.getElementById('timer');if(el){el.textContent=fmt(l);el.classList.toggle('low',l<300)}}
function finish(){W.done=true;W.confirm=false;clearInterval(tick);
 const n=W.items.length,ok=W.items.filter(correct).length;W.ok=ok;W.pct=Math.round(ok/n*100);
 W.items.forEach(it=>{const id=it.q.id,i=S.wrong.indexOf(id);if(correct(it)){if(i>=0){S.wrong.splice(i,1);S.fixed=(S.fixed||0)+1}}else if(i<0)S.wrong.push(id)});touch();
 if(W.mode==='practice'&&W.topic){const k=bk(W.topic,W.lv||1);S.best[k]=Math.max(S.best[k]||0,W.pct)}
 if(W.mode==='exam'){S.exams.unshift({d:new Date().toLocaleDateString('vi-VN'),n,ok,score:Math.round(ok/n*1000),lv:W.lv||1});S.exams=S.exams.slice(0,10)}
 save();if(W.pct>=70){sfx('win');confetti()}else sfx('end')}

function qHtml(it,reveal){const q=lq(it.q),st=it.st,L='ABCDEF';
 const lab=q.yn?t('Chọn Đúng hoặc Sai cho mỗi câu','Choose Yes or No for each statement'):{type:t('Gõ câu trả lời','Type your answer'),one:t('Chọn 1 đáp án','Choose 1 answer'),multi:t(`Chọn ${q.n} đáp án`,`Choose ${q.n} answers`),sort:t('Xếp mỗi mục vào đúng nhóm','Put each item in the right group'),order:t('Bấm các bước theo đúng thứ tự','Tap the steps in the right order'),spot:t('Bấm vào đúng chỗ trên hình','Click the right spot in the picture')}[q.k];
 let h=`<div class="qtype">${lab}</div><p class="qtext">${esc(q.q)}</p>`;const dis=reveal?'disabled':'';
 if(q.k==='one'||q.k==='multi'){const isSel=i=>q.k==='one'?st.v===i:st.v.includes(i),isOk=i=>q.k==='one'?i===0:i<q.n;
  h+='<div class="opts">'+st.perm.map((i,p)=>`<button class="opt ${q.k==='multi'?'sq':''} ${isSel(i)?'sel':''} ${reveal?(isOk(i)?'ok':isSel(i)?'bad':''):''}" data-act="pick" data-v="${i}" ${dis}><span class="mk">${L[p]}</span><span>${esc(q.o[i])}</span></button>`).join('')+'</div>'}
 if(q.k==='sort'){h+='<div>'+st.perm.map(i=>`<div class="srow"><span>${esc(q.items[i][0])}</span><div class="chips">${q.g.map((g,gi)=>`<button class="chip ${st.v[i]===gi?'sel':''} ${reveal?(q.items[i][1]===gi?'ok':st.v[i]===gi?'bad':''):''}" data-act="assign" data-i="${i}" data-v="${gi}" ${dis}>${esc(g)}</button>`).join('')}</div></div>`).join('')+'</div>'}
 if(q.k==='order'){h+='<div class="opts">'+st.perm.map(i=>{const pos=st.v.indexOf(i);return `<button class="opt ${pos>=0?'sel':''} ${reveal?(pos===i?'ok':'bad'):''}" data-act="step" data-v="${i}" ${dis}><span class="mk">${pos>=0?pos+1:''}</span><span>${esc(q.steps[i])}</span></button>`}).join('')+'</div>';
  if(!reveal)h+=`<p class="muted">${t('Bấm lần lượt từ bước 1. Bấm lại vào một bước để bỏ chọn.','Tap step 1 first, then the rest. Tap a step again to remove it.')}</p>`}
 if(q.k==='spot'){const cls=id=>(st.v===id?'sel ':'')+(reveal?(id===q.a?'ok':st.v===id?'bad':''):'');
  h+=q.ui==='word'?wordUI(cls):q.ui==='excel'?excelUI(cls):kbUI(cls,true)}
 if(q.k==='type')h+=`<input class="field q-type ${reveal?(correct(it)?'ok':'bad'):''}" id="q-type" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" value="${esc(st.v||'')}" placeholder="${t('Gõ câu trả lời vào đây','Type your answer here')}" ${dis}><p class="muted">${t('Chữ hoa hay chữ thường đều được.','Capitals or small letters are both fine.')}</p>`;
 return h}

/* ============ CÁC MÀN HÌNH ============ */
const CLOUD='<svg class="cloud" viewBox="0 0 100 78" aria-hidden="true"><ellipse cx="50" cy="72" rx="30" ry="4" fill="#12305a" opacity=".12"/><path d="M26 60a17 17 0 0 1-2-34 24 24 0 0 1 46-4 19 19 0 0 1 6 38z" fill="#fff" stroke="#12305a" stroke-width="2.5"/><circle cx="40" cy="40" r="3.5" fill="#12305a"/><circle cx="60" cy="40" r="3.5" fill="#12305a"/><circle cx="33" cy="47" r="4" fill="#ffb3a8"/><circle cx="67" cy="47" r="4" fill="#ffb3a8"/><path d="M43 48q7 7 14 0" fill="none" stroke="#12305a" stroke-width="2.5" stroke-linecap="round"/></svg>';
const qOf=(id,lv)=>{lv=lv||lvOf();return Q.filter(q=>q.t===id&&(q.lv||1)===lv)};
const NAV=[['trang-chu','Bài học','Lessons','<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>'],['thi-thu','Thi thử','Practice exam','<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10l2 2 4-4M9 16h6"/>','Exam'],['go-phim','Gõ phím','Typing','<rect x="3" y="7" width="18" height="11" rx="2"/><path d="M7 11h.01M11 11h.01M15 11h.01M8 15h8"/>'],['tu-dien','Từ điển','Dictionary','<path d="M12 6c-2-2-5-2-8-1v13c3-1 6-1 8 1 2-2 5-2 8-1V5c-3-1-6-1-8 1zM12 6v13"/>','Words'],['phu-huynh','Phụ huynh','Parents','<circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.2"/><path d="M3 20c0-3.5 2.5-6 6-6s6 2.5 6 6M15 20c0-2 .8-4.5 3-4.5 1.800 0 3 1.500 3 4.500"/>']];

function renderChrome(){document.documentElement.lang=S.lang;if(S.skin&&S.skin!=='sky')document.body.dataset.skin=S.skin;else delete document.body.dataset.skin;
 const on=n=>n===view||(n==='trang-chu'&&(view.startsWith('hoc-')||view==='may-tinh'||(view==='lam-bai'&&W&&W.mode!=='exam')))||(n==='thi-thu'&&view==='lam-bai'&&W&&W.mode==='exam')||(n==='phu-huynh'&&view==='giay-khen');
 document.getElementById('head').innerHTML=`<a class="logo" href="#trang-chu"><svg viewBox="0 0 100 70" aria-hidden="true"><path d="M26 60a17 17 0 0 1-2-34 24 24 0 0 1 46-4 19 19 0 0 1 6 38z" fill="#fff" stroke="#12305a" stroke-width="3"/><circle cx="40" cy="40" r="3.5" fill="#12305a"/><circle cx="60" cy="40" r="3.5" fill="#12305a"/><path d="M43 49q7 6 14 0" fill="none" stroke="#12305a" stroke-width="3" stroke-linecap="round"/></svg><span>May Học Tin</span></a>
 <nav class="topnav" aria-label="${t('Mục chính','Main sections')}">${NAV.map(n=>`<a href="#${n[0]}" ${on(n[0])?'aria-current="page"':''}>${t(n[1],n[2])}</a>`).join('')}</nav>
 <div class="tools"><div class="seg" role="group" aria-label="${t('Ngôn ngữ','Language')}"><button class="${en()?'':'on'}" data-act="lang" data-v="vi"><span class="full">Tiếng Việt</span><span class="short">VI</span></button><button class="${en()?'on':''}" data-act="lang" data-v="en"><span class="full">English</span><span class="short">EN</span></button></div>
 <button class="toolbtn ${panelOpen?'on':''}" data-act="panel" aria-expanded="${panelOpen}">${ic('<circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="10" r="1.2"/><circle cx="12" cy="7.5" r="1.2"/><circle cx="15.5" cy="10" r="1.2"/><path d="M12 21c-1.5 0-2-1.2-1.3-2.4.7-1.2 2.3-1.1 3.8-1.1"/>')}<span>${t('Hồ sơ, màu, âm thanh','Profile, colours, sounds')}</span></button></div>`;
 document.getElementById('panel').innerHTML=panelOpen?`<section class="card stack panel">
  <div class="row" style="justify-content:space-between"><h2>${t('Hồ sơ học tập','Learner profiles')}</h2><button class="btn" data-act="panel">${t('Xong','Done')}</button></div>${profH()}
  <h2>${t('Chọn màu em thích','Pick your colours')}</h2>
  <div class="swatches">${SKINS.map(s=>`<button class="sw ${(S.skin||'sky')===s[0]?'on':''}" data-act="skin" data-v="${s[0]}"><i style="background:${s[3]}"></i><span>${t(s[1],s[2])}</span></button>`).join('')}</div>
  <h2>${t('Âm thanh','Sounds')}</h2>
  <div class="row"><span class="lbl">${t('Âm thanh khen thưởng','Reward sounds')}</span><div class="seg"><button class="${S.sfx?'on':''}" data-act="sfx" data-v="1">${t('Bật','On')}</button><button class="${S.sfx?'':'on'}" data-act="sfx" data-v="0">${t('Tắt','Off')}</button></div></div>
  <div class="row"><span class="lbl">${t('Tiếng khi trả lời đúng','Sound for a right answer')}</span><div class="seg"><button class="${S.okSnd==='coin'?'':'on'}" data-act="oksnd" data-v="chime">${t('Chuông','Chime')}</button><button class="${S.okSnd==='coin'?'on':''}" data-act="oksnd" data-v="coin">${t('Đồng xu','Coin')}</button></div></div>
  <div><span class="lbl">${t('Tiếng bàn phím (keycap)','Keyboard sound (keycaps)')}</span><div class="chips" style="margin-top:8px">${KEYMODES.map(k=>`<button class="chip ${S.keys===k[0]?'sel':''}" data-act="keys" data-v="${k[0]}">${t(k[1],k[2])}</button>`).join('')}</div></div>
  ${S.keys==='song'?`<div><span class="lbl">${t('Chọn bài hát. Mỗi lần gõ phím là một nốt nhạc, gõ đều tay sẽ thành bài.','Pick a song. Every key you press plays the next note, so steady typing plays the tune.')}</span><div class="chips" style="margin-top:8px">${SONGS.map(s=>`<button class="chip ${S.song===s[0]?'sel':''}" data-act="song" data-v="${s[0]}">${t(s[1],s[2])}</button>`).join('')}</div><div class="row" style="margin-top:10px"><button class="btn" data-act="listen">${t('Nghe thử cả bài','Listen to the whole tune')}</button></div></div>`:''}
  <label class="lbl" for="try-in">${t('Gõ thử vào đây để nghe','Type here to hear it')}</label><input id="try-in" class="field" autocomplete="off" placeholder="${t('Gõ gì cũng được','Type anything')}">
 </section>`:'';
 document.getElementById('tabbar').innerHTML=NAV.map(n=>`<a href="#${n[0]}" ${on(n[0])?'aria-current="page"':''}>${ic(n[3])}<span>${t(n[1],n[4]||n[2])}</span></a>`).join('');
 document.getElementById('foot').textContent=t('May Học Tin là trang luyện tập miễn phí. Câu hỏi do trang tự biên soạn theo các chủ đề của IC3 Spark và chương trình Tin học tiểu học, không phải đề thi chính thức.','May Học Tin is a free practice site. Its questions are written by the site around the IC3 Spark topics and the Vietnamese primary informatics curriculum. They are not official exam questions.')}

function mission(){const x=TOPICS.find(y=>tstate(y.id)!=='done');
 if(!x)return {txt:t('Em đã hoàn thành mọi chủ đề. Giờ thì thi thử nhé!','Every topic is done. Time for a practice exam!'),pct:100,btn:`<a class="btn primary" href="#thi-thu">${t('Vào phòng thi thử','Go to the exam room')} →</a>`};
 const n=tp(x).name;
 if(!S.read[bk(x.id)])return {txt:t('Đọc bài học: ','Read the lesson: ')+n,pct:tpct(x.id),btn:`<a class="btn primary" href="#hoc-${x.id}">${t('Học cùng Mây','Learn with Mây')} →</a>`};
 return {txt:t('Luyện tập đạt từ 70%: ','Score 70% or more in practice: ')+n,pct:tpct(x.id),btn:`<button class="btn primary" data-act="practice" data-v="${x.id}">${t('Luyện tập cùng Mây','Practise with Mây')} →</button>`}}
function vHome(){const total=TOPICS.reduce((s,x)=>s+starN(S.best[bk(x.id)]||0),0),ex=S.exams[0],m=mission(),sk=streak(),dn=doneN();
 const nm=S.name?esc(S.name):t('bạn nhỏ','friend');
 const pill=id=>({new:`<span class="pill none">${t('Chưa học','Not started')}</span>`,doing:`<span class="pill warn">${t('Đang học','In progress')}</span>`,done:`<span class="pill ok">${t('Hoàn thành','Done')}</span>`}[tstate(id)]);
 return `<div class="stack">
 <section class="card hero compact">${CLOUD}<div class="txt">
  <h1>${t(`Chào ${nm}!`,`Hi ${nm}!`)}</h1>
  <p>${t('Hôm nay chúng mình cùng khám phá thế giới Tin học nhé.','Let’s explore the world of computing today.')}</p>
  ${S.name?'':`<label class="namebox" for="name-in">${t('Tên của em','Your name')}: <input id="name-in" class="field name-in" maxlength="20" value="" placeholder="${t('Gõ tên em vào đây','Type your name here')}" autocomplete="off"></label>`}
  <div class="stats"><span class="stat"><b>${dn}</b>/${TOPICS.length} ${t('chủ đề hoàn thành','topics done')}</span><span class="stat"><b>${total}</b>/${TOPICS.length*3} ${t('sao','stars')}</span><span class="stat"><b>${sk}</b>${t('ngày học liên tục','day streak')}</span></div>
 </div>
 ${levelBar()}${lvOf()>1&&doneN(lvOf()-1)<TOPICS.length?`<p class="muted" style="flex:1 1 100%">${t(`Em nên hoàn thành Cấp độ ${lvOf()-1} trước khi học cấp độ này.`,`It is best to finish Level ${lvOf()-1} before this one.`)}</p>`:''}
 <div class="mission"><div class="qtype">${t('Nhiệm vụ tiếp theo','Next mission')}</div><p class="mtxt">${m.txt}</p><div class="bar"><i style="width:${m.pct}%"></i></div><div class="row">${m.btn}${S.wrong.length?`<button class="btn sun" data-act="review">${t(`Ôn ${S.wrong.length} câu em làm sai`,`Fix ${S.wrong.length} mistakes`)}</button>`:''}</div></div>
 </section>
 ${simPromo()}
 <div><h2>${t(`Hành trình ${TOPICS.length} chủ đề · Cấp độ ${lvOf()}`,`Your ${TOPICS.length}-topic journey · Level ${lvOf()}`)}</h2><p class="muted">${t('Chủ đề nào cũng mở sẵn. Em học theo thứ tự hoặc chọn chủ đề mình còn yếu.','Every topic is open. Follow the order or jump to one you find hard.')}</p></div>
 <div class="grid">${TOPICS.map((x0,i)=>{const x=tp(x0),b=S.best[bk(x.id)];return `<a class="tcard" style="--tc:${x.c}" href="#hoc-${x.id}"><div class="hd"><span class="icb">${ic(x.icon)}</span><div><div class="n">${t('Chủ đề','Topic')} ${i+1} · ${Lof(x).length} ${t('bài','lessons')} · ${qOf(x.id).length} ${t('câu','questions')}</div><h3>${x.name}</h3></div></div><p>${x.sub}</p><div class="tbar"><i style="width:${tpct(x.id)}%"></i></div><div class="ft">${pill(x.id)}<span class="row" style="gap:8px">${b!=null?`<span class="tnum">${b}%</span>`:''}${starsH(starN(b||0))}</span></div></a>`}).join('')}</div>
 <section class="card stack"><div class="row" style="justify-content:space-between"><div><h2>${t('Huy hiệu của em','Your badges')}</h2><p class="muted">${t(`Em đã có ${S.badges.length}/${BADGES.length} huy hiệu.`,`You have ${S.badges.length} of ${BADGES.length} badges.`)}</p></div><a class="btn" href="#giay-khen">${t('Giấy khen của em','Your certificate')}</a></div>
 <div class="badges">${BADGES.map(b=>{const got=S.badges.includes(b[0]);return `<div class="badge ${got?'got':''}"><span class="bi">${ic(BI[b[5]])}</span><b>${t(b[1],b[2])}</b><small>${got?t('Đã đạt','Earned'):t(b[3],b[4])}</small></div>`}).join('')}</div></section>
 <section class="card"><div class="row" style="justify-content:space-between"><div><h3>${t('Thi thử như thi thật','A practice exam like the real one')}</h3><p class="muted">${t('Ba cấp độ: 31, 36 và 42 câu trong 50 phút, đủ các dạng câu hỏi, có chấm điểm theo từng chủ đề.','Three levels: 31, 36 and 42 questions in 50 minutes, every question type, with a score for each topic.')}</p></div><a class="btn" href="#thi-thu">${t('Xem phòng thi thử','Open the exam room')}</a></div></section>
 <section class="card pstrip"><div class="row" style="justify-content:space-between"><div><h3>${t('Góc phụ huynh','Parents’ corner')}</h3><p class="muted">${t(`Đã hoàn thành ${dn}/${TOPICS.length} chủ đề, còn ${S.wrong.length} câu đang sai, điểm thi thử gần nhất: ${ex?ex.score+'/1000':'chưa thi'}.`,`${dn} of ${TOPICS.length} topics done, ${S.wrong.length} questions still missed, latest exam score: ${ex?ex.score+'/1000':'none yet'}.`)}</p></div><a class="btn" href="#phu-huynh">${t('Xem báo cáo và lịch học','See the report and timetable')}</a></div></section>
 </div>`}

function vTopic(id){const x=T(id);if(!x)return vHome();const i=TOPICS.findIndex(y=>y.id===id);
 if(!S.read[bk(id)]){S.read[bk(id)]=1;touch()}
 const none=()=>'',nx=TOPICS[i+1]&&tp(TOPICS[i+1]);
 return `<div class="stack" style="--tc:${x.c}"><a class="back" href="#trang-chu">← ${t('Về danh sách chủ đề','Back to all topics')}</a>
 <section class="card"><div class="row"><span class="icb" style="background:${x.c}">${ic(x.icon)}</span><div><div class="muted">${t('Chủ đề','Topic')} ${i+1}</div><h1>${x.name}</h1></div></div></section>
 ${levelBar()}${id==='mt'?simPromo():''}
 ${Lof(x).map((l,k)=>`<section class="card lesson"><div class="no">${t('Bài','Lesson')} ${k+1}</div><h2>${l[0]}</h2>${l[1]}${l[2]==='word'?wordUI(none,true):l[2]==='excel'?excelUI(none,true):''}${lvOf()===1?lwFrame(id,k):''}</section>`).join('')}
 <div class="tip"><h3>${t('Mẹo của Mây','Mây’s tip')}</h3><p>${x.tip}</p></div>
 <section class="card"><div class="row" style="justify-content:space-between"><div><h3>${t('Em đọc xong rồi chứ?','Finished reading?')}</h3><p class="muted">${t(`${qOf(id).length} câu hỏi, có giải thích sau mỗi câu. Đúng từ 90% được 3 sao.`,`${qOf(id).length} questions with an explanation after each one. Score 90% or more for 3 stars.`)}</p></div><button class="btn primary" data-act="practice" data-v="${id}">${t('Luyện tập chủ đề này','Practise this topic')}</button></div></section>
 ${nx?`<a class="back" href="#hoc-${nx.id}">${t('Chủ đề kế tiếp','Next topic')}: ${nx.name} →</a>`:''}</div>`}

function vWork(){if(!W)return vHome();if(W.done)return vResult();
 const it=W.items[W.i],n=W.items.length,exam=W.mode==='exam',rv=it.st.checked,last=W.i===n-1;
 let h=`<div class="stack"><div class="work-top"><b>${esc(wTitle())}</b><span>${t('Câu','Question')} ${W.i+1}/${n}</span>${exam?`<span class="timer" id="timer">${fmt(left())}</span>`:W.combo>=2?`<span class="pill warn">${t(`${W.combo} câu đúng liên tiếp`,`${W.combo} in a row`)}</span>`:''}</div>
 <div class="bar"><i style="width:${exam?W.items.filter(touched).length/n*100:(W.i+(rv?1:0))/n*100}%"></i></div>
 <section class="card stack">${qHtml(it,rv)}</section>`;
 if(!exam){if(rv){const ok=correct(it),good=en()?['Correct!','Well done!','That’s right!','Brilliant!']:['Chính xác!','Giỏi lắm!','Đúng rồi!','Tuyệt vời!'];
   h+=`<div class="fb ${ok?'good':'wrong'}"><h3>${ok?good[W.i%4]:t('Chưa đúng rồi','Not quite')}</h3>${ok?'':`<p><b>${t('Đáp án đúng','Correct answer')}:</b> ${esc(ansText(it.q))}</p>`}<p>${esc(lq(it.q).e)}</p></div>
   <div class="row"><button class="btn primary" data-act="next">${last?t('Xem kết quả','See my result'):t('Câu tiếp theo','Next question')}</button></div>`}
  else h+=`<div class="row"><button class="btn primary" data-act="check" ${answered(it)?'':'disabled'}>${t('Kiểm tra','Check')}</button><button class="btn" data-act="quit">${t('Dừng lại','Stop')}</button></div>`}
 else{const un=W.items.filter(x=>!answered(x)).length,fl=W.items.filter(x=>x.st.flag).length;
  h+=`<div class="row"><button class="btn" data-act="prev" ${W.i?'':'disabled'}>← ${t('Câu trước','Previous')}</button><button class="btn ${it.st.flag?'sun':''}" data-act="flag">${it.st.flag?t('Đã đánh dấu','Marked'):t('Đánh dấu xem lại','Mark for review')}</button><button class="btn" data-act="qreset">${t('Làm lại câu này','Reset this question')}</button><button class="btn primary" data-act="next" ${last?'disabled':''}>${t('Câu sau','Next')} →</button></div>
  <section class="card stack"><div class="palette">${W.items.map((x,k)=>`<button class="${touched(x)?'done':''} ${x.st.flag?'flag':''} ${k===W.i?'cur':''}" data-act="jump" data-v="${k}" aria-label="${k+1}">${k+1}</button>`).join('')}</div>
  ${W.confirm?`<div class="tip"><p><b>${t('Em chắc chắn muốn nộp bài?','Are you sure you want to hand in?')}</b> ${t(`Còn ${un} câu chưa làm xong và ${fl} câu đang đánh dấu.`,`${un} questions are unfinished and ${fl} are marked.`)}</p><div class="row" style="margin-top:10px"><button class="btn primary" data-act="submit">${t('Nộp bài','Hand in')}</button><button class="btn" data-act="unconfirm">${t('Làm tiếp','Keep going')}</button></div></div>`:`<div class="row"><button class="btn sun" data-act="confirm">${t('Nộp bài','Hand in')}</button><span class="muted">${t('Ô có màu là câu đã làm. Vạch vàng là câu đánh dấu.','Coloured boxes are answered. A yellow stripe means marked.')}</span></div>`}</section>`}
 return h+'</div>'}

function vResult(){const n=W.items.length,exam=W.mode==='exam',wrong=W.items.filter(x=>!correct(x));
 let h=`<div class="stack"><section class="card hero">${CLOUD}<div class="txt">`;
 if(exam){const sc=Math.round(W.ok/n*1000);h+=`<h1>${sc>=800?t('Xuất sắc! Em đã sẵn sàng','Excellent! You are ready'):sc>=700?t('Em đã qua mốc 700 điểm','You passed the 700 mark'):t('Em đã hoàn thành bài thi thử','You finished the practice exam')}</h1><div><span class="big">${sc}</span><span class="muted"> / 1000 ${t('điểm','points')}</span></div><p>${t(`Em làm đúng ${W.ok}/${n} câu. Bài thi thật cần 700 điểm để đạt. Mây đặt mục tiêu luyện tập 800 điểm để em có khoảng an toàn.`,`You got ${W.ok} of ${n} right. The real exam needs 700 points to pass. Mây sets a practice goal of 800 to leave a safety margin.`)}</p>`}
 else{h+=`<h1>${W.pct>=90?t('Tuyệt vời!','Amazing!'):W.pct>=70?t('Làm tốt lắm!','Great work!'):t('Cố thêm chút nữa nhé!','Almost there, keep going!')}</h1><div class="row"><span class="big">${W.ok}/${n}</span>${W.topic?starsH(starN(W.pct)):''}</div><p>${W.pct>=70?t('Em nắm chủ đề này khá chắc rồi.','You know this topic well.'):t('Em đọc lại bài học rồi luyện thêm một lần nữa nhé.','Read the lesson again, then have another go.')}</p>`}
 h+=`<div class="row">${W.topic?`<button class="btn primary" data-act="practice" data-v="${W.topic}">${t('Luyện lại','Practise again')}</button><a class="btn" href="#hoc-${W.topic}">${t('Đọc lại bài','Read the lesson')}</a>`:''}${exam?`<a class="btn primary" href="#thi-thu">${t('Thi lần nữa','Take another exam')}</a>`:''}<a class="btn" href="#trang-chu">${t('Về trang bài học','Back to lessons')}</a></div></div></section>`;
 if(exam){h+=`<section class="card stack"><h2>${t('Điểm theo chủ đề','Score by topic')}</h2><div class="tablebox"><table class="t"><tr><th>${t('Chủ đề','Topic')}</th><th>${t('Đúng','Right')}</th><th></th><th></th></tr>${TOPICS.map(x=>{const xs=W.items.filter(y=>y.q.t===x.id);if(!xs.length)return '';const ok=xs.filter(correct).length,p=ok/xs.length*100;return `<tr><td>${tp(x).name}</td><td class="tnum">${ok}/${xs.length}</td><td><div class="tbar"><i style="width:${p}%"></i></div></td><td>${p<60?`<a class="back" href="#hoc-${x.id}">${t('Ôn lại','Review')}</a>`:''}</td></tr>`}).join('')}</table></div></section>`}
 if(wrong.length)h+=`<section class="card stack"><h2>${t(`Xem lại ${wrong.length} câu chưa đúng`,`Look again at ${wrong.length} missed questions`)}</h2>${wrong.map(x=>`<div class="lesson"><p><b>${esc(lq(x.q).q)}</b></p><p><span class="pill ok">${t('Đáp án đúng','Correct answer')}</span> ${esc(ansText(x.q))}</p><p class="muted">${esc(lq(x.q).e)}</p></div>`).join('<hr class="dot">')}</section>`;
 return h+'</div>'}

function vExamIntro(){const run=W&&W.mode==='exam'&&!W.done;
 const tips=en()?['Read the question carefully: how <b>many answers</b>, sort into groups, Yes/No, or <b>type the answer</b>.','Spend about 1 minute on each question. <b>Mark</b> hard ones and come back later.','Never leave a question empty. Cross out wrong answers, then choose.','For online safety questions the answer is usually: do not do it, and tell an adult.','If you have time left, check your marked questions before handing in.']:['Đọc kỹ đề: chọn <b>mấy đáp án</b>, kéo thả vào nhóm, chọn Đúng/Sai hay <b>gõ câu trả lời</b>.','Mỗi câu chỉ nên dùng khoảng 1 phút. Câu khó thì <b>đánh dấu</b> rồi làm câu khác trước.','Không bỏ trống câu nào. Chưa chắc thì loại dần đáp án sai rồi chọn.','Câu về an toàn trên mạng: thường là không làm theo và báo người lớn.','Còn thời gian thì xem lại các câu đã đánh dấu trước khi nộp.'];
 return `<div class="stack"><section class="card hero">${CLOUD}<div class="txt"><h1>${t('Phòng thi thử','Exam room')}</h1><p>${t('Thi thử giống thi thật: có đồng hồ đếm ngược, không hiện đáp án khi đang làm, được đánh dấu câu khó để quay lại sau.','Just like the real exam: a countdown clock, no answers shown while you work, and you can mark hard questions to come back to.')}</p>
 ${run?`<div class="tip"><p>${t('Em đang có một bài thi dở, còn','You have an exam in progress, time left')} ${fmt(left())}.</p><div class="row" style="margin-top:10px"><a class="btn primary" href="#lam-bai">${t('Làm tiếp bài đang dở','Continue my exam')}</a></div></div>`:''}
 ${levelBar()}<div class="row"><button class="btn primary" data-act="exam" data-v="full">${t(`Thi như thật Cấp độ ${lvOf()}: ${EXN[lvOf()-1]} câu, 50 phút`,`Like the real Level ${lvOf()}: ${EXN[lvOf()-1]} questions, 50 minutes`)}</button><button class="btn" data-act="exam" data-v="quick">${t('Thi nhanh: 18 câu, 20 phút','Quick exam: 18 questions, 20 minutes')}</button></div></div></section>
 <section class="card lesson"><h2>${t('5 mẹo làm bài của Mây','Mây’s 5 exam tips')}</h2><ul>${tips.map(x=>`<li>${x}</li>`).join('')}</ul></section>
 <section class="card lesson"><h2>${t('Ngày thi thật, em nhớ nhé','On the real exam day')}</h2><ul>${(en()?['Arrive on time and dress neatly.','Bring the ID papers your parents prepared.','Put your things away and listen to the exam supervisor.','Check that your name on the screen is right before you start.','Do your own work. Do not look at anyone else’s screen or talk about answers.','When you finish, hand in and wait for the supervisor before leaving.','You see your score straight away.']:['Đến đúng giờ, mặc gọn gàng, lịch sự.','Mang giấy tờ ba mẹ đã chuẩn bị.','Cất đồ dùng cá nhân và nghe thầy cô coi thi hướng dẫn.','Xem tên mình trên màn hình đã đúng chưa rồi mới làm bài.','Tự làm bài của mình, không nhìn bài bạn, không trao đổi đáp án.','Làm xong thì nộp bài và chờ thầy cô xác nhận rồi mới ra khỏi phòng.','Em sẽ biết điểm ngay sau khi nộp bài.']).map(x=>`<li>${x}</li>`).join('')}</ul></section>
 ${S.exams.length?`<section class="card stack"><h2>${t('Các lần thi gần đây','Recent exams')}</h2><div class="tablebox"><table class="t"><tr><th>${t('Ngày','Date')}</th><th>${t('Cấp độ','Level')}</th><th>${t('Đúng','Right')}</th><th>${t('Điểm','Score')}</th></tr>${S.exams.map(e=>`<tr><td>${esc(e.d)}</td><td class="tnum">${e.lv||1}</td><td class="tnum">${e.ok}/${e.n}</td><td class="tnum"><b>${e.score}</b></td></tr>`).join('')}</table></div></section>`:''}</div>`}

/* ---- gõ phím: trò chơi Mây du hành ---- */
const SCN=[['Vườn hoa','Flower garden','#ff6fa5','một bông hoa nở','a flower blooms'],['Bãi biển','Beach','#f0a81a','một chú sao biển hiện ra','a starfish appears'],['Đại dương','Ocean','#1c7fd0','một chú cá nhảy lên','a fish jumps up'],['Đồi núi','Mountains','#6f86d6','một cây thông mọc lên','a pine tree grows'],['Thảo nguyên','Grassland','#6fae3a','một chú cừu chạy tới','a sheep trots in']];
/* [cảnh, tên Việt, tên Anh, phím mới, các phím đã học] */
const TL=[[0,'F và J','F and J','fj','fj'],[0,'D và K','D and K','dk','fjdk'],[0,'S, L và A','S, L and A','sla','fjdksla'],[0,'G, H và cả hàng cơ sở','G, H and the whole home row','gh','asdfghjkl'],
[1,'E, I, R, U','E, I, R, U','eiru','asdfghjkleiru'],[1,'T, Y, W, O','T, Y, W, O','tywo','asdfghjkleirutywo'],[1,'Q, P và cả hàng trên','Q, P and the whole top row','qp','qwertyuiopasdfghjkl'],
[2,'V, M, C, N','V, M, C, N','vmcn','qwertyuiopasdfghjklvmcn'],[2,'B, X, Z và cả hàng dưới','B, X, Z and the whole bottom row','bxz','abcdefghijklmnopqrstuvwxyz'],
[3,'Từ ngắn','Short words',null,'w1'],[3,'Từ Tin học','Computer words',null,'w2'],[4,'Câu hoàn chỉnh','Whole sentences',null,'s']];
const TW={w1:[['ba','me','em','ca','la','hoa','may','nha','xe','cay','meo','cho','ga','bo','vit','sach','but','ban','ghe','lop'],['cat','dog','sun','sky','sea','tree','book','fish','bird','milk','rain','star','moon','hill','lake','frog','cake','kite','ball','leaf']],
 w2:[['may tinh','ban phim','chuot','man hinh','thu muc','tep','trinh chieu','bang tinh','van ban','mat khau','an toan','internet'],['computer','keyboard','mouse','monitor','folder','file','slide','spreadsheet','document','password','browser','internet']],
 s:[['em yeu may tinh cua em','may bay tren bau troi xanh','em luon giu mat khau bi mat','ngoi thang lung khi go phim','nho luu bai truoc khi tat may','hoc tin hoc cung may rat vui'],['the cloud floats over the green hills','always keep your password a secret','save your work before you shut down','sit up straight when you type','typing with ten fingers is fun','i can type without looking down']]};
const FING={};[['út trái','left little finger','`1qaz'],['áp út trái','left ring finger','2wsx'],['giữa trái','left middle finger','3edc'],['trỏ trái','left index finger','45rtfgvb'],['trỏ phải','right index finger','67yuhjnm'],['giữa phải','right middle finger','8ik,'],['áp út phải','right ring finger','9ol.'],['út phải','right little finger',"0p;/-=[]'\\"]].forEach(([v,e,ks],i)=>[...ks].forEach(k=>FING[k]=[v,e,i]));FING[' ']=['cái','thumb',8];
const ZCLS=['zp','zr','zm','zi','zi','zm','zr','zp','zt'],ZKEY={tab:0,caps:0,shift:0,backspace:7,enter:7,shift2:7,space:8};
const zoneOf=id=>{const z=id in ZKEY?ZKEY[id]:FING[id]?FING[id][2]:-1;return z<0?'':ZCLS[z]};
const ZC=['#ffb3a8','#ffe08a','#a9e6c1','#b3d4ff','#b3d4ff','#a9e6c1','#ffe08a','#ffb3a8'],ZT='#d9c7ff';
function handsSVG(a){const H=[50,66,74,64],f=(x,h,col,on)=>`<rect x="${x}" y="${92-h}" width="26" height="${h+12}" rx="13" fill="${col}" stroke="#12305a" stroke-width="${on?3.5:1.5}" opacity="${on?1:.38}"/>`,palm=x=>`<rect x="${x}" y="86" width="122" height="36" rx="16" fill="#fff" stroke="#12305a" stroke-width="1.5"/>`,th=(x,r,on)=>`<rect x="${x}" y="70" width="26" height="46" rx="13" fill="${ZT}" stroke="#12305a" stroke-width="${on?3.5:1.5}" opacity="${on?1:.38}" transform="rotate(${r} ${x+13} 104)"/>`;
 let g=th(138,38,a===8)+th(256,-38,a===8);
 for(let i=0;i<4;i++)g+=f(20+i*32,H[i],ZC[i],a===i)+f(278+i*32,H[3-i],ZC[4+i],a===4+i);
 g+=palm(20)+palm(278);
 return `<svg class="hands" viewBox="0 0 420 128" aria-hidden="true">${g}</svg>`}

/* cảnh nền: tranh vẽ riêng của trang, màu cố định */
function sceneItem(sc,i){const P=['#ff6fa5','#ffb02e','#b57bff','#ff5b5b'][i%4];
 if(sc===0)return `<path d="M0 0V-26" stroke="#3f9a4a" stroke-width="3"/><path d="M0-10q8-6 12 0" fill="none" stroke="#3f9a4a" stroke-width="3"/>${[0,72,144,216,288].map(a=>`<circle cx="${(9*Math.sin(a*Math.PI/180)).toFixed(1)}" cy="${(-34-9*Math.cos(a*Math.PI/180)).toFixed(1)}" r="7" fill="${P}"/>`).join('')}<circle cx="0" cy="-34" r="5.5" fill="#ffd34d"/>`;
 if(sc===1)return `<polygon points="${[0,1,2,3,4,5,6,7,8,9].map(k=>{const r=k%2?8:19,a=k*36*Math.PI/180;return (r*Math.sin(a)).toFixed(1)+','+(-16-r*Math.cos(a)).toFixed(1)}).join(' ')}" fill="${i%2?'#ff8a5b':'#ff6f8f'}" stroke="#c9503a" stroke-width="1.5"/><circle cx="-4" cy="-18" r="1.6" fill="#12305a"/><circle cx="4" cy="-18" r="1.6" fill="#12305a"/>`;
 if(sc===2)return `<path d="M-22 0q22-14 44 0" fill="none" stroke="#fff" stroke-width="3" opacity=".8"/><g transform="rotate(-28 0 -24)"><ellipse cx="0" cy="-24" rx="17" ry="9.5" fill="${i%2?'#ffb02e':'#ff7f50'}"/><polygon points="-15,-24 -28,-34 -28,-14" fill="${i%2?'#ffb02e':'#ff7f50'}"/><circle cx="8" cy="-26" r="2" fill="#12305a"/></g>`;
 if(sc===3)return `<rect x="-3" y="-8" width="6" height="8" fill="#8a5a2b"/><polygon points="0,-52 -13,-30 13,-30" fill="#2f8f5b"/><polygon points="0,-40 -17,-18 17,-18" fill="#2f8f5b"/><polygon points="0,-28 -21,-6 21,-6" fill="#278050"/>`;
 return `<path d="M-9 0v-8M7 0v-8" stroke="#12305a" stroke-width="3" stroke-linecap="round"/><circle cx="-8" cy="-16" r="9" fill="#fff"/><circle cx="2" cy="-20" r="10" fill="#fff"/><circle cx="10" cy="-14" r="8" fill="#fff"/><circle cx="-1" cy="-11" r="9" fill="#fff"/><ellipse cx="18" cy="-19" rx="6" ry="7" fill="#3a3550"/><circle cx="20" cy="-21" r="1.4" fill="#fff"/>`}
function sceneSVG(sc,n,done){let bg='';
 if(sc===0)bg=`<defs><linearGradient id="g0" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#aee0ff"/><stop offset="1" stop-color="#eefaff"/></linearGradient></defs><rect width="800" height="240" fill="url(#g0)"/><circle cx="705" cy="48" r="27" fill="#ffd34d"/><path d="M0 170q130-60 280-18t280-16 240 6v98H0z" fill="#b6e39a"/><path d="M0 196q200-30 400-8t400-10v62H0z" fill="#7cc76a"/>${[70,250,470,640].map(x=>`<circle cx="${x}" cy="190" r="16" fill="#5fb257"/><circle cx="${x+18}" cy="194" r="12" fill="#5fb257"/>`).join('')}`;
 if(sc===1)bg=`<rect width="800" height="240" fill="#cfeeff"/><circle cx="110" cy="52" r="27" fill="#ffd34d"/><rect y="104" width="800" height="76" fill="#4fb3e8"/><path d="M0 122q50-9 100 0t100 0 100 0 100 0 100 0 100 0 100 0 100 0M0 146q50-9 100 0t100 0 100 0 100 0 100 0 100 0 100 0 100 0" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/><path d="M0 172q200-22 400-6t400-8v82H0z" fill="#f6dc9a"/><path d="M660 178V118" stroke="#8a5a2b" stroke-width="5"/><path d="M612 122a48 30 0 0 1 96 0z" fill="#ff6b6b"/><path d="M644 122a16 30 0 0 1 32 0z" fill="#fff"/>`;
 if(sc===2)bg=`<defs><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3aa6e6"/><stop offset="1" stop-color="#1c6fb8"/></linearGradient></defs><rect width="800" height="240" fill="#d9f1ff"/><circle cx="690" cy="44" r="25" fill="#ffd34d"/><rect y="96" width="800" height="144" fill="url(#g2)"/><ellipse cx="150" cy="98" rx="62" ry="13" fill="#f2d48a"/><path d="M150 96V58" stroke="#8a5a2b" stroke-width="5"/><path d="M150 58q-30-14-44 6M150 58q30-14 44 6M150 58q-6-26-30-22M150 58q6-26 30-22" fill="none" stroke="#2f8f5b" stroke-width="6" stroke-linecap="round"/><polygon points="540,100 610,100 598,114 552,114" fill="#fff" stroke="#12305a" stroke-width="2"/><path d="M575 100V52" stroke="#12305a" stroke-width="3"/><polygon points="578,54 606,94 578,94" fill="#ff6b6b"/><path d="M0 138q50-9 100 0t100 0 100 0 100 0 100 0 100 0 100 0 100 0M0 176q50-9 100 0t100 0 100 0 100 0 100 0 100 0 100 0 100 0" fill="none" stroke="#fff" stroke-width="3" opacity=".35"/>`;
 if(sc===3)bg=`<defs><linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6e2ff"/><stop offset="1" stop-color="#fff1dc"/></linearGradient></defs><rect width="800" height="240" fill="url(#g3)"/><circle cx="120" cy="60" r="24" fill="#ffd89a"/><polygon points="40,200 210,62 380,200" fill="#a9b9ea"/><polygon points="330,200 520,40 710,200" fill="#93a6e2"/><polygon points="580,200 700,84 820,200" fill="#a9b9ea"/><polygon points="210,62 184,84 200,80 212,92 226,80 238,86" fill="#fff"/><polygon points="520,40 488,68 506,62 520,78 536,62 554,70" fill="#fff"/><polygon points="-40,206 140,118 320,206" fill="#7f95d8"/><path d="M0 204q200-22 400-8t400-8v52H0z" fill="#73bb6c"/>`;
 if(sc===4)bg=`<defs><linearGradient id="g4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe4ff"/><stop offset="1" stop-color="#f3fbe6"/></linearGradient></defs><rect width="800" height="240" fill="url(#g4)"/><circle cx="640" cy="56" r="27" fill="#ffd34d"/><path d="M0 150q160-34 330-8t470-14v112H0z" fill="#cfe68f"/><path d="M0 182q220-26 430-6t370-10v74H0z" fill="#a3d463"/><path d="M300 240q60-44 10-70t60-40" fill="none" stroke="#e9f5c4" stroke-width="12" stroke-linecap="round"/><rect x="92" y="150" width="76" height="34" rx="6" fill="#fff" stroke="#12305a" stroke-width="2"/><path d="M86 152q44-40 88 0z" fill="#ffe9c7" stroke="#12305a" stroke-width="2"/><rect x="122" y="162" width="16" height="22" rx="3" fill="#d9601a"/>`;
 const items=Array.from({length:n},(_,i)=>`<g transform="translate(${Math.round(800*(i+.5)/n)},${sc===2?210:224})"><g class="it ${i<done?'on':''}">${sceneItem(sc,i)}</g></g>`).join('');
 return `<svg class="tg-bg" viewBox="0 0 800 240" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${bg}${items}</svg>`}

let TY={lv:0};
function newType(lv){const L=TL[lv],rnd=s=>s[Math.floor(Math.random()*s.length)];let text;
 if(L[3]){const g=[];for(let i=0;i<8;i++){let w='';const len=lv===0?2+(i%2):3+(i%2);for(let j=0;j<len;j++)w+=Math.random()<.62?rnd(L[3]):rnd(L[4]);g.push(w)}text=g.join(' ')}
 else{const pool=shuffle(TW[L[4]][en()?1:0]);if(L[4]==='s')text=pool[0];else{const out=[];let n=0;for(const p of pool){const k=p.split(' ').length;if(n+k>8)continue;out.push(p);n+=k;if(n>=8)break}text=out.join(' ')}}
 TY={lv,text,n:text.split(' ').length,pos:0,err:0,t0:0,done:false,combo:0,maxCombo:0}}
const tyDone=()=>TY.text.slice(0,TY.pos).split(' ').length-1+(TY.pos>=TY.text.length?1:0);
/* bàn phím chạm trên màn hình cho điện thoại, máy tính bảng: S.tkb = 'touch' | 'real'; chưa chọn thì tự nhận theo thiết bị */
const tkbOn=()=>{if(S.tkb)return S.tkb==='touch';try{return matchMedia('(pointer:coarse)').matches}catch(e){return false}};
const TKR=['qwertyuiop','asdfghjkl','zxcvbnm'];
function tkbUI(kid){return `<div class="tkb">${TKR.map((r,i)=>`<div class="tkr tkr${i}">${[...r].map(k=>`<button class="key ${zoneOf(k)}${k===kid?' next':''}${k==='f'||k==='j'?' bump':''}" data-tk="${k}" aria-label="${k.toUpperCase()}">${k}</button>`).join('')}</div>`).join('')}<div class="tkr"><button class="key zt sp${kid==='space'?' next':''}" data-tk=" ">${t('phím cách','space')}</button></div></div>`}
/* chế độ toàn màn hình: ẩn thanh trên, thanh dưới, chân trang; trình duyệt nào cho phép thì mở toàn màn hình thật */
let FOCUS=false,FSON=false;
const focusable=()=>view==='go-phim'||view==='may-tinh';
function setFocus(on){FOCUS=on;try{const d=document,el=d.documentElement;if(on){const f=el.requestFullscreen||el.webkitRequestFullscreen;if(f)Promise.resolve(f.call(el)).catch(()=>{})}else if(d.fullscreenElement||d.webkitFullscreenElement){const x=d.exitFullscreen||d.webkitExitFullscreen;if(x)Promise.resolve(x.call(d)).catch(()=>{})}}catch(e){}}
const focusBtn=()=>`<button class="toolbtn focusbtn ${FOCUS?'on':''}" data-act="focus" aria-pressed="${FOCUS}">${ic(FOCUS?'<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>':'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>')}<span>${FOCUS?t('Thoát toàn màn hình','Exit full screen'):t('Toàn màn hình','Full screen')}</span></button>`;
function vType(){if(!TY.text)newType(TY.lv||0);const st=S.tstar||{};
 return `<div class="stack"><section class="card stack nofocus"><div><h1>${t('Mây du hành bàn phím','Mây’s keyboard journey')}</h1><p>${t('Giúp Mây bay qua 5 vùng đất. Đặt hai ngón trỏ lên <kbd>F</kbd> và <kbd>J</kbd>, nhìn màn hình rồi gõ theo dòng chữ. Không cần gõ nhanh, gõ đúng mới được nhiều sao.','Help Mây fly across 5 lands. Rest your index fingers on <kbd>F</kbd> and <kbd>J</kbd>, look at the screen and type the line. No need to rush: accuracy earns the stars.')}</p></div>
 <div class="tg-levels">${SCN.map((sc,si)=>`<div class="tg-grp"><div class="tg-gh"><i style="background:${sc[2]}"></i>${t(sc[0],sc[1])}</div><div class="chips">${TL.map((l,i)=>l[0]!==si?'':`<button class="chip ${i===TY.lv?'sel':''}" data-act="lv" data-v="${i}">${i+1}. ${t(l[1],l[2])} ${starsH(st[i]||0)}</button>`).join('')}</div></div>`).join('')}</div></section>
 <section class="card stack tgcard"><div id="type-zone" class="stack"></div>
 <div class="row tg-mode"><span class="lbl">${t('Em gõ bằng','Type with')}</span><div class="seg"><button class="${tkbOn()?'on':''}" data-act="tkb" data-v="touch">${t('Bàn phím trên màn hình','On-screen keyboard')}</button><button class="${tkbOn()?'':'on'}" data-act="tkb" data-v="real">${t('Bàn phím thật','Real keyboard')}</button></div></div>
 ${tkbOn()?'':`<div class="row nofocus"><label class="muted" for="type-in">${t('Dùng máy tính bảng? Chạm vào ô này để mở bàn phím','On a tablet? Tap this box to open the keyboard')}</label><input id="type-in" class="field" style="width:150px" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${t('Gõ ở đây','Type here')}"></div>`}
 <p class="muted nofocus">${t('Nhớ tắt bộ gõ tiếng Việt khi chơi. Tiếng bàn phím đang là','Turn off any Vietnamese typing tool while you play. Keyboard sound')}: <b>${t(...(KEYMODES.find(k=>k[0]===S.keys)||KEYMODES[0]).slice(1))}</b>. <button class="linkbtn" data-act="panel">${t('Đổi tiếng phím','Change it')}</button></p></section></div>`}
function lineH(){const {text,pos}=TY,ch=text[pos];return `<span class="d">${esc(text.slice(0,pos))}</span>${ch==null?'':`<span class="c">${ch===' '?'␣':esc(ch)}</span>`}<span class="r">${esc(text.slice(pos+1))}</span>`}
function statsH(){const acc=TY.pos+TY.err?Math.round(TY.pos/(TY.pos+TY.err)*100):100,sc=SCN[TL[TY.lv][0]];
 return `<span class="stat"><b>${tyDone()}</b>/${TY.n} · ${t(sc[3],sc[4]).replace(/^\S+\s/,'')}</span><span class="stat"><b>${acc}%</b>${t('chính xác','accuracy')}</span><span class="stat"><b>${TY.combo}</b>${t('phím đúng liên tiếp','keys in a row')}</span>`}
function guideH(){const ch=TY.text[TY.pos],kid=ch===' '?'space':ch,fg=FING[ch]||['','',-1];
 return `<p class="tg-tip">${t('Phím kế tiếp','Next key')}: <kbd>${ch===' '?t('phím cách','Space'):ch.toUpperCase()}</kbd> ${t('bằng ngón '+fg[0],'with your '+fg[1])}</p><div class="tg-kb">${tkbOn()?tkbUI(kid):kbUI(id=>zoneOf(id)+(id===kid?' next':''),false)}</div>${tkbOn()?'':handsSVG(fg[2])}`}
function drawType(){const z=document.getElementById('type-zone');if(!z)return;const L=TL[TY.lv],sc=L[0];
 let h=`<div class="row" style="justify-content:space-between"><h2>${t('Chặng','Stage')} ${TY.lv+1}: ${t(L[1],L[2])}</h2><span class="row" style="gap:8px"><span class="pill nofocus">${t(SCN[sc][0],SCN[sc][1])}</span>${focusBtn()}</span></div>
 <div class="tg-scene" id="tg-scene">${sceneSVG(sc,TY.n,tyDone())}<div class="tg-may" id="tg-may" style="left:${2+TY.pos/TY.text.length*82}%">${CLOUD}</div>${TY.done?'':`<div class="tg-line" id="tg-line">${lineH()}</div>`}</div>`;
 if(TY.done){const best=(S.typing||{})[TY.lv]||0;
  h+=`<div class="fb good tg-res"><h3>${TY.stars>=3?t('Tuyệt vời! Mây đã tới nơi an toàn.','Wonderful! Mây arrived safely.'):t('Mây đã tới nơi!','Mây made it!')}</h3><div class="row">${starsH(TY.stars).replace('class="stars"','class="stars big"')}</div>
  <p>${t(`Chính xác <b>${TY.acc}%</b>. Tốc độ <b>${TY.cpm}</b> ký tự/phút. Chuỗi đúng dài nhất <b>${TY.maxCombo}</b> phím.`,`Accuracy <b>${TY.acc}%</b>. Speed <b>${TY.cpm}</b> keys per minute. Longest run <b>${TY.maxCombo}</b> keys.`)} ${TY.cpm>=best&&TY.cpm>0?`<span class="pill ok">${t('Kỷ lục mới của em','Your new record')}</span>`:''}</p>
  <p class="muted">${TY.stars>=3?t('Em gõ rất chuẩn.','Very tidy typing.'):t('Muốn 3 sao, em gõ chậm lại một chút và đúng từ 97% trở lên.','For 3 stars, slow down a little and reach 97% accuracy or more.')}</p>
  <div class="row"><button class="btn ${TY.stars>=3?'':'primary'}" data-act="lv" data-v="${TY.lv}">${t('Chơi lại chặng này','Play this stage again')}</button>${TY.lv<TL.length-1?`<button class="btn ${TY.stars>=3?'primary':''}" data-act="lv" data-v="${TY.lv+1}">${t('Chặng tiếp theo','Next stage')} →</button>`:''}</div></div>`}
 else h+=`<div class="stats" id="tg-stats">${statsH()}</div><div id="tg-guide" class="stack" style="gap:10px">${guideH()}</div>`;
 z.innerHTML=h}
function updType(bad){const q=id=>document.getElementById(id),ln=q('tg-line');if(!ln)return drawType();
 ln.innerHTML=lineH();if(bad){ln.classList.remove('shake');void ln.offsetWidth;ln.classList.add('shake')}
 const m=q('tg-may');if(m)m.style.left=(2+TY.pos/TY.text.length*82)+'%';
 const d=tyDone();document.querySelectorAll('#tg-scene .it').forEach((el,i)=>el.classList.toggle('on',i<d));
 const s=q('tg-stats');if(s)s.innerHTML=statsH();const g=q('tg-guide');if(g)g.innerHTML=guideH()}
function typeChar(c){if(TY.done||!TY.text)return;if(!TY.t0)TY.t0=Date.now();const want=TY.text[TY.pos];
 if(c!==want){TY.err++;TY.combo=0;sfx('err');updType(true);return}
 TY.pos++;TY.combo++;TY.maxCombo=Math.max(TY.maxCombo,TY.combo);
 if(TY.pos>=TY.text.length){TY.done=true;const mins=(Date.now()-TY.t0)/60000;TY.cpm=Math.round(TY.text.length/Math.max(mins,.01));TY.acc=Math.round(TY.text.length/(TY.text.length+TY.err)*100);TY.stars=TY.acc>=97?3:TY.acc>=90?2:1;
  if(!S.tstar)S.tstar={};S.tstar[TY.lv]=Math.max(S.tstar[TY.lv]||0,TY.stars);S.typing[TY.lv]=Math.max(S.typing[TY.lv]||0,TY.cpm);touch();checkBadges();sfx('win');confetti();render();return}
 if(want===' ')sfx('star');updType()}
function onType(e){const el=e.target,v=el.value;el.value='';if(!v)return;const c=v[v.length-1].toLowerCase();if(Date.now()-lastKey>120)keySnd(c===' '?'space':'key',c);typeChar(c)}

/* ---- từ điển ---- */
let GL={i:0,flip:false};
function glRows(f){f=(f||'').toLowerCase();return GLOSS.filter(g=>!f||g.join(' ').toLowerCase().includes(f)).map(g=>`<tr><td><b>${g[0]}</b></td><td>${g[1]}</td><td>${t(g[2],g[3])}</td></tr>`).join('')||`<tr><td colspan="3">${t('Không tìm thấy từ nào. Em thử từ khác nhé.','No word found. Try another one.')}</td></tr>`}
function vGloss(){const g=GLOSS[GL.i];
 return `<div class="stack"><section class="card stack"><h1>${t('Từ điển Anh – Việt','English – Vietnamese dictionary')}</h1><p>${t(`Bài thi và phần mềm thường dùng từ tiếng Anh. Em học ${GLOSS.length} từ này là đủ dùng.`,`The exam and most software use English words. These ${GLOSS.length} words cover what you need.`)}</p>
 <button class="flash ${GL.flip?'flip':''}" data-act="flip">${GL.flip?`<span class="vi">${g[1]}</span><span>${t(g[2],g[3])}</span><span class="muted">${g[0]}</span>`:`<span class="en">${g[0]}</span><span>${t('Bấm để xem nghĩa','Tap to see the meaning')}</span>`}</button>
 <div class="row"><button class="btn" data-act="gprev">← ${t('Thẻ trước','Previous')}</button><span class="muted tnum">${GL.i+1}/${GLOSS.length}</span><button class="btn primary" data-act="gnext">${t('Thẻ tiếp','Next card')} →</button></div></section>
 <section class="card stack"><h2>${t('Tra nhanh','Quick look-up')}</h2><input id="g-search" class="field" placeholder="${t('Gõ từ cần tìm, ví dụ: save','Type a word, for example: save')}" autocomplete="off"><div class="tablebox"><table class="t"><thead><tr><th>English</th><th>Tiếng Việt</th><th>${t('Nghĩa là','Meaning')}</th></tr></thead><tbody id="g-body">${glRows('')}</tbody></table></div></section></div>`}

/* ---- phụ huynh ---- */
let resetArm=false;
function vParents(){const st=p=>p==null?`<span class="pill none">${t('Chưa luyện','Not started')}</span>`:p>=80?`<span class="pill ok">${t('Vững','Solid')}</span>`:p>=50?`<span class="pill warn">${t('Cần ôn thêm','Needs review')}</span>`:`<span class="pill bad">${t('Còn yếu','Weak')}</span>`;
 const who=S.name?esc(S.name):t('con','your child');
 return `<div class="stack"><section class="card lesson"><h1>${t('Dành cho phụ huynh','For parents')}</h1><p>${t('Trang này giúp ba mẹ theo dõi tiến độ của con và hiểu cách dùng May Học Tin để ôn thi IC3 Spark.','This page shows your child’s progress and explains how to use May Học Tin to prepare for IC3 Spark.')}</p></section>
 ${vReport()}
 ${vGuide()}
 <section class="card stack"><h2>${t('Lịch học gợi ý cho bé 10 tuổi','A suggested timetable for a 10-year-old')}</h2><div class="tablebox"><table class="t"><tr><th>${t('Ngày','Day')}</th><th>${t('Buổi và giờ','When')}</th><th>${t('Làm gì','What to do')}</th></tr>
 <tr><td><b>${t('Thứ Hai đến thứ Sáu','Monday to Friday')}</b></td><td class="tnum">${t('Buổi tối, 19:30 đến 20:00','Evening, 19:30 to 20:00')}</td><td>${t('5 phút đọc một bài, 15 phút luyện tập chủ đề, 5 phút ôn câu sai, 5 phút gõ phím.','5 minutes reading one lesson, 15 minutes practising the topic, 5 minutes fixing mistakes, 5 minutes typing.')}</td></tr>
 <tr><td><b>${t('Thứ Bảy','Saturday')}</b></td><td class="tnum">${t('Buổi sáng, 9:00 đến 10:00','Morning, 9:00 to 10:00')}</td><td>${t('Một bài thi thử đầy đủ 50 phút, rồi 10 phút cùng ba mẹ xem lại câu sai.','One full 50-minute practice exam, then 10 minutes going over mistakes with a parent.')}</td></tr>
 <tr><td><b>${t('Chủ nhật','Sunday')}</b></td><td>${t('Nghỉ','Rest')}</td><td>${t('Không học. Nếu con thích thì gõ phím 10 phút cho vui.','No study. Ten minutes of typing for fun if your child feels like it.')}</td></tr></table></div>
 <div class="lesson">${t(`<ul><li>Học sau khi con đã ăn tối và làm xong bài tập ở trường, lúc đầu óc đã thảnh thơi.</li><li>Kết thúc trước 20:30 để con rời màn hình khoảng một tiếng trước giờ ngủ.</li><li>Mỗi lần ngồi máy không quá 30 phút. Thi thử là ngoại lệ vì cần tập sức bền như thi thật.</li><li>Thi thử vào buổi sáng cuối tuần vì con tỉnh táo nhất và giống khung giờ thi thật thường gặp.</li><li>Nếu tối con có lớp học thêm, đổi sang 17:30 đến 18:00 trước bữa tối. Giữ giờ cố định quan trọng hơn chọn giờ nào.</li></ul>`,`<ul><li>Study after dinner and school homework, when your child’s mind is free.</li><li>Finish before 20:30 so there is about an hour away from screens before bedtime.</li><li>No more than 30 minutes at the computer at a time. The practice exam is the exception, to build stamina for the real one.</li><li>Take practice exams on a weekend morning, when your child is freshest. Real exams are often held at that time too.</li><li>If evenings are busy, move to 17:30 to 18:00 before dinner. A fixed time matters more than which time.</li></ul>`)}</div></section>
 <section class="card lesson"><h2>${t('Lộ trình gợi ý 4 tuần','A suggested 4-week plan')}</h2>${t(`<ul><li><b>Tuần 1</b>: chủ đề 1 đến 3. Mỗi ngày một bài đọc và một lượt luyện tập.</li><li><b>Tuần 2</b>: chủ đề 4 đến 6. Cho con mở Word, Excel, PowerPoint thật để làm theo bài học.</li><li><b>Tuần 3</b>: chủ đề 7 đến 9 và nút “Ôn câu em làm sai” mỗi ngày.</li><li><b>Tuần 4</b>: chủ đề 10 và 11, rồi hai đến ba lần thi thử, ôn lại chủ đề có điểm thấp trong bảng kết quả.</li></ul><p>Mỗi buổi 20 đến 25 phút là đủ: 5 phút đọc, 10 phút luyện, 5 phút ôn câu sai. Thêm 5 phút gõ phím nếu con thích. Điều quan trọng nhất là để con thấy mình tiến bộ từng ngày qua số sao.</p>`,
 `<ul><li><b>Week 1</b>: topics 1 to 3. One lesson and one practice round a day.</li><li><b>Week 2</b>: topics 4 to 6. Open the real Word, Excel and PowerPoint and follow the lessons.</li><li><b>Week 3</b>: topics 7 to 9, plus “Fix my mistakes” every day.</li><li><b>Week 4</b>: topics 10 and 11, then two or three practice exams and a review of the low-scoring topics.</li></ul><p>20 to 25 minutes a session is enough: 5 minutes reading, 10 practising, 5 fixing mistakes. Add 5 minutes of typing if your child enjoys it. What matters most is that your child sees the stars grow day by day.</p>`)}</section>
 <section class="card stack"><h2>${t('Xoá tiến độ','Reset progress')}</h2><p class="muted">${t('Dùng khi một bạn khác bắt đầu học trên máy này. Màu, âm thanh và ngôn ngữ được giữ nguyên.','Use this when another child starts on this device. Colours, sounds and language are kept.')}</p><div class="row"><button class="btn" data-act="reset">${resetArm?t('Bấm lần nữa để xoá toàn bộ tiến độ','Click again to erase all progress'):t('Xoá tiến độ và học lại từ đầu','Erase progress and start over')}</button></div></section></div>`}

/* ============ ĐIỀU HƯỚNG + SỰ KIỆN ============ */
const VIEWS={'giay-khen':vCert,'trang-chu':vHome,'thi-thu':vExamIntro,'lam-bai':vWork,'go-phim':vType,'tu-dien':vGloss,'phu-huynh':vParents,'may-tinh':vSim};
function render(){if(FOCUS&&!focusable())setFocus(false);document.body.classList.toggle('focus',FOCUS);checkBadges();renderChrome();document.getElementById('app').innerHTML=view.startsWith('hoc-')?vTopic(view.slice(4)):(VIEWS[view]||vHome)();if(view==='go-phim')drawType()}
function go(h){const ch=view!==h;view=h;try{if(location.hash.slice(1)!==h)location.hash=h}catch(e){}render();if(ch)window.scrollTo(0,0)}
function pick(arr,n){return shuffle(arr).slice(0,n)}

if(typeof document!=='undefined'){
window.addEventListener('hashchange',()=>{const h=location.hash.slice(1)||'trang-chu';if(h!==view){view=h;resetArm=false;render();window.scrollTo(0,0)}});
document.addEventListener('keydown',e=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey||['Shift','Control','Alt','Meta'].includes(e.key))return;lastKey=Date.now();keySnd(e.key===' '?'space':e.key==='Enter'?'enter':'key',e.key.toLowerCase())});
document.addEventListener('keydown',e=>{if(view!=='go-phim'||e.ctrlKey||e.metaKey||e.altKey||e.key.length!==1)return;const g=e.target;if(g&&(g.tagName==='INPUT'||g.tagName==='TEXTAREA'))return;if(e.key===' ')e.preventDefault();typeChar(e.key.toLowerCase())});
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const a=b.dataset.act,v=b.dataset.v;
 const it=W&&!W.done?W.items[W.i]:null,lock=!it||it.st.checked;
 switch(a){
 case 'sim':if(SIMA(b.dataset.k,v)===false)return;break;
 case 'tkb':S.tkb=v;save();sfx('tap');break;
 case 'focus':setFocus(!FOCUS);sfx('tap');render();window.scrollTo(0,0);return;
 case 'lw':{const f=LWA[b.dataset.w];if(f){f(v);sfx('tap');drawW(b.dataset.w)}return}
 case 'prof':setProfile(v);sfx('star');go('trang-chu');return;
 case 'profadd':addProfile();sfx('star');go('trang-chu');return;
 case 'profdel':if(!PF.del){PF.del=true;break}delProfile();go('trang-chu');return;
 case 'mkcode':PF.code=makeCode();PF.msg='';break;
 case 'copycode':{const no=()=>toast(t('Em bôi đen mã rồi sao chép nhé.','Select the code and copy it by hand.'));try{navigator.clipboard.writeText(PF.code).then(()=>toast(t('Đã sao chép mã.','Code copied.'))).catch(no)}catch(e){no()}return}
 case 'usecode':{const el=document.getElementById('code-in');PF.msg=useCode(el?el.value:'');if(PF.ok){sfx('star');go('trang-chu');return}break}
 case 'print':try{window.print()}catch(e){}return;
 case 'level':S.level=+v;save();sfx('tap');break;
 case 'lang':S.lang=v;save();sfx('tap');if(view==='go-phim'&&TL[TY.lv]&&!TL[TY.lv][3])newType(TY.lv);break;
 case 'panel':panelOpen=!panelOpen;PF.del=false;PF.msg='';sfx('tap');if(panelOpen){render();window.scrollTo(0,0);return}break;
 case 'skin':S.skin=v;save();sfx('star');break;
 case 'sfx':S.sfx=v==='1';save();sfx('ok');break;
 case 'oksnd':S.okSnd=v;save();if(v==='coin')coin();else{tone(660,0,.12,'triangle',.16);tone(880,.09,.2,'triangle',.16)}break;
 case 'song':S.song=v;songPos=0;save();listenEnd=0;playSong(v);break;
 case 'listen':playSong(S.song);return;
 case 'keys':S.keys=v;songPos=0;save();keySnd('key','a');setTimeout(()=>keySnd('key','s'),130);setTimeout(()=>keySnd('space',' '),260);break;
 case 'practice':sfx('tap');start('practice',shuffle(qOf(v)),{topic:v,lv:lvOf()});return;
 case 'review':sfx('tap');start('practice',pick(S.wrong.map(i=>Q[i]).filter(Boolean),15),{kind:'review'});return;
 case 'exam':{sfx('tap');const lv=lvOf(),WF={1:{mt:4,hdh:3,pm:3,vb:3,bt:1,tc:3,net:3,gt:3,ct:2,cd:3,at:3},2:{mt:3,hdh:4,pm:3,vb:4,bt:3,tc:3,net:4,gt:3,ct:3,cd:3,at:3},3:{mt:4,hdh:4,pm:3,vb:4,bt:4,tc:4,net:4,gt:4,ct:3,cd:4,at:4}},WK={mt:2,hdh:2,pm:2,vb:2,bt:1,tc:1,net:2,gt:2,ct:1,cd:2,at:1},wq=v==='full'?WF[lv]:WK;const qs=TOPICS.flatMap(x=>pick(qOf(x.id),wq[x.id]||1));start('exam',shuffle(qs),{kind:v,lv,mins:v==='full'?50:20});return}
 case 'pick':if(lock)return;sfx('tap');{const i=+v,q=it.q;if(q.k==='one')it.st.v=i;else{const k=it.st.v.indexOf(i);if(k>=0)it.st.v.splice(k,1);else{it.st.v.push(i);if(it.st.v.length>q.n)it.st.v.shift()}}}break;
 case 'assign':if(lock)return;sfx('tap');it.st.v[+b.dataset.i]=+v;break;
 case 'step':if(lock)return;sfx('tap');{const i=+v,k=it.st.v.indexOf(i);if(k>=0)it.st.v.splice(k,1);else it.st.v.push(i)}break;
 case 'spot':if(lock)return;if(it.q.ui==='kb')keySnd(v==='space'?'space':v==='enter'?'enter':'key',v);else sfx('tap');it.st.v=v;break;
 case 'check':if(!it||!answered(it))return;it.st.checked=true;{const id=it.q.id,k=S.wrong.indexOf(id);if(correct(it)){W.combo++;sfx('ok',W.combo);if(k>=0){S.wrong.splice(k,1);S.fixed=(S.fixed||0)+1}}else{W.combo=0;sfx('bad');if(k<0)S.wrong.push(id)}touch()}break;
 case 'next':if(!W)return;sfx('tap');if(W.i<W.items.length-1)W.i++;else if(W.mode!=='exam')finish();window.scrollTo(0,0);break;
 case 'prev':if(W&&W.i>0)W.i--;sfx('tap');break;
 case 'jump':if(W)W.i=+v;sfx('tap');break;
 case 'flag':if(it)it.st.flag=!it.st.flag;sfx('tap');break;
 case 'qreset':if(lock)return;{const f=it.st.flag;it.st=newItem(it.q).st;it.st.flag=f}sfx('tap');break;
 case 'confirm':W.confirm=true;break;
 case 'unconfirm':W.confirm=false;break;
 case 'submit':finish();window.scrollTo(0,0);break;
 case 'quit':W=null;go('trang-chu');return;
 case 'lv':newType(+v);sfx('tap');render();{const z=document.getElementById('type-zone');if(z&&z.scrollIntoView)z.scrollIntoView({block:'start',behavior:'smooth'})}return;
 case 'flip':GL.flip=!GL.flip;sfx('flip');break;
 case 'gnext':GL.i=(GL.i+1)%GLOSS.length;GL.flip=false;sfx('tap');break;
 case 'gprev':GL.i=(GL.i-1+GLOSS.length)%GLOSS.length;GL.flip=false;sfx('tap');break;
 case 'reset':if(!resetArm){resetArm=true;break}{const keep={name:'',lang:S.lang,skin:S.skin,sfx:S.sfx,keys:S.keys,song:S.song,okSnd:S.okSnd};S=DB.profiles[DB.cur]=Object.assign(FRESH(),keep);save();W=null;resetArm=false;go('trang-chu')}return;
 default:return}
 render()});
document.addEventListener('pointerdown',e=>{if(view!=='go-phim'||!e.target.closest)return;const b=e.target.closest('[data-tk]');if(!b)return;e.preventDefault();const c=b.dataset.tk;lastKey=Date.now();keySnd(c===' '?'space':'key',c);typeChar(c)});
const fsCh=()=>{const on=!!(document.fullscreenElement||document.webkitFullscreenElement);if(on)FSON=true;else if(FSON){FSON=false;if(FOCUS){FOCUS=false;render()}}};
document.addEventListener('fullscreenchange',fsCh);document.addEventListener('webkitfullscreenchange',fsCh);
document.addEventListener('input',e=>{if(e.target.id==='type-in')onType(e);
 if(e.target.id==='q-type'&&W&&!W.done){const it=W.items[W.i];if(it.q.k==='type'&&!it.st.checked){it.st.v=e.target.value;const b=document.querySelector('[data-act="check"]');if(b)b.disabled=!answered(it)}}
 if(e.target.classList.contains('lw-calc')){ls('calc',{v:[2,3,5],f:0}).v[+e.target.dataset.i]=parseFloat(e.target.value)||0;const o=document.getElementById('calc-out');if(o)o.textContent=calcOut()}
 if(e.target.classList.contains('lw-pw')){const o=document.getElementById('pw-out');if(o)o.innerHTML=pwOut(e.target.value)}
 if(e.target.id==='try-in'&&Date.now()-lastKey>120)keySnd('key','a');
 if(e.target.id==='g-search'){const b=document.getElementById('g-body');if(b)b.innerHTML=glRows(e.target.value)}});
document.addEventListener('change',e=>{if(e.target.classList.contains('name-in')){S.name=e.target.value.trim();save();sfx('star');render()}});
view=location.hash.slice(1)||'trang-chu';render();
}
if(typeof module!=='undefined')module.exports={Q,TOPICS,GLOSS,WB,KB,EN_T,EN_Q,lq,tp,S};
