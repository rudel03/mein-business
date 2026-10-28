const {chromium}=require('playwright');
const [,,src,out]=process.argv;
(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://'+process.cwd()+'/'+src,{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);
const bad=await p.evaluate(()=>{const r=[];document.querySelectorAll('section.pg').forEach((s,i)=>{
  // Inhalt darf weder über die Seite noch in die Boxen/Fußzeile laufen
  const ft=s.querySelector('.ft'), bx=s.querySelector('.boxes'), limit=(bx||ft||s).getBoundingClientRect().top;
  let max=0; s.querySelectorAll(':scope > *:not(.hd):not(.ft):not(.boxes):not(img)').forEach(c=>{ if(getComputedStyle(c).position!=='absolute') max=Math.max(max,c.getBoundingClientRect().bottom)});
  if(max>limit-2) r.push((i+1)+':'+Math.round(max-limit));});return r;});
console.log('overflow pages:',bad.join(' ')||'none');
await p.pdf({path:out,width:'220mm',height:'270mm',printBackground:true,preferCSSPageSize:true});
await b.close();})();
