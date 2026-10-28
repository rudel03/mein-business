const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1200,height:1600}});
for(const n of ['1','2','3']){await p.goto('file://'+process.cwd()+`/coverB_${n}.html`,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:`cover/Variante_Band${n}.jpg`,type:'jpeg',quality:90});}
await b.close();})();
