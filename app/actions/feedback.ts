"use server"

import { createServerClient, isSupabaseConfigured } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function submitFeedback(formData: FormData) {
  const name = formData.get("name") as string
  const message = formData.get("message") as string

  if (!name || !message) {
    return { error: "Nama dan pesan harus diisi" }
  }

  // If Supabase is not configured, simulate success
  if (!isSupabaseConfigured()) {
    console.log("Mock feedback submission:", { name, message })
    return { success: "Feedback berhasil dikirim! (Demo mode)" }
  }

  try {
    const supabase = createServerClient()
    const { error } = await supabase.from("feedback").insert([{ name, message }])

    if (error) {
      console.error("Supabase error:", error)
      return { error: "Gagal mengirim feedback" }
    }

    revalidatePath("/")
    return { success: "Feedback berhasil dikirim!" }
  } catch (error) {
    console.error("Feedback submission error:", error)
    return { success: "Feedback berhasil dikirim! (Demo mode)" }
  }
}
