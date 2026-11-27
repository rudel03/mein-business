// 014 Mülltonnen-Reinigung – Plotwist: Tonne so sauber, dass die Müllabfuhr sie für Deko hält; sie landet im Museum, Eintritt 12 €, er kriegt nichts.
import * as THREE from 'three';
import * as W from '../world.js';
const { pose, pose2, camMove, clamp01, ease, lerp } = W;

const cleaner = () => W.person({ shirt: 0xffd400, pants: 0x1e3a5f, hat: 'cap', cap: 0x1e88e5 });
const COLS = [W.BIN.bio, W.BIN.rest, W.BIN.papier, W.BIN.gelb];
function tagAt(ctx, scene, key, text, color, h, pos) { const t = W.tag(text, color, h); t.position.set(...pos); scene.add(t); ctx[key] = t; return t; }
function orbit(cam, c, r, h, a0, a1, p, ly = 1) { const a = lerp(a0, a1, ease(p)); cam.position.set(c[0] + Math.sin(a) * r, h, c[2] + Math.cos(a) * r); cam.lookAt(c[0], ly, c[2]); }
// Wohnstraße: Fahrbahn, Gehweg, Häuserzeile, Bäume, Passanten, Vögel; Tonnen am Straßenrand
function street(scene, ctx, { bins = 8, dirty = true, walkers = true } = {}) {
  scene.add(W.ground(400, 0x63c64a));
  const road = new THREE.Mesh(new THREE.PlaneGeometry(400, 7), W.M(0x4a4f57)); road.rotation.x = -Math.PI / 2; road.position.set(0, 0.02, 6); road.receiveShadow = true; scene.add(road);
  const walk = new THREE.Mesh(new THREE.PlaneGeometry(400, 2.4), W.M(0xc9c6bd)); walk.rotation.x = -Math.PI / 2; walk.position.set(0, 0.03, 1.4); walk.receiveShadow = true; scene.add(walk);
  for (let x = -40; x <= 40; x += 4) { const l = W.box(1.6, 0.03, 0.1, 0xf4f1e8); l.position.set(x, 0.04, 6); scene.add(l); }
  const rh = W.rowHouses(12, 4); rh.position.set(-36, 0, -6); scene.add(rh);
  for (let x = -30; x <= 30; x += 9) { const t = W.tree(1.1); t.position.set(x + 2, 0, 14); scene.add(t); }
  ctx.bins = []; for (let i = 0; i < bins; i++) { const b = W.bin(COLS[i % 4], { dirty: dirty && i % 2 === 0 }); b.position.set(-((bins - 1) * 1.6) / 2 + i * 1.6, 0, 2.4); scene.add(b); ctx.bins.push(b); }
  if (walkers) W.walkers(scene, 3, [[-30, 0, 0.6], [30, 0, 0.6]]); W.birds(scene, 5, [0, 16, -18]);
}

