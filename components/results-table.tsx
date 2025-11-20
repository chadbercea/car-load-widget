"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PayoffScenario, formatCurrency } from "@/lib/calculations"
import { CheckCircle2, TrendingDown, Info } from "lucide-react"

interface ResultsTableProps {
  scenarios: PayoffScenario[]
  negativeEquity: number
}

export function ResultsTable({ scenarios, negativeEquity }: ResultsTableProps) {
  if (negativeEquity === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-6 w-6" />
            Great News!
          </CardTitle>
          <CardDescription>
            You have no negative equity - your vehicle value exceeds your loan balance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <p className="text-lg text-green-900">
              Your vehicle is worth more than what you owe. You can trade or sell without needing extra payments!
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getChipColor = (timeline: number) => {
    if (timeline <= 6) return "bg-green-100 text-green-800 border-green-300"
    if (timeline <= 12) return "bg-orange-100 text-orange-800 border-orange-300"
    return "bg-red-100 text-red-800 border-red-300"
  }

  const getStrategyLabel = (timeline: number) => {
    if (timeline <= 6) return "Aggressive"
    if (timeline <= 12) return "Moderate"
    return "Conservative"
  }

  return (
    <TooltipProvider>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-6 w-6" />
            Payoff Scenarios
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
                  aria-label="How to use these numbers"
                >
                  <Info className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent style={{ zIndex: 9999, backgroundColor: 'white', borderColor: '#e5e7eb' }}>
                <p className="font-semibold mb-2">How to use these numbers:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Extra Payment:</strong> Additional amount beyond your current monthly payment</li>
                  <li><strong>Total Monthly:</strong> What you'll actually pay each month (current + extra)</li>
                  <li><strong>Total Paid:</strong> Total amount you'll pay over the entire timeline</li>
                  <li><strong>Interest:</strong> Additional cost due to loan interest on the negative equity</li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </CardTitle>
          <CardDescription>
            Compare different timelines to eliminate your negative equity of{" "}
            <span className="font-semibold text-red-600">{formatCurrency(negativeEquity)}</span>
          </CardDescription>
        </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Timeline</TableHead>
                <TableHead className="text-right whitespace-nowrap">Extra Payment</TableHead>
                <TableHead className="text-right whitespace-nowrap">Total Monthly</TableHead>
                <TableHead className="text-right whitespace-nowrap">Total Paid</TableHead>
                <TableHead className="text-right whitespace-nowrap">Interest</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scenarios.map((scenario) => (
                <TableRow key={scenario.timeline}>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{scenario.timeline} months</span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getChipColor(scenario.timeline)}`}>
                        {getStrategyLabel(scenario.timeline)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold whitespace-nowrap">
                    {formatCurrency(scenario.extraMonthlyPayment)}
                  </TableCell>
                  <TableCell className="text-right font-semibold whitespace-nowrap">
                    {formatCurrency(scenario.totalMonthlyPayment)}
                  </TableCell>
                  <TableCell className="text-right font-semibold whitespace-nowrap">
                    {formatCurrency(scenario.totalPaid)}
                  </TableCell>
                  <TableCell className="text-right font-semibold whitespace-nowrap">
                    {formatCurrency(scenario.totalInterestPaid)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
    </TooltipProvider>
  )
}

