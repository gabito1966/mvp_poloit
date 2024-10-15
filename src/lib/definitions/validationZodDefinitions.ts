import { z } from "zod";

export const CreateSchemaEmpresa = z.object({
  id: z.coerce.number({
    invalid_type_error: "EL ID debe ser de tipo número",
    message: "Ingrese un ID",
  }),
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(25, "El nombre debe contener menos de 25 caracteres"),
});

export const CreateEmpresa = CreateSchemaEmpresa.omit({ id: true });

export type EmpresaZod = z.infer<typeof CreateEmpresa>

export const UpdateEmpresa = z.object({
  id: z.coerce.number({ invalid_type_error: "Debe ser un número" }),
  nombre: z
    .string({ message: "Ingrese un nombre" }).trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(25, "El nombre debe contener menos de 25 caracteres"),
});

export type Empresa = z.infer<typeof UpdateEmpresa>;

export const GetEmpresa = z.object({
  id: z.coerce.number({ invalid_type_error: "Debe ser un número" }),
});


export const CreateSchemaEquipos = z.object({
    id: z.coerce.number({
      invalid_type_error: "El ID debe ser de tipo número",
      message: "Ingrese un ID",
    }),
    nombre: z
      .string({ message: "Ingrese un nombre" })
      .trim()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(30, "El nombre debe contener menos de 30 caracteres")
      .regex(/^[a-zA-Z0-9\sñÑ]+$/, {
        message: "Solo se permiten letras y números",
      }),
    tamano: z.coerce
      .number({
        invalid_type_error: "El tamaño debe ser un número",
        message: "Ingrese un tamaño",
      })
      .gt(5, { message: "Ingrese un numero mayor 5" })
      .lt(12, "El tamaño debe ser menor a 12"),
    fecha_inicio: z.coerce.date({ message: "Ingrese una fecha de inicio" }),
    fecha_fin: z.coerce.date({ message: "Ingrese una fecha final de entrega" }),
  });

  export const CreateEquipos = CreateSchemaEquipos.omit({ id: true }).refine((data) => data.fecha_inicio < data.fecha_fin, {
    message: "La fecha de inicio debe ser anterior a la fecha de fin",
    path: ["fecha_fin"], 
  });

  export type Equipos = z.infer<typeof CreateSchemaEquipos>;

  export const GetEquipo = z.object({
    id: z.coerce.number({ invalid_type_error: "Debe ser un numéro" }),
  });


export const CreateSchemaEstudiante = z.object({
    id: z.coerce.number({
      invalid_type_error: "Debe ser un número",
      message: "Ingrese un ID de mentor",
    }),
    nombre: z
      .string({ message: "Ingrese un nombre" })
      .trim()
      .min(2, "El nombre debe de contener al menos 2 caracteres")
      .max(25, "El nombre debe contener menos de 25 caracteres")
      .regex(/^[a-zA-ZñÑ\s]+$/, {
        message: "Solo se permiten catacteres o espacios",
      }),
    apellido: z
      .string({ message: "Ingrese un apellido" })
      .trim()
      .min(2, "El apellido debe contener al menos 2 caracteres")
      .max(25, "El apellido debe contener menos de 25 caracteres")
      .regex(/^[a-zA-ZñÑ\s]+$/, "Solo se permiten catacteres o espacios"),
    email: z
      .string({ message: "Ingrese un email" })
      .email("Debe ser un email válido")
      .min(6, "El email debe contener al menos 6 caracteres")
      .max(50, "El email debe contener menos de 50 caracteres"),
    telefono: z
      .string({ message: "Ingrese un teléfono" })
      .min(6, "El teléfono debe contener al menos 6 números")
      .max(20, "El teléfono debe contener menos de 20 números")
      .regex(/^[0-9]+$/, "Solo se permiten numéros"),
    id_ong: z.coerce
      .number({
        message: "Seleccione una organización",
        invalid_type_error: "Seleccione una organización",
      })
      .gt(0, { message: "Seleccione una organización" }),
    tecnologias: z
      .array(
        z.object({
          id: z.coerce.number().gt(0, { message: "Seleccione una tecnología" }),
          nombre: z.string(),
          tipo: z.string(),
        })
      )
      .min(1, "Debe seleccionar una tecnología"),
  });

