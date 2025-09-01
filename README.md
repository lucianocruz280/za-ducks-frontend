<div align="center">

## ZA Ducks Frontend
Frontend con Next.js 15, TailwindCSS, shadcn/ui y TypeScript. Consume el backend de ZA Ducks.

</div>

📦 Instalación local (sin Docker)
Ejecuta estos comandos en tu terminal.
```bash
git clone https://github.com/tu-usuario/za-ducks-frontend.git
cd za-ducks-frontend
npm install
npm run dev
```

## Variables de entorno

Crea un archivo .env.local en la raíz con este contenido.

```bash
NEXT_PUBLIC_API_URL=http://localhost:3005
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
```

## Uso con Docker (recomendado)

Construye y levanta el Frontend con Compose.

```bash
docker compose up --build frontend
```

## URLs de referencia:

```bash
Frontend ..... http://localhost:3000
Backend ...... http://localhost:3005/api
```

## Si cambiaste .env.local, reconstruye:

```bash
docker compose down -v
docker compose build --no-cache
docker compose up
```

## Rutas principales

Usa estas rutas para probar la interfaz.

```bash
GET /

GET /search?q=adi
```

## Endpoints consumidos (API)

El frontend consume estos endpoints del backend.

```bash
GET http://localhost:3005/api/products
```
```bash

GET http://localhost:3005/api/search?q=adi&skip=0&take=12
```

## Estructura del proyecto

Referencia rápida de carpetas/archivos (Pages Router).
---
src/
  ├─ pages/
  │    ├─ index.tsx
  │    └─ search.tsx
  ├─ components/
  ├─ lib/
  ├─ styles/
  └─ public/
---

Scripts útiles

Comandos de NPM más usados.

```bash
npm run dev       # desarrollo
npm run build     # compilar
npm run start     # producción local
npm run lint      # lint
npm run format    # formateo
```