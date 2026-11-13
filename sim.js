/* May Học Tin: phòng mô phỏng "Khám phá bên trong máy tính".
   Bốn chặng: Khám phá (chạm từng bộ phận) → Tìm hiểu (Mây kể chuyện) → Thực hành (kéo thả lắp máy) → Thử thách (câu đố).
   Nạp trước app.js; mọi hàm chỉ chạy sau khi app.js đã sẵn sàng. Hình vẽ bằng SVG, không cần tệp ảnh. */

/* ============ HÌNH VẼ TỪNG BỘ PHẬN ============ */
const SK='#12305a',SST=`stroke="${SK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"`;
const SM_CLOUD='M26 60a17 17 0 0 1-2-34 24 24 0 0 1 46-4 19 19 0 0 1 6 38z';
const smFace=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="${SM_CLOUD}" fill="#fff" ${SST}/><circle cx="40" cy="40" r="3.5" fill="${SK}"/><circle cx="60" cy="40" r="3.5" fill="${SK}"/><circle cx="33" cy="47" r="4" fill="#ffb3a8"/><circle cx="67" cy="47" r="4" fill="#ffb3a8"/><path d="M43 48q7 7 14 0" fill="none" ${SST}/></g>`;
const SD={
monitor:o=>`<path d="M124 176h32l6 36h-44z" fill="#9aa8c7" ${SST}/><rect x="80" y="210" width="120" height="16" rx="8" fill="#7f8fb0" ${SST}/>
 <rect x="2" y="2" width="276" height="176" rx="14" fill="#24345f" ${SST}/>
 ${o&&o.on?`<rect x="14" y="14" width="252" height="146" rx="6" fill="#bfe6ff"/><circle cx="228" cy="46" r="17" fill="#ffbf1f"/><path d="M14 160v-26q52-30 112-9t140-15v50z" fill="#8fd694"/>${o.txt?`<rect x="92" y="34" width="96" height="92" rx="14" fill="#fff" ${SST}/><text x="140" y="108" text-anchor="middle" font-size="80" font-weight="800" fill="${SK}" style="font-family:var(--display)">${o.txt}</text>`:smFace(86,34,1.08)}`
 :`<rect x="14" y="14" width="252" height="146" rx="6" fill="#44537a"/><path d="M30 60l40-34M30 92l76-66" stroke="#5b6b93" stroke-width="6" stroke-linecap="round"/>`}
 <circle cx="140" cy="169" r="3.5" fill="${o&&o.on?'#3ddc97':'#7f8fb0'}"/>`,
keyboard:()=>{const z=['#ffb3a8','#ffe08a','#a9e6c1','#b3d4ff','#b3d4ff','#b3d4ff','#b3d4ff','#a9e6c1','#ffe08a','#ffb3a8','#ffb3a8','#ffb3a8'];let k='';
 for(let r=0;r<3;r++)for(let c=0;c<12;c++)k+=`<rect x="${10+c*18.5}" y="${9+r*14}" width="15" height="11" rx="3" fill="${r===1?z[c]:'#fff'}"/>`;
 return `<rect x="2" y="2" width="236" height="66" rx="10" fill="#c9d5ec" ${SST}/>${k}<rect x="10" y="51" width="34" height="11" rx="3" fill="#fff"/><rect x="48" y="51" width="126" height="11" rx="3" fill="#d9c7ff"/><rect x="178" y="51" width="52" height="11" rx="3" fill="#fff"/>`},
mouse:()=>`<path d="M25 3c13 0 22 9 22 24v20c0 14-9 24-22 24S3 61 3 47V27C3 12 12 3 25 3z" fill="#fff" ${SST}/><path d="M3 31h44M25 3v28" fill="none" ${SST}/><rect x="21" y="10" width="8" height="15" rx="4" fill="#ffbf1f" ${SST}/>`,
case:()=>`<rect x="14" y="110" width="20" height="8" rx="3" fill="#7f8fb0" ${SST}/><rect x="66" y="110" width="20" height="8" rx="3" fill="#7f8fb0" ${SST}/><rect x="8" y="2" width="84" height="110" rx="9" fill="#eef2f9" ${SST}/><circle cx="50" cy="22" r="8" fill="#3ddc97" ${SST}/><rect x="26" y="40" width="48" height="8" rx="3" fill="#c9d5ec" ${SST}/><path d="M28 66h44M28 78h44M28 90h44" fill="none" stroke="#9aa8c7" stroke-width="4" stroke-linecap="round"/>`,
mb:()=>`<rect x="2" y="2" width="186" height="201" rx="8" fill="#2f9e6e" ${SST}/><path d="M54 92v34h56M150 66v48h-30M40 176h96M156 124v58" fill="none" stroke="#8be0b6" stroke-width="2.5" stroke-linecap="round"/>
 <rect x="22" y="24" width="64" height="64" rx="5" fill="#1f7a54"/><rect x="94" y="32" width="90" height="26" rx="4" fill="#1f7a54"/><rect x="22" y="152" width="134" height="9" rx="3" fill="#1f7a54"/>
 <circle cx="108" cy="84" r="6" fill="#ffd66b" ${SST}/><circle cx="128" cy="84" r="6" fill="#ffd66b" ${SST}/><circle cx="170" cy="188" r="6" fill="#ffd66b" ${SST}/><rect x="16" y="180" width="26" height="14" rx="3" fill="#22305a"/>
 <circle cx="12" cy="12" r="3" fill="#dff6ea"/><circle cx="178" cy="12" r="3" fill="#dff6ea"/><circle cx="12" cy="193" r="3" fill="#dff6ea"/><circle cx="178" cy="150" r="3" fill="#dff6ea"/>`,
cpu:()=>`<rect x="3" y="3" width="58" height="58" rx="6" fill="#f2c94c" ${SST}/><rect x="11" y="11" width="42" height="42" rx="4" fill="#dfe7f5" ${SST}/><text x="32" y="37.500" text-anchor="middle" font-size="14" font-weight="800" fill="${SK}" style="font-family:var(--display)">CPU</text><path d="M6 50l8 8" ${SST}/>`,
fan:o=>`<rect x="2" y="2" width="46" height="46" rx="8" fill="#3d4f7c" ${SST}/><circle cx="25" cy="25" r="19" fill="#22305a"/><g class="${o&&o.on?'sm-spin':''}">${[0,90,180,270].map(a=>`<path d="M25 25c-3-8 0-15 7-17 3 6 0 13-7 17z" fill="#8fb1ff" transform="rotate(${a} 25 25)"/>`).join('')}<circle cx="25" cy="25" r="19" fill="none"/></g><circle cx="25" cy="25" r="5" fill="#ffbf1f" ${SST}/>`,
ram:()=>`<rect x="6" y="18" width="78" height="6" fill="#f2c94c" ${SST}/><path d="M2 3h86v16H2z" fill="#3bb273" ${SST}/>${[0,1,2,3].map(i=>`<rect x="${9+i*20}" y="6.500" width="13" height="9" rx="1.500" fill="#22305a"/>`).join('')}`,
gpu:()=>`<rect x="30" y="35" width="92" height="8" fill="#f2c94c" ${SST}/><rect x="2" y="2" width="11" height="42" rx="2" fill="#b9c4d8" ${SST}/><rect x="13" y="4" width="145" height="32" rx="7" fill="#e2574c" ${SST}/>${[56,118].map(x=>`<circle cx="${x}" cy="20" r="12" fill="#7a1f18"/><path d="M${x-8} 20h16M${x} 12v16" stroke="#ffb3a8" stroke-width="3" stroke-linecap="round"/><circle cx="${x}" cy="20" r="3" fill="#ffd66b"/>`).join('')}`,
drive:()=>`<rect x="2" y="2" width="80" height="56" rx="7" fill="#c9d5ec" ${SST}/><circle cx="34" cy="30" r="21" fill="#f4f7fc" ${SST}/><circle cx="34" cy="30" r="5" fill="#7f8fb0"/><path d="M70 48L46 36" stroke="${SK}" stroke-width="3.5" stroke-linecap="round"/><circle cx="70" cy="48" r="5" fill="#ffbf1f" ${SST}/><rect x="60" y="8" width="16" height="9" rx="2" fill="#8fb1ff"/>`,
psu:()=>`<rect x="2" y="2" width="146" height="62" rx="7" fill="#4b5a78" ${SST}/><circle cx="42" cy="33" r="23" fill="#22305a"/><circle cx="42" cy="33" r="15" fill="none" stroke="#8fa0c4" stroke-width="2"/><circle cx="42" cy="33" r="6" fill="#8fa0c4"/><rect x="84" y="11" width="52" height="44" rx="5" fill="#ffd66b" ${SST}/><path d="M113 17l-13 19h9l-3 14 14-20h-9z" fill="${SK}"/>`
};

/* ============ DỮ LIỆU: tên, vị trí trong hình, lời giải thích ============ */
/* r = [x,y,rộng,cao] trong khung hình 800×480; vb = kích thước hình vẽ gốc; io: 0 vào, 1 ra, 2 thân máy, 3 bên trong */
const PARTS=[
{id:'monitor',vi:'Màn hình',en:'Monitor',io:1,r:[410,108,280,230],vb:[280,230],a:[550,106],
 does:['Hiện hình ảnh, video, chữ và số cho em xem.','Shows you pictures, videos, words and numbers.'],
 like:['Giống như chiếc ti vi của máy tính.','It is like the computer’s television.'],
 fact:['Màn hình là thiết bị ra: thông tin đi từ máy ra đến mắt em.','A monitor is an output device: information travels from the computer out to your eyes.'],
 ask:['Bộ phận nào hiện hình ảnh và chữ cho em xem?','Which part shows you pictures and words?'],
 put:['Màn hình đứng ở phía sau bàn, ngay trước mặt em.','The monitor stands at the back of the desk, right in front of you.']},
{id:'keyboard',vi:'Bàn phím',en:'Keyboard',io:0,r:[400,378,240,70],vb:[240,70],a:[520,436],
 does:['Dùng để gõ chữ, gõ số và ra lệnh cho máy.','Used to type letters and numbers and to give the computer orders.'],
 like:['Giống như cây bút để em viết vào máy.','It is like a pen for writing into the computer.'],
 fact:['Bàn phím là thiết bị vào. Phím F và phím J có gờ nổi để em đặt hai ngón trỏ.','A keyboard is an input device. The F and J keys have little bumps for your two index fingers.'],
 ask:['Em dùng bộ phận nào để gõ chữ và số?','Which part do you use to type letters and numbers?'],
 put:['Bàn phím nằm trên bàn, ngay trước màn hình.','The keyboard lies on the desk, just in front of the monitor.']},
{id:'mouse',vi:'Chuột',en:'Mouse',io:0,r:[672,376,50,74],vb:[50,74],a:[722,368],
 does:['Di chuyển con trỏ, bấm để chọn và mở.','Moves the pointer and clicks to choose and open things.'],
 like:['Giống như ngón tay của em chỉ vào màn hình.','It is like your finger pointing at the screen.'],
 fact:['Chuột là thiết bị vào. Nó có nút trái, nút phải và bánh xe cuộn ở giữa.','A mouse is an input device. It has a left button, a right button and a scroll wheel in the middle.'],
 ask:['Em dùng bộ phận nào để di chuyển con trỏ và bấm chọn?','Which part moves the pointer and clicks?'],
 put:['Chuột nằm bên phải bàn phím.','The mouse sits to the right of the keyboard.']},
{id:'case',vi:'Thùng máy',en:'Computer case',io:2,r:[30,60,300,358],vb:[100,120],a:[180,62],
 does:['Chứa và bảo vệ các bộ phận quan trọng bên trong.','Holds and protects the important parts inside.'],
 like:['Giống như ngôi nhà của các linh kiện.','It is like a house for all the parts.'],
 fact:['Nút nguồn để bật máy nằm ở mặt trước thùng máy.','The power button that switches the computer on is on the front of the case.'],
 ask:['Bộ phận nào chứa và bảo vệ các linh kiện bên trong?','Which part holds and protects the pieces inside?']},
{id:'mb',vi:'Bo mạch chủ',en:'Motherboard',io:3,r:[104,80,190,205],vb:[190,205],a:[272,268],
 does:['Tấm bảng lớn nối tất cả các bộ phận lại với nhau.','The big board that connects all the parts together.'],
 like:['Giống như những con đường trong thành phố, để các bộ phận gửi tin cho nhau.','It is like the roads of a city, so the parts can send messages to each other.'],
 fact:['CPU, RAM và card đồ họa đều cắm lên bo mạch chủ.','The CPU, the RAM and the graphics card all plug into the motherboard.'],
 ask:['Tấm bảng lớn nào nối mọi bộ phận lại với nhau?','Which big board connects all the parts together?'],
 put:['Bo mạch chủ là tấm bảng to nhất, gắn vào giữa thùng máy.','The motherboard is the biggest board. It goes in the middle of the case.']},
{id:'cpu',vi:'CPU',en:'CPU (processor)',io:3,need:'mb',r:[126,104,64,64],vb:[64,64],a:[186,166],
 does:['Tính toán và điều khiển mọi việc trong máy.','Does the thinking and controls everything in the computer.'],
 like:['Giống như bộ não của máy tính.','It is like the brain of the computer.'],
 fact:['CPU làm được hàng tỉ phép tính mỗi giây nên rất nóng, phải có quạt làm mát.','A CPU does billions of sums every second, so it gets hot and needs a fan to cool it.'],
 ask:['Bộ phận nào là bộ não của máy tính?','Which part is the brain of the computer?'],
 put:['CPU hình vuông, đặt vào ô vuông trên bo mạch chủ.','The CPU is square. It sits in the square socket on the motherboard.']},
{id:'ram',vi:'RAM',en:'RAM (memory)',io:3,need:'mb',r:[198,112,90,26],vb:[90,26],a:[282,140],
 does:['Nhớ tạm những việc máy đang làm.','Remembers what the computer is doing right now.'],
 like:['Giống như mặt bàn học: bàn càng rộng, bày được càng nhiều sách vở.','It is like your desk: the bigger the desk, the more books you can spread out.'],
 fact:['Tắt máy là RAM quên hết. Vì vậy em phải lưu bài trước khi tắt máy.','When the computer is switched off, RAM forgets everything. That is why you save your work first.'],
 ask:['Bộ phận nào nhớ tạm việc máy đang làm?','Which part remembers what the computer is doing right now?'],
 put:['Thanh RAM dài và mỏng, cắm vào khe dài cạnh CPU.','The RAM stick is long and thin. It plugs into the long slot next to the CPU.']},
{id:'gpu',vi:'Card đồ họa',en:'Graphics card',io:3,need:'mb',r:[116,200,160,46],vb:[160,46],a:[130,246],
 does:['Vẽ hình ảnh rồi gửi lên màn hình.','Draws the pictures and sends them to the monitor.'],
 like:['Giống như họa sĩ của máy tính.','It is like the computer’s artist.'],
 fact:['Trò chơi và phim hoạt hình đẹp, mượt là nhờ card đồ họa.','Games and cartoons look smooth and beautiful thanks to the graphics card.'],
 ask:['Bộ phận nào vẽ hình ảnh rồi gửi lên màn hình?','Which part draws the pictures and sends them to the monitor?'],
 put:['Card đồ họa có hai chiếc quạt nhỏ, cắm ngang phía dưới bo mạch chủ.','The graphics card has two little fans. It plugs in across the lower part of the motherboard.']},
{id:'fan',vi:'Quạt tản nhiệt',en:'Cooling fan',io:3,r:[48,96,50,50],vb:[50,50],a:[92,144],
 does:['Thổi khí nóng ra ngoài để máy luôn mát.','Blows hot air out to keep the computer cool.'],
 like:['Giống như chiếc quạt em bật khi trời nóng.','It is like the fan you switch on when it is hot.'],
 fact:['Máy quá nóng sẽ chạy chậm, có khi tự tắt để bảo vệ mình.','A computer that gets too hot runs slowly, and may even switch itself off to stay safe.'],
 ask:['Bộ phận nào thổi khí nóng ra để máy luôn mát?','Which part blows hot air out to keep the computer cool?'],
 put:['Quạt gắn ở vách sau thùng máy, phía trên bên trái.','The fan is fixed to the back wall of the case, at the top left.']},
{id:'drive',vi:'Ổ cứng',en:'Hard drive',io:3,r:[208,330,84,60],vb:[84,60],a:[286,338],
 does:['Cất giữ bài làm, ảnh và trò chơi lâu dài.','Keeps your work, photos and games for a long time.'],
 like:['Giống như tủ sách: cất vào rồi, hôm sau vẫn còn.','It is like a bookcase: what you put in is still there tomorrow.'],
 fact:['Tắt máy rồi, dữ liệu trong ổ cứng vẫn còn nguyên.','When the computer is off, everything on the hard drive is still there.'],
 ask:['Bộ phận nào cất giữ bài làm và ảnh lâu dài?','Which part keeps your work and photos for a long time?'],
 put:['Ổ cứng nằm ở góc dưới bên phải thùng máy.','The hard drive goes in the bottom right corner of the case.']},
{id:'psu',vi:'Nguồn điện',en:'Power supply',io:3,r:[48,326,150,66],vb:[150,66],a:[60,334],
 does:['Nhận điện từ ổ cắm rồi chia cho mọi bộ phận.','Takes electricity from the wall socket and shares it out to every part.'],
 like:['Giống như trái tim bơm năng lượng đi khắp máy.','It is like a heart pumping energy around the computer.'],
 fact:['Không rút dây điện khi máy đang chạy em nhé.','Never pull the power cable out while the computer is running.'],
 ask:['Bộ phận nào chia điện cho cả máy?','Which part shares out electricity to the whole computer?'],
 put:['Hộp nguồn có hình tia chớp, nằm ở đáy thùng máy bên trái.','The power supply has a lightning sign. It sits at the bottom left of the case.']}
];
const PM={};PARTS.forEach(p=>PM[p.id]=p);
const SM_IN=['mb','cpu','ram','gpu','fan','drive','psu'],SM_OUT=['monitor','keyboard','mouse'];
const SM_IO=[['Thiết bị vào','Input device',''],['Thiết bị ra','Output device','ok'],['Thân máy','Main unit','warn'],['Bên trong thùng máy','Inside the case','warn']];
const SM_TOUR=[
{v:'desk',hi:['case','monitor','keyboard','mouse'],s:['Chào em! Một bộ máy tính để bàn có bốn phần chính: thùng máy, màn hình, bàn phím và chuột.','Hello! A desktop computer has four main parts: the case, the monitor, the keyboard and the mouse.']},
{v:'desk',hi:['keyboard','mouse'],s:['Bàn phím và chuột là thiết bị vào. Em dùng chúng để đưa thông tin và mệnh lệnh vào máy.','The keyboard and the mouse are input devices. You use them to send information and orders into the computer.']},
{v:'desk',hi:['monitor'],s:['Màn hình là thiết bị ra. Máy dùng nó để đưa hình ảnh và chữ ra cho em xem.','The monitor is an output device. The computer uses it to bring pictures and words out to you.']},
{v:'case',hi:['mb'],s:['Giờ mình nhìn vào trong thùng máy nhé. Tấm bảng lớn màu xanh là bo mạch chủ. Nó nối mọi bộ phận với nhau.','Now let’s look inside the case. The big green board is the motherboard. It connects every part.']},
{v:'case',hi:['cpu'],s:['Đây là CPU, bộ não của máy tính. Mọi phép tính và mệnh lệnh đều do CPU xử lý.','This is the CPU, the brain of the computer. It handles every sum and every order.']},
{v:'case',hi:['ram','drive'],s:['Máy có hai loại trí nhớ. RAM nhớ tạm việc đang làm, tắt máy là quên. Ổ cứng cất giữ lâu dài, tắt máy vẫn còn.','The computer has two kinds of memory. RAM remembers the work in progress and forgets when the power goes off. The hard drive keeps things for a long time.']},
{v:'case',hi:['gpu'],s:['Card đồ họa là họa sĩ. Nó vẽ từng hình ảnh rồi gửi lên màn hình.','The graphics card is the artist. It draws every picture and sends it to the monitor.']},
{v:'case',hi:['psu','fan'],s:['Nguồn điện chia điện cho cả máy. Quạt thổi khí nóng ra ngoài để máy luôn mát.','The power supply shares out electricity. The fan blows hot air out so the computer stays cool.']},
{v:'desk',hi:['keyboard'],s:['Cùng xem các bộ phận làm việc với nhau nhé. Em gõ phím A. Bàn phím gửi tín hiệu vào thùng máy.','Let’s watch the parts work together. You press the A key. The keyboard sends a signal into the case.']},
{v:'case',hi:['cpu'],s:['CPU nhận tín hiệu và hiểu ngay: à, bạn nhỏ vừa gõ chữ A!','The CPU gets the signal and understands at once: aha, the letter A!']},
{v:'case',hi:['ram'],s:['RAM nhớ tạm chữ A trong bài em đang gõ.','RAM remembers the letter A in the work you are typing.']},
{v:'case',hi:['gpu'],s:['Card đồ họa vẽ hình chữ A.','The graphics card draws the shape of the letter A.']},
{v:'desk',hi:['monitor'],txt:'A',s:['Màn hình hiện chữ A cho em xem. Tất cả chỉ diễn ra trong chớp mắt!','The monitor shows you the letter A. It all happens in the blink of an eye!']},
{v:'case',hi:['drive'],s:['Muốn chữ A còn mãi, em bấm Lưu. Bài sẽ được cất vào ổ cứng. Giờ em thử tự tay lắp một chiếc máy tính nhé!','To keep the letter A for good, press Save. Your work goes onto the hard drive. Now try building a computer yourself!']}
];

/* ============ TRẠNG THÁI ============ */
const SIM={mode:'explore',view:'desk',sel:null,tour:0,b:null,q:null,vb:[0,0,800,480],noClick:0};
const SM=()=>{if(!S.sim||typeof S.sim!=='object')S.sim={};const m=S.sim;if(!Array.isArray(m.seen))m.seen=[];m.tour=m.tour?1:0;m.build=+m.build||0;if(typeof m.quiz!=='number')m.quiz=null;return m};
const simStars=()=>{const m=SM();return (m.seen.length>=PARTS.length?1:0)+m.tour+m.build+starN(m.quiz||0)};
const smN=id=>t(PM[id].vi,PM[id].en);
const smT=a=>t(a[0],a[1]);
/* tên viết thường để đặt giữa câu; CPU và RAM luôn viết hoa */
const smLo=(id,e)=>(e?PM[id].en.replace(/ \(.*/,''):PM[id].vi).toLowerCase().replace('cpu','CPU').replace('ram','RAM');
const smNarrow=()=>{try{return matchMedia('(max-width:700px)').matches}catch(e){return false}};
const smPic=(id,o)=>{const p=PM[id];return `<svg class="sm-pic" viewBox="0 0 ${p.vb[0]} ${p.vb[1]}" style="aspect-ratio:${p.vb[0]}/${p.vb[1]}" aria-hidden="true">${SD[id](o||{on:true})}</svg>`};
const smMay=txt=>`<div class="sm-may">${CLOUD}<p class="sm-bub" aria-live="polite">${txt}</p></div>`;

/* ============ KHUNG HÌNH BÀN MÁY TÍNH ============ */
/* o: view 'desk'|'case', click (tên hành động khi chạm bộ phận), hi (viền sáng), have (bộ phận đã có; bỏ trống = đủ cả),
   slots (chỗ trống nét đứt), on (máy đang bật), closed (đã đóng nắp), cab (dây đã nối), txt (chữ hiện trên màn hình), last, blink, power, hot */
function smScene(o){const vb=o.view==='case'?(smNarrow()?[14,44,332,382]:[-138,44,637,382]):[0,0,800,480];SIM.vb=vb;
 const has=id=>!o.have||o.have.includes(id),hi=o.hi||[];
 const act=(k,id)=>k?` class="sm-p" data-act="sim" data-k="${k}" data-v="${id}"`:'';
 const nest=(id,extra)=>{const p=PM[id],r=p.r;return `<svg x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" viewBox="0 0 ${p.vb[0]} ${p.vb[1]}"${extra||''}>${SD[id](o)}</svg>`};
 const ring=id=>{if(!hi.includes(id))return '';const r=PM[id].r;return `<rect class="sm-hi" x="${r[0]-6}" y="${r[1]-6}" width="${r[2]+12}" height="${r[3]+12}" rx="12" fill="none" stroke="${o.hic||'#ffbf1f'}" stroke-width="5"/>`};
 const part=(id,k)=>{if(!has(id))return '';const r=PM[id].r;return `<g${act(k,id)}><g class="${o.last===id?'sm-in':''}">${k?`<rect x="${r[0]-8}" y="${r[1]-8}" width="${r[2]+16}" height="${r[3]+16}" fill="transparent"/>`:''}${nest(id)}</g>${ring(id)}</g>`};
 const slot=id=>{const r=PM[id].r,dark=SM_IN.includes(id);return `<g class="sm-p sm-slot${o.blink===id?' sm-hi':''}" data-act="sim" data-k="slot" data-v="${id}"><rect x="${r[0]-3}" y="${r[1]-3}" width="${r[2]+6}" height="${r[3]+6}" rx="9" fill="${dark?'rgba(255,255,255,.12)':'rgba(255,255,255,.5)'}" stroke="${dark?'#fff':SK}" stroke-width="2.5" stroke-dasharray="7 6"/>${nest(id,' opacity=".28"')}</g>`};
 const inner=o.view==='case'?o.click:null,cab=o.cab||[];
 let s=`<svg id="sm-svg" class="sm-svg" viewBox="${vb.join(' ')}" style="aspect-ratio:${vb[2]}/${vb[3]}" role="img" aria-label="${t('Hình bộ máy tính để bàn','Picture of a desktop computer')}">
 <rect x="-300" y="-100" width="1400" height="420" fill="var(--blue-soft)"/>
 <g opacity=".9"><rect x="560" y="52" width="190" height="10" rx="4" fill="var(--line)"/><rect x="578" y="16" width="16" height="36" rx="3" fill="#ff9f8f"/><rect x="596" y="22" width="14" height="30" rx="3" fill="#ffd66b"/><rect x="612" y="12" width="18" height="40" rx="3" fill="#8fd694"/><rect x="632" y="24" width="14" height="28" rx="3" fill="#8fb1ff"/><circle cx="716" cy="34" r="16" fill="#8fd694"/><rect x="706" y="40" width="20" height="12" rx="3" fill="#ff9f8f"/></g>
 <rect x="-300" y="318" width="1400" height="300" fill="var(--sun-soft)"/><path d="M-300 318h1400" stroke="var(--sun-d)" stroke-width="3"/><rect x="-300" y="456" width="1400" height="60" fill="var(--sun)" opacity=".55"/>`;
 /* thùng máy */
 s+=`<g${act(o.view==='case'?inner:null,'case')}><rect x="48" y="408" width="46" height="10" rx="4" fill="#7f8fb0" ${SST}/><rect x="266" y="408" width="46" height="10" rx="4" fill="#7f8fb0" ${SST}/>
 <rect x="30" y="60" width="300" height="350" rx="14" fill="#dfe7f5" ${SST}/><rect x="42" y="72" width="256" height="326" rx="6" fill="${o.closed?'#f4f7fc':'#263563'}" ${SST}/>
 <rect x="308" y="126" width="13" height="6" rx="2" fill="#7f8fb0"/><rect x="308" y="138" width="13" height="6" rx="2" fill="#7f8fb0"/>
 ${o.closed?`${smFace(112,150,1.16)}<path d="M96 300h148M96 318h148M96 336h148M96 354h148" stroke="#c9d5ec" stroke-width="7" stroke-linecap="round"/>`:''}${ring('case')}</g>`;
 if(!o.closed){s+=['fan','psu','drive','mb','cpu','ram','gpu'].map(id=>part(id,inner)).join('')}
 s+=`<g${o.power?' class="sm-p" data-act="sim" data-k="power"':''}>${o.power?'<circle class="sm-hi" cx="314" cy="98" r="19" fill="none" stroke="#ffbf1f" stroke-width="5"/><circle cx="314" cy="98" r="24" fill="transparent"/>':''}<circle cx="314" cy="98" r="10" fill="${o.on?'#3ddc97':'#fff'}" ${SST}/><path d="M314 92v6M310 95a5.500 5.500 0 1 0 8 0" fill="none" stroke="${SK}" stroke-width="1.8" stroke-linecap="round"/></g>`;
 if(o.view==='desk'&&o.click&&!o.closed)s+=`<rect${act(o.click,'case')} x="30" y="60" width="300" height="358" fill="transparent"/>`;
 /* dây nối */
 const cabs={monitor:'M536 336C470 356 390 320 330 290',keyboard:'M402 412C372 424 356 380 330 366',mouse:'M697 378C690 352 410 372 330 330'};
 s+=cab.filter(id=>cabs[id]&&has(id)).map(id=>`<path d="${cabs[id]}" fill="none" stroke="#516b8c" stroke-width="3.500" stroke-linecap="round"/>`).join('');
 s+=SM_OUT.map(id=>part(id,o.click)).join('');
 s+=(o.slots||[]).map(slot).join('')+'</svg>';
 const pos=(x,y)=>`left:${((x-vb[0])/vb[2]*100).toFixed(2)}%;top:${((y-vb[1])/vb[3]*100).toFixed(2)}%`;
 const hot=(o.hot||[]).map(id=>{const p=PM[id],a=id==='case'&&o.view==='case'?[314,220]:p.a||[p.r[0]+p.r[2]/2,p.r[1]+p.r[3]/2],seen=SM().seen.includes(id);
  return `<button class="sm-hot${seen?' seen':''}${SIM.sel===id?' sel':''}" style="${pos(a[0],a[1])}" data-act="sim" data-k="part" data-v="${id}" aria-label="${smN(id)}"><b>${seen?'✓':'+'}</b>${o.view==='desk'?`<span>${smN(id)}</span>`:''}</button>`}).join('');
 return `<div class="sm-stage">${s}${hot}</div>`}

