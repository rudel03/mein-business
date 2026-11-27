// 010 Kaugummiautomaten – Plotwist: Ein Junge wirft 10 Jahre lang 50 Cent rein, heute gehören ihm alle Automaten.
import * as THREE from 'three';
import * as W from '../world.js';
const { C, pose, pose2, camMove, clamp01, ease, lerp } = W;

function town(scene, ctx, { machines = 8, life = true } = {}) {
  scene.add(W.ground(600, 0x5cb84a));
  const road = new THREE.Mesh(new THREE.PlaneGeometry(400, 10), W.M(C.asphalt)); road.rotation.x = -Math.PI / 2; road.position.set(0, 0.02, 9); road.receiveShadow = true; scene.add(road);
  const walk = new THREE.Mesh(new THREE.PlaneGeometry(400, 4), W.M(0xd6d0c4)); walk.rotation.x = -Math.PI / 2; walk.position.set(0, 0.03, 4); walk.receiveShadow = true; scene.add(walk);
  ctx.row = W.rowHouses(8); ctx.row.position.set(0, 0, -1); scene.add(ctx.row);
  ctx.ms = []; for (let i = 0; i < machines; i++) { const m = W.gumMachine([0xd62828, 0xd62828, 0x2f6fde, 0xd62828][i % 4]); m.position.set(-21 + i * 6 + 1.6, 0.6, 2.25); scene.add(m); ctx.ms.push(m); }
  for (const x of [-26, -14, -2, 10, 22]) { const t = W.tree(1.1); t.position.set(x, 0, 6.3); scene.add(t); W.sway(scene, t, 0.03, 1.2); }
  if (life) {
    W.walkers(scene, 5, [[-30, 0, 4.2], [30, 0, 4.2]]);
    const cars = [W.car(0x2f6fde), W.car(0xf5f5f5), W.car(0xe94b3c)]; cars.forEach(c => scene.add(c));
    scene.userData.tickers.push((t) => cars.forEach((c, i) => { const k = (t * 0.05 + i / 3) % 1; c.position.set(lerp(-60, 60, i % 2 ? 1 - k : k), 0, i % 2 ? 7.5 : 10.5); c.rotation.y = i % 2 ? -Math.PI / 2 : Math.PI / 2; }));
    W.birds(scene, 6, [0, 20, -20]);
  }
}
function room(scene, wall = 0xf3e9d8, floor = 0xb98a5a) { scene.add(W.ground(200, 0x9a9a9a)); scene.add(W.room(10, 8, 3.2, wall, floor)); }
function tagAt(ctx, scene, key, text, color, h, pos) { const t = W.tag(text, color, h); t.position.set(...pos); scene.add(t); ctx[key] = t; return t; }

