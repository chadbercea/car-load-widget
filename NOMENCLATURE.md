# Nomenclature: Negative Equity Payment Calculator

**Version:** 1.0.0  
**Last Updated:** November 19, 2025

---

## Purpose

This document defines the standard terminology for all UI elements, data structures, calculations, and components in the calculator. Use these terms consistently across code, documentation, and communication.

---

## 1. Input Fields

| Term | Code Reference | UI Label | Definition |
|------|----------------|----------|------------|
| **Remaining Balance** | `remainingBalance` | "Remaining Loan Balance" | Total principal amount still owed on the vehicle loan |
| **Vehicle Value** | `vehicleValue` | "Vehicle Estimated Value" | Current market value for trade-in or private sale |
| **Current Payment** | `currentMonthlyPayment` | "Current Monthly Payment" | Existing monthly loan payment amount |
| **Interest Rate** | `annualInterestRate` | "Annual Interest Rate" | Annual percentage rate (APR) as a number (e.g., 6.5 for 6.5%) |

---

## 2. Calculated Values

| Term | Code Reference | UI Display | Definition |
|------|----------------|------------|------------|
| **Negative Equity** | `negativeEquity` | "Negative Equity" | Amount owed above vehicle value (remainingBalance - vehicleValue) |
| **Extra Payment** | `extraMonthlyPayment` | "Extra Monthly Payment" | Additional payment needed beyond current payment to eliminate negative equity |
| **Total Payment** | `totalMonthlyPayment` | "Total Monthly Payment" | Sum of current payment and extra payment |
| **Total Paid** | `totalPaid` | "Total Amount Paid" | Total money paid over the entire timeline |
| **Total Interest** | `totalInterestPaid` | "Total Interest Paid" | Cumulative interest paid on the negative equity portion |

---

## 3. Timeline Scenarios

