"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PayoffScenario, generateAmortizationSchedule, LoanInputs } from "@/lib/calculations"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingDown } from "lucide-react"

interface PayoffGraphProps {
  scenarios: PayoffScenario[]
  inputs: LoanInputs
}

export function PayoffGraph({ scenarios, inputs }: PayoffGraphProps) {
  // Generate data points for the graph
  const generateGraphData = () => {
    const maxMonths = Math.max(...scenarios.map(s => s.timeline))
    const data: any[] = []

    // For each month, calculate remaining balance for each timeline
    for (let month = 0; month <= maxMonths; month++) {
      const dataPoint: any = { month }

      scenarios.forEach(scenario => {
        if (month <= scenario.timeline && scenario.negativeEquity > 0) {
          // Generate schedule for this scenario up to current month
          const schedule = generateAmortizationSchedule(
            scenario.negativeEquity,
            scenario.extraMonthlyPayment,
            inputs.annualInterestRate,
            scenario.timeline
          )

          if (month === 0) {
            dataPoint[`${scenario.timeline}mo`] = scenario.negativeEquity
          } else if (month <= schedule.length) {
            dataPoint[`${scenario.timeline}mo`] = schedule[month - 1]?.remainingBalance || 0
          } else {
            dataPoint[`${scenario.timeline}mo`] = 0
          }
        }
      })

      data.push(dataPoint)
    }

    return data
  }

  const graphData = generateGraphData()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const lineColors = {
    '6mo': '#ef4444',    // red
    '12mo': '#f59e0b',   // yellow/orange
    '18mo': '#10b981',   // green
    '24mo': '#3b82f6',   // blue
  }

  if (scenarios.length === 0 || scenarios[0].negativeEquity === 0) {
    return null
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-6 w-6" />
          Negative Equity Payoff Visualization
        </CardTitle>
        <CardDescription>
          Watch your negative equity decrease over time with different payment strategies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={graphData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
                stroke="#6b7280"
              />
              <YAxis 
                label={{ value: 'Remaining Balance', angle: -90, position: 'insideLeft' }}
                tickFormatter={formatCurrency}
                stroke="#6b7280"
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px'
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => {
                  const months = value.replace('mo', '')
                  return `${months} Month Plan`
                }}
              />
              {scenarios.map(scenario => (
                <Line
                  key={scenario.timeline}
                  type="monotone"
                  dataKey={`${scenario.timeline}mo`}
                  stroke={lineColors[`${scenario.timeline}mo` as keyof typeof lineColors]}
                  strokeWidth={3}
                  dot={false}
                  name={`${scenario.timeline}mo`}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>
            The graph shows how quickly your negative equity decreases with each payment plan.
            Steeper lines mean faster payoff but higher monthly payments.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

