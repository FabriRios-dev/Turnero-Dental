
using System.Linq;
using System.Web.Http;
using TurneroDentalApi.Data;
using TurneroDentalApi.Models;

namespace TurneroDentalApi.Controllers
{
    [RoutePrefix("api/pacientes")]
    public class PacienteController : ApiController
    {
        private readonly TurneroDentalContext db = new TurneroDentalContext();

        [HttpGet, Route("")]
        public IHttpActionResult GetTodos()
        {
            var pacientes = db.Pacientes
                .Select(p => new
                {
                    p.IdPaciente,
                    p.NombrePaciente,
                    p.Telefono,
                    p.Direccion,
                    p.Correo,
                    p.IdUsuario
                })
                .ToList();

            return Ok(pacientes);
        }

        [HttpGet, Route("{id:int}")]
        public IHttpActionResult GetPorId(int id)
        {
            var paciente = db.Pacientes.Find(id);
            if (paciente == null) return NotFound();

            return Ok(paciente);
        }

        [HttpPost, Route("")]
        public IHttpActionResult Crear(Paciente paciente)
        {
            if (paciente == null) return BadRequest("Datos inválidos.");
            if (!ModelState.IsValid) return BadRequest(ModelState);

            db.Pacientes.Add(paciente);
            db.SaveChanges();

            return Ok(paciente);
        }

        [HttpPut, Route("{id:int}")]
        public IHttpActionResult Actualizar(int id, Paciente paciente)
        {
            if (paciente == null) return BadRequest("Datos inválidos.");

            var existente = db.Pacientes.Find(id);
            if (existente == null) return NotFound();

            existente.NombrePaciente = paciente.NombrePaciente;
            existente.Telefono = paciente.Telefono;
            existente.Direccion = paciente.Direccion;
            existente.Correo = paciente.Correo;

            db.SaveChanges();

            return Ok(existente);
        }

        [HttpDelete, Route("{id:int}")]
        public IHttpActionResult Eliminar(int id)
        {
            var existente = db.Pacientes.Find(id);
            if (existente == null) return NotFound();

            db.Pacientes.Remove(existente);
            db.SaveChanges();

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) db.Dispose();
            base.Dispose(disposing);
        }
    }
}
