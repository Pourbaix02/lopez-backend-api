# E-commerce Backend

Este proyecto es un backend para una aplicación de e-commerce desarrollado con Node.js, Express, MongoDB y Handlebars.

## Características

- ✅ Persistencia de datos en MongoDB
- ✅ Sistema de productos con paginación y filtros
- ✅ Carrito de compras funcional
- ✅ Vistas en tiempo real con WebSockets
- ✅ Sistema de plantillas con Handlebars

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB (Mongoose)
- Handlebars
- WebSockets
- Dotenv

## Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
MONGODB_URI=tu_uri_de_mongodb
PORT=8080
```

4. Inicia el servidor:
```bash
npm start
```

## Estructura del Proyecto 

```
src/
├── config/
│   └── db.config.js
├── controllers/
│   ├── cart.controller.js
│   ├── product.controller.js
│   └── views.controller.js
├── models/
│   ├── cart.model.js
│   └── product.model.js
├── routes/
│   ├── carts.routes.js
│   ├── products.routes.js
│   └── views.routes.js
├── views/
│   ├── layouts/
│   └── partials/
├── public/
└── server.js
```

## Endpoints API

### Productos

- `GET /api/products` - Obtener todos los productos (con paginación)
- `GET /api/products/:pid` - Obtener un producto específico
- `POST /api/products` - Crear un nuevo producto
- `PUT /api/products/:pid` - Actualizar un producto
- `DELETE /api/products/:pid` - Eliminar un producto

### Carritos

- `POST /api/carts` - Crear un nuevo carrito
- `GET /api/carts/:cid` - Ver contenido del carrito
- `POST /api/carts/:cid/products/:pid` - Agregar producto al carrito
- `PUT /api/carts/:cid/products/:pid` - Actualizar cantidad de un producto
- `DELETE /api/carts/:cid/products/:pid` - Eliminar producto del carrito
- `DELETE /api/carts/:cid` - Vaciar carrito

## Vistas

- `/products` - Lista de productos con paginación y filtros
- `/realtimeproducts` - Vista en tiempo real de productos
- `/products/:pid` - Detalle de producto
- `/carts/:cid` - Vista del carrito

## Funcionalidades Principales

### Productos
- Listado con paginación
- Filtros por categoría
- Ordenamiento por precio
- Creación y eliminación en tiempo real
- Vista detallada de cada producto

### Carritos
- Creación automática al agregar primer producto
- Persistencia del carrito en localStorage
- Modificación de cantidades
- Eliminación de productos
- Vaciado completo

### WebSockets
- Actualización en tiempo real de productos
- Notificaciones de cambios

## Uso de WebSockets

El proyecto implementa WebSockets para:
- Actualización en tiempo real de la lista de productos
- Notificaciones de cambios en el inventario
- Vista `/realtimeproducts` con actualizaciones instantáneas

## Manejo de Errores

El sistema incluye manejo de errores para:
- Productos no encontrados
- Carritos inexistentes
- Operaciones inválidas
- Errores de base de datos

## Testing

Para probar el proyecto:

1. Iniciar el servidor
2. Probar endpoints con Postman o similar
3. Verificar actualizaciones en tiempo real
4. Comprobar persistencia de datos
5. Validar manejo de errores

## Contribución

Si deseas contribuir al proyecto:

1. Haz un Fork
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Haz push a la rama
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. 