// Low-Poly-Baukasten für Faceless-Shorts (Three.js). Alles aus Grundformen, keine Texturen, keine Logos.
import * as THREE from 'three';

export const C = {
  grass: 0x5cc93a, grassDark: 0x3fae2a, asphalt: 0x4a4f57, sidewalk: 0xc9c6bd, line: 0xf4f1e8,
  wall: 0xe9e4da, roof: 0x5b6270, stripe: 0xff8a1f, glass: 0x2b3a4a,
  skin: 0xffd2b0, hoodie: 0xffcf1a, pants: 0x5a5f6b, cap: 0x1d1f24, shoe: 0xffffff,
  guard: 0x23314f, gold: 0xffc93c, card: 0xfafafa, cardGlow: 0x7dffb0, red: 0xff3b3b, green: 0x3bff7a,
  shelf: 0xff7a1a, board: 0x9aa3ad, trunk: 0x8a5a33, leaf: 0x4fae3b,
};

const matCache = new Map();
export function M(color, opts = {}) {
  const key = color + JSON.stringify(opts);
  if (!matCache.has(key)) {
    matCache.set(key, new THREE.MeshLambertMaterial({ color, flatShading: true, ...opts }));
  }
  return matCache.get(key);
}

export function box(w, h, d, color, opts) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), M(color, opts));
  m.castShadow = true; m.receiveShadow = true; return m;
}
export function cyl(rt, rb, h, color, seg = 10, opts) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), M(color, opts));
  m.castShadow = true; m.receiveShadow = true; return m;
}
export function ball(r, color, detail = 1, opts) {
  const m = new THREE.Mesh(new THREE.IcosahedronGeometry(r, detail), M(color, opts));
  m.castShadow = true; m.receiveShadow = true; return m;
}
const at = (o, x, y, z) => (o.position.set(x, y, z), o);

// ---------- Umgebung ----------
export function setupWorld(scene, renderer, { sky = 'sunset' } = {}) {
  scene.userData.renderer = renderer;
  const cv = document.createElement('canvas'); cv.width = 4; cv.height = 256;
  const g = cv.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 256);
  if (sky === 'indoor') { gr.addColorStop(0, '#d9dde3'); gr.addColorStop(1, '#f2efe8'); }
  else if (sky === 'underwater') { gr.addColorStop(0, '#2fa6c9'); gr.addColorStop(1, '#0b3a52'); }
  else if (sky === 'night') { gr.addColorStop(0, '#0b1030'); gr.addColorStop(1, '#2a3570'); }
  else if (sky === 'day') { gr.addColorStop(0, '#4f7fc4'); gr.addColorStop(0.6, '#a9c6e6'); gr.addColorStop(1, '#e9eef0'); }
  else { gr.addColorStop(0, '#5a4f9e'); gr.addColorStop(0.45, '#c98aa8'); gr.addColorStop(0.75, '#f3b38a'); gr.addColorStop(1, '#ffd9a0'); }
  g.fillStyle = gr; g.fillRect(0, 0, 4, 256);
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
  scene.background = tex;
  const fogCol = { underwater: 0x1d6f8c, indoor: 0xe8e6e0, night: 0x2a3570, day: 0xdfe7ee }[sky] || 0xf0b892;
  scene.fog = sky === 'underwater' ? new THREE.Fog(fogCol, 4, 26) : new THREE.Fog(fogCol, 45, sky === 'indoor' ? 190 : 230);
  scene.add(sky === 'night' ? new THREE.HemisphereLight(0x7f8fd6, 0x2a2a3a, 1.3) : new THREE.HemisphereLight(0xfff1dc, 0x6a7a5a, sky === 'indoor' ? 2.2 : 1.9));
  const sun = new THREE.DirectionalLight(sky === 'night' ? 0x9fb4ff : sky === 'indoor' ? 0xffffff : 0xffd2a0, sky === 'night' ? 1.0 : sky === 'indoor' ? 1.8 : 2.8);
  sun.position.set(-30, 40, 25); sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -45, right: 45, top: 45, bottom: -45, near: 1, far: 140 });
  sun.shadow.bias = -0.0005;
  scene.add(sun); scene.add(sun.target);
  scene.userData.tickers = [];
  if (sky === 'night') { const sg = new THREE.BufferGeometry(); const sp = []; for (let i = 0; i < 500; i++) { const th = Math.random() * Math.PI * 2, ph = Math.random() * 1.2; sp.push(Math.cos(th) * Math.cos(ph) * 300, 40 + Math.sin(ph) * 260, Math.sin(th) * Math.cos(ph) * 300); }
    sg.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3)); scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 1.2, sizeAttenuation: false, fog: false }))); }
  if (sky === 'sunset' || sky === 'day') { // Sonnenscheibe + Horizont-Landschaft + Wolken -> Tiefe & Atmosphäre
    const disc = new THREE.Mesh(new THREE.CircleGeometry(16, 32), new THREE.MeshBasicMaterial({ color: sky === 'day' ? 0xfffbe8 : 0xfff0c8, fog: false }));
    disc.position.set(-120, 38, -330); disc.lookAt(0, 0, 0); scene.add(disc);
    const halo = new THREE.Mesh(new THREE.CircleGeometry(40, 32), new THREE.MeshBasicMaterial({ color: 0xffd6a0, transparent: true, opacity: 0.25, fog: false }));
    halo.position.set(-119, 38, -329); halo.lookAt(0, 0, 0); scene.add(halo);
    let r = 11; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
    for (let i = 0; i < 26; i++) { // ferne Hügel/Felder am Horizont
      const a = (i / 26) * Math.PI * 2, d = 230 + rnd() * 60;
      const hill = new THREE.Mesh(new THREE.SphereGeometry(30 + rnd() * 30, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), M([0x7fa65a, 0x9bb86a, 0x6f9a52][i % 3]));
      hill.scale.y = 0.25 + rnd() * 0.2; hill.position.set(Math.cos(a) * d, -2, Math.sin(a) * d); scene.add(hill);
    }
    const clouds = [];
    for (let i = 0; i < 9; i++) { const c = cloud(); c.position.set(-160 + i * 40 + rnd() * 20, 45 + rnd() * 25, -150 - rnd() * 120); c.scale.setScalar(2 + rnd() * 2.5); scene.add(c); clouds.push(c); }
    scene.userData.tickers.push((t) => clouds.forEach((c, i) => { c.position.x += 0.02 + i * 0.002; }));
  }
  return { sun };
}

export function ground(size = 400, color = C.grass) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), M(color));
  m.rotation.x = -Math.PI / 2; m.receiveShadow = true; return m;
}

export function parkingLot(w = 60, d = 50) {
  const g = new THREE.Group();
  const a = new THREE.Mesh(new THREE.PlaneGeometry(w, d), M(C.asphalt));
  a.rotation.x = -Math.PI / 2; a.position.y = 0.02; a.receiveShadow = true; g.add(a);
  for (let row = -1; row <= 1; row++) {
    for (let i = -w / 2 + 4; i < w / 2 - 2; i += 3.2) {
      const l = box(0.12, 0.02, 5, C.line); l.castShadow = false; at(l, i, 0.04, row * 14); g.add(l);
    }
  }
  return g;
}

export function tree(s = 1) {
  const g = new THREE.Group();
  g.add(at(cyl(0.18 * s, 0.25 * s, 1.6 * s, C.trunk, 6), 0, 0.8 * s, 0));
  const top = ball(1.2 * s, C.leaf, 0); top.position.y = 2.3 * s; top.scale.y = 1.15; g.add(top);
  return g;
}
export function bush(s = 1) { const b = ball(0.7 * s, C.grassDark, 0); b.position.y = 0.45 * s; b.scale.set(1.3, 0.8, 1); return b; }

export function car(color = 0x3b82f6) {
  const g = new THREE.Group();
  g.add(at(box(1.9, 0.7, 4.0, color), 0, 0.65, 0));
  g.add(at(box(1.7, 0.6, 2.1, color), 0, 1.25, -0.2));
  g.add(at(box(1.72, 0.45, 1.9, 0x1e2a36), 0, 1.28, -0.2));
  for (const [x, z] of [[-0.9, 1.3], [0.9, 1.3], [-0.9, -1.3], [0.9, -1.3]]) {
    const w = cyl(0.38, 0.38, 0.3, 0x1b1b1b, 10); w.rotation.z = Math.PI / 2; at(w, x, 0.38, z); g.add(w);
  }
  return g;
}

export function warehouse(w = 44, h = 13, d = 30) {
  const g = new THREE.Group();
  g.add(at(box(w, h, d, C.wall), 0, h / 2, 0));
  g.add(at(box(w + 0.4, 0.9, d + 0.4, C.roof), 0, h + 0.45, 0));
  g.add(at(box(w + 0.05, 1.0, 0.2, C.stripe), 0, h - 1.6, d / 2 + 0.02));
  g.add(at(box(10, 4.2, 0.3, C.glass), 0, 2.1, d / 2 + 0.05));
  g.add(at(box(12, 0.5, 3, C.roof), 0, 4.6, d / 2 + 1.5));
  for (const x of [-5.6, 5.6]) g.add(at(box(0.4, 4.4, 0.4, C.roof), x, 2.2, d / 2 + 2.8));
  return g;
}

// ---------- Figuren ----------
export function person({ shirt = C.hoodie, pants = C.pants, skin = C.skin, cap = C.cap, hat = 'cap', hair = 0x3a2a1e } = {}) {
  const g = new THREE.Group();
  const hip = new THREE.Group(); hip.position.y = 0.95; g.add(hip);
  const torso = at(box(0.62, 0.72, 0.36, shirt), 0, 0.38, 0); hip.add(torso);
  const head = new THREE.Group(); head.position.y = 0.98; hip.add(head);
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.27, 18, 14), new THREE.MeshLambertMaterial({ color: skin })); skull.castShadow = true; skull.position.y = 0.12; head.add(skull);
  for (const x of [-0.09, 0.09]) head.add(at(box(0.05, 0.08, 0.02, 0x111111), x, 0.16, 0.255));
  const mouth = at(box(0.11, 0.025, 0.02, 0x7a3b2a), 0, 0.03, 0.25); head.add(mouth);
  if (hat === 'cap') {
    head.add(at(cyl(0.28, 0.29, 0.16, cap, 10), 0, 0.3, 0));
    head.add(at(box(0.3, 0.04, 0.26, cap), 0, 0.24, -0.3)); // Schirm nach hinten
  } else if (hat === 'police') {
    head.add(at(cyl(0.3, 0.27, 0.16, cap, 10), 0, 0.33, 0));
    head.add(at(box(0.34, 0.04, 0.2, 0x111111), 0, 0.26, 0.26));
    head.add(at(box(0.3, 0.06, 0.02, 0x0a0a0a), 0, 0.17, 0.26)); // Sonnenbrille
  } else {
    head.add(at(ball(0.28, hair, 1), 0, 0.2, -0.04));
  }
  const limb = (w, h, color, x, y) => {
    const pivot = new THREE.Group(); pivot.position.set(x, y, 0);
    const m = at(box(w, h, w, color), 0, -h / 2, 0); pivot.add(m); return pivot;
  };
  const armL = limb(0.17, 0.62, shirt, -0.41, 0.7), armR = limb(0.17, 0.62, shirt, 0.41, 0.7);
  for (const a of [armL, armR]) a.add(at(ball(0.09, skin, 0), 0, -0.68, 0));
  const legL = limb(0.22, 0.86, pants, -0.15, 0.02), legR = limb(0.22, 0.86, pants, 0.15, 0.02);
  for (const l of [legL, legR]) l.add(at(box(0.24, 0.12, 0.34, C.shoe), 0, -0.9, 0.05));
  hip.add(armL, armR, legL, legR);
  g.userData = { hip, head, armL, armR, legL, legR, mouth, torso };
  return g;
}

