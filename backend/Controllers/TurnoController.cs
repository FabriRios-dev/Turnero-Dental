
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Http;
using TurneroDentalApi.Data;
using TurneroDentalApi.Models;

namespace TurneroDentalApi.Controllers
{
    [RoutePrefix("api/turnos")]
    public class TurnoController : ApiController
    {
        private readonly TurneroDentalContext db = new TurneroDentalContext();
        private const int DiasMaximosAnticipacion = 60;

        [HttpGet, Route("")]
        public IHttpActionResult GetTodos()
        {
            var turnos = db.Turnos
                .Select(t => new
                {
                    t.IdTurno,
                    t.Fecha,
                    t.Hora,
                    t.Estado,
                    Paciente = t.Paciente.NombrePaciente,
                    Profesional = t.Profesional.NombreProfesional
                })
                .ToList();

            return Ok(turnos);
        }

        [HttpGet, Route("paciente/{idPaciente:int}")]
        public IHttpActionResult GetPorPaciente(int idPaciente)
        {
            var turnos = db.Turnos
                .Where(t => t.IdPaciente == idPaciente)
                .OrderByDescending(t => t.Fecha)
                .ThenByDescending(t => t.Hora)
                .Select(t => new
                {
                    t.IdTurno,
                    t.Fecha,
                    t.Hora,
                    t.Estado,
                    Profesional = t.Profesional.NombreProfesional,
                    Especialidad = t.Profesional.Especialidad.Nombre
                })
                .ToList();

            return Ok(turnos);
        }

        [HttpGet, Route("disponibilidad")]
        public IHttpActionResult GetDisponibilidad(string fecha)
        {
            DateTime dia;

            if (!DateTime.TryParseExact(
                fecha, "yyyy-MM-dd", CultureInfo.InvariantCulture,
                DateTimeStyles.None, out dia))
                return BadRequest("La fecha debe tener el formato yyyy-MM-dd.");

            dia = dia.Date;

            var errorFecha = ValidarFecha(dia);
            if (errorFecha != null) return BadRequest(errorFecha);

            byte diaSemana = (byte)dia.DayOfWeek;

            var horarios = db.HorariosAtencion
                .Where(h => h.DiaSemana == diaSemana)
                .ToList();

            var idsProfesionales = horarios
                .Select(h => h.IdProfesional)
                .Distinct()
                .ToList();

            var profesionales = db.Profesionales
                .Where(p => idsProfesionales.Contains(p.IdProfesional))
                .Select(p => new
                {
                    p.IdProfesional,
                    p.NombreProfesional,
                    Especialidad = p.Especialidad.Nombre
                })
                .ToList();

            var ocupados = db.Turnos
                .Where(t => t.Fecha == dia && t.Estado != "Cancelado")
                .Select(t => new { t.IdProfesional, t.Hora })
                .ToList();

            var resultado = profesionales
                .Select(p => new
                {
                    p.IdProfesional,
                    p.NombreProfesional,
                    p.Especialidad,
                    Horarios = HorariosDelDia(
                        horarios.Where(h => h.IdProfesional == p.IdProfesional), dia)
                        .Where(hora => !ocupados.Any(o =>
                            o.IdProfesional == p.IdProfesional && o.Hora == hora))
                        .Select(hora => hora.ToString(@"hh\:mm"))
                        .ToList()
                })
                .OrderBy(p => p.NombreProfesional)
                .ToList();

            return Ok(resultado);
        }

        [HttpPost, Route("reservar")]
        public IHttpActionResult Reservar(Turno nuevoTurno)
        {
            if (nuevoTurno == null)
                return BadRequest("Datos del turno inválidos.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            DateTime dia = nuevoTurno.Fecha.Date;

            var errorFecha = ValidarFecha(dia);
            if (errorFecha != null) return BadRequest(errorFecha);

            if (!db.Pacientes.Any(p => p.IdPaciente == nuevoTurno.IdPaciente))
                return BadRequest("El paciente no existe.");

            var diaSemana = (byte)dia.DayOfWeek;

            var horarios = db.HorariosAtencion
                .Where(h => h.IdProfesional == nuevoTurno.IdProfesional
                         && h.DiaSemana == diaSemana)
                .ToList();

            if (!HorariosDelDia(horarios, dia).Contains(nuevoTurno.Hora))
                return BadRequest("El profesional no atiende en ese horario.");

            bool horarioOcupado = db.Turnos.Any(t =>
                t.IdProfesional == nuevoTurno.IdProfesional &&
                t.Fecha == dia &&
                t.Hora == nuevoTurno.Hora &&
                t.Estado != "Cancelado");

            if (horarioOcupado)
                return BadRequest("Ese horario ya está reservado para el profesional elegido.");

            bool pacienteOcupado = db.Turnos.Any(t =>
                t.IdPaciente == nuevoTurno.IdPaciente &&
                t.Fecha == dia &&
                t.Hora == nuevoTurno.Hora &&
                t.Estado != "Cancelado");

            if (pacienteOcupado)
                return BadRequest("Ya tenés otro turno reservado en ese mismo horario.");

            nuevoTurno.Fecha = dia;
            nuevoTurno.Estado = "Confirmado";

            db.Turnos.Add(nuevoTurno);
            db.SaveChanges();

            return Ok(new
            {
                nuevoTurno.IdTurno,
                nuevoTurno.Fecha,
                Hora = nuevoTurno.Hora.ToString(@"hh\:mm"),
                nuevoTurno.Estado
            });
        }

        [HttpPut, Route("{id:int}/cancelar")]
        public IHttpActionResult Cancelar(int id)
        {
            var turno = db.Turnos.Find(id);
            if (turno == null) return NotFound();

            turno.Estado = "Cancelado";
            db.SaveChanges();

            return Ok(new { turno.IdTurno, turno.Estado });
        }

        private static string ValidarFecha(DateTime dia)
        {
            if (dia.Date < DateTime.Today)
                return "No se pueden sacar turnos para fechas pasadas.";

            if (dia.Date > DateTime.Today.AddDays(DiasMaximosAnticipacion))
                return "Solo se pueden sacar turnos con hasta "
                    + DiasMaximosAnticipacion + " días de anticipación.";

            return null;
        }

        private static IEnumerable<TimeSpan> HorariosDelDia(
            IEnumerable<HorarioAtencion> agenda, DateTime dia)
        {
            var horas = new SortedSet<TimeSpan>();

            foreach (var h in agenda)
            {
                TimeSpan inicio = h.HoraInicio;
                TimeSpan fin = h.HoraFin;

                if (h.DuracionMinutos <= 0) continue;

                TimeSpan duracion = TimeSpan.FromMinutes(h.DuracionMinutos);

                for (var hora = inicio; hora + duracion <= fin; hora += duracion)
                {
                    if (dia.Date == DateTime.Today &&
                        dia.Date + hora <= DateTime.Now)
                        continue;

                    horas.Add(hora);
                }
            }

            return horas;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) db.Dispose();
            base.Dispose(disposing);
        }
    }
}
