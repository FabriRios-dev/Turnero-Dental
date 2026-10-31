
using System.Linq;
using System.Web.Http;
using TurneroDentalApi.Data;
using TurneroDentalApi.Models;

namespace TurneroDentalApi.Controllers
{
    [RoutePrefix("api/profesionales")]
    public class ProfesionalController : ApiController
    {
        private readonly TurneroDentalContext db = new TurneroDentalContext();

        [HttpGet, Route("")]
        public IHttpActionResult GetTodos()
        {
            var profesionales = db.Profesionales
                .Select(p => new
                {
                    p.IdProfesional,
                    p.NombreProfesional,
                    p.Telefono,
                    p.Direccion,
                    p.Correo,
                    p.IdEspecialidad,
                    Especialidad = p.Especialidad.Nombre
                })
                .ToList();

            return Ok(profesionales);
        }

        [HttpGet, Route("{id:int}")]
        public IHttpActionResult GetPorId(int id)
        {
            var profesional = db.Profesionales
                .Where(p => p.IdProfesional == id)
                .Select(p => new
                {
                    p.IdProfesional,
                    p.NombreProfesional,
                    p.Telefono,
                    p.Direccion,
                    p.Correo,
                    p.IdEspecialidad,
                    Especialidad = p.Especialidad.Nombre
                })
                .FirstOrDefault();

            if (profesional == null)
                return NotFound();

            return Ok(profesional);
        }

        [HttpPost, Route("")]
        public IHttpActionResult Crear(Profesional profesional)
        {
            if (profesional == null)
                return BadRequest("Datos inválidos.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            db.Profesionales.Add(profesional);
            db.SaveChanges();

            return Ok(profesional);
        }

        [HttpPut, Route("{id:int}")]
        public IHttpActionResult Actualizar(int id, Profesional profesional)
        {
            if (profesional == null)
                return BadRequest("Datos inválidos.");

            var existente = db.Profesionales.Find(id);
            if (existente == null) return NotFound();

            existente.NombreProfesional = profesional.NombreProfesional;
            existente.Telefono = profesional.Telefono;
            existente.Direccion = profesional.Direccion;
            existente.Correo = profesional.Correo;
            existente.IdEspecialidad = profesional.IdEspecialidad;

            db.SaveChanges();

            return Ok(existente);
        }

        [HttpDelete, Route("{id:int}")]
        public IHttpActionResult Eliminar(int id)
        {
            var existente = db.Profesionales.Find(id);
            if (existente == null) return NotFound();

            db.Profesionales.Remove(existente);
            db.SaveChanges();

            return Ok();
        }

        [HttpGet, Route("especialidades")]
        public IHttpActionResult GetEspecialidades()
        {
            return Ok(db.Especialidades.ToList());
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing) db.Dispose();
            base.Dispose(disposing);
        }
    }
}