/* ============ CHẶNG 1: KHÁM PHÁ ============ */
function smInfo(id){const p=PM[id],io=SM_IO[p.io];
 return `<section class="card sm-info"><div class="sm-picbox">${smPic(id)}</div>
 <div><h2>${smN(id)}</h2><div class="row" style="gap:6px;margin-top:6px"><span class="pill none">${t('Tiếng Anh: '+p.en,'Tiếng Việt: '+p.vi)}</span><span class="pill ${io[2]}">${t(io[0],io[1])}</span></div></div>
 <p><b>${t('Làm gì?','What does it do?')}</b> ${smT(p.does)}</p><p><b>${t('Giống như gì?','What is it like?')}</b> ${smT(p.like)}</p>
 <div class="tip sm-fact"><b>${t('Bạn biết không?','Did you know?')}</b> ${smT(p.fact)}</div></section>`}
function smExplore(){const m=SM(),view=SIM.view,ids=view==='case'?['case'].concat(SM_IN):SM_OUT.concat(['case']),all=m.seen.length>=PARTS.length;
 const pre=view==='case'?`<div class="row"><button class="btn sm-zoom" data-act="sim" data-k="view" data-v="desk">← ${t('Ra bàn máy tính','Back to the desk')}</button><b>${t('Bên trong thùng máy','Inside the case')}</b></div>`:'';
 return `<div class="sm-grid"><div class="stack" style="gap:12px">${pre}${smScene({view,click:'part',hi:SIM.sel?[SIM.sel]:[],on:true,cab:SM_OUT,hot:ids})}
 <div><div class="row" style="justify-content:space-between;margin-bottom:6px"><b>${t(`Em đã khám phá ${m.seen.length}/${PARTS.length} bộ phận`,`You have explored ${m.seen.length} of ${PARTS.length} parts`)}</b></div><div class="bar"><i style="width:${m.seen.length/PARTS.length*100}%"></i></div></div>
 <div class="chips">${PARTS.map(p=>`<button class="chip sm ${SIM.sel===p.id?'sel':''}" data-act="sim" data-k="part" data-v="${p.id}">${m.seen.includes(p.id)?'✓ ':''}${smN(p.id)}</button>`).join('')}</div></div>
 <div class="sm-side">${smMay(all?t('Giỏi quá! Em đã khám phá hết rồi. Sang chặng Tìm hiểu để nghe Mây kể chuyện nhé.','Well done! You have explored everything. Go on to Learn and let Mây tell you the story.'):SIM.sel?t('Em chạm tiếp vào dấu + khác để khám phá cho đủ nhé.','Tap another + to explore them all.'):view==='case'?t('Đây là bên trong thùng máy. Chạm vào dấu + để xem từng bộ phận.','This is the inside of the case. Tap a + to look at each part.'):t('Chạm vào dấu + để khám phá. Chạm vào thùng máy để nhìn vào bên trong!','Tap a + to explore. Tap the case to look inside!'))}
 ${SIM.sel?smInfo(SIM.sel):''}${all?`<button class="btn primary" data-act="sim" data-k="mode" data-v="learn">${t('Sang chặng Tìm hiểu','Go on to Learn')} →</button>`:''}</div></div>`}