| Term | Code Value | Duration | Classification | UI Color |
|------|------------|----------|----------------|----------|
| **Aggressive** | `6` | 6 months | Fast payoff, high monthly cost | Red (#ef4444) |
| **Moderate** | `12` | 12 months | Balanced approach | Orange (#f59e0b) |
| **Conservative Short** | `18` | 18 months | Lower burden, more interest | Green (#10b981) |
| **Conservative Long** | `24` | 24 months | Lowest burden, most interest | Blue (#3b82f6) |

---

## 4. UI Components

| Component | File Path | Purpose |
|-----------|-----------|---------|
| **Input Form** | `components/calculator-form.tsx` | Collects user loan and vehicle data |
| **Results Table** | `components/results-table.tsx` | Displays all 4 scenarios in tabular format |
| **Payoff Graph** | `components/payoff-graph.tsx` | Visualizes balance decrease over time |
| **Export Button** | `components/export-button.tsx` | Generates CSV download |

### Card Structure

All major sections use the Card component from shadcn/ui:

| Card Element | Code Reference | Purpose |
|--------------|----------------|---------|
| **Card** | `<Card>` | Container for entire card section |
| **Card Header** | `<CardHeader>` | Top section with title and description |
| **Card Title** | `<CardTitle>` | Main heading for the card |
| **Card Description** | `<CardDescription>` | Subtitle or explanatory text |
| **Card Content** | `<CardContent>` | Main body containing form fields, table, or graph |

**Card Instances in App:**
- Input Form Card: Contains all 4 input fields
- Results Table Card: Contains scenario table and strategy legend
- Payoff Graph Card: Contains line chart visualization

---

## 5. Component Sections

### Input Form Sections
- **Form Header**: Title and description
- **Input Fields**: 4 required numeric inputs
- **Validation Messages**: Inline error feedback
- **Disclaimer Box**: Calculation methodology note

### Results Table Sections
- **Table Header**: Column labels
- **Scenario Rows**: 4 rows (one per timeline)
- **Strategy Legend**: Color-coded explanations
- **Help Box**: Term definitions and usage guidance

### Payoff Graph Sections
- **Chart Area**: Line graph with 4 timelines
- **X-Axis**: Month progression (0 to max timeline)
- **Y-Axis**: Dollar amounts (remaining balance)
- **Legend**: Timeline identification
- **Caption**: Graph interpretation help

---

## 6. Data Types

```typescript
// Primary input structure
interface LoanInputs {
  remainingBalance: number      // USD, positive
  vehicleValue: number          // USD, positive
  currentMonthlyPayment: number // USD, positive
  annualInterestRate: number    // Percentage (0-50)
}

// Scenario output structure
interface PayoffScenario {
  timeline: number              // Months (6, 12, 18, 24)
  negativeEquity: number        // USD
  extraMonthlyPayment: number   // USD per month
  totalMonthlyPayment: number   // USD per month
  totalPaid: number             // USD total
  totalInterestPaid: number     // USD total
  note: string                  // Strategy description
  achievable: boolean           // Whether scenario is realistic
}

// Amortization schedule entry
interface AmortizationEntry {
  month: number                 // Payment number (1-based)
  payment: number               // USD paid this month
  principal: number             // USD toward principal
  interest: number              // USD toward interest
  remainingBalance: number      // USD still owed
}
```

---

## 7. Financial Terms

| Term | Definition | Usage Context |
|------|------------|---------------|
| **Amortization** | Process of paying off debt in regular installments | Calculation methodology |
| **Principal** | Original loan amount or remaining balance | Payment breakdown |
| **Interest** | Cost of borrowing money, calculated monthly | Payment breakdown |
| **Upside Down** | Informal term for negative equity | User communication |
| **Trade-In Value** | Amount dealer offers for your vehicle | Vehicle value context |
| **Private Sale Value** | Amount you could sell vehicle for directly | Vehicle value context |
| **APR** | Annual Percentage Rate | Interest rate specification |
| **Payoff Timeline** | Duration chosen to eliminate negative equity | Scenario parameter |

---

## 8. UI States

| State | Trigger | Display Behavior |
|-------|---------|------------------|
| **Initial Load** | Page first opens | Form with default values, results shown |
| **Input Change** | User modifies any field | Results recalculate immediately |
| **Validation Error** | Invalid input detected | Red error text below field |
| **No Negative Equity** | vehicleValue ≥ remainingBalance | Success message instead of scenarios |
| **Export Active** | User clicks export button | CSV file downloads |

---

## 9. Color Coding System

### Scenario Colors
- **Red** (`bg-red-50`, `text-red-900`, `border-red-200`): Aggressive/fast payoff
- **Yellow** (`bg-yellow-50`, `text-yellow-900`, `border-yellow-200`): Moderate/balanced
- **Green** (`bg-green-50`, `text-green-900`, `border-green-200`): Conservative/slow

### Semantic Colors
- **Blue** (`bg-blue-50`, `border-blue-200`): Informational messages
- **Gray** (`bg-gray-50`, `text-gray-600`): Secondary/descriptive text
- **Red destructive** (`text-red-500`, `text-red-600`): Errors, negative values

---

## 10. Text Labels & Messaging

### Standard Button Labels
- "Export to CSV" - CSV download button
- (No submit button - calculations are automatic)

### Standard Messages
- **Success**: "Great News! You have no negative equity - your vehicle value exceeds your loan balance"
- **Disclaimer**: "These calculations use standard loan amortization formulas and assume extra payments are applied directly to principal. Actual results may vary based on your lender's specific terms and conditions."
- **Footer**: "Not financial advice. Always consult with a financial professional for important decisions."

### Validation Messages
- `remainingBalance`: "Remaining balance must be greater than 0"
- `vehicleValue`: "Vehicle value must be greater than 0"
- `currentMonthlyPayment`: "Current monthly payment must be greater than 0"
- `annualInterestRate`: "Interest rate must be between 0% and 50%"

---

## 11. File Structure Reference

```
app/
├── layout.tsx          # Root layout (metadata, fonts)
├── page.tsx            # Main calculator page (orchestration)
└── globals.css         # Global styles, Tailwind base

components/
├── calculator-form.tsx # Input form component
├── results-table.tsx   # Results table component
├── payoff-graph.tsx    # Graph visualization component
├── export-button.tsx   # CSV export component
└── ui/                 # shadcn/ui primitives
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    ├── label.tsx
    └── table.tsx

lib/
├── calculations.ts     # Core calculation engine
├── calculations.test.ts # Unit tests
└── utils.ts            # Utility functions (cn helper)
```

---

## 12. Naming Conventions

### Variables
- **camelCase** for all JavaScript/TypeScript variables
- **PascalCase** for React components and TypeScript interfaces
- **SCREAMING_SNAKE_CASE** for constants (if any added)

### CSS Classes
- **kebab-case** for custom classes
- Tailwind utility classes as-is
- Use `cn()` helper from `lib/utils.ts` for conditional classes

### Files
- **kebab-case** for all file names
- Component files match component name in kebab-case
- Test files: `[name].test.ts`

---

## 13. Abbreviations (Avoid These)

| Don't Use | Use Instead |
|-----------|-------------|
| NE | Negative Equity |
| bal | Balance |
| pmt | Payment |
| int | Interest |
| calc | Calculator |
| scen | Scenario |

Write terms out fully for clarity.

---

## 14. Units & Formatting

| Value Type | Display Format | Example |
|------------|----------------|---------|
| Currency | `$X,XXX` (no cents) | $9,200 |
| Percentage | `X.XX%` | 6.50% |
| Months | `X months` or `X month` | 12 months |
| Timeline | `X-month` (adjective) | 6-month plan |

### Formatting Functions
- `formatCurrency(number)` - Returns `$X,XXX` format
- `formatPercentage(number)` - Returns `X.XX%` format

---

## Usage Notes

1. **When referring to scenarios in conversation**: Use timeline + classification
   - Example: "the 6-month aggressive scenario"
   - Example: "12-month moderate option"

2. **When referring to payments in code**: Always specify which payment
   - Use `currentMonthlyPayment` not just `payment`
   - Use `extraMonthlyPayment` not `additionalPayment`

3. **When discussing the graph**: Call it "payoff graph" or "visualization"
   - Not "chart" or "plot"

4. **When discussing the calculation method**: Use "loan amortization" or "amortization formula"
   - Not "interest calculation" or "payment calculation" alone

---

**End of Nomenclature**

