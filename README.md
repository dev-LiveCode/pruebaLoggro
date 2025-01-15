# Prueba tecnica Analista de desarrollo para Loggro
Repository name: pruebaLoggro
Desarrollo de prueba técnica para el cargo de Analista de Desarrollo en Loggro+


# Guía de Despliegue del Proyecto

Este repositorio contiene el código fuente de un proyecto completo dividido en dos componentes principales:

1. **Backend**: Una API REST construida con Node.js y Express usando JavaScript.
2. **Frontend**: Una aplicación cliente construida con Angular (versión >18) usando TypeScript.

---

## Comenzando

Para desplegar este proyecto, sigue cuidadosamente los pasos a continuación. Ten en cuenta que un archivo `.env` necesario para la conexión con bases de datos y servicios en la nube será proporcionado por correo electrónico. Asegúrate de descargarlo y colocarlo en los directorios adecuados antes de iniciar el proceso de despliegue.

### Requisitos Previos

- **Node.js** (versión >= 18)
- **Angular CLI** (versión >= 18)
- **npm** (incluido con Node.js)
- **Git** (para clonar el repositorio)
- **Credenciales de bases de datos y servicios en la nube** (proporcionadas en el archivo `.env`)

### Clonar el Repositorio

```bash
git clone <repository-url>
cd <repository-folder>
```

---

## Despliegue del Backend

Navega al directorio `backend` y sigue estos pasos:

### Configuración

1. **Instalar Dependencias**

   ```bash
   cd backend
   npm install
   ```

2. **Variables de Entorno**

   Coloca el archivo `.env` proporcionado por correo electrónico en el directorio `backend`.

### Ejecutar el Backend

1. **Modo Desarrollo**

   ```bash
   npm run dev
   ```

2. **Modo Producción**

   Construye y ejecuta el backend para producción:

   ```bash
   npm run build
   npm start
   ```

3. **Pruebas**

   Si hay scripts de prueba disponibles:

   ```bash
   npm test
   ```

---

## Despliegue del Frontend

Navega al directorio `frontend` y sigue estos pasos:

### Configuración

1. **Instalar Dependencias**

   ```bash
   cd frontend
   npm install
   ```


### Ejecutar el Frontend

1. **Modo Desarrollo**

   ```bash
   ng serve
   ```

   Accede a la aplicación en `http://localhost:4200`.

2. **Compilación para Producción**

   Construye el frontend para producción:

   ```bash
   ng build --prod
   ```

   Los archivos compilados se generarán en la carpeta `dist/` y pueden ser servidos usando un servidor web de tu elección (por ejemplo, Nginx, Apache).

---

## Notas Adicionales

- Asegúrate de que el backend esté en ejecución antes de iniciar el frontend para evitar problemas de conexión.
- Contacta al equipo de soporte si encuentras problemas con el archivo `.env` o el proceso de despliegue.
- Para instrucciones detalladas de configuración dentro de cada componente, consulta los archivos `README.md` correspondientes.

---

## Estructura del Directorio