// Posen (alle Winkel in Radiant, t in Sekunden)
export const pose = {
  reset(p) { const u = p.userData; for (const k of ['armL', 'armR', 'legL', 'legR', 'head']) u[k].rotation.set(0, 0, 0); u.hip.position.y = 0.95; u.hip.rotation.set(0, 0, 0); },
  walk(p, t, speed = 1) {
    const u = p.userData, s = Math.sin(t * 9 * speed);
    u.legL.rotation.x = s * 0.6; u.legR.rotation.x = -s * 0.6;
    u.armL.rotation.x = -s * 0.5; u.armR.rotation.x = s * 0.5;
    u.hip.position.y = 0.95 + Math.abs(Math.cos(t * 9 * speed)) * 0.05;
  },
  idle(p, t) { const u = p.userData; u.hip.position.y = 0.95 + Math.sin(t * 2) * 0.01; u.armL.rotation.z = 0.08; u.armR.rotation.z = -0.08; },
  armsUp(p, a = 1, t = 0) {
    const u = p.userData; const w = Math.sin(t * 14) * 0.12 * a;
    u.armL.rotation.z = -2.6 * a + w; u.armR.rotation.z = 2.6 * a - w;
  },
  handsOnHead(p, a = 1) { const u = p.userData; u.armL.rotation.set(-0.4 * a, 0, -2.4 * a); u.armR.rotation.set(-0.4 * a, 0, 2.4 * a); },
  stop(p, a = 1) { const u = p.userData; u.armR.rotation.set(-1.6 * a, 0, 0.25 * a); },
  holdUp(p, a = 1, t = 0) { const u = p.userData; u.armR.rotation.set(-2.9 * a + Math.sin(t * 6) * 0.1, 0, 0); },
  push(p) { const u = p.userData; u.armL.rotation.x = -1.3; u.armR.rotation.x = -1.3; },
  shrug(p, a = 1) { const u = p.userData; u.armL.rotation.set(-0.3 * a, 0, -0.9 * a); u.armR.rotation.set(-0.3 * a, 0, 0.9 * a); u.head.rotation.z = 0.15 * a; },
  jawDrop(p, a = 1) { p.userData.mouth.scale.y = 1 + 5 * a; },
};

// ---------- Requisiten ----------
export function turnstile() {
  const g = new THREE.Group();
  g.add(at(box(0.5, 1.1, 1.6, 0x9aa3ad), 0, 0.55, 0));
  const scanner = at(box(0.42, 0.12, 0.42, 0x1b1f24), 0, 1.16, 0.2); g.add(scanner);
  const light = at(box(0.3, 0.03, 0.3, C.green, { emissive: C.green, emissiveIntensity: 1 }), 0, 1.23, 0.2);
  g.add(light);
  const arm = new THREE.Group(); arm.position.set(0.3, 0.85, 0);
  arm.add(at(cyl(0.04, 0.04, 1.4, 0xd0d4da, 6), 0.7, 0, 0)); arm.children[0].rotation.z = Math.PI / 2;
  g.add(arm);
  g.userData = { light, arm };
  return g;
}
export function setLight(ts, on, color) {
  const l = ts.userData.light; l.material = M(color, { emissive: color, emissiveIntensity: on ? 1.2 : 0.1 });
}

export function cart() {
  const g = new THREE.Group();
  const wire = M(0xb8c0c8, { wireframe: true });
  const basket = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.6, 1.2, 3, 3, 4), wire); basket.position.y = 0.85; g.add(basket);
  g.add(at(box(0.9, 0.04, 1.2, 0x8a939c), 0, 0.55, 0));
  g.add(at(cyl(0.03, 0.03, 0.9, C.red, 6), 0, 1.15, -0.65)); g.children[2].rotation.z = Math.PI / 2;
  for (const [x, z] of [[-0.4, 0.5], [0.4, 0.5], [-0.4, -0.5], [0.4, -0.5]]) g.add(at(cyl(0.08, 0.08, 0.06, 0x222222, 8), x, 0.1, z));
  return g;
}

export function coin() { const c = cyl(0.32, 0.32, 0.09, C.gold, 14, { emissive: 0x6b4a00, emissiveIntensity: 0.25 }); return c; }

export function coinTower(n) {
  const geo = new THREE.CylinderGeometry(0.5, 0.5, 0.14, 14);
  const m = new THREE.InstancedMesh(geo, M(C.gold, { emissive: 0x6b4a00, emissiveIntensity: 0.25 }), n);
  const d = new THREE.Object3D();
  for (let i = 0; i < n; i++) { d.position.set(Math.sin(i * 1.7) * 0.04, 0.07 + i * 0.15, Math.cos(i * 2.3) * 0.04); d.rotation.y = i; d.updateMatrix(); m.setMatrixAt(i, d.matrix); }
  m.castShadow = true; m.count = 0; return m;
}

export function card(glow = false) {
  return box(0.86, 0.54, 0.03, glow ? C.cardGlow : C.card, glow ? { emissive: C.cardGlow, emissiveIntensity: 0.6 } : {});
}

export function chipBag() {
  const g = new THREE.Group();
  const b = box(0.9, 1.2, 0.35, 0xff8c1a); b.scale.z = 0.8; g.add(b);
  g.add(at(box(0.92, 0.25, 0.37, 0x7b2ff7), 0, 0.2, 0));
  g.add(at(box(0.92, 0.1, 0.2, 0xff8c1a), 0, 0.64, 0));
  return g;
}

export function hook(len = 8) {
  const g = new THREE.Group();
  g.add(at(cyl(0.02, 0.02, len, 0x222222, 4), 0, len / 2, 0));
  const t = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 6, 12, Math.PI * 1.3), M(0x9aa3ad));
  t.rotation.z = Math.PI * 0.85; t.position.y = -0.15; g.add(t);
  return g;
}

export function shelfRow(len = 20, seed = 1) {
  const g = new THREE.Group();
  for (let x = -len / 2; x <= len / 2; x += 4) g.add(at(box(0.25, 7, 0.25, C.shelf), x, 3.5, 0), at(box(0.25, 7, 0.25, C.shelf), x, 3.5, 2));
  for (const y of [0.3, 2.6, 4.9]) g.add(at(box(len, 0.15, 2.2, C.board), 0, y, 1));
  const cols = [0x2f6fde, 0xf2f2f2, 0x3fbf5f, 0xe94b3c, 0xf5c542, 0x9b59b6];
  let r = seed;
  const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  for (const y of [0.3, 2.6, 4.9]) {
    for (let x = -len / 2 + 0.8; x < len / 2 - 0.5; x += 1.3) {
      const h = 0.8 + rnd() * 1.2;
      g.add(at(box(1.1, h, 1.8, cols[Math.floor(rnd() * cols.length)]), x, y + 0.08 + h / 2, 1));
    }
  }
  return g;
}

export function register() {
  const g = new THREE.Group();
  g.add(at(box(3, 1.0, 1.2, 0x8a939c), 0, 0.5, 0));
  g.add(at(box(0.6, 0.5, 0.4, 0x1b1f24), 0.9, 1.25, 0));
  const tray = at(box(1.0, 0.12, 0.8, 0xc9cfd6), -0.6, 1.06, 0); g.add(tray);
  return g;
}

export function vault() {
  const g = new THREE.Group();
  const d = cyl(3, 3, 0.6, 0x8a939c, 20); d.rotation.x = Math.PI / 2; g.add(d);
  const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.12, 6, 16), M(0x5b6270)); wheel.position.z = 0.35; g.add(wheel);
  return g;
}

// ---------- Kamera-Helfer ----------
export const ease = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
export const clamp01 = (t) => Math.max(0, Math.min(1, t));
export const lerp = (a, b, t) => a + (b - a) * t;
export function lerpV(a, b, t) { return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]; }
export function camMove(cam, from, to, lookFrom, lookTo, t) {
  const e = ease(clamp01(t));
  cam.position.set(...lerpV(from, to, e));
  cam.lookAt(...lerpV(lookFrom, lookTo || lookFrom, e));
}

