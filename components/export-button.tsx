"use client"

import { Button } from "@/components/ui/button"
import { PayoffScenario, LoanInputs, formatCurrency, formatPercentage } from "@/lib/calculations"
import { Download } from "lucide-react"

interface ExportButtonProps {
  scenarios: PayoffScenario[]
  inputs: LoanInputs
}

export function ExportButton({ scenarios, inputs }: ExportButtonProps) {
  const exportToCSV = () => {
    // Create CSV header
    const headers = [
      'Timeline (Months)',
      'Negative Equity',
      'Extra Monthly Payment',
      'Total Monthly Payment',
      'Total Amount Paid',
      'Total Interest Paid',
      'Strategy Note'
    ]

    // Create CSV rows
    const rows = scenarios.map(scenario => [
      scenario.timeline,
      scenario.negativeEquity.toFixed(2),
      scenario.extraMonthlyPayment.toFixed(2),
      scenario.totalMonthlyPayment.toFixed(2),
      scenario.totalPaid.toFixed(2),
      scenario.totalInterestPaid.toFixed(2),
      scenario.note
    ])

    // Add input summary at the top
    const summaryRows = [
      ['Negative Equity Payment Calculator - Export'],
      ['Generated on:', new Date().toLocaleString()],
      [''],
      ['Input Summary:'],
      ['Remaining Loan Balance:', inputs.remainingBalance.toFixed(2)],
      ['Vehicle Estimated Value:', inputs.vehicleValue.toFixed(2)],
      ['Current Monthly Payment:', inputs.currentMonthlyPayment.toFixed(2)],
      ['Annual Interest Rate:', inputs.annualInterestRate.toFixed(2) + '%'],
      [''],
      ['Payoff Scenarios:'],
      headers
    ]

    // Combine all rows
    const allRows = [...summaryRows, ...rows]

    // Convert to CSV string
    const csvContent = allRows
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    const timestamp = new Date().toISOString().split('T')[0]
    link.setAttribute('href', url)
    link.setAttribute('download', `negative-equity-scenarios-${timestamp}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (scenarios.length === 0 || scenarios[0].negativeEquity === 0) {
    return null
  }

  return (
    <Button 
      onClick={exportToCSV}
      variant="outline"
      className="w-full sm:w-auto"
    >
      <Download className="mr-2 h-4 w-4" />
      Export to CSV
    </Button>
  )
}