export const shots = {
  // 1a Häuserzeile, überall Automaten – Etikett „15.000 AUTOMATEN“
  street: {
    setup(scene, ctx) { town(scene, ctx, { machines: 8 }); tagAt(ctx, scene, 'tg', '15.000 AUTOMATEN', 'red', 0.9, [-3, 5.0, 2]);
      ctx.pins = ctx.ms.map(m => { const p = W.tag('●', 'red', 0.4); p.position.set(m.position.x, 2.6, 2.3); scene.add(p); return p; }); },
    update(t, d, cam, ctx) { const p = t / d; ctx.pins.forEach((pn, i) => W.popIn(pn, p * 5 - i * 0.35)); W.popIn(ctx.tg, p * 2.5 - 1.2);
      camMove(cam, [-16, 3.5, 16], [10, 5, 18], [-8, 1.5, 1], [6, 2, 1], p); },
  },
  // 1b Der Automatenkönig vor einer Wand aus Automaten
  wall: {
    setup(scene, ctx) { scene.add(W.ground(300, 0x8f9aa6)); scene.add(W.room(30, 16, 9, 0xdfe3e8, 0x6b7380));
      const geo = new THREE.Group(); for (let r = 0; r < 7; r++) for (let c = 0; c < 18; c++) { const m = W.gumMachine([0xd62828, 0x2f6fde, 0xd62828, 0x2ecc71][(r + c) % 4]); m.scale.setScalar(0.9); m.position.set((c - 8.5) * 0.6, r * 1.35, -5); geo.add(m); } scene.add(geo);
      ctx.o = W.oldOwner(); ctx.o.position.set(0, 0, -1); scene.add(ctx.o); tagAt(ctx, scene, 'tg', 'DER AUTOMATENKÖNIG', 'yellow', 0.6, [0, 2.7, -1]); tagAt(ctx, scene, 'big', '15.000 AUTOMATEN', 'red', 1.0, [0, 6.5, -4]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.o); ctx.o.userData.armL.rotation.set(-0.6, 0, 0.9); ctx.o.userData.armR.rotation.set(-0.6, 0, -0.9); W.popIn(ctx.big, p * 4); W.popIn(ctx.tg, p * 3 - 1.0);
      camMove(cam, [0, 7, 13], [0, 2.2, 5.5], [0, 4.5, -4], [0, 1.6, -1], p); },
  },
  // 2 Nahaufnahme: Münze rein, Drehknopf, Kugel fällt – 5 Cent vs. 50 Cent
  closeup: {
    setup(scene, ctx) { town(scene, ctx, { machines: 1, life: false }); ctx.m = ctx.ms[0]; ctx.m.position.set(0, 0.6, 2.25);
      ctx.coin = W.coin(); ctx.coin.scale.setScalar(0.25); scene.add(ctx.coin); ctx.ball = W.ball(0.06, 0xff3b3b, 1, { emissive: 0xff3b3b, emissiveIntensity: 0.2 }); scene.add(ctx.ball);
      ctx.kid = W.kid(0xffd400); ctx.kid.position.set(0.55, 0, 3.0); ctx.kid.rotation.y = Math.PI; scene.add(ctx.kid);
      tagAt(ctx, scene, 't1', 'EINKAUF ≈ 5 CENT', 'white', 0.5, [-0.45, 2.25, 2.3]); tagAt(ctx, scene, 't2', 'DU ZAHLST 50 CENT', 'yellow', 0.5, [0.45, 2.55, 2.3]); tagAt(ctx, scene, 't3', '× 10', 'red', 0.8, [0, 1.95, 2.4]); },
    update(t, d, cam, ctx) { const p = t / d;
      const kc = clamp01(p / 0.25); ctx.coin.position.set(0, lerp(1.0, 1.35, kc), lerp(2.9, 2.44, kc)); ctx.coin.rotation.x = Math.PI / 2; ctx.coin.visible = kc < 1;
      ctx.m.userData.knob.rotation.z = -Math.PI * 2 * ease(clamp01((p - 0.28) / 0.25));
      const kb = clamp01((p - 0.5) / 0.15); ctx.ball.position.set(0, lerp(1.1, 0.82, kb), 2.5 + kb * 0.05); ctx.ball.visible = p > 0.5;
      pose.reset(ctx.kid); ctx.kid.userData.armR.rotation.set(-1.5, 0, 0);
      W.popIn(ctx.t1, p * 4 - 0.6); W.popIn(ctx.t2, p * 4 - 1.4); W.popIn(ctx.t3, p * 4 - 2.4);
      camMove(cam, [-0.9, 1.45, 4.4], [-0.6, 1.35, 3.8], [0, 1.2, 2.3], [0, 1.15, 2.3], p); },
  },
  // 3a Nachts: Automat leuchtet, jemand kauft, Katze läuft vorbei
  nightSale: {
    setup(scene, ctx) { town(scene, ctx, { machines: 3, life: false }); ctx.ms.forEach(m => { m.userData.lamp.material = W.M(0xfff0c0, { emissive: 0xffe08a, emissiveIntensity: 1.5 }); });
      const moon = W.moon(5); moon.position.set(-30, 40, -60); scene.add(moon);
      for (const x of [-5, 7]) { const lamp = new THREE.Group(); lamp.add(W.cyl(0.07, 0.07, 4, 0x333333, 6)); lamp.children[0].position.y = 2; const l = W.ball(0.3, 0xfff0c0, 1, { emissive: 0xffd27a, emissiveIntensity: 2 }); l.position.y = 4.1; lamp.add(l); lamp.position.set(x, 0, 5.5); scene.add(lamp); }
      ctx.p = W.person({ shirt: 0x9b59b6, hat: 'hair' }); scene.add(ctx.p); tagAt(ctx, scene, 'tg', '24/7 GEÖFFNET', 'yellow', 0.55, [-19.4, 2.7, 2.3]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.p.position.set(lerp(-25, -19.4, ease(clamp01(p * 1.6))), 0, 3.2); ctx.p.rotation.y = p < 0.6 ? Math.PI / 2 : Math.PI; pose.reset(ctx.p); if (p < 0.6) pose.walk(ctx.p, t); else ctx.p.userData.armR.rotation.set(-1.5, 0, 0);
      W.popIn(ctx.tg, p * 3 - 0.8); camMove(cam, [-15, 2.2, 9], [-16, 2.0, 7.5], [-19.4, 1.3, 2.3], [-19.4, 1.3, 2.3], p); },
  },
  // 3b Der Besitzer pennt – Geld kommt trotzdem rein
  sleep: {
    setup(scene, ctx) { room(scene, 0x2c3558, 0x4a3a2c); ctx.b = W.bed(); scene.add(ctx.b); ctx.o = W.oldOwner(); ctx.o.rotation.x = -Math.PI / 2; ctx.o.position.set(0, 0.85, 0.2); scene.add(ctx.o);
      ctx.coins = []; for (let i = 0; i < 10; i++) { const c = W.coin(); c.scale.setScalar(0.6); scene.add(c); ctx.coins.push(c); }
      tagAt(ctx, scene, 'z', 'Zzz…', 'dark', 0.5, [0.6, 2.0, -0.9]); tagAt(ctx, scene, 'tg', '+ 50 CENT  + 50 CENT', 'green', 0.45, [0, 2.6, 0]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.coins.forEach((c, i) => { const k = (t * 0.5 + i / 10) % 1; c.position.set(Math.sin(i * 2) * 0.8, 2.6 - k * 1.8, 0.2 + Math.cos(i) * 0.6); c.rotation.x = t * 6; });
      W.popIn(ctx.z, 1); ctx.z.position.y = 2.0 + Math.sin(t * 2) * 0.1; W.popIn(ctx.tg, p * 3 - 0.5);
      camMove(cam, [2.4, 3.2, 3.6], [1.8, 2.8, 3.0], [0, 0.8, 0], [0, 0.9, 0], p); },
  },
  // 4a Rechnung: Automaten-Raster wächst auf 15.000, Zähler
  grid: {
    setup(scene, ctx) { scene.add(W.ground(600, 0x5cb84a)); ctx.n = 0;
      const geo = new THREE.BoxGeometry(0.5, 1.4, 0.35); ctx.im = new THREE.InstancedMesh(geo, W.M(0xd62828, { emissive: 0xd62828, emissiveIntensity: 0.1 }), 2500); const d = new THREE.Object3D();
      for (let i = 0; i < 2500; i++) { d.position.set((i % 50 - 25) * 1.2, 0.7, -Math.floor(i / 50) * 1.6); d.updateMatrix(); ctx.im.setMatrixAt(i, d.matrix); } ctx.im.count = 0; ctx.im.castShadow = true; scene.add(ctx.im); ctx.scene = scene; },
    update(t, d, cam, ctx) { const p = t / d; ctx.im.count = Math.round(2500 * ease(clamp01(p * 1.2)));
      const n = Math.round(15000 * ease(clamp01(p * 1.2)) / 100) * 100;
      if (ctx.lastN !== n) { if (ctx.tg) { ctx.scene.remove(ctx.tg); ctx.tg.material.map.dispose(); } ctx.tg = W.tag(`${n.toLocaleString('de-DE')} × 20 €`, 'yellow', 0.8); ctx.tg.position.set(0, 6, -10); ctx.scene.add(ctx.tg); ctx.lastN = n; }
      camMove(cam, [0, 6, 12], [0, 28, 26], [0, 1, -10], [0, 0, -36], p); },
  },
  // 4b 300.000 € jeden Monat: Geldregen auf den Automatenkönig
  rich: {
    setup(scene, ctx) { town(scene, ctx, { machines: 4 }); ctx.o = W.oldOwner(); ctx.o.position.set(0, 0, 5); scene.add(ctx.o); ctx.bills = []; for (let i = 0; i < 60; i++) { const b = W.bill(); scene.add(b); ctx.bills.push(b); }
      tagAt(ctx, scene, 'tg', '= 300.000 € / MONAT', 'green', 0.8, [0, 3.4, 5]); tagAt(ctx, scene, 'bsp', 'BEISPIELRECHNUNG', 'white', 0.35, [0, 2.8, 5]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.o); pose.armsUp(ctx.o, 1, t); ctx.bills.forEach((b, i) => { const k = (t * 0.45 + i / 60) % 1; b.position.set(Math.sin(i * 7) * 3, 6 - k * 6, 5 + Math.cos(i * 3) * 2); b.rotation.set(t * 3 + i, i, t * 2); });
      W.popIn(ctx.tg, p * 3 - 0.3); W.popIn(ctx.bsp, p * 3 - 0.8); camMove(cam, [2, 1.8, 10], [0.8, 2.2, 8.5], [0, 1.6, 5], [0, 1.9, 5], p); },
  },
  // 5a Kosten: Nachfüll-Tour mit Transporter, Sprit + Reparatur
  refill: {
    setup(scene, ctx) { town(scene, ctx, { machines: 5 }); ctx.v = W.van(0xf2f2f2); ctx.v.rotation.y = Math.PI / 2; scene.add(ctx.v); ctx.o = W.oldOwner(); scene.add(ctx.o);
      ctx.wr = W.box(0.08, 0.4, 0.08, 0x8a939c); ctx.o.userData.armR.add(ctx.wr); ctx.wr.position.set(0, -0.7, 0.1);
      tagAt(ctx, scene, 't1', '− SPRIT', 'red', 0.45, [-6, 3.2, 7.5]); tagAt(ctx, scene, 't2', '− REPARATUR', 'red', 0.45, [-3.4, 2.5, 2.6]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.v.position.set(lerp(-20, -7, ease(clamp01(p * 1.5))), 0, 7.5);
      ctx.o.position.set(-3.4, 0, 3.0); ctx.o.rotation.y = Math.PI; pose.reset(ctx.o); ctx.o.userData.armR.rotation.set(-1.4 + Math.sin(t * 10) * 0.2, 0, 0);
      ctx.t1.position.set(ctx.v.position.x, 3.2, 7.5); W.popIn(ctx.t1, p * 3 - 0.5); W.popIn(ctx.t2, p * 3 - 1.4);
      camMove(cam, [-7, 2.6, 13], [-6, 2.3, 11], [-5, 1.4, 4], [-4.2, 1.4, 3.5], p); },
  },
  // 5b Hausbesitzer kriegt nur eine kleine Münze
  landlord: {
    setup(scene, ctx) { town(scene, ctx, { machines: 3 }); ctx.o = W.oldOwner(); ctx.o.position.set(-8.6, 0, 3.6); ctx.o.rotation.y = Math.PI / 2; scene.add(ctx.o);
      ctx.l = W.person({ shirt: 0x8d6e63, hat: 'hair', hair: 0xbdbdbd }); ctx.l.position.set(-7.2, 0, 3.6); ctx.l.rotation.y = -Math.PI / 2; scene.add(ctx.l);
      ctx.c = W.coin(); ctx.c.scale.setScalar(0.4); scene.add(ctx.c); tagAt(ctx, scene, 'tg', 'KLEINE PROVISION', 'white', 0.45, [-7.2, 2.7, 3.6]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.o); pose2.give(ctx.o, 1); pose.reset(ctx.l); pose2.give(ctx.l, 1); if (p > 0.6) pose.shrug(ctx.l, clamp01((p - 0.6) * 4));
      const k = ease(clamp01(p * 2 - 0.3)); ctx.c.position.set(lerp(-8.2, -7.6, k), 1.32, 3.6); ctx.c.rotation.x = Math.PI / 2; W.popIn(ctx.tg, p * 3 - 1.2);
      camMove(cam, [-7.9, 2.1, 9.0], [-7.9, 1.9, 7.8], [-7.9, 1.5, 3.6], [-7.9, 1.5, 3.6], p); },
  },
  // 6 Gewerbeamt: Stempel drauf, fertig
  amt: {
    setup(scene, ctx) { room(scene, 0xe9eef3, 0xa7b0b8); ctx.d = W.counterDesk(); scene.add(ctx.d); ctx.cl = W.person({ shirt: 0xffffff, hat: 'hair', hair: 0x3a2a1e }); ctx.cl.position.set(0, 0, -1); scene.add(ctx.cl);
      ctx.hero = W.person(); ctx.hero.position.set(0, 0, 1.3); ctx.hero.rotation.y = Math.PI; scene.add(ctx.hero); ctx.pp = W.paper(0.5, 0.7); ctx.pp.rotation.x = -Math.PI / 2; ctx.pp.position.set(0, 1.2, 0); scene.add(ctx.pp);
      ctx.st = W.stamp(); scene.add(ctx.st); tagAt(ctx, scene, 't1', 'GEWERBE ANMELDEN ✓', 'green', 0.5, [0, 2.7, 0]); tagAt(ctx, scene, 't2', 'KEINE SPEZIAL-ERLAUBNIS', 'white', 0.4, [0, 3.15, 0]); },
    update(t, d, cam, ctx) { const p = t / d; const k = Math.abs(Math.sin(clamp01((p - 0.3) / 0.3) * Math.PI)); ctx.st.position.set(0, 1.25 + (1 - k) * 0.6 * (p > 0.3 && p < 0.6 ? 1 : 0) + (p <= 0.3 ? 0.6 : 0), 0); pose.reset(ctx.cl); ctx.cl.userData.armR.rotation.set(-1.2 - (1 - k) * 0.4, 0, 0);
      pose.reset(ctx.hero); if (p > 0.6) pose.armsUp(ctx.hero, clamp01((p - 0.6) * 4), t); W.popIn(ctx.t1, p * 3 - 1.6); W.popIn(ctx.t2, p * 3 - 0.6);
      camMove(cam, [2.2, 2.3, 3.6], [1.6, 2.1, 3.0], [0, 1.4, 0], [0, 1.5, 0], p); },
  },
  // 7a Kapselautomat: Kind dreht, bunte Kapsel kommt raus – 1–2 € pro Dreh
  capsule: {
    setup(scene, ctx) { town(scene, ctx, { machines: 2 }); ctx.cm = W.capsuleMachine(); ctx.cm.position.set(4, 0, 3.2); scene.add(ctx.cm); ctx.k = W.kid(0xff8a1f); ctx.k.position.set(4, 0, 4.2); ctx.k.rotation.y = Math.PI; scene.add(ctx.k);
      ctx.cap = W.capsule(0xff3b3b); scene.add(ctx.cap); tagAt(ctx, scene, 'tg', '1–2 € PRO DREH', 'yellow', 0.55, [4, 2.5, 3.2]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.cm.userData.knob.rotation.z = -t * 3 * (p < 0.5 ? 1 : 0); pose.reset(ctx.k); ctx.k.userData.armR.rotation.set(-1.4, 0, 0);
      const k = clamp01((p - 0.5) / 0.25); ctx.cap.position.set(4, lerp(0.6, 0.15, k), lerp(3.55, 3.9, k)); ctx.cap.visible = p > 0.5; ctx.cap.rotation.z = t * 4 * (1 - k);
      W.popIn(ctx.tg, p * 3 - 0.4); camMove(cam, [6.8, 1.9, 8.6], [6.0, 1.7, 7.6], [4, 1.0, 3.4], [4, 1.0, 3.4], p); },
  },
  // 7b Plastikspielzeug zerfällt nach 2 Minuten
  broken: {
    setup(scene, ctx) { room(scene, 0xfde2e4, 0xb98a5a); ctx.k = W.kid(0xff8a1f); ctx.k.position.set(0, 0, 0.5); scene.add(ctx.k);
      ctx.toy = new THREE.Group(); [[0, 0, 0, 0.25, 0.25, 0.25, 0x3b82f6], [0, 0.22, 0, 0.18, 0.18, 0.18, 0xffd400], [0.15, 0.05, 0, 0.12, 0.05, 0.05, 0x3b82f6], [-0.15, 0.05, 0, 0.12, 0.05, 0.05, 0x3b82f6]].forEach(([x, y, z, a, b, c, col]) => { const m = W.box(a, b, c, col); m.position.set(x, y, z); ctx.toy.add(m); }); scene.add(ctx.toy);
      tagAt(ctx, scene, 'tg', 'NACH 2 MINUTEN…', 'red', 0.5, [0, 2.0, 0.8]); },
    update(t, d, cam, ctx) { const p = t / d; const br = clamp01((p - 0.45) * 3);
      ctx.toy.position.set(0, 0.95 - br * 0.6, 0.95); ctx.toy.children.forEach((c, i) => { c.position.x += (i - 1.5) * br * 0.02; c.rotation.set(br * i, br * 2, 0); });
      pose.reset(ctx.k); if (p < 0.45) ctx.k.userData.armR.rotation.set(-1.3, 0, 0); else pose.handsOnHead(ctx.k, br); W.popIn(ctx.tg, p * 3 - 1.2);
      camMove(cam, [1.2, 1.4, 3.0], [0.8, 1.3, 2.5], [0, 0.9, 0.7], [0, 0.8, 0.7], p); },
  },
  // 8 Pro-Tipp: Hausbesitzer an belebter Straße – Provision fließt zu ihm
  homeowner: {
    setup(scene, ctx) { town(scene, ctx, { machines: 1 }); ctx.ms[0].position.set(1.6, 0.6, 2.25); ctx.h = W.person(); ctx.h.position.set(-0.6, 0, 3.3); scene.add(ctx.h);
      ctx.coins = []; for (let i = 0; i < 8; i++) { const c = W.coin(); c.scale.setScalar(0.4); scene.add(c); ctx.coins.push(c); }
      tagAt(ctx, scene, 't1', 'KOSTET DICH NIX', 'green', 0.45, [-0.6, 2.7, 3.3]); tagAt(ctx, scene, 't2', '+ PROVISION', 'yellow', 0.45, [-0.6, 3.1, 3.3]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.h); ctx.h.userData.armR.rotation.set(-1.2, 0, 0.4);
      ctx.coins.forEach((c, i) => { const k = (t * 0.7 + i / 8) % 1; c.position.set(lerp(1.6, -0.3, k), 1.0 + Math.sin(k * Math.PI) * 0.8, lerp(2.5, 3.5, k)); c.rotation.x = t * 8; });
      W.popIn(ctx.t1, p * 3 - 0.4); W.popIn(ctx.t2, p * 3 - 1.2); camMove(cam, [3, 2.2, 9], [1.8, 2, 7.6], [0.5, 1.3, 3], [0.4, 1.4, 3], p); },
  },
  // 9 Plotwist 1: Ein Junge wirft jeden Tag 50 Cent rein – wächst dabei 10 Jahre
  grow: {
    setup(scene, ctx) { town(scene, ctx, { machines: 1, life: false }); ctx.m = ctx.ms[0]; ctx.m.position.set(0, 0.6, 2.25); ctx.k = W.person({ shirt: 0x3b82f6, hat: 'hair', hair: 0x6d4c41 }); scene.add(ctx.k);
      ctx.coin = W.coin(); ctx.coin.scale.setScalar(0.25); scene.add(ctx.coin); ctx.scene = scene; },
    update(t, d, cam, ctx) { const p = t / d; const yr = 2016 + Math.min(10, Math.floor(p * 11));
      ctx.k.scale.setScalar(lerp(0.55, 1.0, p)); ctx.k.position.set(0, 0, 3.0); ctx.k.rotation.y = Math.PI; pose.reset(ctx.k); ctx.k.userData.armR.rotation.set(-1.4 - Math.abs(Math.sin(t * 6)) * 0.2, 0, 0);
      const kc = (t * 2) % 1; ctx.coin.position.set(0, 1.35, lerp(2.9, 2.44, kc)); ctx.coin.rotation.x = Math.PI / 2;
      if (ctx.lastY !== yr) { if (ctx.tg) { ctx.scene.remove(ctx.tg); ctx.tg.material.map.dispose(); } ctx.tg = W.tag(`${yr} · JEDEN TAG 50 CENT`, 'yellow', 0.5); ctx.tg.position.set(0, 2.4, 2.3); ctx.scene.add(ctx.tg); ctx.lastY = yr; }
      camMove(cam, [2.4, 1.6, 6.5], [2.0, 1.8, 5.8], [0, 1.1, 2.6], [0, 1.4, 2.6], p); },
  },
  // 10a Der Junge (jetzt erwachsen, im Anzug) auf einem Thron aus Automaten
  throne: {
    setup(scene, ctx) { scene.add(W.ground(300, 0x8f9aa6)); scene.add(W.room(30, 16, 9, 0x2c3558, 0x4a3a2c));
      const g = new THREE.Group(); for (let r = 0; r < 6; r++) for (let c = 0; c < 16; c++) { const m = W.gumMachine([0xd62828, 0x2f6fde, 0x2ecc71][(r + c) % 3]); m.scale.setScalar(0.9); m.position.set((c - 7.5) * 0.6, r * 1.35, -5); g.add(m); } scene.add(g);
      ctx.th = W.throne(); ctx.th.position.set(0, 0, -1.5); scene.add(ctx.th); ctx.b = W.suitGuy(); ctx.b.position.set(0, 0.2, -1.4); scene.add(ctx.b);
      tagAt(ctx, scene, 'tg', 'JETZT GEHÖREN IHM ALLE 15.000', 'green', 0.5, [0, 3.4, -1.5]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.b); pose2.sit(ctx.b); ctx.b.userData.armL.rotation.set(-0.3, 0, -0.5); ctx.b.userData.armR.rotation.set(-0.3, 0, 0.5); W.popIn(ctx.tg, p * 3 - 0.4);
      camMove(cam, [0, 1.2, 6], [0, 2.4, 4.5], [0, 1.3, -1.5], [0, 1.8, -1.5], p); },
  },
  // 10b Der alte Typ steht vor dem Automaten – leere Taschen
  broke: {
    setup(scene, ctx) { town(scene, ctx, { machines: 3 }); ctx.o = W.oldOwner(); ctx.o.position.set(-19.4, 0, 3.2); ctx.o.rotation.y = Math.PI; scene.add(ctx.o); tagAt(ctx, scene, 'tg', 'KEIN KLEINGELD', 'red', 0.55, [-19.4, 2.6, 3.2]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.o); pose.shrug(ctx.o, clamp01(p * 2)); ctx.o.userData.head.rotation.x = 0.3; W.popIn(ctx.tg, p * 3 - 0.8);
      camMove(cam, [-17, 1.8, 7.5], [-18, 1.7, 6.3], [-19.4, 1.3, 2.6], [-19.4, 1.3, 2.6], p); },
  },
};
export const sky = { wall: 'indoor', sleep: 'night', amt: 'indoor', broken: 'indoor', throne: 'indoor', nightSale: 'night', grid: 'day' };
