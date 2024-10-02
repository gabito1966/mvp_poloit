
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
    cookies().delete("user");
    const session = cookies().get("session");
    if (session) {
        try {
            await sql`DELETE FROM sesiones WHERE id = ${session.value.split("#")[0]}`;
        } catch (error) {
            console.log("error en la base de datos", error);
        }
    }
    cookies().delete("session");
    redirect("/auth/login");
}

export  function singIn(){

    return cookies().get("session")?true:false;

}