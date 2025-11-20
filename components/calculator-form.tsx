"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Info } from "lucide-react"
import { LoanInputs } from "@/lib/calculations"

interface CalculatorFormProps {
  onInputsChange: (inputs: LoanInputs) => void
}

export function CalculatorForm({ onInputsChange }: CalculatorFormProps) {
  const [inputs, setInputs] = useState<LoanInputs>({
    remainingBalance: 30000,
    vehicleValue: 20800,
    currentMonthlyPayment: 763,
    annualInterestRate: 6.5,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [noteExpanded, setNoteExpanded] = useState<string | undefined>(undefined)

  const handleInputChange = (field: keyof LoanInputs, value: string) => {
    const numValue = parseFloat(value) || 0
    const newInputs = { ...inputs, [field]: numValue }
    setInputs(newInputs)

    // Clear error for this field
    const newErrors = { ...errors }
    delete newErrors[field]
    setErrors(newErrors)

    // Validate and propagate changes
    if (numValue > 0 || field === 'annualInterestRate') {
      onInputsChange(newInputs)
    }
  }

  const formatInputValue = (value: number) => {
    return value === 0 ? '' : value.toString()
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Loan Details</CardTitle>
          <CardDescription>
            Enter your current vehicle loan information to calculate payoff scenarios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="remainingBalance">
              Remaining Loan Balance
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Information about remaining loan balance"
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent style={{ zIndex: 9999, backgroundColor: 'white', borderColor: '#e5e7eb' }}>
                <p id="remainingBalance-desc">Total principal remaining on your current vehicle loan</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="remainingBalance"
              type="number"
              min="0"
              step="100"
              placeholder="30000"
              value={formatInputValue(inputs.remainingBalance)}
              onChange={(e) => handleInputChange('remainingBalance', e.target.value)}
              className="pl-7"
              aria-describedby="remainingBalance-desc"
            />
          </div>
          {errors.remainingBalance && (
            <p className="text-sm text-red-500">{errors.remainingBalance}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="vehicleValue">
              Vehicle Estimated Value
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Information about vehicle estimated value"
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent style={{ zIndex: 9999, backgroundColor: 'white', borderColor: '#e5e7eb' }}>
                <p id="vehicleValue-desc">Current trade-in or private sale value of your vehicle</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="vehicleValue"
              type="number"
              min="0"
              step="100"
              placeholder="20800"
              value={formatInputValue(inputs.vehicleValue)}
              onChange={(e) => handleInputChange('vehicleValue', e.target.value)}
              className="pl-7"
              aria-describedby="vehicleValue-desc"
            />
          </div>
          {errors.vehicleValue && (
            <p className="text-sm text-red-500">{errors.vehicleValue}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="currentMonthlyPayment">
              Current Monthly Payment
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Information about current monthly payment"
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent style={{ zIndex: 9999, backgroundColor: 'white', borderColor: '#e5e7eb' }}>
                <p id="currentMonthlyPayment-desc">Your existing loan payment that covers interest and principal</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="currentMonthlyPayment"
              type="number"
              min="0"
              step="10"
              placeholder="763"
              value={formatInputValue(inputs.currentMonthlyPayment)}
              onChange={(e) => handleInputChange('currentMonthlyPayment', e.target.value)}
              className="pl-7"
              aria-describedby="currentMonthlyPayment-desc"
            />
          </div>
          {errors.currentMonthlyPayment && (
            <p className="text-sm text-red-500">{errors.currentMonthlyPayment}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="annualInterestRate">
              Annual Interest Rate
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Information about annual interest rate"
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent style={{ zIndex: 9999, backgroundColor: 'white', borderColor: '#e5e7eb' }}>
                <p id="annualInterestRate-desc">Annual interest rate on your current loan (required for accurate calculations)</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="relative">
            <Input
              id="annualInterestRate"
              type="number"
              min="0"
              max="50"
              step="0.1"
              placeholder="6.5"
              value={formatInputValue(inputs.annualInterestRate)}
              onChange={(e) => handleInputChange('annualInterestRate', e.target.value)}
              className="pr-8"
              aria-describedby="annualInterestRate-desc"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
          </div>
          {errors.annualInterestRate && (
            <p className="text-sm text-red-500">{errors.annualInterestRate}</p>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
          <p>
            <strong>Note:</strong> These calculations use standard loan amortization formulas and{!noteExpanded && "..."}{!noteExpanded && " "}{!noteExpanded && <a onClick={() => setNoteExpanded("note")} className="text-blue-700 hover:text-blue-900 cursor-pointer whitespace-nowrap">[more]</a>}{noteExpanded && " assume extra payments are applied directly to principal. Actual results may vary based on your lender's specific terms and conditions. "}{noteExpanded && <a onClick={() => setNoteExpanded(undefined)} className="text-blue-700 hover:text-blue-900 cursor-pointer whitespace-nowrap">[less]</a>}
          </p>
        </div>
      </CardContent>
    </Card>
    </TooltipProvider>
  )
}

