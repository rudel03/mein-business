// 007 Folierer – Plotwist: Er foliert alles. Am Ende den Mond. In Chrom.
import * as THREE from 'three';
import * as W from '../world.js';
import { street, towersShot, tipShot } from './_common.js';
const { C, pose, pose2, camMove, clamp01, ease, lerp } = W;

function workshop(scene, ctx) {
  scene.add(W.ground(300, 0x8f9aa6)); scene.add(W.room(14, 10, 4, 0xdfe3e8, 0x6b7380));
  for (const x of [-5, 5]) { const l = W.box(3, 0.1, 0.4, 0xffffff, { emissive: 0xffffff, emissiveIntensity: 0.8 }); l.position.set(x, 3.9, 0); scene.add(l); }
  const rack = new THREE.Group(); [0x7b2ff7, 0xff3b3b, 0x2ecc71, 0x111111, 0xffd400].forEach((c, i) => { const r = W.foilRoll(c); r.position.set(0, 0.6 + i * 0.55, 0); rack.add(r); });
  rack.position.set(-5.5, 0, -3.5); scene.add(rack);
}
function paintCar(car, color) { car.children.forEach((m, i) => { if (m.isMesh && i < 2) m.material = W.M(color); }); }

export const shots = {
  // Hook: Auto wechselt Farbe in Wellen
  hook: {
    setup(scene, ctx) { workshop(scene, ctx); ctx.car = W.car(0x8a939c); ctx.car.scale.setScalar(1.3); ctx.car.rotation.y = 0.6; scene.add(ctx.car); ctx.w = W.worker(); ctx.w.position.set(2.2, 0, 1.5); ctx.w.rotation.y = -1.2; scene.add(ctx.w); },
    update(t, d, cam, ctx) {
      const p = t / d, cols = [0x8a939c, 0x7b2ff7, 0x111111, 0xff3b3b, 0x2ecc71, 0xffd400];
      paintCar(ctx.car, cols[Math.min(cols.length - 1, Math.floor(p * cols.length))]);
      pose.reset(ctx.w); pose.armsUp(ctx.w, clamp01(p * 3 - 2), t);
      camMove(cam, [-4, 2.2, 7], [-2, 1.8, 6], [0, 0.9, 0], [0, 1.0, 0], p);
    },
  },
  intro: {
    setup(scene, ctx) { street(scene, { houses: false }); const ws = W.warehouse(18, 6, 12); ws.position.set(0, 0, -6); scene.add(ws); ctx.car = W.car(0x7b2ff7); ctx.car.rotation.y = Math.PI / 2; scene.add(ctx.car); },
    update(t, d, cam, ctx) { const p = t / d; ctx.car.position.set(lerp(-14, 0, ease(clamp01(p * 1.4))), 0, 7); camMove(cam, [5, 2, 15], [3, 3, 13], [0, 2, 4], [0, 2.5, 2], p); },
  },
  price: towersShot(50, 0, { setting: 'room', scale: 1.2 }),
  // Folie rollt ab
  foil: {
    setup(scene, ctx) { workshop(scene, ctx); ctx.roll = W.foilRoll(0x7b2ff7); ctx.roll.scale.setScalar(2); ctx.roll.position.set(0, 1.2, 0); scene.add(ctx.roll); ctx.sheet = W.box(2.9, 0.01, 1, 0x7b2ff7, { emissive: 0x7b2ff7, emissiveIntensity: 0.2 }); scene.add(ctx.sheet); },
    update(t, d, cam, ctx) {
      const p = t / d, len = ease(clamp01(p)) * 6;
      ctx.roll.rotation.x = -t * 3; ctx.sheet.scale.z = Math.max(0.01, len); ctx.sheet.position.set(0, 0.73, 0.5 + len / 2 * 1);
      camMove(cam, [3, 3, 5], [2.4, 2.4, 6.5], [0, 0.9, 1], [0, 0.6, 2.5], p);
    },
  },
  // Arbeit: Föhn + Auto wird Stück für Stück lila
  work: {
    setup(scene, ctx) { workshop(scene, ctx); ctx.car = W.car(0x8a939c); ctx.car.scale.setScalar(1.3); scene.add(ctx.car); ctx.w = W.worker(); scene.add(ctx.w); ctx.gun = W.heatGun(); ctx.w.userData.armR.add(ctx.gun); ctx.gun.position.set(0, -0.7, 0.2); },
    update(t, d, cam, ctx) {
      const p = t / d; const parts = ctx.car.children.filter(m => m.isMesh);
      parts.forEach((m, i) => { if (i < 2) m.material = W.M(i / 2 < p * 1.6 ? 0x7b2ff7 : 0x8a939c); });
      ctx.w.position.set(lerp(-2.2, 2.2, p), 0, 2.0); ctx.w.rotation.y = Math.PI; pose.reset(ctx.w); ctx.w.userData.armR.rotation.set(-1.4 + Math.sin(t * 6) * 0.2, 0, 0);
      camMove(cam, [4, 2, 6], [-3, 2, 6], [0, 1, 0], [0, 1, 0], p);
    },
  },
  // Firmenflotte: Reihe Transporter wird nacheinander orange
  fleet: {
    setup(scene, ctx) { scene.add(W.ground(300, C.asphalt)); ctx.vans = []; for (let i = 0; i < 6; i++) { const v = W.van(0xf2f2f2); v.position.set(-10 + i * 4, 0, 0); scene.add(v); ctx.vans.push(v); } },
    update(t, d, cam, ctx) {
      const p = t / d;
      ctx.vans.forEach((v, i) => { const on = p * 7 > i; v.children[0].material = W.M(on ? 0xff8a1f : 0xf2f2f2); v.children[1].material = W.M(on ? 0xff8a1f : 0xf2f2f2); });
      camMove(cam, [-14, 5, 12], [8, 5, 12], [-8, 1.5, 0], [8, 1.5, 0], p);
    },
  },
  // Extras: Scheiben werden dunkel
  extras: {
    setup(scene, ctx) { workshop(scene, ctx); ctx.car = W.car(0x7b2ff7); ctx.car.scale.setScalar(1.5); ctx.car.rotation.y = -0.5; scene.add(ctx.car); },
    update(t, d, cam, ctx) { const p = t / d; ctx.car.children[2].material = W.M(p > 0.35 ? 0x050505 : 0x7fb6e6); camMove(cam, [-5.5, 2.2, 8], [-4.6, 2.3, 7], [0, 1.4, 0], [0, 1.6, 0], p); },
  },
  // Schutz: Steine prallen ab
  protect: {
    setup(scene, ctx) { street(scene, { houses: false }); ctx.car = W.car(0x7b2ff7); ctx.car.rotation.y = Math.PI / 2; ctx.car.position.set(0, 0, 7); scene.add(ctx.car); ctx.st = []; for (let i = 0; i < 10; i++) { const s = W.ball(0.12, 0x777777, 0); scene.add(s); ctx.st.push(s); } ctx.shield = W.box(4.2, 1.6, 2.2, 0x9fffd0, { transparent: true, opacity: 0.18, emissive: 0x2ecc71, emissiveIntensity: 0.4 }); ctx.shield.castShadow = false; ctx.shield.position.set(0, 1.0, 7); ctx.shield.rotation.y = Math.PI / 2; scene.add(ctx.shield); },
    update(t, d, cam, ctx) {
      const p = t / d; ctx.shield.visible = p > 0.3;
      ctx.st.forEach((s, i) => { const k = (t * 1.2 + i / 10) % 1; const hit = 0.5; const x = k < hit ? lerp(8, 2.2, k / hit) : lerp(2.2, 6, (k - hit) / (1 - hit)); s.position.set(x, 1.0 + Math.sin(i) * 0.3 + (k > hit ? (k - hit) * 3 : 0), 7 + Math.cos(i * 3) * 0.6); });
      camMove(cam, [6, 2, 12], [5, 1.8, 11], [1, 1, 7], [1.5, 1, 7], p);
    },
  },
  tip: tipShot(),
  // Twist 1: Folierer schaut sich gierig um, Föhn in der Hand
  twist1: {
    setup(scene, ctx) { workshop(scene, ctx); ctx.w = W.worker(); ctx.w.position.set(0, 0, 1); scene.add(ctx.w); ctx.gun = W.heatGun(); ctx.w.userData.armR.add(ctx.gun); ctx.gun.position.set(0, -0.7, 0.2); },
    update(t, d, cam, ctx) {
      const p = t / d; pose.reset(ctx.w); ctx.w.userData.armR.rotation.set(-1.5, 0, 0); ctx.w.userData.head.rotation.y = Math.sin(t * 2.5) * 0.8;
      camMove(cam, [0.4, 1.9, 3.6], [0.2, 1.85, 2.8], [0, 1.9, 1], [0, 1.9, 1], p);
    },
  },
  // Twist 2: Werkstatt -> Straße -> Kunde -> Mond werden Chrom
  twist2: {
    setup(scene, ctx) {
      street(scene); ctx.ws = W.warehouse(18, 6, 12); ctx.ws.position.set(-18, 0, -8); scene.add(ctx.ws);
      ctx.hero = W.person(); ctx.hero.position.set(2, 0, 5); scene.add(ctx.hero);
      ctx.car = W.car(0x7b2ff7); ctx.car.position.set(-3, 0, 7.5); ctx.car.rotation.y = Math.PI / 2; scene.add(ctx.car);
      ctx.moon = W.moon(7); ctx.moon.position.set(10, 38, -60); scene.add(ctx.moon);
      ctx.stage = 0; ctx.scene = scene;
    },
    update(t, d, cam, ctx) {
      const p = t / d, R = ctx.scene.userData.renderer;
      const want = Math.floor(p * 5);
      while (ctx.stage < want) {
        ctx.stage++;
        if (ctx.stage === 1) { W.chromeify(ctx.ws, ctx.scene, R); W.chromeify(ctx.car, ctx.scene, R); }
        if (ctx.stage === 2) ctx.scene.children.filter(o => o.isMesh && o.geometry.type === 'PlaneGeometry').forEach(o => W.chromeify(o, ctx.scene, R));
        if (ctx.stage === 3) ctx.scene.children.filter(o => o.isGroup && o !== ctx.moon).forEach(o => W.chromeify(o, ctx.scene, R));
        if (ctx.stage === 4) W.chromeify(ctx.moon, ctx.scene, R);
      }
      pose.reset(ctx.hero); pose.armsUp(ctx.hero, clamp01(p * 3), t);
      if (p < 0.6) camMove(cam, [8, 3, 18], [6, 5, 16], [-4, 2, 0], [0, 4, 0], p / 0.6);
      else camMove(cam, [6, 5, 16], [4, 8, 14], [0, 4, 0], [10, 38, -60], (p - 0.6) / 0.4);
    },
  },
};
export const sky = { hook: 'indoor', price: 'indoor', foil: 'indoor', work: 'indoor', extras: 'indoor', tip: 'indoor', twist1: 'indoor' };
