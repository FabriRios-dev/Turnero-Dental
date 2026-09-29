## Solicitar un turno

### 1. Modelo de datos (BD)
- Tabla `profesionales` (reemplaza el array estático de Profesionales.js)
- Tabla `horarios_disponibles`: profesional_id, día, hora_inicio, hora_fin, ¿ocupado?
- Tabla `turnos`: paciente_id, profesional_id, horario_id, estado (confirmado/cancelado)
- Tabla `pacientes` (si hay login)

### 2. Backend (API)
- GET /profesionales/:id/horarios → devuelve horarios libres de ese profesional
- POST /turnos → crea un turno nuevo (recibe profesional_id + horario_id + paciente_id)
- Validación server-side: que el horario elegido siga libre al momento de confirmar (evitar que dos pacientes reserven el mismo horario)

### 3. Frontend
- Nueva sección en la pantalla de detalle (o pantalla propia): lista de horarios disponibles, traídos del backend en vez de hardcodeados
- Estado local (useState) para el horario que el usuario va seleccionando antes de confirmar
- Llamada al backend (fetch/axios) al tocar "Confirmar turno"
- Pantalla o mensaje de confirmación después de solicitar

### 4. Relacionado, pero features aparte
- "Iniciar sesión como paciente" es un prerrequisito técnico para saber quien pide el turno
- "Recibir recordatorios de turno" depende de que ya exista el turno guardado en BD

### 5. Versión simplificada para entregas intermedias (sugerencia)
Avance de "Solicitar un turno" sin backend:
horarios hardcodeados en el frontend + estado local para elegir + un mensaje de confirmación en pantalla.