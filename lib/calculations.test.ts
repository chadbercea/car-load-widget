/**
 * Unit tests for calculation engine
 * 
 * Run with: npx tsx lib/calculations.test.ts
 */

import {
  calculateNegativeEquity,
  calculateMonthlyPayment,
  calculatePayoffScenario,
  calculateAllScenarios,
  validateInputs,
  formatCurrency,
  LoanInputs,
} from './calculations'

// Simple test framework
function assertEquals(actual: number, expected: number, tolerance: number = 0.01, message: string = '') {
  const diff = Math.abs(actual - expected)
  if (diff > tolerance) {
    console.error(`❌ FAILED: ${message}`)
    console.error(`   Expected: ${expected}`)
    console.error(`   Actual: ${actual}`)
    console.error(`   Difference: ${diff}`)
    return false
  }
  console.log(`✅ PASSED: ${message}`)
  return true
}

function assertTruthy(value: any, message: string = '') {
  if (!value) {
    console.error(`❌ FAILED: ${message}`)
    return false
  }
  console.log(`✅ PASSED: ${message}`)
  return true
}

console.log('🧪 Running Calculation Tests\n')

// Test 1: Negative Equity Calculation
console.log('Test Suite: Negative Equity')
assertEquals(
  calculateNegativeEquity(30000, 20800),
  9200,
  0.01,
  'Should calculate negative equity correctly'
)

assertEquals(
  calculateNegativeEquity(15000, 18000),
  0,
  0.01,
  'Should return 0 when no negative equity exists'
)

// Test 2: Monthly Payment Calculation
console.log('\nTest Suite: Monthly Payment')
const payment12Months = calculateMonthlyPayment(9200, 6.5, 12)
console.log(`   12-month payment for $9,200 at 6.5% APR: ${formatCurrency(payment12Months)}`)
assertTruthy(
  payment12Months > 790 && payment12Months < 795,
  'Should calculate 12-month payment within expected range (~$791)'
)

const payment6Months = calculateMonthlyPayment(9200, 6.5, 6)
console.log(`   6-month payment for $9,200 at 6.5% APR: ${formatCurrency(payment6Months)}`)
assertTruthy(
  payment6Months > 1560 && payment6Months < 1570,
  'Should calculate 6-month payment within expected range (~$1,564)'
)

// Test 3: Zero Interest
const paymentNoInterest = calculateMonthlyPayment(9200, 0, 12)
assertEquals(
  paymentNoInterest,
  9200 / 12,
  0.01,
  'Should calculate simple division when interest is 0%'
)

// Test 4: Full Scenario Calculation
console.log('\nTest Suite: Payoff Scenarios')
const inputs: LoanInputs = {
  remainingBalance: 30000,
  vehicleValue: 20800,
  currentMonthlyPayment: 763,
  annualInterestRate: 6.5,
}

const scenario12 = calculatePayoffScenario(inputs, 12)
console.log(`   12-month scenario:`)
console.log(`     Negative Equity: ${formatCurrency(scenario12.negativeEquity)}`)
console.log(`     Extra Payment: ${formatCurrency(scenario12.extraMonthlyPayment)}`)
console.log(`     Total Payment: ${formatCurrency(scenario12.totalMonthlyPayment)}`)
console.log(`     Total Interest: ${formatCurrency(scenario12.totalInterestPaid)}`)

assertEquals(
  scenario12.negativeEquity,
  9200,
  0.01,
  'Scenario should have correct negative equity'
)

assertTruthy(
  scenario12.extraMonthlyPayment > 790 && scenario12.extraMonthlyPayment < 795,
  'Scenario should have correct extra payment'
)

assertTruthy(
  scenario12.totalInterestPaid > 200 && scenario12.totalInterestPaid < 400,
  'Interest should be within reasonable range'
)

// Test 5: All Scenarios
console.log('\nTest Suite: All Scenarios')
const allScenarios = calculateAllScenarios(inputs)
assertTruthy(
  allScenarios.length === 4,
  'Should return 4 scenarios'
)

assertTruthy(
  allScenarios[0].timeline === 6,
  'First scenario should be 6 months'
)

assertTruthy(
  allScenarios[3].timeline === 24,
  'Last scenario should be 24 months'
)

// Verify that longer timelines have lower monthly payments
assertTruthy(
  allScenarios[0].extraMonthlyPayment > allScenarios[1].extraMonthlyPayment,
  '6-month payment should be higher than 12-month'
)

assertTruthy(
  allScenarios[1].extraMonthlyPayment > allScenarios[2].extraMonthlyPayment,
  '12-month payment should be higher than 18-month'
)

// But longer timelines have more total interest
assertTruthy(
  allScenarios[3].totalInterestPaid > allScenarios[0].totalInterestPaid,
  '24-month timeline should pay more interest than 6-month'
)

// Test 6: Positive Equity (No Negative Equity)
console.log('\nTest Suite: Positive Equity')
const positiveEquityInputs: LoanInputs = {
  remainingBalance: 15000,
  vehicleValue: 18000,
  currentMonthlyPayment: 350,
  annualInterestRate: 4.5,
}

const positiveScenario = calculatePayoffScenario(positiveEquityInputs, 12)
assertEquals(
  positiveScenario.negativeEquity,
  0,
  0.01,
  'Should have no negative equity'
)

assertEquals(
  positiveScenario.extraMonthlyPayment,
  0,
  0.01,
  'Should have no extra payment needed'
)

// Test 7: Input Validation
console.log('\nTest Suite: Input Validation')
const validInputs: Partial<LoanInputs> = {
  remainingBalance: 30000,
  vehicleValue: 20000,
  currentMonthlyPayment: 500,
  annualInterestRate: 6.5,
}

const validResult = validateInputs(validInputs)
assertTruthy(
  validResult.isValid,
  'Valid inputs should pass validation'
)

const invalidInputs: Partial<LoanInputs> = {
  remainingBalance: -1000,
  vehicleValue: 0,
  currentMonthlyPayment: 500,
  annualInterestRate: 100,
}

const invalidResult = validateInputs(invalidInputs)
assertTruthy(
  !invalidResult.isValid,
  'Invalid inputs should fail validation'
)

assertTruthy(
  Object.keys(invalidResult.errors).length > 0,
  'Should return error messages for invalid inputs'
)

// Test 8: Format Functions
console.log('\nTest Suite: Formatting')
assertTruthy(
  formatCurrency(1234.56) === '$1,235',
  'Should format currency correctly'
)

assertTruthy(
  formatCurrency(9200) === '$9,200',
  'Should format currency with comma'
)

console.log('\n✨ All tests completed!\n')