// ---------- Requisiten Haushalt / Entrümpelung ----------
export function room(w = 10, d = 8, h = 3.2, wall = 0xf3e9d8, floor = 0xb98a5a) {
  const g = new THREE.Group();
  const f = new THREE.Mesh(new THREE.PlaneGeometry(w, d), M(floor)); f.rotation.x = -Math.PI / 2; f.receiveShadow = true; g.add(f);
  g.add(at(box(w, h, 0.2, wall), 0, h / 2, -d / 2));
  const side = box(0.2, h, d, wall); at(side, -w / 2, h / 2, 0); g.add(side);
  g.add(at(box(1.6, 1.3, 0.05, 0xbfe3ff, { emissive: 0x9fd3ff, emissiveIntensity: 0.4 }), 1.5, 1.8, -d / 2 + 0.12));
  return g;
}
export function sofa(color = 0x3f6fb5) {
  const g = new THREE.Group();
  g.add(at(box(2.2, 0.45, 0.95, color), 0, 0.35, 0));
  g.add(at(box(2.2, 0.75, 0.25, color), 0, 0.75, -0.38));
  for (const x of [-1.0, 1.0]) g.add(at(box(0.22, 0.6, 0.95, color), x, 0.55, 0));
  for (const x of [-0.5, 0.5]) g.add(at(box(0.95, 0.15, 0.7, 0xffffff & (color + 0x202020)), x, 0.62, 0.08));
  return g;
}
export function wardrobe(color = 0x8a5a33) {
  const g = new THREE.Group();
  g.add(at(box(1.4, 2.1, 0.6, color), 0, 1.05, 0));
  g.add(at(box(0.02, 1.9, 0.02, 0x3a2a1e), 0, 1.05, 0.31));
  for (const x of [-0.12, 0.12]) g.add(at(box(0.05, 0.2, 0.04, 0xd4af37), x, 1.1, 0.32));
  return g;
}
export function cardbox(s = 0.5) { const b = box(s, s * 0.8, s, 0xc8995c); return b; }
export function lamp() {
  const g = new THREE.Group();
  g.add(at(cyl(0.18, 0.22, 0.05, 0x333333, 8), 0, 0.03, 0));
  g.add(at(cyl(0.025, 0.025, 1.5, 0x333333, 6), 0, 0.78, 0));
  g.add(at(cyl(0.15, 0.3, 0.3, 0xfff0c0, 8, { emissive: 0xffe08a, emissiveIntensity: 0.5 }), 0, 1.6, 0));
  return g;
}
export function tv() {
  const g = new THREE.Group();
  g.add(at(box(1.0, 0.75, 0.6, 0x5a5a5a), 0, 0.38, 0));
  g.add(at(box(0.8, 0.55, 0.02, 0x1a1a1a), 0, 0.42, 0.31));
  return g;
}
export function van(color = 0xf2f2f2) {
  const g = new THREE.Group();
  g.add(at(box(2.1, 2.2, 4.0, color), 0, 1.45, -0.6));
  g.add(at(box(2.1, 1.4, 1.6, color), 0, 1.05, 2.2));
  g.add(at(box(1.9, 0.6, 0.05, 0x1e2a36), 0, 1.45, 3.01));
  g.add(at(box(2.12, 0.25, 5.6, C.stripe), 0, 1.0, 0.2));
  for (const [x, z] of [[-1.0, 2.0], [1.0, 2.0], [-1.0, -1.6], [1.0, -1.6]]) {
    const w = cyl(0.42, 0.42, 0.32, 0x1b1b1b, 10); w.rotation.z = Math.PI / 2; at(w, x, 0.42, z); g.add(w);
  }
  return g;
}
export function skip(color = 0x2f7d3a) { // Container/Mulde
  const g = new THREE.Group();
  const s = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 1.5, 1.4, 4, 1, true), M(color, { side: THREE.DoubleSide }));
  s.rotation.y = Math.PI / 4; s.scale.set(1.5, 1, 0.8); s.position.y = 0.7; s.castShadow = true; g.add(s);
  g.add(at(box(3.2, 0.1, 1.9, 0x2a2a2a), 0, 0.05, 0));
  return g;
}
export function phone() {
  const g = new THREE.Group();
  g.add(box(0.75, 1.5, 0.08, 0x111111));
  const scr = at(box(0.66, 1.36, 0.02, 0x2ecc71, { emissive: 0x2ecc71, emissiveIntensity: 0.35 }), 0, 0, 0.05); g.add(scr);
  g.add(at(box(0.5, 0.35, 0.02, 0xffffff), 0, 0.3, 0.065)); // Foto-Platzhalter
  g.add(at(box(0.5, 0.06, 0.02, 0xffffff), 0, -0.05, 0.065));
  g.add(at(box(0.3, 0.06, 0.02, 0xffd400), -0.1, -0.18, 0.065));
  return g;
}
export function scale() {
  const g = new THREE.Group();
  g.add(at(box(2.4, 0.2, 2.4, 0x6b7380), 0, 0.1, 0));
  g.add(at(box(0.15, 1.6, 0.15, 0x6b7380), 0, 0.8, -1.1));
  g.add(at(box(0.9, 0.5, 0.15, 0x111111, { emissive: 0x111111 }), 0, 1.7, -1.1));
  return g;
}
export function scrapPile() {
  const g = new THREE.Group(); let r = 7;
  const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < 14; i++) {
    const m = i % 3 === 0 ? cyl(0.06, 0.06, 1.2, 0xc8743a, 6) : box(0.3 + rnd() * 0.5, 0.1 + rnd() * 0.2, 0.3 + rnd() * 0.4, [0x8a939c, 0x6b7380, 0xa0a8b0][i % 3]);
    m.position.set((rnd() - 0.5) * 1.6, 0.25 + rnd() * 0.5, (rnd() - 0.5) * 1.6); m.rotation.set(rnd() * 3, rnd() * 3, rnd() * 3); g.add(m);
  }
  return g;
}
export function cableCoil() { const t = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.08, 6, 14), M(0xc8743a)); t.rotation.x = Math.PI / 2; t.castShadow = true; return t; }
export function table(w = 2.4) {
  const g = new THREE.Group();
  g.add(at(box(w, 0.08, 1.0, 0xd8c3a0), 0, 0.85, 0));
  for (const [x, z] of [[-w / 2 + 0.1, -0.4], [w / 2 - 0.1, -0.4], [-w / 2 + 0.1, 0.4], [w / 2 - 0.1, 0.4]]) g.add(at(box(0.07, 0.85, 0.07, 0x8a5a33), x, 0.42, z));
  return g;
}
export function bill() { return box(0.7, 0.02, 0.35, 0x58c26b, { emissive: 0x2f7a3a, emissiveIntensity: 0.25 }); }
export function paper(w = 1.2, h = 1.6) {
  const g = new THREE.Group();
  g.add(box(w, h, 0.03, 0xffffff));
  for (let i = 0; i < 6; i++) g.add(at(box(w * (i === 5 ? 0.4 : 0.75), 0.05, 0.01, i === 5 ? C.red : 0x9aa3ad), i === 5 ? w * 0.15 : 0, h * 0.35 - i * 0.2, 0.02));
  return g;
}
export function pileMarker(color) { return cyl(0.9, 0.9, 0.04, color, 20, { emissive: color, emissiveIntensity: 0.35 }); }
export function house() {
  const g = new THREE.Group();
  g.add(at(box(8, 6, 7, 0xf4efe6), 0, 3, 0));
  const roof = new THREE.Mesh(new THREE.ConeGeometry(6.2, 2.6, 4), M(0x8b3a2b)); roof.rotation.y = Math.PI / 4; roof.position.y = 7.3; roof.scale.set(1, 1, 0.85); roof.castShadow = true; g.add(roof);
  g.add(at(box(1.3, 2.3, 0.1, 0x6b4a2b), -1.5, 1.15, 3.52));
  for (const [x, y] of [[1.8, 1.8], [1.8, 4.4], [-1.5, 4.4]]) g.add(at(box(1.2, 1.1, 0.1, 0x9fd3ff, { emissive: 0x6fa8d8, emissiveIntensity: 0.3 }), x, y, 3.52));
  return g;
}
export function worker() { return person({ shirt: 0x37404d, pants: 0x2a2f38, cap: C.stripe, hat: 'cap' }); }
export const pose2 = {
  carry(p, a = 1) { const u = p.userData; u.armL.rotation.set(-1.5 * a, 0, -0.2 * a); u.armR.rotation.set(-1.5 * a, 0, 0.2 * a); },
  phoneUp(p, a = 1) { const u = p.userData; u.armR.rotation.set(-1.9 * a, 0, 0.3 * a); u.head.rotation.x = 0.25 * a; },
  give(p, a = 1) { const u = p.userData; u.armR.rotation.set(-1.3 * a, 0, 0); },
  sit(p) { const u = p.userData; u.hip.position.y = 0.55; u.legL.rotation.x = -1.5; u.legR.rotation.x = -1.5; },
  throwUp(p, k) { const u = p.userData; const a = Math.sin(k * Math.PI); u.armL.rotation.set(-2.6 * a, 0, 0); u.armR.rotation.set(-2.6 * a, 0, 0); },
};

// ---------- Requisiten 005–008 (Umzug, Callcenter, Folierer, Schlüsseldienst) ----------
export function truck(color = 0xf4f4f4, stripe = C.stripe) {
  const g = new THREE.Group();
  g.add(at(box(2.5, 3.0, 6.0, color), 0, 2.1, -1.0));
  g.add(at(box(2.52, 0.35, 6.02, stripe), 0, 1.4, -1.0));
  g.add(at(box(2.4, 2.0, 1.8, 0x2f6fde), 0, 1.6, 2.9));
  g.add(at(box(2.2, 0.8, 0.05, 0x1e2a36), 0, 2.1, 3.81));
  for (const [x, z] of [[-1.2, 2.8], [1.2, 2.8], [-1.2, -2.4], [1.2, -2.4], [-1.2, -3.4], [1.2, -3.4]]) {
    const w = cyl(0.5, 0.5, 0.35, 0x1b1b1b, 10); w.rotation.z = Math.PI / 2; at(w, x, 0.5, z); g.add(w);
  }
  return g;
}
export function tower(floors = 5, color = 0xe9dcc6) {
  const g = new THREE.Group();
  g.add(at(box(6, floors * 3, 6, color), 0, floors * 1.5, 0));
  for (let f = 0; f < floors; f++) for (const x of [-1.6, 1.6]) g.add(at(box(1.3, 1.3, 0.1, 0x9fd3ff, { emissive: 0x6fa8d8, emissiveIntensity: 0.3 }), x, f * 3 + 1.7, 3.02));
  return g;
}
export function noParkingSign() {
  const g = new THREE.Group();
  g.add(at(cyl(0.05, 0.05, 2.4, 0x9aa3ad, 6), 0, 1.2, 0));
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.05, 20), M(C.red)); ring.rotation.x = Math.PI / 2; ring.position.set(0, 2.5, 0.03); g.add(ring);
  const inner = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.31, 0.06, 20), M(0x2f6fde)); inner.rotation.x = Math.PI / 2; inner.position.set(0, 2.5, 0.04); g.add(inner);
  const x1 = at(box(0.6, 0.07, 0.02, C.red), 0, 2.5, 0.08); x1.rotation.z = 0.8; const x2 = at(box(0.6, 0.07, 0.02, C.red), 0, 2.5, 0.08); x2.rotation.z = -0.8; g.add(x1, x2);
  return g;
}
export function storageUnit(color = 0xff8a1f) {
  const g = new THREE.Group();
  g.add(at(box(2.4, 2.6, 3, 0xc9cfd6), 0, 1.3, 0));
  const door = at(box(2.0, 2.2, 0.05, color), 0, 1.1, 1.52); g.add(door);
  for (let i = 0; i < 6; i++) g.add(at(box(2.0, 0.03, 0.06, 0x000000, { transparent: true, opacity: 0.2 }), 0, 0.3 + i * 0.36, 1.55));
  g.userData.door = door; return g;
}
export function moon(r = 6) { const m = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 2), M(0xe8e4d8, { emissive: 0x777366, emissiveIntensity: 0.4 })); return m; }
export function desk() {
  const g = new THREE.Group();
  g.add(at(box(1.6, 0.06, 0.8, 0xe9e9e9), 0, 0.75, 0));
  for (const [x, z] of [[-0.75, -0.35], [0.75, -0.35], [-0.75, 0.35], [0.75, 0.35]]) g.add(at(box(0.05, 0.75, 0.05, 0x777777), x, 0.37, z));
  g.add(at(box(0.7, 0.45, 0.04, 0x1a1a1a), 0, 1.1, -0.25));
  const scr = at(box(0.64, 0.38, 0.01, 0x3fa7ff, { emissive: 0x3fa7ff, emissiveIntensity: 0.5 }), 0, 1.1, -0.225); g.add(scr);
  g.add(at(box(0.08, 0.25, 0.08, 0x333333), 0, 0.88, -0.25));
  g.add(at(box(1.62, 0.5, 0.04, 0x6b7380), 0, 1.0, -0.42)); // Trennwand
  g.userData.screen = scr; return g;
}
export function headset(p) { // an Kopf einer Figur hängen
  const h = p.userData.head;
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.03, 4, 12, Math.PI), M(0x222222)); band.position.y = 0.14; h.add(band);
  h.add(at(box(0.06, 0.14, 0.14, 0x222222), 0.29, 0.1, 0), at(box(0.06, 0.14, 0.14, 0x222222), -0.29, 0.1, 0));
  const mic = at(box(0.03, 0.03, 0.25, 0x222222), 0.25, 0.02, 0.15); mic.rotation.y = -0.6; h.add(mic);
}
export function officeBuilding(color = 0xd9dde3) {
  const g = new THREE.Group();
  g.add(at(box(14, 10, 8, color), 0, 5, 0));
  for (let f = 0; f < 3; f++) g.add(at(box(13, 1.4, 0.1, 0x9fd3ff, { emissive: 0x6fa8d8, emissiveIntensity: 0.35 }), 0, 2 + f * 3, 4.02));
  return g;
}
export function clock() {
  const g = new THREE.Group();
  const face = cyl(0.9, 0.9, 0.12, 0xffffff, 24); face.rotation.x = Math.PI / 2; g.add(face);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.08, 6, 24), M(0x222222)); g.add(rim);
  const hh = new THREE.Group(), mh = new THREE.Group();
  hh.add(at(box(0.08, 0.45, 0.04, 0x111111), 0, 0.22, 0)); mh.add(at(box(0.05, 0.7, 0.04, C.red), 0, 0.35, 0));
  hh.position.z = mh.position.z = 0.09; g.add(hh, mh);
  g.userData = { hh, mh }; return g;
}
export function foilRoll(color = 0x7b2ff7) {
  const g = new THREE.Group();
  const r = cyl(0.25, 0.25, 1.5, color, 14, { emissive: color, emissiveIntensity: 0.15 }); r.rotation.z = Math.PI / 2; g.add(r);
  return g;
}
export function heatGun() {
  const g = new THREE.Group();
  const b = cyl(0.08, 0.1, 0.45, 0xffd400, 8); b.rotation.x = Math.PI / 2; g.add(b);
  g.add(at(box(0.08, 0.25, 0.1, 0x222222), 0, -0.15, 0.1));
  return g;
}
export function door(color = 0x6b4a2b, { backing = false } = {}) {
  const g = new THREE.Group();
  for (const x of [-0.72, 0.72]) g.add(at(box(0.16, 2.5, 0.3, 0xd8cbb5), x, 1.25, -0.05)); // Rahmen links/rechts
  g.add(at(box(1.6, 0.16, 0.3, 0xd8cbb5), 0, 2.42, -0.05)); // Sturz
  if (backing) g.add(at(box(1.3, 2.35, 0.02, 0x1a1410), 0, 1.17, -0.18)); // dunkler Flur dahinter
  const leaf = new THREE.Group(); leaf.position.set(-0.6, 0, 0.12);
  leaf.add(at(box(1.2, 2.3, 0.08, color), 0.6, 1.15, 0));
  leaf.add(at(ball(0.05, 0xd4af37, 0), 1.05, 1.1, 0.07));
  g.add(leaf); g.userData.leaf = leaf; return g;
}
export function palm() {
  const g = new THREE.Group();
  for (let i = 0; i < 6; i++) { const s = cyl(0.16 - i * 0.01, 0.18 - i * 0.01, 0.7, 0x9a6b3a, 6); s.position.set(Math.sin(i * 0.4) * 0.15, 0.35 + i * 0.68, 0); s.rotation.z = 0.05 * i; g.add(s); }
  for (let i = 0; i < 7; i++) { const l = box(0.25, 0.05, 2.0, 0x3fae2a); l.position.set(0.3, 4.2, 0); l.rotation.set(0.5, i * Math.PI * 2 / 7, 0); const p = new THREE.Group(); p.position.set(0.3, 4.2, 0); l.position.set(0, 0, 0.9); p.rotation.set(0, i * Math.PI * 2 / 7, 0); l.rotation.x = 0.4; p.add(l); g.add(p); }
  return g;
}
export function trophy() {
  const g = new THREE.Group();
  const gold = { emissive: 0x6b4a00, emissiveIntensity: 0.35 };
  g.add(at(box(0.9, 0.3, 0.9, 0x333333), 0, 0.15, 0));
  g.add(at(cyl(0.12, 0.18, 0.6, C.gold, 10, gold), 0, 0.6, 0));
  g.add(at(cyl(0.6, 0.25, 0.8, C.gold, 14, gold), 0, 1.3, 0));
  return g;
}
export function contractStack(n) {
  const geo = new THREE.BoxGeometry(0.7, 0.02, 0.95);
  const m = new THREE.InstancedMesh(geo, M(0xffffff), n); const d = new THREE.Object3D();
  for (let i = 0; i < n; i++) { d.position.set(Math.sin(i * 1.3) * 0.03, 0.01 + i * 0.022, Math.cos(i * 1.9) * 0.03); d.rotation.y = Math.sin(i) * 0.1; d.updateMatrix(); m.setMatrixAt(i, d.matrix); }
  m.castShadow = true; m.count = 0; return m;
}
const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe8eef5, metalness: 1.0, roughness: 0.18, flatShading: true });
let envDone = false;
export function chromeify(obj, scene, renderer) { // alles in Chrom verwandeln (Plotwist)
  if (!envDone && renderer) {
    const pm = new THREE.PMREMGenerator(renderer);
    const s = new THREE.Scene(); s.background = new THREE.Color(0xffb27a);
    const half = (col, a, b) => new THREE.Mesh(new THREE.SphereGeometry(10, 24, 12, 0, Math.PI * 2, a, b), new THREE.MeshBasicMaterial({ color: col, side: THREE.BackSide }));
    s.add(half(0x5f73e0, 0, Math.PI * 0.42), half(0xffc58a, Math.PI * 0.42, Math.PI * 0.1), half(0x30343c, Math.PI * 0.52, Math.PI * 0.48));
    const sunB = new THREE.Mesh(new THREE.SphereGeometry(1.2, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffffff })); sunB.position.set(-5, 5, -6); s.add(sunB);
    chromeMat.envMap = pm.fromScene(s).texture; envDone = true;
  }
  obj.traverse(o => { if (o.isMesh && !o.userData.keep) o.material = chromeMat; });
}