/* ============ CHẶNG 2: TÌM HIỂU ============ */
function smLearn(){const n=SM_TOUR.length,i=Math.min(SIM.tour,n-1),st=SM_TOUR[i],last=i===n-1;
 return `<div class="sm-grid"><div class="stack" style="gap:12px">${smScene({view:st.v,hi:st.hi,on:true,cab:SM_OUT,txt:st.txt})}
 <div class="bar"><i style="width:${(i+1)/n*100}%"></i></div></div>
 <div class="sm-side"><div class="qtype">${i>=8?t('Các bộ phận làm việc cùng nhau','How the parts work together'):t('Mây kể chuyện','Mây’s story')} · ${i+1}/${n}</div>${smMay(smT(st.s))}
 <div class="chips">${st.hi.map(id=>`<span class="pill">${smN(id)}</span>`).join('')}</div>
 <div class="row"><button class="btn" data-act="sim" data-k="tour" data-v="-1" ${i?'':'disabled'}>← ${t('Quay lại','Back')}</button>${last?`<button class="btn primary" data-act="sim" data-k="tourend">${t('Sang chặng Thực hành','Go on to Build')} →</button>`:`<button class="btn primary" data-act="sim" data-k="tour" data-v="1">${t('Tiếp theo','Next')} →</button>`}</div></div></div>`}

