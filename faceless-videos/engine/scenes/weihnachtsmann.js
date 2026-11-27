// 011 Mietweihnachtsmann – Humor in jeder Szene. Plotwist: der echte Weihnachtsmann bewirbt sich als Praktikant.
import * as THREE from 'three';
import * as W from '../world.js';
const { C, pose, pose2, camMove, clamp01, ease, lerp } = W;

function street(scene, ctx, { houses = 5, snow = true, lamps = true } = {}) {
  scene.add(W.snowGround());
  const road = new THREE.Mesh(new THREE.PlaneGeometry(400, 8), W.M(0x5a6070)); road.rotation.x = -Math.PI / 2; road.position.set(0, 0.02, 9); road.receiveShadow = true; scene.add(road);
  ctx.houses = []; const walls = [0xf4efe6, 0xf2d7b6, 0xd9e6f2, 0xe8d0d0, 0xdfe8cf];
  for (let i = 0; i < houses; i++) { const h = W.xmasHouse(walls[i % 5]); h.position.set((i - (houses - 1) / 2) * 12, 0, -3); scene.add(h); ctx.houses.push(h); }
  for (let i = 0; i < 8; i++) { const t = W.xmasTree(1.3); t.position.set(-40 + i * 11 + 5, 0, 5.8); scene.add(t); }
  if (lamps) for (const x of [-18, -6, 6, 18]) { const l = new THREE.Group(); l.add(W.cyl(0.07, 0.07, 4, 0x333333, 6)); l.children[0].position.y = 2; const b = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffe2a8 })); b.position.y = 4.1; l.add(b); const pl = new THREE.PointLight(0xffc878, 6, 10); pl.position.y = 3.8; l.add(pl); l.position.set(x, 0, 5); scene.add(l); }
  if (snow) W.snowfall(scene, 500, 40, [0, 0, 4]);
}
function room(scene, ctx) { W.sofaRoom(scene); W.snowfall(scene, 60, 8, [0, 0, -5]); }
function tagAt(ctx, scene, key, text, color, h, pos) { const t = W.tag(text, color, h); t.position.set(...pos); scene.add(t); ctx[key] = t; return t; }
function swap(ctx, scene, key, text, color, h, pos) { if (ctx[key + 'T'] === text) return; if (ctx[key]) { scene.remove(ctx[key]); ctx[key].material.map.dispose(); } ctx[key] = W.tag(text, color, h); ctx[key].position.set(...pos); scene.add(ctx[key]); ctx[key + 'T'] = text; }

