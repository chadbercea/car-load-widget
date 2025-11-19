# Negative Equity Payment Calculator Widget - MVP PRD

**Version:** 1.0.0  
**Owner:** Chad  
**Status:** In Development  
**Last Updated:** November 19, 2025

---

## Executive Summary

A production-ready financial calculator that helps vehicle owners calculate accurate monthly payments needed to eliminate negative equity before a trade or sale, using standard loan amortization formulas with proper interest calculations.

---

## 1. Objective

Build a web-based calculator that:

* Accepts vehicle loan details and current trade/sale value
* Calculates monthly payments using standard loan amortization formulas
* Displays 4 simultaneous payoff scenarios (6, 12, 18, 24 months) for comparison
* Provides visual graph showing balance decrease over time
* Exports results to CSV for financial planning
* Delivers accurate, production-ready financial calculations users can trust

---

## 2. Technical Stack

| Component | Technology | Version | Justification |
| --------- | ---------- | ------- | ------------- |
| Framework | Next.js | 14+ | App Router, static export for GitHub Pages |
| Language | TypeScript | 5.x | Type safety for financial calculations |
| UI Library | shadcn/ui | Latest | Professional, accessible components |
| Styling | Tailwind CSS | 4.x | Rapid, responsive design |
| Charts | Recharts | Latest | Lightweight, responsive data visualization |
| Deployment | GitHub Pages | N/A | Free hosting, automated CI/CD |

---

## 3. Features & Requirements

### 3.1 Input Fields

| Field | Type | Required | Default | Validation | Description |
| ----- | ---- | -------- | ------- | ---------- | ----------- |
| Remaining Loan Balance | Currency | Yes | 30,000 | > 0 | Total principal remaining on vehicle loan |
| Vehicle Estimated Value | Currency | Yes | 20,800 | > 0 | Trade-in or private sale value |
| Current Monthly Payment | Currency | Yes | 763 | > 0 | Existing loan payment |
| Annual Interest Rate | Percentage | Yes | 6.5% | 0-50% | APR on current loan (required for accuracy) |

**Form Features:**
- Real-time validation with inline error messages
- Currency inputs with $ prefix
- Percentage input with % suffix
- Keyboard accessible (tab navigation, enter to submit)
- Touch-friendly on mobile (min 44px tap targets)

### 3.2 Calculation Methodology

**Negative Equity Formula:**
```
Negative Equity = Remaining Balance - Vehicle Value
(Only if result > 0)
```

**Monthly Payment Calculation (Standard Amortization):**
```
M = P[r(1+r)^n] / [(1+r)^n - 1]

Where:
M = monthly payment
P = principal (negative equity amount)
r = monthly interest rate (APR ÷ 12 ÷ 100)
n = number of months
```

**Extra Payment Calculation:**
- Uses amortization formula to calculate payment needed to eliminate negative equity over selected timeline
- Accounts for interest compounding monthly
- Assumes extra payments applied directly to principal

**Total Monthly Payment:**
```
Total = Current Monthly Payment + Extra Monthly Payment
```

### 3.3 Output Display

**Results Table** (displays all 4 scenarios simultaneously):

| Timeline | Extra Payment | Total Monthly | Total Paid | Interest | Strategy |
| -------- | ------------- | ------------- | ---------- | -------- | -------- |
| 6 months | Calculated | Calculated | Calculated | Calculated | Aggressive - Fastest payoff |
| 12 months | Calculated | Calculated | Calculated | Calculated | Moderate - Balanced approach |
| 18 months | Calculated | Calculated | Calculated | Calculated | Conservative - Lower monthly burden |
| 24 months | Calculated | Calculated | Calculated | Calculated | Conservative - Lower monthly burden |

**Color Coding:**
- 6 months: Red background (aggressive)
- 12 months: Yellow background (moderate)
- 18-24 months: Green background (conservative)

**Special Cases:**
- If Vehicle Value ≥ Remaining Balance: Show "No negative equity" success message
- If payment exceeds reasonable threshold: Warning message