export const CreateEstudiante = CreateSchemaEstudiante.omit({ id: true });

export  type EstudianteInterface = z.infer<typeof CreateSchemaEstudiante>;

export const UpdateEstudiante = z.object({
    id: z.coerce.number({ invalid_type_error: "Debe ser un numero" }),
    nombre: z
      .string({ message: "Ingrese un nombre" })
      .trim()
      .min(2, "El nombre debe de contener al menos 2 caracteres")
      .max(25, "El nombre debe de contener menos de 25 caracteres")
      .regex(/^[a-zA-ZñÑ\s]+$/, {
        message: "Solo se permiten catacteres o espacios",
      }),
    apellido: z
      .string({ message: "Ingrese un apellido" })
      .trim()
      .min(2, "El apellido debe contener al menos 2 caracter")
      .max(25, "El nombre debe de contener menos de 25 caracteres")
      .regex(/^[a-zA-ZñÑ\s]+$/, {
        message: "Solo se permiten catacteres o espacios",
      }),
    estado: z.boolean(),
    email: z
      .string({ message: "Ingrese un email" })
      .email("Debe ser un email válido")
      .min(6, "El email debe contener al menos 6 caracteres")
      .max(50, "El email debe contener menos de 50 caracteres"),
    telefono: z
      .string({ message: "Ingrese un teléfono" })
      .min(6, "El teléfono debe contener al menos 6 números")
      .max(20, "El teléfono debe contener menos de 20 números")
      .regex(/^[0-9]+$/, "Solo se permiten numéros"),
    id_ong: z.coerce.number({
      invalid_type_error: "Seleccione una organización",
    }),
    tecnologias: z
      .array(
        z.object({
          id: z.coerce.number(),
          nombre: z.string(),
          tipo: z.string(),
        })
      )
      .min(1, "Debe seleccionar una tecnología"),
  });

export type EstudianteInterfaceZod = z.infer<typeof UpdateEstudiante>;

export const GetEstudiante = z.object({
  id: z.coerce.number({ invalid_type_error: "Debe ser un numéro" }),
});


export const CreateSchemaGemini = z.object({
    tipo: z.coerce.number().int().gt(0, { message: "Seleccione tipo" }),
    mensaje: z.string().optional(),
    session: z.string({ message: "Inicie sesión" }),
  });
  
export type GeminiInterface = z.infer<typeof CreateSchemaGemini>;


export const CreateLogin = z.object({
    email: z
      .string({ message: "Ingrese un email" })
      .email("Debe ser un email válido")
      .min(6, "El email de debe contener al menos 6 caracteres"),
    password: z.string().min(6, "La contraseña debe contener al menos 6 caracteres"),
  });


export const CreateSchemaMentor = z.object({
    id: z.coerce.number({
      invalid_type_error: "Debe ser un número",
      message: "Ingrese un ID de mentor",
    }),
    nombre: z
      .string({ message: "Ingrese un nombre" })
      .trim()
      .min(2, "El nombre debe contener al menos 2 caracteres")
      .max(25, "El nombre debe contener menos de 25 caracteres")
      .regex(/^[a-zA-ZñÑ\s]+$/, {
        message: "Solo se permiten catacteres o espacios",
      }),
    apellido: z
      .string({ message: "Ingrese un apellido" })
      .trim()
      .min(2, "El apellido debe contener al menos 2 caracteres")
      .max(25, "El apellido debe contener menos de 25 caracteres")
      .regex(/^[a-zA-ZñÑ\s]+$/, {
        message: "Solo se permiten catacteres o espacios",
      }),
    email: z
      .string({ message: "Ingrese un email" })
      .email("Debe ser un email válido")
      .min(6, "El email debe contener al menos 6 números")
      .max(50, "El email debe contener menos de 50 caracteres"),
    telefono: z
      .string({ message: "Ingrese un teléfono" })
      .min(6, "El telefono debe contener al menos 6 caracteres")
      .max(20, "El telefono debe contener menos de 20 caracteres")
      .regex(/^[0-9]+$/, "Solo se permiten numéros"),
    id_empresa: z.coerce
      .number({
        message: "Seleccione una organización",
        invalid_type_error: "Seleccione una empresa",
      })
      .gt(0, { message: "Seleccione una organización" }),
    tecnologias: z
      .array(
        z.object({
          id: z.coerce.number().gt(0, { message: "Seleccione una tecnología" }),
          nombre: z.string(),
          tipo: z.string(),
        })
      )
      .min(1, "Debe seleccionar al menos una tecnología"),
  });
  