/* ============ CHẶNG 3: THỰC HÀNH LẮP MÁY ============ */
function smNewBuild(){SIM.b={stage:1,done:[],sel:null,miss:0,msg:null,last:null,blink:null,on:false,stars:0,n:0,tray:shuffle(SM_IN)}}
const smTodo=()=>{const b=SIM.b;return (b.stage===1?SM_IN:SM_OUT).filter(id=>!b.done.includes(id))};
const smSlots=()=>{const b=SIM.b;return smTodo().filter(id=>!PM[id].need||b.done.includes(PM[id].need))};
function smPlace(id){const b=SIM.b;b.done.push(id);b.sel=null;b.last=id;b.blink=null;b.n++;sfx('ok',b.n);const p=PM[id];
 b.msg=[`Đúng rồi! ${p.vi} đã vào đúng chỗ. ${p.like[0]}`,`That’s right! The ${smLo(id,1)} is in place. ${p.like[1]}`];touch()}
function smTry(id,slot){const b=SIM.b,p=PM[id];if(!p||b.done.includes(id))return;b.last=null;
 if(p.need&&!b.done.includes(p.need)){b.msg=[`${p.vi} cắm lên bo mạch chủ. Em lắp bo mạch chủ trước nhé.`,`The ${smLo(id,1)} plugs into the motherboard. Fit the motherboard first.`];b.blink='mb';sfx('err');return}
 if(slot===id){smPlace(id);return}
 if(slot){b.miss++;b.blink=id;sfx('bad');b.msg=[`Chưa đúng, đó là chỗ của ${smLo(slot,0)}. ${p.put[0]}`,`Not quite, that place is for the ${smLo(slot,1)}. ${p.put[1]}`];return}
 b.blink=id;b.msg=[`Em thả ${smLo(id,0)} vào ô nét đứt đang nhấp nháy nhé.`,`Drop the ${smLo(id,1)} on the flashing dotted box.`]}
