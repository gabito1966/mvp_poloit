"use server"
import { revalidatePath } from "next/cache"

export const revalidateFuntion = async (url: string) => {
  revalidatePath(url)
} 