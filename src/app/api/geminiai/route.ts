import { generarCuerpoEmailGemini } from "@/lib/utils";
import { NextResponse } from "next/server";


export async function POST(request:Request) {
    const {content} = (await request.json()) ;

    try {
        const message = await generarCuerpoEmailGemini("nicolas espindola","polo it", "presentacion","presentacion de un proyecto web");
        
        return NextResponse.json({message}, {status:200});
    } catch (error) {
        
        return NextResponse.json({error:"error al conectarme con la IA"}, {status:500});
    }

}



