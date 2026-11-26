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
  const cv = document.createElement('canvas'); cv.width = 4; cv.height = 256;
  const g = cv.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 256);
  if (sky === 'indoor') { gr.addColorStop(0, '#d9dde3'); gr.addColorStop(1, '#f2efe8'); }
  else { gr.addColorStop(0, '#6f7fd6'); gr.addColorStop(0.55, '#f2a3a0'); gr.addColorStop(1, '#ffd08a'); }
  g.fillStyle = gr; g.fillRect(0, 0, 4, 256);
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
  scene.background = tex;
  scene.fog = new THREE.Fog(sky === 'indoor' ? 0xe8e6e0 : 0xf6c79a, 60, 190);
  scene.add(new THREE.HemisphereLight(0xfff1dc, 0x6a7a5a, sky === 'indoor' ? 2.2 : 1.9));
  const sun = new THREE.DirectionalLight(sky === 'indoor' ? 0xffffff : 0xffd2a0, sky === 'indoor' ? 1.8 : 2.8);
  sun.position.set(-30, 40, 25); sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -45, right: 45, top: 45, bottom: -45, near: 1, far: 140 });
  sun.shadow.bias = -0.0005;
  scene.add(sun); scene.add(sun.target);
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
