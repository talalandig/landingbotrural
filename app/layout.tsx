import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://botrural.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // ── Core ──
  title: {
    default: "BotRural - Gestiona tu campo con WhatsApp e Inteligencia Artificial",
    template: "%s | BotRural",
  },
  description:
    "BotRural es la plataforma de gestion rural que permite registrar ganaderia, agricultura, finanzas y clima desde WhatsApp con inteligencia artificial. Audios, textos y fotos se convierten en datos al instante.",

  // ── Keywords (Google los usa como señal secundaria, IAs los leen directo) ──
  keywords: [
    "gestion rural",
    "gestion de campo",
    "gestion ganadera",
    "gestion agricola",
    "software ganadero",
    "software agricola",
    "agro tecnologia",
    "agtech",
    "bot whatsapp campo",
    "bot whatsapp ganaderia",
    "bot whatsapp agricultura",
    "inteligencia artificial agro",
    "IA rural",
    "IA ganadera",
    "IA agricola",
    "registro ganadero por whatsapp",
    "registro agricola por whatsapp",
    "pastoreo rotativo",
    "control de ganado",
    "campo digital",
    "campo inteligente",
    "agro uruguay",
    "agro argentina",
    "agro latinoamerica",
    "fielddata",
    "botrural",
    "gestion de potreros",
    "control de insumos agro",
    "finanzas rurales",
    "clima campo",
    "lluvia campo",
    "registro de lluvias",
    "software rural",
    "app para el campo",
    "tecnologia para el campo",
  ],

  // ── Canonical & alternate ──
  alternates: {
    canonical: SITE_URL,
    languages: {
      "es": SITE_URL,
      "es-UY": SITE_URL,
      "es-AR": SITE_URL,
      "es-419": SITE_URL,
    },
  },

  // ── Authors & creator ──
  authors: [{ name: "BotRural", url: SITE_URL }],
  creator: "BotRural",
  publisher: "BotRural",

  // ── Category ──
  category: "Technology",

  // ── Robots ──
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph (Facebook, LinkedIn, WhatsApp, Telegram, Discord, IAs) ──
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: SITE_URL,
    siteName: "BotRural",
    title: "BotRural - Gestiona tu campo con WhatsApp e Inteligencia Artificial",
    description:
      "Registra ganaderia, agricultura, finanzas y clima desde WhatsApp. Tu capataz manda un audio y la IA lo convierte en datos. Sin apps, sin complicaciones.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BotRural - Gestion rural con WhatsApp e IA",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X ──
  twitter: {
    card: "summary_large_image",
    title: "BotRural - Gestiona tu campo con WhatsApp e IA",
    description:
      "Registra ganaderia, agricultura, finanzas y clima desde WhatsApp. Tu capataz manda un audio y la IA lo convierte en datos.",
    images: ["/og-image.png"],
    creator: "@botrural",
    site: "@botrural",
  },

  // ── App links ──
  appLinks: {
    web: {
      url: SITE_URL,
      should_fallback: true,
    },
  },

  // ── Otros ──
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for Google, Bing, IAs
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "BotRural",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/BotRural.svg`,
        },
        description:
          "Plataforma de gestion rural con inteligencia artificial y WhatsApp. Ganaderia, agricultura, finanzas y clima en un solo lugar.",
        foundingDate: "2024",
        sameAs: [
          "https://twitter.com/botrural",
          "https://instagram.com/botrural",
          "https://linkedin.com/company/botrural",
        ],
        email: "info@botrural.com",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "info@botrural.com",
          url: "https://botrural.com",
          availableLanguage: ["Spanish"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "BotRural",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "es",
        description:
          "Gestiona tu campo con WhatsApp e inteligencia artificial. Ganaderia, agricultura, finanzas y clima.",
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "BotRural - Gestiona tu campo con WhatsApp e Inteligencia Artificial",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        description:
          "BotRural es la plataforma de gestion rural que permite registrar ganaderia, agricultura, finanzas y clima desde WhatsApp con inteligencia artificial.",
        inLanguage: "es",
      },
      {
        "@type": "SoftwareApplication",
        name: "BotRural",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, WhatsApp",
        description:
          "Bot de WhatsApp con inteligencia artificial para gestion de campos ganaderos y agricolas. Registra eventos por audio, texto o foto.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Prueba gratuita sin tarjeta de credito",
        },
        featureList: [
          "Registro ganadero por WhatsApp",
          "Registro agricola por WhatsApp",
          "Control de pastoreo rotativo",
          "Registro de lluvias y clima",
          "Finanzas rurales: gastos y ventas",
          "Reconocimiento de audios con IA",
          "Reconocimiento de fotos con IA",
          "Exportacion a Excel y PDF",
          "Panel web con mapas y reportes",
          "Gestion de equipos con roles",
        ],
        screenshot: `${SITE_URL}/og-image.png`,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Que es BotRural?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "BotRural es una plataforma de gestion rural que permite registrar y consultar datos de tu campo a traves de WhatsApp con inteligencia artificial. Ganaderia, agricultura, finanzas y clima en un solo lugar.",
            },
          },
          {
            "@type": "Question",
            name: "¿Como funciona BotRural?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Tu capataz o equipo manda un audio, texto o foto por WhatsApp. La inteligencia artificial procesa el mensaje y registra automaticamente los datos: movimientos de ganado, lluvias, gastos, siembras y mas.",
            },
          },
          {
            "@type": "Question",
            name: "¿Necesito instalar alguna aplicacion?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. BotRural funciona directamente desde WhatsApp. No necesitas descargar ni aprender ninguna app nueva. Tu equipo ya sabe usar WhatsApp.",
            },
          },
          {
            "@type": "Question",
            name: "¿Que datos puedo registrar con BotRural?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Podes registrar ganaderia (movimientos, pesadas, sanidad), agricultura (siembras, pulverizaciones, cosechas), finanzas (gastos, ventas, facturas), clima (lluvias, heladas) y pastoreo rotativo.",
            },
          },
          {
            "@type": "Question",
            name: "¿BotRural es gratuito?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "BotRural ofrece una prueba gratuita sin tarjeta de credito. En 2 minutos tenes tu campo configurado y tu equipo registrando datos.",
            },
          },
          {
            "@type": "Question",
            name: "¿En que paises funciona BotRural?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "BotRural funciona en toda Latinoamerica. Esta diseñado especialmente para productores rurales de Uruguay, Argentina, Brasil, Paraguay y toda la region.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Geo targeting para IAs y buscadores */}
        <meta name="geo.region" content="UY" />
        <meta name="geo.placename" content="Uruguay" />
        <meta name="ICBM" content="-34.9011, -56.1645" />

        {/* AI-specific meta hints */}
        <meta name="subject" content="Gestion rural con WhatsApp e inteligencia artificial" />
        <meta name="topic" content="Agtech, gestion ganadera, gestion agricola, software rural" />
        <meta name="summary" content="BotRural permite gestionar tu campo desde WhatsApp con IA. Ganaderia, agricultura, finanzas y clima sin apps, sin complicaciones." />
        <meta name="classification" content="Business/Agriculture Technology" />
        <meta name="target" content="productores rurales, ganaderos, agricultores, ingenieros agronomos, capataces" />
        <meta name="coverage" content="Latinoamerica" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