export const CreateMentor = CreateSchemaMentor.omit({ id: true });
  
export type Mentor = z.infer<typeof CreateSchemaMentor>;

export const UpdateScremaMentor = z.object({
    id: z.coerce.number({ invalid_type_error: "Debe ser un numero" }),
    nombre: z
      .string({ message: "Ingrese un nombre" })
      .trim()
      .min(2, "El nombre debe de contener al menos 2 caracteres")
      .max(25, "El nombre debe de contener menos de 25 caracteres")
      .regex(/^[a-zA-ZñÑ\s]+$/, {
        message: "Solo se permiten catacteres o espacios",
      }),
    apellido: z
      .string({ message: "Ingrese un apellido" })
      .trim()
      .min(2, "El apellido debe contener al menos 2 caracter")
      .max(25, "El apellido debe contener menos de 25 caracteres")
      .regex(/^[a-zA-ZñÑ\s]+$/, {
        message: "Solo se permiten catacteres o espacios",
      }),
    email: z
      .string({ message: "Ingrese un email" })
      .email("Debe ser un email válido")
      .min(6, "El email debe contener al menos 6 caracteres")
      .max(50, "El email debe contener menos de 50 caracteres"),
    estado: z.boolean(),
    telefono: z
      .string({ message: "Ingrese un teléfono" })
      .min(6, "El teléfono debe contener al menos 6 números")
      .max(20, "El teléfono debe contener menos de 20 números")
      .regex(/^[0-9]+$/, "Solo se permiten numéros"),
    id_empresa: z.coerce.number({
      invalid_type_error: "Seleccione una empresa",
    }),
    tecnologias: z
      .array(
        z.object({
          id: z.coerce.number(),
          nombre: z.string(),
          tipo: z.string(),
        })
      )
      .min(1, "Debe seleccionar al menos una tecnología"),
  });
  
 export const UpdateMentor = UpdateScremaMentor.omit({});
  
 export type MentorInterface = z.infer<typeof UpdateMentor>;

 export const GetMentor = z.object({
    id: z.coerce.number({ invalid_type_error: "Debe ser un número" }),
  });
  
 export const CreateOng = z.object({
    nombre: z
      .string({ message: "Seleccione un nombre" }).trim()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(25, "El nombre debe contener menos de 25 caracteres"),
  });


  export const UpdateOng = z.object({
    id: z.coerce.number({ invalid_type_error: "Seleccione una organización" }),
    nombre: z
      .string({ message: "Ingrese un nombre" }).trim()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(25, "El nombre debe contener menos de 25 caracteres"),
  });

 export const CreateSchemaMensaje = z.object({
    mensaje: z
      .string({ message: "Ingrese un mensaje" })
      .min(20, "El mensaje debe contener al menos 20 caracteres"),
    tipo: z.coerce
      .number({
        message: "Seleccione tipo",
        invalid_type_error: "Seleccione tipo valido",
      })
      .gt(0, { message: "Seleccione tipo" }),
    session: z.string({ message: "Inicie sesión" }),
  });
  
  export type MensajeInterface = z.infer<typeof CreateSchemaMensaje>;

  export const CreateSchemaTecnologia = z.object({
    id: z.coerce.number({ message: "Ingrese un ID" }),
    nombre: z
      .string({ message: "Ingrese un nombre" }).trim()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(25, "El nombre debe contener menos de 25 caracteres"),
    tipo:z.string()
  });
  
  export const CreateTecnologia = CreateSchemaTecnologia.omit({ id: true });
  
  export type Tecnologia = z.infer<typeof CreateTecnologia>;

 export const UpdateTecnologia = z.object({
    id: z.coerce.number({ invalid_type_error: "El ID debe ser un número" }),
    nombre: z
      .string({ message: "Ingrese un nombre" }).trim()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(25, "El nombre debe contener menos de 25 caracteres"),
  });

  export const GetTecnologia = z.object({
    id: z.coerce.number({ invalid_type_error: "El ID debe ser un número" }),
  });

  export const CreateSchemaEquipoManual = z.object({
    nombre: z
      .string({ message: "Ingrese un nombre" })
      .trim()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(30, "El nombre debe contener menos de 30 caracteres")
      .regex(/^[a-zA-Z0-9\sñÑ-]+$/, {
        message: "Solo se permiten letras y números",
      }),
    tamano: z.coerce
      .number({
        invalid_type_error: "El tamaño debe ser un número",
        message: "Ingrese un tamaño",
      })
      .gt(5, { message: "Seleccione por lo menos 6 integrantes" }),
    fecha_inicio: z.coerce.date({ message: "Ingrese una fecha de inicio" }),
    fecha_fin: z.coerce.date({ message: "Ingrese una fecha final de entrega" }),
    integrantes: z.array(z.number().gt(0, { message: "Seleccione un estudiante" })).min(6, "Debe tener al menos 6 integrante"),
    mentorTecnico: z.number().gt(0, { message: "Seleccione un mentor técnico" }),
    mentorUXUI: z.number().gt(0, { message: "Seleccione un mentor UX/UI" }),
    mentorQA: z.number().gt(0, { message: "Seleccione un mentor QA" }),
  });

  export const CreateEquipoManual = CreateSchemaEquipoManual.refine((data) => data.fecha_inicio < data.fecha_fin, {
    message: "La fecha de inicio debe ser anterior a la fecha de fin",
    path: ["fecha_fin"], 
  });

  export type EquipoManual = z.infer<typeof CreateSchemaEquipoManual>;

  
