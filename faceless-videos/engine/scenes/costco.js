// Szenen für "Wie verdient Costco Geld?". Jede Szene: setup(scene, ctx) baut auf, update(t, d, cam, ctx) animiert.
// t = Sekunden seit Szenenstart, d = Szenendauer (kommt aus der Sprecherzeile).
import * as THREE from 'three';
import * as W from '../world.js';
const { C, pose, camMove, clamp01, ease, lerp } = W;

function lot(scene, { cars = true } = {}) {
  scene.add(W.ground());
  const pl = W.parkingLot(70, 46); pl.position.z = 8; scene.add(pl);
  const wh = W.warehouse(); wh.position.z = -30; scene.add(wh);
  if (cars) {
    const cols = [0x3b82f6, 0xe94b3c, 0xf5f5f5, 0x2f2f2f, 0xf5c542, 0x22a06b];
    let k = 0;
    for (const row of [-14, 14]) for (let x = -30; x <= 30; x += 6.4) {
      if ((k * 7) % 5 === 0) { k++; continue; }
      const c = W.car(cols[k++ % cols.length]); c.position.set(x, 0, 8 + row + (row < 0 ? 2.5 : -2.5)); scene.add(c);
    }
  }
  for (let x = -60; x <= 60; x += 12) { const t = W.tree(1.4); t.position.set(x, 0, -48); scene.add(t); }
  for (let x = -36; x <= 36; x += 9) { const b = W.bush(1.2); b.position.set(x, 0, 33); scene.add(b); }
  return wh;
}

