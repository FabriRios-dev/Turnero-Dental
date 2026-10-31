
using System;
using System.Linq;
using System.Web.Http;
using TurneroDentalApi.Data;
using TurneroDentalApi.Models;

namespace TurneroDentalApi.Controllers
{
    [RoutePrefix("api/avisos")]
    public class AvisoController : ApiController
    {
        private readonly TurneroDentalContext db = new TurneroDentalContext();

        [HttpGet, Route("")]
        public IHttpActionResult GetTodos()
        {
            var avisos = db.Avisos
                .OrderByDescending(a => a.FechaCreacion)
                .Select(a => new
                {
                    a.IdAviso,
                    a.Mensaje,
                    a.FechaCreacion,
                    a.Leida,
                    a.IdTurno
                })
                .ToList();

            return Ok(avisos);
        }

        [HttpPost, Route("")]
        public IHttpActionResult Crear(Aviso aviso)
        {
            if (aviso == null)
                return BadRequest("El aviso es obligatorio.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            aviso.IdAviso = 0;
            aviso.FechaCreacion = DateTime.Now;
            aviso.Leida = false;

            db.Avisos.Add(aviso);
            db.SaveChanges();

            return Ok(new { aviso.IdAviso });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
                db.Dispose();

            base.Dispose(disposing);
        }
    }
}
