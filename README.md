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
- Estado global con Zustand (`useAppStore`) para la sesión y el turno

## Features previstas

| Feature                                   | Estado       |
| ----------------------------------------- | ------------ |
| Consultar profesionales disponibles       | ✅ Hecho     |
| Consultar el detalle de un profesional    | ✅ Hecho     |
| Solicitar un turno                        | ✅ Hecho     |
| Cómo llegar al consultorio (GPS)          | ✅ Hecho     |
| Compartir el turno por WhatsApp           | ✅ Hecho     |
| Tema claro / oscuro                       | ✅ Hecho     |
| Iniciar sesión como paciente              | ⏳ Pendiente |
| Adjuntar foto (cámara / galería)          | ⏳ Pendiente |
| Recibir recordatorios de turno            | ⏳ Pendiente |

## Tecnologías

- React Native con Expo (SDK 58) y Expo Router
- TypeScript
- Zustand para el estado global
- Expo Location (GPS) y la API Share de React Native
- Las librerías de cámara y galería (`expo-camera`, `expo-image-picker`)
  quedan instaladas para la próxima entrega

## Cómo correr el proyecto

1. Instalar las dependencias:

   ```bash
   npm install
   ```

2. La app consume una API. Crear un archivo `.env` en la raíz con la
   dirección de la API (reemplazar por la IP y el puerto donde corre):

   ```
   EXPO_PUBLIC_API_URL=http://192.168.0.10:3000
   ```

   Sin esta variable, el listado de profesionales va a mostrar un error.

3. Levantar el proyecto:

   ```bash
   npx expo start
   ```

   Luego escanear el código QR con la app Expo Go (Android / iOS). El
   celular y la PC tienen que estar en la misma red WiFi. El GPS y el
   compartir por WhatsApp solo funcionan probados en un celular, no en la
   versión web.