// ---------- Golfplatz / Taucher (009) ----------
export function pond(r = 9) {
  const g = new THREE.Group();
  const w = new THREE.Mesh(new THREE.CircleGeometry(r, 28), M(0x2b8fbf, { transparent: true, opacity: 0.85, emissive: 0x0d4f73, emissiveIntensity: 0.3 }));
  w.rotation.x = -Math.PI / 2; w.position.y = 0.05; w.receiveShadow = true; g.add(w);
  const rim = new THREE.Mesh(new THREE.RingGeometry(r, r + 0.6, 28), M(0xc9b27a)); rim.rotation.x = -Math.PI / 2; rim.position.y = 0.04; g.add(rim);
  g.userData.water = w; return g;
}
export function flag() {
  const g = new THREE.Group();
  g.add(at(cyl(0.04, 0.04, 2.6, 0xffffff, 6), 0, 1.3, 0));
  g.add(at(box(0.8, 0.5, 0.03, C.red), 0.4, 2.3, 0));
  const hole = new THREE.Mesh(new THREE.CircleGeometry(0.25, 12), M(0x111111)); hole.rotation.x = -Math.PI / 2; hole.position.y = 0.03; g.add(hole);
  return g;
}
export function golfBall() { const b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.11, 1), M(0xffffff)); b.castShadow = true; return b; }
export function ballField(n = 400, spread = 8, seed = 3, y = 0.1) {
  const m = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.11, 1), M(0xf4f4f0), n); const d = new THREE.Object3D();
  let r = seed; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < n; i++) { const a = rnd() * Math.PI * 2, rr = Math.sqrt(rnd()) * spread; d.position.set(Math.cos(a) * rr, y + rnd() * 0.06, Math.sin(a) * rr); d.updateMatrix(); m.setMatrixAt(i, d.matrix); }
  m.castShadow = true; return m;
}
export function golfer(shirt = 0xffffff, pants = 0x2f3b55) {
  const p = person({ shirt, pants, cap: 0xffffff, hat: 'cap' });
  const club = new THREE.Group(); club.add(at(cyl(0.02, 0.02, 1.1, 0x333333, 5), 0, -0.55, 0)); club.add(at(box(0.18, 0.08, 0.06, 0x9aa3ad), 0.05, -1.1, 0));
  club.position.set(0, -0.62, 0); p.userData.armR.add(club); p.userData.club = club; return p;
}
export function swing(p, k) { // k: 0..1 Ausholen -> Durchschwung
  const u = p.userData, a = k < 0.5 ? -k * 2 * 2.2 : -2.2 + (k - 0.5) * 2 * 4.4;
  u.armR.rotation.set(0, 0, 0); u.armL.rotation.set(0, 0, 0);
  u.armR.rotation.z = a * 0.6; u.armL.rotation.z = a * 0.6; u.armR.rotation.x = -0.6; u.armL.rotation.x = -0.6; u.hip.rotation.y = a * 0.15;
}
export function diver() {
  const p = person({ shirt: 0x111418, pants: 0x111418, skin: 0xffd2b0, cap: 0x111418, hat: 'cap' });
  const h = p.userData.head;
  h.add(at(box(0.42, 0.16, 0.1, 0x3fd0ff, { emissive: 0x1a7fa0, emissiveIntensity: 0.5, transparent: true, opacity: 0.85 }), 0, 0.16, 0.25));
  const tube = at(cyl(0.03, 0.03, 0.45, 0xffd400, 6), 0.28, 0.3, 0.05); h.add(tube);
  for (const l of [p.userData.legL, p.userData.legR]) l.add(at(box(0.3, 0.05, 0.6, 0xffd400), 0, -0.95, 0.25));
  p.userData.body = p; return p;
}
export function netBag(n = 60) {
  const g = new THREE.Group();
  const bag = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45, 1), M(0xff8a1f, { wireframe: true })); bag.scale.set(1, 1.3, 1); g.add(bag);
  g.add(ballField(n, 0.32, 9, -0.25));
  return g;
}
export function oldGolfer() { // seit 2009 unter Wasser: langer weißer Bart, Karohose
  const p = golfer(0xd7c27a, 0x8b3a2b);
  const h = p.userData.head;
  const beard = at(box(0.36, 0.9, 0.12, 0xf2f2f2), 0, -0.35, 0.2); h.add(beard);
  h.add(at(box(0.3, 0.06, 0.05, 0xf2f2f2), 0, 0.07, 0.26));
  return p;
}
export function sortTable() {
  const g = new THREE.Group();
  g.add(at(box(4.4, 0.1, 1.2, 0xd8c3a0), 0, 0.9, 0));
  for (const [x, z] of [[-2.1, -0.5], [2.1, -0.5], [-2.1, 0.5], [2.1, 0.5]]) g.add(at(box(0.08, 0.9, 0.08, 0x8a5a33), x, 0.45, z));
  g.userData.bins = [-1.6, -0.55, 0.55, 1.6].map((x, i) => { const b = at(box(0.9, 0.35, 0.9, [0x9aa3ad, 0x3b82f6, 0x2ecc71, C.gold][i]), x, 1.12, 0); g.add(b); return b; });
  return g;
}

// ---------- Atmosphäre & Leben ----------
export function cloud() {
  const g = new THREE.Group(); const m = M(0xffffff, { emissive: 0xffe9d6, emissiveIntensity: 0.35 });
  for (const [x, y, r] of [[0, 0, 4], [4, 0.6, 3.2], [-4, 0.4, 3], [1.5, 2.2, 3]]) { const b = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), m); b.position.set(x, y, 0); b.scale.y = 0.7; g.add(b); }
  return g;
}
export function birds(scene, n = 7, center = [0, 18, -20]) { // V-Formation, fliegt langsam übers Bild
  const g = new THREE.Group(); const bs = [];
  for (let i = 0; i < n; i++) { const b = new THREE.Group(); const w1 = box(0.7, 0.05, 0.25, 0x2a2a2a), w2 = box(0.7, 0.05, 0.25, 0x2a2a2a); w1.position.x = -0.35; w2.position.x = 0.35; b.add(w1, w2); b.userData = { w1, w2 }; b.position.set((i - n / 2) * 0.9, -Math.abs(i - n / 2) * 0.4, Math.abs(i - n / 2) * 0.6); g.add(b); bs.push(b); }
  g.position.set(...center); scene.add(g);
  scene.userData.tickers.push((t) => { g.position.x = center[0] - 30 + (t * 2.2) % 60; bs.forEach((b, i) => { const f = Math.sin(t * 9 + i) * 0.5; b.userData.w1.rotation.z = f; b.userData.w2.rotation.z = -f; }); });
  return g;
}
export function walkers(scene, n = 4, path = [[-20, 0, -12], [20, 0, -12]], opts = {}) { // Hintergrund-Passanten
  const shirts = [0x3b82f6, 0xe94b3c, 0x22a06b, 0x9b59b6, 0xff8a1f, 0xf5f5f5];
  for (let i = 0; i < n; i++) {
    const p = opts.make ? opts.make(i) : person({ shirt: shirts[i % shirts.length], hat: i % 2 ? 'hair' : 'cap', hair: [0x3a2a1e, 0xd8b26a][i % 2] });
    scene.add(p); const off = i / n, sp = 0.03 + (i % 3) * 0.008;
    scene.userData.tickers.push((t) => { const k = (t * sp + off) % 1, dir = i % 2 ? 1 - k : k;
      p.position.set(path[0][0] + (path[1][0] - path[0][0]) * dir, 0, path[0][2] + (path[1][2] - path[0][2]) * dir + (i % 3) * 1.2);
      p.rotation.y = (i % 2 ? -1 : 1) * Math.PI / 2; pose.reset(p); pose.walk(p, t + i, 0.8); });
  }
}
export function sway(scene, obj, amp = 0.04, speed = 1.3) { scene.userData.tickers.push((t) => { obj.rotation.z = Math.sin(t * speed + obj.position.x) * amp; }); }

