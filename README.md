# Taller Final de Bases de Datos - Fredy Paez

Este proyecto consiste en una aplicación que permite gestionar productos y nóminas de una empresa mediante una interfaz gráfica y una API RESTful. Es desarrollado como parte del taller final de la asignatura Bases de Datos.

## Tecnologías
- **Frontend**: React.js
- **Backend**: Node.js con Express
- **Base de datos**: MongoDB

## Estructura del Proyecto
El proyecto está organizado en dos carpetas principales:
- **`empresa-ui/`**: Aplicación frontend desarrollada en React. 
- **`EmpresaAPI/`**: API backend desarrollada con Node.js y Express.

## Requisitos Previos
Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:
- **Node.js** (v14 o superior) - [Descargar Node.js](https://nodejs.org/)
- **MongoDB** (instancia local o en la nube, como MongoDB Atlas) - [Descargar MongoDB](https://www.mongodb.com/)
- **Git** (opcional, para clonar el proyecto) - [Descargar Git](https://git-scm.com/)

## Pasos para Ejecutar el Proyecto
Sigue los pasos a continuación para configurar y ejecutar el proyecto localmente:

### 1. Clona este repositorio
```
git clone https://github.com/fpaeze/taller-final-bd-fredy-paez.git
cd taller_final
```


### 2. Configura y ejecuta el backend
Entra en la carpeta EmpresaAPI:
cd EmpresaAPI
```
npm install express mongoose dotenv
```

### Instala las dependencias:
bash
npm install
Configura las variables de entorno en un archivo .env dentro de la carpeta EmpresaAPI:
env
PORT=5000
MONGO_URI=<tu_conexion_mongo>
Reemplaza <tu_conexion_mongo> con la URL de tu base de datos MongoDB.

### Inicia el servidor:
bash
npm start
El backend estará disponible en http://localhost:5000.

### 3. Configura y ejecuta el frontend
Vuelve a la carpeta principal y entra en empresa-ui:
cd ../empresa-ui

### Instala las dependencias:
bash
npm install
```
npm install react react-dom react-scripts axios
```

### Inicia la aplicación:
bash
npm start
El frontend estará disponible en http://localhost:3000.

### 4. Pruebas del Proyecto
### API REST
Puedes probar las rutas de la API usando Postman o cualquier herramienta similar. Ejemplos de rutas disponibles:

**GET /api/nomina:** Obtiene todos los registros de la nómina.
**POST /api/nomina:** Crea un nuevo registro de la nómina.
**PUT /api/nomina/:id:** Actualiza un registro existente.
**DELETE /api/nomina/:id:** Elimina un registro.

### 5. Interfaz Gráfica

Usa la interfaz gráfica en http://localhost:3000 para gestionar productos y nóminas.
Funcionalidades principales:
Visualización de datos en formato de tabla.
Creación, modificación y eliminación de registros.

### Autor
Fredy Paez
Estudiante de la Maestría en Analítica de Datos

### Notas Adicionales
Si tienes problemas de configuración, verifica las dependencias y las variables de entorno.
Este proyecto está diseñado para fines educativos y puede extenderse para otros casos de uso.
