import { EmailTemplate } from '@/components/email/email-template';
import { Resend } from 'resend';
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Polo-IT <onboarding@resend.dev>',
      to: ['espindolajavier2013@gmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'John' }),
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
    const { data, error } = await resend.emails.get("ee8c22ab-383b-4f5a-8e26-86ed7b9c15ac");

    //foreach para cuadar el contenido de lo que te trae la api luego enviar el arrar y de objetos.

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}