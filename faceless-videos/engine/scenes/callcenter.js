// 006 Callcenter – Plotwist: Das Callcenter ruft sich selbst an und wird Callcenter des Jahres.
import * as THREE from 'three';
import * as W from '../world.js';
import { street, towersShot, tipShot, flyBills, updateBills } from './_common.js';
const { C, pose, pose2, camMove, clamp01, ease, lerp } = W;

function office(scene, ctx, rows = 3, cols = 4, spacing = 2.4) {
  scene.add(W.ground(300, 0x9aa3ad)); scene.add(W.room(cols * spacing + 6, rows * spacing + 6, 3.4, 0xe8eef3, 0x8f9aa6));
  ctx.agents = []; ctx.desks = [];
  const shirts = [0x3b82f6, 0xe94b3c, 0x22a06b, 0x9b59b6, C.hoodie, 0xff8a1f, 0x2fb5c8, 0xd94f8a];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x = (c - (cols - 1) / 2) * spacing, z = (r - (rows - 1) / 2) * spacing;
    const d = W.desk(); d.position.set(x, 0, z); scene.add(d); ctx.desks.push(d);
    const a = W.person({ shirt: shirts[(r * cols + c) % shirts.length], hat: (r + c) % 2 ? 'hair' : 'cap', hair: [0x3a2a1e, 0xd8b26a, 0x111111][(r + c) % 3] });
    a.position.set(x, 0, z + 0.75); a.rotation.y = Math.PI; W.headset(a); scene.add(a); ctx.agents.push(a);
  }
}
function talk(ctx, t) { ctx.agents.forEach((a, i) => { pose.reset(a); pose2.sit(a); a.userData.armR.rotation.set(-1.0 + Math.sin(t * 3 + i) * 0.3, 0, 0.2); a.userData.head.rotation.y = Math.sin(t * 1.5 + i) * 0.3; }); }

