"use client";

import { TipoEMails } from "@/database/definitions";
import { fetchPostClient } from "@/lib/fetchFunctions";
import { revalidateFuntion } from "@/lib/server/serverCache";
import { formatDate } from "@/lib/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import useTypingEffect from "../email/useTypingEffect";

export default function MensajeComponent({
  emailsBienvenida,
  emailsSeguimiento,
  tiposEmail,
}: {
  emailsBienvenida: any[];
  emailsSeguimiento: any[];
  tiposEmail: TipoEMails[];
}) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [form, setForm] = useState({
    mensaje: "",
  });

  const [iaForm, setIaForm] = useState({
    mensaje: "",
  });

  const [preview, setPreview] = useState({
    fecha:"",
    cuerpo:"",
    tipo:"",
    title:"Seleccione o Genere un Email",
    subTitle:""
  });

  const dia = new Date();

  console.log(dia.toLocaleDateString("es-ES")) 


  const [tipo, setTipo] = useState("");
  const [tipoEmailsHistory, setTipoEmailsHistory] = useState("1");

  const [iaFormState, setIaFormState] = useState(false);

  const [responseBack, setResponseBack] = useState({
    message: "",
    errors: {
      mensaje: [],
      tipo: [],
      session: [],
    },
  });

  const typingEffectValue = useTypingEffect(iaForm.mensaje, 150, false);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setPreview({
      fecha:"",
      cuerpo:"",
      tipo:"",
      title:"Email Creación", 
      subTitle:"Vista Previa"
    })

    if (responseBack.message != "") {
      setResponseBack({
        ...responseBack,
        errors: {
          ...responseBack.errors,
          [e.target.name]: [],
        },
      });
    }
  };

  const verificateCookieSession = ()=>{
    const cookie = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("session"));
    const session = cookie && cookie.split("=")[1];

    if (!session) {
      router.push("/auth/login?error=auth_required");
    }

    return session
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const session = verificateCookieSession();

    const msj: string = form.mensaje.replaceAll("\n", "<br>");

    const postPromise = fetchPostClient(`/api/send`, {
      mensaje: msj,
      tipo,
      session,
    });

    toast.promise(postPromise, {
      loading: "Cargando...",
      success: (response: any) => {
        revalidateFuntion("/mensaje");
        router.push("/equipo");
        return `${response?.message}`;
      },
      error: (error) => {
        console.log(error);
        setResponseBack({
          message: error.message,
          errors: error.errors,
        });

        return `${error?.message}`;
      },
    });
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [typingEffectValue, form.mensaje]);

  const handleIA = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const session = verificateCookieSession();

    const postPromise = fetchPostClient(`/api/geminiai`, {
      ...form,
      tipo: tipo,
      session,
    });
    setIaForm({ mensaje: "" });

        setPreview({...preview ,...{
          fecha:"",
          cuerpo:"",
          tipo:"",
          title:"Email Generado con IA", 
        }})

    setIaFormState(true);

    toast.promise(postPromise, {
      loading: "Cargando...",
      success: (response: any) => {
        setIaForm({ mensaje: response.data[0].message });

        setForm({ mensaje: response.data[0].message });
        return `${response?.message}`;
      },
      error: (error) => {
        setResponseBack({
          message: error.message,
          errors: error.errors,
        });
        if (
          responseBack.errors.session.length > 0 ||
          error.message == "Sesión invalida"
        ) {
          router.push("/auth/login?error=auth_required");
        }
        return `${error?.message}`;
      },
    });
  };

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="flex w-full ">
          <h1 className="text-3xl font-bold ml-12 text-center md:text:left">
            Mensajería
          </h1>
        </div>

        <div className="grid grid-cols-5  gap-4 p-4 lg:px-10 ">
          <div className="col-span-5 lg:col-span-2 m-2 px-7 py-5 bg-white text-black rounded-lg shadow-lg min-h-[800px] dark:bg-gray-700">
            <div className="py-1 flex gap-2 justify-between items-center">
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  className="text-blue-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"></path>
                </svg>
                <h2 className="text-base  font-semibold text-nowrap  w-fit  border-[#335B9D] rounded-xl">
                  Historial de Emails
                </h2>
              </div>
              <select
                className={clsx(
                  "w-fit  border-2 rounded-lg p-1 dark:text-white dark:bg-gray-700  capitalize border-gray-100 text-sm"
                )}
                defaultValue={tiposEmail[0].tipo}
                onChange={(e) => {
                  setTipoEmailsHistory(e.target.value);
                }}
              >
                {tiposEmail.map((e, i) => (
                  <option
                    key={`${e.id}-${i}`}
                    className="capitalize"
                    value={e.id}
                  >
                    {e.tipo.toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className=" flex flex-col gap-2 min-h-[750px] max-h-[750px] overflow-y-auto">
              {tipoEmailsHistory == "1" &&
                (emailsBienvenida.length > 0 ? (
                  emailsBienvenida.map((e: any, i: number) => {
                    return (
                      <ItemMensajeria
                        key={`${i}-bienvenida`}
                        name={e.nombres_equipos}
                        cant={`${e.cantidad_equipos} Integrantes`}
                        fecha={e.fecha}
                        
                        tipo={tipoEmailsHistory}
                        cuerpo={e.cuerpo}
                        setPreview={setPreview}
                        setIaFormState={setIaFormState}
                      />
                    );
                  })
                ) : (
                  <div className="text-center text-lg font-semibold text-gray-500 capitalize">
                    <p>No hay emails de Bienvenida</p>
                  </div>
                ))}
              {tipoEmailsHistory == "2" &&
                (emailsSeguimiento.length > 0 ? (
                  emailsSeguimiento.map((e: any, i: number) => {
                    return (
                      <ItemMensajeria
                        key={`${i}-seguimiento`}
                        name={
                          e.nombres_estudiantes.length < 15
                            ? e.nombres_estudiantes
                            : e.nombres_estudiantes.slice(0, 15) + "..."
                        }
                        cant={e.remitente_nombre}
                        fecha={e.fecha}
                        tipo={tipoEmailsHistory}
                        cuerpo={e.cuerpo}
                        setPreview={setPreview}
                        setIaFormState={setIaFormState}
                      />
                    );
                  })
                ) : (
                  <div className="text-center text-lg font-semibold text-gray-500 capitalize">
                    <p>No hay emails de seguimiento</p>
                  </div>
                ))}
            </div>
          </div>

          <div className=" flex flex-col gap-3 col-span-5 lg:col-span-3 min-h-[800px] m-2 px-4 pt-4  pb-8 bg-white  text-black rounded-lg shadow-lg dark:bg-gray-700">
            <div className="flex items-center justify-between py-1 gap-2">
              <div className="flex flex-row justify-center items-center gap-2">
               {preview.cuerpo.length>0? <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="text-blue-400"
                  width="55"
                  height="55"
                  fill="currentColor"
                >
                  <path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"></path>
                </svg>:
                <svg xmlns="http://www.w3.org/2000/svg" className="text-blue-400"
                width="55"
                height="55" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"></path></svg>
                }
                <div className=" flex flex-col">
                  <h2 className="text-md md:text-xl font-semibold flex gap-2">
                    {preview.title}
                  </h2>
                  <p className="text-gray-700 text-sm md:text-md">
                    {preview.subTitle}
                  </p>
                </div>
              </div>

                <p className="self-start  text-gray-400 text-rigth text-xs">{preview.fecha}</p>

              <form onSubmit={handleIA} className="flex flex-col gap-1 ">
                <button
                  type="submit"
                  className="flex    rounded-xl w-fit justify-center px-3 py-2  items-center gap-3 bg-blue-400 transition-colors duration-500 text-white hover:bg-blue-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="currentColor"
                  >
                    <path d="M11.1244 1.09094H12.8753L12.9269 1.9453C13.2227 6.85075 17.1493 10.7773 22.0546 11.0732L22.909 11.1247V12.8757L22.0546 12.9272C17.1493 13.2231 13.2227 17.1498 12.9269 22.0551L12.8753 22.9095H11.1244L11.0728 22.0551C10.777 17.1498 6.85036 13.2231 1.94518 12.9272L1.09082 12.8757V11.1247L1.94518 11.0732C6.85036 10.7773 10.777 6.85075 11.0728 1.9453L11.1244 1.09094ZM11.9999 5.85023C10.83 8.61547 8.61512 10.8304 5.84996 12.0002C8.61512 13.1701 10.83 15.385 11.9999 18.1502C13.1697 15.385 15.3846 13.1701 18.1498 12.0002C15.3846 10.8304 13.1697 8.61547 11.9999 5.85023Z"></path>
                  </svg>
                  <span className="text-center text-sm md:text-md ">
                    {" "}
                    Generar con IA
                  </span>
                </button>
                <select
                  className={clsx(
                    "w-full dark:text-white dark:bg-slate-800  rounded-lg p-1  capitalize",
                    {
                      "border-red-500 animate-pulse border-3 bg-red-100":
                        responseBack.errors?.tipo?.length,
                      "border-gray-100 border-2 ": !responseBack.errors?.tipo?.length,
                    }
                  )}
                  defaultValue={""}
                  onChange={(e) => {
                    if (tipo != "") {
                      setForm({ mensaje: "" });
                      setIaForm({ mensaje: "" });
                    }
                    setTipo(e.target.value);
                    if (responseBack.errors.tipo?.length > 0) {
                      setResponseBack({
                        ...responseBack,
                        errors: {
                          ...responseBack.errors,
                          tipo: [],
                        },
                      });
                    }
                  }}
                >
                  <option className="capitalize" value={"0"} hidden>
                    tipo
                  </option>

                  {tiposEmail.map((e, i) => (
                    <option
                      key={`${e.id}-${i}`}
                      className="capitalize"
                      value={e.id}
                    >
                      {e.tipo.toLowerCase()}
                    </option>
                  ))}
                </select>
              </form>
            </div>

            <div className="h-full rounded-md dark:text-black border-gray-100 border-t p-2 dark:bg-slate-400 dark:border-slate-700 min-h-[750px] max-h-[750px] overflow-y-auto">
             {!preview.cuerpo.length && <p 
              
                dangerouslySetInnerHTML={{
                  __html: iaFormState
                    ? typingEffectValue.replaceAll("\n", "</br>")
                    : form.mensaje.replaceAll("\n", "</br>"),
                }}
              ></p>}
              <p 
              className="dark:text-black"
                dangerouslySetInnerHTML={{
                  __html: preview.cuerpo.length
                    ? preview.cuerpo
                    : "",
                }}
              />
            </div>
            <form
              onSubmit={handleSubmit}
              className=" border-gray-100 border-t dark:border-gray-700  w-full pt-5  flex items-center gap-4 "
            >
              <div className="w-full flex flex-col ">
                <textarea
                  ref={textareaRef}
                  onChange={handleChange}
                  value={iaFormState ? typingEffectValue : form.mensaje}
                  className={clsx(
                    "  resize-none overflow-y-auto  w-full p-2 rounded-lg dark:text-white dark:bg-gray-800 border-gray-100 border-2",
                    {
                      "border-red-500": responseBack.errors?.mensaje?.length,
                      "border-gray-100": !responseBack.errors?.mensaje?.length,
                      "cursor-pointer": iaFormState,
                    }
                  )}
                  onClick={() => {
                    setIaFormState(false);
                  }}
                  name="mensaje"
                  id="mensaje"
                  placeholder="Escribe un mensaje"
                />
                <div aria-live="polite" aria-atomic="true">
                  {responseBack.errors?.mensaje?.map((error: string) => (
                    <p className="mt-0 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
                <div aria-live="polite" aria-atomic="true">
                  {responseBack.errors?.tipo?.map((error: string) => (
                    <p className="mt-0 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-400 transition-colors duration-500 hover:bg-blue-700 text-white capitalize px-4 py-2 rounded-lg flex gap-2 justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M3.5 1.34558C3.58425 1.34558 3.66714 1.36687 3.74096 1.40747L22.2034 11.5618C22.4454 11.6949 22.5337 11.9989 22.4006 12.2409C22.3549 12.324 22.2865 12.3924 22.2034 12.4381L3.74096 22.5924C3.499 22.7255 3.19497 22.6372 3.06189 22.3953C3.02129 22.3214 3 22.2386 3 22.1543V1.84558C3 1.56944 3.22386 1.34558 3.5 1.34558ZM5 4.38249V10.9999H10V12.9999H5V19.6174L18.8499 11.9999L5 4.38249Z"></path>
                </svg>
                enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export function ItemMensajeria({
  name,
  cant,
  fecha,
  cuerpo,
  tipo,
  setPreview,
  setIaFormState,
}: {
  name: string;
  cant: string;
  fecha: Date;
  cuerpo:string;
  tipo: string;
  setPreview:any;
  setIaFormState:any;
}) {

  const fechaFormateadaLong = formatDate(fecha,"es",{dateStyle:"full"});
  const fechaFormateadaShort = formatDate(fecha,"es",{weekday:"short", day:"numeric", month:"short"});

  return (
    <>
      <div
        className="border-gray-100 border-t  hover:rounded-lg dark:hover:bg-gray-600 p-2 hover:cursor-pointer hover:bg-gray-100"
        onClick={() => {
          
          setIaFormState(false);

          switch(tipo){
            case "1":
              setPreview({
                fecha:fechaFormateadaLong,
                cuerpo,
                tipo:"",
                title:name,
                subTitle:"Bienvenida"
              })
              
              break;
            case "2":
              setPreview({
                fecha:fechaFormateadaLong,
                cuerpo,
                tipo,
                title:name,
                subTitle:"Seguimiento"
              })
              break;

          }
         
        }}
      >
        <h3 className="font-bold capitalize text-2xl dark:text-white  pb-2">{name}</h3>
        <div className="flex flex-row justify-between text-sm font-light text-gray-700 gap-5">
          <p className="">{cant}</p>
          <p className="text-end ">{fechaFormateadaShort}</p>
        </div>
      </div>
    </>
  );
}
