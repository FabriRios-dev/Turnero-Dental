import { create } from 'zustand';

export interface Sesion {
  idPaciente: number;
  idUsuario: number;
  nombre: string;
}

export interface Turno {
  idProfesional: number;
  profesional: string;
  especialidad: string;
  fecha: string;
  hora: string;
  paciente?: string;
  estado?: string;
  idTurno?: number;
}

interface AppState {
  sesion: Sesion | null;
  turnoEnCurso: Turno | null;
  turnoConfirmado: Turno | null;
  fotoPerfil: string | null;

  iniciarSesion: (sesion: Sesion) => void;
  cerrarSesion: () => void;

  setTurnoEnCurso: (turno: Turno) => void;
  limpiarTurno: () => void;

  setTurnoConfirmado: (turno: Turno) => void;
  setFotoPerfil: (uri: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sesion: null,
  turnoEnCurso: null,
  turnoConfirmado: null,
  fotoPerfil: null,

  iniciarSesion: (sesion) => set({ sesion }),
  cerrarSesion: () =>
    set({
      sesion: null,
      turnoEnCurso: null,
      turnoConfirmado: null,
    }),

  setTurnoEnCurso: (turno) => set({ turnoEnCurso: turno }),
  limpiarTurno: () => set({ turnoEnCurso: null }),

  setTurnoConfirmado: (turno) => set({ turnoConfirmado: turno }),
  setFotoPerfil: (uri) => set({ fotoPerfil: uri }),
}));