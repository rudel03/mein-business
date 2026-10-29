// Schickt einen signierten Test-Webhook an den lokal laufenden Worker (wrangler dev).
//   node test/webhook-senden.mjs <PADDLE_WEBHOOK_SECRET> [tarif] [email] [url]
// Ohne PADDLE_API_KEY in .dev.vars nimmt der Worker die E-Mail aus custom_data (nur zum Testen).
import { createHmac, randomUUID } from 'node:crypto';

const [secret, tarif = 'jahr', email = 'test@example.de', url = 'http://localhost:8787/paddle-webhook'] = process.argv.slice(2);
if (!secret) { console.log('Aufruf: node test/webhook-senden.mjs <secret> [monat|jahr|pass|saison] [email] [url]'); process.exit(1); }

const abo = tarif === 'monat' || tarif === 'jahr';
const jetzt = new Date();
const ende = new Date(jetzt); ende.setUTCMonth(ende.getUTCMonth() + (tarif === 'jahr' ? 12 : 1));
const body = JSON.stringify({
  event_id: `evt_test_${randomUUID()}`, event_type: 'transaction.completed', occurred_at: jetzt.toISOString(),
  data: {
    id: `txn_test${Date.now()}`, customer_id: 'ctm_test', subscription_id: abo ? 'sub_test' : null, custom_data: { email },
    billing_period: abo ? { starts_at: jetzt.toISOString(), ends_at: ende.toISOString() } : null,
    items: [{ price: { id: 'pri_test', custom_data: { tarif } } }],
  },
});
const ts = Math.floor(Date.now() / 1000);
const h1 = createHmac('sha256', secret).update(`${ts}:${body}`).digest('hex');
const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Paddle-Signature': `ts=${ts};h1=${h1}` }, body });
console.log(r.status, await r.text());
