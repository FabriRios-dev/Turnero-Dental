/*
    Turnero Dental - Script de estructura
    Crea la base de datos y sus tablas, restricciones e índices.

    IMPORTANTE:
    - Ejecutar únicamente en una instancia donde TurneroDental no exista.
    - Este script crea la estructura; los datos de prueba se cargan por separado.
    - No modifica la estructura de una base ya existente.
*/

USE [master]
GO

-- Ejecutar solamente cuando la base TurneroDental todavía no exista.
CREATE DATABASE [TurneroDental]
 CONTAINMENT = NONE
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [TurneroDental] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TurneroDental].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TurneroDental] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TurneroDental] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TurneroDental] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TurneroDental] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TurneroDental] SET ARITHABORT OFF 
GO
ALTER DATABASE [TurneroDental] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TurneroDental] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TurneroDental] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TurneroDental] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TurneroDental] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TurneroDental] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TurneroDental] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TurneroDental] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TurneroDental] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TurneroDental] SET  DISABLE_BROKER 
GO
ALTER DATABASE [TurneroDental] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TurneroDental] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TurneroDental] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TurneroDental] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TurneroDental] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TurneroDental] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TurneroDental] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TurneroDental] SET RECOVERY FULL 
GO
ALTER DATABASE [TurneroDental] SET  MULTI_USER 
GO
ALTER DATABASE [TurneroDental] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TurneroDental] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TurneroDental] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TurneroDental] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TurneroDental] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [TurneroDental] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'TurneroDental', N'ON'
GO
ALTER DATABASE [TurneroDental] SET QUERY_STORE = ON
GO
ALTER DATABASE [TurneroDental] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [TurneroDental]
GO
/****** Object:  Table [dbo].[Aviso]    Script Date: 30/10/2026 13:07:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Aviso](
	[IdAviso] [int] IDENTITY(1,1) NOT NULL,
	[Mensaje] [varchar](1000) NOT NULL,
	[FechaCreacion] [datetime] NOT NULL,
	[Leido] [bit] NOT NULL,
	[IdTurno] [int] NULL,
 CONSTRAINT [PK_Aviso] PRIMARY KEY CLUSTERED 
(
	[IdAviso] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Especialidad]    Script Date: 30/10/2026 13:07:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Especialidad](
	[IdEspecialidad] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Especialidad] PRIMARY KEY CLUSTERED 
(
	[IdEspecialidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_Especialidad_Nombre] UNIQUE NONCLUSTERED 
(
	[Nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HorarioAtencion]    Script Date: 30/10/2026 13:07:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HorarioAtencion](
	[IdHorario] [int] IDENTITY(1,1) NOT NULL,
	[IdProfesional] [int] NOT NULL,
	[DiaSemana] [tinyint] NOT NULL,
	[HoraInicio] [time](0) NOT NULL,
	[HoraFin] [time](0) NOT NULL,
	[DuracionMinutos] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdHorario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Paciente]    Script Date: 30/10/2026 13:07:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Paciente](
	[IdPaciente] [int] IDENTITY(1,1) NOT NULL,
	[NombrePaciente] [nvarchar](100) NOT NULL,
	[Telefono] [int] NOT NULL,
	[Direccion] [nvarchar](100) NULL,
	[Correo] [nvarchar](100) NULL,
	[IdUsuario] [int] NOT NULL,
 CONSTRAINT [PK_Paciente] PRIMARY KEY CLUSTERED 
(
	[IdPaciente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Profesional]    Script Date: 30/10/2026 13:07:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Profesional](
	[IdProfesional] [int] IDENTITY(1,1) NOT NULL,
	[NombreProfesional] [nvarchar](100) NOT NULL,
	[Telefono] [int] NOT NULL,
	[Direccion] [nvarchar](100) NULL,
	[Correo] [nvarchar](100) NULL,
	[IdUsuario] [int] NOT NULL,
	[IdEspecialidad] [int] NOT NULL,
 CONSTRAINT [PK_Profesional] PRIMARY KEY CLUSTERED 
(
	[IdProfesional] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rol]    Script Date: 30/10/2026 13:07:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rol](
	[IdRol] [int] IDENTITY(1,1) NOT NULL,
	[NombreRol] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdRol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[NombreRol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Turno]    Script Date: 30/10/2026 13:07:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Turno](
	[IdTurno] [int] IDENTITY(1,1) NOT NULL,
	[Fecha] [date] NOT NULL,
	[Hora] [time](0) NOT NULL,
	[Estado] [varchar](20) NOT NULL,
	[IdPaciente] [int] NOT NULL,
	[IdProfesional] [int] NOT NULL,
 CONSTRAINT [PK_Turno] PRIMARY KEY CLUSTERED 
(
	[IdTurno] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_Turno_Profesional_Fecha_Hora] UNIQUE NONCLUSTERED 
(
	[IdProfesional] ASC,
	[Fecha] ASC,
	[Hora] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 30/10/2026 13:07:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[IdUsuario] [int] IDENTITY(1,1) NOT NULL,
	[NombreUsuario] [nvarchar](100) NOT NULL,
	[Contrasena] [nvarchar](100) NOT NULL,
	[IdRol] [int] NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_Paciente]    Script Date: 30/10/2026 13:07:06 ******/
