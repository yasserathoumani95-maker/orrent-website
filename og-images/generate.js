const fs = require("fs");
const dir = "C:/Users/MI/Desktop/orrent-website/og-images/";

const header = (brand, tag) => `
  <text x="80" y="105" font-family="Arial Black" font-weight="900" font-size="20" fill="#16C784" letter-spacing="8" opacity="0.7">${brand}</text>
  ${tag ? `<rect x="80" y="130" width="110" height="32" rx="16" fill="#16C784" opacity="0.15"/>
  <text x="135" y="151" font-family="Arial" font-size="13" fill="#16C784" text-anchor="middle" font-weight="600">${tag}</text>` : ""}
  <rect x="80" y="175" width="50" height="4" rx="2" fill="#16C784"/>`;

const bg = () => `<rect width="1200" height="630" fill="#0A1628"/>`;

const svgs = {
  "og-home.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  ${bg()}
  <circle cx="980" cy="120" r="200" fill="none" stroke="#16C784" stroke-width="1" opacity="0.12"/>
  <circle cx="980" cy="120" r="140" fill="none" stroke="#16C784" stroke-width="1" opacity="0.1"/>
  <circle cx="980" cy="120" r="80" fill="#16C784" opacity="0.06"/>
  <text x="80" y="170" font-family="Arial Black" font-weight="900" font-size="26" fill="#16C784" letter-spacing="8">ORRENT</text>
  <rect x="80" y="200" width="60" height="6" rx="3" fill="#16C784"/>
  <text x="80" y="290" font-family="Arial Black" font-weight="900" font-size="62" fill="#FFFFFF">Propulsez votre</text>
  <text x="80" y="365" font-family="Arial Black" font-weight="900" font-size="62" fill="#16C784">business digital</text>
  <text x="80" y="440" font-family="Arial Black" font-weight="900" font-size="62" fill="#FFFFFF">aux Comores</text>
  <text x="80" y="505" font-family="Arial" font-size="21" fill="#94A3B8">Strategie de contenu · Inbound Marketing · Reseaux sociaux</text>
  <rect x="80" y="540" width="260" height="40" rx="20" fill="#16C784" opacity="0.12"/>
  <text x="210" y="565" font-family="Arial" font-size="15" fill="#16C784" text-anchor="middle">Agence Marketing Digital</text>
</svg>`,

  "og-services.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  ${bg()}
  <line x1="0" y1="210" x2="1200" y2="210" stroke="#FFFFFF" stroke-width="0.5" opacity="0.05"/>
  <line x1="400" y1="0" x2="400" y2="630" stroke="#FFFFFF" stroke-width="0.5" opacity="0.05"/>
  <line x1="800" y1="0" x2="800" y2="630" stroke="#FFFFFF" stroke-width="0.5" opacity="0.05"/>
  <text x="80" y="155" font-family="Arial Black" font-weight="900" font-size="22" fill="#16C784" letter-spacing="8">ORRENT</text>
  <rect x="80" y="175" width="50" height="5" rx="2.5" fill="#16C784"/>
  <text x="80" y="262" font-family="Arial Black" font-weight="900" font-size="58" fill="#FFFFFF">Nos Services</text>
  <text x="80" y="320" font-family="Arial" font-size="21" fill="#94A3B8">Marketing Digital pour entrepreneurs comoriens</text>
  <rect x="80" y="358" width="225" height="85" rx="12" fill="#16C784" opacity="0.1" stroke="#16C784" stroke-width="1" stroke-opacity="0.3"/>
  <text x="192" y="388" font-family="Arial Black" font-size="13" fill="#16C784" text-anchor="middle">Diagnostic</text>
  <text x="192" y="408" font-family="Arial" font-size="12" fill="#FFFFFF" text-anchor="middle" opacity="0.6">GRATUIT</text>
  <rect x="325" y="358" width="225" height="85" rx="12" fill="#16C784" opacity="0.07" stroke="#16C784" stroke-width="1" stroke-opacity="0.2"/>
  <text x="437" y="388" font-family="Arial Black" font-size="13" fill="#16C784" text-anchor="middle">Strategie</text>
  <text x="437" y="408" font-family="Arial" font-size="12" fill="#FFFFFF" text-anchor="middle" opacity="0.6">CONTENU</text>
  <rect x="570" y="358" width="225" height="85" rx="12" fill="#16C784" opacity="0.05" stroke="#16C784" stroke-width="1" stroke-opacity="0.15"/>
  <text x="682" y="388" font-family="Arial Black" font-size="13" fill="#16C784" text-anchor="middle">Reseaux</text>
  <text x="682" y="408" font-family="Arial" font-size="12" fill="#FFFFFF" text-anchor="middle" opacity="0.6">SOCIAUX</text>
</svg>`,

  "og-formations.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  ${bg()}
  <text x="640" y="520" font-family="Arial Black" font-weight="900" font-size="400" fill="#16C784" opacity="0.035">17</text>
  <text x="80" y="155" font-family="Arial Black" font-weight="900" font-size="22" fill="#16C784" letter-spacing="8">ORRENT</text>
  <rect x="80" y="175" width="50" height="5" rx="2.5" fill="#16C784"/>
  <rect x="80" y="200" width="215" height="36" rx="18" fill="#16C784" opacity="0.15"/>
  <text x="187" y="222" font-family="Arial" font-size="14" fill="#16C784" text-anchor="middle" font-weight="600">Formation Gratuite</text>
  <text x="80" y="325" font-family="Arial Black" font-weight="900" font-size="68" fill="#FFFFFF">Samedi Digital</text>
  <text x="80" y="390" font-family="Arial" font-size="24" fill="#16C784" font-weight="600">17 sessions · Chaque samedi · 100% gratuit</text>
  <text x="80" y="440" font-family="Arial" font-size="19" fill="#94A3B8">Strategie, TikTok, Psychologie client, Tunnel de vente</text>
  <rect x="80" y="490" width="290" height="48" rx="10" fill="#FFFFFF" opacity="0.05"/>
  <text x="225" y="519" font-family="Arial" font-size="17" fill="#FFFFFF" text-anchor="middle">+100 entrepreneurs formes</text>
</svg>`,

  "og-blog.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  ${bg()}
  <circle cx="1000" cy="315" r="200" fill="none" stroke="#16C784" stroke-width="70" opacity="0.03"/>
  <circle cx="1000" cy="315" r="80" fill="#16C784" opacity="0.04"/>
  <text x="80" y="155" font-family="Arial Black" font-weight="900" font-size="22" fill="#16C784" letter-spacing="8">ORRENT</text>
  <rect x="80" y="175" width="50" height="5" rx="2.5" fill="#16C784"/>
  <text x="80" y="272" font-family="Arial Black" font-weight="900" font-size="70" fill="#FFFFFF">Blog</text>
  <text x="80" y="355" font-family="Arial Black" font-weight="900" font-size="70" fill="#16C784">Marketing</text>
  <text x="80" y="416" font-family="Arial" font-size="22" fill="#94A3B8">Conseils pratiques pour entrepreneurs comoriens</text>
  <rect x="80" y="452" width="130" height="34" rx="17" fill="#FFFFFF" opacity="0.06"/>
  <text x="145" y="474" font-family="Arial" font-size="13" fill="#FFFFFF" text-anchor="middle" opacity="0.7">TikTok</text>
  <rect x="225" y="452" width="160" height="34" rx="17" fill="#FFFFFF" opacity="0.06"/>
  <text x="305" y="474" font-family="Arial" font-size="13" fill="#FFFFFF" text-anchor="middle" opacity="0.7">Psychologie</text>
  <rect x="400" y="452" width="175" height="34" rx="17" fill="#FFFFFF" opacity="0.06"/>
  <text x="487" y="474" font-family="Arial" font-size="13" fill="#FFFFFF" text-anchor="middle" opacity="0.7">Tunnel de vente</text>
</svg>`,

  "og-ebooks.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  ${bg()}
  <rect x="820" y="140" width="280" height="360" rx="8" fill="#16C784" opacity="0.05"/>
  <rect x="855" y="170" width="215" height="300" rx="6" fill="#16C784" opacity="0.05"/>
  <rect x="890" y="200" width="150" height="240" rx="4" fill="#16C784" opacity="0.07"/>
  <line x1="890" y1="200" x2="890" y2="440" stroke="#16C784" stroke-width="2" opacity="0.2"/>
  <text x="80" y="155" font-family="Arial Black" font-weight="900" font-size="22" fill="#16C784" letter-spacing="8">ORRENT</text>
  <rect x="80" y="175" width="50" height="5" rx="2.5" fill="#16C784"/>
  <rect x="80" y="205" width="140" height="34" rx="17" fill="#16C784" opacity="0.15"/>
  <text x="150" y="227" font-family="Arial" font-size="13" fill="#16C784" text-anchor="middle" font-weight="600">6 eBooks</text>
  <text x="80" y="325" font-family="Arial Black" font-weight="900" font-size="60" fill="#FFFFFF">Guides Pratiques</text>
  <text x="80" y="398" font-family="Arial Black" font-weight="900" font-size="60" fill="#16C784">Marketing Digital</text>
  <text x="80" y="455" font-family="Arial" font-size="20" fill="#94A3B8">TikTok · Tunnel de vente · Psychologie client</text>
  <text x="80" y="512" font-family="Arial" font-size="18" fill="#16C784" opacity="0.8">A partir de 2 500 KMF — Livraison WhatsApp</text>
</svg>`,

  "og-tiktok.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  ${bg()}
  <circle cx="1060" cy="315" r="270" fill="none" stroke="#16C784" stroke-width="85" opacity="0.04"/>
  <circle cx="1060" cy="315" r="140" fill="#16C784" opacity="0.04"/>
  ${header("ORRENT", "Article")}
  <text x="80" y="260" font-family="Arial Black" font-weight="900" font-size="52" fill="#FFFFFF">Construire votre</text>
  <text x="80" y="322" font-family="Arial Black" font-weight="900" font-size="52" fill="#FFFFFF">audience</text>
  <text x="80" y="384" font-family="Arial Black" font-weight="900" font-size="52" fill="#16C784">TikTok</text>
  <text x="80" y="442" font-family="Arial Black" font-weight="900" font-size="36" fill="#FFFFFF" opacity="0.7">sans budget pub</text>
  <text x="80" y="500" font-family="Arial" font-size="18" fill="#94A3B8">5 etapes · Contenu organique · Marche comorien</text>
</svg>`,

  "og-psychologie.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  ${bg()}
  <circle cx="960" cy="230" r="7" fill="#16C784" opacity="0.4"/>
  <circle cx="1040" cy="310" r="5" fill="#16C784" opacity="0.3"/>
  <circle cx="885" cy="340" r="6" fill="#16C784" opacity="0.35"/>
  <circle cx="975" cy="390" r="4" fill="#16C784" opacity="0.25"/>
  <circle cx="1075" cy="200" r="4" fill="#16C784" opacity="0.2"/>
  <line x1="960" y1="230" x2="1040" y2="310" stroke="#16C784" stroke-width="1.2" opacity="0.15"/>
  <line x1="960" y1="230" x2="885" y2="340" stroke="#16C784" stroke-width="1.2" opacity="0.12"/>
  <line x1="1040" y1="310" x2="975" y2="390" stroke="#16C784" stroke-width="1.2" opacity="0.1"/>
  <line x1="885" y1="340" x2="975" y2="390" stroke="#16C784" stroke-width="1.2" opacity="0.1"/>
  ${header("ORRENT", "Article")}
  <text x="80" y="262" font-family="Arial Black" font-weight="900" font-size="48" fill="#FFFFFF">Les biais cognitifs</text>
  <text x="80" y="324" font-family="Arial Black" font-weight="900" font-size="48" fill="#16C784">de vos clients</text>
  <text x="80" y="380" font-family="Arial" font-size="26" fill="#FFFFFF" opacity="0.7">comoriens</text>
  <text x="80" y="428" font-family="Arial" font-size="18" fill="#94A3B8">5 leviers psychologiques pour mieux vendre</text>
  <rect x="80" y="462" width="160" height="30" rx="15" fill="#FFFFFF" opacity="0.05"/>
  <text x="160" y="482" font-family="Arial" font-size="12" fill="#94A3B8" text-anchor="middle">Preuve sociale</text>
  <rect x="255" y="462" width="100" height="30" rx="15" fill="#FFFFFF" opacity="0.05"/>
  <text x="305" y="482" font-family="Arial" font-size="12" fill="#94A3B8" text-anchor="middle">Rarete</text>
  <rect x="370" y="462" width="100" height="30" rx="15" fill="#FFFFFF" opacity="0.05"/>
  <text x="420" y="482" font-family="Arial" font-size="12" fill="#94A3B8" text-anchor="middle">Ancrage</text>
</svg>`,

  "og-tunnel.svg": `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  ${bg()}
  <polygon points="820,110 1150,110 1070,490 900,490" fill="#16C784" opacity="0.04"/>
  <polygon points="865,155 1105,155 1040,440 925,440" fill="#16C784" opacity="0.04"/>
  <polygon points="910,200 1060,200 1015,390 950,390" fill="#16C784" opacity="0.05"/>
  ${header("ORRENT", "Article")}
  <text x="80" y="264" font-family="Arial Black" font-weight="900" font-size="52" fill="#16C784">Tunnel de vente</text>
  <text x="80" y="330" font-family="Arial Black" font-weight="900" font-size="52" fill="#FFFFFF">en 7 jours</text>
  <text x="80" y="390" font-family="Arial" font-size="21" fill="#94A3B8">Guide pratique · Outils gratuits · Comores</text>
  <text x="80" y="430" font-family="Arial" font-size="17" fill="#16C784" opacity="0.7">Du client ideal au premier funnel operationnel</text>
  <circle cx="88" cy="490" r="19" fill="#16C784" opacity="0.9"/>
  <text x="88" y="496" font-family="Arial Black" font-size="12" fill="#0A1628" text-anchor="middle">J1</text>
  <circle cx="140" cy="490" r="19" fill="#16C784" opacity="0.55"/>
  <text x="140" y="496" font-family="Arial" font-size="12" fill="#FFFFFF" text-anchor="middle">J2</text>
  <circle cx="192" cy="490" r="19" fill="#16C784" opacity="0.32"/>
  <text x="192" y="496" font-family="Arial" font-size="12" fill="#FFFFFF" text-anchor="middle">J3</text>
  <circle cx="244" cy="490" r="19" fill="#16C784" opacity="0.18"/>
  <text x="244" y="496" font-family="Arial" font-size="12" fill="#FFFFFF" text-anchor="middle">J4</text>
  <circle cx="296" cy="490" r="19" fill="#16C784" opacity="0.1"/>
  <text x="296" y="496" font-family="Arial" font-size="12" fill="#FFFFFF" text-anchor="middle">J5</text>
  <circle cx="348" cy="490" r="19" fill="#16C784" opacity="0.07"/>
  <text x="348" y="496" font-family="Arial" font-size="12" fill="#FFFFFF" text-anchor="middle">J6</text>
  <circle cx="400" cy="490" r="19" fill="#16C784" opacity="0.05"/>
  <text x="400" y="496" font-family="Arial" font-size="12" fill="#FFFFFF" text-anchor="middle">J7</text>
</svg>`
};

for (const [name, content] of Object.entries(svgs)) {
  fs.writeFileSync(dir + name, content);
  console.log("Created: " + name);
}
