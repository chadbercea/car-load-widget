"use client"

import { useState } from "react"
import { CalculatorForm } from "@/components/calculator-form"
import { ResultsTable } from "@/components/results-table"
import { PayoffGraph } from "@/components/payoff-graph"
import { ExportButton } from "@/components/export-button"
import { LoanInputs, calculateAllScenarios, calculateNegativeEquity } from "@/lib/calculations"

export default function Home() {
  const [inputs, setInputs] = useState<LoanInputs>({
    remainingBalance: 30000,
    vehicleValue: 20800,
    currentMonthlyPayment: 763,
    annualInterestRate: 6.5,
  })

  const scenarios = calculateAllScenarios(inputs)
  const negativeEquity = calculateNegativeEquity(inputs.remainingBalance, inputs.vehicleValue)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Negative Equity Payment Calculator
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Calculate monthly payments needed to eliminate negative equity on your vehicle loan
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <CalculatorForm onInputsChange={setInputs} />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <ResultsTable scenarios={scenarios} negativeEquity={negativeEquity} />
            
            {negativeEquity > 0 && (
              <>
                <PayoffGraph scenarios={scenarios} inputs={inputs} />
                
                <div className="flex justify-center">
                  <ExportButton scenarios={scenarios} inputs={inputs} />
                </div>
              </>
            )}
          </div>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500 border-t pt-8">
          <p className="mb-2">
            <strong>Disclaimer:</strong> This calculator provides estimates based on standard loan
            amortization formulas. Actual results may vary based on your lender's specific terms,
            conditions, and how they apply extra payments. Always consult with your lender for
            exact payoff amounts and requirements.
          </p>
          <p>
            Built with Next.js • Open Source on GitHub
          </p>
        </footer>
      </div>
    </main>
  )
}

