# 🎬 Raiden Embedview Manager

Un servidor proxy ligero y eficiente construido con Express y TypeScript para gestionar la reproducción de video desde múltiples proveedores en [aniyae.net](https://aniyae.net). Este proyecto facilita la integración de 140+ proveedores de video mediante un sistema de embedview centralizado con URLs encriptadas.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Scripts Disponibles](#-scripts-disponibles)
- [Despliegue](#-despliegue)
- [Tecnologías](#-tecnologías)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Autor](#-autor)

## ✨ Características

- 🚀 **Servidor Express** con TypeScript para type-safety
- 🔒 **Sistema de hash** para URLs encriptadas en base64
- 📡 **Integración con 140+ proveedores** de video (Doodstream, Wishembed, Filemoon, Mixdrop, Lulu, OK.ru, y muchos más)
- 🎯 **Sistema de proveedores modular** con estrategia de patrón Strategy
- 🔄 **Compatibilidad retroactiva** con rutas legacy
- ⚡ **Hot-reload** en desarrollo con Bun --watch
- 🔧 **Linting con ESLint** para código limpio
- 🏥 **Health check endpoint** para monitoreo del servidor

## 📦 Requisitos Previos

- Bun (v1.0 o superior) [Descarga aquí](https://bun.sh)
- Git

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/alik-jc/raiden-embedview.git
cd raiden-embedview
```

### 2. Instalar dependencias

```bash
bun install
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```bash
cp .env.example .env
```

Configura las siguientes variables:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `SRV_URI` | Puerto donde el servidor escuchará | `3000` |
| `HASH` | Hash secreto usado para validar URLs encriptadas | `mySecretHash123` |
| `USER_AGENT` | User agent para requests a proveedores externos | `Mozilla/5.0 (Windows NT 10.0; Win64; x64)...` |

### Ejemplo de `.env`

```env
SRV_URI=3000
HASH=mySecretHash123
USER_AGENT=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
```

### Cómo funciona la URL

El servidor utiliza URLs encriptadas en base64 con el hash configurado:

```
http://localhost:3000/?mySecretHash123=aHR0cHM6Ly9kb29kLndzL2UvZXhhbXBsZQ==
```

Donde `aHR0cHM6Ly9kb29kLndzL2UvZXhhbXBsZQ==` es la URL del proveedor codificada en base64.

## 🎯 Uso

### Modo Desarrollo

Inicia el servidor con hot-reload:

```bash
bun dev
```

El servidor estará disponible en `http://localhost:[SRV_URI]` (puerto configurado en `.env`)

### Modo Producción

1. **Construir el proyecto:**

```bash
bun run build
```

Este comando ejecuta el linting y compila TypeScript a JavaScript en el directorio `dist/`.

2. **Iniciar el servidor:**

```bash
bun start
```

### Script de Deploy

Para actualizar y reiniciar en producción (requiere PM2):

```bash
bun run dp
```

Este comando:
1. Hace pull del repositorio
2. Ejecuta linting y construye el proyecto
3. Reinicia todos los procesos de PM2

## 🌐 Endpoints Disponibles

### Endpoint Principal
- **GET /** - Ruta principal que decodifica la URL y redirige al proveedor apropiado
  - Query params: `?[HASH]=[base64EncodedURL]&image=[imageUrl]&animeTitle=[title]`

### Endpoint de Proveedores
- **GET /provider/:providerName** - Maneja proveedores específicos
  - Proveedores disponibles: `dood`, `ok`, `wish`, `lulu`, `lulust`, `mixdrop`, `raidenplayer`, `moon`, `abyss`, `general`, `snbox`

### Rutas Legacy (Retrocompatibilidad)
- `/prod-dood-analyzer`, `/prod-analizer-ok`, `/prod-analizer-wish`, etc.
  - Redirigen automáticamente a `/provider/[nombre]`

### Otros Endpoints
- **GET /proxed** - Maneja proveedores específicos (lulu, filemoon, uqload)
- **GET /provisional** - Página de proveedor no disponible temporalmente
- **GET /prod-down** - Página de error para proveedores caídos
- **GET /health** - Health check del servidor

## 📁 Estructura del Proyecto

```
raiden-embedview/
├── src/
│   ├── assets/              # Recursos estáticos y configuración
│   │   ├── assets.ts        # Exportaciones de assets
│   │   ├── providers.json   # Mapeo de proveedores (100+ proveedores)
│   │   └── set-core.json    # Configuración del core
│   ├── providers/           # Integraciones con proveedores de video
│   │   ├── provider-strategy.ts  # Sistema de estrategia de proveedores
│   │   ├── prod-base.ts          # Funciones base de proveedores
│   │   ├── prod-down.ts          # Página de error para proveedores caídos
│   │   ├── prod-general.ts       # Proveedor genérico
│   │   ├── prod-qls.ts           # Funciones QLS
│   │   ├── prod-raidenplayer.ts  # Reproductor Raiden
│   │   ├── prod-secure.ts        # Funciones de seguridad
│   │   ├── prod-snbox.ts         # Proveedor Sandbox
│   │   └── prod-uri-analizer.ts  # Analizadores de URI
│   ├── conmuter.ts          # Lógica de conmutación de proveedores
│   ├── embed-serv.ts        # Servidor principal (entry point de la aplicación)
│   └── index.ts             # Re-exporta módulos para facilitar imports
├── dist/                    # Código compilado (generado por build)
├── .env.example             # Plantilla de variables de entorno
├── .eslintrc.json           # Configuración de ESLint
├── .gitignore               # Archivos ignorados por Git
├── package.json             # Dependencias y scripts
├── tsconfig.json            # Configuración de TypeScript
└── README.md                # Este archivo
```

### Arquitectura de Proveedores

El proyecto utiliza un **patrón Strategy** para manejar diferentes proveedores de video:

1. **providers.json** - Define el mapeo entre dominios de proveedores y sus handlers
2. **provider-strategy.ts** - Implementa la lógica de selección y ejecución de handlers
3. **Módulos de proveedores** - Cada archivo `prod-*.ts` implementa la lógica específica para tipos de proveedores

El sistema soporta 140+ proveedores incluyendo:
- Doodstream, Wishembed, Streamwish, Filemoon
- Mixdrop, Lulu, OK.ru, Uqload
- Y muchos más (ver `src/assets/providers.json` para lista completa)

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| Desarrollo | `bun dev` | Inicia el servidor con hot-reload usando bun --watch |
| Build | `bun run build` | Ejecuta ESLint y compila con Bun build |
| Producción | `bun start` | Inicia el servidor en modo producción |
| Deploy | `bun run dp` | Pull, build y restart con PM2 (requiere PM2 instalado) |

## 🌐 Despliegue

### Vercel (Recomendado)

Este proyecto está optimizado para desplegarse en [Vercel](https://vercel.com/):

1. Conecta tu repositorio de GitHub con Vercel
2. Configura las variables de entorno en el dashboard
3. Vercel detectará automáticamente la configuración de Node.js
4. ¡Deploy automático en cada push!

### Otras Plataformas

También es compatible con:
- **Heroku**
- **Railway**
- **Render**
- **DigitalOcean App Platform**
- Cualquier plataforma que soporte Bun o Node.js

### Deploy Manual con PM2

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Iniciar la aplicación
pm2 start dist/embed-serv.js --name raiden-embedview

# Guardar la configuración
pm2 save

# Configurar inicio automático
pm2 startup
```

## 🛠 Tecnologías

- **[Bun](https://bun.sh/)** - Runtime de JavaScript ultrarrápido con soporte nativo para TypeScript
- **[TypeScript](https://www.typescriptlang.org/)** - Lenguaje principal con tipado estático
- **[Express](https://expressjs.com/)** - Framework web minimalista
- **[Axios](https://axios-http.com/)** - Cliente HTTP para requests a proveedores
- **[dotenv](https://github.com/motdotla/dotenv)** - Gestión de variables de entorno
- **[ESLint](https://eslint.org/)** - Linting y análisis estático de código

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autor

**alik-jc**

- GitHub: [@alik-jc](https://github.com/alik-jc)
- Website: [jc.qsag.cloud](https://jc.qsag.cloud)

---

<p align="center">
  Hecho con ❤️ para <a href="https://aniyae.net">aniyae.net</a>
</p>