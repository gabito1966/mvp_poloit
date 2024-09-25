import { EmailTemplate } from '@/components/email/email-template';
import { Resend } from 'resend';
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {

  const {bodyEmail, tipo} = (await request.json());

//nombre del grupo en el subject
//necesito a los grupos, con sus integrantes para enviar los emails , tengo que enviar cada 

  try {
    const { data, error } = await resend.emails.send({
      from: 'Polo-IT <onboarding@resend.dev>',
      to: ['espindolajavier2013@gmail.com' ],
      subject: `Acelerador Polo IT - `,
      react: EmailTemplate({ firstName: 'John', content:bodyEmail }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}


export async function GET() {
    //crear un array con para agregale elcontenido de los mensajes y a quien se le envio, po lo menos uno de cada uno supongo talvez de los mentores guardar en la base de datos.

  try {
    // const { data, error } = await resend.emails.get("ee8c22ab-383b-4f5a-8e26-86ed7b9c15ac");
    // const { data, error } = await resend.emails.get("6e00a12c-d127-49c1-91b2-41d6af462a11");
    const { data, error } = await resend.emails.get("1b4a6a3b-ad3f-40ed-80ac-3ed3e36fec34");
    //foreach para cuadar el contenido de lo que te trae la api luego enviar el arrar y de objetos.
    
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  
  try {
    //
    const { data, error } = await resend.delete("ee8c22ab-383b-4f5a-8e26-86ed7b9c15ac");//ver esto de delete
    //foreach para cuadar el contenido de lo que te trae la api luego enviar el arrar y de objetos.
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}