// ---------- 3D-Etiketten (wie "58 km/h" am Auto) ----------
const TAG_COLORS = { yellow: ['#ffd400', '#111111'], red: ['#e5383b', '#ffffff'], green: ['#2ecc71', '#ffffff'], white: ['#ffffff', '#111111'], dark: ['#1d2230', '#ffffff'], blue: ['#2f6fde', '#ffffff'], orange: ['#ff8a1f', '#ffffff'] };
export function tag(text, color = 'white', h = 0.55) {
  const [bg, fg] = TAG_COLORS[color] || TAG_COLORS.white;
  const cv = document.createElement('canvas'); const g = cv.getContext('2d');
  const fs = 64; g.font = `800 ${fs}px Inter, "Inter Display", sans-serif`;
  const w = Math.ceil(g.measureText(text).width) + 56; cv.width = w; cv.height = fs + 40;
  g.font = `800 ${fs}px Inter, "Inter Display", sans-serif`;
  const r = 22; g.fillStyle = 'rgba(0,0,0,0.25)'; rr(g, 4, 8, w - 8, fs + 30, r); g.fill();
  g.fillStyle = bg; rr(g, 0, 2, w - 8, fs + 30, r); g.fill();
  g.fillStyle = fg; g.textBaseline = 'middle'; g.fillText(text, 24, fs / 2 + 19);
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, fog: false, toneMapped: false, sizeAttenuation: false }));
  const sh = Math.min(0.085, h > 0.2 ? 0.05 * (h / 0.55) : h); // feste Bildschirmgröße (Anteil der Bildhöhe) wie UI-Pills
  sp.scale.set(sh * cv.width / cv.height, sh, 1); sp.renderOrder = 999; sp.userData.keep = true; sp.layers.set(1); return sp;
}
function rr(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
export function popIn(sp, k) { const s = Math.min(1, Math.max(0, k)); const e = s < 1 ? 1 - Math.pow(1 - s, 3) * Math.cos(s * 6) : 1; sp.visible = s > 0; const base = sp.userData.base || (sp.userData.base = sp.scale.clone()); sp.scale.set(base.x * e, base.y * e, 1); }

// ---------- Golf-Welt (Upgrade) ----------
export function clubhouse() {
  const g = new THREE.Group();
  g.add(at(box(16, 5, 9, 0xf6f1e7), 0, 2.5, 0));
  const roof = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 7.2, 3, 4, 1), M(0x2f3a4a)); roof.rotation.y = Math.PI / 4; roof.scale.set(1.62, 1, 0.95); roof.position.y = 6.5; roof.castShadow = true; g.add(roof);
  for (let i = 0; i < 6; i++) g.add(at(box(1.6, 2.2, 0.1, 0x9fd3ff, { emissive: 0xffd9a0, emissiveIntensity: 0.35 }), -6 + i * 2.4, 2.4, 4.52));
  g.add(at(box(17, 0.3, 4, 0xb98a5a), 0, 0.15, 6.4)); // Terrasse
  for (let i = 0; i < 4; i++) { const u = new THREE.Group(); u.add(at(cyl(0.05, 0.05, 2.4, 0xeeeeee, 6), 0, 1.2, 0)); const top = new THREE.Mesh(new THREE.ConeGeometry(1.2, 0.6, 8), M([0x2e7d32, 0xffffff][i % 2])); top.position.y = 2.5; u.add(top); u.add(at(cyl(0.6, 0.6, 0.06, 0xffffff, 10), 0, 0.8, 0)); u.position.set(-6 + i * 4, 0.3, 6.6); g.add(u); }
  for (const x of [-9.5, 9.5]) { g.add(at(cyl(0.06, 0.06, 7, 0xeeeeee, 6), x, 3.5, 5.5)); g.add(at(box(1.4, 0.9, 0.04, [0x2e7d32, 0xc62828][x > 0 ? 1 : 0]), x + 0.72, 6.4, 5.5)); }
  const t = tag('GOLFCLUB', 'dark', 1.1); t.position.set(0, 9.2, 4.6); g.add(t);
  return g;
}
export function golfCart(color = 0xffffff) {
  const g = new THREE.Group();
  g.add(at(box(1.3, 0.5, 2.2, color), 0, 0.55, 0));
  g.add(at(box(1.2, 0.5, 0.6, 0x333333), 0, 1.0, -0.2));
  for (const z of [-0.9, 0.7]) for (const x of [-0.6, 0.6]) g.add(at(box(0.06, 1.1, 0.06, 0x999999), x, 1.4, z));
  g.add(at(box(1.4, 0.08, 2.0, 0x2e7d32), 0, 2.0, -0.1));
  for (const [x, z] of [[-0.65, 0.75], [0.65, 0.75], [-0.65, -0.75], [0.65, -0.75]]) { const w = cyl(0.25, 0.25, 0.2, 0x1b1b1b, 10); w.rotation.z = Math.PI / 2; w.position.set(x, 0.25, z); g.add(w); }
  const bag = at(cyl(0.2, 0.2, 0.9, 0x1d3557, 8), 0, 1.0, -1.15); bag.rotation.x = 0.3; g.add(bag);
  return g;
}
export function bunker(r = 3) { const b = new THREE.Mesh(new THREE.CircleGeometry(r, 18), M(0xf0dfae)); b.rotation.x = -Math.PI / 2; b.position.y = 0.04; b.scale.y = 0.6; b.receiveShadow = true; return b; }
export function fairway(w = 12, l = 60) { const f = new THREE.Mesh(new THREE.PlaneGeometry(w, l), M(0x63d14a)); f.rotation.x = -Math.PI / 2; f.position.y = 0.02; f.receiveShadow = true; return f; }
export function duck(color = 0xffffff) { const g = new THREE.Group(); g.add(at(ball(0.3, color, 1), 0, 0.15, 0)); g.children[0].scale.set(1, 0.7, 1.4); g.add(at(ball(0.16, 0x2e7d32, 1), 0, 0.42, 0.3)); g.add(at(box(0.12, 0.05, 0.16, 0xff9800), 0, 0.4, 0.48)); return g; }
export function fish(color = 0xff8a1f) { const g = new THREE.Group(); const b = ball(0.25, color, 1); b.scale.set(0.5, 0.8, 1.4); g.add(b); const tl = box(0.04, 0.3, 0.25, color); tl.position.z = -0.4; g.add(tl); return g; }
export function suitGuy() { const p = person({ shirt: 0x1d2230, pants: 0x1d2230, hat: 'hair', hair: 0x8a8a8a }); p.userData.torso.add(at(box(0.12, 0.5, 0.02, C.red), 0, 0.05, 0.19)); return p; }
export function washer() {
  const g = new THREE.Group();
  g.add(at(box(1.6, 1.8, 1.4, 0xf2f2f2), 0, 0.9, 0));
  const door = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.1, 24), M(0x9fd3ff, { transparent: true, opacity: 0.7, emissive: 0x6fa8d8, emissiveIntensity: 0.3 })); door.rotation.x = Math.PI / 2; door.position.set(0, 0.85, 0.72); g.add(door);
  const drum = new THREE.Group(); drum.position.set(0, 0.85, 0.55); for (let i = 0; i < 14; i++) { const b = golfBall(); b.position.set(Math.cos(i) * 0.35, Math.sin(i * 1.7) * 0.35, 0); drum.add(b); } g.add(drum);
  g.add(at(box(1.4, 0.2, 0.05, 0x333333), 0, 1.65, 0.71));
  g.userData.drum = drum; return g;
}
export function conveyor(len = 6) {
  const g = new THREE.Group();
  g.add(at(box(len, 0.15, 1, 0x2b2b2b), 0, 1.0, 0));
  for (let x = -len / 2; x <= len / 2; x += 1.5) g.add(at(box(0.1, 1.0, 0.9, 0x8a939c), x, 0.5, 0));
  return g;
}
export function shelfShop(rows = 4, cols = 5) { // Pro-Shop-Regal mit Ballschachteln
  const g = new THREE.Group();
  g.add(at(box(cols * 0.9 + 0.4, rows * 0.7 + 0.4, 0.6, 0x5b4a3a), 0, (rows * 0.7 + 0.4) / 2, -0.35));
  const cols3 = [0xffffff, 0xf5c542, 0xe94b3c, 0x2f6fde];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) g.add(at(box(0.7, 0.45, 0.4, cols3[(r + c) % 4]), (c - (cols - 1) / 2) * 0.9, 0.45 + r * 0.7, -0.05));
  return g;
}
export function calendarPage(year = '2009') { const t = tag(year, 'red', 0.9); return t; }

// ---------- Kaugummiautomaten-Welt (010) ----------
const GUM_COLS = [0xff3b3b, 0xffd400, 0x2ecc71, 0x3b82f6, 0xff8a1f, 0xd94f8a, 0xffffff];
export function gumMachine(body = 0xd62828) {
  const g = new THREE.Group();
  g.add(at(box(0.5, 0.9, 0.35, body, { emissive: body, emissiveIntensity: 0.08 }), 0, 0.45, 0));
  const glass = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.5, 0.3), new THREE.MeshStandardMaterial({ color: 0xdff6ff, transparent: true, opacity: 0.25, roughness: 0.05, metalness: 0.1 }));
  glass.position.set(0, 1.15, 0); g.add(glass);
  const balls = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.045, 1), new THREE.MeshLambertMaterial({ vertexColors: false }), 40); const d = new THREE.Object3D(); const col = new THREE.Color();
  for (let i = 0; i < 40; i++) { d.position.set(((i % 5) - 2) * 0.08, 0.95 + Math.floor(i / 10) * 0.08 + (i % 2) * 0.02, (Math.floor(i / 5) % 2 - 0.5) * 0.12); d.updateMatrix(); balls.setMatrixAt(i, d.matrix); balls.setColorAt(i, col.setHex(GUM_COLS[i % GUM_COLS.length])); }
  g.add(balls);
  g.add(at(box(0.48, 0.06, 0.33, 0xb0b8c0), 0, 1.42, 0));
  const knob = new THREE.Group(); knob.position.set(0, 0.55, 0.19); knob.add(cyl(0.08, 0.08, 0.05, 0xd0d4da, 10)); knob.children[0].rotation.x = Math.PI / 2; knob.add(at(box(0.16, 0.03, 0.03, 0x8a939c), 0, 0, 0.03)); g.add(knob);
  g.add(at(box(0.12, 0.04, 0.02, 0x111111), 0, 0.75, 0.18)); // Münzschlitz
  g.add(at(box(0.14, 0.1, 0.06, 0x8a939c), 0, 0.22, 0.2)); // Ausgabe
  const lamp = at(box(0.5, 0.05, 0.1, 0xfff0c0, { emissive: 0xffe08a, emissiveIntensity: 0 }), 0, 1.47, 0.12); g.add(lamp);
  g.userData = { knob, lamp }; return g;
}
export function capsuleMachine() {
  const g = new THREE.Group();
  g.add(at(box(0.8, 1.0, 0.6, 0x2f6fde), 0, 0.5, 0));
  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.42, 18, 12), new THREE.MeshStandardMaterial({ color: 0xdff6ff, transparent: true, opacity: 0.3, roughness: 0.05 })); dome.position.y = 1.4; g.add(dome);
  for (let i = 0; i < 14; i++) { const c = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), M(GUM_COLS[i % 6])); c.position.set(Math.sin(i * 2.1) * 0.22, 1.2 + (i % 4) * 0.09, Math.cos(i * 1.7) * 0.22); g.add(c); }
  const knob = cyl(0.1, 0.1, 0.06, 0xd0d4da, 10); knob.rotation.x = Math.PI / 2; knob.position.set(0, 0.6, 0.32); g.add(knob);
  g.userData.knob = knob; return g;
}
export function capsule(color = 0xff3b3b) { const g = new THREE.Group(); const a = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), M(color)); const b = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 8, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), M(0xffffff, { transparent: true, opacity: 0.7 })); g.add(a, b); return g; }
export function rowHouses(n = 6, seed = 2) { // Häuserzeile mit bunten Fassaden
  const g = new THREE.Group(); const cols = [0xf4efe6, 0xf2d7b6, 0xd9e6f2, 0xe8d0d0, 0xdfe8cf, 0xf0e3a8]; let r = seed;
  const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < n; i++) { const h = 7 + Math.floor(rnd() * 3) * 2.5; const hb = new THREE.Group();
    hb.add(at(box(5.8, h, 6, cols[i % cols.length]), 0, h / 2, 0));
    hb.add(at(box(6, 0.6, 6.2, 0x8b3a2b), 0, h + 0.3, 0));
    for (let f = 1; f < h / 2.6; f++) for (const x of [-1.6, 1.6]) hb.add(at(box(1.1, 1.2, 0.1, 0x9fd3ff, { emissive: 0xffd9a0, emissiveIntensity: 0.15 }), x, f * 2.6, 3.02));
    hb.add(at(box(1.2, 2.2, 0.1, 0x6b4a2b), 0, 1.1, 3.02));
    hb.position.set((i - (n - 1) / 2) * 6, 0, 0); g.add(hb); }
  return g;
}
export function oldOwner() { // der Automatenkönig: Schnurrbart, Weste, Schiebermütze
  const p = person({ shirt: 0x6d4c41, pants: 0x3e2723, cap: 0x5d4037, hat: 'cap', skin: 0xf1c7a0 });
  const h = p.userData.head; h.add(at(box(0.3, 0.07, 0.05, 0xdddddd), 0, 0.06, 0.26)); h.add(at(box(0.36, 0.08, 0.05, 0xdddddd), 0, 0.27, 0.24));
  p.userData.torso.add(at(box(0.64, 0.5, 0.38, 0xb8860b), 0, 0.05, 0)); return p;
}
export function kid(shirt = 0x3b82f6) { const p = person({ shirt, hat: 'hair', hair: 0x6d4c41 }); p.scale.setScalar(0.62); return p; }
export function bed() { const g = new THREE.Group(); g.add(at(box(2.0, 0.45, 3.0, 0x8a5a33), 0, 0.22, 0)); g.add(at(box(1.9, 0.25, 2.9, 0xffffff), 0, 0.55, 0)); g.add(at(box(1.9, 0.18, 2.0, 0x3b82f6), 0, 0.7, 0.4)); g.add(at(box(0.9, 0.2, 0.5, 0xffffff), 0, 0.75, -1.1)); g.add(at(box(2.0, 1.0, 0.15, 0x6b4a2b), 0, 0.7, -1.5)); return g; }
export function counterDesk() { const g = new THREE.Group(); g.add(at(box(3.4, 1.1, 0.8, 0x9aa3ad), 0, 0.55, 0)); g.add(at(box(3.6, 0.08, 1.0, 0xd8dde3), 0, 1.14, 0)); g.add(at(box(3.4, 1.0, 0.05, 0xbfe3ff, { transparent: true, opacity: 0.35 }), 0, 1.7, -0.1)); return g; }
export function stamp() { const g = new THREE.Group(); g.add(at(cyl(0.08, 0.1, 0.3, 0x6d4c41, 8), 0, 0.3, 0)); g.add(at(box(0.3, 0.08, 0.2, C.red), 0, 0.1, 0)); return g; }
export function throne() { const g = new THREE.Group(); g.add(at(box(1.6, 0.6, 1.4, C.gold, { emissive: 0x6b4a00, emissiveIntensity: 0.3 }), 0, 0.3, 0)); g.add(at(box(1.6, 2.4, 0.3, C.gold, { emissive: 0x6b4a00, emissiveIntensity: 0.3 }), 0, 1.2, -0.6)); g.add(at(box(1.7, 0.2, 0.2, 0xc62828), 0, 2.4, -0.6)); return g; }

