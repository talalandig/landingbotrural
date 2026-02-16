import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BotRural - Gestion rural con WhatsApp e IA",
    short_name: "BotRural",
    description:
      "Gestiona tu campo desde WhatsApp con inteligencia artificial. Ganaderia, agricultura, finanzas y clima.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#7c3aed",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
