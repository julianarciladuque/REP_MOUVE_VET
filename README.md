<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# 🏥 MOUVA-VET — Plataforma Clínica Modular

## 📘 Descripción General

**MOUVA-VET** es una plataforma modular basada en **microservicios construidos con NestJS**, diseñada para la **gestión integral de información clínica**.  
Su arquitectura está orientada a la separación por responsabilidades: cada servicio gestiona un dominio específico (usuarios, pacientes, enfermería, inventario, autenticación, etc.), permitiendo escalabilidad y mantenibilidad.

---

## 🧩 Arquitectura de Microservicios

| Microservicio | Descripción | Puerto sugerido |
|----------------|-------------|-----------------|
| 🧑‍💼 **hr-service** | Administra usuarios, roles y permisos. | `3001` |
| 🧠 **medical-record-service** | Maneja historias clínicas (base de datos NoSQL - MongoDB). | `3003` |
| 🩺 **care-service** | Registra signos vitales, medicamentos aplicados y atenciones de enfermería. | `3004` |
| 💊 **inventory-service** | Administra inventario de medicamentos, procedimientos y ayudas diagnósticas. | `3005` |
| 🔐 **login-service** | Gestiona autenticación y emisión de tokens JWT. | `3006` |
| 🌐 **mouva-vet (gateway)** | API principal / Gateway de orquestación entre microservicios. | `3000` |

---

## ⚙️ Requisitos del entorno

- Node.js >= 18  
- npm >= 9  
- Docker y Docker Compose  
- PostgreSQL y MongoDB (configurados en contenedores Docker)

---

## 🐳 Configuración de Docker

Ejecuta las bases de datos con el archivo `docker-compose.yml` ubicado en la raíz del proyecto.

### Ejemplo (extraído de tu configuración):
```yaml
version: '3.1'

services:
  mongo:
    image: mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: root
    ports:
      - "27017:27017"
```
---
## 🔧 Comandos
### Levantar contenedores
docker compose up -d

### Verificar estado
docker ps

### Apagar servicios
docker compose down

### Correr postgres local en docker
```bash 
docker run --name some-postgres -e POSTGRES_PASSWORD=123456789 -p 5431:5432 -d  postgres
```

---
## 🚀 Ejecución de los microservicios

Cada microservicio puede correrse de forma independiente o en paralelo (recomendado para desarrollo).

### Instalar dependencias

Desde la raíz del monorepo:

```bash
npm install
```

## 🚀 Ejecutar un servicio específico

```bash
# Gateway principal
npm run start mouva-vet

# Recursos Humanos
npm run start hr-service

# Enfermería
npm run start care-service

# Inventario
npm run start inventory-service

# Historias clínicas (MongoDB)
npm run start medical-record-service

# Login y autenticación
npm run start login-service
```
---
## 🧱 Estructura del proyecto

```bash
mouva-vet/
│
├── apps/
│   ├── hr-service/                 # Gestión de usuarios y roles
│   ├── login-service/              # Autenticación JWT
│   ├── care-service/               # Signos vitales y atenciones de enfermería
│   ├── inventory-service/          # Medicamentos, procedimientos y diagnósticos
│   ├── medical-record-service/     # Historias clínicas (MongoDB)
│   └── mouva-vet/                  # API Gateway principal
│
├── docker-compose.yml              # Bases de datos (PostgreSQL y Mongo)
├── package.json                    # Dependencias globales
└── tsconfig.json                   # Configuración TypeScript global

```
---
## 📡 Endpoints principales (resumen)
| Servicio                   | Método | Endpoint                   | Descripción                        |
| --------------------------- | ------- | --------------------------- | ---------------------------------- |
| **hr-service**              | POST    | `/hr`                      | Crear usuario / empleado           |
|                             | GET     | `/hr`                      | Obtener roles                      |
| **admin-service**           | POST    | `/admin`                   | Registrar paciente                 |
|                             | GET     | `/admin`                   | Obtener todos los pacientes             |
|                             | GET     | `/admin/id/:id`         | Buscar paciente por ID             |
|                             | GET     | `/admin/cedula/:cedula` | Buscar paciente por cédula         |
| **inventory-service**       | GET     | `/medications`             | Listar medicamentos                |
|                             | POST    | `/procedures`              | Crear procedimiento                |
| **care-service**            | POST    | `/vitals`                  | Registrar signos vitales           |
|                             | POST    | `/attentions`              | Registrar atención de enfermería   |
|                             | GET     | `/attentions/patient/:id`  | Ver historial de atenciones        |
| **medical-record-service**  | POST    | `/records`                 | Crear historia clínica             |
|                             | GET     | `/records/:patientId`      | Obtener historia del paciente      |
| **login-service**           | POST    | `/auth/login`              | Autenticar usuario y emitir JWT    |
|                             | GET     | `/auth/status`             | Validar sesión                     |

----

📡 Endpoints principales por microservicio
🧑‍⚕️ care-service (Nurse)

BaseURL: {{micro_care_baseURL}}
Ejemplo: http://localhost:3002

### 🩺 VITALS
Método	Endpoint	Descripción
GET	/vitals	Obtener todos los signos vitales
GET	/vitals/patient/:id	Obtener signos vitales por ID de paciente
POST	/vitals	Registrar signos vitales


👩‍⚕️ ATENTIONS
Método	Endpoint	Descripción
GET	/attentions	Obtener todas las atenciones de enfermería
GET	/attentions/patient/:id	Obtener atenciones por paciente
POST	/attentions	Registrar atención de enfermería

📌 Rol con acceso: nurse
📌 Auth: JWT Bearer

🛠️ inventory-service (Support)

BaseURL: http://localhost:3004

🧾 PROCEDURES
Método	Endpoint	Descripción
POST	/procedure	Crear procedimiento
GET	/procedure	Obtener todos los procedimientos
GET	/procedure?id=:id	Obtener procedimiento por ID
PUT	/procedure/:id	Actualizar procedimiento
DELETE	/procedure/:id	Eliminar procedimiento

📌 Rol con acceso: support
📌 Auth: JWT Bearer

👨‍⚕️ medical-record-service (Doctor)

BaseURL: http://localhost:3000

🧑‍⚕️ PACIENTES
Método	Endpoint	Descripción
GET	/patients	Obtener pacientes
GET	/patients/cedula/:cedula	Obtener paciente por cédula
📋 HISTORIA CLÍNICA
Método	Endpoint	Descripción
POST	/patients/:cedula/entries	Crear historia clínica
🧾 ÓRDENES MÉDICAS
Método	Endpoint	Descripción
POST	/patients/order	Crear orden médica

📌 Rol con acceso: doctor
📌 Auth: JWT Bearer

🧑‍💼 admin-service

Método	Endpoint	Descripción
POST	/admin	Registrar paciente
GET	/admin	Obtener todos los pacientes
GET	/admin/id/:id	Buscar paciente por ID
GET	/admin/cedula/:cedula	Buscar paciente por cédula

📌 Roles con acceso: admin, doctor

🧑‍💼 hr-service

Método	Endpoint	Descripción
POST	/hr	Crear usuario / empleado
GET	/hr	Obtener roles

🔐 login-service
Método	Endpoint	Descripción
POST	/auth/login	Autenticar usuario y emitir JWT
GET	/auth/status	Validar sesión/token