// ---------- Weihnachts-Welt (011) ----------
export function snowGround(size = 600) { const g = new THREE.Mesh(new THREE.PlaneGeometry(size, size), M(0xf2f6fb)); g.rotation.x = -Math.PI / 2; g.receiveShadow = true; return g; }
export function snowfall(scene, n = 400, area = 30, center = [0, 0, 0]) {
  const geo = new THREE.BufferGeometry(); const pos = new Float32Array(n * 3); let r = 9; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < n; i++) { pos[i * 3] = center[0] + (rnd() - 0.5) * area; pos[i * 3 + 1] = rnd() * 14; pos[i * 3 + 2] = center[2] + (rnd() - 0.5) * area; }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.9 })); scene.add(pts);
  const base = pos.slice(); scene.userData.tickers.push((t) => { for (let i = 0; i < n; i++) { pos[i * 3 + 1] = ((base[i * 3 + 1] - t * 1.2) % 14 + 14) % 14; pos[i * 3] = base[i * 3] + Math.sin(t + i) * 0.3; } geo.attributes.position.needsUpdate = true; });
  return pts;
}
export function lightString(len = 6, colors = [0xff3b3b, 0xffd400, 0x2ecc71, 0x3b82f6]) { const g = new THREE.Group(); for (let i = 0; i < len * 3; i++) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 4), new THREE.MeshBasicMaterial({ color: colors[i % colors.length] })); b.position.set(-len / 2 + i / 3, -Math.abs(Math.sin(i * 0.5)) * 0.25, 0); g.add(b); } return g; }
export function xmasHouse(wall = 0xf4efe6) { const h = house(); h.children[0].material = M(wall); const ls = lightString(8); ls.position.set(0, 6.1, 3.6); h.add(ls); const ls2 = lightString(7, [0xffe08a]); ls2.position.set(0, 2.9, 3.6); h.add(ls2);
  const wreath = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.12, 6, 14), M(0x2e7d32)); wreath.position.set(-1.5, 1.9, 3.62); h.add(wreath); return h; }
export function xmasTree(s = 1) { const g = new THREE.Group(); g.add(at(cyl(0.15 * s, 0.2 * s, 0.6 * s, C.trunk, 6), 0, 0.3 * s, 0));
  for (let i = 0; i < 3; i++) { const c = new THREE.Mesh(new THREE.ConeGeometry((1.1 - i * 0.3) * s, 1.2 * s, 8), M(0x2e7d32)); c.position.y = (0.9 + i * 0.7) * s; c.castShadow = true; g.add(c); }
  const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.22 * s), new THREE.MeshBasicMaterial({ color: 0xffe066 })); star.position.y = 2.7 * s; g.add(star);
  for (let i = 0; i < 18; i++) { const a = i * 2.4, h = 0.7 + (i / 18) * 1.7; const rr = (1.0 - (h - 0.6) / 2.4) * s; const b = new THREE.Mesh(new THREE.SphereGeometry(0.06 * s, 6, 4), new THREE.MeshBasicMaterial({ color: [0xff3b3b, 0xffd400, 0x3b82f6, 0xffffff][i % 4] })); b.position.set(Math.cos(a) * rr, h * s, Math.sin(a) * rr); g.add(b); }
  return g; }
export function present(color = 0xe53935, ribbon = 0xffd400, s = 0.5) { const g = new THREE.Group(); g.add(at(box(s, s * 0.8, s, color), 0, s * 0.4, 0)); g.add(at(box(s + 0.02, s * 0.82, s * 0.15, ribbon), 0, s * 0.4, 0)); g.add(at(box(s * 0.15, s * 0.82, s + 0.02, ribbon), 0, s * 0.4, 0)); return g; }
export function santa({ real = false } = {}) {
  const p = person({ shirt: 0xc62828, pants: 0xc62828, skin: 0xffd2b0, hat: 'hair', hair: 0xffffff });
  const u = p.userData, h = u.head;
  const hat = new THREE.Group(); const cone = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.6, 10), M(0xc62828)); cone.position.y = 0.55; cone.rotation.z = -0.3; hat.add(cone); hat.add(at(cyl(0.3, 0.3, 0.1, 0xffffff, 12), 0, 0.3, 0)); hat.add(at(ball(0.08, 0xffffff, 1), 0.18, 0.8, 0)); h.add(hat);
  const beard = new THREE.Group(); const b1 = box(0.42, 0.42, 0.14, 0xffffff); b1.position.set(0, -0.08, 0.2); beard.add(b1); beard.add(at(box(0.34, 0.06, 0.06, 0xffffff), 0, 0.06, 0.27)); h.add(beard); u.beard = beard;
  u.torso.add(at(box(0.66, 0.12, 0.4, 0x111111), 0, -0.1, 0)); u.torso.add(at(box(0.14, 0.1, 0.42, 0xd4af37), 0, -0.1, 0.01));
  u.torso.add(at(box(0.12, 0.7, 0.38, 0xffffff), 0, 0.02, 0.01));
  for (const l of [u.legL, u.legR]) l.add(at(box(0.25, 0.25, 0.36, 0x111111), 0, -0.82, 0.03));
  if (real) { p.scale.setScalar(1.25); const aura = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffd27a, transparent: true, opacity: 0.12, depthWrite: false })); aura.position.y = 1.2; p.add(aura); }
  return p;
}
export function student() { return person({ shirt: 0x6d6d6d, pants: 0x2f3b55, hat: 'hair', hair: 0x3a2a1e }); }
export function eScooter() { const g = new THREE.Group(); g.add(at(box(0.25, 0.06, 1.0, 0x222222), 0, 0.18, 0)); for (const z of [-0.45, 0.45]) { const w = cyl(0.13, 0.13, 0.06, 0x111111, 10); w.rotation.z = Math.PI / 2; w.position.set(0, 0.13, z); g.add(w); }
  g.add(at(cyl(0.025, 0.025, 1.0, 0x9aa3ad, 6), 0, 0.68, 0.45)); g.add(at(box(0.5, 0.04, 0.04, 0x222222), 0, 1.18, 0.45)); const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 4), new THREE.MeshBasicMaterial({ color: 0xffffff })); lamp.position.set(0, 1.0, 0.5); g.add(lamp); return g; }
export function dog(color = 0x8d6e63) { const g = new THREE.Group(); g.add(at(box(0.35, 0.3, 0.8, color), 0, 0.45, 0)); const head = at(box(0.3, 0.3, 0.35, color), 0, 0.65, 0.5); g.add(head); g.add(at(box(0.08, 0.15, 0.08, 0x5d4037), -0.12, 0.85, 0.45), at(box(0.08, 0.15, 0.08, 0x5d4037), 0.12, 0.85, 0.45));
  for (const [x, z] of [[-0.12, 0.3], [0.12, 0.3], [-0.12, -0.3], [0.12, -0.3]]) g.add(at(box(0.08, 0.3, 0.08, color), x, 0.15, z)); const tail = at(box(0.05, 0.05, 0.3, color), 0, 0.6, -0.5); g.add(tail); g.userData = { head, tail }; return g; }
export function mug(color = 0xc62828) { const g = new THREE.Group(); g.add(at(cyl(0.08, 0.07, 0.18, color, 10), 0, 0.09, 0)); const h = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.015, 4, 8), M(color)); h.position.set(0.09, 0.1, 0); g.add(h); return g; }
export function mirror() { const g = new THREE.Group(); g.add(at(box(1.0, 1.6, 0.08, 0x8a5a33), 0, 1.6, 0)); g.add(at(box(0.85, 1.45, 0.02, 0xcfe8ff, { emissive: 0x9fc6e8, emissiveIntensity: 0.4 }), 0, 1.6, 0.05)); return g; }
export function sofaRoom(scene) { scene.add(ground(200, 0x9a9a9a)); scene.add(room(10, 8, 3.2, 0xf6e1c3, 0x8d6e63)); const s = sofa(0x8e2424); s.position.set(-2, 0, -2.6); scene.add(s);
  const t = xmasTree(1.2); t.position.set(2.6, 0, -2.6); scene.add(t); for (let i = 0; i < 4; i++) { const pr = present([0xe53935, 0x1e88e5, 0x43a047, 0xfdd835][i], 0xffffff, 0.4); pr.position.set(2 + (i % 2) * 0.6, 0, -1.8 + Math.floor(i / 2) * 0.5); scene.add(pr); } }

