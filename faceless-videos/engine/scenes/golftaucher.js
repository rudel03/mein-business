// 009 Golfball-Taucher – Plotwist: Er zieht einen Golfer aus dem Teich, der seit 2009 seinen Ball sucht.
import * as THREE from 'three';
import * as W from '../world.js';
import { towersShot, tipShot } from './_common.js';
const { C, pose, pose2, camMove, clamp01, ease, lerp } = W;

function course(scene, ctx) {
  scene.add(W.ground(400, 0x4fbf3a));
  ctx.pond = W.pond(9); scene.add(ctx.pond);
  const f = W.flag(); f.position.set(13, 0, -10); scene.add(f);
  for (const [x, z] of [[-16, -14], [18, 6], [-14, 12], [6, -22], [-24, -2]]) { const t = W.tree(1.5); t.position.set(x, 0, z); scene.add(t); }
  const club = W.house(); club.position.set(-6, 0, -30); club.scale.setScalar(1.4); scene.add(club); ctx.club = club;
}
function underwater(scene, ctx, n = 900) {
  scene.add(W.ground(200, 0x5a4a32));
  ctx.balls = W.ballField(n, 9, 7, 0.1); scene.add(ctx.balls);
  for (let i = 0; i < 14; i++) { const p = W.box(0.08, 1 + (i % 4) * 0.5, 0.08, 0x2f7d3a); p.position.set(Math.sin(i * 2.3) * 7, 0.6, Math.cos(i * 1.7) * 7); scene.add(p); }
  ctx.bub = []; for (let i = 0; i < 30; i++) { const b = W.ball(0.05, 0xbfefff, 0, { transparent: true, opacity: 0.6, emissive: 0x9fe6ff, emissiveIntensity: 0.5 }); b.castShadow = false; scene.add(b); ctx.bub.push(b); }
}
function bubbles(ctx, t, cx = 0, cz = 0) { ctx.bub.forEach((b, i) => { const k = (t * 0.4 + i / 30) % 1; b.position.set(cx + Math.sin(i * 3.1) * 1.5, k * 6, cz + Math.cos(i * 2.2) * 1.5); }); }
function hitBalls(ctx, scene, n) { ctx.fly = []; for (let i = 0; i < n; i++) { const b = W.golfBall(); scene.add(b); ctx.fly.push(b); } }
function updateFly(ctx, t, from, speed = 0.6) {
  ctx.fly.forEach((b, i) => { const k = (t * speed + i / ctx.fly.length) % 1; const tx = Math.sin(i * 2.7) * 6, tz = Math.cos(i * 1.9) * 6;
    b.position.set(lerp(from[0], tx, k), from[1] + Math.sin(k * Math.PI) * 6 - k * from[1], lerp(from[2], tz, k)); b.visible = k < 0.97; });
}

