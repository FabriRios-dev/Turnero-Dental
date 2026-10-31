
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web.Http;
using TurneroDentalApi.Data;
using TurneroDentalApi.Helpers;
using TurneroDentalApi.Models;

namespace TurneroDentalApi.Controllers
{
    public class LoginRequest
    {
        public string NombreUsuario { get; set; }
        public string Contrasena { get; set; }
    }

    public class RegistroRequest
    {
        [Required, StringLength(100)]
        public string Nombre { get; set; }

        [Required, StringLength(100)]
        public string Apellido { get; set; }

        [Required, StringLength(50, MinimumLength = 4)]
        public string NombreUsuario { get; set; }

        [Required, StringLength(100, MinimumLength = 6)]
        public string Contrasena { get; set; }

        [Required, StringLength(20)]
        public string Telefono { get; set; }

        [StringLength(100), EmailAddress]
        public string Email { get; set; }

        [StringLength(100)]
        public string Direccion { get; set; }
    }

    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        private readonly TurneroDentalContext db = new TurneroDentalContext();

        [HttpPost, Route("login")]
        public IHttpActionResult Login(LoginRequest request)
        {
            if (request == null)
                return BadRequest("Datos de inicio de sesión inválidos.");

            var usuario = db.Usuarios.FirstOrDefault(
                u => u.NombreUsuario == request.NombreUsuario);

            if (usuario == null ||
                !PasswordHasher.Verificar(request.Contrasena, usuario.Contrasena))
                return Unauthorized();

            if (!PasswordHasher.EsHash(usuario.Contrasena))
            {
                usuario.Contrasena = PasswordHasher.Hashear(request.Contrasena);
                db.SaveChanges();
            }

            return Ok(Sesion(usuario));
        }

        [HttpPost, Route("registro")]
        public IHttpActionResult Registro(RegistroRequest request)
        {
            if (request == null)
                return BadRequest("Completá todos los datos.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            int telefono;
            if (!int.TryParse(request.Telefono, out telefono) || telefono <= 0)
                return BadRequest("El teléfono debe contener solamente números.");

            var nombreUsuario = request.NombreUsuario.Trim();

            if (db.Usuarios.Any(u => u.NombreUsuario == nombreUsuario))
                return BadRequest("Ese nombre de usuario ya está en uso.");

            var rolPaciente = db.Roles.FirstOrDefault(
                r => r.NombreRol == "Paciente");

            if (rolPaciente == null)
                return BadRequest("No existe el rol Paciente en la base de datos.");

            using (var transaccion = db.Database.BeginTransaction())
            {
                var usuario = new Usuario
                {
                    NombreUsuario = nombreUsuario,
                    Contrasena = PasswordHasher.Hashear(request.Contrasena),
                    IdRol = rolPaciente.IdRol
                };

                db.Usuarios.Add(usuario);
                db.SaveChanges();

                var paciente = new Paciente
                {
                    NombrePaciente = request.Nombre.Trim() + " " + request.Apellido.Trim(),
                    Telefono = telefono,
                    Correo = string.IsNullOrWhiteSpace(request.Email)
                        ? null : request.Email.Trim(),
                    Direccion = string.IsNullOrWhiteSpace(request.Direccion)
                        ? null : request.Direccion.Trim(),
                    IdUsuario = usuario.IdUsuario
                };

                db.Pacientes.Add(paciente);
                db.SaveChanges();

                transaccion.Commit();
                return Ok(Sesion(usuario));
            }
        }

        private object Sesion(Usuario usuario)
        {
            var paciente = db.Pacientes.FirstOrDefault(
                p => p.IdUsuario == usuario.IdUsuario);

            var rol = db.Roles.FirstOrDefault(
                r => r.IdRol == usuario.IdRol);

            return new
            {
                usuario.IdUsuario,
                usuario.NombreUsuario,
                Rol = rol != null ? rol.NombreRol : null,
                IdPaciente = paciente != null
                    ? (int?)paciente.IdPaciente : null,
                Nombre = paciente != null
                    ? paciente.NombrePaciente : usuario.NombreUsuario
            };
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
                db.Dispose();

            base.Dispose(disposing);
        }
    }
}