```
.
├── backend
│   |   .env
|   package-lock.json
|   package.json
|   tree.txt
|   
\---src
│   |   app.js
│   |   env.js
│   |   index.js
│   |   
│   +---config
│   |       _aws.js
│   |       _db.js
│   |       
│   +---controllers
│   |       auth.controller.js
│   |       images.controller.js
│   |       
│   +---helpers
│   |       jwt.js
│   |       upload.js
│   |       utils.middlewares.js
│   |       validate.js
│   |       
│   +---models
│   |       images.model.js
│   |       
│   +---routes
│   |       auth.routes.js
│   |       images.routes.js
│   |       _index.js
│   |       
│   \---schemas
│           image.schema.js
│           utils.schemas.js
├── frontend
│   .editorconfig
|   .gitignore
|   angular.json
|   package-lock.json
|   package.json
|   README.md
|   tailwind.config.js
|   tree.txt
|   tsconfig.app.json
|   tsconfig.json
|   tsconfig.spec.json
|   
+---.angular
+---.vscode
|       extensions.json
|       launch.json
|       tasks.json
|       
+---public
|       favicon.ico
|       
\---src
    |   index.html
    |   main.ts
    |   styles.scss
    |   
    +---app
    |   |   app.component.html
    |   |   app.component.scss
    |   |   app.component.spec.ts
    |   |   app.component.ts
    |   |   app.config.ts
    |   |   app.routes.ts
    |   |   
    |   +---pages
    |   |   +---about-page
    |   |   |       about-page.component.html
    |   |   |       about-page.component.scss
    |   |   |       about-page.component.spec.ts
    |   |   |       about-page.component.ts
    |   |   |       
    |   |   +---graphics-page
    |   |   |       graphics-page.component.html
    |   |   |       graphics-page.component.scss
    |   |   |       graphics-page.component.spec.ts
    |   |   |       graphics-page.component.ts
    |   |   |       
    |   |   +---home-page
    |   |   |       home-page.component.html
    |   |   |       home-page.component.scss
    |   |   |       home-page.component.spec.ts
    |   |   |       home-page.component.ts
    |   |   |       
    |   |   \---images-page
    |   |           images-page.component.html
    |   |           images-page.component.scss
    |   |           images-page.component.spec.ts
    |   |           images-page.component.ts
    |   |           
    |   \---shared
    |       +---components
    |       |   +---card-image
    |       |   |       card-image.component.html
    |       |   |       card-image.component.scss
    |       |   |       card-image.component.spec.ts
    |       |   |       card-image.component.ts
    |       |   |       
    |       |   +---filtros
    |       |   |       filtros.component.html
    |       |   |       filtros.component.scss
    |       |   |       filtros.component.spec.ts
    |       |   |       filtros.component.ts
    |       |   |       
    |       |   +---footer
    |       |   |       footer.component.html
    |       |   |       footer.component.scss
    |       |   |       footer.component.ts
    |       |   |       
    |       |   +---form
    |       |   |       form.component.html
    |       |   |       form.component.scss
    |       |   |       form.component.spec.ts
    |       |   |       form.component.ts
    |       |   |       
    |       |   +---graphics-bar
    |       |   |       graphics-bar.component.html
    |       |   |       graphics-bar.component.scss
    |       |   |       graphics-bar.component.spec.ts
    |       |   |       graphics-bar.component.ts
    |       |   |       
    |       |   +---graphics-circle-average
    |       |   |       graphics-circle-average.component.html
    |       |   |       graphics-circle-average.component.scss
    |       |   |       graphics-circle-average.component.spec.ts
    |       |   |       graphics-circle-average.component.ts
    |       |   |       
    |       |   +---header
    |       |   |       header.component.html
    |       |   |       header.component.scss
    |       |   |       header.component.ts
    |       |   |       
    |       |   +---table
    |       |   |       table.component.html
    |       |   |       table.component.scss
    |       |   |       table.component.spec.ts
    |       |   |       table.component.ts
    |       |   |       
    |       |   \---toast
    |       |           toast.component.html
    |       |           toast.component.scss
    |       |           toast.component.ts
    |       |           
    |       +---interfaces
    |       |       utils.interfaces.ts
    |       |       
    |       \---services
    |               communication.service.ts
    |               images.service.ts
    |               theme.service.ts
    |               toast.service.ts
    |               
    \---assets
        +---img
        |   |   aws.svg
        |   |   awsDark.svg
        |   |   faviconAngular.ico
        |   |   faviconTailwind.ico
        |   |   icon.png
        |   |   iconAWS.png
        |   |   image-3@2x.jpg
        |   |   logo-dark.png
        |   |   logo-light.png
        |   |   node.svg
        |   |   nodeDark.svg
        |   |   profile.jpg
        |   |   
        |   \---certifications
        |           Bootcamp Arquitectura en la Nube - MinTic TalentoTech.png
        |           certificado Cloud Architect associate - CertiPlus.png
        |           certificado Cloud Architect expert - CertiPlus.png
        |           Titulo Tecnico.png
        |           Titulo tecnologo.png
        |           
        \---pdf
            +---certifications
            |       Bootcamp Arquitectura en la Nube - MinTic TalentoTech.pdf
            |       certificado Cloud Architect associate - CertiPlus.pdf
            |       certificado Cloud Architect expert - CertiPlus.pdf
            |       Titulo Tecnico.pdf
            |       Titulo tecnologo.pdf
            |       
            \---cv
                    CV Victor Vivas 2025 - Español.pdf
                    CV Victor Vivas 2025.pdf
└── README.md
```

¡Gracias por elegir nuestra solución! Si encuentras algún problema, no dudes en contactarnos para soporte.

