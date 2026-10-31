
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TurneroDentalApi.Models
{
    [Table("Usuario")]
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdUsuario { get; set; }

        [Required, StringLength(100)]
        public string NombreUsuario { get; set; }

        [Required, StringLength(100)]
        public string Contrasena { get; set; }

        public int IdRol { get; set; }

        [ForeignKey("IdRol")]
        public virtual Rol Rol { get; set; }
    }

    [Table("Rol")]
    public class Rol
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdRol { get; set; }

        [Required, StringLength(20)]
        public string NombreRol { get; set; }
    }

    [Table("Especialidad")]
    public class Especialidad
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdEspecialidad { get; set; }

        [Required, StringLength(100)]
        public string Nombre { get; set; }
    }

    [Table("Profesional")]
    public class Profesional
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdProfesional { get; set; }

        [Required, StringLength(100)]
        public string NombreProfesional { get; set; }

        public int Telefono { get; set; }

        [StringLength(100)]
        public string Direccion { get; set; }

        [StringLength(100)]
        public string Correo { get; set; }

        public int IdUsuario { get; set; }
        public int IdEspecialidad { get; set; }

        [ForeignKey("IdUsuario")]
        public virtual Usuario Usuario { get; set; }

        [ForeignKey("IdEspecialidad")]
        public virtual Especialidad Especialidad { get; set; }
    }

    [Table("Paciente")]
    public class Paciente
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdPaciente { get; set; }

        [Required, StringLength(100)]
        public string NombrePaciente { get; set; }

        public int Telefono { get; set; }

        [StringLength(100)]
        public string Direccion { get; set; }

        [StringLength(100)]
        public string Correo { get; set; }

        public int IdUsuario { get; set; }

        [ForeignKey("IdUsuario")]
        public virtual Usuario Usuario { get; set; }
    }

    [Table("Turno")]
    public class Turno
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdTurno { get; set; }

        public DateTime Fecha { get; set; }
        public TimeSpan Hora { get; set; }

        [Required, StringLength(20)]
        public string Estado { get; set; }

        public int IdPaciente { get; set; }
        public int IdProfesional { get; set; }

        [ForeignKey("IdPaciente")]
        public virtual Paciente Paciente { get; set; }

        [ForeignKey("IdProfesional")]
        public virtual Profesional Profesional { get; set; }
    }

    [Table("HorarioAtencion")]
    public class HorarioAtencion
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdHorario { get; set; }

        public int IdProfesional { get; set; }
        public byte DiaSemana { get; set; }
        public TimeSpan HoraInicio { get; set; }
        public TimeSpan HoraFin { get; set; }

        public int DuracionMinutos { get; set; }

        [ForeignKey("IdProfesional")]
        public virtual Profesional Profesional { get; set; }
    }

    [Table("Aviso")]
    public class Aviso
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdAviso { get; set; }

        [Required, StringLength(1000)]
        public string Mensaje { get; set; }

        public DateTime FechaCreacion { get; set; }
        public bool Leida { get; set; }

        public int? IdTurno { get; set; }

        [ForeignKey("IdTurno")]
        public virtual Turno Turno { get; set; }
    }
}