export const shots = {
  // Held läuft über den Parkplatz zum riesigen Laden
  approach: {
    setup(scene, ctx) {
      lot(scene);
      ctx.hero = W.person(); ctx.hero.rotation.y = Math.PI; scene.add(ctx.hero);
    },
    update(t, d, cam, ctx) {
      const z = lerp(22, 2, t / d);
      ctx.hero.position.set(0, 0, z); pose.walk(ctx.hero, t);
      camMove(cam, [1.0, 2.0, z + 5.5], [0.8, 3.2, z + 7.0], [0, 1.4, z - 4], [0, 4, z - 20], t / d);
    },
  },
  // Wachmann stoppt ihn, Scanner rot, Held verzweifelt
  gate: {
    setup(scene, ctx) {
      scene.add(W.ground(400, C.sidewalk));
      const wh = W.warehouse(); wh.position.z = -16; scene.add(wh);
      ctx.ts = []; for (const x of [-2, 0, 2]) { const s = W.turnstile(); s.position.set(x, 0, 0); scene.add(s); ctx.ts.push(s); }
      ctx.guard = W.person({ shirt: C.guard, pants: 0x1a2238, cap: C.guard, hat: 'police' });
      ctx.guard.position.set(-0.2, 0, -1.2); ctx.guard.rotation.y = 0.35; scene.add(ctx.guard);
      ctx.hero = W.person(); ctx.hero.position.set(1.3, 0, 2.2); ctx.hero.rotation.y = Math.PI - 0.3; scene.add(ctx.hero);
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      pose.reset(ctx.hero); pose.reset(ctx.guard);
      const blink = Math.floor(t * 4) % 2 === 0;
      W.setLight(ctx.ts[1], p > 0.25 ? blink : true, p > 0.25 ? C.red : C.green);
      if (p < 0.25) { pose.walk(ctx.hero, t); ctx.hero.position.z = lerp(3.4, 1.6, p / 0.25); }
      pose.stop(ctx.guard, clamp01((p - 0.15) * 5));
      if (p > 0.45) pose.handsOnHead(ctx.hero, clamp01((p - 0.45) * 6));
      if (p < 0.5) camMove(cam, [-1.2, 2.4, 8.5], [-0.4, 2.1, 7.0], [0.8, 1.3, 0], [1, 1.4, 0], p * 2);
      else camMove(cam, [1.2, 1.7, -0.6], [1.0, 1.75, -0.2], [1, 1.75, 2.2], [1, 1.8, 2.2], (p - 0.5) * 2);
    },
  },
  // Im Laden: Wagen schieben, eine Münze fällt in die leere Kasse
  inside: {
    setup(scene, ctx) {
      scene.add(W.ground(200, 0xcfd3d8));
      for (const z of [-7, 4.5]) { const s = W.shelfRow(40, z + 9); s.position.set(0, 0, z); scene.add(s); }
      ctx.hero = W.person(); scene.add(ctx.hero);
      ctx.cart = W.cart(); scene.add(ctx.cart);
      ctx.reg = W.register(); ctx.reg.position.set(14, 0, 0); ctx.reg.rotation.y = 0; scene.add(ctx.reg);
      ctx.coin = W.coin(); scene.add(ctx.coin);
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      if (p < 0.55) {
        const x = lerp(-12, 4, p / 0.55);
        ctx.hero.position.set(x - 1.6, 0, 0); ctx.hero.rotation.y = Math.PI / 2; pose.reset(ctx.hero); pose.walk(ctx.hero, t, 0.8); pose.push(ctx.hero);
        ctx.cart.position.set(x, 0, 0); ctx.cart.rotation.y = Math.PI / 2;
        camMove(cam, [x - 6.5, 2.0, 2.0], [x - 5.5, 1.8, 1.6], [x, 1.1, 0], [x + 1, 1.1, 0], p / 0.55);
        ctx.coin.visible = false;
      } else {
        const q = (p - 0.55) / 0.45;
        ctx.coin.visible = true;
        const fall = clamp01(q * 2.2);
        ctx.coin.position.set(13.4, lerp(3.2, 1.17, ease(fall)), 0); ctx.coin.rotation.x = fall < 1 ? t * 12 : 0;
        camMove(cam, [12.2, 2.6, 2.4], [12.6, 2.2, 1.6], [13.4, 1.2, 0], [13.4, 1.15, 0], q);
      }
    },
  },
  // Menschenmenge hält Karten hoch, Karten fliegen ins Gebäude
  cards: {
    setup(scene, ctx) {
      lot(scene, { cars: false });
      ctx.crowd = [];
      const shirts = [0x3b82f6, 0xe94b3c, 0x22a06b, 0xf5f5f5, 0x9b59b6, C.hoodie, 0xff8a1f];
      for (let i = 0; i < 70; i++) {
        const p = W.person({ shirt: shirts[i % shirts.length], hat: i % 3 === 0 ? 'cap' : 'hair', cap: shirts[(i + 3) % shirts.length] });
        p.position.set((i % 10) * 2.2 - 10, 0, -10 + Math.floor(i / 10) * 2.4 + (i % 2) * 0.6);
        p.rotation.y = Math.PI + (Math.sin(i) * 0.3);
        const c = W.card(true); c.position.set(0, 0.95, 0); p.userData.armR.add(c); c.position.y = -0.85; c.rotation.x = Math.PI / 2;
        p.userData.card = c; scene.add(p); ctx.crowd.push(p);
      }
      ctx.fly = [];
      for (let i = 0; i < 40; i++) { const c = W.card(true); c.scale.setScalar(1.6); scene.add(c); ctx.fly.push(c); }
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      ctx.crowd.forEach((c, i) => { pose.reset(c); pose.holdUp(c, clamp01(p * 4 - (i % 10) * 0.05), t + i); });
      ctx.fly.forEach((c, i) => {
        const k = clamp01(p * 1.6 - (i / 40) * 0.6 - 0.2);
        c.visible = k > 0 && k < 1;
        c.position.set(lerp((i % 10) * 2.2 - 10, (i % 5) * 3 - 6, k), lerp(3, 16, k) + Math.sin(k * Math.PI) * 6, lerp(-6 + (i % 4), -24, k));
        c.rotation.set(t * 3 + i, t * 2, 0);
      });
      camMove(cam, [0, 22, 26], [0, 15, 16], [0, 1, -8], [0, 5, -18], p);
    },
  },
  // Zwei Münztürme: Mitgliedsbeiträge (5,9) vs. Gewinn (9,2)
  towers: {
    setup(scene, ctx) {
      lot(scene, { cars: false });
      ctx.a = W.coinTower(59); ctx.a.position.set(-1.6, 0, -4); ctx.a.scale.setScalar(1.6); scene.add(ctx.a);
      ctx.b = W.coinTower(92); ctx.b.position.set(1.6, 0, -4); ctx.b.scale.setScalar(1.6); scene.add(ctx.b);
      ctx.hero = W.person(); ctx.hero.position.set(0, 0, 3); ctx.hero.rotation.y = Math.PI; scene.add(ctx.hero);
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      ctx.a.count = Math.round(59 * ease(clamp01(p * 2.2)));
      ctx.b.count = Math.round(92 * ease(clamp01(p * 2.2 - 0.9)));
      pose.reset(ctx.hero); pose.idle(ctx.hero, t); ctx.hero.userData.head.rotation.x = -0.5 * clamp01(p * 2);
      camMove(cam, [0, 4, 20], [0, 9, 34], [0, 5, -4], [0, 11, -4], p);
    },
  },
  // Reaktion: Kinnlade fällt
  shock: {
    setup(scene, ctx) {
      lot(scene, { cars: false });
      ctx.tw = W.coinTower(59); ctx.tw.count = 59; ctx.tw.scale.setScalar(2.2); ctx.tw.position.set(0, 0, -6); scene.add(ctx.tw);
      ctx.hero = W.person(); ctx.hero.position.set(0, 0, 2); scene.add(ctx.hero);
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      pose.reset(ctx.hero); pose.jawDrop(ctx.hero, clamp01(p * 3)); pose.shrug(ctx.hero, clamp01(p * 2 - 0.6));
      camMove(cam, [0.6, 1.9, 5.2], [0.3, 2.05, 3.6], [0, 1.95, 2], [0, 2.05, 2], p);
    },
  },
  // 10 Leute, 9 verlängern (Karte leuchtet grün), einer geht
  renew: {
    setup(scene, ctx) {
      scene.add(W.ground(200, 0xcfd3d8));
      const s = W.shelfRow(40, 3); s.position.set(0, 0, -6); scene.add(s);
      ctx.row = [];
      const shirts = [0x3b82f6, 0xe94b3c, 0x22a06b, 0xf5f5f5, 0x9b59b6, C.hoodie, 0xff8a1f, 0x2fb5c8, 0xd94f8a, 0x777777];
      for (let i = 0; i < 10; i++) {
        const p = W.person({ shirt: shirts[i], hat: i % 2 ? 'hair' : 'cap', hair: [0x3a2a1e, 0xd8b26a, 0x111111][i % 3] });
        p.position.set(i * 1.3 - 5.85, 0, 0); scene.add(p);
        const c = W.card(i !== 7); c.position.y = -0.85; c.rotation.x = Math.PI / 2; p.userData.armR.add(c);
        p.userData.card = c; ctx.row.push(p);
      }
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      ctx.row.forEach((r, i) => {
        pose.reset(r);
        if (i === 7) { r.rotation.y = p > 0.35 ? -Math.PI / 2 : 0; if (p > 0.35) { r.position.x = 3.25 + (p - 0.35) * 14; pose.walk(r, t); } r.userData.card.visible = false; }
        else pose.holdUp(r, clamp01(p * 3 - i * 0.08), t + i);
      });
      camMove(cam, [-1, 1.8, 11], [1, 2.2, 9], [0, 1.6, 0], [0.5, 1.8, 0], p);
    },
  },
  // Chips am Angelhaken = Köder; Held greift zu und wird hochgezogen
  bait: {
    setup(scene, ctx) {
      scene.add(W.ground(200, 0xcfd3d8));
      for (const z of [-9, 8]) { const s = W.shelfRow(40, z + 4); s.position.set(0, 0, z); scene.add(s); }
      ctx.hook = W.hook(10); scene.add(ctx.hook);
      ctx.bag = W.chipBag(); scene.add(ctx.bag);
      ctx.hero = W.person(); ctx.hero.position.set(0, 0, 1.6); ctx.hero.rotation.y = Math.PI; scene.add(ctx.hero);
    },
    update(t, d, cam, ctx) {
      const p = t / d;
      const lift = p > 0.6 ? ease(clamp01((p - 0.6) / 0.4)) * 5 : 0;
      const sway = Math.sin(t * 2.5) * 0.12;
      ctx.hook.position.set(sway, 2.5 + lift, 0);
      ctx.bag.position.set(sway, 1.9 + lift, 0.05); ctx.bag.rotation.z = sway * 0.6;
      pose.reset(ctx.hero);
      if (p > 0.4) { ctx.hero.userData.armL.rotation.x = -2.6; ctx.hero.userData.armR.rotation.x = -2.6; ctx.hero.position.set(sway, lift * 0.95, 0.75); }
      else { pose.walk(ctx.hero, t, 0.6); ctx.hero.position.set(0, 0, lerp(3, 0.75, p / 0.4)); }
      if (p < 0.4) camMove(cam, [2.5, 1.8, 6], [1.2, 1.9, 4.5], [0, 1.8, 0], [0, 2, 0], p / 0.4);
      else camMove(cam, [0.4, 2.0, 4.2], [0.3, 4.6, 6.5], [0, 2.2, 0], [0, 5.6, 0], (p - 0.4) / 0.6);
    },
  },
};

export const sky = { inside: 'indoor', renew: 'indoor', bait: 'indoor' };
