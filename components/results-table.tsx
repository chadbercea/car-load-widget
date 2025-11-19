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
import { PayoffScenario, formatCurrency } from "@/lib/calculations"
import { AlertCircle, CheckCircle2, TrendingDown } from "lucide-react"

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

  const getRowColor = (timeline: number) => {
    if (timeline <= 6) return "bg-red-50 hover:bg-red-100"
    if (timeline <= 12) return "bg-yellow-50 hover:bg-yellow-100"
    return "bg-green-50 hover:bg-green-100"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-6 w-6" />
          Payoff Scenarios
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
                <TableHead className="w-[100px]">Timeline</TableHead>
                <TableHead className="text-right">Extra Payment</TableHead>
                <TableHead className="text-right">Total Monthly</TableHead>
                <TableHead className="text-right">Total Paid</TableHead>
                <TableHead className="text-right">Interest</TableHead>
                <TableHead>Strategy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scenarios.map((scenario) => (
                <TableRow key={scenario.timeline} className={getRowColor(scenario.timeline)}>
                  <TableCell className="font-medium">
                    {scenario.timeline} {scenario.timeline === 1 ? 'month' : 'months'}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(scenario.extraMonthlyPayment)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-lg">
                    {formatCurrency(scenario.totalMonthlyPayment)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(scenario.totalPaid)}
                  </TableCell>
                  <TableCell className="text-right text-sm text-gray-600">
                    {formatCurrency(scenario.totalInterestPaid)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {scenario.note}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="font-semibold text-red-900">Aggressive (6 months)</span>
              </div>
              <p className="text-sm text-red-800">
                Highest monthly payment but fastest payoff with least interest
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-semibold text-yellow-900">Moderate (12 months)</span>
              </div>
              <p className="text-sm text-yellow-800">
                Balanced approach with manageable monthly payments
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-semibold text-green-900">Conservative (18-24 months)</span>
              </div>
              <p className="text-sm text-green-800">
                Lower monthly burden but more interest paid over time
              </p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-1">How to use these numbers:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong>Extra Payment:</strong> Additional amount beyond your current monthly payment</li>
                  <li><strong>Total Monthly:</strong> What you'll actually pay each month (current + extra)</li>
                  <li><strong>Total Paid:</strong> Total amount you'll pay over the entire timeline</li>
                  <li><strong>Interest:</strong> Additional cost due to loan interest on the negative equity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