function smBuild(){if(!SIM.b)smNewBuild();const b=SIM.b,todo=smTodo(),m=SM();
 const next=(b.stage===1?SM_IN:SM_OUT).find(id=>!b.done.includes(id));
 const scene=b.stage===1?smScene({view:'case',have:b.done,slots:smSlots(),last:b.last,blink:b.blink})
  :smScene({view:'desk',closed:true,have:b.done,slots:b.on?[]:smSlots(),cab:b.done,last:b.last,blink:b.blink,on:b.on,power:b.stage===3&&!b.on});
 let say,act='';
 if(b.on){say=t('Máy đã chạy rồi! Em vừa tự tay lắp xong một chiếc máy tính.','It’s alive! You have just built a computer with your own hands.')}
 else if(b.stage===3){say=t('Mọi thứ đã sẵn sàng. Em bấm nút nguồn trên thùng máy để bật máy nhé!','Everything is ready. Press the power button on the case to switch it on!');act=`<button class="btn sun" data-act="sim" data-k="power">${t('Bấm nút nguồn','Press the power button')}</button>`}
 else if(b.stage===1&&!todo.length){say=t('Bên trong đã đủ bộ phận. Giờ mình đóng nắp thùng máy lại nào.','Every part is inside. Now let’s close the case.');act=`<button class="btn primary" data-act="sim" data-k="close">${t('Đóng nắp thùng máy','Close the case')} →</button>`}
 else say=b.msg?smT(b.msg):b.stage===1&&!b.done.length?t('Mình cùng lắp máy tính nhé! Kéo từng bộ phận vào ô nét đứt. Bắt đầu với bo mạch chủ.','Let’s build a computer! Drag each part onto a dotted box. Start with the motherboard.'):b.stage===2&&b.done.length===SM_IN.length?t('Thùng máy đã xong. Giờ em đặt màn hình, bàn phím và chuột lên bàn rồi nối dây vào thùng máy.','The case is done. Now put the monitor, keyboard and mouse on the desk and plug them into the case.'):t(`Tiếp theo: ${smLo(next,0)}.`,`Next: the ${smLo(next,1)}.`);
 const total=SM_IN.length+SM_OUT.length;
 const tray=b.tray.filter(id=>todo.includes(id));
 return `<div class="sm-grid sm-build"><div class="stack sm-left" style="gap:12px">${scene}
 <div class="sm-prog"><div class="row" style="justify-content:space-between;margin-bottom:6px"><b>${t(`Đã lắp ${b.done.length}/${total} bộ phận`,`${b.done.length} of ${total} parts fitted`)}</b><span class="muted">${t(`Bước ${Math.min(b.stage,2)}/2: ${b.stage===1?'bên trong thùng máy':'trên bàn'}`,`Step ${Math.min(b.stage,2)} of 2: ${b.stage===1?'inside the case':'on the desk'}`)}</span></div><div class="bar"><i style="width:${b.done.length/total*100}%"></i></div></div></div>
 <div class="sm-side">${smMay(say)}${act}
 ${b.on?`<section class="card sm-win"><div class="stars big">${'<b>★</b>'.repeat(b.stars)}${'★'.repeat(3-b.stars)}</div><p>${b.miss?t(`Em đặt nhầm ${b.miss} lần. Lắp lại không nhầm lần nào để được 3 sao nhé.`,`You had ${b.miss} wrong tries. Build it again with no mistakes for 3 stars.`):t('Không nhầm lần nào. Em đúng là kỹ sư nhí!','Not a single mistake. You are a real young engineer!')}</p><div class="row"><button class="btn" data-act="sim" data-k="rebuild">${t('Lắp lại','Build again')}</button><button class="btn primary" data-act="sim" data-k="mode" data-v="quiz">${t('Sang chặng Thử thách','Go on to Challenge')} →</button></div></section>`
 :tray.length?`<div><div class="qtype" style="margin-bottom:6px">${t('Khay linh kiện','Parts tray')}</div><div class="sm-tray">${tray.map(id=>`<button class="sm-tile${b.sel===id?' sel':''}" data-drag="${id}" data-act="sim" data-k="pickp" data-v="${id}" aria-pressed="${b.sel===id}">${smPic(id,{})}<span>${smN(id)}</span></button>`).join('')}</div>
 <p class="muted" style="margin-top:8px">${t('Kéo bộ phận vào hình. Hoặc chạm vào bộ phận rồi chạm vào ô nét đứt.','Drag a part onto the picture. Or tap a part, then tap a dotted box.')}</p></div>
 <div class="row"><button class="btn" data-act="sim" data-k="hint">${t('Gợi ý','Hint')}</button><button class="linkbtn" data-act="sim" data-k="rebuild">${t('Lắp lại từ đầu','Start again')}</button></div>`:''}
 ${!b.on&&m.build?`<p class="muted">${t('Thành tích tốt nhất của em:','Your best so far:')} ${starsH(m.build)}</p>`:''}</div></div>`}