export const shots = {
  // 1a Er spritzt eine Tonne ab – Wasserstrahl, Gischt, Kamera kreist
  washHook: {
    setup(scene, ctx) { street(scene, ctx, { bins: 0 }); ctx.b = W.bin(W.BIN.bio); ctx.b.position.set(0, 0, 2.4); ctx.b.userData.lid.rotation.x = -1.9; scene.add(ctx.b);
      ctx.g = cleaner(); ctx.g.position.set(1.3, 0, 2.6); ctx.g.rotation.y = -1.7; scene.add(ctx.g); W.waterJet(scene, [0.85, 1.3, 2.6], [0.15, 0.8, 2.45], 90); W.splash(scene, [0.1, 0.7, 2.5]);
      tagAt(ctx, scene, 'tg', 'MÜLLTONNEN WASCHEN', 'white', 0.7, [0.4, 2.3, 2.6]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.g); pose2.give(ctx.g, 1); W.popIn(ctx.tg, p * 3 - 0.2); orbit(cam, [0.5, 0, 2.5], 5.4, 1.8, -0.5, 0.35, p, 1.2); },
  },
  // 1b Kundin zahlt an der Haustür, Kalender blättert – jeden Monat
  payMonthly: {
    setup(scene, ctx) { street(scene, ctx, { bins: 0 }); ctx.g = cleaner(); ctx.g.position.set(0.6, 0, 1.2); ctx.g.rotation.y = Math.PI / 2; scene.add(ctx.g);
      ctx.c = W.person({ shirt: 0xd94f8a, hat: 'hair', hair: 0xd8b26a }); ctx.c.position.set(-0.6, 0, 1.2); ctx.c.rotation.y = -Math.PI / 2; scene.add(ctx.c);
      ctx.bl = W.bill(); ctx.bl.scale.setScalar(0.6); scene.add(ctx.bl); ctx.cal = []; ['JAN', 'FEB', 'MÄR', 'APR', 'MAI'].forEach((m, i) => { const t = W.tag(m, 'white', 0.5); t.position.set(0, 2.6, 1.2); t.visible = false; scene.add(t); ctx.cal.push(t); });
      tagAt(ctx, scene, 'tg', 'JEDEN MONAT', 'green', 0.7, [0, 3.1, 1.2]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.c); pose2.give(ctx.c, 1); pose.reset(ctx.g); pose2.give(ctx.g, 1); ctx.bl.position.set(Math.sin(t * 4) * 0.1, 1.35, 1.2); ctx.bl.rotation.y = t * 2;
      const k = Math.min(4, Math.floor(p * 6)); ctx.cal.forEach((c, i) => { c.visible = i === k; }); W.popIn(ctx.tg, p * 3 - 0.2); camMove(cam, [1.2, 1.7, 5.2], [0.4, 1.8, 4.2], [0, 1.6, 1.2], [0, 1.8, 1.2], p); },
  },
  // 2 Deckel auf: Fliegenschwarm schießt raus, Kerl erschrickt
  eklig: {
    setup(scene, ctx) { street(scene, ctx, { bins: 0 }); ctx.b = W.bin(W.BIN.bio, { dirty: true }); ctx.b.position.set(0, 0, 2.4); scene.add(ctx.b); ctx.fl = W.flies(scene, [0, 1.5, 2.5], 26, 0.8); W.stink(scene, [0, 1.2, 2.6], 4);
      ctx.g = cleaner(); ctx.g.position.set(0.9, 0, 3.3); ctx.g.rotation.y = -2.6; scene.add(ctx.g); tagAt(ctx, scene, 'ta', 'EKLIG', 'red', 0.8, [-0.2, 2.5, 2.4]); tagAt(ctx, scene, 'tb', 'ABER GEILES GESCHÄFT', 'green', 0.6, [0, 2.0, 2.4]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.b.userData.lid.rotation.x = -ease(clamp01(p * 3)) * 1.9; pose.reset(ctx.g); pose.jawDrop(ctx.g, 1); pose.handsOnHead(ctx.g, clamp01(p * 3 - 0.3));
      W.popIn(ctx.ta, p * 3 - 0.4); W.popIn(ctx.tb, p * 3 - 1.6); camMove(cam, [0.3, 1.0, 5.6], [0.1, 1.6, 4.4], [0, 1.0, 2.4], [0.1, 1.6, 2.4], p); },
  },
  // 3 Sommer: Hitze, Maden kriechen, Fliegen – Makro tief am Boden
  summer: {
    setup(scene, ctx) { street(scene, ctx, { bins: 3, walkers: false }); const b = ctx.bins[1]; b.userData.lid.rotation.x = -0.25; W.maggots(scene, [b.position.x, 0.03, 3.1], 30, 0.6); W.flies(scene, [b.position.x, 1.3, 2.4], 16, 0.7); W.stink(scene, [b.position.x, 1.15, 2.4], 3);
      tagAt(ctx, scene, 'tg', 'SOMMER = MADEN', 'red', 0.75, [0, 1.75, 2.9]); tagAt(ctx, scene, 'th', '34 °C', 'yellow', 0.55, [0, 2.2, 2.9]); },
    update(t, d, cam, ctx) { const p = t / d; W.popIn(ctx.tg, p * 3 - 0.3); W.popIn(ctx.th, p * 3 - 0.9); camMove(cam, [1.0, 0.5, 6.0], [0.4, 0.8, 5.3], [0, 0.4, 2.8], [0, 0.9, 2.6], p); },
  },
  // 4a Nachbar putzt selbst: Eimer, Schwamm, Dreckwasser spritzt ihm ins Gesicht
  diy: {
    setup(scene, ctx) { street(scene, ctx, { bins: 0, walkers: false }); ctx.b = W.bin(W.BIN.rest, { dirty: true }); ctx.b.rotation.z = -1.35; ctx.b.position.set(-0.3, 0.38, 2.2); scene.add(ctx.b);
      ctx.n = W.person({ shirt: 0xffffff, pants: 0x3b5b8a, hat: 'hair', hair: 0x8a8a8a }); ctx.n.position.set(0.9, 0, 2.4); ctx.n.rotation.y = -1.4; scene.add(ctx.n);
      const bk = W.cyl(0.2, 0.16, 0.32, 0xe53935, 10); bk.position.set(0.9, 0.16, 3.0); scene.add(bk); ctx.sp = W.splash(scene, [0.6, 1.4, 2.4], 30); ctx.sp.visible = false;
      tagAt(ctx, scene, 'tg', 'SELBER PUTZEN? VIEL SPASS.', 'white', 0.6, [0.3, 2.6, 2.3]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.n); pose.push(ctx.n); ctx.n.userData.armR.rotation.x = -1.2 + Math.sin(t * 12) * 0.3; ctx.sp.visible = p > 0.5; if (p > 0.55) pose.handsOnHead(ctx.n, 1);
      W.popIn(ctx.tg, p * 3 - 0.2); camMove(cam, [2.4, 1.4, 6], [1.6, 1.5, 5], [0.3, 1.0, 2.3], [0.4, 1.2, 2.3], p); },
  },
  // 4b Dreckwasser in den Gully – Ordnungsamt mit Strafzettel
  gully: {
    setup(scene, ctx) { street(scene, ctx, { bins: 2, walkers: false }); const gy = W.gully(); gy.position.set(0, 0.02, 3.2); scene.add(gy);
      const water = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.6), new THREE.MeshBasicMaterial({ color: 0x5b4a2a, transparent: true, opacity: 0.85 })); water.rotation.x = -Math.PI / 2; water.position.set(-0.6, 0.05, 3.0); scene.add(water); ctx.w = water;
      ctx.n = W.person({ shirt: 0xffffff, pants: 0x3b5b8a, hat: 'hair', hair: 0x8a8a8a }); ctx.n.position.set(-1.6, 0, 2.6); ctx.n.rotation.y = 0.8; scene.add(ctx.n);
      ctx.o = W.person({ shirt: 0x1f3a93, pants: 0x1f2a44, hat: 'cap', cap: 0x1f3a93 }); scene.add(ctx.o); ctx.tk = W.paper(0.3, 0.45); scene.add(ctx.tk);
      tagAt(ctx, scene, 'tg', 'BUSSGELD', 'red', 0.85, [-0.6, 2.7, 2.8]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.w.scale.x = 0.3 + clamp01(p * 2) * 0.7; ctx.w.position.x = -1.2 + ctx.w.scale.x * 0.6; const k = ease(clamp01((p - 0.3) / 0.4)); ctx.o.position.set(lerp(3, 0.2, k), 0, 2.4); ctx.o.rotation.y = -Math.PI / 2;
      pose.reset(ctx.o); if (k < 1) pose.walk(ctx.o, t); else pose2.give(ctx.o, 1); ctx.tk.position.set(ctx.o.position.x - 0.45, 1.35, 2.45); pose.reset(ctx.n); if (p > 0.7) pose.handsOnHead(ctx.n, 1);
      W.popIn(ctx.tg, (p - 0.65) * 5); camMove(cam, [-0.4, 1.1, 7.5], [-0.6, 1.7, 6.2], [-0.6, 0.6, 3], [-0.6, 1.5, 2.6], p); },
  },
  // 5 Reinigungsanhänger: Tonne wird hochgehoben, kopfüber, Heißwasser – kommt glänzend raus
  trailer: {
    setup(scene, ctx) { street(scene, ctx, { bins: 0 }); ctx.tr = W.cleanTrailer(); ctx.tr.position.set(0, 0, 4.0); ctx.tr.rotation.y = Math.PI; ctx.tr.userData.lift.visible = false; scene.add(ctx.tr);
      ctx.b = W.bin(W.BIN.bio, { dirty: true }); scene.add(ctx.b); ctx.jet = W.waterJet(scene, [0, 2.0, 2.35], [0, 0.6, 2.35], 80); ctx.jet.visible = false; ctx.steam = W.stink(scene, [0, 1.6, 2.3], 4, 0xffffff);
      ctx.g = cleaner(); ctx.g.position.set(-1.4, 0, 2.6); ctx.g.rotation.y = 1.6; scene.add(ctx.g); ctx.sh = W.sparkles(scene, [0, 0.9, 2.2], 10, 0.5); ctx.sh.forEach(s => s.visible = false);
      tagAt(ctx, scene, 'ta', 'HEISSES WASSER + HOCHDRUCK', 'white', 0.55, [0, 3.0, 2.4]); tagAt(ctx, scene, 'tb', 'WIE NEU', 'green', 0.8, [0, 2.75, 2.4]); },
    update(t, d, cam, ctx) { const p = t / d; const up = ease(clamp01(p / 0.25)), down = ease(clamp01((p - 0.7) / 0.2));
      const k = up - down; ctx.b.position.set(0, k * 1.6, 2.3); ctx.b.rotation.x = k * Math.PI * 0.95; ctx.jet.visible = p > 0.25 && p < 0.7;
      if (p > 0.72 && !ctx.clean) { ctx.clean = true; ctx.b.traverse(o => { if (o.isMesh && o.geometry.parameters?.depth === 0.01) o.visible = false; }); ctx.sh.forEach(s => s.visible = true); }
      pose.reset(ctx.g); pose.stop(ctx.g, 1); W.popIn(ctx.ta, p * 3 - 0.4); W.popIn(ctx.tb, (p - 0.75) * 6); orbit(cam, [0, 0, 2.6], 4.4, 2.1, 2.55, 3.45, p, 1.3); },
  },
  // 6 Abfuhrtag: Müllwagen vorne, alle Tonnen leer an der Straße, sein Wagen hinterher – Kamerafahrt
  route: {
    setup(scene, ctx) { street(scene, ctx, { bins: 14 }); ctx.tk = W.truck(0xff8a1f, 0xffffff); ctx.tk.rotation.y = -Math.PI / 2; scene.add(ctx.tk); ctx.v = W.van(0x1e88e5); ctx.v.rotation.y = -Math.PI / 2; scene.add(ctx.v);
      ctx.bins.forEach(b => b.userData.lid.rotation.x = -0.3); tagAt(ctx, scene, 'tg', 'ABFUHRTAG', 'yellow', 0.8, [0, 3.2, 2.4]); tagAt(ctx, scene, 't2', 'ALLE TONNEN LEER DRAUSSEN', 'white', 0.55, [0, 2.65, 2.4]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.tk.position.set(lerp(2, -14, p), 0, 5.2); ctx.v.position.set(lerp(12, -2, p), 0, 5.2); ctx.tg.position.x = ctx.t2.position.x = lerp(6, -4, ease(p));
      W.popIn(ctx.tg, p * 3 - 0.2); W.popIn(ctx.t2, p * 3 - 0.9); camMove(cam, [9, 2.2, 10.5], [-3, 2.6, 10.5], [6, 1.3, 2.4], [-4, 1.4, 2.4], p); },
  },
  // 7 Abo-Preis an der Tonne
  abo: {
    setup(scene, ctx) { street(scene, ctx, { bins: 5, dirty: false }); ctx.bins.forEach(b => W.shine(b)); W.sparkles(scene, [0, 0.9, 2.4], 8, 0.6);
      tagAt(ctx, scene, 'p', '4–11 € / REINIGUNG', 'green', 0.75, [0, 2.0, 2.4]); tagAt(ctx, scene, 'a', 'ABO · JEDEN MONAT', 'yellow', 0.6, [0, 2.55, 2.4]); },
    update(t, d, cam, ctx) { const p = t / d; W.popIn(ctx.p, p * 3 - 0.2); W.popIn(ctx.a, p * 3 - 1.1); camMove(cam, [-2.5, 0.8, 6], [0.8, 1.2, 5.4], [0, 0.9, 2.4], [0, 1.2, 2.4], p); },
  },
  // 8a 500 Tonnen-Raster von oben
  grid: {
    setup(scene, ctx) { scene.add(W.ground(400, 0x8d949c)); ctx.all = new THREE.Group(); for (let i = 0; i < 500; i++) { const b = W.bin(COLS[i % 4]); b.position.set((i % 25 - 12) * 1.1, 0, -Math.floor(i / 25) * 1.3); ctx.all.add(b); } scene.add(ctx.all);
      tagAt(ctx, scene, 'tg', '500 KUNDEN × 8 €', 'white', 0.85, [0, 6, -12]); },
    update(t, d, cam, ctx) { const p = t / d; W.popIn(ctx.tg, p * 3 - 0.3); camMove(cam, [0, 3, 6], [0, 26, 12], [0, 0.6, -4], [0, 0, -13], p); },
  },
  // 8b = 4.000 € im Monat: Geld regnet, er duscht dabei eine Tonne
  money: {
    setup(scene, ctx) { street(scene, ctx, { bins: 4, walkers: false }); ctx.g = cleaner(); ctx.g.position.set(0, 0, 3.4); scene.add(ctx.g); ctx.bills = []; for (let i = 0; i < 40; i++) { const b = W.bill(); b.scale.setScalar(0.7); scene.add(b); ctx.bills.push(b); }
      tagAt(ctx, scene, 'tg', '= 4.000 € / MONAT', 'green', 0.9, [0, 3.2, 3.4]); tagAt(ctx, scene, 'f', 'FÜRS TONNEN-DUSCHEN', 'white', 0.5, [0, 2.65, 3.4]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.g); pose.armsUp(ctx.g, 1, t); ctx.bills.forEach((b, i) => { const k = (t * 0.45 + i / 40) % 1; b.position.set(Math.sin(i * 7) * 2.5, 5 - k * 5, 3.4 + Math.cos(i * 3) * 1.6); b.rotation.set(t * 3 + i, i, t * 2); });
      W.popIn(ctx.tg, p * 3 - 0.2); W.popIn(ctx.f, p * 3 - 1.0); camMove(cam, [0.5, 1.4, 8.5], [0.2, 2.1, 7.4], [0, 1.8, 3.4], [0, 2.2, 3.4], p); },
  },
  // 9a Kosten: Wassertank, Kanister, Wagen
  costs: {
    setup(scene, ctx) { street(scene, ctx, { bins: 0, walkers: false }); ctx.tr = W.cleanTrailer(); ctx.tr.position.set(0, 0, 3.6); ctx.tr.rotation.y = -Math.PI / 2; scene.add(ctx.tr);
      const can = W.box(0.35, 0.5, 0.2, 0xd32f2f); can.position.set(-1.6, 0.25, 5.4); scene.add(can);
      tagAt(ctx, scene, 'a', '− WASSER', 'red', 0.6, [0, 3.9, 3.6]); tagAt(ctx, scene, 'b', '− SPRIT', 'red', 0.6, [0, 3.4, 3.6]); tagAt(ctx, scene, 'c', '− WAGEN', 'red', 0.6, [0, 2.9, 3.6]); },
    update(t, d, cam, ctx) { const p = t / d; W.popIn(ctx.a, p * 4 - 0.3); W.popIn(ctx.b, p * 4 - 1.2); W.popIn(ctx.c, p * 4 - 2.1); orbit(cam, [0, 0, 3.6], 6.5, 2.6, 0.5, -0.3, p, 2.2); },
  },
  // 9b Nachbarn gucken über die Hecke auf die saubere Tonne – „WILL AUCH“
  neighbors: {
    setup(scene, ctx) { street(scene, ctx, { bins: 0, walkers: false }); ctx.b = W.bin(W.BIN.bio); W.shine(ctx.b); ctx.b.position.set(0, 0, 2.4); scene.add(ctx.b); W.sparkles(scene, [0, 0.8, 2.4], 10, 0.5);
      for (let x = -4; x <= 4; x += 1.2) { const h = W.bush(0.9); h.position.set(x, 0, 0.4); scene.add(h); }
      ctx.nb = [-1.6, -0.4, 0.8, 2.0].map((x, i) => { const n = W.person({ shirt: [0x22a06b, 0xd94f8a, 0x9b59b6, 0xff8a1f][i], hat: 'hair', hair: [0x3a2a1e, 0xd8b26a, 0x8a8a8a, 0x111111][i] }); n.position.set(x, -0.6, -0.2); scene.add(n); return n; });
      tagAt(ctx, scene, 'tg', 'WILL AUCH!', 'yellow', 0.8, [0.2, 2.6, 0]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.nb.forEach((n, i) => { n.position.y = -0.6 + ease(clamp01(p * 3 - i * 0.3)) * 0.6; pose.reset(n); if (p > 0.6) pose.holdUp(n, 1, t + i); });
      W.popIn(ctx.tg, (p - 0.55) * 5); camMove(cam, [0.4, 0.9, 6.5], [0.3, 1.2, 5.4], [0.2, 1.2, 1.4], [0.2, 1.5, 1.2], p); },
  },
  // 10 Spiegel-Tonne: Chrom, er sieht sich darin und richtet die Kappe
  mirrorBin: {
    setup(scene, ctx) { street(scene, ctx, { bins: 0, walkers: false }); ctx.b = W.bin(W.BIN.bio); ctx.b.scale.setScalar(1.3); ctx.b.position.set(0, 0, 2.4); scene.add(ctx.b); ctx.scene = scene; W.sparkles(scene, [0, 1.0, 2.4], 14, 0.7);
      ctx.g = cleaner(); ctx.g.position.set(-1.1, 0, 3.3); ctx.g.rotation.y = 2.5; scene.add(ctx.g); tagAt(ctx, scene, 'tg', 'GLÄNZT WIE EIN SPIEGEL', 'white', 0.65, [0, 2.4, 2.4]); },
    update(t, d, cam, ctx) { const p = t / d; if (!ctx.ch && p > 0.15) { ctx.ch = true; W.chromeify(ctx.b, ctx.scene, ctx.scene.userData.renderer); }
      pose.reset(ctx.g); pose.holdUp(ctx.g, 0.6, t); W.popIn(ctx.tg, p * 3 - 0.6); orbit(cam, [0, 0, 2.4], 4.0, 1.6, 0.25, 0.95, p, 1.1); },
  },
  // 11a Müllabfuhr hält vor der glänzenden Tonne – Arbeiter zuckt, fährt weiter
  skip: {
    setup(scene, ctx) { street(scene, ctx, { bins: 0, walkers: false }); ctx.b = W.bin(W.BIN.bio); ctx.b.scale.setScalar(1.2); W.shine(ctx.b); ctx.b.position.set(0, 0, 2.4); scene.add(ctx.b); W.sparkles(scene, [0, 0.9, 2.4], 10, 0.6);
      const pot = W.bush(0.5); pot.position.set(0, 1.3, 2.4); scene.add(pot); ctx.tk = W.truck(0xff8a1f, 0xffffff); ctx.tk.rotation.y = Math.PI / 2; ctx.tk.position.set(7.5, 0, 5.4); scene.add(ctx.tk);
      ctx.w = W.worker(); ctx.w.position.set(1.2, 0, 2.6); ctx.w.rotation.y = -1.6; scene.add(ctx.w); tagAt(ctx, scene, 'tg', 'DEKO?', 'yellow', 0.85, [0.6, 2.9, 2.6]); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.w); pose.shrug(ctx.w, clamp01(p * 3)); ctx.tk.position.x = 7.5 + ease(clamp01((p - 0.5) / 0.5)) * 12;
      W.popIn(ctx.tg, p * 3 - 0.5); camMove(cam, [-1.0, 3.0, 9], [-0.6, 2.6, 8], [0.4, 1.0, 2.6], [0.4, 1.2, 2.6], p); },
  },
  // 11b Museum: Tonne auf dem Sockel, Spot, Absperrung, Besucher – Eintritt 12 €, er kriegt 0 €
  museum: {
    setup(scene, ctx) { scene.add(W.room(14, 12, 5, 0xf2efe8, 0x8a6a4a)); const pd = W.pedestal(); pd.position.set(0, 0, -2); scene.add(pd); ctx.b = W.bin(W.BIN.bio); W.shine(ctx.b); ctx.b.position.set(0, 1.08, -2); scene.add(ctx.b);
      W.spotlight(scene, new THREE.Vector3(0, 1.6, -2)); W.sparkles(scene, [0, 1.9, -2], 12, 0.6); const rb = W.ropeBarrier(3); rb.position.set(0, 0, -0.6); scene.add(rb);
      const fr = W.box(1.4, 1.0, 0.06, 0xd4af37); fr.position.set(-4, 2.6, -5.9); scene.add(fr); const fr2 = W.box(1.0, 1.4, 0.06, 0xd4af37); fr2.position.set(4, 2.6, -5.9); scene.add(fr2);
      ctx.vis = [-2.4, -1.2, 1.2, 2.4].map((x, i) => { const v = W.person({ shirt: [0x34495e, 0x8e44ad, 0x16a085, 0xc0392b][i], hat: 'hair', hair: [0x3a2a1e, 0xd8b26a, 0x8a8a8a, 0x111111][i] }); v.position.set(x, 0, 0.6 + (i % 2) * 0.5); v.rotation.y = Math.PI; scene.add(v); return v; });
      ctx.g = cleaner(); ctx.g.position.set(1.5, 0, 1.6); ctx.g.rotation.y = -2.6; scene.add(ctx.g);
      tagAt(ctx, scene, 'e', 'EINTRITT: 12 €', 'yellow', 0.75, [0, 3.6, -2]); tagAt(ctx, scene, 'z', 'ER: 0 €', 'red', 0.6, [1.5, 2.3, 1.6]); },
    update(t, d, cam, ctx) { const p = t / d; ctx.vis.forEach((v, i) => { pose.reset(v); if (i % 2) pose2.phoneUp(v, 1); }); pose.reset(ctx.g); pose.shrug(ctx.g, clamp01(p * 2 - 0.6));
      W.popIn(ctx.e, p * 3 - 0.2); W.popIn(ctx.z, p * 3 - 1.4); camMove(cam, [0.6, 2.0, 4.6], [0.3, 2.1, 3.6], [0.2, 1.6, -1.8], [0.4, 1.8, -1.4], p); },
  },
};
export const sky = { washHook: 'day', payMonthly: 'day', eklig: 'day', summer: 'day', diy: 'day', gully: 'day', trailer: 'day', route: 'day', abo: 'day', grid: 'day', money: 'sunset', costs: 'day', neighbors: 'day', mirrorBin: 'sunset', skip: 'day', museum: 'indoor' };
