// Gemeinsame Kulissen + wiederverwendbare Einstellungen für alle Geschäftsmodell-Videos.
import * as THREE from 'three';
import * as W from '../world.js';
const { C, pose, pose2, camMove, clamp01, ease, lerp } = W;

export function street(scene, { houses = true } = {}) {
  scene.add(W.ground());
  const road = new THREE.Mesh(new THREE.PlaneGeometry(300, 9), W.M(C.asphalt)); road.rotation.x = -Math.PI / 2; road.position.set(0, 0.02, 9); road.receiveShadow = true; scene.add(road);
  const walk = new THREE.Mesh(new THREE.PlaneGeometry(300, 3), W.M(C.sidewalk)); walk.rotation.x = -Math.PI / 2; walk.position.set(0, 0.03, 3.5); scene.add(walk);
  if (houses) { const h = W.house(); h.position.set(0, 0, -3); scene.add(h); for (const x of [-14, 14]) { const o = W.house(); o.position.set(x, 0, -4); scene.add(o); } }
  for (const x of [-7, 7, -21, 21]) { const t = W.tree(1.2); t.position.set(x, 0, 1); scene.add(t); }
}
export function floorRoom(scene, wall = 0xf3e9d8, floor = 0xb98a5a) { scene.add(W.ground(200, 0x9a9a9a)); scene.add(W.room(10, 8, 3.2, wall, floor)); }

// Zwei Münztürme (z. B. Preis vs. Lohn), Held schaut hoch
export function towersShot(nA, nB, { setting = 'street', scale = 1.6 } = {}) {
  return {
    setup(scene, ctx) {
      if (setting === 'street') street(scene); else floorRoom(scene);
      ctx.a = W.coinTower(nA); ctx.a.position.set(-1.6, 0, 1); ctx.a.scale.setScalar(scale); scene.add(ctx.a);
      if (nB) { ctx.b = W.coinTower(nB); ctx.b.position.set(1.6, 0, 1); ctx.b.scale.setScalar(scale); scene.add(ctx.b); }
      ctx.hero = W.person(); ctx.hero.position.set(0, 0, 5.5); ctx.hero.rotation.y = Math.PI; scene.add(ctx.hero);
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      ctx.a.count = Math.round(nA * ease(clamp01(p * 2.2)));
      if (ctx.b) ctx.b.count = Math.round(nB * ease(clamp01(p * 2.2 - 0.8)));
      pose.reset(ctx.hero); ctx.hero.userData.head.rotation.x = -0.5 * clamp01(p * 2);
      const top = Math.max(nA, nB || 0) * 0.15 * scale;
      camMove(cam, [0, 3, 15], [0, 2 + top * 0.45, 15 + top * 0.7], [0, 3, 1], [0, top * 0.5, 1], p);
    },
  };
}
// Pro-Tipp: Held hält Zettel, grüner Haken poppt auf
export function tipShot() {
  return {
    setup(scene, ctx) {
      floorRoom(scene, 0xe6f2e6, 0xa7b0b8);
      ctx.hero = W.person(); ctx.hero.position.set(0, 0, 1.5); scene.add(ctx.hero);
      ctx.paper = W.paper(0.9, 1.2); ctx.hero.userData.armR.add(ctx.paper); ctx.paper.position.set(0, -0.8, 0.25); ctx.paper.rotation.x = Math.PI / 2;
      ctx.check = new THREE.Group();
      const g = { emissive: 0x2ecc71, emissiveIntensity: 0.5 };
      const a = W.box(0.25, 0.9, 0.25, 0x2ecc71, g); a.position.set(0.35, 0.2, 0); a.rotation.z = -0.6;
      const b = W.box(0.25, 0.5, 0.25, 0x2ecc71, g); b.position.set(-0.12, 0, 0); b.rotation.z = 0.8;
      ctx.check.add(a, b); scene.add(ctx.check);
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      pose.reset(ctx.hero); ctx.hero.userData.armR.rotation.set(-1.4, 0, 0);
      ctx.check.position.set(0.9, 3.0, 1.5); ctx.check.scale.setScalar(ease(clamp01(p * 2.5 - 0.4)) * 1.1); ctx.check.rotation.y = Math.sin(t * 3) * 0.3;
      camMove(cam, [0.5, 2.0, 6], [0.3, 2.2, 5], [0.2, 1.8, 1.5], [0.3, 2.2, 1.5], p);
    },
  };
}
// Geld fließt von A nach B (Scheine fliegen)
export function flyBills(ctx, scene, n = 14) { ctx.bills = []; for (let i = 0; i < n; i++) { const b = W.bill(); scene.add(b); ctx.bills.push(b); } }
export function updateBills(ctx, t, from, to, speed = 0.9, arc = 1.5) {
  ctx.bills.forEach((b, i) => { const k = (t * speed + i / ctx.bills.length) % 1; b.position.set(lerp(from[0], to[0], k), lerp(from[1], to[1], k) + Math.sin(k * Math.PI) * arc, lerp(from[2], to[2], k)); b.rotation.set(t * 4 + i, t, 0); });
}
