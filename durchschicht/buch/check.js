const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://'+process.cwd()+'/ds.html',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
const r=await p.evaluate(()=>{const out=[];document.querySelectorAll('section.pg[id^="p-r"]').forEach(s=>{const g=s.querySelector('div[style*="grid-template-columns:72mm"]');const bx=s.querySelector('.grid2[style*="absolute"]');if(!g||!bx)return;const gap=bx.getBoundingClientRect().top-g.getBoundingClientRect().bottom;out.push([s.id,Math.round(gap)])});return out.sort((a,b)=>a[1]-b[1]).slice(0,8)});
console.log(JSON.stringify(r));await b.close();})();
