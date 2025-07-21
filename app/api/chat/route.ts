import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      // Return a mock response for demo
      const mockResponse = `Halo! Saya adalah asisten AI NapasBaru. 

Maaf, saat ini saya dalam mode demo karena API key belum dikonfigurasi. Namun dalam versi lengkap, saya dapat membantu Anda dengan:

• Informasi tentang bahaya merokok dan kesehatan paru-paru
• Tips dan strategi berhenti merokok  
• Motivasi dan dukungan untuk program berhenti merokok
• Penjelasan fitur-fitur platform NapasBaru
• Informasi tentang roadmap 6 tahap berhenti merokok

Untuk mengaktifkan AI chat penuh, silakan tambahkan OPENAI_API_KEY ke environment variables.`

      return new Response(mockResponse, {
        headers: {
          "Content-Type": "text/plain",
        },
      })
    }

    const result = await streamText({
      model: openai("gpt-4o"),
      system: `Anda adalah asisten AI untuk NapasBaru, platform edukasi kesehatan paru-paru dan program berhenti merokok. 

Tugas Anda:
- Memberikan informasi akurat tentang bahaya merokok dan kesehatan paru-paru
- Membantu pengguna dengan tips dan strategi berhenti merokok
- Memberikan motivasi dan dukungan untuk program berhenti merokok
- Menjelaskan fitur-fitur yang tersedia di platform NapasBaru
- Menjawab pertanyaan seputar kalkulator finansial rokok
- Memberikan informasi tentang roadmap program 6 tahap berhenti merokok

Gaya komunikasi:
- Ramah, supportif, dan empati
- Menggunakan bahasa Indonesia yang mudah dipahami
- Memberikan jawaban yang praktis dan actionable
- Selalu positif dan memotivasi

Jangan memberikan nasihat medis spesifik, selalu sarankan konsultasi dengan dokter untuk masalah kesehatan serius.`,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("AI Chat error:", error)

    // Return fallback response
    const fallbackResponse = `Maaf, terjadi kesalahan pada sistem AI. Dalam mode demo ini, saya tetap siap membantu Anda dengan informasi dasar tentang:

• Program berhenti merokok NapasBaru
• Tips kesehatan paru-paru
• Motivasi untuk hidup bebas rokok

Silakan coba lagi atau hubungi tim support kami.`

    return new Response(fallbackResponse, {
      headers: {
        "Content-Type": "text/plain",
      },
    })
  }
}
