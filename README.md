# 🤖 BotRural Landing Page

Landing page profesional con animaciones interactivas, lista para desplegar en Vercel.

## ✨ Características Implementadas

### 🎬 Animaciones
- ✅ **Hero animado** con blobs flotantes en el fondo
- ✅ **Navegación con efecto glassmorphism** al hacer scroll
- ✅ **Animaciones de entrada** (fade-in, slide-up) con Framer Motion
- ✅ **Mockup de celular interactivo** con simulación de WhatsApp
- ✅ **Chat demo funcional** con mensajes secuenciales y delays realistas
- ✅ **Efectos hover** en cards y botones
- ✅ **Indicador de scroll animado**

### 📱 Demo Interactivo
- 🎯 **3 demos clickeables**: Insumos, Consultas, Facturas
- 💬 Simulación de audio de WhatsApp
- ⏱️ Delays realistas (1 segundo entre mensajes)
- 💭 Indicador de "escribiendo..."
- 📊 Respuestas estructuradas del bot

### 🎨 Diseño
- 🌈 Gradientes verdes (tema rural/campo)
- 📐 Diseño responsive (mobile-first)
- 🔤 Tipografía clara y legible
- 🎭 Efectos glassmorphism y blur
- 🌊 Transiciones suaves

## 📦 Instalación

### 1. Copiar archivo principal

En tu proyecto `botrural-landing`, **REEMPLAZA** el archivo existente:

\`\`\`bash
# Eliminar el archivo actual
rm app/page.tsx

# Copiar el nuevo (desde donde descargaste los archivos)
cp /ruta/a/page.tsx app/page.tsx
\`\`\`

O simplemente:
1. Abre `app/page.tsx` en VS Code
2. Borra todo el contenido
3. Copia y pega el contenido del archivo `page.tsx` que te generé

### 2. Verificar que Framer Motion esté instalado

Ya lo instalaste antes, pero verifica:

\`\`\`bash
npm list framer-motion
\`\`\`

Si no aparece, instálalo:

\`\`\`bash
npm install framer-motion
\`\`\`

### 3. Instalar lucide-react (iconos)

\`\`\`bash
npm install lucide-react
\`\`\`

## 🚀 Ejecutar Localmente

\`\`\`bash
npm run dev
\`\`\`

Abre: \`http://localhost:3001\` (o el puerto que te indique)

## 📤 Subir a GitHub

\`\`\`bash
# 1. Ver el status
git status

# 2. Agregar todos los archivos
git add .

# 3. Hacer commit
git commit -m "Landing page con animaciones interactivas"

# 4. Crear repo en GitHub (ve a github.com y crea un nuevo repositorio)
# Cópialo el link que te da (ejemplo: https://github.com/talalanding/botrural-landing.git)

# 5. Conectar con GitHub
git remote add origin https://github.com/talalanding/botrural-landing.git

# 6. Subir
git branch -M main
git push -u origin main
\`\`\`

## 🌐 Desplegar en Vercel

### Opción 1: Desde la Web (Más Fácil)

1. Ve a [vercel.com](https://vercel.com)
2. Haz login con tu cuenta nueva
3. Click en **"Add New Project"**
4. Click en **"Import Git Repository"**
5. Conecta tu cuenta de GitHub
6. Selecciona el repo `botrural-landing`
7. Click en **"Deploy"**
8. ¡Listo! En 2 minutos tu sitio está live

### Opción 2: Desde CLI

\`\`\`bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Para producción
vercel --prod
\`\`\`

## 🎯 Cómo Funciona el Demo Interactivo

### Flujo de Interacción:

1. Usuario hace click en uno de los 3 ejemplos (izquierda)
2. Se muestra un mensaje de audio enviado por el usuario (300ms delay)
3. Bot muestra indicador "escribiendo..." (1.5s después)
4. Bot responde con datos estructurados (2.8s después del click inicial)

### Personalización:

Para cambiar los textos de las respuestas del bot, edita la función `getDemoResponse` en `page.tsx`:

\`\`\`typescript
const getDemoResponse = (type: string) => {
  const responses: any = {
    'insumos': {
      title: '✅ Tu título aquí',
      data: [
        { label: 'Campo 1', value: 'Valor 1' },
        // ... más campos
      ]
    },
    // ... más respuestas
  };
  return responses[type];
};
\`\`\`

## 🎨 Personalizar Colores

Los colores principales están en gradientes. Para cambiarlos:

\`\`\`typescript
// Busca estas clases en page.tsx:
from-green-600 to-emerald-600  // Cambiar por tus colores
bg-green-600                    // Color principal
\`\`\`

## 📱 Secciones de la Landing

1. **Hero**: Título principal con CTA y estadísticas
2. **Demo Interactivo**: Mockup de celular con WhatsApp funcional
3. **Features**: 3 cards con características principales
4. **CTA Final**: Call to action con botón
5. **Footer**: Links y copyright

## 🔧 Tecnologías Usadas

- **Next.js 14** - Framework React
- **Tailwind CSS** - Estilos
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos
- **TypeScript** - Tipado

## 📝 Notas Importantes

- El servidor debe estar corriendo en el puerto 3001 (el 3000 está ocupado por tu otro proyecto)
- Todas las animaciones son CSS/JS, no videos (carga rápida)
- El diseño es mobile-first (se ve bien en celular)
- Los colores y textos son 100% personalizables

## 🐛 Troubleshooting

**Error: Module not found 'framer-motion'**
\`\`\`bash
npm install framer-motion
\`\`\`

**Error: Module not found 'lucide-react'**
\`\`\`bash
npm install lucide-react
\`\`\`

**Puerto 3000 en uso**
- Normal, tu otro proyecto lo está usando
- Este usa el 3001 automáticamente

## 🎉 Próximos Pasos

1. ✅ Personaliza textos y colores
2. ✅ Agrega tu contenido específico
3. ✅ Sube a GitHub
4. ✅ Despliega en Vercel
5. ✅ Comparte tu landing!

---

**Creado con ❤️ para BotRural**