export const CreateSchemaEquipoManualUpdate = z.object({
  id: z.coerce.number({ invalid_type_error: "Debe ser un numero" }),
  nombre: z
    .string({ message: "Ingrese un nombre" })
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre debe contener menos de 30 caracteres")
    .regex(/^[a-zA-Z0-9\sñÑ-]+$/, {
      message: "Solo se permiten letras y números",
    }),
  tamano: z.coerce
    .number({
      invalid_type_error: "El tamaño debe ser un número",
      message: "Ingrese un tamaño",
    })
    .gt(5, { message: "Seleccione por lo menos 6 integrantes" }),
  fecha_inicio: z.coerce.date({ message: "Ingrese una fecha de inicio" }),
  fecha_fin: z.coerce.date({ message: "Ingrese una fecha final de entrega" }),
  integrantes: z
    .array(z.number().gt(0, { message: "Seleccione un estudiante" }))
    .min(6, "Debe tener al menos 6 integrante"),
  mentorTecnico: z.number().gt(0, { message: "Seleccione un mentor técnico" }),
  mentorUXUI: z.number().gt(0, { message: "Seleccione un mentor UX/UI" }),
  mentorQA: z.number().gt(0, { message: "Seleccione un mentor QA" }),
});

export const CreateEquipoManualUpdate = CreateSchemaEquipoManualUpdate.refine(
  (data) => data.fecha_inicio < data.fecha_fin,
  {
    message: "La fecha de inicio debe ser anterior a la fecha de fin",
    path: ["fecha_fin"],
  }
);

export type EquipoManualUpdate = z.infer<typeof CreateSchemaEquipoManualUpdate>;