/* ============ CHẶNG 4: THỬ THÁCH ============ */
function smNewQuiz(){const ps=shuffle(PARTS),oth=(p,n,f)=>shuffle(PARTS.filter(x=>x.id!==p.id&&(!f||f(x)))).slice(0,n).map(x=>x.id);
 const which=p=>({k:'which',ans:p.id,q:p.ask,opts:shuffle([p.id].concat(oth(p,3)))});
 const what=p=>({k:'what',ans:p.id,opts:shuffle([p.id].concat(oth(p,2)))});
 const spot=p=>({k:'spot',ans:p.id});
 const ex=[{k:'which',ans:'ram',q:['Tắt máy thì bộ phận nào quên hết mọi thứ?','Which part forgets everything when the computer is switched off?'],opts:['ram','drive','monitor','psu']},
  {k:'which',ans:'drive',q:['Em bấm Lưu thì bài được cất vào đâu?','When you press Save, where does your work go?'],opts:['drive','ram','fan','mouse']},
  {k:'which',ans:'monitor',q:['Thiết bị nào là thiết bị ra?','Which one is an output device?'],opts:['monitor','keyboard','mouse','cpu']},
  {k:'which',ans:'keyboard',q:['Thiết bị nào là thiết bị vào?','Which one is an input device?'],opts:['keyboard','monitor','gpu','psu']}];
 const e=shuffle(ex)[0];e.opts=shuffle(e.opts);
 SIM.q={items:shuffle([which(ps[0]),which(ps[1]),which(ps[2]),what(ps[3]),what(ps[4]),spot(ps[5]),spot(ps[6]),e]),i:0,pick:null,ok:0,run:0,done:false}}
