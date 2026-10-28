const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+__dirname+'/test.html');
let bad=0;for(let n=0;n<300;n++){await p.evaluate(()=>{const d=[...document.querySelectorAll('.dsr-day')];const k=Math.floor(Math.random()*d.length);for(let j=0;j<1+Math.floor(Math.random()*3);j++)d[k].click();const e=[...document.querySelectorAll('[data-eq]')];const c=e[Math.floor(Math.random()*3)];if(Math.random()<.3){c.checked=!c.checked;c.dispatchEvent(new Event('change'))}});
const t=await p.textContent('[data-result]');if(/undefined|NaN/.test(t)){bad++;if(bad<3)console.log(t.slice(0,400))}}
console.log('bad',bad,errs.slice(0,3));await b.close()})()
