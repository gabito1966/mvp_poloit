import { createResponse, generarCuerpoEmailGemini } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    const { tipo, mensaje}:{tipo:string, mensaje:string} = (await request.json()) ;
    console.log(tipo);
    console.log(typeof tipo);
    try {
        const message = await generarCuerpoEmailGemini(tipo, mensaje);
        
        return NextResponse.json(
            createResponse(true,[{message}],"Email Generado con IA correctamente")
            , {status:200});
    } catch (error) {
        
        return NextResponse.json({error:"error al conectarme con la IA"}, {status:500});
    }

}