export const shots = {
  // Hook: Golfer schlagen Bälle ins Wasser, Taucher taucht mit vollem Netz auf, Münzen
  hook: {
    setup(scene, ctx) { course(scene, ctx); ctx.g = W.golfer(); ctx.g.position.set(-12, 0, 10); ctx.g.rotation.y = 2.3; scene.add(ctx.g); hitBalls(ctx, scene, 14);
      ctx.d = W.diver(); scene.add(ctx.d); ctx.bag = W.netBag(); scene.add(ctx.bag); ctx.coins = []; for (let i = 0; i < 12; i++) { const c = W.coin(); scene.add(c); ctx.coins.push(c); } },
    update(t, d, cam, ctx) {
      const p = t / d; W.swing(ctx.g, (t * 0.9) % 1); updateFly(ctx, t, [-11, 1, 9]);
      const up = ease(clamp01(p * 2 - 0.6)); ctx.d.position.set(1, lerp(-2, 0.2, up), 2); ctx.d.rotation.y = 0.4; pose.reset(ctx.d); ctx.d.userData.armR.rotation.set(-2.8 * up, 0, 0);
      ctx.bag.position.set(1.1, lerp(-1, 2.9, up), 2.2);
      ctx.coins.forEach((c, i) => { const k = clamp01(p * 2.4 - 1.4 - i * 0.04); c.visible = k > 0; c.position.set(1 + Math.sin(i) * 0.8, 3 + k * 3, 2 + Math.cos(i) * 0.6); c.rotation.x = t * 9; });
      camMove(cam, [6, 3, 12], [4, 2.4, 9], [0, 1, 0], [1, 1.6, 2], p);
    },
  },
  // Golfplatz von oben, Teich glitzert
  intro: {
    setup(scene, ctx) { course(scene, ctx); ctx.bf = W.ballField(300, 8, 5, -0.05); ctx.pond.add(ctx.bf); },
    update(t, d, cam, ctx) { const p = t / d; camMove(cam, [-20, 22, 24], [8, 18, 22], [0, 0, 0], [0, 0, -4], p); },
  },
  // Golfer schlägt ins Wasser – Platsch – zuckt mit den Schultern
  easy: {
    setup(scene, ctx) { course(scene, ctx); ctx.g = W.golfer(0x3b82f6); ctx.g.position.set(0, 0, 13); ctx.g.rotation.y = Math.PI; scene.add(ctx.g); ctx.b = W.golfBall(); scene.add(ctx.b); ctx.sp = W.ball(0.6, 0xbfefff, 0, { transparent: true, opacity: 0.7 }); scene.add(ctx.sp); },
    update(t, d, cam, ctx) {
      const p = t / d; pose.reset(ctx.g); if (p < 0.3) W.swing(ctx.g, p / 0.3); else pose.shrug(ctx.g, clamp01((p - 0.6) * 4));
      const k = clamp01((p - 0.15) / 0.4); ctx.b.position.set(0, 0.3 + Math.sin(k * Math.PI) * 6, lerp(12.4, 1, k)); ctx.b.visible = k < 1;
      const s = clamp01((p - 0.55) * 4); ctx.sp.visible = s > 0 && s < 1; ctx.sp.position.set(0, 0.2, 1); ctx.sp.scale.set(1 + s * 2, s * 2.5, 1 + s * 2);
      camMove(cam, [2.5, 2.3, 18], [2, 2.7, 17.5], [0, 1.3, 12], [0, 1, 5], p);
    },
  },
  // Unterwasser: Boden voller Bälle
  price: {
    setup(scene, ctx) { underwater(scene, ctx, 1200); ctx.nb = W.golfBall(); ctx.nb.scale.setScalar(4); scene.add(ctx.nb); },
    update(t, d, cam, ctx) { const p = t / d; bubbles(ctx, t); ctx.nb.position.set(0, 1.6 + Math.sin(t * 2) * 0.1, 2); ctx.nb.rotation.y = t; camMove(cam, [0, 2.2, 6.5], [0, 4, 9], [0, 1.2, 0], [0, 0.2, -2], p); },
  },
  // Taucher sammelt, Netzsäcke stapeln sich, Zähler-Turm
  math: {
    setup(scene, ctx) { underwater(scene, ctx, 900); ctx.d = W.diver(); ctx.d.rotation.x = Math.PI / 2.4; scene.add(ctx.d); ctx.bags = []; for (let i = 0; i < 8; i++) { const b = W.netBag(); scene.add(b); ctx.bags.push(b); } ctx.tw = W.coinTower(60); ctx.tw.position.set(3, 0, -1); scene.add(ctx.tw); },
    update(t, d, cam, ctx) {
      const p = t / d; bubbles(ctx, t, 0, 0); const x = lerp(-4, 2, p);
      ctx.d.position.set(x, 0.7, 0.5); pose.reset(ctx.d); pose.walk(ctx.d, t, 0.8);
      ctx.bags.forEach((b, i) => { const on = p * 9 > i; b.visible = on; b.position.set(-3 + (i % 4) * 0.95, 0.45 + Math.floor(i / 4) * 0.8, -1.6); });
      ctx.tw.count = Math.round(60 * ease(p));
      camMove(cam, [0, 3, 8], [1, 3.5, 7], [0, 1, -0.5], [1, 1.5, -0.5], p);
    },
  },
  cost: towersShot(60, 20, { scale: 1.4 }),
  rest: towersShot(40, 0, { scale: 1.6 }),
  // Club freut sich: Münzen fliegen ins Clubhaus
  clubHappy: {
    setup(scene, ctx) { course(scene, ctx); ctx.coins = []; for (let i = 0; i < 16; i++) { const c = W.coin(); scene.add(c); ctx.coins.push(c); } ctx.m = W.golfer(0xe94b3c); ctx.m.position.set(-6, 0, -22); scene.add(ctx.m); },
    update(t, d, cam, ctx) { const p = t / d; ctx.coins.forEach((c, i) => { const k = (t * 0.6 + i / 16) % 1; c.position.set(lerp(0, -6, k), 1 + Math.sin(k * Math.PI) * 6, lerp(0, -26, k)); c.rotation.x = t * 8; }); pose.reset(ctx.m); pose.armsUp(ctx.m, 1, t);
      camMove(cam, [8, 6, 10], [6, 7, 4], [-3, 2, -12], [-5, 3, -20], p); },
  },
  // Sortieren: Bälle fliegen in 4 Qualitätsboxen (grau → gold = AAAA)
  sort: {
    setup(scene, ctx) { scene.add(W.ground(200, 0xcfd3d8)); scene.add(W.room(10, 8, 3.2, 0xe6f2e6, 0xa7b0b8)); ctx.tb = W.sortTable(); scene.add(ctx.tb); ctx.fly = []; for (let i = 0; i < 24; i++) { const b = W.golfBall(); scene.add(b); ctx.fly.push(b); } },
    update(t, d, cam, ctx) { const p = t / d; ctx.fly.forEach((b, i) => { const k = (t * 0.8 + i / 24) % 1, bin = ctx.tb.userData.bins[i % 4]; b.position.set(lerp(0, bin.position.x, k), 1.3 + Math.sin(k * Math.PI) * 1.2, lerp(1.8, 0, k)); });
      camMove(cam, [0, 2.6, 4.6], [0.6, 2.2, 3.8], [0, 1.1, 0], [0, 1.1, 0], p); },
  },
  // Trick: goldene Markenbälle leuchten, Rest landet im Großsack
  trick: {
    setup(scene, ctx) { scene.add(W.ground(200, 0xcfd3d8)); scene.add(W.room(10, 8, 3.2, 0xe6f2e6, 0xa7b0b8)); ctx.tb = W.sortTable(); scene.add(ctx.tb);
      ctx.gold = []; for (let i = 0; i < 5; i++) { const b = W.ball(0.18, C.gold, 1, { emissive: 0x9a6b00, emissiveIntensity: 0.8 }); scene.add(b); ctx.gold.push(b); }
      ctx.sack = W.netBag(120); ctx.sack.scale.setScalar(2); ctx.sack.position.set(-2.8, 0.9, 1); scene.add(ctx.sack); },
    update(t, d, cam, ctx) { const p = t / d; ctx.gold.forEach((b, i) => { b.position.set(1.2 + i * 0.3 - 0.6, 1.5 + Math.sin(t * 3 + i) * 0.15 + p * 0.5, 0.5); b.scale.setScalar(1 + Math.sin(t * 6 + i) * 0.1); });
      camMove(cam, [1.5, 2.2, 4], [0.5, 2.0, 3.4], [0.6, 1.4, 0.3], [0.3, 1.5, 0.3], p); },
  },
  tip: tipShot(),
  // Twist 1: Taucher zieht am Netz – was Großes kommt hoch
  twist1: {
    setup(scene, ctx) { underwater(scene, ctx, 600); ctx.d = W.diver(); ctx.d.position.set(-1, 0, 1); scene.add(ctx.d); ctx.og = W.oldGolfer(); scene.add(ctx.og); },
    update(t, d, cam, ctx) { const p = t / d; bubbles(ctx, t); pose.reset(ctx.d); ctx.d.userData.armR.rotation.set(-1.4, 0, -0.4); ctx.d.userData.armL.rotation.set(-1.4, 0, 0.4); ctx.d.position.x = -1 - Math.sin(t * 6) * 0.05;
      ctx.og.position.set(lerp(3.5, 0.6, ease(p)), 0, 1); ctx.og.rotation.y = -Math.PI / 2; pose.reset(ctx.og); ctx.og.userData.hip.rotation.z = 0.2 * (1 - p);
      camMove(cam, [0, 1.6, 6], [0.3, 1.8, 5], [0.5, 1.2, 1], [0.2, 1.4, 1], p); },
  },
  // Twist 2: Bart-Golfer (seit 2009) kauft seinen Ball zurück – 2,50 €
  twist2: {
    setup(scene, ctx) { underwater(scene, ctx, 600); ctx.d = W.diver(); ctx.d.position.set(-0.8, 0, 1); ctx.d.rotation.y = Math.PI / 2; scene.add(ctx.d); ctx.og = W.oldGolfer(); ctx.og.position.set(0.8, 0, 1); ctx.og.rotation.y = -Math.PI / 2; scene.add(ctx.og);
      ctx.b = W.golfBall(); ctx.b.scale.setScalar(1.6); scene.add(ctx.b); ctx.coins = []; for (let i = 0; i < 3; i++) { const c = W.coin(); scene.add(c); ctx.coins.push(c); } },
    update(t, d, cam, ctx) { const p = t / d; bubbles(ctx, t); pose.reset(ctx.d); pose.reset(ctx.og);
      pose2.give(ctx.d, 1); pose2.give(ctx.og, clamp01(p * 2)); const k = ease(clamp01(p * 2 - 0.4)); ctx.b.position.set(lerp(-0.2, 0.3, k), 1.35, 1);
      ctx.coins.forEach((c, i) => { const q = ease(clamp01(p * 2 - 1 - i * 0.1)); c.visible = q > 0; c.position.set(lerp(0.3, -0.3, q), 1.35 + i * 0.1, 1.05); c.rotation.x = Math.PI / 2; });
      if (p < 0.5) camMove(cam, [0, 1.5, 4.2], [0, 1.6, 3.6], [0, 1.4, 1], [0, 1.4, 1], p * 2); else camMove(cam, [1.6, 1.8, 2.8], [1.4, 1.85, 2.3], [0.8, 1.85, 1], [0.8, 1.9, 1], (p - 0.5) * 2); },
  },
};
export const sky = { price: 'underwater', math: 'underwater', twist1: 'underwater', twist2: 'underwater', sort: 'indoor', trick: 'indoor', tip: 'indoor' };
