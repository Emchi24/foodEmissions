"use client"

import { useState } from "react"
import { EmissionsForm } from "@/components/emissions-form"
import { EmissionsResults } from "@/components/emissions-results"
import { calcNewEmission } from "@/lib/calc-emissions"

export default function EmissionsCalculator() {
  const [groceriesEmissions, setGroceriesEmissions] = useState([])
  const [tofuComparison, setTofuComparison] = useState(0)
  const [loading, setLoading] = useState(false)
  const [beefAmount, setBeefAmount] = useState(0)

  const foodEmissions = {
    Beef: 99.48,
    "Lamb and Mutton": 39.72,
    Coffee: 28.53,
    Cheese: 23.33,
    "Fish (farmed)": 13.63,
    Pork: 12.31,
    Poultry: 9.87,
    Tofu: 3.16,
  }

  function handleSubmit(formData) {
    setLoading(true)

    let beefConsumption = Number.parseFloat(formData.beefConsumption)
    const unity = formData.unity

    if (unity === "g") {
      beefConsumption = beefConsumption / 1000
    }

    setBeefAmount(beefConsumption)

    const newEmissions = []
    for (const [food, value] of Object.entries(foodEmissions)) {
      const emission = calcNewEmission(beefConsumption, value, food)
      newEmissions.push(emission)
    }

    const tofuComp = newEmissions[0].Emission - newEmissions[7].Emission
    setTofuComparison(tofuComp)
    setGroceriesEmissions(newEmissions)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <div className="container max-w-4xl px-4 py-8 mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Food Emissions Calculator</h1>
            <p className="text-muted-foreground">Measure how many greenhouse gases your beef consumption causes each week</p>
          </div>
        </header>

        <div className="grid gap-8">
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">How much beef do you eat in a week?</h2>
            <p className="text-muted-foreground mb-6">
              This application calculates the greenhouse gas emissions from your weekly beef consumption and compares
              them to the emissions from other foods. After entering your consumption amount, the app calculates the
              emissions and displays the results in a chart. If you are accessing this website from a mobile device,
              please switch to landscape mode.
            </p>

            <EmissionsForm onSubmit={handleSubmit} loading={loading} />

            <div className="mt-4 text-sm text-muted-foreground">
              <a
                href="https://github.com/Emchi24/foodEmissions"
                className="inline-flex items-center hover:underline text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                View source code on GitHub
              </a>
            </div>
            <div>
            <a
                href="https://www.dw.com/de/faktencheck-wie-sch%C3%A4dlich-f%C3%BCr-das-klima-ist-der-verzehr-von-fleisch-wirklich/a-63252828"
                className="inline-flex items-center hover:underline text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >The informations on greenhouse gas emissions from food comes from this source</a>
            </div>
          </div>

          {groceriesEmissions.length > 0 && (
            <EmissionsResults
              groceriesEmissions={groceriesEmissions}
              tofuComparison={tofuComparison}
              beefAmount={beefAmount}
            />
          )}
        </div>
      </div>
    </div>
  )
}

