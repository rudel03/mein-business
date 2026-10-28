const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:1600}});
for(const f of fs.readdirSync('.').filter(x=>x.startsWith('prod_')&&x.endsWith('.html'))){await p.goto('file://'+process.cwd()+'/'+f,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:'../produktbilder/'+f.replace('prod_','hm-').replace('.html','.jpg'),type:'jpeg',quality:86});}
await b.close();})();