function smQuiz(){const q=SIM.q,m=SM();
 if(!q)return `<section class="card stack sm-intro"><div class="hero" style="gap:16px">${CLOUD}<div class="txt"><h2>${t('Thử thách: em nhớ được bao nhiêu?','Challenge: how much do you remember?')}</h2><p>${t('8 câu đố về các bộ phận của máy tính. Có câu chọn hình, có câu chạm vào đúng bộ phận trong hình.','8 puzzles about the parts of a computer. Some ask you to pick a picture, some to tap the right part.')}</p>${m.quiz!=null?`<p class="muted">${t('Điểm cao nhất của em:','Your best score:')} ${m.quiz}% ${starsH(starN(m.quiz))}</p>`:''}</div></div><div class="row"><button class="btn primary" data-act="sim" data-k="qstart">${t('Bắt đầu thử thách','Start the challenge')} →</button></div></section>`;
 const n=q.items.length;
 if(q.done){const pct=Math.round(q.ok/n*100),st=starN(pct);
  return `<section class="card stack" style="align-items:center;text-align:center">${CLOUD.replace('class="cloud"','class="cloud" style="width:110px"')}<div class="big">${q.ok}/${n}</div><div class="stars big">${'<b>★</b>'.repeat(st)}${'★'.repeat(3-st)}</div>
  <p>${pct>=90?t('Xuất sắc! Em hiểu rất rõ chiếc máy tính của mình.','Brilliant! You really know your computer.'):pct>=50?t('Khá lắm! Em thử lại để lấy đủ 3 sao nhé.','Good work! Try again to get all 3 stars.'):t('Không sao cả. Em quay lại chặng Khám phá xem thêm rồi thử lại nhé.','No worries. Go back to Explore for another look, then try again.')}</p>
  <div class="row" style="justify-content:center"><button class="btn primary" data-act="sim" data-k="qstart">${t('Thử lại','Try again')}</button><button class="btn" data-act="sim" data-k="mode" data-v="explore">${t('Về chặng Khám phá','Back to Explore')}</button><a class="btn" href="#hoc-mt">${t('Đọc bài học về máy tính','Read the computer lessons')}</a></div></section>`}
 const it=q.items[q.i],p=PM[it.ans],lock=q.pick!=null,right=q.pick===it.ans;
 const cls=id=>lock?(id===it.ans?'ok':id===q.pick?'bad':''):'';
 let body;
 if(it.k==='spot'){const inCase=SM_IN.includes(it.ans);
  body=`<p class="qtext">${t(`Chạm vào <b>${p.vi}</b> trong hình.`,`Tap the <b>${smLo(it.ans,1)}</b> in the picture.`)}</p><div class="sm-spot">${smScene({view:inCase?'case':'desk',click:lock?null:'ans',on:true,cab:SM_OUT,hi:lock?[it.ans]:[],hic:'#3ddc97'})}</div>`}
 else if(it.k==='which')body=`<p class="qtext">${smT(it.q)}</p><div class="sm-opts">${it.opts.map(id=>`<button class="sm-opt ${cls(id)}" data-act="sim" data-k="ans" data-v="${id}" ${lock?'disabled':''}>${smPic(id)}<span>${smN(id)}</span></button>`).join('')}</div>`;
 else body=`<div class="row" style="flex-wrap:nowrap;align-items:center"><div class="sm-qpic">${smPic(it.ans)}</div><p class="qtext">${t(`<b>${p.vi}</b> dùng để làm gì?`,`What does the <b>${smLo(it.ans,1)}</b> do?`)}</p></div><div class="opts">${it.opts.map((id,k)=>`<button class="opt ${cls(id)}" data-act="sim" data-k="ans" data-v="${id}" ${lock?'disabled':''}><span class="mk">${'ABC'[k]}</span><span>${smT(PM[id].does)}</span></button>`).join('')}</div>`;
 return `<section class="card stack"><div class="work-top"><b>${t('Câu','Question')} ${q.i+1}/${n}</b><span class="pill ok">${t('Đúng','Right')}: ${q.ok}</span></div><div class="bar"><i style="width:${(q.i+(lock?1:0))/n*100}%"></i></div>
 <div class="qtype">${it.k==='spot'?t('Tìm trong hình','Find it in the picture'):it.k==='which'?t('Chọn đúng hình','Pick the right picture'):t('Chọn một đáp án','Choose one answer')}</div>${body}
 ${lock?`<div class="fb ${right?'good':'wrong'}"><h3>${right?t('Chính xác!','Correct!'):t('Chưa đúng rồi','Not quite')}</h3><p><b>${smN(it.ans)}</b>: ${smT(p.does)} ${smT(p.like)}</p></div><div class="row"><button class="btn primary" data-act="sim" data-k="qnext">${q.i<n-1?t('Câu tiếp theo','Next question'):t('Xem kết quả','See my result')} →</button></div>`:''}</section>`}

/* ============ TRANG CHÍNH CỦA PHÒNG MÔ PHỎNG ============ */
const SM_ICON='<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>';
function vSim(){const m=SM(),st=simStars();
 const steps=[['explore','Khám phá','Explore',m.seen.length>=PARTS.length],['learn','Tìm hiểu','Learn',m.tour],['build','Thực hành','Build',m.build>0],['quiz','Thử thách','Challenge',(m.quiz||0)>=50]];
 return `<div class="stack sm"><a class="back nofocus" href="#trang-chu">← ${t('Về danh sách chủ đề','Back to all topics')}</a>
 <section class="card sm-top"><span class="icb" style="background:var(--blue)">${ic(SM_ICON)}</span><div class="sm-ttl"><div class="muted">${t('Phòng mô phỏng','Simulation lab')}</div><h1>${t('Khám phá bên trong máy tính','Explore inside the computer')}</h1></div><span class="stat"><b>★ ${st}</b>/8 ${t('sao','stars')}</span>${focusBtn()}</section>
 <div class="sm-steps" role="group" aria-label="${t('Bốn chặng','Four stages')}">${steps.map((s,i)=>`<button class="${SIM.mode===s[0]?'on':''}${s[3]?' done':''}" data-act="sim" data-k="mode" data-v="${s[0]}" ${SIM.mode===s[0]?'aria-current="step"':''}><i>${s[3]?'✓':i+1}</i><span>${t(s[1],s[2])}</span></button>`).join('')}</div>
 ${({explore:smExplore,learn:smLearn,build:smBuild,quiz:smQuiz}[SIM.mode]||smExplore)()}</div>`}
/* thẻ mời trên trang chủ và trong chủ đề Máy tính */
function simPromo(){const st=simStars();return `<a class="card sm-promo" href="#may-tinh"><div class="sm-promo-pic">${smPic('case')}${smPic('monitor')}</div><div class="txt"><div class="row" style="gap:8px"><span class="pill warn">${t('Mới','New')}</span><span class="qtype">${t('Phòng mô phỏng','Simulation lab')}</span></div><h3>${t('Khám phá bên trong máy tính','Explore inside the computer')}</h3><p class="muted">${t('Chạm để xem từng bộ phận, tự tay lắp một chiếc máy tính rồi bấm nút bật máy.','Tap to see every part, build a computer yourself, then press the power button.')}</p></div><div class="sm-promo-go"><span class="stat"><b>★ ${st}</b>/8</span><span class="btn sun">${st?t('Chơi tiếp','Keep playing'):t('Vào khám phá','Start exploring')} →</span></div></a>`}

