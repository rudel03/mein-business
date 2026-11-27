// 013 Hüpfburg-Vermietung – Plotwist: zu prall aufgepumpt, Burg fliegt mit Kindergeburtstag nach Mallorca, Anfahrt wird trotzdem berechnet.
import * as THREE from 'three';
import * as W from '../world.js';
const { pose, pose2, camMove, clamp01, ease, lerp } = W;

const KIDS = [0xe53935, 0x1e88e5, 0x2ecc71, 0xffd400, 0x9b59b6, 0xff8a1f];
const boss = () => W.person({ shirt: 0xff8a1f, hat: 'cap', cap: 0x1d1f24 });
function tagAt(ctx, scene, key, text, color, h, pos) { const t = W.tag(text, color, h); t.position.set(...pos); scene.add(t); ctx[key] = t; return t; }
// Garten: Rasen, Haus hinten, Hecke, Bäume, Vögel; optional Burg, Kinder, Partytisch
function garden(scene, ctx, { castle = true, kids = 0, party = false, house = true } = {}) {
  scene.add(W.ground(400, 0x63c64a));
  if (house) { const h = W.house(); h.position.set(-3, 0, -12); scene.add(h); }
  for (let x = -16; x <= 16; x += 1.6) { const b = W.bush(1.1); b.position.set(x, 0, -7.5); scene.add(b); }
  for (const [x, z] of [[-9, -5], [9, -6], [12, 2]]) { const t = W.tree(1.2); t.position.set(x, 0, z); scene.add(t); }
  W.birds(scene, 5, [0, 16, -20]);
  if (castle) { ctx.c = W.bouncyCastle(); scene.add(ctx.c); }
  ctx.kids = [];
  for (let i = 0; i < kids; i++) { const k = W.kid(KIDS[i % 6]); k.position.set(-1.5 + (i % 3) * 1.5, 0.62, -1 + Math.floor(i / 3) * 1.6); k.rotation.y = (i % 2 ? 0.4 : -0.4); const hat = W.partyHat(KIDS[(i + 2) % 6]); hat.position.y = 0.55; k.userData.head.add(hat); scene.add(k); ctx.kids.push(k); }
  if (kids) scene.userData.tickers.push((t) => ctx.kids.forEach((k, i) => { k.position.y = 0.62 + Math.abs(Math.sin(t * 5 + i * 1.3)) * 0.9; pose.reset(k); pose.armsUp(k, 0.8, t + i); }));
  if (party) { ctx.tb = W.table(2.2); ctx.tb.position.set(5.5, 0, 1.5); scene.add(ctx.tb); ctx.ck = W.cake(); ctx.ck.position.set(5.5, 0.9, 1.5); scene.add(ctx.ck);
    [0xff3b3b, 0x3b82f6, 0xffd400, 0x2ecc71].forEach((c, i) => { const b = W.balloon(c, 1.4 + i * 0.15); b.position.set(4.6 + i * 0.6, 0.9, 1.1); scene.add(b); W.sway(scene, b, 0.08, 1.5 + i * 0.2); }); }
}

