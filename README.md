Hotel Management System

Descripción del Proyecto

Este proyecto implementa un sistema de gestión para un hotel, permitiendo la administración de habitaciones, reservas, empleados, clientes y gerentes. Utiliza una arquitectura hexagonal basada en Node.js, Express y TypeScript para garantizar escalabilidad, mantenibilidad y seguridad. El sistema también incluye autenticación y autorización basadas en JWT y restricciones por roles.

Características Principales

Autenticación y Autorización:

Autenticación mediante email y contraseña.

Generación de tokens JWT para el acceso seguro.

Restricción de rutas basada en roles:

manager: Gerentes.

employee: Empleados (recepcionistas).

customer: Clientes.

Manejo de Datos:

Rooms: CRUD para habitaciones.

Reservations: CRUD para reservas.

Employees: CRUD para empleados.

Customers: Registro y autenticación de clientes.

Managers: Gestión de gerentes.

Seguridad:

Contraseñas encriptadas con bcrypt.

Validaciones robustas usando express-validator.

Escalabilidad:

Arquitectura hexagonal con separación de capas (Domain, Application, Infrastructure).

Tecnologías Utilizadas

Node.js: Plataforma de backend.

TypeScript: Tipado estático para un código más seguro.

Express: Framework para manejar las rutas y la lógica de la aplicación.

MySQL: Base de datos relacional para persistencia de datos.

JWT: Autenticación segura mediante tokens.

bcrypt: Encriptación de contraseñas.

dotenv: Manejo de variables de entorno.

Instalación

Clonar el repositorio:

git clone <repositorio>
cd hotel-management-system

Instalar dependencias:

npm install

Configurar variables de entorno:
Crear un archivo .env con las siguientes variables:

PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=password
DB_NAME=hotel
JWT_SECRET=your_secret_key

Ejecutar la aplicación en modo desarrollo:

npm run dev

Compilar y ejecutar en producción:

npm run build
npm start

Rutas Principales

Autenticación

POST /v1/auth/login:

Body:

{
  "email": "user@example.com",
  "password": "123456"
}

Respuesta:

{
  "token": "<jwt_token>",
  "role": "manager"
}

Habitaciones (Rooms)

POST /v1/rooms (Solo manager)

GET /v1/rooms/:id

PUT /v1/rooms/:id

DELETE /v1/rooms/:id

Reservas (Reservations)

POST /v1/reservations (Solo employee o customer)

GET /v1/reservations

GET /v1/reservations/:id

PUT /v1/reservations/:id

DELETE /v1/reservations/:id

Empleados (Employees)

POST /v1/employees (Solo manager)

GET /v1/employees

GET /v1/employees/:id

PUT /v1/employees/:id

DELETE /v1/employees/:id

Clientes (Customers)

POST /v1/customers

GET /v1/customers/:id

PUT /v1/customers/:id

DELETE /v1/customers/:id

Pruebas

Usa herramientas como Postman para probar las rutas.

Proporciona el token JWT en el header Authorization para rutas protegidas:

{
  "Authorization": "Bearer <jwt_token>"
}

Contribuir

Haz un fork del repositorio.

Crea una rama nueva:

git checkout -b feature/nueva-funcionalidad

Realiza los cambios y haz un commit:

git commit -m "Agregar nueva funcionalidad"

Haz un push y abre un Pull Request.

Contacto

Para dudas o soporte, contacta a:

Nombre: Cesar

Email: cesar@example.com
