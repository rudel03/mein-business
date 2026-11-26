// "Entrümpelung": Geschäftsmodell erklärt + Plotwist (du kaufst deine eigene Couch zurück).
import * as THREE from 'three';
import * as W from '../world.js';
const { C, pose, pose2, camMove, clamp01, ease, lerp } = W;

function street(scene) {
  scene.add(W.ground());
  const road = new THREE.Mesh(new THREE.PlaneGeometry(200, 9), W.M(C.asphalt)); road.rotation.x = -Math.PI / 2; road.position.set(0, 0.02, 9); road.receiveShadow = true; scene.add(road);
  const walk = new THREE.Mesh(new THREE.PlaneGeometry(200, 3), W.M(C.sidewalk)); walk.rotation.x = -Math.PI / 2; walk.position.set(0, 0.03, 3.5); scene.add(walk);
  const h = W.house(); h.position.set(0, 0, -3); scene.add(h);
  for (const x of [-14, 14]) { const o = W.house(); o.position.set(x, 0, -4); scene.add(o); }
  for (const x of [-7, 7]) { const t = W.tree(1.2); t.position.set(x, 0, 1); scene.add(t); }
}
function clutterRoom(scene, ctx, n = 1) {
  scene.add(W.ground(200, 0x9a9a9a));
  scene.add(W.room(10, 8));
  const s = W.sofa(); s.position.set(-2.2, 0, -2.6); scene.add(s); ctx.sofa = s;
  const wd = W.wardrobe(); wd.position.set(-4.3, 0, -1); wd.rotation.y = Math.PI / 2; scene.add(wd);
  const t = W.tv(); t.position.set(1.8, 0, -3.3); scene.add(t);
  const l = W.lamp(); l.position.set(-0.6, 0, -3.3); scene.add(l);
  ctx.boxes = [];
  let r = 3 * n; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < 16; i++) {
    const b = W.cardbox(0.45 + rnd() * 0.3); b.position.set(-3 + rnd() * 6.5, 0.2 + (i % 3) * 0.45, -1.5 + rnd() * 3.5); b.rotation.y = rnd(); scene.add(b); ctx.boxes.push(b);
  }
}

