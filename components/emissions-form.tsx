"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface EmissionsFormProps {
  onSubmit: (data: { beefConsumption: number; unity: string }) => void
  loading: boolean
}

export function EmissionsForm({ onSubmit, loading }: EmissionsFormProps) {
  const [beefConsumption, setBeefConsumption] = useState("")
  const [unity, setUnity] = useState("kg")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!beefConsumption || isNaN(Number.parseFloat(beefConsumption)) || Number.parseFloat(beefConsumption) <= 0) {
      setError("Please enter a valid amount greater than 0")
      return
    }

    setError("")
    onSubmit({
      beefConsumption: Number.parseFloat(beefConsumption),
      unity,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="beef-consumption">Weekly beef consumption</Label>
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              id="beef-consumption"
              type="number"
              step="0.001"
              min="0"
              placeholder="Enter amount"
              value={beefConsumption}
              onChange={(e) => setBeefConsumption(e.target.value)}
              className="w-full"
            />
            {error && <p className="text-sm text-destructive mt-1">{error}</p>}
          </div>
          <Select value={unity} onValueChange={setUnity}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">kg</SelectItem>
              <SelectItem value="g">g</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Calculating...
          </>
        ) : (
          "Calculate Emissions"
        )}
      </Button>
    </form>
  )
}