/* ============ HÀNH ĐỘNG ============ */
/* trả về false nếu không cần vẽ lại trang */
function SIMA(k,v){const m=SM(),b=SIM.b,q=SIM.q;if(b)b.last=null;
 switch(k){
 case 'mode':SIM.mode=v;SIM.sel=null;sfx('tap');if(v==='explore')SIM.view='desk';if(v==='learn'&&SIM.tour>=SM_TOUR.length-1)SIM.tour=0;if(v==='quiz'&&q&&q.done)SIM.q=null;try{window.scrollTo(0,0)}catch(e){}return;
 case 'view':SIM.view=v;if(v==='desk'&&SM_IN.includes(SIM.sel))SIM.sel=null;sfx('flip');return;
 case 'part':{if(!PM[v])return false;if(SIM.mode!=='explore')return false;
  if(v==='case'&&SIM.view==='desk')SIM.view='case';else if(SM_IN.includes(v))SIM.view='case';else if(SM_OUT.includes(v))SIM.view='desk';
  SIM.sel=v;sfx('tap');if(!m.seen.includes(v)){m.seen.push(v);save();touch();if(m.seen.length===PARTS.length){sfx('win');confetti();toast(t('Em đã khám phá đủ 11 bộ phận! +1 sao','You explored all 11 parts! +1 star'))}else sfx('star')}return}
 case 'tour':SIM.tour=Math.max(0,Math.min(SM_TOUR.length-1,SIM.tour+ +v));sfx(SIM.tour>=8&&+v>0?'star':'tap');return;
 case 'tourend':if(!m.tour){m.tour=1;save();touch();sfx('win');toast(t('Em đã nghe hết câu chuyện của Mây! +1 sao','You finished Mây’s story! +1 star'))}SIM.mode='build';SIM.tour=0;try{window.scrollTo(0,0)}catch(e){}return;
 case 'pickp':if(!b||Date.now()-SIM.noClick<350)return false;b.sel=b.sel===v?null:v;b.blink=null;sfx('tap');return;
 case 'slot':if(!b)return false;if(!b.sel){b.msg=['Em chạm chọn một bộ phận ở khay linh kiện trước nhé.','Tap a part in the tray first.'];sfx('err');return}smTry(b.sel,v);smAfter();return;
 case 'hint':{if(!b)return false;const id=b.sel&&smSlots().includes(b.sel)?b.sel:(b.stage===1?SM_IN:SM_OUT).find(x=>!b.done.includes(x));if(!id)return false;b.blink=id;b.sel=id;b.msg=[`Tìm ${smLo(id,0)} nhé. ${PM[id].put[0]}`,`Look for the ${smLo(id,1)}. ${PM[id].put[1]}`];sfx('tap');return}
 case 'close':if(!b||smTodo().length)return false;b.stage=2;b.msg=null;b.sel=null;b.blink=null;b.tray=shuffle(SM_OUT);sfx('flip');return;
 case 'power':if(!b||b.stage!==3||b.on)return false;b.on=true;b.stars=b.miss===0?3:b.miss<=2?2:1;m.build=Math.max(m.build,b.stars);save();touch();sfx('win');confetti();return;
 case 'rebuild':smNewBuild();sfx('tap');return;
 case 'qstart':smNewQuiz();sfx('tap');try{window.scrollTo(0,0)}catch(e){}return;
 case 'ans':{if(!q||q.done||q.pick!=null||!PM[v])return false;const it=q.items[q.i];q.pick=v;if(v===it.ans){q.ok++;q.run++;sfx('ok',q.run)}else{q.run=0;sfx('bad')}touch();return}
 case 'qnext':{if(!q||q.pick==null)return false;if(q.i<q.items.length-1){q.i++;q.pick=null;sfx('tap')}else{q.done=true;const pct=Math.round(q.ok/q.items.length*100);m.quiz=Math.max(m.quiz||0,pct);save();if(pct>=70){sfx('win');confetti()}else sfx('end')}try{window.scrollTo(0,0)}catch(e){}return}
 default:return false}}
/* sau khi lắp đủ ba thiết bị trên bàn thì chuyển sang bước bật máy */
function smAfter(){const b=SIM.b;if(b&&b.stage===2&&!smTodo().length){b.stage=3;b.msg=null}}

/* ============ KÉO THẢ (chuột và cảm ứng) ============ */
let SDG=null;
function smDrop(id,cx,cy){const el=document.getElementById('sm-svg'),b=SIM.b;if(!el||!b)return;const r=el.getBoundingClientRect();
 if(cx<r.left||cx>r.right||cy<r.top||cy>r.bottom)return;
 const ctm=el.getScreenCTM();if(!ctm)return;const pt=new DOMPoint(cx,cy).matrixTransform(ctm.inverse()),x=pt.x,y=pt.y;
 const inR=(pid,pad)=>{const q=PM[pid].r;return x>=q[0]-pad&&x<=q[0]+q[2]+pad&&y>=q[1]-pad&&y<=q[1]+q[3]+pad};
 const pad=b.stage===1?12:26,slots=smSlots();
 /* rộng rãi với ô đúng; các ô nhỏ nằm trên bo mạch chủ được xét trước ô lớn */
 const slot=slots.includes(id)&&inR(id,pad)?id:slots.slice().sort((a,c)=>PM[a].r[2]*PM[a].r[3]-PM[c].r[2]*PM[c].r[3]).find(s=>inR(s,4))||null;
 smTry(id,slot)}
if(typeof document!=='undefined'){
document.addEventListener('pointerdown',e=>{if(typeof view==='undefined'||view!=='may-tinh'||!e.target.closest)return;const el=e.target.closest('[data-drag]');if(!el||e.button>0)return;SDG={id:el.dataset.drag,x:e.clientX,y:e.clientY,on:false,g:null,pid:e.pointerId}});
document.addEventListener('pointermove',e=>{if(!SDG||e.pointerId!==SDG.pid)return;
 if(!SDG.on){if(Math.hypot(e.clientX-SDG.x,e.clientY-SDG.y)<8)return;SDG.on=true;const g=document.createElement('div');g.className='sm-ghost';g.innerHTML=smPic(SDG.id,{});document.body.appendChild(g);SDG.g=g;const st=document.querySelector('.sm-stage');if(st)st.classList.add('dragging');sfx('tap')}
 SDG.g.style.left=e.clientX+'px';SDG.g.style.top=e.clientY+'px';e.preventDefault()},{passive:false});
const smEnd=e=>{if(!SDG||e.pointerId!==SDG.pid)return;const d=SDG;SDG=null;if(d.g)d.g.remove();if(!d.on)return;SIM.noClick=Date.now();if(e.type==='pointerup'&&SIM.b){SIM.b.sel=null;smDrop(d.id,e.clientX,e.clientY);smAfter()}render()};
document.addEventListener('pointerup',smEnd);document.addEventListener('pointercancel',smEnd);
let smWide=null;window.addEventListener('resize',()=>{const n=smNarrow();if(n!==smWide){smWide=n;if(typeof view!=='undefined'&&view==='may-tinh'&&!SDG)render()}});
}
