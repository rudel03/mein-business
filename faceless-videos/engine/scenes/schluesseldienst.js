// 008 Schlüsseldienst – Plotwist: Hinter der Tür noch eine Tür … 300 Türen später: Australien.
import * as THREE from 'three';
import * as W from '../world.js';
import { street, towersShot, tipShot } from './_common.js';
const { C, pose, pose2, camMove, clamp01, ease, lerp } = W;

function frontDoor(scene, ctx) {
  street(scene, { houses: false });
  const h = W.house(); h.position.set(1.5, 0, -3.5); scene.add(h);
  ctx.door = W.door(0x6b4a2b, { backing: true }); ctx.door.position.set(0, 0, 0.12); scene.add(ctx.door);
}

export const shots = {
  // Hook: Tür fällt zu, Held ausgesperrt, Schlüsseldienst öffnet blitzschnell
  hook: {
    setup(scene, ctx) { frontDoor(scene, ctx); ctx.hero = W.person(); ctx.hero.position.set(-1.4, 0, 1.6); scene.add(ctx.hero); ctx.ls = W.worker(); ctx.ls.position.set(0.3, 0, 1.0); ctx.ls.rotation.y = Math.PI; scene.add(ctx.ls); ctx.coins = []; for (let i = 0; i < 10; i++) { const c = W.coin(); scene.add(c); ctx.coins.push(c); } },
    update(t, d, cam, ctx) {
      const p = t / d, leaf = ctx.door.userData.leaf;
      leaf.rotation.y = p < 0.15 ? lerp(-1.2, 0, p / 0.15) : p > 0.6 ? lerp(0, -1.4, ease(clamp01((p - 0.6) * 4))) : 0;
      pose.reset(ctx.hero); ctx.hero.rotation.y = 0.5; if (p > 0.15 && p < 0.6) pose.handsOnHead(ctx.hero, 1);
      ctx.ls.visible = p > 0.35; pose.reset(ctx.ls); ctx.ls.userData.armR.rotation.set(-1.3 + Math.sin(t * 20) * 0.1, 0, 0);
      ctx.coins.forEach((c, i) => { const k = clamp01(p * 2.5 - 1.6 - i * 0.04); c.visible = k > 0; c.position.set(-1.4 + Math.sin(i) * 0.3, 1.5 + k * 2, 1.6); c.rotation.x = t * 9; });
      camMove(cam, [-2.5, 2, 6.5], [-1.5, 1.8, 5.5], [-0.3, 1.3, 0.8], [-0.3, 1.4, 0.8], p);
    },
  },
  intro: {
    setup(scene, ctx) { street(scene); ctx.van = W.van(0x2f2f2f); ctx.van.rotation.y = Math.PI / 2; scene.add(ctx.van); },
    update(t, d, cam, ctx) { const p = t / d; ctx.van.position.set(lerp(-20, 3, ease(clamp01(p * 1.3))), 0, 7.5); camMove(cam, [8, 2, 15], [6, 2.5, 13], [0, 1.5, 7], [2, 1.6, 7], p); },
  },
  // Klick: Nahaufnahme, Tür springt auf
  click: {
    setup(scene, ctx) { frontDoor(scene, ctx); ctx.ls = W.worker(); ctx.ls.position.set(-0.6, 0, 0.85); ctx.ls.rotation.y = Math.PI; scene.add(ctx.ls); ctx.clk = W.clock(); ctx.clk.scale.setScalar(0.5); ctx.clk.position.set(-1.2, 2.4, 0.6); scene.add(ctx.clk); },
    update(t, d, cam, ctx) {
      const p = t / d; ctx.clk.userData.mh.rotation.z = -t * 3;
      pose.reset(ctx.ls); ctx.ls.userData.armR.rotation.set(-1.3 + Math.sin(t * 18) * 0.12, 0, 0.2);
      ctx.door.userData.leaf.rotation.y = p > 0.6 ? -1.3 * ease(clamp01((p - 0.6) * 3)) : 0;
      camMove(cam, [2.4, 1.5, 1.3], [2.0, 1.4, 1.1], [0.2, 1.1, 0], [0.1, 1.1, 0], p);
    },
  },
  price: towersShot(30, 54, {}),
  // Nachts um drei: Mond, Uhr, Wagen rast los
  night: {
    setup(scene, ctx) { street(scene); ctx.moon = W.moon(4); ctx.moon.position.set(-14, 30, -40); scene.add(ctx.moon); ctx.clk = W.clock(); ctx.clk.position.set(0, 6, 2); ctx.clk.scale.setScalar(1.4); scene.add(ctx.clk); ctx.van = W.van(0x2f2f2f); ctx.van.rotation.y = Math.PI / 2; scene.add(ctx.van); },
    update(t, d, cam, ctx) {
      const p = t / d; ctx.clk.userData.hh.rotation.z = -Math.PI * 2 * 3 / 12; ctx.clk.userData.mh.rotation.z = -t * 2;
      ctx.van.position.set(lerp(-25, 25, p), 0, 7.5);
      camMove(cam, [0, 4, 20], [0, 5, 18], [0, 4, 2], [0, 5, 2], p);
    },
  },
  // Vermittler: Anruf geht ins Callcenter, Münze wird abgezweigt, dann zum Monteur
  middleman: {
    setup(scene, ctx) {
      street(scene, { houses: false });
      ctx.cc = W.officeBuilding(); ctx.cc.scale.setScalar(0.5); ctx.cc.position.set(0, 0, -3); scene.add(ctx.cc);
      ctx.hero = W.person(); ctx.hero.position.set(-6, 0, 4); ctx.hero.rotation.y = 0.8; scene.add(ctx.hero);
      ctx.ls = W.worker(); ctx.ls.position.set(6, 0, 4); ctx.ls.rotation.y = -0.8; scene.add(ctx.ls);
      ctx.ph = W.phone(); ctx.ph.scale.setScalar(0.6); scene.add(ctx.ph);
      ctx.coins = []; for (let i = 0; i < 6; i++) { const c = W.coin(); scene.add(c); ctx.coins.push(c); }
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      const k = clamp01(p * 2), path = k < 0.5 ? [lerp(-6, 0, k * 2), 3 + Math.sin(k * 2 * Math.PI) * 2, lerp(4, 1, k * 2)] : [lerp(0, 6, (k - 0.5) * 2), 3 + Math.sin((k - 0.5) * 2 * Math.PI) * 2, lerp(1, 4, (k - 0.5) * 2)];
      ctx.ph.position.set(...path); ctx.ph.rotation.z = t * 3;
      ctx.coins.forEach((c, i) => { const q = clamp01(p * 2 - 1 - i * 0.06); c.visible = q > 0; c.position.set(0, 5.5 + q * 2, -0.5); c.rotation.x = t * 8; });
      pose.reset(ctx.hero); pose2.phoneUp(ctx.hero, 1); pose.reset(ctx.ls); pose2.phoneUp(ctx.ls, clamp01(p * 3 - 1.5));
      camMove(cam, [0, 6, 18], [0, 5, 15], [0, 3, 1], [0, 3, 1], p);
    },
  },
  tip: tipShot(),
  court: tipShot(),
  // Twist 1: Tür geht auf – dahinter noch eine Tür
  twist1: {
    setup(scene, ctx) { street(scene, { houses: false }); ctx.door = W.door(); ctx.door.position.set(0, 0, 0.12); scene.add(ctx.door); ctx.d2 = W.door(0x2f6fde); ctx.d2.position.set(0, 0, -0.9); scene.add(ctx.d2); const d3 = W.door(0xe94b3c); d3.position.set(0, 0, -1.9); scene.add(d3); ctx.hero = W.person(); ctx.hero.position.set(-0.8, 0, 2.2); ctx.hero.rotation.y = Math.PI - 0.3; scene.add(ctx.hero); },
    update(t, d, cam, ctx) {
      const p = t / d; ctx.door.userData.leaf.rotation.y = -1.5 * ease(clamp01(p * 2));
      pose.reset(ctx.hero); pose.jawDrop(ctx.hero, clamp01(p * 3 - 1.5));
      camMove(cam, [0.4, 1.7, 4.5], [0.2, 1.5, 2.6], [0, 1.3, 0], [0, 1.3, -0.9], p);
    },
  },
  // Twist 2: Endloser Türen-Tunnel, Flug hindurch, am Ende: Australien (rote Wüste, Palme, Sonne)
  twist2: {
    setup(scene, ctx) {
      scene.add(W.ground(400, 0xd9cfc0));
      const cols = [0x6b4a2b, 0x2f6fde, 0xe94b3c, 0x2ecc71, 0xffd400, 0x9b59b6];
      ctx.doors = []; for (let i = 0; i < 40; i++) { const dr = W.door(cols[i % cols.length]); dr.position.set(0, 0, -i * 1.6); scene.add(dr); ctx.doors.push(dr); }
      const desert = new THREE.Mesh(new THREE.PlaneGeometry(400, 200), W.M(0xd9622b)); desert.rotation.x = -Math.PI / 2; desert.position.set(0, 0.02, -168); scene.add(desert);
      for (const x of [-4, 3, 8]) { const pm = W.palm(); pm.position.set(x, 0, -76 + x); pm.scale.setScalar(1.4); scene.add(pm); }
      ctx.sun = W.ball(6, 0xffd400, 1, { emissive: 0xffb000, emissiveIntensity: 1 }); ctx.sun.position.set(0, 18, -150); scene.add(ctx.sun);
      ctx.bill = W.paper(1.0, 1.4); ctx.bill.scale.set(1, 1, 1); scene.add(ctx.bill);
    },
    update(t, d, cam, ctx) {
      const p = t / d, z = lerp(3, -70, ease(clamp01(p * 1.05)));
      ctx.doors.forEach((dr, i) => { const dz = -i * 1.6; dr.userData.leaf.rotation.y = z < dz + 2.2 ? -1.5 : 0; });
      ctx.bill.position.set(1.3, 1.4, z - 3); ctx.bill.scale.y = 1 + p * 8; ctx.bill.position.y = 0.7 * (1 + p * 8);
      camMove(cam, [0, 1.4, z], [0, 1.5, z], [0, 1.3, z - 5], [0, 1.6, z - 5], p);
    },
  },
};
export const sky = { tip: 'indoor', court: 'indoor', night: 'night', intro: 'night' };
