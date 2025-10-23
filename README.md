# IA Agent
Proyecto Next.js con tRPC, Better Auth y Drizzle (Neon/Postgres).  
Este README explica los requisitos, las variables de entorno necesarias y los pasos para ejecutar la aplicación en local y en producción.

## Resumen
IA Agent es una aplicación web con autenticación (email/password y social logins), panel de control (dashboard) y gestión de agentes. Usa:
- Next.js (App Router)
- tRPC para llamadas tipo-safe
- Better Auth para autenticación
- Drizzle (o el adaptador de la librería) para conexión a Postgres/Neon
- Tailwind CSS y componentes UI internos

## Requisitos
- Node.js 18+ (recomendado LTS)
- npm / pnpm / yarn
- Base de datos Postgres accesible (Neon, Heroku Postgres, etc.)
- Cuentas y credenciales de OAuth:
  - Google Cloud Console (OAuth 2.0 Client ID)
  - GitHub OAuth App

## Variables de entorno (archivo `.env`)
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables. No subas este archivo al repositorio.

- DATABASE_URL
  - Postgres connection string (ej. postgres://user:password@host:port/dbname?sslmode=require)
- BETTER_AUTH_SECRET
  - Secreto para firmar tokens/sesiones (generar string aleatorio)
- BETTER_AUTH_URL
  - URL base de la app (ej. http://localhost:3000 o https://your-domain.com)
- GITHUB_CLIENT_ID
- GITHUB_CLIENT_SECRET
  - Credenciales del OAuth App de GitHub
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
  - Credenciales del OAuth 2.0 Client de Google
- NEXT_PUBLIC_APP_URL
  - URL pública usada por la app (ej. http://localhost:3000)

### Configurar OAuth (recomendado)
- Google:
  - Tipo de credencial: "Web application"
  - Authorized JavaScript origins: http://localhost:3000
  - Authorized redirect URIs: http://localhost:3000/api/auth/callback (o la ruta que use tu adaptador)
  - Habilitar pantalla de consentimiento y verificar si es necesario.
- GitHub:
  - Callback URL: http://localhost:3000/api/auth/callback/github (o la ruta que use tu adaptador)

> Nota: Si aparece un error tipo "disallowed_useragent" al usar Google social login, asegúrate de abrir el flujo OAuth en un navegador estándar (no webview embebido) y que las credenciales estén configuradas correctamente.

## Instalación y ejecución (desarrollo)
1. Clonar el repositorio
   ```bash
   git clone <repo-url>
   cd ai-agent
   ```
2. Instalar dependencias
   - npm:
     ```bash
     npm install
     ```
   - pnpm:
     ```bash
     pnpm install
     ```
3. Configurar `.env` (ver sección anterior).
4. Iniciar la aplicación en modo desarrollo
   ```bash
   npm run dev
   ```
   Por defecto la app corre en http://localhost:3000.

## Compilar y ejecutar en producción
1. Generar build
   ```bash
   npm run build
   ```
2. Iniciar servidor
   ```bash
   npm start
   ```
(O usa tu adaptador de despliegue preferido: Vercel, Fly, Docker, etc.)

## Base de datos y migraciones
- Si usas Drizzle / otro ORM, ejecutar las migraciones antes de iniciar (comando según la herramienta):
  ```bash
  # ejemplo genérico
  npm run migrate
  ```
- Asegúrate de que `DATABASE_URL` apunte correctamente y que el usuario tenga permisos.

## tRPC
- El proyecto incluye configuración de servidor y cliente tRPC.
- Si prefieres hidratar datos en SSR/SSG, ver la carpeta `src/trpc` para métodos de prefetch y query clients.

## ⚠ Buenas prácticas y seguridad
- No subir `.env` al repositorio. Añadir `.env` a `.gitignore`.
- Rotar secretos antes de publicar el repositorio si accidentalmente se expusieron.
- En producción, usar secretos gestionados por el hosting (Vercel Secrets, variables de entorno del proveedor).

## Estructura relevante del proyecto
- `src/app` — páginas y layouts (Next.js App Router)
- `src/modules` — lógica por feature (auth, dashboard, agents, etc.)
- `src/components` — componentes UI compartidos
- `src/trpc` — configuración tRPC client/server
- `src/db` — configuración y esquema de la base de datos
- `src/lib` — utilidades y wrappers (auth-client, utils, etc.)