CREATE NONCLUSTERED INDEX [IX_Paciente] ON [dbo].[Paciente]
(
	[IdPaciente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Aviso] ADD  CONSTRAINT [DF_Aviso_FechaCreacion]  DEFAULT (getdate()) FOR [FechaCreacion]
GO
ALTER TABLE [dbo].[Aviso] ADD  CONSTRAINT [DF_Aviso_Leido]  DEFAULT ((0)) FOR [Leido]
GO
ALTER TABLE [dbo].[HorarioAtencion] ADD  CONSTRAINT [DF_HorarioAtencion_Duracion]  DEFAULT ((30)) FOR [DuracionMinutos]
GO
ALTER TABLE [dbo].[Turno] ADD  CONSTRAINT [DF_Turno_Estado]  DEFAULT ('Pendiente') FOR [Estado]
GO
ALTER TABLE [dbo].[Aviso]  WITH CHECK ADD  CONSTRAINT [FK_Aviso_Turno] FOREIGN KEY([IdTurno])
REFERENCES [dbo].[Turno] ([IdTurno])
GO
ALTER TABLE [dbo].[Aviso] CHECK CONSTRAINT [FK_Aviso_Turno]
GO
ALTER TABLE [dbo].[HorarioAtencion]  WITH CHECK ADD  CONSTRAINT [FK_HorarioAtencion_Profesional] FOREIGN KEY([IdProfesional])
REFERENCES [dbo].[Profesional] ([IdProfesional])
GO
ALTER TABLE [dbo].[HorarioAtencion] CHECK CONSTRAINT [FK_HorarioAtencion_Profesional]
GO
ALTER TABLE [dbo].[Paciente]  WITH CHECK ADD  CONSTRAINT [FK_Paciente_Usuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuario] ([IdUsuario])
GO
ALTER TABLE [dbo].[Paciente] CHECK CONSTRAINT [FK_Paciente_Usuario]
GO
ALTER TABLE [dbo].[Profesional]  WITH CHECK ADD  CONSTRAINT [FK_Profesional_Especialidad] FOREIGN KEY([IdEspecialidad])
REFERENCES [dbo].[Especialidad] ([IdEspecialidad])
GO
ALTER TABLE [dbo].[Profesional] CHECK CONSTRAINT [FK_Profesional_Especialidad]
GO
ALTER TABLE [dbo].[Profesional]  WITH CHECK ADD  CONSTRAINT [FK_Profesional_Usuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuario] ([IdUsuario])
GO
ALTER TABLE [dbo].[Profesional] CHECK CONSTRAINT [FK_Profesional_Usuario]
GO
ALTER TABLE [dbo].[Turno]  WITH CHECK ADD  CONSTRAINT [FK_Turno_Paciente] FOREIGN KEY([IdPaciente])
REFERENCES [dbo].[Paciente] ([IdPaciente])
GO
ALTER TABLE [dbo].[Turno] CHECK CONSTRAINT [FK_Turno_Paciente]
GO
ALTER TABLE [dbo].[Turno]  WITH CHECK ADD  CONSTRAINT [FK_Turno_Profesional] FOREIGN KEY([IdProfesional])
REFERENCES [dbo].[Profesional] ([IdProfesional])
GO
ALTER TABLE [dbo].[Turno] CHECK CONSTRAINT [FK_Turno_Profesional]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_Rol] FOREIGN KEY([IdRol])
REFERENCES [dbo].[Rol] ([IdRol])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Usuario_Rol]
GO
ALTER TABLE [dbo].[HorarioAtencion]  WITH CHECK ADD  CONSTRAINT [CK_HorarioAtencion_DiaSemana] CHECK  (([DiaSemana]>=(0) AND [DiaSemana]<=(6)))
GO
ALTER TABLE [dbo].[HorarioAtencion] CHECK CONSTRAINT [CK_HorarioAtencion_DiaSemana]
GO
ALTER TABLE [dbo].[HorarioAtencion]  WITH CHECK ADD  CONSTRAINT [CK_HorarioAtencion_Duracion] CHECK  (([DuracionMinutos]>(0)))
GO
ALTER TABLE [dbo].[HorarioAtencion] CHECK CONSTRAINT [CK_HorarioAtencion_Duracion]
GO
ALTER TABLE [dbo].[HorarioAtencion]  WITH CHECK ADD  CONSTRAINT [CK_HorarioAtencion_Rango] CHECK  (([HoraInicio]<[HoraFin]))
GO
ALTER TABLE [dbo].[HorarioAtencion] CHECK CONSTRAINT [CK_HorarioAtencion_Rango]
GO
ALTER TABLE [dbo].[Turno]  WITH CHECK ADD  CONSTRAINT [CK_Turno_Estado] CHECK  (([Estado]='Realizado' OR [Estado]='Cancelado' OR [Estado]='Confirmado' OR [Estado]='Pendiente'))
GO
ALTER TABLE [dbo].[Turno] CHECK CONSTRAINT [CK_Turno_Estado]
GO
USE [master]
GO
ALTER DATABASE [TurneroDental] SET  READ_WRITE 
GO