export const shots = {
  hook: {
    setup(scene, ctx) { office(scene, ctx); ctx.coins = []; for (let i = 0; i < 24; i++) { const c = W.coin(); scene.add(c); ctx.coins.push(c); } },
    update(t, d, cam, ctx) {
      const p = t / d; talk(ctx, t);
      ctx.coins.forEach((c, i) => { const a = ctx.agents[i % ctx.agents.length]; const k = (t * 0.8 + i * 0.37) % 1; c.position.set(a.position.x, 2.2 + k * 1.6, a.position.z); c.rotation.set(Math.PI / 2, t * 5, 0); c.visible = k < 0.85; });
      camMove(cam, [-6, 4, 9], [-3, 3.2, 7], [0, 1, 0], [0, 1.1, 0], p);
    },
  },
  intro: {
    setup(scene, ctx) { street(scene, { houses: false }); const b = W.officeBuilding(); b.position.set(0, 0, -4); scene.add(b); ctx.ph = []; for (let i = 0; i < 10; i++) { const p = W.phone(); p.scale.setScalar(0.6); scene.add(p); ctx.ph.push(p); } },
    update(t, d, cam, ctx) {
      const p = t / d;
      ctx.ph.forEach((ph, i) => { const k = (t * 0.5 + i / 10) % 1; ph.position.set(Math.sin(i * 2.1) * 8 * (1 - k), 4 + Math.cos(i) * 3 * (1 - k), 10 - k * 12); ph.rotation.set(t + i, t * 2, 0); });
      camMove(cam, [0, 4, 24], [0, 6, 20], [0, 5, -2], [0, 5.5, -2], p);
    },
  },
  outsource: {
    setup(scene, ctx) {
      street(scene, { houses: false });
      ctx.a = W.officeBuilding(0xf4efe6); ctx.a.scale.setScalar(0.6); ctx.a.position.set(-7, 0, -2); scene.add(ctx.a);
      ctx.b = W.officeBuilding(0xd9dde3); ctx.b.scale.setScalar(0.6); ctx.b.position.set(7, 0, -2); scene.add(ctx.b);
      ctx.ph = []; for (let i = 0; i < 8; i++) { const ph = W.phone(); ph.scale.setScalar(0.5); scene.add(ph); ctx.ph.push(ph); }
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      ctx.ph.forEach((ph, i) => { const k = (t * 0.6 + i / 8) % 1; ph.position.set(lerp(-6, 6, k), 5 + Math.sin(k * Math.PI) * 4, 1); ph.rotation.z = t * 3; });
      camMove(cam, [0, 7, 26], [0, 8, 22], [0, 4, 0], [0, 4.5, 0], p);
    },
  },
  perMinute: {
    setup(scene, ctx) { office(scene, ctx, 1, 1); ctx.clk = W.clock(); ctx.clk.position.set(0, 2.6, -0.6); scene.add(ctx.clk); ctx.coins = []; for (let i = 0; i < 16; i++) { const c = W.coin(); scene.add(c); ctx.coins.push(c); } ctx.tw = W.coinTower(30); ctx.tw.position.set(1.4, 0.78, 0); ctx.tw.scale.setScalar(0.6); scene.add(ctx.tw); },
    update(t, d, cam, ctx) {
      const p = t / d; talk(ctx, t);
      ctx.clk.userData.mh.rotation.z = -t * 6;
      ctx.tw.count = Math.round(30 * clamp01(p * 1.1));
      camMove(cam, [-2.4, 2.0, 3.6], [-1.6, 1.9, 2.9], [0.3, 1.6, 0], [0.5, 1.6, 0], p);
    },
  },
  perHour: towersShot(35, 0, { setting: 'room', scale: 1.4 }),
  wage: towersShot(35, 14, { setting: 'room', scale: 1.4 }),
  mass: {
    setup(scene, ctx) { office(scene, ctx, 6, 6, 2.3); },
    update(t, d, cam, ctx) {
      const p = t / d; talk(ctx, t);
      ctx.desks.forEach((dk, i) => dk.userData.screen.material = W.M(Math.floor(t * 2 + i) % 3 ? 0x3fa7ff : 0x2ecc71, { emissive: Math.floor(t * 2 + i) % 3 ? 0x3fa7ff : 0x2ecc71, emissiveIntensity: 0.6 }));
      camMove(cam, [0, 18, 6], [0, 14, 2], [0, 0, 0], [0, 0, -1], p);
    },
  },
  commission: {
    setup(scene, ctx) { office(scene, ctx, 1, 1); ctx.coins = []; for (let i = 0; i < 6; i++) { const c = W.coin(); c.scale.setScalar(0.8); scene.add(c); ctx.coins.push(c); } },
    update(t, d, cam, ctx) {
      const p = t / d; talk(ctx, t);
      const a = ctx.agents[0]; if (p > 0.5) { pose.armsUp(a, 1, t); a.userData.hip.position.y = 0.95 + Math.abs(Math.sin(t * 8)) * 0.2; }
      ctx.coins.forEach((c, i) => { const k = clamp01(p * 2 - 0.9 - i * 0.08); c.visible = k > 0; c.position.set(Math.sin(i * 1.1) * 1.2, 2.2 + Math.sin(k * Math.PI) * 1.2, 0.2 - k); c.rotation.x = t * 9; });
      camMove(cam, [1.6, 1.9, 3.8], [1.0, 1.8, 3.2], [0, 1.5, 0.7], [0, 1.6, 0.7], p);
    },
  },
  tip: tipShot(),
  // Twist 1: Mitarbeiter wählt – das Telefon am Nachbartisch klingelt
  twist1: {
    setup(scene, ctx) { office(scene, ctx, 1, 2, 2.4); ctx.ring = W.ball(0.15, C.red, 1, { emissive: C.red, emissiveIntensity: 1 }); scene.add(ctx.ring); },
    update(t, d, cam, ctx) {
      const p = t / d; talk(ctx, t);
      const [a, b] = ctx.agents; a.userData.armR.rotation.set(-1.4, 0, 0.1);
      if (p > 0.5) { b.userData.head.rotation.y = -0.9; b.userData.hip.position.y = 0.55 + Math.abs(Math.sin(t * 25)) * 0.03; }
      ctx.ring.visible = p > 0.5 && Math.floor(t * 6) % 2 === 0; ctx.ring.position.set(b.position.x, 2.4, b.position.z);
      camMove(cam, [0, 2.4, 5.5], [0, 2.2, 4.8], [0, 1.3, 0.7], [0, 1.3, 0.7], p);
    },
  },
  // Twist 2: Vertragsberg wächst bis zur Decke, Pokal landet
  twist2: {
    setup(scene, ctx) {
      office(scene, ctx, 2, 3, 2.4);
      ctx.stacks = ctx.desks.map(dk => { const s = W.contractStack(120); s.position.set(dk.position.x + 0.3, 0.78, dk.position.z); scene.add(s); return s; });
      ctx.tro = W.trophy(); ctx.tro.scale.setScalar(2); scene.add(ctx.tro);
      ctx.conf = []; for (let i = 0; i < 40; i++) { const c = W.box(0.12, 0.02, 0.08, [0xffd400, C.red, 0x2ecc71, 0x3b82f6][i % 4]); c.castShadow = false; scene.add(c); ctx.conf.push(c); }
    },
    update(t, d, cam, ctx) {
      const p = t / d; talk(ctx, t);
      ctx.stacks.forEach((s, i) => s.count = Math.round(120 * ease(clamp01(p * 1.6 - i * 0.05))));
      const k = ease(clamp01((p - 0.6) / 0.3)); ctx.tro.position.set(0, lerp(8, 0, k), 3.2); ctx.tro.rotation.y = t;
      ctx.conf.forEach((c, i) => { const q = (t * 0.4 + i / 40) % 1; c.visible = p > 0.7; c.position.set(Math.sin(i * 7) * 5, 3.3 - q * 3.3, Math.cos(i * 3) * 3 + 1); c.rotation.set(t * 5 + i, i, t * 3); });
      camMove(cam, [0, 3, 9], [0, 3.6, 10], [0, 1.6, 0], [0, 2.2, 1], p);
    },
  },
};
export const sky = { hook: 'indoor', perMinute: 'indoor', perHour: 'indoor', wage: 'indoor', mass: 'indoor', commission: 'indoor', tip: 'indoor', twist1: 'indoor', twist2: 'indoor' };
