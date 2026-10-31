# Turnero Dental

## Descripción

Aplicación móvil para gestionar turnos de una residencia odontológica.
Permite a los pacientes ver el listado de profesionales, consultar el
detalle de cada uno y solicitar un turno eligiendo fecha y horario
disponible.

Proyecto desarrollado como Proyecto ABP de la materia Aplicaciones
para Móviles, Tecnicatura Superior en Desarrollo Web y Aplicaciones
Digitales — Institución Cervantes.

## Integrantes

- Fabricio Nahuel Rios -
- Constanza Sofia Ferreyra -

## Estado actual

La app ya se conecta a una API para traer los profesionales y los
horarios, y deja reservar un turno:

- Listado de profesionales traído desde la API, con su foto
- Detalle de cada profesional (se abre con su id, se puede volver atrás)
- Solicitar un turno: se elige una fecha, se traen los horarios libres de
  ese día y se reserva el turno en el backend
- Pantalla de confirmación con los datos del turno
- "¿Cómo llegar?": toma la ubicación con el GPS y abre Google Maps hacia
  el consultorio
- Compartir el turno por WhatsApp (u otra app) desde la confirmación
- Tema claro / oscuro con un botón
- Mis turnos: listado de los turnos reservados, traídos desde la API
- Perfil: foto de perfil sacada con la cámara o elegida de la galería
- Estado global con Zustand (`useAppStore`) para la sesión y el turno
- Backend propio (API en ASP.NET) y base de datos en SQL Server

## Features previstas

| Feature                                   | Estado       |
| ----------------------------------------- | ------------ |
| Consultar profesionales disponibles       | ✅ Hecho     |
| Consultar el detalle de un profesional    | ✅ Hecho     |
| Solicitar un turno                        | ✅ Hecho     |
| Cómo llegar al consultorio (GPS)          | ✅ Hecho     |
| Compartir el turno por WhatsApp           | ✅ Hecho     |
| Tema claro / oscuro                       | ✅ Hecho     |
| Adjuntar foto (cámara / galería)          | ✅ Hecho     |
| Ver mis turnos                            | ✅ Hecho     |
| Iniciar sesión como paciente              | ⏳ Pendiente |
| Recibir recordatorios de turno            | ⏳ Pendiente |

El backend ya tiene preparados los endpoints de login (`api/auth`) y de
avisos (`api/avisos`); falta conectarlos desde la app.

## Tecnologías

- React Native con Expo (SDK 58) y Expo Router
- TypeScript
- Zustand para el estado global
- Expo Location (GPS) y la API Share de React Native
- Expo Camera y Expo Image Picker (cámara y galería)
- Backend: ASP.NET Web API (.NET Framework 4.7.2) en la carpeta `backend/`
- Base de datos: SQL Server, scripts en `database/` y `backend/Database/`

## Cómo correr el proyecto

### Base de datos y API

1. En SQL Server, ejecutar `database/esquema.sql` (crea la base
   `TurneroDental` con sus tablas) y después
   `backend/Database/01_horarios_consultas.sql`.
2. Abrir `backend/TurneroDentalApi.sln` con Visual Studio, restaurar los
   paquetes NuGet y ejecutarlo. La API queda en `https://localhost:44324/api`.

### App móvil

1. Instalar las dependencias:

   ```bash
   npm install
   ```

2. Copiar `.env.example` como `.env` y poner la dirección de la API:

   ```
   EXPO_PUBLIC_API_URL=https://localhost:44324/api
   ```

   Para probar en el celular, `localhost` es el propio teléfono: hay que
   usar la IP de la PC donde corre la API. Sin esta variable, el listado de
   profesionales va a mostrar un error.

3. Levantar el proyecto:

   ```bash
   npx expo start
   ```

   Luego escanear el código QR con la app Expo Go (Android / iOS). El
   celular y la PC tienen que estar en la misma red WiFi. El GPS y el
   compartir por WhatsApp solo funcionan probados en un celular, no en la
   versión web.
