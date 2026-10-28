const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1240,height:1653}});
await p.goto('file://'+process.cwd()+'/cover.html',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
await p.screenshot({path:'cover.jpg',type:'jpeg',quality:92});await b.close();})();
