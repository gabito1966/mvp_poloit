export type Tecnologia = {
  id: number;
  nombre: string;
};

export type Ong = {
  id: number;
  nombre: string;
};

export type OngTecnologia = {
  id_tecnologia: number;
  id_ong: number;
};

export type Estudiante = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  estado: boolean;
  id_ong: number | null;
};

export type EstudianteTecnologia = {
  id_tecnologia: number;
  id_estudiante: number;
};

export type Mentor = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  id_empresa: number;
  estado: boolean;
};

export type MentorTecnologia = {
  id_tecnologia: number;
  id_mentor: number;
};

export type Equipo = {
  id: number;
  nombre: string;
  tamano: number;
  fecha_inicio: string | null; // Usando string para representar fechas en formato ISO
  fecha_fin: string | null; // Usando string para representar fechas en formato ISO
  id_mentor: number | null;
  id_mentor_ux_ui: number | null;
  id_mentor_qa: number | null;
};

export type EquipoEstudiante = {
  id_equipo: number;
  id_estudiante: number;
};

export type Administrador = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  usuario: string;
  contrasena: string;
};

export type empresas = {
  id: number;
  nombre: string;
};
