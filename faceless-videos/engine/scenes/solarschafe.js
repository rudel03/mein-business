// 012 Schafe im Solarpark – Plotwist: Die Schafe gründen eine Gewerkschaft, der Schäfer mäht mit der Nagelschere.
import * as THREE from 'three';
import * as W from '../world.js';
const { C, pose, pose2, camMove, clamp01, ease, lerp } = W;

function park(scene, ctx, { rows = 6, cols = 10, tall = false, flock = 14, life = true, fenceOn = false } = {}) {
  scene.add(W.ground(600, 0x6cbf4a));
  ctx.park = W.solarPark(scene, rows, cols); ctx.park.position.z = 4;
  ctx.grass = tall ? W.grassTufts(5000, 40, 1.0, 4, 0x3f8f2f, 0.45) : W.grassTufts(900, 40, 0.25, 4, 0x4f9d3a, 0.8); ctx.grass.position.z = -6; scene.add(ctx.grass);
  if (fenceOn) { const fence = new THREE.Group(); for (let x = -22; x <= 22; x += 2) { const b = W.box(0.08, 1.4, 0.08, 0x9aa3ad); b.position.set(x, 0.7, 7.5); fence.add(b); } const wire = W.box(44, 0.03, 0.03, 0x9aa3ad); wire.position.set(0, 1.2, 7.5); fence.add(wire); scene.add(fence); }
  ctx.flock = []; let r = 5; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < flock; i++) { const s = W.sheep(); s.position.set((rnd() - 0.5) * 20, 0, 3 - rnd() * 20); s.rotation.y = rnd() * 6; scene.add(s); ctx.flock.push(s); }
  if (life) { W.birds(scene, 6, [0, 22, -30]); scene.userData.tickers.push((t) => ctx.flock.forEach((s, i) => W.graze(s, t, i))); }
}
function tagAt(ctx, scene, key, text, color, h, pos) { const t = W.tag(text, color, h); t.position.set(...pos); scene.add(t); ctx[key] = t; return t; }