// ---------- Solarpark & Schafe (012) ----------
export function panelRow(n = 8, tilt = 0.5) {
  const g = new THREE.Group();
  const panelMat = new THREE.MeshStandardMaterial({ color: 0x1d3c78, metalness: 0.6, roughness: 0.25, emissive: 0x0a1a3a, emissiveIntensity: 0.3 });
  for (let i = 0; i < n; i++) {
    const p = new THREE.Group();
    const pan = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.05, 1.6), panelMat); pan.rotation.x = tilt; pan.position.y = 1.3; pan.castShadow = true; pan.receiveShadow = true; p.add(pan);
    for (let k = 1; k < 4; k++) { const ln = box(1.9, 0.055, 0.02, 0x9fb4d8); ln.rotation.x = tilt; ln.position.set(0, 1.3 - Math.sin(tilt) * (-0.8 + k * 0.4), Math.cos(tilt) * (-0.8 + k * 0.4) * 1); p.add(ln); }
    for (const [x, z, h] of [[-0.8, -0.5, 1.6], [0.8, -0.5, 1.6], [-0.8, 0.5, 0.95], [0.8, 0.5, 0.95]]) p.add(at(box(0.06, h, 0.06, 0x9aa3ad), x, h / 2, z));
    p.position.x = (i - (n - 1) / 2) * 2.0; g.add(p);
  }
  return g;
}
export function solarPark(scene, rows = 6, cols = 10, gap = 4.5) { const g = new THREE.Group(); for (let r = 0; r < rows; r++) { const row = panelRow(cols); row.position.z = -r * gap; g.add(row); } scene.add(g); return g; }
export function sheep(s = 1) {
  const g = new THREE.Group(); const wool = M(0xf5f1e6);
  const body = new THREE.Group(); body.position.y = 0.55 * s;
  for (const [x, y, z, r] of [[0, 0, 0, 0.42], [0, 0.08, 0.28, 0.32], [0, 0.08, -0.28, 0.32], [0.18, 0.12, 0, 0.3], [-0.18, 0.12, 0, 0.3]]) { const b = new THREE.Mesh(new THREE.IcosahedronGeometry(r * s, 1), wool); b.position.set(x * s, y * s, z * s); b.castShadow = true; body.add(b); }
  g.add(body);
  const head = new THREE.Group(); head.position.set(0, 0.7 * s, 0.5 * s); head.add(at(box(0.24 * s, 0.26 * s, 0.32 * s, 0x2b2b2b), 0, 0, 0.05 * s));
  head.add(at(box(0.08 * s, 0.05 * s, 0.14 * s, 0x2b2b2b), -0.16 * s, 0.06 * s, -0.02 * s), at(box(0.08 * s, 0.05 * s, 0.14 * s, 0x2b2b2b), 0.16 * s, 0.06 * s, -0.02 * s));
  head.add(at(box(0.05 * s, 0.05 * s, 0.02 * s, 0xffffff), -0.07 * s, 0.05 * s, 0.22 * s), at(box(0.05 * s, 0.05 * s, 0.02 * s, 0xffffff), 0.07 * s, 0.05 * s, 0.22 * s));
  head.add(at(box(0.25 * s, 0.1 * s, 0.1 * s, wool.color.getHex()), 0, 0.15 * s, 0)); g.add(head);
  const legs = []; for (const [x, z] of [[-0.15, 0.22], [0.15, 0.22], [-0.15, -0.22], [0.15, -0.22]]) { const l = at(box(0.07 * s, 0.4 * s, 0.07 * s, 0x2b2b2b), x * s, 0.2 * s, z * s); g.add(l); legs.push(l); }
  g.userData = { head, body, legs }; return g;
}
export function graze(sh, t, i = 0) { const u = sh.userData; const k = (Math.sin(t * 1.5 + i) + 1) / 2; u.head.rotation.x = 0.2 + k * 0.7; u.head.position.y = u.head.userData.y0 ?? (u.head.userData.y0 = u.head.position.y); u.head.position.y = u.head.userData.y0 - k * 0.2 * (sh.scale.x || 1); }
export function sheepWalk(sh, t, i = 0) { sh.userData.legs.forEach((l, k) => l.rotation.x = Math.sin(t * 10 + i + (k % 2) * Math.PI) * 0.5); sh.userData.body.position.y = 0.55 + Math.abs(Math.sin(t * 10 + i)) * 0.04; }
export function shepherd() { const p = person({ shirt: 0x5d7a3a, pants: 0x4e342e, hat: 'hair', hair: 0x6d4c41 }); const h = p.userData.head;
  h.add(at(cyl(0.42, 0.42, 0.04, 0x6d4c41, 14), 0, 0.3, 0)); h.add(at(cyl(0.24, 0.27, 0.22, 0x6d4c41, 12), 0, 0.42, 0)); h.add(at(box(0.3, 0.06, 0.04, 0x5d4037), 0, 0.02, 0.27));
  const st = at(cyl(0.03, 0.03, 1.8, 0x8a5a33, 6), 0, -0.6, 0.1); p.userData.armR.add(st); p.userData.staff = st; return p; }
export function grassTufts(n = 300, area = 30, h = 0.3, seed = 4, color = 0x4f9d3a, w = 1) {
  const m = new THREE.InstancedMesh(new THREE.ConeGeometry(0.12, 1, 4), M(color), n); const d = new THREE.Object3D(); let r = seed; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < n; i++) { d.position.set((rnd() - 0.5) * area, h / 2, (rnd() - 0.5) * area); d.scale.set(w, h * (0.6 + rnd() * 0.6), w); d.rotation.y = rnd() * 3; d.updateMatrix(); m.setMatrixAt(i, d.matrix); } m.userData = { n, area, seed }; return m;
}
export function mower() { const g = new THREE.Group(); g.add(at(box(1.2, 0.5, 1.6, 0xd32f2f), 0, 0.55, 0)); g.add(at(box(0.6, 0.5, 0.5, 0x333333), 0, 1.0, -0.3)); for (const [x, z, r] of [[-0.65, 0.55, 0.28], [0.65, 0.55, 0.28], [-0.65, -0.5, 0.38], [0.65, -0.5, 0.38]]) { const w = cyl(r, r, 0.2, 0x1b1b1b, 10); w.rotation.z = Math.PI / 2; w.position.set(x, r, z); g.add(w); } return g; }
export function hammock() { const g = new THREE.Group(); for (const x of [-1.6, 1.6]) g.add(at(cyl(0.08, 0.08, 1.8, 0x8a5a33, 6), x, 0.9, 0)); const n = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 3.0, 12, 1, true, Math.PI, Math.PI), M(0xffb74d, { side: THREE.DoubleSide })); n.rotation.z = Math.PI / 2; n.position.y = 1.1; g.add(n); return g; }
export function signBoard(text, color = 'red') { const g = new THREE.Group(); g.add(at(cyl(0.03, 0.03, 1.2, 0x8a5a33, 6), 0, 0.6, 0)); const t = tag(text, color, 0.6); t.position.y = 1.35; g.add(t); return g; }
export function nailScissors() { const g = new THREE.Group(); const a = box(0.02, 0.01, 0.18, 0xd0d4da), b = box(0.02, 0.01, 0.18, 0xd0d4da); a.rotation.y = 0.2; b.rotation.y = -0.2; g.add(a, b); g.add(at(new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.008, 4, 8), M(0xd0d4da)), 0.02, 0, -0.1)); return g; }

// ---------- Hüpfburg-Welt (013) ----------
export function bouncyCastle(s = 1, cols = [0xe53935, 0xffd400, 0x1e88e5]) { // aufblasbares Schloss, Ursprung Boden-Mitte, ca. 5 × 5 m
  const g = new THREE.Group(); const inner = new THREE.Group(); g.add(inner);
  const soft = (c) => M(c);
  const base = new THREE.Mesh(new THREE.BoxGeometry(5, 0.6, 5), soft(cols[0])); base.position.y = 0.3; base.castShadow = true; base.receiveShadow = true; inner.add(base);
  const floor = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.05, 4.2), soft(cols[1])); floor.position.y = 0.62; inner.add(floor);
  for (const [x, z, w, d] of [[0, -2.2, 4.4, 0.4], [-2.2, 0, 0.4, 4.4], [2.2, 0, 0.4, 4.4]]) { const wl = new THREE.Mesh(new THREE.BoxGeometry(w, 1.6, d), soft(cols[2])); wl.position.set(x, 1.4, z); wl.castShadow = true; inner.add(wl); }
  for (const x of [-1.5, 1.5]) { const fw = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.9, 0.4), soft(cols[2])); fw.position.set(x, 1.05, 2.2); inner.add(fw); }
  const towers = [];
  for (const [x, z, i] of [[-2.2, -2.2, 0], [2.2, -2.2, 1], [-2.2, 2.2, 2], [2.2, 2.2, 3]]) { const t = new THREE.Group(); t.position.set(x, 0.6, z);
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 2.6, 14), soft(i % 2 ? cols[1] : cols[0])); c.position.y = 1.3; c.castShadow = true; t.add(c);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.62, 1.0, 14), soft(cols[2])); cone.position.y = 3.1; t.add(cone);
    const ball2 = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), soft(cols[1])); ball2.position.y = 3.65; t.add(ball2); inner.add(t); towers.push(t); }
  const arch = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.28, 10, 18, Math.PI), soft(cols[0])); arch.position.set(0, 2.3, -2.2); inner.add(arch);
  g.scale.setScalar(s); g.userData = { inner, towers }; return g;
}
export function inflate(castle, k, t = 0) { const i = castle.userData.inner; const e = Math.max(0.04, k); i.scale.set(1 + (1 - e) * 0.15, e, 1 + (1 - e) * 0.15); i.rotation.z = (1 - e) * 0.05 * Math.sin(t * 3); }
export function wobble(castle, t, amp = 0.03) { const i = castle.userData.inner; i.scale.y = 1 + Math.sin(t * 9) * amp; i.scale.x = i.scale.z = 1 - Math.sin(t * 9) * amp * 0.5; }
export function blower() { const g = new THREE.Group(); g.add(at(box(0.6, 0.6, 0.5, 0x1e88e5), 0, 0.35, 0)); const fan = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.05, 12), M(0x222222)); fan.rotation.x = Math.PI / 2; fan.position.set(0, 0.4, 0.27); g.add(fan);
  const tube = cyl(0.16, 0.16, 1.6, 0xe53935, 10); tube.rotation.x = Math.PI / 2; tube.position.set(0, 0.35, -1.0); g.add(tube); g.userData.fan = fan; return g; }
export function airJar() { const g = new THREE.Group(); g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.45, 16), new THREE.MeshStandardMaterial({ color: 0xcfefff, transparent: true, opacity: 0.35, roughness: 0.05, metalness: 0.1 })));
  g.add(at(cyl(0.21, 0.21, 0.08, 0xd4af37, 16), 0, 0.26, 0)); return g; }
export function cake() { const g = new THREE.Group(); g.add(at(cyl(0.35, 0.35, 0.25, 0x8d5524, 16), 0, 0.12, 0)); g.add(at(cyl(0.36, 0.36, 0.06, 0xffc1d9, 16), 0, 0.27, 0));
  for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; g.add(at(cyl(0.015, 0.015, 0.14, [0xff3b3b, 0x3b82f6, 0xffd400][i % 3], 5), Math.sin(a) * 0.2, 0.37, Math.cos(a) * 0.2)); g.add(at(new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 4), new THREE.MeshBasicMaterial({ color: 0xffb300 })), Math.sin(a) * 0.2, 0.46, Math.cos(a) * 0.2)); } return g; }
export function balloon(color = 0xff3b3b, len = 1.6) { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 10), M(color)); b.scale.y = 1.2; b.position.y = len; g.add(b);
  g.add(at(box(0.01, len, 0.01, 0xeeeeee), 0, len / 2, 0)); return g; }
