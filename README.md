# 🎬 Raiden Embedview Manager

Un servidor proxy ligero y eficiente construido con Express y TypeScript para gestionar las opciones de reproductor (player options) en [aniyae.net](https://aniyae.net). Este proyecto facilita la integración de múltiples proveedores de video mediante un sistema de embedview centralizado.

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
- 📡 **Integración con múltiples proveedores** de video
- 🎯 **User-Agent personalizable** para requests
- 📊 **Monitoreo con Sentry** para tracking de errores
- ⚡ **Hot-reload** en desarrollo con Nodemon
- 🔧 **Linting con ESLint** para código limpio

## 📦 Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- Git

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/alik-jc/raiden-embedview.git
cd raiden-embedview
```

### 2. Instalar dependencias

```bash
npm install
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
| `SRV_URI` | Puerto del servidor | `3000` |
| `HASH` | Hash usado en la URL para seguridad | `yourSecretHash` |
| `USER_AGENT` | User agent para requests a proveedores | `Mozilla/5.0...` |

### Ejemplo de uso de URL

```
http://localhost:3000/?yourSecretHash=yourBase64EncodedURL
```

## 🎯 Uso

### Modo Desarrollo

Inicia el servidor con hot-reload:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:SRV_URI`

### Modo Producción

1. **Construir el proyecto:**

```bash
npm run build
```

2. **Iniciar el servidor:**

```bash
npm start
```

### Script de Deploy

Para actualizar y reiniciar en producción (requiere PM2):

```bash
npm run dp
```

Este comando:
1. Hace pull del repositorio
2. Construye el proyecto
3. Reinicia todos los procesos de PM2

## 📁 Estructura del Proyecto

```
raiden-embedview/
├── src/
│   ├── assets/          # Recursos estáticos
│   ├── providers/       # Integraciones con proveedores de video
│   ├── conmuter.ts      # Lógica del conmutador
│   ├── embed-serv.ts    # Servidor principal
│   └── index.ts         # Punto de entrada
├── dist/                # Código compilado (generado)
├── .env.example         # Plantilla de variables de entorno
├── .eslintrc.json       # Configuración de ESLint
├── .gitignore           # Archivos ignorados por Git
├── package.json         # Dependencias y scripts
├── tsconfig.json        # Configuración de TypeScript
└── README.md            # Este archivo
```

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| Desarrollo | `npm run dev` | Inicia el servidor con hot-reload |
| Build | `npm run build` | Compila TypeScript y ejecuta linting |
| Producción | `npm start` | Inicia el servidor en modo producción |
| Deploy | `npm run dp` | Pull, build y restart con PM2 |

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
- Cualquier plataforma que soporte Node.js

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

- **[TypeScript](https://www.typescriptlang.org/)** - Lenguaje principal
- **[Express](https://expressjs.com/)** - Framework web
- **[Axios](https://axios-http.com/)** - Cliente HTTP
- **[Sentry](https://sentry.io/)** - Monitoreo de errores
- **[ESLint](https://eslint.org/)** - Linting de código
- **[Nodemon](https://nodemon.io/)** - Hot-reload en desarrollo

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