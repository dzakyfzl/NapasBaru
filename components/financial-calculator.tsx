"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { DollarSign } from "lucide-react"

export function FinancialCalculator() {
  const [price, setPrice] = useState("")
  const [packsPerWeek, setPacksPerWeek] = useState("")
  const [result, setResult] = useState<{
    daily: number
    weekly: number
    monthly: number
    yearly: number
  } | null>(null)

  const calculateCosts = () => {
    const priceNum = Number.parseFloat(price)
    const packsNum = Number.parseFloat(packsPerWeek)

    if (isNaN(priceNum) || isNaN(packsNum)) return

    const daily = (priceNum * packsNum) / 7
    const weekly = priceNum * packsNum
    const monthly = weekly * 4.33
    const yearly = weekly * 52

    setResult({ daily, weekly, monthly, yearly })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <DollarSign className="h-5 w-5" />
          Kalkulator Finansial
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="price" className="text-white">
            Masukkan harga rokok anda:
          </Label>
          <Input
            id="price"
            type="number"
            placeholder="Contoh: 25000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="packs" className="text-white">
            Masukkan berapa bungkus rokok yang anda habiskan selama seminggu:
          </Label>
          <Input
            id="packs"
            type="number"
            placeholder="Contoh: 7"
            value={packsPerWeek}
            onChange={(e) => setPacksPerWeek(e.target.value)}
            className="mt-1"
          />
        </div>

        <Button onClick={calculateCosts} className="w-full">
          Hitung Pengeluaran
        </Button>

        {result && (
          <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-white mb-3">Hasil Perhitungan:</h3>
            <div className="space-y-2 text-white">
              <div className="flex justify-between">
                <span>Per Hari:</span>
                <span className="font-semibold">{formatCurrency(result.daily)}</span>
              </div>
              <div className="flex justify-between">
                <span>Per Minggu:</span>
                <span className="font-semibold">{formatCurrency(result.weekly)}</span>
              </div>
              <div className="flex justify-between">
                <span>Per Bulan:</span>
                <span className="font-semibold">{formatCurrency(result.monthly)}</span>
              </div>
              <div className="flex justify-between border-t border-white/20 pt-2">
                <span>Per Tahun:</span>
                <span className="font-bold text-lg">{formatCurrency(result.yearly)}</span>
              </div>
            </div>
            <p className="text-sm text-white/80 mt-3">💡 Bayangkan apa yang bisa Anda beli dengan uang sebesar itu!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