export function partyHat(color = 0x9b59b6) { return new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.3, 10), M(color)); }
export function rolledCastle() { const g = new THREE.Group(); const r = cyl(0.55, 0.55, 1.6, 0xe53935, 14); r.rotation.z = Math.PI / 2; r.position.y = 0.55; g.add(r); for (const x of [-0.5, 0.5]) { const s = cyl(0.57, 0.57, 0.08, 0x222222, 14); s.rotation.z = Math.PI / 2; s.position.set(x, 0.55, 0); g.add(s); } return g; }
export function pallet() { const g = new THREE.Group(); for (let i = 0; i < 5; i++) g.add(at(box(0.18, 0.04, 1.2, 0xc8a165), -0.5 + i * 0.25, 0.14, 0)); for (const z of [-0.5, 0, 0.5]) g.add(at(box(1.2, 0.12, 0.12, 0xa88452), 0, 0.06, z)); return g; }
export function rain(scene, n = 600, area = 24, center = [0, 0, 0]) { const geo = new THREE.BufferGeometry(); const pos = new Float32Array(n * 6); let r = 3; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  const seeds = []; for (let i = 0; i < n; i++) seeds.push([center[0] + (rnd() - 0.5) * area, rnd() * 14, center[2] + (rnd() - 0.5) * area]);
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); const ln = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: 0xaecbe8, transparent: true, opacity: 0.6 })); scene.add(ln);
  scene.userData.tickers.push((t) => { for (let i = 0; i < n; i++) { const [x, y0, z] = seeds[i]; const y = (y0 - t * 12) % 14; const yy = y < 0 ? y + 14 : y; pos.set([x, yy, z, x + 0.03, yy + 0.5, z], i * 6); } geo.attributes.position.needsUpdate = true; }); return ln; }
export function beach(scene) { const sand = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), M(0xf2d79b)); sand.rotation.x = -Math.PI / 2; sand.receiveShadow = true; scene.add(sand);
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(400, 200), new THREE.MeshStandardMaterial({ color: 0x1ca3d8, roughness: 0.15, metalness: 0.2, emissive: 0x05324a, emissiveIntensity: 0.3 })); sea.rotation.x = -Math.PI / 2; sea.position.set(0, 0.03, -110); scene.add(sea);
  scene.userData.tickers.push((t) => { sea.position.y = 0.03 + Math.sin(t * 1.2) * 0.02; }); return { sand, sea }; }
export function umbrella(color = 0xff3b3b) { const g = new THREE.Group(); g.add(at(cyl(0.03, 0.03, 2.2, 0xffffff, 6), 0, 1.1, 0)); g.add(at(new THREE.Mesh(new THREE.ConeGeometry(1.2, 0.5, 10), M(color, { side: THREE.DoubleSide })), 0, 2.3, 0)); return g; }

// ---------- Mülltonnen-Welt (014) ----------
export const BIN = { bio: 0x6d4c2f, rest: 0x2b2f36, papier: 0x1e5fb4, gelb: 0xf2c200 };
export function bin(color = BIN.bio, { dirty = false } = {}) { // 240-l-Tonne mit Deckel (Scharnier hinten) + Rädern
  const g = new THREE.Group(); const body = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.3, 1.0, 4, 1), M(color)); body.rotation.y = Math.PI / 4; body.scale.set(1, 1, 1.25); body.position.y = 0.55; body.castShadow = true; g.add(body);
  g.add(at(box(0.56, 0.06, 0.74, color), 0, 1.05, 0));
  const lid = new THREE.Group(); lid.position.set(0, 1.1, -0.36); lid.add(at(box(0.6, 0.06, 0.76, color), 0, 0, 0.38)); g.add(lid);
  lid.add(at(box(0.3, 0.05, 0.06, 0x222222), 0, 0.02, 0.76));
  for (const x of [-0.25, 0.25]) { const w = cyl(0.1, 0.1, 0.06, 0x111111, 10); w.rotation.z = Math.PI / 2; w.position.set(x, 0.1, -0.38); g.add(w); }
  g.add(at(box(0.5, 0.05, 0.05, 0x333333), 0, 0.95, -0.42));
  if (dirty) for (let i = 0; i < 7; i++) { const sp = box(0.16 + (i % 3) * 0.06, 0.12 + (i % 2) * 0.08, 0.01, 0x4a3b1c); sp.position.set(-0.2 + (i * 0.13) % 0.4, 0.3 + (i * 0.17) % 0.6, 0.46); g.add(sp); }
  g.userData = { lid, body }; return g;
}
export function flies(scene, center = [0, 1.2, 0], n = 14, r = 0.7) { const g = new THREE.Group(); const fl = [];
  for (let i = 0; i < n; i++) { const f = new THREE.Mesh(new THREE.SphereGeometry(0.022, 6, 4), new THREE.MeshBasicMaterial({ color: 0x111111 })); g.add(f); fl.push(f); }
  g.position.set(...center); scene.add(g); scene.userData.tickers.push((t) => fl.forEach((f, i) => f.position.set(Math.sin(t * (3 + i % 4) + i) * r * (0.5 + (i % 3) * 0.25), Math.sin(t * (5 + i % 3) + i * 2) * 0.35, Math.cos(t * (3.5 + i % 5) + i) * r * (0.5 + (i % 2) * 0.4)))); return g; }
export function maggots(scene, center = [0, 0, 0], n = 20, r = 0.6) { const g = new THREE.Group(); const ms = [];
  for (let i = 0; i < n; i++) { const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.03, 0.1, 2, 6), M(0xf4ecd0)); m.rotation.z = Math.PI / 2; g.add(m); ms.push(m); }
  g.position.set(...center); scene.add(g); scene.userData.tickers.push((t) => ms.forEach((m, i) => { const a = i * 2.4 + t * 0.3 * (i % 2 ? 1 : -1); const rr = r * (0.4 + (i % 5) * 0.15); m.position.set(Math.cos(a) * rr, 0.02, Math.sin(a) * rr); m.rotation.y = -a; m.scale.x = 1 + Math.sin(t * 8 + i) * 0.25; })); return g; }
export function stink(scene, center = [0, 1.2, 0], n = 3, color = 0x8bc34a) { const ws = [];
  for (let i = 0; i < n; i++) { const pts = []; for (let k = 0; k < 12; k++) pts.push(new THREE.Vector3(Math.sin(k * 0.9) * 0.08, k * 0.07, 0)); const l = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 20, 0.022, 5), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8 })); l.position.set(center[0] - 0.2 + i * 0.2, center[1], center[2]); scene.add(l); ws.push(l); }
  scene.userData.tickers.push((t) => ws.forEach((l, i) => { const k = (t * 0.6 + i / n) % 1; l.position.y = center[1] + k * 0.6; l.material.opacity = 0.9 * (1 - k); l.rotation.y = t + i; })); return ws; }
export function waterJet(scene, from = [0, 1, 0], to = [0, 0, 0], n = 60, color = 0xbfe8ff) { // Hochdruck-Strahl aus Tröpfchen
  const geo = new THREE.BufferGeometry(); const pos = new Float32Array(n * 3); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color, size: 0.06, transparent: true, opacity: 0.9 })); scene.add(pts);
  const F = new THREE.Vector3(...from), T = new THREE.Vector3(...to);
  pts.userData.set = (f, tt) => { F.set(...f); T.set(...tt); };
  scene.userData.tickers.push((t) => { for (let i = 0; i < n; i++) { const k = (t * 3 + i / n) % 1; const j = Math.sin(i * 12.9) * 0.05; pos.set([F.x + (T.x - F.x) * k + j, F.y + (T.y - F.y) * k + Math.sin(i * 7.1) * 0.04, F.z + (T.z - F.z) * k + j], i * 3); } geo.attributes.position.needsUpdate = true; }); return pts; }
export function splash(scene, at3 = [0, 0, 0], n = 40) { const geo = new THREE.BufferGeometry(); const pos = new Float32Array(n * 3); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xd8f1ff, size: 0.05, transparent: true, opacity: 0.85 })); pts.position.set(...at3); scene.add(pts);
  scene.userData.tickers.push((t) => { for (let i = 0; i < n; i++) { const k = (t * 2 + i / n) % 1; const a = i * 2.4; pos.set([Math.cos(a) * k * 0.5, Math.sin(k * Math.PI) * 0.4, Math.sin(a) * k * 0.5], i * 3); } geo.attributes.position.needsUpdate = true; }); return pts; }
export function cleanTrailer() { // Reinigungsanhänger: Kasten, Tank, Hebebühne vorne
  const g = new THREE.Group(); g.add(at(box(2.0, 1.6, 3.2, 0x1e88e5), 0, 1.25, 0)); g.add(at(box(2.02, 0.2, 3.22, 0xffffff), 0, 1.6, 0));
  const tank = cyl(0.45, 0.45, 1.6, 0xdfe6ee, 14); tank.rotation.z = Math.PI / 2; tank.position.set(0, 2.3, -0.6); g.add(tank);
  for (const z of [-0.9, 0.9]) { const w = cyl(0.4, 0.4, 2.2, 0x111111, 12); w.rotation.z = Math.PI / 2; w.position.set(0, 0.4, z); g.add(w); }
  const lift = new THREE.Group(); lift.position.set(0, 1.0, 1.7); lift.add(at(box(0.8, 0.08, 0.5, 0x9aa3ad), 0, 0, 0.2)); g.add(lift);
  const nozzle = at(cyl(0.05, 0.05, 0.4, 0x333333, 6), 0, 2.2, 1.65); g.add(nozzle); g.userData = { lift, nozzle }; return g; }
export function gully() { const g = new THREE.Group(); g.add(at(box(0.7, 0.04, 0.45, 0x2a2a2a), 0, 0.03, 0)); for (let i = 0; i < 6; i++) g.add(at(box(0.06, 0.05, 0.38, 0x555555), -0.25 + i * 0.1, 0.05, 0)); return g; }
export function pedestal() { const g = new THREE.Group(); g.add(at(box(1.2, 1.0, 1.2, 0xf5f5f5), 0, 0.5, 0)); g.add(at(box(1.3, 0.08, 1.3, 0xd8c3a0), 0, 1.04, 0)); return g; }
export function ropeBarrier(len = 3) { const g = new THREE.Group(); for (const x of [-len / 2, len / 2]) { g.add(at(cyl(0.04, 0.06, 0.9, 0xd4af37, 8), x, 0.45, 0)); g.add(at(new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), M(0xd4af37)), x, 0.92, 0)); }
  const r = cyl(0.03, 0.03, len, 0xb71c1c, 6); r.rotation.z = Math.PI / 2; r.position.y = 0.8; g.add(r); return g; }
export function spotlight(scene, target, color = 0xfff3d6) { const s = new THREE.SpotLight(color, 60, 20, 0.45, 0.5); s.position.set(target.x, target.y + 6, target.z + 2); s.target.position.copy(target); scene.add(s, s.target);
  const cone = new THREE.Mesh(new THREE.ConeGeometry(1.4, 6, 20, 1, true), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.07, side: THREE.DoubleSide, depthWrite: false })); cone.position.set(target.x, target.y + 3, target.z + 1); cone.rotation.x = -0.32; scene.add(cone); return s; }
export function sparkles(scene, center = [0, 1, 0], n = 10, r = 0.6) { const ss = []; for (let i = 0; i < n; i++) { const s = new THREE.Mesh(new THREE.OctahedronGeometry(0.06, 0), new THREE.MeshBasicMaterial({ color: 0xffffff })); scene.add(s); ss.push(s); }
  scene.userData.tickers.push((t) => ss.forEach((s, i) => { const k = (t * 1.5 + i / n) % 1; s.position.set(center[0] + Math.sin(i * 3.3) * r, center[1] + Math.cos(i * 2.1) * r * 0.8, center[2] + 0.4 + Math.cos(i * 1.7) * 0.2); s.scale.setScalar(Math.sin(k * Math.PI) * 1.6); s.rotation.y = t * 3; })); return ss; }
export function shinyMat() { return new THREE.MeshStandardMaterial({ color: 0xe8edf2, metalness: 0.9, roughness: 0.12, emissive: 0x6c7a88, emissiveIntensity: 0.35 }); }
export function shine(obj) { const m = shinyMat(); obj.traverse(o => { if (o.isMesh && !o.userData.keep) o.material = m; }); }
