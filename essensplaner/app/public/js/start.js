// Startseite: Beispiel-Bon umschalten (echte Pläne, beim Bauen gerechnet) und Wartelisten-Formular prüfen.
const bon = document.getElementById('demo-bon');
const wert = (n, f) => document.querySelector(`[name=${n}]:checked`)?.value || f;
document.addEventListener('change', (ev) => {
  if (!['demo-personen', 'demo-laden'].includes(ev.target.name)) return;
  bon.innerHTML = window.WB_DEMO[`${wert('demo-personen', '2')}-${wert('demo-laden', 'aldi')}`];
  bon.classList.remove('druck'); void bon.offsetWidth; bon.classList.add('druck');
});

const lead = document.getElementById('leadform');
if (lead) lead.addEventListener('submit', (ev) => {
  const status = document.getElementById('leadstatus');
  const mail = lead.querySelector('[name=email]');
  if (!mail.checkValidity()) { ev.preventDefault(); status.textContent = 'Bitte gib eine gültige E-Mail-Adresse ein.'; mail.focus(); return; }
  if (!lead.querySelector('[name=einwilligung]').checked) { ev.preventDefault(); status.textContent = 'Bitte bestätige, dass wir dir Mails schicken dürfen.'; return; }
  if (!lead.getAttribute('action')) { ev.preventDefault(); status.textContent = 'Die Anmeldung öffnet in Kürze. Bis dahin kannst du den Tagesplan gratis ausprobieren.'; }
});
