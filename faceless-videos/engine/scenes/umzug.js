// 005 Umzugsunternehmen – Plotwist: Sie ziehen das ganze Haus um. Mit dir drin. Auf den Mond.
import * as THREE from 'three';
import * as W from '../world.js';
import { street, towersShot, tipShot, flyBills, updateBills } from './_common.js';
const { C, pose, pose2, camMove, clamp01, ease, lerp } = W;

function carrier(scene, ctx, n = 3) {
  ctx.ws = []; ctx.boxes = [];
  for (let i = 0; i < n; i++) { const w = W.worker(); scene.add(w); ctx.ws.push(w); const b = W.cardbox(0.75); scene.add(b); ctx.boxes.push(b); }
}
function walkCarry(ctx, t, from, to, speed = 0.45) {
  ctx.ws.forEach((w, i) => {
    const k = ((t * speed) + i / ctx.ws.length) % 1;
    w.position.set(lerp(from[0], to[0], k), 0, lerp(from[2], to[2], k)); w.lookAt(to[0], 0, to[2]);
    pose.reset(w); pose.walk(w, t + i, 1.1); pose2.carry(w);
    ctx.boxes[i].position.set(w.position.x + Math.sin(w.rotation.y) * 0.55, 1.05, w.position.z + Math.cos(w.rotation.y) * 0.55); ctx.boxes[i].rotation.y = w.rotation.y;
  });
}

