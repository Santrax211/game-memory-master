# Memory Master 

Un juego de memoria interactivo y pulido construido con **Next.js**, **React** y **Tailwind CSS**. Pon a prueba tu memoria encontrando pares de cartas mientras compites contra el reloj en niveles progresivamente más desafiantes.

## Características

- **Niveles Progresivos**: Comienza con 8 cartas y aumenta la dificultad con cada nivel
- **Sistema de Puntuación**: Gana puntos por velocidad y precisión
- **Temporizador**: Completa cada nivel antes de que se acabe el tiempo
- **Tutorial Interactivo**: Aprende a jugar con un tutorial paso a paso
- **Modo Claro/Oscuro**: Interfaz adaptable a tus preferencias
- **Diseño Responsive**: Juega perfectamente en móvil, tablet o escritorio
- **Mejor Puntuación**: Guarda tu mejor puntuación localmente
- **Animaciones Suaves**: Transiciones y efectos visuales pulidos

## Tecnologías

- **Next.js 15** - Framework React con App Router
- **React 19** - Librería UI
- **Tailwind CSS v4** - Estilos y diseño responsive
- **TypeScript** - Tipado estático
- **Lucide React** - Iconos

## Instalación

### Opción 1: Usando shadcn CLI (Recomendado)

```bash
npx shadcn-cli@latest init -d memory-game
cd memory-game
npm run dev
```

### Opción 2: Clonar y ejecutar

```bash
git clone https://github.com/tu-usuario/memory-master.git
cd memory-master
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para jugar.

## Cómo Jugar

1. **Inicia el Juego**: Haz clic en "Comenzar Juego" desde el menú principal
2. **Aprende**: Completa el tutorial interactivo para entender la mecánica
3. **Juega**: Voltea las cartas para encontrar pares coincidentes
4. **Gana Puntos**: Obtén más puntos por encontrar pares rápidamente
5. **Avanza de Nivel**: Completa todos los pares antes de que se acabe el tiempo
6. **Supera tu Récord**: Intenta superar tu mejor puntuación

## Estructura del Proyecto

```
memory-master/
├── app/
│   ├── page.tsx              # Página principal y lógica del juego
│   ├── layout.tsx            # Layout raíz
│   └── globals.css           # Estilos globales y tokens de diseño
├── components/
│   ├── game-board.tsx        # Tablero de juego
│   ├── game-header.tsx       # Encabezado con estadísticas
│   ├── memory-card.tsx       # Componente individual de carta
│   ├── tutorial.tsx          # Tutorial interactivo
│   ├── level-complete.tsx    # Pantalla de nivel completado
│   ├── game-over.tsx         # Pantalla de fin de juego
│   ├── theme-toggle.tsx      # Toggle de modo claro/oscuro
│   └── ui/                   # Componentes shadcn/ui
└── lib/
    └── utils.ts              # Utilidades
```

## Características Técnicas

### Lógica del Juego
- **Estado del Juego**: Menú, Tutorial, Jugando, Pausado, Nivel Completado, Game Over
- **Sistema de Puntos**: Basado en velocidad (tiempo restante) y precisión (menos movimientos)
- **Niveles Dinámicos**: Aumenta el número de cartas y el tiempo disponible
- **Almacenamiento Local**: Guarda la mejor puntuación en localStorage

### Diseño Responsive
- Optimizado para móvil (320px+)
- Tablet (768px+)
- Escritorio (1024px+)
- Modo claro y oscuro automático

### Animaciones
- Volteo suave de cartas
- Transiciones de pantalla
- Efectos hover en botones
- Animaciones de coincidencia

## Personalización

### Cambiar Símbolos
Edita el array `SYMBOLS` en `components/game-board.tsx`:

```typescript
const SYMBOLS = [
  "🎮", "🎯", "🎨", "🎭", // ... tus emojis aquí
]
```

### Ajustar Dificultad
Modifica la fórmula en `components/game-board.tsx`:

```typescript
const pairsCount = Math.min(4 + level, 9) // Cambia estos números
```

### Cambiar Colores
Edita los tokens de diseño en `app/globals.css`:

```css
@theme inline {
  --primary: #your-color;
  --secondary: #your-color;
  /* ... más tokens ... */
}
```

## Despliegue 🚀

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Otros Servicios
El proyecto es compatible con cualquier plataforma que soporte Next.js:
- Netlify
- GitHub Pages
- Railway
- Render
