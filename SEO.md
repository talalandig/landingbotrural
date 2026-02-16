# SEO - BotRural

## Dominio y contacto configurados
- **URL base**: `https://botrural.com` (cambiar en `app/layout.tsx` linea 16 si es diferente)
- **Email**: `info@botrural.com`

---

## Estado actual - IMPLEMENTADO

### Metadata Core (layout.tsx)
- Title optimizado con template para subpaginas: `"BotRural - Gestiona tu campo con WhatsApp e Inteligencia Artificial"`
- Description de 160 caracteres con keywords naturales
- 35+ keywords estrategicas (ganaderia, agricultura, agtech, WhatsApp, IA, pastoreo, etc.)
- Canonical URLs + alternates por idioma (es, es-UY, es-AR, es-419)
- Viewport + theme-color responsive
- Idioma del HTML configurado en español (`lang="es"`)

### Open Graph (Facebook, LinkedIn, WhatsApp, Telegram, Discord)
- Tipo: website
- Locale: es_UY
- Titulo, descripcion e imagen configurados
- Imagen referenciada: `/public/og-image.png` (1200x630px)

### Twitter / X Cards
- Card tipo: summary_large_image
- Titulo, descripcion e imagen configurados
- Cuenta: @botrural

### Structured Data - JSON-LD (lo que leen Google, Bing y las IAs)
- **Organization**: identidad de BotRural, logo, email, redes sociales
- **WebSite**: estructura del sitio
- **WebPage**: pagina principal
- **SoftwareApplication**: BotRural como producto con lista de features
- **FAQPage**: 6 preguntas frecuentes (genera rich snippets en Google)

### robots.txt (app/robots.ts)
- Permite indexacion total del sitio
- Permite explicitamente los bots de IAs:
  - GPTBot (ChatGPT)
  - ChatGPT-User
  - Google-Extended (Gemini/Bard)
  - Anthropic-AI (Claude)
  - ClaudeBot
  - Bytespider (Grok/TikTok)
  - CCBot (Common Crawl)
- Bloquea /api/ y /login/

### sitemap.xml (app/sitemap.ts)
- Generado dinamicamente por Next.js
- Incluye: home (prioridad 1.0), terminos (0.3), privacidad (0.3)
- Se actualiza automaticamente con cada build

### manifest.json (app/manifest.ts)
- PWA ready
- Nombre, descripcion, colores de marca

### Meta tags extra para IAs
- subject, topic, summary, classification
- target (publico objetivo)
- coverage (Latinoamerica)
- Geo targeting (Uruguay: geo.region, geo.placename, ICBM)

### Paginas legales (requeridas por Meta/Google)
- **Terminos y Condiciones**: `/terminos` - adaptado a BotRural, WhatsApp, IA, ley uruguaya
- **Politica de Privacidad**: `/privacidad` - detalla datos recopilados, uso de IA, WhatsApp, derechos del usuario, cookies, retencion de datos
- Ambas accesibles desde el footer global
- Contacto con info@botrural.com en ambas paginas

### Footer global
- Presente en todas las paginas (layout.tsx)
- Links a Funcionalidades, Bot WhatsApp, Plataforma
- Links a Guia de uso, Soporte, Contacto (info@botrural.com)
- Links a Terminos y Condiciones, Politica de Privacidad
- Email visible: info@botrural.com

### Performance
- Preconnect a Google Fonts

---

## Pendiente - TODO

### ALTA PRIORIDAD

#### 1. Crear imagen OG
- **Archivo**: `/public/og-image.png`
- **Tamaño**: 1200 x 630 pixeles
- **Contenido sugerido**: logo de BotRural + texto "Gestiona tu campo con WhatsApp e IA" + fondo con foto de campo o color de marca
- **Formato**: PNG o JPG
- **Donde se usa**: preview cuando alguien comparte el link en WhatsApp, Facebook, Twitter, LinkedIn, Telegram, Discord, Slack
- **Herramientas**: Canva (template "OG Image"), Figma, o cualquier editor
- **Prompt para Canva IA**: `Professional SaaS product banner for an agtech startup called "BotRural". Clean modern design with a dark gradient background (dark purple to black). On the left side, show the app concept: a WhatsApp chat interface on a phone screen with farm data messages. On the right side, leave space for a logo and the tagline "Gestiona tu campo con WhatsApp e IA". Subtle background elements: green farm fields, cattle silhouettes, wheat crops. Style: minimal, tech, premium. Colors: dark purple, green (#00934a), white text. Dimensions: 1200x630px.`