export const shots = {
  hook: {
    setup(scene, ctx) { street(scene); ctx.tr = W.truck(); ctx.tr.rotation.y = Math.PI / 2; scene.add(ctx.tr); carrier(scene, ctx); flyBills(ctx, scene, 24); },
    update(t, d, cam, ctx) {
      const p = t / d; ctx.tr.position.set(6, 0, 8);
      walkCarry(ctx, t, [-1.5, 0, 3.4], [3.5, 0, 7.5], 0.55);
      ctx.bills.forEach((b, i) => { const k = (t * 0.5 + i / 24) % 1; b.position.set(-4 + (i % 8), 8 - k * 8, 2 + (i % 5)); b.rotation.set(t * 3 + i, t * 2, i); });
      camMove(cam, [-6, 1.6, 13], [-3, 2.4, 12], [1, 1.4, 5], [2, 1.6, 5.5], p);
    },
  },
  intro: {
    setup(scene, ctx) { street(scene); ctx.tr = W.truck(); ctx.tr.position.set(2, 0, 8); ctx.tr.rotation.y = -Math.PI / 2; scene.add(ctx.tr); ctx.hero = W.person(); ctx.hero.position.set(-3, 0, 4.6); scene.add(ctx.hero); },
    update(t, d, cam, ctx) {
      const p = t / d; ctx.tr.position.x = lerp(14, 2, ease(clamp01(p * 1.6)));
      pose.reset(ctx.hero); ctx.hero.rotation.y = 0.9; pose.shrug(ctx.hero, clamp01(p * 2 - 1));
      camMove(cam, [-9, 4, 19], [-7, 4, 16], [0, 1.5, 6], [1, 1.6, 6], p);
    },
  },
  // Du sitzt zwischen Kartons und rufst die Jungs an
  call: {
    setup(scene, ctx) { scene.add(W.ground(200, 0x9a9a9a)); scene.add(W.room(10, 8)); ctx.hero = W.person(); ctx.hero.position.set(0, 0, 1); scene.add(ctx.hero); ctx.ph = W.phone(); ctx.ph.scale.setScalar(0.22); scene.add(ctx.ph);
      let r = 5; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280; for (let i = 0; i < 18; i++) { const b = W.cardbox(0.5 + rnd() * 0.3); b.position.set(-3.5 + rnd() * 7, 0.25 + (i % 3) * 0.5, -2.5 + rnd() * 3); b.rotation.y = rnd(); scene.add(b); } },
    update(t, d, cam, ctx) { const p = t / d; pose.reset(ctx.hero); pose2.phoneUp(ctx.hero, clamp01(p * 3)); ctx.ph.position.set(0.36, 1.98, 1.05); ctx.ph.rotation.set(0, 0.4, 0); ctx.ph.visible = p > 0.25;
      camMove(cam, [2.5, 2.2, 6], [1.2, 1.9, 4.2], [0, 1.4, 0], [0, 1.7, 1], p); },
  },
  // 3 Jungs à 8 Stunden: drei Münztürme wachsen, Uhr rast
  math: {
    setup(scene, ctx) { street(scene); ctx.ws = [-2.4, 0, 2.4].map(x => { const w = W.worker(); w.position.set(x, 0, 5); scene.add(w); return w; }); ctx.tw = [-2.4, 0, 2.4].map(x => { const t = W.coinTower(40); t.position.set(x, 0, 3.2); scene.add(t); return t; }); ctx.clk = W.clock(); ctx.clk.position.set(0, 6.5, 2); ctx.clk.scale.setScalar(1.2); scene.add(ctx.clk); },
    update(t, d, cam, ctx) { const p = t / d; ctx.clk.userData.mh.rotation.z = -t * 14; ctx.clk.userData.hh.rotation.z = -t * 1.2;
      ctx.tw.forEach((tw, i) => tw.count = Math.round(40 * ease(clamp01(p * 1.3 - i * 0.1)))); ctx.ws.forEach((w, i) => { pose.reset(w); pose.armsUp(w, clamp01(p * 2 - 1), t + i); });
      camMove(cam, [0, 3, 15], [0, 5, 16], [0, 2.5, 3], [0, 4, 3], p); },
  },
  // Führerschein reicht: Held fährt selbst den Transporter
  license: {
    setup(scene, ctx) { street(scene); ctx.van = W.van(); ctx.van.rotation.y = Math.PI / 2; scene.add(ctx.van); ctx.hero = W.person(); ctx.hero.scale.setScalar(0.9); scene.add(ctx.hero); },
    update(t, d, cam, ctx) { const p = t / d, x = lerp(-14, 10, p); ctx.van.position.set(x, 0, 7.5); ctx.hero.position.set(x + 1.6, 0.85, 7.0); ctx.hero.rotation.y = Math.PI / 2; pose.reset(ctx.hero); ctx.hero.userData.armR.rotation.set(-2.6, 0, 0.3);
      camMove(cam, [x + 5, 2.2, 13], [x + 2, 2.4, 12], [x, 1.5, 7.5], [x + 1, 1.5, 7.5], p); },
  },
  price: towersShot(83, 0, {}),
  hourly: {
    setup(scene, ctx) { street(scene); carrier(scene, ctx, 2); ctx.clk = W.clock(); ctx.clk.position.set(0, 5.5, 3); ctx.clk.scale.setScalar(1.3); scene.add(ctx.clk); ctx.coins = []; for (let i = 0; i < 12; i++) { const c = W.coin(); scene.add(c); ctx.coins.push(c); } },
    update(t, d, cam, ctx) {
      const p = t / d; walkCarry(ctx, t, [-3, 0, 4], [3, 0, 4.5], 0.4);
      ctx.clk.userData.mh.rotation.z = -t * 6; ctx.clk.userData.hh.rotation.z = -t * 0.5;
      ctx.coins.forEach((c, i) => { const k = (t * 0.7 + i / 12) % 1; c.position.set(Math.sin(i * 2) * 0.8, lerp(4.6, 0.1, k), 3 + Math.cos(i) * 0.4); c.rotation.x = t * 8; });
      camMove(cam, [0, 3.2, 13], [0, 3.6, 11.5], [0, 3.4, 3], [0, 3.6, 3], p);
    },
  },
  wage: towersShot(42, 14, { scale: 2.2 }),
  rest: towersShot(100, 33, { scale: 1.3 }),
  halteverbot: {
    setup(scene, ctx) { street(scene); ctx.signs = [-4, 4].map(x => { const s = W.noParkingSign(); s.position.set(x, 0, 5); scene.add(s); return s; }); ctx.tr = W.truck(); ctx.tr.rotation.y = Math.PI / 2; scene.add(ctx.tr); ctx.car = W.car(0xe94b3c); ctx.car.rotation.y = Math.PI / 2; scene.add(ctx.car); },
    update(t, d, cam, ctx) {
      const p = t / d;
      ctx.signs.forEach((s, i) => s.scale.setScalar(ease(clamp01(p * 4 - i * 0.4))));
      ctx.car.position.set(lerp(0, -30, ease(clamp01(p * 2 - 0.5))), 0, 7.2);
      ctx.tr.position.set(lerp(30, 0.5, ease(clamp01(p * 2 - 0.9))), 0, 7.2);
      camMove(cam, [0, 9, 20], [0, 7, 17], [0, 1, 6], [0, 1.2, 6], p);
    },
  },
  stairs: {
    setup(scene, ctx) { street(scene, { houses: false }); ctx.tw = W.tower(5); ctx.tw.position.set(0, 0, -3); scene.add(ctx.tw); ctx.w = W.worker(); scene.add(ctx.w); ctx.b = W.wardrobe(); ctx.b.scale.setScalar(0.8); scene.add(ctx.b); },
    update(t, d, cam, ctx) {
      const p = t / d, h = ease(clamp01(p)) * 12;
      ctx.w.position.set(-1.6, h, 0.6); pose.reset(ctx.w); pose.walk(ctx.w, t, 0.5); pose2.carry(ctx.w); ctx.w.rotation.y = 0;
      ctx.b.position.set(-1.6, h + 0.6, 1.1); ctx.b.rotation.z = Math.sin(t * 5) * 0.05;
      camMove(cam, [4, 2, 12], [4, 13, 12], [-1, 1.5, 0], [-1, 13, 0], p);
    },
  },
  storage: {
    setup(scene, ctx) {
      scene.add(W.ground(300, C.asphalt));
      ctx.units = []; const cols = [0xff8a1f, 0x2f6fde, 0x2ecc71, 0xe94b3c, 0xffd400];
      for (let i = 0; i < 10; i++) { const u = W.storageUnit(cols[i % 5]); u.position.set(-11 + (i % 10) * 2.5, 0, 0); scene.add(u); ctx.units.push(u); }
      ctx.coins = []; for (let i = 0; i < 10; i++) { const c = W.coin(); scene.add(c); ctx.coins.push(c); }
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      ctx.coins.forEach((c, i) => { const k = (t * 0.8 + i * 0.13) % 1; c.position.set(-11 + i * 2.5, 2.9 + k * 2, 1.4); c.rotation.y = t * 6; c.rotation.x = Math.PI / 2; c.visible = k < 0.9; });
      camMove(cam, [-9, 3, 10], [4, 3.5, 9], [-6, 2, 0], [6, 2, 0], p);
    },
  },
  tip: tipShot(),
  tax: tipShot(),
  // Twist 1: Die Jungs tragen ALLES raus – auch Bäume, Auto, Briefkasten
  twist1: {
    setup(scene, ctx) {
      street(scene); ctx.hero = W.person(); ctx.hero.position.set(-4, 0, 6); scene.add(ctx.hero);
      ctx.items = [W.tree(1), W.car(0x2f6fde), W.sofa(), W.wardrobe(), W.lamp()]; ctx.items.forEach(i => scene.add(i));
      ctx.ws = ctx.items.map(() => { const w = W.worker(); scene.add(w); return w; });
      ctx.tr = W.truck(); ctx.tr.position.set(8, 0, 8); ctx.tr.rotation.y = Math.PI / 2; scene.add(ctx.tr);
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      ctx.ws.forEach((w, i) => {
        const k = clamp01(p * 1.4 - i * 0.12); const x = lerp(-1 + i * 0.8, 6, k);
        w.position.set(x, 0, 4.6); w.rotation.y = Math.PI / 2; pose.reset(w); pose.walk(w, t + i); pose2.carry(w);
        ctx.items[i].position.set(x + 0.6, 1.0, 4.6); ctx.items[i].visible = k < 0.98;
      });
      pose.reset(ctx.hero); ctx.hero.rotation.y = Math.PI / 2; pose.handsOnHead(ctx.hero, clamp01(p * 2 - 0.6));
      camMove(cam, [-8, 2.5, 13], [-6, 2.2, 11.5], [0, 1.2, 5], [2, 1.4, 5], p);
    },
  },
  // Twist 2: Das ganze Haus auf dem LKW – Abflug zum Mond
  twist2: {
    setup(scene, ctx) {
      street(scene, { houses: false });
      ctx.tr = W.truck(); ctx.tr.scale.setScalar(2.2); scene.add(ctx.tr);
      ctx.house = W.house(); ctx.house.scale.setScalar(0.55); scene.add(ctx.house);
      ctx.hero = W.person(); ctx.hero.scale.setScalar(0.55); scene.add(ctx.hero);
      ctx.moon = W.moon(8); ctx.moon.position.set(-25, 70, -60); scene.add(ctx.moon);
      ctx.sign = W.noParkingSign(); ctx.sign.position.set(-3, 0, 5); scene.add(ctx.sign);
    },
    update(t, d, cam, ctx) {
      const p = t / d, fly = ease(clamp01((p - 0.3) / 0.7));
      const pos = [lerp(0, -25, fly), lerp(0, 62, fly), lerp(6, -55, fly)];
      ctx.tr.position.set(...pos); ctx.tr.rotation.set(-0.6 * fly, Math.PI / 2 + fly * 0.4, 0);
      ctx.house.position.set(pos[0] - 1.5 * (1 - fly), pos[1] + 7.4, pos[2] - 1.2 + fly * 0.5); ctx.house.rotation.copy(ctx.tr.rotation);
      ctx.hero.position.set(pos[0] + 0.5, pos[1] + 7.4 + 4.5 * 0.55, pos[2] + 2.2); pose.reset(ctx.hero); pose.armsUp(ctx.hero, 1, t);
      camMove(cam, [12, 6, 26], [10, 26, 40], [0, 6, 4], [-22, 60, -50], p);
    },
  },
};
export const sky = { tip: 'indoor', tax: 'indoor' };
