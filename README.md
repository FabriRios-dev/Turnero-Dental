# Turnero Dental

## Descripción

Aplicación móvil para gestionar turnos de una residencia odontológica.
Permite a los pacientes ver el listado de profesionales disponibles,
su especialidad y su disponibilidad horaria, como primer paso hacia
un sistema completo de reserva de turnos.

Proyecto desarrollado como Proyecto ABP de la materia Aplicaciones
para Móviles, Tecnicatura Superior en Desarrollo Web y Aplicaciones
Digitales — Institución Cervantes.

## Integrantes

- Fabricio Nahuel Rios -

## Unidad I — Estado actual

Primera base de la aplicación:

- Pantalla principal con el listado de profesionales
- Uso de `View`, `Text`, `Image` y `ScrollView`
- Datos estáticos (array local, sin backend todavía)
- Componente reutilizable `ProfesionalCard`, que recibe los datos por props
- Comunicación entre componentes mediante props

## Features previstas

| Feature                                    | Estado       |
| ------------------------------------------ | ------------ |
| Listado de profesionales (datos estáticos) | ✅ Hecho     |
| Componente reutilizable con props          | ✅ Hecho     |
| Pantalla de detalle de cada profesional    | ⏳ Pendiente |
| Selección de horario y pedido de turno     | ⏳ Pendiente |
| Conexión a backend / base de datos real    | ⏳ Pendiente |
| Login de paciente                          | ⏳ Pendiente |
| Notificaciones / recordatorios de turno    | ⏳ Pendiente |

## Cómo correr el proyecto

\```bash
npm install
npx expo start
\```
Luego escanear el código QR con la app Expo Go (Android/iOS), o presionar
`a` para abrir en un emulador de Android si lo tenés configurado.
