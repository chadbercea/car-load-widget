/**
 * Loan Amortization and Negative Equity Calculation Engine
 * 
 * This module implements standard loan amortization formulas to calculate
 * accurate monthly payments considering interest compounding.
 */

export interface LoanInputs {
  remainingBalance: number;
  vehicleValue: number;
  currentMonthlyPayment: number;
  annualInterestRate: number; // as percentage, e.g., 6.5
}

export interface PayoffScenario {
  timeline: number; // months
  negativeEquity: number;
  extraMonthlyPayment: number;
  totalMonthlyPayment: number;
  totalPaid: number;
  totalInterestPaid: number;
  note: string;
  achievable: boolean;
}

export interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

/**
 * Calculate the monthly interest rate from annual percentage rate
 */
function getMonthlyRate(annualRate: number): number {
  return annualRate / 100 / 12;
}

/**
 * Calculate standard monthly payment for a loan using amortization formula
 * M = P[r(1+r)^n]/[(1+r)^n-1]
 * where:
 * M = monthly payment
 * P = principal (loan amount)
 * r = monthly interest rate
 * n = number of payments
 */
export function calculateMonthlyPayment(
  principal: number,
  annualInterestRate: number,
  months: number
): number {
  if (annualInterestRate === 0) {
    return principal / months;
  }

  const monthlyRate = getMonthlyRate(annualInterestRate);
  const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  
  return (principal * numerator) / denominator;
}

/**
 * Generate an amortization schedule showing how payments are split between
 * principal and interest, accounting for extra payments
 */
export function generateAmortizationSchedule(
  principal: number,
  monthlyPayment: number,
  annualInterestRate: number,
  maxMonths: number = 360
): AmortizationEntry[] {
  const schedule: AmortizationEntry[] = [];
  let remainingBalance = principal;
  let month = 0;
  const monthlyRate = getMonthlyRate(annualInterestRate);

  while (remainingBalance > 0.01 && month < maxMonths) {
    month++;
    
    // Calculate interest on remaining balance
    const interestPayment = remainingBalance * monthlyRate;
    
    // Remaining payment goes to principal
    let principalPayment = monthlyPayment - interestPayment;
    
    // If this is the last payment, adjust to pay off remaining balance
    if (principalPayment > remainingBalance) {
      principalPayment = remainingBalance;
    }
    
    remainingBalance -= principalPayment;
    
    // Ensure we don't go negative
    if (remainingBalance < 0) {
      remainingBalance = 0;
    }
    
    schedule.push({
      month,
      payment: principalPayment + interestPayment,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance,
    });
  }

  return schedule;
}

/**
 * Calculate negative equity (upside down amount)
 */
export function calculateNegativeEquity(
  remainingBalance: number,
  vehicleValue: number
): number {
  const equity = remainingBalance - vehicleValue;
  return equity > 0 ? equity : 0;
}

/**
 * Calculate payoff scenario for a specific timeline
 * This accounts for interest by calculating the extra payment needed to
 * pay off the negative equity portion within the specified timeline
 */
export function calculatePayoffScenario(
  inputs: LoanInputs,
  timelineMonths: number
): PayoffScenario {
  const negativeEquity = calculateNegativeEquity(
    inputs.remainingBalance,
    inputs.vehicleValue
  );

  // If no negative equity, return early
  if (negativeEquity === 0) {
    return {
      timeline: timelineMonths,
      negativeEquity: 0,
      extraMonthlyPayment: 0,
      totalMonthlyPayment: inputs.currentMonthlyPayment,
      totalPaid: inputs.currentMonthlyPayment * timelineMonths,
      totalInterestPaid: 0,
      note: "No negative equity - vehicle value exceeds loan balance",
      achievable: true,
    };
  }

  // For simple calculation: estimate extra payment needed
  // This uses the loan payment formula to calculate the payment needed
  // to pay off the negative equity portion over the timeline
  const extraPayment = calculateMonthlyPayment(
    negativeEquity,
    inputs.annualInterestRate,
    timelineMonths
  );

  const totalPayment = inputs.currentMonthlyPayment + extraPayment;

  // Generate schedule to calculate total interest
  const schedule = generateAmortizationSchedule(
    negativeEquity,
    extraPayment,
    inputs.annualInterestRate,
    timelineMonths
  );

  const totalInterest = schedule.reduce((sum, entry) => sum + entry.interest, 0);
  const totalPaid = totalPayment * timelineMonths;

  // Determine note based on timeline
  let note = "";
  if (timelineMonths <= 6) {
    note = "Aggressive - Fastest payoff";
  } else if (timelineMonths <= 12) {
    note = "Moderate - Balanced approach";
  } else {
    note = "Conservative - Lower monthly burden";
  }

  return {
    timeline: timelineMonths,
    negativeEquity,
    extraMonthlyPayment: extraPayment,
    totalMonthlyPayment: totalPayment,
    totalPaid,
    totalInterestPaid: totalInterest,
    note,
    achievable: true,
  };
}

/**
 * Calculate all standard scenarios (6, 12, 18, 24 months)
 */
export function calculateAllScenarios(inputs: LoanInputs): PayoffScenario[] {
  const timelines = [6, 12, 18, 24];
  return timelines.map((timeline) => calculatePayoffScenario(inputs, timeline));
}

/**
 * Validate loan inputs
 */
export function validateInputs(inputs: Partial<LoanInputs>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!inputs.remainingBalance || inputs.remainingBalance <= 0) {
    errors.remainingBalance = "Remaining balance must be greater than 0";
  }

  if (!inputs.vehicleValue || inputs.vehicleValue <= 0) {
    errors.vehicleValue = "Vehicle value must be greater than 0";
  }

  if (!inputs.currentMonthlyPayment || inputs.currentMonthlyPayment <= 0) {
    errors.currentMonthlyPayment = "Current monthly payment must be greater than 0";
  }

  if (inputs.annualInterestRate === undefined || inputs.annualInterestRate < 0 || inputs.annualInterestRate > 50) {
    errors.annualInterestRate = "Interest rate must be between 0% and 50%";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format percentage for display
 */
export function formatPercentage(rate: number): string {
  return `${rate.toFixed(2)}%`;
}

