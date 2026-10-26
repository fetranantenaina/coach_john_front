// Écrit public/config.js à partir de la variable d'environnement API_URL (exécuté avant le build : npm run build).
// Sans API_URL, le fichier existant est conservé. Sur Cloudflare Pages (CF_PAGES=1), API_URL est obligatoire :
// sans elle le site appellerait sa propre adresse au lieu du backend.
import { writeFileSync } from 'node:fs';
if (process.env.CF_PAGES && !process.env.API_URL) {
  console.error("\n❌ API_URL manquant : ajoute la variable d'environnement API_URL (adresse du backend, ex. https://coach-john-api.onrender.com)\n   dans Cloudflare Pages > Settings > Variables and Secrets, puis relance le déploiement.\n");
  process.exit(1);
}
if (process.env.API_URL !== undefined) {
  const url = process.env.API_URL.replace(/\/+$/, '');
  writeFileSync('public/config.js', `window.__API_URL__ = ${JSON.stringify(url)};\n`);
  console.log(`config.js : API_URL = ${url || '(même adresse)'}`);
}
