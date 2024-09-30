"use server"
import { revalidatePath } from "next/cache"
import { toast } from "sonner"

export const revalidateFuntion = async (url: string) => {
  revalidatePath(url)
} 
