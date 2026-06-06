# Proyecto Final Backend II - Hybrid Auth API

## 📌 Descripción

Hybrid Auth API es una API REST desarrollada con Node.js y Express que implementa un sistema de autenticación híbrido utilizando JWT, Cookies HTTP Only, Express Session y Passport.js.

El objetivo del proyecto es demostrar diferentes mecanismos de autenticación y autorización, permitiendo tanto el acceso mediante credenciales locales como mediante OAuth con GitHub.

Además, se implementa control de roles, sesiones persistentes y protección de rutas privadas.

---

# 🛠 Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- Passport Local Strategy
- Passport GitHub OAuth2
- JWT (JSON Web Token)
- Express Session
- bcrypt
- cookie-parser
- cors
- dotenv

---

# 📂 Estructura del Proyecto

```text
hybrid-auth-api
│
├── src
│   ├── config
│   │   ├── database.config.js
│   │   ├── passport.config.js
│   │   └── session.config.js
│   │
│   ├── controllers
│   │   ├── auth.controller.js
│   │   ├── session.controller.js
│   │   └── user.controller.js
│   │
│   ├── middlewares
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│   │
│   ├── models
│   │   └── user.model.js
│   │
│   ├── routes
│   │   ├── auth.routes.js
│   │   ├── session.routes.js
│   │   └── user.routes.js
│   │
│   ├── strategies
│   │   ├── github.strategy.js
│   │   └── local.strategy.js
│   │
│   ├── utils
│   │   ├── bcrypt.js
│   │   └── jwt.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── package-lock.json
```

---

# ⚙️ Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/hybrid-auth-api.git
```

## 2. Ingresar al proyecto

```bash
cd hybrid-auth-api
```

## 3. Instalar dependencias

```bash
npm install
```

## 4. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

```env
PORT=8080

MONGO_URL=mongodb://127.0.0.1:27017/hybrid_auth_api

SESSION_SECRET=mi_clave_secreta_session
JWT_SECRET=mi_clave_secreta_jwt

NODE_ENV=development

GITHUB_CLIENT_ID=TU_CLIENT_ID
GITHUB_CLIENT_SECRET=TU_CLIENT_SECRET

GITHUB_CALLBACK_URL=http://localhost:8080/api/v1/auth/github/callback
```

## 5. Iniciar MongoDB

Verificar que MongoDB esté corriendo localmente.

## 6. Ejecutar el proyecto

```bash
npm run dev
```

Servidor:

```text
http://localhost:8080
```

---

# 🔐 Funcionalidades Implementadas

## ✅ Registro de Usuario

Permite registrar usuarios mediante email y contraseña.

### Endpoint

```http
POST /api/v1/auth/register
```

### Ejemplo

```json
{
  "firstName": "Kimey",
  "lastName": "Albarracin",
  "email": "kimey@test.com",
  "password": "1234567",
  "role": "admin"
}
```

---

## ✅ Login Local

Permite autenticarse mediante email y contraseña.

### Endpoint

```http
POST /api/v1/auth/login
```

### Ejemplo

```json
{
  "email": "kimey@test.com",
  "password": "1234567"
}
```

### Respuesta

```json
{
  "status": "success",
  "message": "Login exitoso",
  "token": "JWT_TOKEN",
  "payload": {
    "id": "USER_ID",
    "email": "kimey@test.com",
    "role": "admin"
  }
}
```

---

## ✅ Login con GitHub OAuth

Permite iniciar sesión mediante GitHub utilizando Passport.

### Endpoint

```http
GET /api/v1/auth/github
```

### Flujo

1. Usuario accede a `/auth/github`
2. GitHub solicita autorización
3. GitHub redirecciona al callback
4. Passport autentica al usuario
5. Se genera JWT y sesión

---

## ✅ Gestión de Sesiones

Permite consultar la sesión activa.

### Endpoint

```http
GET /api/v1/session
```

---

## ✅ Ruta de Perfil Protegida

Requiere autenticación mediante JWT.

### Endpoint

```http
GET /api/v1/profile
```

### Respuesta

```json
{
  "status": "success",
  "message": "Acceso autorizado al perfil"
}
```

---

## ✅ Ruta de Administración

Requiere:

- JWT válido
- Rol admin

### Endpoint

```http
GET /api/v1/admin
```

### Respuesta

```json
{
  "status": "success",
  "message": "Acceso autorizado al panel de administración"
}
```

---

## ✅ Logout

Elimina:

- JWT Cookie
- Session Cookie

### Endpoint

```http
POST /api/v1/auth/logout
```

### Respuesta

```json
{
  "status": "success",
  "message": "Logout realizado correctamente"
}
```

---

# 🔒 Seguridad Implementada

El proyecto incorpora múltiples mecanismos de seguridad:

### JWT

- Generación de token al iniciar sesión.
- Validación en rutas privadas.
- Persistencia mediante cookies HTTP Only.

### Cookies HTTP Only

- authToken
- connect.sid

Evitan acceso desde JavaScript del navegador.

### Hash de Contraseñas

Implementado mediante bcrypt.

Las contraseñas nunca se almacenan en texto plano.

### Passport.js

Implementación de:

- Local Strategy
- GitHub OAuth Strategy

### Control de Roles

Middleware de autorización:

```javascript
authorizeRole("admin")
```

Permite restringir accesos según el rol del usuario.

---

# 📸 Evidencias

Se adjuntan capturas demostrando:

- Registro exitoso
- Registro duplicado
- Login exitoso
- Login incorrecto
- Generación de JWT
- Generación de Cookies
- Session Endpoint
- Ruta Profile protegida
- Ruta Admin protegida
- Control de Roles
- Logout
- OAuth GitHub
- Estructura completa del proyecto

---

# 🧪 Pruebas Realizadas

## Registro

✅ Usuario creado correctamente

## Usuario Duplicado

✅ Retorna HTTP 409

## Login

✅ Retorna JWT válido

## Password Incorrecta

✅ Retorna HTTP 401

## Session

✅ Retorna sesión activa

## Profile

✅ Acceso autorizado con JWT

## Admin

✅ Acceso autorizado con rol admin

## Admin con Usuario Común

✅ Retorna HTTP 403

## Logout

✅ Elimina sesión y cookies

## OAuth GitHub

✅ Login exitoso mediante Passport GitHub

---

# 🎯 Objetivos Cumplidos

✅ MongoDB y Mongoose

✅ JWT Authentication

✅ Cookies HTTP Only

✅ Express Session

✅ Passport Local Strategy

✅ Passport GitHub Strategy

✅ OAuth GitHub

✅ Middleware de autenticación

✅ Middleware de autorización

✅ Control de Roles

✅ Logout Seguro

✅ Arquitectura MVC

✅ Manejo de errores HTTP

👨‍💻 Autor
Gaston Brecciaroli

Proyecto Final Backend II

Coderhouse 2026