export const shots = {
  // 1a Nahaufnahme: Schafe fressen unterm Modul
  eating: {
    setup(scene, ctx) { park(scene, ctx, { flock: 6 }); ctx.flock.forEach((s, i) => s.position.set(-2 + i * 0.9, 0, 3.6 + (i % 2) * 0.6)); tagAt(ctx, scene, 'tg', 'DIE FRESSEN …', 'white', 0.7, [0.8, 1.25, 5.5]); },
    update(t, d, cam, ctx) { const p = t / d; W.popIn(ctx.tg, p * 3 - 0.3); camMove(cam, [1.5, 0.8, 7.5], [0.5, 0.9, 6.5], [0, 0.6, 3.8], [0, 0.6, 3.8], p); },
  },
  // 1b Schäfer in der Hängematte – Geld fliegt rein: „… ER KASSIERT“
  hammockCash: {
    setup(scene, ctx) { park(scene, ctx, { flock: 8 }); ctx.hm = W.hammock(); ctx.hm.position.set(0, 0, 10); scene.add(ctx.hm); ctx.sh = W.shepherd(); ctx.sh.userData.staff.visible = false; ctx.sh.rotation.set(0, 0, Math.PI / 2); ctx.sh.position.set(0.95, 1.0, 10); scene.add(ctx.sh);
      ctx.bills = []; for (let i = 0; i < 14; i++) { const b = W.bill(); b.scale.setScalar(0.7); scene.add(b); ctx.bills.push(b); } tagAt(ctx, scene, 'tg', '… ER KASSIERT', 'green', 0.8, [0, 2.6, 10]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.bills.forEach((b, i) => { const k = (t * 0.5 + i / 24) % 1; b.position.set(Math.sin(i * 5) * 1.2, 3.2 - k * 2.0, 10 + Math.cos(i * 3) * 0.3); b.rotation.set(t * 3 + i, i, t); });
      W.popIn(ctx.tg, p * 3 - 0.3); camMove(cam, [1.2, 1.9, 15.5], [0.6, 1.8, 14.2], [0, 1.3, 10], [0, 1.3, 10], p); },
  },
  // 2 Luftaufnahme: riesiger Solarpark, Herde zieht durch
  parkFly: {
    setup(scene, ctx) { park(scene, ctx, { rows: 10, cols: 14, flock: 40, fenceOn: true }); ctx.sh = W.shepherd(); ctx.sh.position.set(2, 0, 6); scene.add(ctx.sh); ctx.dg = W.dog(0x222222); ctx.dg.position.set(4, 0, 5); scene.add(ctx.dg); tagAt(ctx, scene, 'tg', 'SCHAFE IM SOLARPARK', 'yellow', 0.7, [0, 5, -11]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.flock.forEach((s, i) => { s.position.x += Math.sin(i) * 0.004; }); ctx.dg.position.x = 4 + Math.sin(t * 2) * 3; ctx.dg.rotation.y = Math.cos(t * 2) > 0 ? Math.PI / 2 : -Math.PI / 2;
      W.popIn(ctx.tg, p * 3 - 0.4); camMove(cam, [-24, 20, 26], [14, 16, 22], [0, 0, -10], [0, 0, -12], p); },
  },
  // 3 Hohes Gras wirft Schatten aufs Modul – Strom-Etikett fällt
  shadow: {
    setup(scene, ctx) { park(scene, ctx, { rows: 2, cols: 4, tall: true, flock: 0 }); ctx.scene = scene; tagAt(ctx, scene, 's', 'SCHATTEN = WENIGER STROM', 'red', 0.6, [0, 2.8, 4]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.grass.scale.y = lerp(0.4, 1.3, ease(clamp01(p * 1.5))); const kwh = Math.round(lerp(100, 61, ease(clamp01(p * 1.5 - 0.3))));
      if (ctx.lk !== kwh) { if (ctx.k) { ctx.scene.remove(ctx.k); ctx.k.material.map.dispose(); } ctx.k = W.tag(`STROM ${kwh} %`, kwh > 85 ? 'green' : 'red', 0.6); ctx.k.position.set(0.3, 2.3, 4); ctx.scene.add(ctx.k); ctx.lk = kwh; }
      W.popIn(ctx.s, p * 3 - 1.4); camMove(cam, [3, 2.3, 9.5], [2, 2.0, 8], [0, 1.1, 4], [0, 1.0, 4], p); },
  },
  // 4a Rasenmäher steckt zwischen den Reihen fest
  mowerStuck: {
    setup(scene, ctx) { park(scene, ctx, { rows: 3, cols: 6, tall: true, flock: 0 }); ctx.m = W.mower(); ctx.m.position.set(0, 0, 1.75); ctx.m.rotation.y = Math.PI / 2 + 0.35; ctx.m.scale.setScalar(1.9); scene.add(ctx.m);
      ctx.dr = W.person({ shirt: 0xff8a1f, hat: 'cap', cap: 0xff8a1f }); ctx.dr.position.set(0, 1.2, 1.75); ctx.dr.rotation.y = Math.PI / 2 + 0.35; scene.add(ctx.dr); tagAt(ctx, scene, 'tg', 'STECKT FEST', 'red', 0.7, [0, 3.4, 1.75]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.m.position.x = Math.sin(t * 25) * 0.05; ctx.dr.position.x = ctx.m.position.x; pose.reset(ctx.dr); pose2.sit(ctx.dr); if (p > 0.5) pose.handsOnHead(ctx.dr, clamp01((p - 0.5) * 4));
      W.popIn(ctx.tg, p * 3 - 0.8); camMove(cam, [9, 2.6, 2.6], [7, 2.3, 2.3], [0, 1.3, 1.75], [0, 1.3, 1.75], p); },
  },
  // 4b Stein fliegt hoch – KNACK im teuren Glas
  stone: {
    setup(scene, ctx) { park(scene, ctx, { rows: 1, cols: 3, flock: 0 }); ctx.st = W.ball(0.18, 0x8d8d8d, 0); scene.add(ctx.st); tagAt(ctx, scene, 'tg', 'KNACK! TEURES GLAS', 'red', 0.7, [0, 2.6, 4]);
      ctx.crack = new THREE.Group(); for (let i = 0; i < 6; i++) { const c = W.box(0.5, 0.01, 0.02, 0xffffff); c.rotation.y = i; ctx.crack.add(c); } ctx.crack.rotation.x = 0.5; ctx.crack.position.set(0, 1.36, 4.05); scene.add(ctx.crack); },
    update(t, d, cam, ctx) { const p = t / d, k = clamp01(p / 0.45); ctx.st.position.set(lerp(-2.5, 0, k), lerp(0.1, 1.36, k) + Math.sin(k * Math.PI) * 0.8, lerp(7, 4.05, k)); ctx.st.visible = k < 1; ctx.crack.visible = k >= 1; ctx.crack.scale.setScalar(ease(clamp01((p - 0.45) * 5)));
      W.popIn(ctx.tg, p * 3 - 1.4); camMove(cam, [1.4, 2.4, 8], [0.7, 2.1, 6.6], [-0.3, 1.2, 4.6], [0, 1.3, 4.1], p); },
  },
  // 5 Betreiber öffnet das Tor – die Herde stürmt rein
  sheepArrive: {
    setup(scene, ctx) { park(scene, ctx, { rows: 3, cols: 8, flock: 0, fenceOn: true }); ctx.op = W.suitGuy(); ctx.op.position.set(-3, 0, 9); scene.add(ctx.op);
      ctx.run = []; for (let i = 0; i < 18; i++) { const s = W.sheep(); scene.add(s); ctx.run.push(s); } tagAt(ctx, scene, 'tg', 'BESCHWEREN SICH NIE', 'green', 0.6, [-3, 2.8, 6]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.op); pose2.give(ctx.op, 1);
      ctx.run.forEach((s, i) => { const k = clamp01(p * 1.3 - i * 0.03); s.position.set(lerp(-6 + (i % 6) * 0.9, -6 + (i % 6) * 2.2, k), 0, lerp(12 + Math.floor(i / 6) * 1.2, 3 - Math.floor(i / 6) * 3, k)); s.rotation.y = Math.PI; W.sheepWalk(s, t, i); });
      W.popIn(ctx.tg, p * 3 - 1.3); camMove(cam, [4, 3.5, 16], [2, 3, 13], [-3, 0.8, 6], [-3, 0.8, 4], p); },
  },
  // 6 Ein Hektar leuchtet auf – Preis pro Hektar, 8 Schafe drin
  perHa: {
    setup(scene, ctx) { park(scene, ctx, { rows: 6, cols: 12, flock: 8 }); ctx.flock.forEach((s, i) => s.position.set(-6 + (i % 4) * 4, 0, -2 - Math.floor(i / 4) * 6));
      const sq = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshBasicMaterial({ color: 0xffd400, transparent: true, opacity: 0.18 })); sq.rotation.x = -Math.PI / 2; sq.position.set(0, 0.05, -5); scene.add(sq); ctx.sq = sq;
      tagAt(ctx, scene, 'ha', '1 HEKTAR = 150–400 € / JAHR', 'yellow', 0.6, [0, 5, -5]); tagAt(ctx, scene, 'n', '≈ 8 SCHAFE', 'white', 0.6, [0, 3.8, -5]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.sq.material.opacity = 0.12 + Math.sin(t * 4) * 0.06; W.popIn(ctx.ha, p * 3 - 0.3); W.popIn(ctx.n, p * 3 - 1.2);
      camMove(cam, [0, 18, 14], [0, 20, 10], [0, 0, -5], [0, 0, -6], p); },
  },
  // 7a 100 Hektar × 400 € – Kamera steigt über den Riesen-Park
  bigMath: {
    setup(scene, ctx) { park(scene, ctx, { rows: 14, cols: 20, flock: 60 }); tagAt(ctx, scene, 'tg', '100 HEKTAR × 400 €', 'white', 0.8, [0, 10, -20]); },
    update(t, d, cam, ctx) { const p = t / d; W.popIn(ctx.tg, p * 3 - 0.3); camMove(cam, [0, 8, 20], [0, 40, 30], [0, 0, -10], [0, 0, -26], p); },
  },
  // 7b = 40.000 € fürs Grasfressen: Geldregen über Schäfer und Herde
  money: {
    setup(scene, ctx) { park(scene, ctx, { flock: 10 }); ctx.sh = W.shepherd(); ctx.sh.position.set(0, 0, 9); scene.add(ctx.sh); ctx.bills = []; for (let i = 0; i < 50; i++) { const b = W.bill(); scene.add(b); ctx.bills.push(b); }
      tagAt(ctx, scene, 'tg', '= 40.000 € / JAHR', 'green', 0.9, [0, 3.6, 9]); tagAt(ctx, scene, 'g', 'FÜRS GRASFRESSEN', 'white', 0.5, [0, 3.0, 9]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.sh); pose.armsUp(ctx.sh, 1, t); ctx.bills.forEach((b, i) => { const k = (t * 0.4 + i / 50) % 1; b.position.set(Math.sin(i * 7) * 4, 6 - k * 6, 8 + Math.cos(i * 3) * 3); b.rotation.set(t * 3 + i, i, t * 2); });
      W.popIn(ctx.tg, p * 3 - 0.2); W.popIn(ctx.g, p * 3 - 1.0); camMove(cam, [2, 1.8, 15], [0.8, 2.2, 13], [0, 1.8, 9], [0, 2, 9], p); },
  },
  // 8a Schaf = Mitarbeiter des Monats, Lohn 0 €
  employee: {
    setup(scene, ctx) { park(scene, ctx, { flock: 4 }); ctx.s = W.sheep(1.3); ctx.s.position.set(0, 0, 6); scene.add(ctx.s);
      tagAt(ctx, scene, 'm', 'MITARBEITER DES MONATS', 'yellow', 0.6, [0, 2.05, 6]); tagAt(ctx, scene, 'l', 'LOHN: 0 € · URLAUB: 0', 'red', 0.55, [0, 1.75, 6]); },
    update(t, d, cam, ctx) { const p = t / d; W.graze(ctx.s, t); ctx.s.rotation.y = Math.sin(t * 0.5) * 0.3; W.popIn(ctx.m, p * 3 - 0.2); W.popIn(ctx.l, p * 3 - 1.0);
      camMove(cam, [1.2, 1.3, 10.5], [0.6, 1.2, 9.5], [0, 1.1, 6], [0, 1.1, 6], p); },
  },
  // 8b Nebenbei: Wolle + Lämmer hüpfen
  lambs: {
    setup(scene, ctx) { park(scene, ctx, { flock: 6 }); ctx.lb = [0, 1, 2, 3].map(i => { const l = W.sheep(0.55); l.position.set(-0.9 + i * 0.6, 0, 7.6 + (i % 2) * 0.5); scene.add(l); return l; });
      ctx.mom = W.sheep(1.1); ctx.mom.position.set(-0.4, 0, 6.2); ctx.mom.rotation.y = 0.5; scene.add(ctx.mom); ctx.wool = W.ball(0.45, 0xf5f1e6, 1); ctx.wool.scale.set(1.4, 0.8, 1); ctx.wool.position.set(1.0, 0.3, 8.4); scene.add(ctx.wool); tagAt(ctx, scene, 'w', '+ WOLLE', 'white', 0.6, [0.9, 1.0, 8.4]); tagAt(ctx, scene, 'l', '+ LÄMMER', 'green', 0.6, [-0.4, 1.9, 7.4]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.lb.forEach((l, i) => { l.position.y = Math.abs(Math.sin(t * 6 + i)) * 0.4; l.rotation.y = Math.sin(t + i); }); W.popIn(ctx.w, p * 3 - 0.3); W.popIn(ctx.l, p * 3 - 1.0);
      camMove(cam, [0.3, 1.4, 12.8], [0.2, 1.3, 11.8], [0.1, 0.8, 7.4], [0.1, 0.8, 7.4], p); },
  },
  // 9 Fast die Hälfte macht's umsonst – Schäfer zuckt mit den Schultern
  forFree: {
    setup(scene, ctx) { park(scene, ctx, { flock: 10 }); ctx.sh = W.shepherd(); ctx.sh.position.set(0, 0, 8.5); scene.add(ctx.sh); tagAt(ctx, scene, 'h', 'FAST DIE HÄLFTE: UMSONST', 'red', 0.6, [0, 3.0, 8.5]); tagAt(ctx, scene, 'f', 'FUTTER IST JA SCHON DA', 'white', 0.45, [0, 2.5, 8.5]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.sh); pose.shrug(ctx.sh, clamp01(p * 2)); W.popIn(ctx.h, p * 3 - 0.2); W.popIn(ctx.f, p * 3 - 1.1);
      camMove(cam, [1.5, 1.9, 12.5], [0.8, 1.8, 11.4], [0, 1.6, 8.5], [0, 1.6, 8.5], p); },
  },
  // 10 Die Schafe merken, was sie wert sind – Köpfe drehen sich zur Kamera
  realize: {
    setup(scene, ctx) { park(scene, ctx, { flock: 0, life: false }); ctx.row = [-2.4, -1.2, 0, 1.2, 2.4].map((x, i) => { const s = W.sheep(1.1); s.position.set(x, 0, 6); s.rotation.y = Math.PI / 2 + (i % 2 ? 0.2 : -0.2); scene.add(s); return s; });
      tagAt(ctx, scene, 'tg', '40.000 €?!', 'yellow', 0.8, [0, 2.1, 6]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.row.forEach((s, i) => { s.rotation.y = lerp(Math.PI / 2 + (i % 2 ? 0.2 : -0.2), 0, ease(clamp01(p * 2 - 0.6 - i * 0.05))); });
      W.popIn(ctx.tg, p * 3 - 0.4); camMove(cam, [0, 1.3, 11], [0, 1.2, 9.5], [0, 1.0, 6], [0, 1.0, 6], p); },
  },
  // 11a Streik: Schafe mit Schildern
  strike: {
    setup(scene, ctx) { park(scene, ctx, { flock: 0, life: false }); ctx.st = ['STREIK!', 'MEHR KLEE', 'MÄÄH!', 'MEHR GRAS'].map((txt, i) => { const s = W.sheep(1.1); s.position.set(-1.2 + i * 0.8, 0, 6 + (i % 2) * 0.8); scene.add(s); const sb = W.signBoard(txt, i % 2 ? 'yellow' : 'red'); sb.userData.y0 = 0.5 + (i % 2) * 0.4; sb.position.set(s.position.x, sb.userData.y0, s.position.z + 0.3); scene.add(sb); return { s, sb }; }); },
    update(t, d, cam, ctx) { const p = t / d; ctx.st.forEach(({ s, sb }, i) => { s.position.y = Math.abs(Math.sin(t * 4 + i)) * 0.15; sb.position.y = sb.userData.y0 + Math.abs(Math.sin(t * 4 + i)) * 0.2; sb.rotation.z = Math.sin(t * 3 + i) * 0.15; });
      camMove(cam, [0, 1.7, 14], [0, 1.6, 13], [0, 1.4, 6.3], [0, 1.4, 6.3], p); },
  },
  // 11b Schäfer auf Knien mit der Nagelschere
  scissors: {
    setup(scene, ctx) { park(scene, ctx, { rows: 2, cols: 4, flock: 0, life: false }); ctx.sh = W.shepherd(); ctx.sh.userData.staff.visible = false; ctx.sh.position.set(0, -0.3, 7); scene.add(ctx.sh);
      ctx.sc = W.nailScissors(); ctx.sc.scale.setScalar(3.2); ctx.sh.userData.armR.add(ctx.sc); ctx.sc.position.set(0, -0.72, 0.1); tagAt(ctx, scene, 'tg', 'MIT DER NAGELSCHERE', 'red', 0.55, [0.6, 2.2, 7]);
      ctx.sheepBoss = W.sheep(1.2); ctx.sheepBoss.position.set(1.3, 0, 8.6); ctx.sheepBoss.rotation.y = -2.4; scene.add(ctx.sheepBoss); tagAt(ctx, scene, 'b', 'CHEF', 'yellow', 0.5, [1.3, 1.7, 8.6]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.sh); ctx.sh.userData.hip.rotation.x = 0.35; ctx.sh.userData.armR.rotation.set(-1.2 + Math.sin(t * 14) * 0.15, 0, 0); ctx.sc.rotation.y = Math.sin(t * 20) * 0.3;
      W.popIn(ctx.tg, p * 3 - 0.3); W.popIn(ctx.b, p * 3 - 1.2); camMove(cam, [1.6, 1.6, 13], [1.0, 1.4, 12], [0.6, 1.0, 7.4], [0.6, 1.0, 7.4], p); },
  },
};
export const sky = {};