export const shots = {
  // HOOK: Arbeiter trägt deine Couch raus, Geldscheine regnen
  hook: {
    setup(scene, ctx) {
      street(scene);
      ctx.van = W.van(); ctx.van.position.set(5, 0, 7.5); ctx.van.rotation.y = Math.PI / 2; scene.add(ctx.van);
      ctx.w1 = W.worker(); ctx.w2 = W.worker(); scene.add(ctx.w1, ctx.w2);
      ctx.sofa = W.sofa(); scene.add(ctx.sofa);
      ctx.bills = []; for (let i = 0; i < 30; i++) { const b = W.bill(); scene.add(b); ctx.bills.push(b); }
    },
    update(t, d, cam, ctx) {
      const p = t / d, x = lerp(-2, 2.6, p);
      for (const [w, dx] of [[ctx.w1, -1.3], [ctx.w2, 1.3]]) { w.position.set(x + dx, 0, 5); w.rotation.y = Math.PI / 2; pose.reset(w); pose.walk(w, t, 0.7); pose2.carry(w); }
      ctx.sofa.position.set(x, 1.0, 5); ctx.sofa.rotation.y = Math.PI / 2 + Math.sin(t * 6) * 0.03;
      ctx.bills.forEach((b, i) => { const k = (t * 0.6 + i / 30) % 1; b.position.set(x - 3 + (i % 7), 7 - k * 7, 3.5 + (i % 4)); b.rotation.set(t * 3 + i, t * 2, i); });
      camMove(cam, [x - 4, 1.4, 11], [x - 1, 2.0, 10], [x, 1.5, 5], [x + 1, 1.6, 5], p);
    },
  },
  // Vollgestellte Wohnung, Held überfordert
  room: {
    setup(scene, ctx) { clutterRoom(scene, ctx); ctx.hero = W.person(); ctx.hero.position.set(0.6, 0, 1.6); scene.add(ctx.hero); },
    update(t, d, cam, ctx) {
      const p = t / d; pose.reset(ctx.hero); pose.handsOnHead(ctx.hero, clamp01(p * 3));
      camMove(cam, [3.5, 2.6, 6], [1.5, 1.9, 4.2], [0, 1, -1], [0.4, 1.5, 0.5], p);
    },
  },
  // Quadratmeter: Vogelperspektive, Bodenraster leuchtet Kachel für Kachel
  sqm: {
    setup(scene, ctx) {
      clutterRoom(scene, ctx, 2);
      ctx.tiles = [];
      for (let x = -4.5; x < 5; x += 1) for (let z = -3.5; z < 4; z += 1) {
        const tl = W.box(0.92, 0.02, 0.92, 0xffd400, { emissive: 0xffd400, emissiveIntensity: 0.6, transparent: true, opacity: 0.55 });
        tl.castShadow = false; tl.position.set(x, 0.03, z); tl.visible = false; scene.add(tl); ctx.tiles.push(tl);
      }
    },
    update(t, d, cam, ctx) {
      const p = t / d, n = Math.floor(ctx.tiles.length * clamp01(p * 1.4));
      ctx.tiles.forEach((tl, i) => tl.visible = i < n);
      camMove(cam, [0.2, 12, 4], [0, 11, 2.5], [0, 0, 0], [0, 0, -0.3], p);
    },
  },
  // Rechnung: Riesenzettel fällt vor den Helden
  bill: {
    setup(scene, ctx) { clutterRoom(scene, ctx, 3); ctx.hero = W.person(); ctx.hero.position.set(0, 0, 1.8); scene.add(ctx.hero); ctx.paper = W.paper(1.6, 2.2); scene.add(ctx.paper); },
    update(t, d, cam, ctx) {
      const p = t / d, k = ease(clamp01(p * 2.5));
      ctx.paper.position.set(-1.0, lerp(6, 1.7, k), 2.6); ctx.paper.rotation.set(0, 0.35 + (1 - k) * 2, (1 - k) * 0.6);
      pose.reset(ctx.hero); pose.jawDrop(ctx.hero, clamp01(p * 3 - 0.8)); ctx.hero.rotation.y = 0;
      camMove(cam, [1.2, 2.2, 6.5], [0.6, 2.0, 5.4], [0, 1.7, 2.5], [0, 1.7, 2.5], p);
    },
  },
  // Drei Jungs + Transporter räumen alles raus
  crew: {
    setup(scene, ctx) {
      street(scene);
      ctx.van = W.van(); ctx.van.position.set(4, 0, 7.5); ctx.van.rotation.y = -Math.PI / 2; scene.add(ctx.van);
      ctx.ws = [W.worker(), W.worker(), W.worker()]; ctx.ws.forEach(w => scene.add(w));
      ctx.items = [W.cardbox(0.7), W.tv(), W.lamp()]; ctx.items.forEach(i => scene.add(i));
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      ctx.ws.forEach((w, i) => {
        const k = ((t * 0.45) + i / 3) % 1;
        const from = [-1.5, 0, 3.4], to = [2.4, 0, 7.2];
        w.position.set(lerp(from[0], to[0], k), 0, lerp(from[2], to[2], k)); w.lookAt(to[0], 0, to[2]);
        pose.reset(w); pose.walk(w, t + i, 1.1); pose2.carry(w);
        const it = ctx.items[i]; it.position.set(w.position.x + Math.sin(w.rotation.y) * 0.55, 1.0, w.position.z + Math.cos(w.rotation.y) * 0.55); it.rotation.y = w.rotation.y;
      });
      camMove(cam, [-5, 4, 15], [-2, 3, 13], [0.5, 1.5, 5], [1, 1.5, 5], p);
    },
  },
  // Sortieren: drei Haufen (grün = verkaufen, grau = Schrott, rot = Müll)
  sort: {
    setup(scene, ctx) {
      scene.add(W.ground(200, C.sidewalk));
      ctx.marks = [[-3, 0x2ecc71], [0, 0x9aa3ad], [3, 0xe74c3c]].map(([x, c]) => { const m = W.pileMarker(c); m.position.set(x, 0.03, 0); scene.add(m); return m; });
      ctx.fly = [];
      const make = [() => W.lamp(), () => W.cableCoil(), () => W.cardbox(0.5), () => W.tv(), () => W.scrapPile(), () => W.cardbox(0.6), () => W.wardrobe(), () => W.cableCoil(), () => W.cardbox(0.4)];
      make.forEach((f, i) => { const o = f(); if (i === 6) o.scale.setScalar(0.5); scene.add(o); ctx.fly.push({ o, target: [0, 1, 2][[0, 1, 2, 0, 1, 2, 0, 1, 2][i]] }); });
      ctx.w = W.worker(); ctx.w.position.set(0, 0, 3.2); ctx.w.rotation.y = Math.PI; scene.add(ctx.w);
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      ctx.fly.forEach(({ o, target }, i) => {
        const k = clamp01(p * 1.6 - i * 0.08);
        const tx = [-3, 0, 3][target];
        o.position.set(lerp(0, tx, k) + Math.sin(i) * 0.4, (k < 1 ? Math.sin(k * Math.PI) * 3 : 0) + 0.1 + Math.floor(i / 3) * 0.35, lerp(2.5, 0, k) + Math.cos(i) * 0.3);
        o.rotation.y = i + (1 - k) * 4;
      });
      pose.reset(ctx.w); pose2.throwUp(ctx.w, (t * 1.6) % 1);
      camMove(cam, [0, 6, 10], [0, 5, 8.5], [0, 0.6, 0], [0, 0.6, 0], p);
    },
  },
  // Verkaufen: Handy mit Anzeige + Flohmarkt, Käufer zahlt
  sell: {
    setup(scene, ctx) {
      street(scene);
      ctx.table = W.table(3); ctx.table.position.set(0, 0, 4.5); scene.add(ctx.table);
      for (const [x, f] of [[-1, () => W.lamp()], [0.2, () => W.cardbox(0.4)], [1.1, () => W.tv()]]) { const o = f(); o.position.set(x, 0.9, 4.5); if (x > 1) o.scale.setScalar(0.6); scene.add(o); }
      ctx.w = W.worker(); ctx.w.position.set(0, 0, 3.4); scene.add(ctx.w);
      ctx.buyer = W.person({ shirt: 0x9b59b6, hat: 'hair', hair: 0xd8b26a }); ctx.buyer.position.set(0.3, 0, 5.8); ctx.buyer.rotation.y = Math.PI; scene.add(ctx.buyer);
      ctx.phone = W.phone(); scene.add(ctx.phone);
      ctx.bill = W.bill(); scene.add(ctx.bill);
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      pose.reset(ctx.w); pose.reset(ctx.buyer);
      if (p < 0.45) {
        const k = ease(clamp01(p / 0.3));
        ctx.phone.visible = true; ctx.phone.position.set(0, lerp(0.5, 2.2, k), 3.9); ctx.phone.rotation.set(0, Math.PI, 0); ctx.phone.scale.setScalar(lerp(0.3, 1, k));
        pose2.phoneUp(ctx.w, k); ctx.bill.visible = false;
        camMove(cam, [0, 2.3, 1.2], [0, 2.25, 1.6], [0, 2.2, 3.9], [0, 2.2, 3.9], p / 0.45);
      } else {
        const q = (p - 0.45) / 0.55; ctx.phone.visible = false;
        pose2.give(ctx.buyer, clamp01(q * 3));
        ctx.bill.visible = true; ctx.bill.position.set(0.15, 1.25 + Math.sin(t * 8) * 0.02, lerp(5.4, 3.9, ease(clamp01(q * 2 - 0.3)))); ctx.bill.rotation.x = -0.3;
        camMove(cam, [-4, 2.2, 6.5], [-3.4, 2.0, 5.6], [0, 1.2, 4.6], [0, 1.2, 4.6], q);
      }
    },
  },
  // Schrotthändler: Waage, Kupferkabel, Münzen springen raus
  scrap: {
    setup(scene, ctx) {
      scene.add(W.ground(200, 0x8a8170));
      for (const [x, z] of [[-6, -6], [5, -7], [-2, -9]]) { const s = W.scrapPile(); s.position.set(x, 0, z); s.scale.setScalar(3); scene.add(s); }
      ctx.sc = W.scale(); scene.add(ctx.sc);
      ctx.coils = []; for (let i = 0; i < 5; i++) { const c = W.cableCoil(); scene.add(c); ctx.coils.push(c); }
      ctx.coins = []; for (let i = 0; i < 10; i++) { const c = W.coin(); scene.add(c); ctx.coins.push(c); }
      ctx.w = W.worker(); ctx.w.position.set(2, 0, 0.5); ctx.w.rotation.y = -Math.PI / 2; scene.add(ctx.w);
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      ctx.coils.forEach((c, i) => { const k = ease(clamp01(p * 3 - i * 0.25)); c.position.set(Math.sin(i * 2) * 0.4, lerp(4, 0.3 + i * 0.16, k), Math.cos(i * 2) * 0.4); });
      ctx.coins.forEach((c, i) => { const k = clamp01(p * 2 - 0.9 - i * 0.05); c.visible = k > 0; c.position.set(Math.sin(i) * 0.6, 1.7 + Math.sin(k * Math.PI) * 1.8, -0.9 + k * 1.5); c.rotation.x = t * 10; });
      pose.reset(ctx.w); pose.armsUp(ctx.w, clamp01(p * 2 - 1), t);
      camMove(cam, [-3, 3, 6], [-2.2, 2.4, 4.8], [0, 0.8, 0], [0, 1.2, -0.4], p);
    },
  },
  // Nur echter Müll kostet: in den Container, Münzen fliegen WEG
  dump: {
    setup(scene, ctx) {
      scene.add(W.ground(200, 0x8a8170));
      ctx.sk = W.skip(); scene.add(ctx.sk);
      ctx.trash = []; for (let i = 0; i < 8; i++) { const b = i % 2 ? W.cardbox(0.6) : W.box(0.8, 0.4, 0.5, 0x5b4a3a); scene.add(b); ctx.trash.push(b); }
      ctx.coins = []; for (let i = 0; i < 8; i++) { const c = W.coin(); scene.add(c); ctx.coins.push(c); }
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      ctx.trash.forEach((b, i) => { const k = clamp01(p * 2.2 - i * 0.12); b.position.set(lerp(-5, (i % 3) - 1, k), (k < 1 ? Math.sin(k * Math.PI) * 3 : 0) + 0.5 + Math.floor(i / 3) * 0.3, lerp(2, 0, k)); b.rotation.set(k * 4, i, 0); });
      ctx.coins.forEach((c, i) => { const k = clamp01(p * 1.8 - 0.6 - i * 0.05); c.visible = k > 0; c.position.set(lerp(0, 7, k), 1.5 + Math.sin(k * Math.PI) * 2.5, lerp(0, -4, k)); c.rotation.x = t * 9; });
      camMove(cam, [-4, 4, 8], [-1, 3.6, 7], [0, 0.8, 0], [1, 1, 0], p);
    },
  },
  // Doppelt kassieren: zwei Geldströme laufen beim Arbeiter zusammen
  double: {
    setup(scene, ctx) {
      street(scene);
      ctx.w = W.worker(); ctx.w.position.set(0, 0, 5); scene.add(ctx.w);
      ctx.hero = W.person(); ctx.hero.position.set(-3.5, 0, 5); ctx.hero.rotation.y = Math.PI / 2; scene.add(ctx.hero);
      ctx.buyer = W.person({ shirt: 0x9b59b6, hat: 'hair', hair: 0xd8b26a }); ctx.buyer.position.set(3.5, 0, 5); ctx.buyer.rotation.y = -Math.PI / 2; scene.add(ctx.buyer);
      ctx.l = []; ctx.r = [];
      for (let i = 0; i < 12; i++) { const a = W.bill(); const b = W.bill(); scene.add(a, b); ctx.l.push(a); ctx.r.push(b); }
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      for (const [arr, sx] of [[ctx.l, -3.2], [ctx.r, 3.2]]) arr.forEach((b, i) => { const k = (t * 0.9 + i / 12) % 1; b.position.set(lerp(sx, 0, k), 1.4 + Math.sin(k * Math.PI) * 1.2, 5); b.rotation.set(t * 4 + i, 0, 0); });
      pose.reset(ctx.w); pose.armsUp(ctx.w, 1, t); pose.reset(ctx.hero); pose2.give(ctx.hero, 1); pose.reset(ctx.buyer); pose2.give(ctx.buyer, 1);
      camMove(cam, [0, 2.4, 12.5], [0, 2.0, 10.5], [0, 1.5, 5], [0, 1.6, 5], p);
    },
  },
  // Tipp: Wertanrechnung / Steuer – Held mit Zettel + grünem Haken
  tip: {
    setup(scene, ctx) {
      clutterRoom(scene, ctx, 4);
      ctx.hero = W.person(); ctx.hero.position.set(0, 0, 1.5); scene.add(ctx.hero);
      ctx.paper = W.paper(0.9, 1.2); ctx.hero.userData.armR.add(ctx.paper); ctx.paper.position.set(0, -0.8, 0.25); ctx.paper.rotation.x = Math.PI / 2;
      ctx.check = new THREE.Group();
      const a = W.box(0.25, 0.9, 0.25, 0x2ecc71, { emissive: 0x2ecc71, emissiveIntensity: 0.5 }); a.position.set(0.35, 0.2, 0); a.rotation.z = -0.6;
      const b = W.box(0.25, 0.5, 0.25, 0x2ecc71, { emissive: 0x2ecc71, emissiveIntensity: 0.5 }); b.position.set(-0.12, 0, 0); b.rotation.z = 0.8;
      ctx.check.add(a, b); scene.add(ctx.check);
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      pose.reset(ctx.hero); ctx.hero.userData.armR.rotation.set(-1.4, 0, 0);
      ctx.check.position.set(0.9, 3.0, 1.5); ctx.check.scale.setScalar(ease(clamp01(p * 2.5 - 0.5)) * 1.1); ctx.check.rotation.y = Math.sin(t * 3) * 0.3;
      camMove(cam, [0.5, 2.0, 6], [0.3, 2.2, 5], [0.2, 1.8, 1.5], [0.3, 2.2, 1.5], p);
    },
  },
  // PLOTWIST 1: Held scrollt am Handy und sieht SEINE Couch
  twist: {
    setup(scene, ctx) {
      scene.add(W.ground(200, 0x9a9a9a)); scene.add(W.room(10, 8, 3.2, 0xe8eef3, 0xa7b0b8));
      ctx.hero = W.person(); ctx.hero.position.set(0, 0, 0); scene.add(ctx.hero);
      ctx.ph = W.phone(); scene.add(ctx.ph);
      ctx.mini = W.sofa(); ctx.mini.scale.setScalar(0.17); scene.add(ctx.mini);
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      pose.reset(ctx.hero); pose2.phoneUp(ctx.hero, 1); pose.jawDrop(ctx.hero, clamp01(p * 3 - 1.2));
      ctx.ph.position.set(0.25, 1.75, 0.55); ctx.ph.rotation.set(-0.2, 0, 0); ctx.ph.scale.setScalar(0.45);
      ctx.mini.position.set(0.25, 1.83, 0.6); ctx.mini.rotation.set(-0.2, 0, 0);
      if (p < 0.5) camMove(cam, [0.25, 1.95, 1.6], [0.25, 1.9, 1.15], [0.25, 1.78, 0.5], [0.25, 1.78, 0.5], p * 2);
      else camMove(cam, [0.8, 1.9, 2.4], [0.6, 1.85, 2.1], [0, 1.9, 0], [0, 1.95, 0], (p - 0.5) * 2);
    },
  },
  // PLOTWIST 2: Held zahlt dem Entrümpler Geld und trägt seine eigene Couch zurück
  rebuy: {
    setup(scene, ctx) {
      street(scene);
      ctx.van = W.van(); ctx.van.position.set(5, 0, 7.5); ctx.van.rotation.y = Math.PI / 2; scene.add(ctx.van);
      ctx.w = W.worker(); ctx.w.position.set(2.2, 0, 5.2); ctx.w.rotation.y = -Math.PI / 2; scene.add(ctx.w);
      ctx.hero = W.person(); scene.add(ctx.hero);
      ctx.sofa = W.sofa(); scene.add(ctx.sofa);
      ctx.bills = []; for (let i = 0; i < 6; i++) { const b = W.bill(); scene.add(b); ctx.bills.push(b); }
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      pose.reset(ctx.hero); pose.reset(ctx.w);
      if (p < 0.4) {
        ctx.hero.position.set(0.6, 0, 5.2); ctx.hero.rotation.y = Math.PI / 2; pose2.give(ctx.hero, 1);
        ctx.bills.forEach((b, i) => { const k = clamp01(p / 0.4 * 1.5 - i * 0.1); b.position.set(lerp(1.0, 1.9, k), 1.3 + i * 0.03, 5.2); });
        ctx.sofa.position.set(2.5, 0, 6.8); ctx.sofa.rotation.y = 0; pose.armsUp(ctx.w, 0.6, t);
        camMove(cam, [1.3, 2.0, 9.5], [1.3, 1.9, 8.6], [1.3, 1.3, 5.2], [1.3, 1.3, 5.2], p / 0.4);
      } else {
        const q = (p - 0.4) / 0.6; const x = lerp(1.2, -3.5, q);
        ctx.bills.forEach(b => b.position.set(2.0, 1.2, 5.2));
        ctx.hero.position.set(x, 0, 5.4); ctx.hero.rotation.y = -Math.PI / 2; pose.walk(ctx.hero, t, 0.6); pose2.carry(ctx.hero);
        ctx.sofa.position.set(x, 1.05, 5.4); ctx.sofa.rotation.y = Math.PI / 2;
        pose2.give(ctx.w, 0); pose.armsUp(ctx.w, 0.8, t);
        camMove(cam, [x + 1.5, 2.2, 11], [x - 0.5, 2.6, 10], [x, 1.2, 5.4], [x - 1, 1.2, 5.4], q);
      }
    },
  },
};

export const sky = { room: 'indoor', sqm: 'indoor', bill: 'indoor', tip: 'indoor', twist: 'indoor' };
