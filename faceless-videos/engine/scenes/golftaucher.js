// 009 Golfball-Taucher – v3 „hochwertig“: jede Einstellung einzigartig + passend zum Gesprochenen, viel Leben im Bild.
import * as THREE from 'three';
import * as W from '../world.js';
import { tipShot } from './_common.js';
const { C, pose, pose2, camMove, clamp01, ease, lerp } = W;

// ---------- Kulissen ----------
function course(scene, ctx, { life = true, clubhouse = true } = {}) {
  scene.add(W.ground(600, 0x4fb83a));
  const fw = W.fairway(16, 90); fw.position.set(0, 0.02, 30); scene.add(fw);
  ctx.pond = W.pond(9); scene.add(ctx.pond);
  for (const [x, z, r] of [[12, -6, 3], [-13, 18, 2.6], [15, 26, 2.2]]) { const b = W.bunker(r); b.position.set(x, 0, z); scene.add(b); }
  for (const [x, z] of [[13, -12], [-18, 40]]) { const f = W.flag(); f.position.set(x, 0, z); scene.add(f); W.sway(scene, f.children[1], 0.15, 3); }
  for (const [x, z, s] of [[-20, -10, 1.6], [22, 4, 1.4], [-18, 10, 1.3], [24, 22, 1.7], [-26, 30, 1.5], [10, -40, 1.8], [-34, -24, 1.6], [30, -18, 1.5]]) { const t = W.tree(s); t.position.set(x, 0, z); scene.add(t); W.sway(scene, t, 0.03, 1.1); }
  if (clubhouse) { ctx.club = W.clubhouse(); ctx.club.position.set(-4, 0, -30); scene.add(ctx.club); }
  if (life) {
    ctx.ducks = [0, 1, 2].map(i => { const d = W.duck(i === 0 ? 0x8d6e63 : 0xffffff); scene.add(d); return d; });
    scene.userData.tickers.push((t) => ctx.ducks.forEach((d, i) => { const a = t * 0.25 + i * 0.5; d.position.set(Math.cos(a) * 5.5, 0.05, Math.sin(a) * 5.5 - 1); d.rotation.y = -a; }));
    const carts = [W.golfCart(), W.golfCart(0xf5f0e0)]; carts.forEach(c => scene.add(c));
    scene.userData.tickers.push((t) => carts.forEach((c, i) => { const k = (t * 0.06 + i * 0.5) % 1; c.position.set(lerp(-30, 30, k), 0, 22 + i * 3); c.rotation.y = Math.PI / 2; }));
    W.walkers(scene, 3, [[-25, 0, -16], [25, 0, -16]], { make: (i) => W.golfer([0xffffff, 0x2f6fde, 0xe94b3c][i]) });
    W.birds(scene, 7, [0, 22, -30]);
  }
}
function underwater(scene, ctx, n = 1100) {
  scene.add(W.ground(200, 0x5a4a32));
  ctx.balls = W.ballField(n, 9, 7, 0.1); scene.add(ctx.balls);
  const weeds = []; for (let i = 0; i < 22; i++) { const p = W.box(0.08, 1 + (i % 4) * 0.6, 0.08, 0x2f7d3a); p.position.set(Math.sin(i * 2.3) * 7, 0.7, Math.cos(i * 1.7) * 7); scene.add(p); weeds.push(p); }
  const old = [W.box(0.6, 0.4, 0.3, 0x6d5c4b), W.cyl(0.1, 0.1, 1.0, 0x777777, 6)]; old[0].position.set(3, 0.2, -2); old[1].position.set(-3, 0.1, 2); old[1].rotation.z = 1.5; old.forEach(o => scene.add(o)); // Schrott: alter Schläger, Kiste
  ctx.bub = []; for (let i = 0; i < 40; i++) { const b = W.ball(0.05, 0xbfefff, 0, { transparent: true, opacity: 0.6, emissive: 0x9fe6ff, emissiveIntensity: 0.6 }); b.castShadow = false; scene.add(b); ctx.bub.push(b); }
  const fishes = [0xff8a1f, 0xffd400, 0x9fd3ff, 0xff5c8a].map(c => { const f = W.fish(c); scene.add(f); return f; });
  const rays = []; for (let i = 0; i < 6; i++) { const r = W.box(0.6, 14, 0.02, 0xbff3ff, { transparent: true, opacity: 0.08, emissive: 0xbff3ff, emissiveIntensity: 0.6 }); r.castShadow = false; r.position.set(-6 + i * 2.5, 6, -4); r.rotation.z = 0.25; scene.add(r); rays.push(r); }
  scene.userData.tickers.push((t) => {
    ctx.bub.forEach((b, i) => { const k = (t * 0.35 + i / 40) % 1; b.position.set(Math.sin(i * 3.1) * 5, k * 7, Math.cos(i * 2.2) * 5); });
    fishes.forEach((f, i) => { const a = t * (0.3 + i * 0.07) + i * 1.6; f.position.set(Math.cos(a) * (4 + i), 1.2 + i * 0.5, Math.sin(a) * (3 + i) - 1); f.rotation.y = -a; });
    weeds.forEach((w, i) => { w.rotation.z = Math.sin(t * 1.5 + i) * 0.15; });
    rays.forEach((r, i) => { r.material.opacity = 0.06 + Math.sin(t * 0.8 + i) * 0.03; });
  });
}
function swapTag(ctx, key, scene, text, color, h, pos) { // Zähler-Etikett nur neu bauen, wenn sich der Text ändert
  if (ctx[key + 'T'] === text) return; if (ctx[key]) { scene.remove(ctx[key]); ctx[key].material.map.dispose(); }
  ctx[key] = W.tag(text, color, h); ctx[key].position.set(...pos); scene.add(ctx[key]); ctx[key + 'T'] = text;
}