### 3.4 Visualization

**Line Graph Requirements:**
- X-axis: Months (0 to max timeline)
- Y-axis: Remaining balance ($)
- 4 colored lines representing each timeline scenario
- Tooltips showing exact balance at each month
- Responsive: collapses gracefully on mobile (320px+)
- Accessible: proper ARIA labels, high contrast colors

**Graph Colors:**
- 6 months: Red (#ef4444)
- 12 months: Orange/Yellow (#f59e0b)
- 18 months: Green (#10b981)
- 24 months: Blue (#3b82f6)

### 3.5 Export Functionality

**CSV Export (Required for MVP):**
- Filename: `negative-equity-scenarios-YYYY-MM-DD.csv`
- Includes:
  - Export date/time
  - Input summary (all 4 input fields)
  - Complete scenario table
- Format: Standard CSV (comma-separated, quoted fields)
- Client-side generation (no server required)

**PDF Export (Stretch Goal - v2):**
- Deferred to future release
- Would include: formatted table, graph image, branding

### 3.6 User Interface Requirements

**Layout:**
- Desktop (1024px+): 2-column (inputs left, results right)
- Tablet (768-1023px): 2-column collapsed
- Mobile (320-767px): Single column stacked

**Accessibility (WCAG AA Compliance):**
- Color contrast ratio ≥ 4.5:1 for text
- All interactive elements keyboard accessible
- Focus indicators visible and clear
- Form inputs have associated labels
- Error messages announced to screen readers
- Semantic HTML (proper heading hierarchy)

**Performance Targets:**
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Total bundle size: < 300KB (gzipped)
- Lighthouse score: 90+ (Performance, Accessibility, Best Practices)

### 3.7 Browser Support

| Browser | Minimum Version |
| ------- | --------------- |
| Chrome | 90+ |
| Safari | 14+ |
| Firefox | 88+ |
| Edge | 90+ |
| Mobile Safari | iOS 14+ |
| Chrome Mobile | Android 5+ |

**No support for:** Internet Explorer (all versions)

---

## 4. Disclaimers & Legal

**Prominent Disclaimer Text (displayed in UI):**

> "These calculations use standard loan amortization formulas and assume extra payments are applied directly to principal. Actual results may vary based on your lender's specific terms and conditions. Always consult with your lender for exact payoff amounts and requirements."

**Footer Text:**
- Link to methodology explanation
- Open source license mention
- "Not financial advice" statement

---

## 5. Acceptance Criteria

| # | Criterion | Validation Method |
| - | --------- | ----------------- |
| 1 | User enters valid inputs → sees 4 accurate payoff scenarios | Manual testing with known loan examples |
| 2 | Calculations match standard loan amortization (within 0.01%) | Unit tests with verified examples |
| 3 | Graph displays correctly on mobile (320px) and desktop (1920px) | Visual regression testing |
| 4 | CSV export contains all data in correct format | Download and verify in Excel/Sheets |
| 5 | All inputs keyboard accessible (no mouse required) | Keyboard-only navigation test |
| 6 | Form validation prevents invalid inputs with helpful messages | Error testing (negative numbers, zeros, empty) |
| 7 | Color contrast meets WCAG AA standards | Lighthouse accessibility audit |
| 8 | Page loads in < 3s on 3G connection | Chrome DevTools network throttling |
| 9 | No console errors or warnings | Browser console check |
| 10 | Positive equity case shows success message | Test with vehicle value > loan balance |

---

## 6. Deployment Strategy

**Hosting:** GitHub Pages (free, reliable, automated)

**Build Process:**
1. Next.js static export (`next build` with `output: 'export'`)
2. Generates static HTML/CSS/JS files
3. Deployed to GitHub Pages via GitHub Actions
4. Custom domain support available

**CI/CD Pipeline:**
```yaml
Trigger: Push to main branch
Steps:
  1. Install dependencies
  2. Run build
  3. Run tests (when implemented)
  4. Deploy to gh-pages branch
```

**Base Path Configuration:**
- Production: `/car-load-widget`
- Development: `/`

---

## 7. Out of Scope (Future Versions)

### Deferred to v2:
- [ ] PDF export functionality
- [ ] User accounts / saved calculations
- [ ] Historical data tracking
- [ ] Comparison of multiple vehicles
- [ ] Integration with KBB/Edmunds APIs for vehicle values
- [ ] Email/SMS sharing of results
- [ ] Loan refinancing calculator
- [ ] Advanced mode with custom amortization schedules
- [ ] Dark mode toggle
- [ ] Internationalization (other currencies/languages)

### Deferred to v3 (Mobile App):
- [ ] Native iOS app
- [ ] Native Android app
- [ ] Offline functionality
- [ ] Push notifications for payment reminders

---

## 8. Success Metrics (Post-Launch)

| Metric | Target | Measurement Tool |
| ------ | ------ | ---------------- |
| Page Load Time | < 3s | Google Analytics |
| Bounce Rate | < 40% | Google Analytics |
| Avg. Session Duration | > 2 min | Google Analytics |
| CSV Export Rate | > 20% of sessions | Event tracking |
| Mobile Traffic | > 60% | Google Analytics |
| Accessibility Score | 95+ | Lighthouse CI |

---

## 9. Known Limitations & Assumptions

**Assumptions:**
1. Extra payments are applied directly to principal (not all lenders do this)
2. Interest compounds monthly (standard for auto loans)
3. No prepayment penalties exist on the loan
4. Current monthly payment remains constant
5. Vehicle value remains stable (no depreciation during payoff)

**Limitations:**
1. Does not account for:
   - Prepayment penalties
   - Gap insurance
   - Extended warranties
   - Trade-in fees or taxes
   - Registration transfer fees
2. Interest calculation is an estimate (lender-specific terms may vary)
3. Does not validate if entered values are realistic for user's situation

**Mitigation:**
- Clear disclaimer about calculation assumptions
- Encouragement to verify with lender
- "This is a planning tool, not a guarantee" messaging

---

## 10. Development Timeline

| Phase | Tasks | Duration | Status |
| ----- | ----- | -------- | ------ |
| 1: Setup | Next.js, TypeScript, shadcn/ui, Tailwind | 1 day | ✅ Complete |
| 2: Calculations | Core amortization engine + tests | 1 day | ✅ Complete |
| 3: UI Components | Form, table, graph, export button | 1 day | ✅ Complete |
| 4: Integration | Connect all components, styling polish | 0.5 days | ✅ Complete |
| 5: Testing | Manual testing, accessibility, mobile | 0.5 days | 🚧 In Progress |
| 6: Documentation | README, deployment guide, comments | 0.5 days | ⏳ Pending |
| 7: Deployment | GitHub Actions, GitHub Pages setup | 0.5 days | ⏳ Pending |

**Total Estimated Time:** 4 days  
**Target Launch:** End of sprint

---

## 11. Changelog

| Version | Date | Changes |
| ------- | ---- | ------- |
| 0.1.0 | Nov 19, 2025 | Initial PRD draft |
| 1.0.0 | Nov 19, 2025 | Complete rewrite - added tech stack, accurate calculations, removed ambiguity, production specs |

---

## Appendix A: Calculation Examples

**Example 1: Standard Negative Equity**
```
Inputs:
  Remaining Balance: $30,000
  Vehicle Value: $20,800
  Current Payment: $763
  Interest Rate: 6.5% APR

Negative Equity: $9,200

6-Month Payoff:
  Extra Payment: $1,564/month
  Total Payment: $2,327/month
  Total Interest: $160

12-Month Payoff:
  Extra Payment: $791/month
  Total Payment: $1,554/month
  Total Interest: $295
```

**Example 2: No Negative Equity**
```
Inputs:
  Remaining Balance: $15,000
  Vehicle Value: $18,000
  Current Payment: $350
  Interest Rate: 4.5% APR

Result: "No negative equity - you have $3,000 in positive equity!"
```

---

**End of PRD**