export const shots = {
  // 1a Weihnachtsmann zählt unter der Laterne Geld, Scheine wirbeln
  countCash: {
    setup(scene, ctx) { street(scene, ctx); ctx.s = W.santa(); ctx.s.position.set(-6, 0, 5.6); scene.add(ctx.s); ctx.bills = []; for (let i = 0; i < 30; i++) { const b = W.bill(); scene.add(b); ctx.bills.push(b); }
      tagAt(ctx, scene, 'tg', 'BIS ZU 800 € AN 1 ABEND', 'green', 0.9, [-6, 3.0, 5.6]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.s); pose.armsUp(ctx.s, 0.7, t); ctx.bills.forEach((b, i) => { const k = (t * 0.5 + i / 30) % 1; b.position.set(-6 + Math.sin(i * 5) * 1.6, 3.4 - k * 3.4, 5.6 + Math.cos(i * 3) * 1.2); b.rotation.set(t * 4 + i, i, t * 2); });
      W.popIn(ctx.tg, p * 4); camMove(cam, [-2, 1.2, 11], [-4, 1.8, 9.5], [-6, 2.0, 5.6], [-6, 1.8, 5.6], p); },
  },
  // 1b Bart kommt aus dem Paket geflogen und klatscht ins Gesicht
  beardBox: {
    setup(scene, ctx) { W.sofaRoom(scene); ctx.st = W.student(); ctx.st.position.set(0, 0, 0.5); scene.add(ctx.st); ctx.pk = W.cardbox(0.8); ctx.pk.position.set(0.6, 0.35, 1.3); scene.add(ctx.pk);
      ctx.bd = W.box(0.42, 0.42, 0.14, 0xffffff); scene.add(ctx.bd); tagAt(ctx, scene, 'tg', 'BART AUS DEM INTERNET', 'white', 0.55, [0, 2.6, 0.6]); },
    update(t, d, cam, ctx) { const p = t / d, k = ease(clamp01((p - 0.2) / 0.4)); ctx.bd.position.set(lerp(0.6, 0, k), lerp(0.8, 1.93, k) + Math.sin(k * Math.PI) * 0.8, lerp(1.3, 0.76, k)); ctx.bd.rotation.set(0, 0, (1 - k) * 6);
      pose.reset(ctx.st); if (p > 0.6) pose.jawDrop(ctx.st, 1); W.popIn(ctx.tg, p * 3 - 0.6); camMove(cam, [1.5, 1.9, 3.6], [1.0, 1.9, 3.0], [0.2, 1.6, 0.6], [0.1, 1.8, 0.6], p); },
  },
  // 2 Studentenbude: Kostüm anziehen vor dem Spiegel, Bart fällt runter (Gag)
  mirror: {
    setup(scene, ctx) { scene.add(W.ground(200, 0x9a9a9a)); scene.add(W.room(8, 7, 3.0, 0xcfd8dc, 0x6d6d6d)); ctx.mr = W.mirror(); ctx.mr.position.set(0, 0, -2.6); scene.add(ctx.mr);
      for (let i = 0; i < 5; i++) { const pz = W.box(0.5, 0.06, 0.5, 0xd7a35c); pz.position.set(-2.5 + (i % 2) * 0.2, 0.05 + i * 0.07, -1.5); scene.add(pz); } // Pizzakartons
      ctx.s = W.santa(); ctx.s.position.set(0, 0, -0.6); ctx.s.rotation.y = Math.PI; scene.add(ctx.s); tagAt(ctx, scene, 'tg', 'MIETWEIHNACHTSMANN', 'red', 0.7, [0, 2.75, -1.4]); tagAt(ctx, scene, 't2', 'KNALLHARTES GESCHÄFT', 'dark', 0.5, [0, 2.3, -1.4]); },
    update(t, d, cam, ctx) { const p = t / d; const fall = clamp01((p - 0.55) * 4); const bd = ctx.s.userData.beard; bd.position.y = -fall * 1.5; bd.rotation.z = fall * 1.2;
      pose.reset(ctx.s); if (p > 0.6) pose.handsOnHead(ctx.s, clamp01((p - 0.6) * 4)); W.popIn(ctx.tg, p * 3 - 0.2); W.popIn(ctx.t2, p * 3 - 1.0);
      camMove(cam, [0.8, 1.8, 2.6], [0.5, 1.75, 2.1], [0, 1.5, -1], [0, 1.5, -1], p); },
  },
  // 3a Klingeln an der geschmückten Haustür, Preis-Etikett
  doorbell: {
    setup(scene, ctx) { street(scene, ctx, { houses: 3 }); ctx.s = W.santa(); ctx.s.position.set(-1.5, 0, 1.6); ctx.s.rotation.y = Math.PI; scene.add(ctx.s); ctx.sack = W.netBag(0); ctx.sack.children[0].material = W.M(0x8d6e63); ctx.sack.scale.setScalar(1.4); scene.add(ctx.sack);
      tagAt(ctx, scene, 'tg', '80–110 € PRO BESUCH', 'yellow', 0.7, [-1.5, 3.2, 1.6]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.s); ctx.s.userData.armR.rotation.set(-1.6, 0, 0.2 + Math.sin(t * 12) * 0.05 * (p > 0.3 ? 1 : 0)); ctx.sack.position.set(-1.0, 1.4, 1.2);
      W.popIn(ctx.tg, p * 3 - 0.5); camMove(cam, [2.5, 1.8, 7], [1.0, 1.7, 5.8], [-1.5, 1.6, 1.2], [-1.5, 1.6, 1.2], p); },
  },
  // 3b Wohnzimmer: Kinder hüpfen, Countdown 15 Min, Weihnachtsmann sprintet raus
  livingroom: {
    setup(scene, ctx) { room(scene, ctx); ctx.s = W.santa(); scene.add(ctx.s); ctx.kids = [0xffd400, 0x2ecc71].map((c, i) => { const k = W.kid(c); k.position.set(-0.8 + i * 1.4, 0, 0.8); k.rotation.y = Math.PI; scene.add(k); return k; }); ctx.scene = scene; },
    update(t, d, cam, ctx) { const p = t / d; ctx.kids.forEach((k, i) => { pose.reset(k); pose.armsUp(k, 1, t + i); k.position.y = Math.abs(Math.sin(t * 7 + i)) * 0.3; });
      const out = clamp01((p - 0.7) / 0.3); ctx.s.position.set(lerp(0.3, 4.5, out), 0, -0.6); ctx.s.rotation.y = out > 0 ? Math.PI / 2 : 0; pose.reset(ctx.s); if (out > 0) pose.walk(ctx.s, t, 2); else pose.armsUp(ctx.s, 0.8, t);
      const mins = Math.max(0, 15 - Math.floor(p * 16)); swap(ctx, ctx.scene, 'tm', `⏱ 00:${String(mins).padStart(2, '0')}`, 'red', 0.6, [0.3, 2.9, -0.6]);
      camMove(cam, [0.5, 1.7, 5], [0.3, 1.8, 4.2], [0.3, 1.2, -0.5], [0.6, 1.3, -0.5], p); },
  },
  // 4 Stoppuhr rast, Geldstapel wächst neben dem „HO HO HO“
  stopwatch: {
    setup(scene, ctx) { street(scene, ctx, { houses: 2 }); ctx.s = W.santa(); ctx.s.position.set(0, 0, 4.5); scene.add(ctx.s); ctx.clk = W.clock(); ctx.clk.position.set(-1.8, 2.8, 4.5); scene.add(ctx.clk); ctx.tw = W.coinTower(60); ctx.tw.position.set(1.6, 0, 4.5); scene.add(ctx.tw);
      tagAt(ctx, scene, 'tg', '= 360 € PRO STUNDE', 'green', 0.8, [0, 4.0, 4.5]); tagAt(ctx, scene, 'ho', 'HO HO HO', 'white', 0.55, [0, 2.6, 4.6]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.clk.userData.mh.rotation.z = -t * 12; ctx.tw.count = Math.round(60 * ease(clamp01(p * 1.2))); pose.reset(ctx.s); pose.armsUp(ctx.s, Math.abs(Math.sin(t * 3)), t);
      W.popIn(ctx.ho, (t * 1.5) % 1 < 0.6 ? 1 : 0); W.popIn(ctx.tg, p * 2.5 - 0.8); camMove(cam, [0, 2.2, 11], [0, 2.6, 9.5], [0, 2, 4.5], [0, 2.3, 4.5], p); },
  },
  // 5a Eltern schleichen nachts Geschenke vor die Tür
  sneakGifts: {
    setup(scene, ctx) { street(scene, ctx, { houses: 3 }); ctx.dad = W.person({ shirt: 0x37474f, hat: 'hair', hair: 0x5d4037 }); scene.add(ctx.dad); ctx.gs = [0, 1, 2].map(i => { const g = W.present([0xe53935, 0x1e88e5, 0x43a047][i], 0xffd400, 0.45); scene.add(g); return g; });
      tagAt(ctx, scene, 'tg', 'PSSST… DIE ELTERN', 'dark', 0.55, [0, 2.6, 2.2]); },
    update(t, d, cam, ctx) { const p = t / d; const x = lerp(-3, 0.2, ease(clamp01(p * 1.3))); ctx.dad.position.set(x, 0, 1.6); ctx.dad.rotation.y = Math.PI / 2; pose.reset(ctx.dad); pose.walk(ctx.dad, t, 0.35); ctx.dad.userData.hip.rotation.x = 0.35;
      ctx.gs.forEach((g, i) => { const placed = p > 0.6 + i * 0.1; g.position.set(placed ? -0.6 + i * 0.55 : x + 0.5, placed ? 0 : 1.0 + i * 0.4, placed ? 1.0 : 1.6); });
      W.popIn(ctx.tg, p * 3 - 0.4); camMove(cam, [3, 1.4, 6.5], [2, 1.3, 5.6], [0, 1, 1.4], [0, 0.9, 1.4], p); },
  },
  // 5b Statt Nordpol: Ausgang eines Wohnblocks, Etikett „WOHNUNG 3B“
  apartment: {
    setup(scene, ctx) { scene.add(W.snowGround()); W.snowfall(scene, 400, 30, [0, 0, 4]); const blk = W.tower(6, 0xbfc5cc); blk.position.set(0, 0, -3); scene.add(blk);
      ctx.s = W.santa(); scene.add(ctx.s); tagAt(ctx, scene, 'np', 'NORDPOL ✗', 'red', 0.6, [-1.4, 3.6, 1]); tagAt(ctx, scene, 'tg', 'WOHNUNG 3B ✓', 'green', 0.6, [1.4, 3.0, 1]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.s.position.set(0, 0, lerp(-0.2, 2.5, ease(clamp01(p * 1.3)))); pose.reset(ctx.s); pose.walk(ctx.s, t, 0.9);
      W.popIn(ctx.np, p * 3 - 0.3); W.popIn(ctx.tg, p * 3 - 1.1); camMove(cam, [0, 1.6, 9], [0, 1.9, 7.5], [0, 2.2, 0], [0, 2.0, 1], p); },
  },
  // 6 Route: 8 Häuser, Weihnachtsmann auf E-Roller, Haken poppen auf
  route: {
    setup(scene, ctx) { street(scene, ctx, { houses: 8, lamps: false }); ctx.sc = W.eScooter(); scene.add(ctx.sc); ctx.s = W.santa(); scene.add(ctx.s);
      ctx.checks = ctx.houses.map(h => { const c = W.tag('✓', 'green', 0.6); c.position.set(h.position.x, 5.5, 0); scene.add(c); return c; });
      ctx.r = W.tag('RENTIERE ✗   E-ROLLER ✓', 'yellow', 0.6); scene.add(ctx.r); },
    update(t, d, cam, ctx) { const p = t / d, x = lerp(-48, 46, p); ctx.sc.position.set(x, 0, 8); ctx.sc.rotation.y = Math.PI / 2; ctx.s.position.set(x, 0.24, 8); ctx.s.rotation.y = Math.PI / 2; pose.reset(ctx.s); ctx.s.userData.armL.rotation.x = ctx.s.userData.armR.rotation.x = -1.2;
      ctx.checks.forEach((c, i) => W.popIn(c, (x - ctx.houses[i].position.x) * 0.5)); ctx.r.position.set(x, 3.2, 8); W.popIn(ctx.r, p * 3 - 0.4);
      camMove(cam, [x - 6, 5, 18], [x - 4, 4.5, 16], [x, 1, 6], [x + 2, 1, 6], p); },
  },
  // 7a Hund frisst den Mantel
  dogBite: {
    setup(scene, ctx) { room(scene, ctx); ctx.s = W.santa(); ctx.s.position.set(0, 0, 0); scene.add(ctx.s); ctx.dg = W.dog(); scene.add(ctx.dg); tagAt(ctx, scene, 'tg', 'RISIKO 1: HUND', 'red', 0.6, [0, 2.9, 0]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.dg.position.set(0.9 + Math.sin(t * 14) * 0.05, 0, 0.6); ctx.dg.rotation.y = -2.2 + Math.sin(t * 10) * 0.2; ctx.dg.userData.tail.rotation.y = Math.sin(t * 20) * 0.6;
      pose.reset(ctx.s); pose.handsOnHead(ctx.s, 1); ctx.s.rotation.z = Math.sin(t * 14) * 0.05; W.popIn(ctx.tg, p * 3 - 0.3); camMove(cam, [2.4, 1.5, 4], [1.8, 1.4, 3.4], [0.4, 1.0, 0.2], [0.4, 1.0, 0.2], p); },
  },
  // 7b Kind reißt den Bart ab
  beardPull: {
    setup(scene, ctx) { room(scene, ctx); ctx.s = W.santa(); ctx.s.position.set(0, 0, 0); scene.add(ctx.s); ctx.k = W.kid(0xff8a1f); ctx.k.position.set(0.7, 0.25, 0.7); ctx.k.rotation.y = -2.4; scene.add(ctx.k); tagAt(ctx, scene, 'tg', 'RISIKO 2: KINDER', 'red', 0.6, [0, 2.9, 0]); },
    update(t, d, cam, ctx) { const p = t / d, k = clamp01((p - 0.4) * 3); const bd = ctx.s.userData.beard; bd.position.set(k * 0.9, -k * 0.4, k * 0.5); bd.rotation.z = -k * 2;
      pose.reset(ctx.k); ctx.k.userData.armR.rotation.set(-2.2, 0, 0); pose.reset(ctx.s); if (k > 0.5) pose.jawDrop(ctx.s, 1); W.popIn(ctx.tg, p * 3 - 0.3);
      camMove(cam, [-0.9, 1.9, 3.0], [-0.6, 1.85, 2.5], [0.2, 1.7, 0.2], [0.2, 1.7, 0.2], p); },
  },
  // 7c Onkel Jürgen mit Glühwein will ein Selfie – Blitz!
  uncle: {
    setup(scene, ctx) { room(scene, ctx); ctx.s = W.santa(); ctx.s.position.set(0.5, 0, 0); scene.add(ctx.s); ctx.u = W.person({ shirt: 0x2e7d32, hat: 'hair', hair: 0x9e9e9e }); ctx.u.position.set(-0.5, 0, 0.1); ctx.u.rotation.y = 0.3; scene.add(ctx.u);
      ctx.mg = W.mug(); ctx.u.userData.armL.add(ctx.mg); ctx.mg.position.set(0, -0.75, 0.1); ctx.ph = W.phone(); ctx.ph.scale.setScalar(0.3); scene.add(ctx.ph);
      ctx.flash = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffffff })); scene.add(ctx.flash);
      tagAt(ctx, scene, 'tg', 'ONKEL JÜRGEN · 3 GLÜHWEIN', 'yellow', 0.55, [-0.5, 2.85, 0.1]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.u); ctx.u.userData.armR.rotation.set(-2.3, 0, 0.4); ctx.u.userData.armL.rotation.set(-1.0, 0, 0); ctx.u.rotation.z = Math.sin(t * 2) * 0.08; ctx.u.userData.head.rotation.z = 0.3;
      ctx.ph.position.set(-0.2, 2.4, 1.0); ctx.ph.rotation.set(0.3, Math.PI, 0); pose.reset(ctx.s); pose.shrug(ctx.s, 1);
      const f = p > 0.65 && p < 0.72; ctx.flash.visible = f; ctx.flash.position.set(-0.2, 2.45, 1.1); W.popIn(ctx.tg, p * 3 - 0.3);
      camMove(cam, [0, 1.8, 4.2], [0, 1.85, 3.6], [0, 1.6, 0], [0, 1.7, 0], p); },
  },
  // 8 Agentur: „Wir suchen Weihnachtsmänner“ – null Ausbildung
  agency: {
    setup(scene, ctx) { scene.add(W.ground(200, 0x9a9a9a)); scene.add(W.room(9, 7, 3.2, 0xe9eef3, 0xa7b0b8)); ctx.dk = W.counterDesk(); scene.add(ctx.dk); ctx.cl = W.santa(); ctx.cl.position.set(0, 0, -1); scene.add(ctx.cl);
      ctx.st = W.student(); ctx.st.position.set(0, 0, 1.3); ctx.st.rotation.y = Math.PI; scene.add(ctx.st);
      tagAt(ctx, scene, 'p', 'WIR SUCHEN WEIHNACHTSMÄNNER!', 'red', 0.6, [0, 3.0, -1.5]); tagAt(ctx, scene, 'n', 'AUSBILDUNG: NULL', 'green', 0.5, [0, 0.6, 1.3]); tagAt(ctx, scene, 'b', 'BART · MANTEL · TIEFE STIMME', 'white', 0.45, [0, 2.45, -1.5]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.cl); pose2.give(ctx.cl, 1); pose.reset(ctx.st); if (p > 0.6) pose.armsUp(ctx.st, 1, t);
      W.popIn(ctx.p, p * 4); W.popIn(ctx.n, p * 3 - 0.8); W.popIn(ctx.b, p * 3 - 1.5); camMove(cam, [2.8, 2.2, 5.4], [2.2, 2.1, 4.6], [0, 1.6, 0], [0, 1.7, 0], p); },
  },
  // 9 Pro-Tipp: Jetzt bewerben + Bart festkleben (Kleber-Tube)
  tipGlue: {
    setup(scene, ctx) { scene.add(W.ground(200, 0x9a9a9a)); scene.add(W.room(8, 7, 3.0, 0xcfd8dc, 0x6d6d6d)); ctx.s = W.santa(); ctx.s.position.set(0, 0, 0); scene.add(ctx.s);
      ctx.tube = W.box(0.08, 0.3, 0.08, 0xffd400); ctx.s.userData.armR.add(ctx.tube); ctx.tube.position.set(0, -0.75, 0.1);
      tagAt(ctx, scene, 'c', 'JETZT BEWERBEN!', 'yellow', 0.55, [0, 3.0, 0]); tagAt(ctx, scene, 'g', 'BART FESTKLEBEN!', 'red', 0.5, [0, 2.5, 0]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.s); ctx.s.userData.armR.rotation.set(-2.6 + Math.sin(t * 10) * 0.1, 0, 0.6); W.popIn(ctx.c, p * 3 - 0.2); W.popIn(ctx.g, p * 3 - 1.2);
      camMove(cam, [0.6, 1.9, 3.2], [0.4, 1.9, 2.6], [0, 1.8, 0], [0, 1.85, 0], p); },
  },
  // 10 Mitternacht: Student zählt Geld, Klingel, Tür auf – der ECHTE Weihnachtsmann
  midnight: {
    setup(scene, ctx) { street(scene, ctx, { houses: 3 }); ctx.st = W.student(); ctx.st.position.set(0, 0, 2.6); ctx.st.rotation.y = Math.PI; scene.add(ctx.st);
      ctx.rs = W.santa({ real: true }); ctx.rs.position.set(0, 0, 4.2); scene.add(ctx.rs);
      const sleigh = W.box(2.2, 0.8, 1.2, 0xc62828); sleigh.position.set(4, 0.4, 7.5); scene.add(sleigh); for (let i = 0; i < 2; i++) { const r = W.dog(0x8d6e63); r.scale.setScalar(1.4); r.position.set(6.5 + i * 1.4, 0, 7.5); r.rotation.y = Math.PI / 2; const ant = W.box(0.05, 0.4, 0.05, 0x5d4037); ant.position.set(0, 1.25, 0.5); r.add(ant); scene.add(r); }
      tagAt(ctx, scene, 'tg', '00:00 · DING DONG', 'dark', 0.6, [0, 3.6, 4.2]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.st); pose.jawDrop(ctx.st, clamp01(p * 2 - 0.6)); pose.reset(ctx.rs); ctx.rs.rotation.y = Math.PI; pose2.give(ctx.rs, clamp01(p * 2 - 0.8));
      W.popIn(ctx.tg, p * 4); camMove(cam, [-2.4, 1.9, 1.2], [-1.8, 2.0, 1.6], [0, 2.0, 4.2], [0, 2.3, 4.2], p); },
  },
  // 11 Echter Weihnachtsmann als Praktikant bringt dem Studenten Kaffee
  intern: {
    setup(scene, ctx) { W.sofaRoom(scene); ctx.st = W.student(); ctx.st.position.set(-2, 0, -2.4); scene.add(ctx.st); ctx.rs = W.santa({ real: true }); ctx.rs.position.set(0.4, 0, -0.6); scene.add(ctx.rs);
      ctx.mg = W.mug(0xffffff); ctx.rs.userData.armR.add(ctx.mg); ctx.mg.position.set(0, -0.75, 0.1);
      tagAt(ctx, scene, 'i', 'PRAKTIKANT', 'blue', 0.6, [0.4, 3.5, -0.6]); tagAt(ctx, scene, 'm', 'MINDESTLOHN', 'red', 0.55, [0.4, 3.0, -0.6]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.st); pose2.sit(ctx.st); ctx.st.userData.armL.rotation.set(-0.3, 0, -0.6); ctx.st.userData.armR.rotation.set(-0.3, 0, 0.6); ctx.st.rotation.y = 0.4;
      pose.reset(ctx.rs); ctx.rs.rotation.y = -2.2; pose2.give(ctx.rs, 1); W.popIn(ctx.i, p * 3 - 0.2); W.popIn(ctx.m, p * 3 - 1.2);
      camMove(cam, [3.4, 2.4, 4.6], [2.8, 2.2, 3.8], [-0.8, 1.5, -1.4], [-0.8, 1.6, -1.4], p); },
  },
};
export const sky = { countCash: 'night', doorbell: 'night', stopwatch: 'night', sneakGifts: 'night', apartment: 'night', route: 'night', midnight: 'night', beardBox: 'indoor', mirror: 'indoor', livingroom: 'indoor', dogBite: 'indoor', beardPull: 'indoor', uncle: 'indoor', agency: 'indoor', tipGlue: 'indoor', intern: 'indoor' };