export const shots = {
  // 1a Taucher springt am Teichrand rein
  jump: {
    setup(scene, ctx) { course(scene, ctx); ctx.d = W.diver(); scene.add(ctx.d); ctx.sp = W.ball(0.8, 0xdff6ff, 1, { transparent: true, opacity: 0.8, emissive: 0xffffff, emissiveIntensity: 0.4 }); scene.add(ctx.sp); },
    update(t, d, cam, ctx) {
      const p = t / d, k = clamp01((p - 0.25) / 0.45);
      ctx.d.position.set(lerp(8.5, 6, k), p < 0.25 ? 0.6 : 0.6 + Math.sin(k * Math.PI) * 2.2 - k * 2.6, 3); ctx.d.rotation.set(0, -1.2, -k * 1.4);
      pose.reset(ctx.d); if (p < 0.25) pose.armsUp(ctx.d, p * 4, t); else ctx.d.userData.armL.rotation.z = ctx.d.userData.armR.rotation.z = 0;
      const s = clamp01((p - 0.68) * 4); ctx.sp.visible = s > 0 && s < 1; ctx.sp.position.set(6, 0.2, 3); ctx.sp.scale.set(1 + s * 2, s * 3, 1 + s * 2);
      camMove(cam, [14, 2.2, 10], [12.5, 2.6, 8.5], [7, 1.2, 3], [6, 0.8, 3], p);
    },
  },
  // 1b Taucher taucht mit prall vollem Netz auf, Geld-Etikett
  emerge: {
    setup(scene, ctx) { course(scene, ctx); ctx.d = W.diver(); scene.add(ctx.d); ctx.bag = W.netBag(90); ctx.bag.scale.setScalar(1.4); scene.add(ctx.bag); ctx.tg = W.tag('VOLLES NETZ = GELD', 'green', 0.6); scene.add(ctx.tg); },
    update(t, d, cam, ctx) {
      const p = t / d, up = ease(clamp01(p * 1.6));
      ctx.d.position.set(4, lerp(-2.2, -0.6, up), 3); ctx.d.rotation.y = 0.6; pose.reset(ctx.d); ctx.d.userData.armR.rotation.set(-2.9 * up, 0, 0);
      ctx.bag.position.set(4.2, lerp(-1, 2.6, up), 3.3); ctx.tg.position.set(4.2, 4.0, 3.3); W.popIn(ctx.tg, p * 2 - 0.9);
      camMove(cam, [8, 1.0, 9], [7, 1.6, 8], [4, 0.8, 3], [4, 1.8, 3], p);
    },
  },
  // 2 Flug über den Platz: Fairway, Bunker, Teiche, Clubhaus, Carts
  flyover: {
    setup(scene, ctx) { course(scene, ctx); ctx.bf = W.ballField(400, 8.3, 5, -0.04); ctx.pond.add(ctx.bf); ctx.d = W.diver(); ctx.d.position.set(2, 0.1, 6); scene.add(ctx.d); ctx.tg = W.tag('GOLFBALL-TAUCHER', 'yellow', 1.2); scene.add(ctx.tg); },
    update(t, d, cam, ctx) { const p = t / d; ctx.tg.position.set(2, 3.6, 6); W.popIn(ctx.tg, p * 3 - 0.3); pose.reset(ctx.d); ctx.d.userData.armR.rotation.set(-2.6, 0, 0.2);
      camMove(cam, [-26, 26, 34], [12, 16, 24], [0, 0, -4], [0, 1, 2], p); },
  },
  // 3 Abschlag-Reihe: 3 Golfer schlagen nacheinander ins Wasser, Platscher
  teeLine: {
    setup(scene, ctx) { course(scene, ctx, { life: false }); W.birds(scene, 5, [0, 16, -10]);
      ctx.gs = [-3, 0, 3].map((x, i) => { const g = W.golfer([0x2f6fde, 0xffffff, 0xe94b3c][i]); g.position.set(x, 0, 15); g.rotation.y = Math.PI; scene.add(g); return g; });
      ctx.bs = ctx.gs.map(() => { const b = W.golfBall(); scene.add(b); return b; });
      ctx.sp = ctx.gs.map(() => { const s = W.ball(0.5, 0xdff6ff, 1, { transparent: true, opacity: 0.8, emissive: 0xffffff, emissiveIntensity: 0.4 }); scene.add(s); return s; }); },
    update(t, d, cam, ctx) {
      const p = t / d;
      ctx.gs.forEach((g, i) => { const lp = clamp01((p - i * 0.18) / 0.35); pose.reset(g); if (lp < 1) W.swing(g, lp); else if (i === 1) pose.shrug(g, clamp01((p - 0.75) * 4));
        const k = clamp01((p - i * 0.18 - 0.12) / 0.4), tx = (i - 1) * 2.5, tz = 1 - i;
        ctx.bs[i].position.set(lerp(g.position.x, tx, k), 0.3 + Math.sin(k * Math.PI) * 7, lerp(14.4, tz, k)); ctx.bs[i].visible = k < 1;
        const s = clamp01((k - 0.99) * 100) * clamp01((p - i * 0.18 - 0.52) * 4); ctx.sp[i].visible = k >= 1 && s < 1; ctx.sp[i].position.set(tx, 0.2, tz); ctx.sp[i].scale.set(1 + s * 2, 0.2 + s * 2.4, 1 + s * 2); });
      camMove(cam, [6, 3, 22], [4, 3.6, 20], [0, 1.2, 10], [0, 0.8, 4], p);
    },
  },
  // 4a Pro-Shop: neuer Ball 4 €
  proShop: {
    setup(scene, ctx) { scene.add(W.ground(200, 0xcfc6b8)); scene.add(W.room(10, 8, 3.4, 0xf3ece0, 0x9b7a55));
      ctx.sh = W.shelfShop(4, 6); ctx.sh.position.set(0, 0, -3.2); scene.add(ctx.sh);
      ctx.b = W.golfBall(); ctx.b.scale.setScalar(2.4); scene.add(ctx.b); ctx.tg = W.tag('NEU: ≈ 4 € / BALL', 'yellow', 0.7); scene.add(ctx.tg);
      ctx.cust = W.golfer(0x9b59b6); ctx.cust.position.set(-1.6, 0, -1.6); scene.add(ctx.cust); },
    update(t, d, cam, ctx) { const p = t / d; ctx.b.position.set(0.3, 1.6 + Math.sin(t * 2) * 0.06, -0.8); ctx.b.rotation.y = t; ctx.tg.position.set(0.3, 2.4, -0.8); W.popIn(ctx.tg, p * 3 - 0.3); pose.reset(ctx.cust); pose.jawDrop(ctx.cust, clamp01(p * 2));
      camMove(cam, [2.2, 2.0, 3.6], [1.4, 1.9, 3.0], [0.2, 1.5, -1.2], [0.3, 1.6, -1.2], p); },
  },
  // 4b Unter Wasser: tausende Bälle im Schlamm
  mud: {
    setup(scene, ctx) { underwater(scene, ctx, 1600); ctx.tg = W.tag('TAUSENDE IM SCHLAMM', 'white', 0.5); scene.add(ctx.tg); },
    update(t, d, cam, ctx) { const p = t / d; ctx.tg.position.set(0, 2.2, 0); W.popIn(ctx.tg, p * 3 - 0.4); camMove(cam, [0, 1.0, 5], [0, 5, 7.5], [0, 0.3, 0], [0, 0, -2], p); },
  },
  // 5a Taucher kippt Netze in eine Kiste, Zähler zählt hoch
  haul: {
    setup(scene, ctx) { course(scene, ctx, { clubhouse: false }); ctx.crate = new THREE.Group(); ctx.crate.add(W.box(2.2, 1.0, 1.6, 0x8a5a33)); ctx.crate.children[0].position.y = 0.5; ctx.crate.position.set(11, 0, 6); scene.add(ctx.crate);
      ctx.fill = W.ballField(500, 0.9, 3, 0); ctx.fill.position.set(11, 0.9, 6); ctx.fill.scale.set(1.1, 1, 0.75); scene.add(ctx.fill);
      ctx.d = W.diver(); scene.add(ctx.d); ctx.bag = W.netBag(); scene.add(ctx.bag); ctx.scene = scene; },
    update(t, d, cam, ctx) {
      const p = t / d; const cyc = (t * 0.7) % 1; ctx.d.position.set(lerp(8, 9.8, Math.sin(cyc * Math.PI)), 0, 6.2); ctx.d.rotation.y = Math.PI / 2; pose.reset(ctx.d); pose2.carry(ctx.d);
      ctx.bag.position.set(ctx.d.position.x + 0.7, 1.3 + Math.max(0, cyc - 0.5) * 1.2, 6.2);
      ctx.fill.count = Math.round(500 * clamp01(p)); const n = Math.round(clamp01(p * 1.1) * 20) * 100;
      swapTag(ctx, 'cnt', ctx.scene, `${n.toLocaleString('de-DE')} BÄLLE`, 'yellow', 0.7, [11, 2.6, 6]);
      camMove(cam, [15, 3.4, 13], [14, 3, 11.5], [10.5, 1, 6], [10.8, 1.2, 6], p);
    },
  },
  // 5b Kiste verwandelt sich in Geld: 600 €
  counter: {
    setup(scene, ctx) { course(scene, ctx, { clubhouse: false }); ctx.crate = W.box(2.2, 1.0, 1.6, 0x8a5a33); ctx.crate.position.set(0, 0.5, 8); scene.add(ctx.crate); ctx.bills = []; for (let i = 0; i < 40; i++) { const b = W.bill(); scene.add(b); ctx.bills.push(b); } ctx.tg = W.tag('= 600 € AN 1 TAG', 'green', 0.9); scene.add(ctx.tg); ctx.d = W.diver(); ctx.d.position.set(-1.8, 0, 8.6); scene.add(ctx.d); },
    update(t, d, cam, ctx) { const p = t / d; ctx.bills.forEach((b, i) => { const k = clamp01(p * 1.8 - i * 0.02); b.visible = k > 0; b.position.set(Math.sin(i * 2.4) * k * 2.5, 1 + k * 3 + Math.sin(t * 3 + i) * 0.2, 8 + Math.cos(i * 1.3) * k * 1.5); b.rotation.set(t * 3 + i, i, t); });
      ctx.tg.position.set(0, 4.8, 8); W.popIn(ctx.tg, p * 2.5 - 0.8); pose.reset(ctx.d); pose.armsUp(ctx.d, clamp01(p * 2 - 0.6), t);
      camMove(cam, [0, 3.2, 17], [0, 4.0, 15], [0, 2.4, 8], [0, 3.2, 8], p); },
  },
  // 6 Clubhaus-Terrasse: Clubmanager hält die Hand auf, Taucher zahlt
  terrace: {
    setup(scene, ctx) { course(scene, ctx); ctx.m = W.suitGuy(); ctx.m.position.set(-4, 0.3, -23.2); scene.add(ctx.m); ctx.d = W.diver(); ctx.d.position.set(-4, 0, -20.8); ctx.d.rotation.y = Math.PI; scene.add(ctx.d);
      ctx.bills = []; for (let i = 0; i < 8; i++) { const b = W.bill(); scene.add(b); ctx.bills.push(b); } ctx.t1 = W.tag('8–10 CENT PRO BALL', 'red', 0.55); ctx.t2 = W.tag('− 200 € AN DEN CLUB', 'red', 0.6); scene.add(ctx.t1, ctx.t2); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.m); pose2.give(ctx.m, 1); pose.reset(ctx.d); pose2.give(ctx.d, clamp01(p * 3 - 0.6));
      ctx.bills.forEach((b, i) => { const k = ease(clamp01(p * 2 - 0.5 - i * 0.06)); b.visible = k > 0; b.position.set(-4, 1.3 + i * 0.03, lerp(-21.4, -22.6, k)); });
      ctx.t1.position.set(-4, 2.9, -23); W.popIn(ctx.t1, p * 3 - 0.3); ctx.t2.position.set(-4, 2.2, -23); W.popIn(ctx.t2, p * 3 - 1.7);
      camMove(cam, [1.5, 2.4, -16.5], [0.6, 2.2, -18], [-4, 1.6, -22], [-4, 1.8, -22], p); },
  },
  // 7 Parkplatz: Taucher-Transporter, drei Kosten fressen Geld weg, 400 € bleiben
  van: {
    setup(scene, ctx) { scene.add(W.ground(300, 0x4fb83a)); const lot = W.parkingLot(30, 14); lot.position.set(0, 0, 0); scene.add(lot); ctx.club = W.clubhouse(); ctx.club.position.set(0, 0, -18); scene.add(ctx.club); W.birds(scene, 5, [0, 14, -20]);
      ctx.v = W.van(0x2f6fde); ctx.v.position.set(0, 0, 2); ctx.v.rotation.y = Math.PI / 2; scene.add(ctx.v);
      ctx.items = [W.diver(), W.washer(), W.cardbox(0.9)]; ctx.items[0].scale.setScalar(0.7); ctx.items.forEach(o => scene.add(o));
      ctx.tags = [W.tag('− AUSRÜSTUNG', 'red', 0.5), W.tag('− WASCHEN', 'red', 0.5), W.tag('− VERSAND', 'red', 0.5), W.tag('≈ 400 € ÜBRIG', 'green', 0.8)]; ctx.tags.forEach(x => scene.add(x)); },
    update(t, d, cam, ctx) { const p = t / d;
      ctx.items.forEach((o, i) => { const x = -3 + i * 3; o.position.set(x, 0, 5.5); o.scale.setScalar((i === 0 ? 0.7 : 0.8) * ease(clamp01(p * 3 - i * 0.5))); ctx.tags[i].position.set(x, 2.6, 5.5); W.popIn(ctx.tags[i], p * 3 - i * 0.5 - 0.3); });
      ctx.tags[3].position.set(0, 4.2, 2); W.popIn(ctx.tags[3], p * 2.5 - 1.8);
      camMove(cam, [0, 4, 15], [0, 3.6, 13], [0, 1.8, 3], [0, 2.4, 3], p); },
  },
  // 8 Club freut sich: Manager feiert auf der Terrasse, Konfetti
  managerParty: {
    setup(scene, ctx) { course(scene, ctx); ctx.m = W.suitGuy(); ctx.m.position.set(-4, 0.3, -23); scene.add(ctx.m); ctx.m2 = W.golfer(0xffffff); ctx.m2.position.set(-1.5, 0.3, -23.4); scene.add(ctx.m2);
      ctx.conf = []; for (let i = 0; i < 50; i++) { const c = W.box(0.14, 0.02, 0.09, [0xffd400, C.red, 0x2ecc71, 0x3b82f6][i % 4]); c.castShadow = false; scene.add(c); ctx.conf.push(c); } ctx.tg = W.tag('GELD FÜR TEICH-MÜLL', 'green', 0.6); scene.add(ctx.tg); },
    update(t, d, cam, ctx) { const p = t / d; for (const g of [ctx.m, ctx.m2]) { pose.reset(g); pose.armsUp(g, 1, t); g.userData.hip.position.y = 0.95 + Math.abs(Math.sin(t * 7)) * 0.15; }
      ctx.conf.forEach((c, i) => { const k = (t * 0.35 + i / 50) % 1; c.position.set(-3 + Math.sin(i * 7) * 5, 6 - k * 6, -22 + Math.cos(i * 3) * 2); c.rotation.set(t * 5 + i, i, t * 3); });
      ctx.tg.position.set(-3, 3.4, -22.5); W.popIn(ctx.tg, p * 3 - 0.5);
      camMove(cam, [3, 3, -13], [1, 2.6, -15.5], [-3, 2, -23], [-3, 2, -23], p); },
  },
  // 9a Waschmaschine voller Golfbälle
  washer: {
    setup(scene, ctx) { scene.add(W.ground(200, 0xcfd3d8)); scene.add(W.room(10, 8, 3.2, 0xe6f2e6, 0xa7b0b8)); ctx.w = W.washer(); ctx.w.scale.setScalar(1.3); scene.add(ctx.w); ctx.foam = []; for (let i = 0; i < 12; i++) { const f = W.ball(0.12, 0xffffff, 1, { transparent: true, opacity: 0.8 }); scene.add(f); ctx.foam.push(f); } },
    update(t, d, cam, ctx) { const p = t / d; ctx.w.userData.drum.rotation.z = t * 6; ctx.w.position.x = Math.sin(t * 30) * 0.02;
      ctx.foam.forEach((f, i) => { const k = (t * 0.5 + i / 12) % 1; f.position.set(Math.sin(i * 2) * 0.8, 1.0 + k * 1.4, 1.0); f.scale.setScalar(1 - k * 0.5); });
      camMove(cam, [2.6, 1.9, 5.2], [1.8, 1.7, 4.4], [0, 1.1, 0.5], [0, 1.1, 0.5], p); },
  },
  // 9b Qualitätsstufen wie Diamanten: B · A · AA · AAAA
  grades: {
    setup(scene, ctx) { scene.add(W.ground(200, 0xcfd3d8)); scene.add(W.room(10, 8, 3.2, 0xe6f2e6, 0xa7b0b8)); ctx.tb = W.sortTable(); scene.add(ctx.tb);
      ctx.fly = []; for (let i = 0; i < 28; i++) { const b = W.golfBall(); scene.add(b); ctx.fly.push(b); }
      ctx.tags = ['B', 'A', 'AA', 'AAAA'].map((s, i) => { const x = W.tag(s, ['white', 'blue', 'green', 'yellow'][i], 0.45); scene.add(x); return x; });
      ctx.dia = W.ball(0.25, 0x9fe6ff, 0, { emissive: 0x9fe6ff, emissiveIntensity: 1.2 }); scene.add(ctx.dia); ctx.price = W.tag('BIS 2,50 € / BALL', 'green', 0.45); scene.add(ctx.price); },
    update(t, d, cam, ctx) { const p = t / d; const bins = ctx.tb.userData.bins;
      ctx.fly.forEach((b, i) => { const k = (t * 0.8 + i / 28) % 1, bin = bins[i % 4]; b.position.set(lerp(0, bin.position.x, k), 1.3 + Math.sin(k * Math.PI) * 1.1, lerp(1.6, 0, k)); });
      ctx.tags.forEach((x, i) => { x.position.set(bins[i].position.x, 1.75, 0); W.popIn(x, p * 4 - i * 0.4); });
      ctx.dia.position.set(1.6, 2.2 + Math.sin(t * 3) * 0.08, 0); ctx.dia.rotation.y = t * 2; ctx.dia.visible = p > 0.4; ctx.price.position.set(1.4, 2.65, 0); W.popIn(ctx.price, p * 3 - 1.6);
      camMove(cam, [0, 3.0, 6.2], [0.4, 2.6, 5.4], [0, 1.2, 0], [0.2, 1.3, 0], p); },
  },
  // 10 Förderband: goldene Markenbälle hoch in die Premium-Box, Rest fällt in den Großsack
  belt: {
    setup(scene, ctx) { scene.add(W.ground(200, 0xcfd3d8)); scene.add(W.room(12, 9, 3.4, 0xe6f2e6, 0xa7b0b8)); ctx.cv = W.conveyor(7); scene.add(ctx.cv);
      ctx.balls = []; for (let i = 0; i < 18; i++) { const gold = i % 5 === 2; const b = gold ? W.ball(0.13, C.gold, 1, { emissive: 0x9a6b00, emissiveIntensity: 0.9 }) : W.golfBall(); scene.add(b); ctx.balls.push({ b, gold }); }
      ctx.box = W.box(1.0, 0.6, 0.8, 0x111111); ctx.box.position.set(3.2, 1.6, -1.3); scene.add(ctx.box); ctx.sack = W.netBag(140); ctx.sack.scale.setScalar(1.8); ctx.sack.position.set(4.6, 0.8, 0.4); scene.add(ctx.sack);
      ctx.t1 = W.tag('PREMIUM = TEURER', 'yellow', 0.45); ctx.t2 = W.tag('GROSSPACK', 'white', 0.45); scene.add(ctx.t1, ctx.t2); },
    update(t, d, cam, ctx) { const p = t / d;
      ctx.balls.forEach(({ b, gold }, i) => { const k = (t * 0.22 + i / 18) % 1, x = lerp(-3.5, 3.5, k);
        if (k < 0.85) b.position.set(x, 1.2, 0); else { const q = (k - 0.85) / 0.15; b.position.set(lerp(3.0, gold ? 3.2 : 4.6, q), gold ? 1.2 + q * 0.8 : 1.2 - q * 0.4, lerp(0, gold ? -1.3 : 0.4, q)); } });
      ctx.t1.position.set(3.2, 2.4, -1.3); W.popIn(ctx.t1, p * 3 - 0.5); ctx.t2.position.set(4.6, 2.2, 0.4); W.popIn(ctx.t2, p * 3 - 1.5);
      camMove(cam, [-1, 2.6, 5.5], [1.5, 2.4, 4.8], [1.5, 1.2, 0], [3, 1.4, -0.3], p); },
  },
  // 11a Pro-Tipp: Held kauft billige Lakeballs
  buyLake: {
    setup(scene, ctx) { scene.add(W.ground(200, 0xcfc6b8)); scene.add(W.room(10, 8, 3.4, 0xf3ece0, 0x9b7a55)); const sh = W.shelfShop(3, 6); sh.position.set(0, 0, -3.2); scene.add(sh);
      ctx.hero = W.person(); ctx.hero.position.set(0, 0, 0.6); scene.add(ctx.hero); ctx.bag = W.netBag(60); scene.add(ctx.bag);
      ctx.t1 = W.tag('LAKEBALLS', 'green', 0.5); ctx.t2 = W.tag('BRUCHTEIL VOM NEUPREIS', 'white', 0.4); scene.add(ctx.t1, ctx.t2); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.hero); pose2.give(ctx.hero, 1); ctx.bag.position.set(0.5, 1.15, 1.25);
      ctx.t1.position.set(0.6, 2.35, 0.9); W.popIn(ctx.t1, p * 3 - 0.3); ctx.t2.position.set(0.6, 2.85, 0.9); W.popIn(ctx.t2, p * 3 - 1.2);
      camMove(cam, [1.4, 1.9, 4], [0.9, 2.0, 3.3], [0.2, 1.7, 0.6], [0.3, 1.9, 0.6], p); },
  },
  // 11b Held will selbst reinspringen – Greenkeeper stoppt ihn
  stopJump: {
    setup(scene, ctx) { course(scene, ctx); ctx.hero = W.person(); ctx.hero.position.set(7.5, 0, 6); ctx.hero.rotation.y = -2.2; scene.add(ctx.hero);
      ctx.gk = W.person({ shirt: 0x2e7d32, pants: 0x3e4a2e, cap: 0x2e7d32 }); ctx.gk.position.set(9.6, 0, 4.4); ctx.gk.rotation.y = -0.9; scene.add(ctx.gk); ctx.tg = W.tag('NUR MIT ERLAUBNIS VOM CLUB', 'red', 0.5); scene.add(ctx.tg); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.hero); pose.armsUp(ctx.hero, clamp01(p * 3), t); pose.reset(ctx.gk); pose.stop(ctx.gk, clamp01(p * 3 - 0.8));
      ctx.tg.position.set(8.6, 3.0, 5.2); W.popIn(ctx.tg, p * 3 - 1.0);
      camMove(cam, [13.5, 2.4, 11], [12.5, 2.2, 9.5], [8.4, 1.4, 5], [8.5, 1.5, 5], p); },
  },
  // 12 Plotwist 1: Taucher zieht am Netz – ein Golfer kommt mit
  pull: {
    setup(scene, ctx) { underwater(scene, ctx, 700); ctx.d = W.diver(); ctx.d.position.set(-1, 0, 1); scene.add(ctx.d); ctx.og = W.oldGolfer(); scene.add(ctx.og); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.d); ctx.d.userData.armR.rotation.set(-1.4, 0, -0.4); ctx.d.userData.armL.rotation.set(-1.4, 0, 0.4); ctx.d.position.x = -1 - Math.sin(t * 6) * 0.05;
      ctx.og.position.set(lerp(3.5, 0.6, ease(p)), 0, 1); ctx.og.rotation.y = -Math.PI / 2; pose.reset(ctx.og); ctx.og.userData.hip.rotation.z = 0.2 * (1 - p);
      camMove(cam, [0, 1.6, 6], [0.3, 1.8, 5], [0.5, 1.2, 1], [0.2, 1.4, 1], p); },
  },
  // 13a Seit 2009: Bart-Golfer sucht mit Lupe im Schlamm, Jahreszahl-Etikett
  since2009: {
    setup(scene, ctx) { underwater(scene, ctx, 900); ctx.og = W.oldGolfer(); ctx.og.position.set(0, 0, 1); scene.add(ctx.og); ctx.cal = W.tag('SEIT 2009 HIER UNTEN', 'yellow', 0.5); scene.add(ctx.cal);
      ctx.lens = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.04, 6, 14), W.M(0x333333)); ctx.og.userData.armR.add(ctx.lens); ctx.lens.position.set(0, -0.8, 0.2); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.og); ctx.og.userData.hip.rotation.x = 0.5; ctx.og.userData.armR.rotation.set(-0.9, 0, 0); ctx.og.userData.head.rotation.y = Math.sin(t * 2) * 0.6;
      ctx.cal.position.set(0, 2.9, 1); W.popIn(ctx.cal, p * 3 - 0.2); camMove(cam, [2.2, 1.6, 4.4], [1.4, 1.8, 3.6], [0, 1.2, 1], [0, 1.6, 1], p); },
  },
  // 13b Rückverkauf: Ball gegen 2,50 € + 0,10 € Ablöse
  handback: {
    setup(scene, ctx) { underwater(scene, ctx, 600); ctx.d = W.diver(); ctx.d.position.set(-0.8, 0, 1); ctx.d.rotation.y = Math.PI / 2; scene.add(ctx.d); ctx.og = W.oldGolfer(); ctx.og.position.set(0.8, 0, 1); ctx.og.rotation.y = -Math.PI / 2; scene.add(ctx.og);
      ctx.b = W.golfBall(); ctx.b.scale.setScalar(1.6); scene.add(ctx.b); ctx.coins = []; for (let i = 0; i < 3; i++) { const c = W.coin(); scene.add(c); ctx.coins.push(c); }
      ctx.tg = W.tag('2,50 € + 0,10 € ABLÖSE', 'red', 0.45); scene.add(ctx.tg); },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.d); pose.reset(ctx.og); pose2.give(ctx.d, 1); pose2.give(ctx.og, clamp01(p * 2));
      const k = ease(clamp01(p * 2 - 0.3)); ctx.b.position.set(lerp(-0.2, 0.3, k), 1.35, 1);
      ctx.coins.forEach((c, i) => { const q = ease(clamp01(p * 2 - 0.8 - i * 0.1)); c.visible = q > 0; c.position.set(lerp(0.3, -0.3, q), 1.35 + i * 0.1, 1.05); c.rotation.x = Math.PI / 2; });
      ctx.tg.position.set(0, 2.5, 1); W.popIn(ctx.tg, p * 2.5 - 1.2);
      camMove(cam, [2.4, 2.0, 4.6], [1.9, 1.95, 3.8], [0, 1.5, 1], [0.3, 1.6, 1], p); },
  },
  tip: tipShot(),
};
export const sky = { mud: 'underwater', pull: 'underwater', since2009: 'underwater', handback: 'underwater', proShop: 'indoor', buyLake: 'indoor', washer: 'indoor', grades: 'indoor', belt: 'indoor' };
