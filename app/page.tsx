"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SmokingBarChart, DeathCausePieChart } from "@/components/charts/smoking-statistics"
import { FinancialCalculator } from "@/components/financial-calculator"
import { AIChat } from "@/components/ai-chat"
import { submitFeedback } from "@/app/actions/feedback"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"
import { Cigarette, Users, Trash2, Search, MessageCircle } from "lucide-react"
import { isSupabaseConfigured, mockUser } from "@/lib/supabase"

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      // Use mock user when Supabase is not configured
      setUser(mockUser as any)
      return
    }

    // Get initial user
    supabase.auth
      .getUser()
      .then(({ data: { user } }) => {
        setUser(user)
      })
      .catch((error) => {
        console.warn("Supabase auth error:", error)
        setUser(mockUser as any)
      })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    if (!isSupabaseConfigured()) {
      setUser(null)
      return
    }
    await supabase.auth.signOut()
  }

  const handleFeedbackSubmit = async (formData: FormData) => {
    const result = await submitFeedback(formData)
    if (result.success) {
      setFeedbackMessage(result.success)
      // Reset form
      const form = document.getElementById("feedback-form") as HTMLFormElement
      form?.reset()
    } else if (result.error) {
      setFeedbackMessage(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Cigarette className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-blue-600">NapasBaru</span>
              </div>
              <nav className="hidden md:flex space-x-6">
                <Link href="/" className="text-gray-700 hover:text-blue-600">
                  Beranda
                </Link>
                <Link href="#kalkulator" className="text-gray-700 hover:text-blue-600">
                  Kalkulator
                </Link>
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="text-gray-700 hover:text-blue-600 flex items-center gap-1"
                >
                  <MessageCircle className="h-4 w-4" />
                  AI
                </button>
                <Link href="#tentang" className="text-gray-700 hover:text-blue-600">
                  Tentang
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">Halo, {user.user_metadata?.full_name || user.email}</span>
                  <Button variant="outline" onClick={handleSignOut}>
                    Keluar
                  </Button>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/login">
                    <Button>Log In</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-white mb-6">NapasBaru</h1>
              <p className="text-2xl text-white mb-4">
                Pahami Dampaknya,
                <br />
                Rasakan Bedanya.
              </p>
              <p className="text-white/90 mb-8">
                Made By <span className="font-semibold">TRIOBLEMAKER</span>
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Mulai Perjalanan Anda
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 relative">
                <Image
                  src="/placeholder.svg?height=320&width=320"
                  alt="Ilustrasi Paru-paru"
                  width={320}
                  height={320}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Terkini Section */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Search className="h-8 w-8 text-white" />
            <h2 className="text-4xl font-bold text-white">Data Terkini</h2>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-red-500 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Cigarette className="h-6 w-6" />
                  <span className="text-sm">Tingkat kematian akibat rokok (2021)</span>
                </div>
                <div className="text-3xl font-bold">268.600 jiwa</div>
              </CardContent>
            </Card>

            <Card className="bg-purple-500 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Jumlah perokok dewasa (15+) (2022)</span>
                </div>
                <div className="text-3xl font-bold">76,7 juta orang</div>
              </CardContent>
            </Card>

            <Card className="bg-orange-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Trash2 className="h-6 w-6" />
                  <span className="text-sm">Sampah puntung rokok per tahun</span>
                </div>
                <div className="text-3xl font-bold">56.497 ton</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Statistik Perokok Dewasa di Indonesia (15+)</h3>
                <div className="h-64">
                  <SmokingBarChart />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Kematian Terkait Rokok di Indonesia (Per Tahun)</h3>
                <div className="h-64">
                  <DeathCausePieChart />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gradient-to-br from-blue-300 to-blue-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-purple-600 mb-12">🦄 TRIOBLEMAKER</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">😊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">M. Dzaky Fazil</h3>
              <p className="text-gray-600">S1 Informatika</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">😎</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">M Abdillah Hafizh</h3>
              <p className="text-gray-600">S1 Informatika</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">😟</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Astrid Fayyaza Danishara</h3>
              <p className="text-gray-600">D3 RPLA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="bg-gradient-to-br from-blue-400 to-blue-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">Feedback 👍</h2>

              <form id="feedback-form" action={handleFeedbackSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-white">
                    Masukkan nama anda:
                  </Label>
                  <Input id="name" name="name" type="text" required className="mt-2" placeholder="Nama lengkap Anda" />
                </div>

                <div>
                  <Label htmlFor="message" className="text-white">
                    Masukkan saran/kritik/pesan:
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    className="mt-2 min-h-[120px]"
                    placeholder="Bagikan feedback Anda untuk membantu kami berkembang..."
                  />
                </div>

                <Button type="submit" className="bg-white text-blue-600 hover:bg-gray-100">
                  Kirim Feedback
                </Button>
              </form>

              {feedbackMessage && (
                <div
                  className={`mt-4 p-3 rounded-md ${
                    feedbackMessage.includes("berhasil")
                      ? "bg-green-500/20 text-white border border-green-400"
                      : "bg-red-500/20 text-white border border-red-400"
                  }`}
                >
                  {feedbackMessage}
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <div className="w-80 h-80">
                <Image
                  src="/placeholder.svg?height=320&width=320"
                  alt="Rocket Illustration"
                  width={320}
                  height={320}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="bg-gradient-to-br from-blue-300 to-blue-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-blue-600 mb-8 flex items-center gap-3">Roadmap 🚩</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">TAHAP 1: PERSIAPAN MENTAL & PEMAHAMAN</h3>
                    <p className="text-gray-700 text-sm">
                      Fokus: Mengidentifikasi alasan kuat Anda untuk berhenti dan memahami kebiasaan merokok Anda. Tahap
                      ini juga mencakup penetapan "Hari Berhenti Merokok" sebagai target utama Anda.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">TAHAP 2: PERSIAPAN FISIK & LINGKUNGAN</h3>
                    <p className="text-gray-700 text-sm">
                      Fokus: Mempersiapkan lingkungan Anda agar bebas dari pemicu rokok. Anda juga akan menyiapkan
                      alternatif sehat untuk mengganti kebiasaan merokok.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">TAHAP 3: HARI BERHENTI MEROKOK (HARI H)</h3>
                    <p className="text-gray-700 text-sm">
                      Fokus: Hari ini adalah komitmen total untuk tidak merokok selamanya. Anda akan langsung
                      menghentikan dan mengatasi gejala putus nikotin serta memantau fitur kalkulator finansial akan
                      membantu Anda melihat penghematan.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">TAHAP 4: MINGGU PERTAMA TANPA ROKOK</h3>
                    <p className="text-gray-700 text-sm">
                      Fokus: Melewati minggu krusial pertama dengan memantau kemajuan fisik, dan memberikan apresiasi
                      kecil pada diri sendiri. Fitur kalkulator finansial akan membantu Anda melihat penghematan.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">5</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">TAHAP 5: BULAN PERTAMA</h3>
                    <p className="text-gray-700 text-sm">
                      Fokus: Membangun kebiasaan baru yang positif dan sehat untuk mengganti rutinitas merokok lama
                      Anda. Tahap ini juga melibatkan refleksi atas kemajuan dan berbagi pengalaman melalui fitur
                      feedback.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">6</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">TAHAP 6: MENJAGA KONSISTENSI</h3>
                    <p className="text-gray-700 text-sm">
                      Fokus: Memastikan keberlanjutan Anda sebagai non-perokok dalam jangka panjang. Anda akan belajar
                      untuk tetap waspada terhadap kekambuhan, berbagi kisah sukses di fitur testimoni, dan terus
                      memantau NapasBaru sebagai pendamping setia.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div className="w-80 h-80">
                <Image
                  src="/placeholder.svg?height=320&width=320"
                  alt="Calendar Illustration"
                  width={320}
                  height={320}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Calculator Section */}
      <section id="kalkulator" className="bg-gradient-to-br from-blue-400 to-blue-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <FinancialCalculator />
            </div>

            <div className="flex justify-center">
              <div className="w-80 h-80">
                <Image
                  src="/placeholder.svg?height=320&width=320"
                  alt="Money Safe Illustration"
                  width={320}
                  height={320}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Testimoni</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <span className="font-semibold">Memet</span>
                </div>
                <p className="text-gray-700 text-sm">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <span className="font-semibold">Memet</span>
                </div>
                <p className="text-gray-700 text-sm">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <span className="font-semibold">Memet</span>
                </div>
                <p className="text-gray-700 text-sm">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white">Trioblemaker</p>
        </div>
      </footer>

      {/* AI Chat Component */}
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}
