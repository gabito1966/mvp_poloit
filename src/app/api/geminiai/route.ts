import { generarCuerpoEmailGemini } from "@/lib/utils";
import { NextResponse } from "next/server";
import { boolean } from "zod";


export async function POST(request:Request) {
    const { tipo, content} = (await request.json()) ;

    try {
        // const message = await generarCuerpoEmailGemini(tipo, content);
        const message = await generarCuerpoEmailGemini(tipo, content);
        
        return NextResponse.json({message}, {status:200});
    } catch (error) {
        
        return NextResponse.json({error:"error al conectarme con la IA"}, {status:500});
    }

}



