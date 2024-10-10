
export interface PageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}
export interface PartnersSectionProps {
  title: string;
  paragraph:string;
  images: string[];
}

export type Mentor = {
  apellido: string;
  nombre: string;
  email: string;
  telefono: string;
  tecnologia: string;
};

export type Equipo = {
  id: string;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  tamano: number;
  mentor_apellido: string;
  mentor: string;
  mentor_email: string;
  mentor_telefono: string;
  mentor_qa_apellido: string;
  mentor_qa: string;
  mentor_qa_email: string;
  mentor_qa_telefono: string;
  mentor_ux_ui_apellido: string;
  mentor_ux_ui: string;
  mentor_ux_ui_email: string;
  mentor_ux_ui_telefono: string;
  nombres_estudiantes: string[];
  apellidos_estudiantes: string[];
  emails_estudiantes: string[];
  telefonos_estudiantes: string[];
  tecnologias: string[];
};

export interface Empresa {
  id: number;
  nombre: string;
}

export interface Ong {
  id: number;
  nombre: string;
}

export interface Tecnologia {
  id: number;
  nombre: string;
}

export interface EmailTemplateProps {
  firstName: string;
  content: string;
}

export type TextTypingEffectProps = {
  isTypeByLetter?: boolean;
  duration?: number;
  texts:string;
};

export interface Estudiante {
  id?: "";
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  estado?: string;
  id_ong: number | null;
  tecnologias: { id: number; nombre: string; tipo: string }[];
}

export interface EstudianteParams {
  id: number;
  apellido: string;
  nombre: string;
  email: string;
  telefono: string;
  estado: string;
  id_ong: number;
  tecnologias: { id: number; nombre: string; tipo: string }[];
}

export type OngFrondEnd = {
  id: number;
  nombre: string;
};

export interface MentorFrondEnd {
  id?: "";
  apellido: string;
  nombre: string;
  email: string;
  telefono: string;
  estado?: string;
  id_empresa: number;
  tecnologias: { id: number; nombre: string; tipo: string }[];
}

export interface MentorParams {
  id: number;
  apellido: string;
  nombre: string;
  email: string;
  telefono: string;
  estado: string;
  id_empresa: number;
  tecnologias: { id: number; nombre: string; tipo: string }[];
}

export type EmpresaFrondEnd = {
  id: number;
  nombre: string;
};

export interface AnimatedBarProps {
  chartHeight: number;
  topLabel: number;
  cantTotalEstudiantes: number;
  tecnologia: {
    nombre: string;
    cantidad_estudiantes: number;
  };
}

export interface AnimatedNumberProps {
  value: number;
  className?: string;
}

export interface CardProps {
  name: string;
  icon: string;
  cant: number;
  line?: boolean;
}

export type CarouselProps = {
  images: string[];
};