export const shots = {
  // 1a Er hält ein Glas mit Luft hoch – Preisschild 200 €
  airJar: {
    setup(scene, ctx) { garden(scene, ctx, { castle: false }); ctx.b = boss(); ctx.b.position.set(0, 0, 2); scene.add(ctx.b); ctx.j = W.airJar(); ctx.j.scale.setScalar(1.3); ctx.j.position.set(0.3, 1.45, 2.75); scene.add(ctx.j);
      tagAt(ctx, scene, 'l', 'LUFT', 'white', 0.55, [0.3, 1.0, 2.9]); tagAt(ctx, scene, 'p', '= GELD', 'green', 0.7, [0.3, 2.75, 2.2]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.b); pose2.give(ctx.b, 1); ctx.j.position.y = 1.45 + Math.sin(t * 2) * 0.03; W.popIn(ctx.l, p * 3 - 0.3); W.popIn(ctx.p, p * 3 - 1.2);
      camMove(cam, [0.8, 1.9, 6.4], [0.5, 1.9, 5.4], [0.2, 1.8, 2.4], [0.2, 1.9, 2.4], p); },
  },
  // 1b Gebläse an, Schloss bläst sich auf – „FERTIG.“
  inflate: {
    setup(scene, ctx) { garden(scene, ctx); ctx.bl = W.blower(); ctx.bl.position.set(3.6, 0, 1.4); ctx.bl.rotation.y = -Math.PI / 2; scene.add(ctx.bl); ctx.b = boss(); ctx.b.position.set(4.4, 0, 2.6); ctx.b.rotation.y = -0.6; scene.add(ctx.b);
      tagAt(ctx, scene, 'tg', 'FERTIG.', 'yellow', 0.8, [0, 4.6, 0]); },
    update(t, d, cam, ctx) { const p = t / d; W.inflate(ctx.c, ease(clamp01(p / 0.7)), t); ctx.bl.userData.fan.rotation.y = t * 30; pose.reset(ctx.b); pose.idle(ctx.b, t); W.popIn(ctx.tg, (p - 0.72) * 5);
      camMove(cam, [4, 3, 13], [2.5, 3.2, 11], [0.5, 1.5, 0], [0.5, 1.8, 0], p); },
  },
  // 2 Kindergeburtstag: Kinder hüpfen, Luftballons, Kuchen
  party: {
    setup(scene, ctx) { garden(scene, ctx, { kids: 6, party: true }); W.walkers(scene, 2, [[-10, 0, 5], [10, 0, 5]]); tagAt(ctx, scene, 'tg', 'HÜPFBURG-VERMIETUNG', 'yellow', 0.75, [0.5, 5.2, 0]); },
    update(t, d, cam, ctx) { const p = t / d; W.wobble(ctx.c, t); W.popIn(ctx.tg, p * 3 - 0.3); camMove(cam, [-5, 4.5, 14], [1, 4, 13], [0, 1.5, 0], [1, 1.6, 0], p); },
  },
  // 3 Einkauf: eingerollte Burg auf Palette, er zahlt
  buy: {
    setup(scene, ctx) { scene.add(W.ground(400, 0x8d949c)); const wh = W.warehouse(30, 10, 20); wh.position.set(0, 0, -20); scene.add(wh);
      ctx.pl = W.pallet(); ctx.pl.position.set(0, 0, 1); scene.add(ctx.pl); ctx.r = W.rolledCastle(); ctx.r.position.set(0, 0.15, 1); scene.add(ctx.r);
      ctx.b = boss(); ctx.b.position.set(1.6, 0, 2.2); ctx.b.rotation.y = -0.9; scene.add(ctx.b); ctx.s = W.suitGuy(); ctx.s.position.set(-1.6, 0, 2.2); ctx.s.rotation.y = 0.9; scene.add(ctx.s);
      ctx.bills = []; for (let i = 0; i < 8; i++) { const b = W.bill(); b.scale.setScalar(0.6); scene.add(b); ctx.bills.push(b); }
      tagAt(ctx, scene, 'tg', 'PROFI-HÜPFBURG', 'white', 0.6, [0, 2.6, 1]); tagAt(ctx, scene, 'pr', '2.000–3.000 €', 'red', 0.8, [0, 2.15, 1]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.b); pose2.give(ctx.b, 1); pose.reset(ctx.s); pose2.give(ctx.s, 1);
      ctx.bills.forEach((b, i) => { const k = (t * 0.8 + i / 8) % 1; b.position.set(lerp(1.0, -1.0, k), 1.4 + Math.sin(k * Math.PI) * 0.5, 2.4); b.rotation.set(0, t * 4 + i, 0); });
      W.popIn(ctx.tg, p * 3 - 0.2); W.popIn(ctx.pr, p * 3 - 1.0); camMove(cam, [0.5, 1.9, 7.5], [0.2, 2.0, 6.4], [0, 1.4, 1.5], [0, 1.6, 1.5], p); },
  },
  // 4a Vermieten: Familie zahlt, Preis pro Wochenende
  rentTag: {
    setup(scene, ctx) { garden(scene, ctx, { kids: 3 }); ctx.b = boss(); ctx.b.position.set(3.6, 0, 4); ctx.b.rotation.y = -1.2; scene.add(ctx.b); ctx.dad = W.person({ shirt: 0x22a06b, hat: 'hair' }); ctx.dad.position.set(2.2, 0, 4.2); ctx.dad.rotation.y = 1.2; scene.add(ctx.dad);
      tagAt(ctx, scene, 'tg', '130–240 € / WOCHENENDE', 'green', 0.6, [1.9, 3.4, 3.5]); },
    update(t, d, cam, ctx) { const p = t / d; W.wobble(ctx.c, t); pose.reset(ctx.dad); pose2.give(ctx.dad, 1); pose.reset(ctx.b); pose2.give(ctx.b, ease(clamp01(p * 2)));
      W.popIn(ctx.tg, p * 3 - 0.3); camMove(cam, [5.5, 2.4, 11], [4.2, 2.4, 10], [1.8, 1.8, 2.5], [1.8, 1.8, 2.5], p); },
  },
  // 4b Lieferung: Transporter mit Burg auf dem Dach
  delivery: {
    setup(scene, ctx) { scene.add(W.ground(400)); const road = new THREE.Mesh(new THREE.PlaneGeometry(400, 7), W.M(0x4a4f57)); road.rotation.x = -Math.PI / 2; road.position.y = 0.02; scene.add(road);
      const rh = W.rowHouses(8); rh.position.set(-30, 0, -12); scene.add(rh); for (let x = -40; x < 40; x += 8) { const t = W.tree(1); t.position.set(x, 0, 6); scene.add(t); }
      ctx.v = W.van(0xffffff); ctx.v.rotation.y = Math.PI / 2; scene.add(ctx.v); ctx.r = W.rolledCastle(); ctx.r.rotation.y = Math.PI / 2; ctx.r.position.set(0, 2.5, -0.6); ctx.v.add(ctx.r);
      tagAt(ctx, scene, 'tg', '+ 60 € LIEFERUNG & AUFBAU', 'yellow', 0.65, [0, 4.5, 0]); },
    update(t, d, cam, ctx) { const p = t / d; const x = lerp(-10, 8, p); ctx.v.position.set(x, 0, 0); ctx.tg.position.x = x + 0.5; W.popIn(ctx.tg, p * 3 - 0.3);
      camMove(cam, [x - 2, 2.4, 11], [x + 1, 2.6, 10], [x, 1.8, 0], [x + 1, 2.0, 0], p); },
  },
  // 5 Rechnung: drei Etiketten über der Burg
  math: {
    setup(scene, ctx) { garden(scene, ctx, { kids: 2 }); ctx.b = boss(); ctx.b.position.set(3.4, 0, 3.2); ctx.b.rotation.y = -0.4; scene.add(ctx.b);
      tagAt(ctx, scene, 'a', '200 € MIETE', 'white', 0.65, [0.8, 5.6, 0]); tagAt(ctx, scene, 'b2', '+ 60 € LIEFERUNG', 'white', 0.65, [0.8, 5.0, 0]); tagAt(ctx, scene, 'c2', '= 260 € / WOCHENENDE', 'green', 0.8, [0.8, 4.3, 0]); },
    update(t, d, cam, ctx) { const p = t / d; W.wobble(ctx.c, t); pose.reset(ctx.b); pose.stop(ctx.b, 1); W.popIn(ctx.a, p * 4 - 0.3); W.popIn(ctx.b2, p * 4 - 1.3); W.popIn(ctx.c2, p * 4 - 2.4);
      camMove(cam, [2, 3.6, 13], [1.2, 3.8, 12], [0.8, 3.0, 0], [0.8, 3.2, 0], p); },
  },
  // 6a Zehn Wochenenden ploppen auf – Burg bezahlt
  tenWeekends: {
    setup(scene, ctx) { garden(scene, ctx); ctx.pg = []; for (let i = 0; i < 10; i++) { const t = W.tag(`${i + 1}`, 'white', 0.5); t.position.set(-2.6 + (i % 5) * 1.3, 5.3 - Math.floor(i / 5) * 0.8, 0); scene.add(t); ctx.pg.push(t); }
      tagAt(ctx, scene, 'ok', 'BURG BEZAHLT ✓', 'green', 0.85, [0, 3.8, 0]); tagAt(ctx, scene, 'hd', '≈ 10 WOCHENENDEN', 'yellow', 0.6, [0, 6.2, 0]); },
    update(t, d, cam, ctx) { const p = t / d; W.wobble(ctx.c, t, 0.015); W.popIn(ctx.hd, p * 4); ctx.pg.forEach((g, i) => W.popIn(g, p * 14 - i - 0.5)); W.popIn(ctx.ok, (p - 0.78) * 6);
      camMove(cam, [0, 3.4, 13], [0, 3.6, 12], [0, 3.6, 0], [0, 3.8, 0], p); },
  },
  // 6b Kosten: Kanister, Eimer, Versicherungs-Zettel
  costs: {
    setup(scene, ctx) { garden(scene, ctx, { castle: false }); ctx.b = boss(); ctx.b.position.set(0, 0, 2); scene.add(ctx.b);
      const can = W.box(0.35, 0.5, 0.2, 0xd32f2f); can.position.set(-0.7, 0.25, 2.6); scene.add(can); const bk = W.cyl(0.25, 0.2, 0.4, 0x1e88e5, 12); bk.position.set(0.7, 0.2, 2.6); scene.add(bk);
      const pp = W.paper(0.5, 0.7); pp.position.set(0, 1.25, 2.45); scene.add(pp);
      tagAt(ctx, scene, 's', '− SPRIT', 'red', 0.6, [0, 3.5, 2.3]); tagAt(ctx, scene, 'v', '− VERSICHERUNG', 'red', 0.6, [0, 3.05, 2.3]); tagAt(ctx, scene, 'r', '− REINIGUNG', 'red', 0.6, [0, 2.6, 2.3]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.b); pose2.carry(ctx.b, 0.6); W.popIn(ctx.s, p * 4 - 0.3); W.popIn(ctx.v, p * 4 - 1.3); W.popIn(ctx.r, p * 4 - 2.3);
      camMove(cam, [0.4, 1.9, 7.6], [0.2, 2.0, 6.8], [0, 1.8, 2.3], [0, 1.9, 2.3], p); },
  },
  // 7 Straße: an jeder Haustür Luftballons – jedes Jahr Geburtstag
  birthdays: {
    setup(scene, ctx) { scene.add(W.ground(400)); const road = new THREE.Mesh(new THREE.PlaneGeometry(400, 7), W.M(0x4a4f57)); road.rotation.x = -Math.PI / 2; road.position.set(0, 0.02, 4); scene.add(road);
      const rh = W.rowHouses(10, 5); rh.position.set(-30, 0, -6); scene.add(rh);
      for (let i = 0; i < 10; i++) { const x = -27 + i * 6; [0xff3b3b, 0xffd400, 0x3b82f6].forEach((c, k) => { const b = W.balloon(c, 1.6 + k * 0.2); b.position.set(x + k * 0.4, 0, -0.5); scene.add(b); W.sway(scene, b, 0.08, 1.3 + k * 0.3); }); const kd = W.kid(KIDS[i % 6]); kd.position.set(x + 1.2, 0, 0); scene.add(kd); ctx['k' + i] = kd; }
      W.walkers(scene, 3, [[-30, 0, 2.5], [30, 0, 2.5]]); tagAt(ctx, scene, 'tg', 'JEDES KIND. JEDES JAHR.', 'yellow', 0.65, [0, 5, 0]); },
    update(t, d, cam, ctx) { const p = t / d; for (let i = 0; i < 10; i++) { const k = ctx['k' + i]; k.position.y = Math.abs(Math.sin(t * 4 + i)) * 0.3; }
      W.popIn(ctx.tg, p * 3 - 0.4); camMove(cam, [-10, 3.2, 12], [8, 3.2, 12], [-8, 2.0, 0], [6, 2.0, 0], p); ctx.tg.position.x = cam.position.x + 0.4; },
  },
  // 8a Kind hüpft mit Kuchen – Kuchen fliegt Papa ins Gesicht
  cakeKid: {
    setup(scene, ctx) { garden(scene, ctx, { kids: 0, party: true }); ctx.k = W.kid(0xe53935); ctx.k.position.set(0, 0.62, 1); scene.add(ctx.k);
      ctx.ck2 = W.cake(); ctx.ck2.scale.setScalar(0.7); scene.add(ctx.ck2); ctx.dad = W.person({ shirt: 0x22a06b, hat: 'hair' }); ctx.dad.position.set(2.0, 0, 4.2); ctx.dad.rotation.y = -0.5; scene.add(ctx.dad);
      tagAt(ctx, scene, 'tg', '5 STUNDEN HÜPFEN', 'white', 0.65, [0, 4.6, 1]); tagAt(ctx, scene, 'k2', 'KUCHEN: ZURÜCK', 'red', 0.6, [2.0, 2.9, 4.2]); },
    update(t, d, cam, ctx) { const p = t / d; W.wobble(ctx.c, t); ctx.k.position.y = 0.62 + Math.abs(Math.sin(t * 5)) * 1.4; pose.reset(ctx.k); pose.armsUp(ctx.k, 1, t);
      const f = clamp01((p - 0.35) / 0.3); if (f <= 0) ctx.ck2.position.set(0.3, ctx.k.position.y + 0.9, 1.1); else ctx.ck2.position.set(lerp(0.3, 2.0, f), lerp(2.2, 1.75, f) + Math.sin(f * Math.PI) * 1.2, lerp(1.1, 4.45, f)); ctx.ck2.rotation.z = f * 6;
      pose.reset(ctx.dad); if (f >= 1) { pose.handsOnHead(ctx.dad, 1); ctx.ck2.rotation.z = Math.PI; } W.popIn(ctx.tg, p * 3 - 0.2); W.popIn(ctx.k2, (p - 0.68) * 5);
      camMove(cam, [3.5, 2.6, 11], [2.6, 2.4, 10], [1, 1.8, 2.5], [1.2, 1.8, 3], p); },
  },
  // 8b Klassenzimmer: Kind erzählt – ganze Klasse will auch
  classroom: {
    setup(scene, ctx) { scene.add(W.room(10, 8, 3.2, 0xdfe8cf, 0xb98a5a)); const bd = W.box(4, 1.6, 0.08, 0x2f4f3f); bd.position.set(0, 1.8, -3.85); scene.add(bd);
      ctx.k = W.kid(0xe53935); ctx.k.position.set(0, 0, -2.6); scene.add(ctx.k); ctx.cls = [];
      for (let i = 0; i < 8; i++) { const c = W.kid(KIDS[(i + 1) % 6]); c.position.set(-2.4 + (i % 4) * 1.6, 0, 0 + Math.floor(i / 4) * 1.8); c.rotation.y = Math.PI; scene.add(c); ctx.cls.push(c); const ds = W.box(1.0, 0.5, 0.6, 0xc8a165); ds.position.set(c.position.x, 0.25, c.position.z - 0.6); scene.add(ds); }
      tagAt(ctx, scene, 'tg', 'GRATIS WERBUNG', 'green', 0.75, [0, 2.6, -2.6]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.k); pose.armsUp(ctx.k, 1, t); ctx.k.position.y = Math.abs(Math.sin(t * 6)) * 0.25;
      ctx.cls.forEach((c, i) => { pose.reset(c); if (p > 0.4 + i * 0.03) pose.holdUp(c, 1, t + i); }); W.popIn(ctx.tg, p * 3 - 0.5);
      camMove(cam, [1.0, 2.7, 4.6], [0.5, 2.6, 3.9], [0, 0.9, -2.6], [0, 0.9, -2.6], p); },
  },
  // 9 Regen: Burg wird nass und schimmelt, er rennt
  rain: {
    setup(scene, ctx) { garden(scene, ctx); W.rain(scene, 700, 30, [0, 0, 2]); ctx.spots = []; for (let i = 0; i < 14; i++) { const s = W.ball(0.18 + (i % 3) * 0.06, 0x3c6b2a, 1); s.position.set(-2.3 + (i * 0.37) % 4.6, 0.65 + (i % 4) * 0.5, 2.25); s.scale.z = 0.3; s.visible = false; scene.add(s); ctx.spots.push(s); }
      ctx.b = boss(); scene.add(ctx.b); tagAt(ctx, scene, 'n', 'NASS = SCHIMMEL', 'red', 0.75, [0, 4.6, 1]); tagAt(ctx, scene, 's2', '→ SCHULDEN', 'red', 0.6, [0, 4.0, 1]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.spots.forEach((s, i) => { s.visible = p > 0.25 + i * 0.03; }); ctx.b.position.set(lerp(6, 3.2, clamp01(p * 2)), 0, 4); ctx.b.rotation.y = -Math.PI / 2; pose.reset(ctx.b);
      if (p < 0.5) pose.walk(ctx.b, t, 1.6); else pose.handsOnHead(ctx.b, 1); W.popIn(ctx.n, p * 3 - 0.4); W.popIn(ctx.s2, p * 3 - 1.4);
      camMove(cam, [2.5, 2.6, 12], [1.6, 2.4, 11], [0.8, 1.8, 1], [0.8, 1.8, 1], p); },
  },
  // 10 Zu prall: Gebläse auf Anschlag, Burg wird riesig
  overPump: {
    setup(scene, ctx) { garden(scene, ctx, { kids: 4, party: true }); ctx.bl = W.blower(); ctx.bl.position.set(3.6, 0, 1.4); ctx.bl.rotation.y = -Math.PI / 2; scene.add(ctx.bl); ctx.b = boss(); ctx.b.position.set(4.3, 0, 2.4); ctx.b.rotation.y = -0.8; scene.add(ctx.b);
      tagAt(ctx, scene, 'tg', 'EIN BISSCHEN ZU PRALL', 'red', 0.65, [0, 6.4, 0]); },
    update(t, d, cam, ctx) { const p = t / d; const g = 1 + ease(clamp01(p)) * 0.5; ctx.c.scale.setScalar(g); W.wobble(ctx.c, t * 1.5, 0.05); ctx.bl.userData.fan.rotation.y = t * 80; ctx.bl.position.x = 3.6 + Math.sin(t * 60) * 0.02;
      ctx.kids.forEach(k => { k.position.y += (g - 1) * 0.9; }); pose.reset(ctx.b); pose.push(ctx.b); W.popIn(ctx.tg, p * 3 - 0.6);
      camMove(cam, [5, 3, 15], [3.5, 3.6, 14], [1, 2.2, 0], [1, 2.8, 0], p); },
  },
  // 11a Abflug: Burg samt Geburtstag steigt in den Himmel
  liftOff: {
    setup(scene, ctx) { garden(scene, ctx, { kids: 4, party: true }); ctx.c.scale.setScalar(1.5); ctx.grp = new THREE.Group(); scene.add(ctx.grp); [ctx.c, ...ctx.kids, ctx.tb, ctx.ck].forEach(o => ctx.grp.attach(o));
      ctx.b = boss(); ctx.b.position.set(4, 0, 5); ctx.b.rotation.y = -0.4; scene.add(ctx.b); tagAt(ctx, scene, 'tg', 'ABFLUG.', 'yellow', 0.85, [0, 9, 0]); },
    update(t, d, cam, ctx) { const p = t / d; const k = ease(clamp01((p - 0.1) / 0.9)); ctx.grp.position.y = k * 9; ctx.grp.rotation.z = Math.sin(t * 2) * 0.06 * k; ctx.tg.position.y = 9 + k * 6;
      pose.reset(ctx.b); pose.jawDrop(ctx.b, 1); pose.handsOnHead(ctx.b, clamp01(p * 3)); W.popIn(ctx.tg, p * 3 - 0.5);
      camMove(cam, [6, 1.6, 14], [5, 1.4, 13], [1, 3, 0], [0.5, 10, 0], p); },
  },
  // 11b Mallorca: Burg am Strand, er reicht die Rechnung – Anfahrt 60 €
  mallorca: {
    setup(scene, ctx) { W.beach(scene); for (const [x, z] of [[-6, -4], [6, -3], [9, 2], [-9, 1]]) { const pm = W.palm(); pm.position.set(x, 0, z); scene.add(pm); W.sway(scene, pm, 0.03, 0.8); }
      const u = W.umbrella(0xff3b3b); u.position.set(5, 0, 4); scene.add(u); ctx.c = W.bouncyCastle(1.5); ctx.c.position.set(0, 0, -2); ctx.c.rotation.z = 0.06; scene.add(ctx.c);
      ctx.kids = []; for (let i = 0; i < 4; i++) { const k = W.kid(KIDS[i]); k.position.set(-1.5 + i, 0.9, -1); scene.add(k); ctx.kids.push(k); }
      ctx.b = boss(); ctx.b.position.set(1.4, 0, 4.2); ctx.b.rotation.y = -1.6; scene.add(ctx.b); ctx.dad = W.person({ shirt: 0x22a06b, hat: 'hair' }); ctx.dad.position.set(-0.2, 0, 4.2); ctx.dad.rotation.y = 1.6; scene.add(ctx.dad);
      ctx.pp = W.paper(0.35, 0.5); ctx.pp.position.set(0.6, 1.35, 4.3); scene.add(ctx.pp);
      tagAt(ctx, scene, 'm', 'MALLORCA', 'yellow', 0.7, [0, 7, -2]); tagAt(ctx, scene, 'r', 'ANFAHRT: 60 €', 'red', 0.75, [0.6, 2.6, 4.2]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.kids.forEach((k, i) => { k.position.y = 0.9 + Math.abs(Math.sin(t * 5 + i)) * 0.8; pose.reset(k); pose.armsUp(k, 0.8, t + i); });
      pose.reset(ctx.b); pose2.give(ctx.b, 1); pose.reset(ctx.dad); pose.shrug(ctx.dad, clamp01(p * 2)); W.popIn(ctx.m, p * 3 - 0.2); W.popIn(ctx.r, p * 3 - 1.1);
      camMove(cam, [2.5, 3.5, 13], [1.4, 2.6, 10.5], [0, 3, -2], [0.5, 1.9, 4], p); },
  },
};
export const sky = { classroom: 'indoor', rain: 'day', mallorca: 'day', party: 'day', rentTag: 'day', cakeKid: 'day', math: 'day', birthdays: 'day', buy: 'day', airJar: 'day' };