#### 2. Comprar dominio botrural.com
- Recomendado: Cloudflare Registrar (~$10/año, precio de costo)
- Alternativas baratas: Namecheap, Porkbun
- Conectar a Vercel en la config del proyecto

#### 3. Configurar email info@botrural.com
- Cloudflare ofrece email routing gratis (redirige a tu Gmail)
- Alternativa: Google Workspace (~$6/mes, te da suite completa)
- Este email es clave para la verificacion de Meta Business

#### 4. Google Search Console (post deploy)
- Ir a https://search.google.com/search-console
- Verificar propiedad del dominio botrural.com
- Enviar sitemap: `https://botrural.com/sitemap.xml`
- Monitorear indexacion y errores

### MEDIA PRIORIDAD

#### 5. Favicon mejorado
- El favicon actual es el default de Next.js
- Reemplazar `/app/favicon.ico` con el logo de BotRural
- Idealmente agregar tambien:
  - `/public/icon-192.png` (192x192) para Android
  - `/public/icon-512.png` (512x512) para PWA
  - `/public/apple-touch-icon.png` (180x180) para iOS

#### 6. Google Analytics / Tag Manager
- Crear cuenta en Google Analytics 4
- Agregar el script de GA4 en layout.tsx
- Trackear: visitas, bounce rate, clics en "Ingresar", scroll depth

#### 7. Google Business Profile
- Si BotRural tiene direccion fisica, crear perfil en Google Business
- Mejora la presencia en Google Maps y busquedas locales

### BAJA PRIORIDAD

#### 8. Redes sociales en JSON-LD
- Actualizar las URLs reales de redes sociales en layout.tsx (buscar "sameAs"):
  ```
  "https://twitter.com/botrural"      -> URL real
  "https://instagram.com/botrural"    -> URL real
  "https://linkedin.com/company/botrural" -> URL real
  ```

#### 9. Bing Webmaster Tools
- Ir a https://www.bing.com/webmasters
- Verificar dominio y enviar sitemap
- Bing alimenta a ChatGPT en muchos casos

#### 10. Backlinks y contenido (ESTRATEGIA CONTINUA)
- Publicar en directorios agtech (ej: AgFunder, AgriTech Tomorrow)
- Crear blog con articulos sobre gestion rural, pastoreo, IA en agro
- Conseguir menciones en medios rurales de Uruguay/Argentina
- Publicar en ProductHunt como lanzamiento

---

## Archivos de SEO en el proyecto

| Archivo | Que hace |
|---|---|
| `app/layout.tsx` | Metadata global, JSON-LD, Open Graph, Twitter, keywords, meta tags, email |
| `app/sitemap.ts` | Genera /sitemap.xml automaticamente |
| `app/robots.ts` | Genera /robots.txt con reglas para bots e IAs |
| `app/manifest.ts` | Genera /manifest.webmanifest para PWA |
| `app/terminos/page.tsx` | Pagina de Terminos y Condiciones |
| `app/privacidad/page.tsx` | Pagina de Politica de Privacidad |
| `app/components/Footer.tsx` | Footer global con links legales y email |
| `public/og-image.png` | **PENDIENTE** - Imagen de preview para redes sociales |
| `public/favicon.ico` | Favicon del sitio (mejorar con logo) |

---

## Como verificar que funciona

### Antes de subir a Vercel
- Abrir http://localhost:3000 y ver el `<head>` en DevTools
- Verificar que aparecen: title, description, og:image, twitter:card, JSON-LD

### Despues de subir a Vercel
1. **Google Rich Results Test**: https://search.google.com/test/rich-results - pegar URL y verificar que detecta FAQPage y SoftwareApplication
2. **Facebook Debugger**: https://developers.facebook.com/tools/debug/ - pegar URL y ver preview de OG
3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator - pegar URL y ver card
4. **Schema Validator**: https://validator.schema.org/ - verificar JSON-LD
5. **Google PageSpeed**: https://pagespeed.web.dev/ - medir performance (afecta ranking)
6. **Lighthouse en Chrome**: DevTools > Lighthouse > SEO score

---

## Checklist para verificacion de Meta Business
Meta revisa estos puntos al verificar tu empresa:
- [x] Sitio web profesional activo
- [x] Terminos y Condiciones publicados
- [x] Politica de Privacidad publicada
- [x] Nombre coherente (BotRural en web, Meta Business, WhatsApp)
- [x] Logo presente en el sitio
- [x] Email de contacto visible (info@botrural.com)
- [ ] Dominio propio (botrural.com) - PENDIENTE compra
- [ ] Email con dominio propio funcionando - PENDIENTE config
- [ ] Verificacion de dominio en Meta Business Suite
