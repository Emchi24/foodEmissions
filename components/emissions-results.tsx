"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { motion } from "framer-motion"

interface EmissionItem {
  groceries: string
  Emission: number
}

interface EmissionsResultsProps {
  groceriesEmissions: EmissionItem[]
  tofuComparison: number
  beefAmount: number
}

export function EmissionsResults({ groceriesEmissions, tofuComparison, beefAmount }: EmissionsResultsProps) {
  const [chartData, setChartData] = useState<EmissionItem[]>([])

  // Sort data by emission value (descending)
  useEffect(() => {
    const sortedData = [...groceriesEmissions].sort((a, b) => b.Emission - a.Emission)
    setChartData(sortedData)
  }, [groceriesEmissions])

  const colors = [
    "#ef4444", // red for beef (highest emissions)
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#14b8a6", // teal for tofu (lowest emissions)
  ]

  const formatNumber = (num: number) => {
    return num.toFixed(2)
  }

  const beefEmission = groceriesEmissions.find((item) => item.groceries === "Beef")?.Emission || 0
  const tofuEmission = groceriesEmissions.find((item) => item.groceries === "Tofu")?.Emission || 0

  const treesEquivalent = Math.round((tofuComparison * 52) / 21) // Rough estimate: 1 tree absorbs ~21kg CO2 per year

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <CardTitle>Your Emissions Results</CardTitle>
          <CardDescription>Based on your weekly beef consumption of {formatNumber(beefAmount)} kg</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-4 rounded-lg bg-destructive/10 border border-destructive/20"
            >
              <h3 className="text-xl font-semibold mb-2">
                Your beef consumption emits{" "}
                <span className="text-destructive font-bold">{formatNumber(beefEmission)} kg</span> of greenhouse gases
                weekly
              </h3>
            </motion.div>

            <div className="pt-4">
              <h3 className="text-lg font-medium mb-4">Greenhouse gases emissions comparison by food type</h3>
              <div className="h-[400px] w-full">
                <ChartContainer
                  config={{
                    emissions: {
                      label: "Emissions (kg CO₂)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="groceries" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                      <YAxis
                        label={{
                          value: "Greenhouse Gas Emissions (kg)",
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: "middle" },
                        }}
                      />
                      <ChartTooltip
                        content={<ChartTooltipContent formatValue={(value) => `${formatNumber(value)} kg CO₂e`} />}
                      />
                      <Bar dataKey="Emission" name="Emissions" animationDuration={1500}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="p-4 rounded-lg bg-primary/10 border border-primary/20"
            >
              <h3 className="text-xl font-semibold mb-2">
                Switching to tofu would reduce your emissions by{" "}
                <span className="text-primary font-bold">{formatNumber(tofuComparison)} kg</span> weekly
              </h3>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

