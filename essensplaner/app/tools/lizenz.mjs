// Lizenzschlüssel für Plus (Ed25519). Der private Schlüssel gehört NUR auf den Server (server/vertrag-worker.js)
// bzw. in einen Passwortmanager – niemals ins Repository.
//
//   node tools/lizenz.mjs neu                         -> erzeugt Schlüsselpaar (öffentlicher Teil kommt in config.js)
//   node tools/lizenz.mjs signieren <privat.b64> jahr 2027-10-29 [id]
//
import { generateKeyPairSync, createPrivateKey, sign, randomUUID } from 'node:crypto';

const b64url = (buf) => Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

export function neuesPaar() {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519');
  return {
    oeffentlich: publicKey.export({ type: 'spki', format: 'der' }).toString('base64'),
    privat: privateKey.export({ type: 'pkcs8', format: 'der' }).toString('base64'),
  };
}

export function signiere(privatB64, art, bis, id = randomUUID()) {
  const key = createPrivateKey({ key: Buffer.from(privatB64, 'base64'), format: 'der', type: 'pkcs8' });
  const daten = b64url(JSON.stringify({ id, art, bis }));
  return `${daten}.${b64url(sign(null, Buffer.from(daten), key))}`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [cmd, ...a] = process.argv.slice(2);
  if (cmd === 'neu') {
    const p = neuesPaar();
    console.log('Öffentlich (config.js → lizenzSchluessel):\n' + p.oeffentlich + '\n\nPrivat (GEHEIM, nur Server/Passwortmanager):\n' + p.privat);
  } else if (cmd === 'signieren') {
    console.log(signiere(a[0], a[1], a[2], a[3]));
  } else {
    console.log('Aufruf: node tools/lizenz.mjs neu | signieren <privat.b64> <monat|jahr|pass|saison> <JJJJ-MM-TT> [id]');
  }
}
