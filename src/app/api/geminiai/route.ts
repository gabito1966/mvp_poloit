import { createResponse, generarCuerpoEmailGemini } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    const { tipo, mensaje} = (await request.json()) ;
    console.log(tipo,mensaje)

    try {
        // const message = await generarCuerpoEmailGemini(tipo, content);
        const message = await generarCuerpoEmailGemini(tipo, mensaje);
        
        return NextResponse.json(
            createResponse(true,[{message}],"Email Generado con IA correctamente")
            , {status:200});
    } catch (error) {
        
        return NextResponse.json({error:"error al conectarme con la IA"}, {status:500});
    }

}
