# Negative Equity Payment Calculator

A production-ready financial calculator that helps vehicle owners calculate accurate monthly payments needed to eliminate negative equity before a trade or sale.

![Calculator Screenshot](https://via.placeholder.com/800x450.png?text=Calculator+Screenshot)

## 🎯 Features

- **Accurate Financial Calculations**: Uses standard loan amortization formulas with proper interest compounding
- **Multiple Scenarios**: Compare 4 payoff timelines (6, 12, 18, 24 months) simultaneously
- **Visual Insights**: Interactive graph showing balance decrease over time
- **Export Capability**: Download results as CSV for financial planning
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Accessible**: WCAG AA compliant with keyboard navigation support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/chadbercea/car-load-widget.git
cd car-load-widget

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the calculator.

## 🏗️ Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Deployment**: GitHub Pages

## 📊 How It Works

### Input Fields

1. **Remaining Loan Balance**: Total principal remaining on your vehicle loan
2. **Vehicle Estimated Value**: Current trade-in or private sale value
3. **Current Monthly Payment**: Your existing loan payment
4. **Annual Interest Rate**: APR on your current loan (required for accuracy)

### Calculation Methodology

The calculator uses standard loan amortization formulas:

```
Monthly Payment = P[r(1+r)^n] / [(1+r)^n - 1]

Where:
P = principal (negative equity amount)
r = monthly interest rate (APR ÷ 12 ÷ 100)
n = number of months
```

**Negative Equity** is calculated as:
```
Negative Equity = Remaining Loan Balance - Vehicle Value
```

### Output

The calculator displays:

- **Extra Monthly Payment**: Additional amount needed beyond your current payment
- **Total Monthly Payment**: What you'll actually pay each month
- **Total Paid**: Total amount over the entire timeline
- **Interest**: Additional cost due to loan interest

## 🔧 Development

### Project Structure

```
car-load-widget/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main calculator page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── calculator-form.tsx # Input form
│   ├── results-table.tsx   # Results display
│   ├── payoff-graph.tsx    # Visualization
│   └── export-button.tsx   # CSV export
├── lib/
│   ├── calculations.ts     # Core calculation engine
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint
```

### Building for Production

The project is configured for static export to GitHub Pages:

```bash
npm run build
```

This creates an optimized static build in the `out/` directory.

## 🚢 Deployment

### GitHub Pages (Recommended)

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages"
   - Select "Deploy from a branch"
   - Choose the `gh-pages` branch

2. **Automatic Deployment**:
   - Push to the `main` branch
   - GitHub Actions will automatically build and deploy

### Manual Deployment

```bash
# Build the static export
npm run build

# The out/ directory contains the static files
# Deploy these to any static hosting service
```

## 📝 Configuration

### Base Path

The app is configured for GitHub Pages deployment. To change the base path:

Edit `next.config.js`:

```javascript
const nextConfig = {
  basePath: '/your-repo-name', // Change this
}
```

### Environment Variables

No environment variables are required for the MVP.

## 🧪 Testing

### Manual Testing Checklist

- [ ] Calculator displays correctly on desktop (1920px)
- [ ] Calculator displays correctly on tablet (768px)
- [ ] Calculator displays correctly on mobile (375px)
- [ ] All 4 scenarios calculate correctly
- [ ] Graph renders properly with all timelines
- [ ] CSV export downloads with correct data
- [ ] Form validation works (negative numbers, empty fields)
- [ ] Positive equity scenario shows success message
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Screen reader announces form errors

### Example Test Cases

**Test Case 1: Standard Negative Equity**
```
Input:
  Remaining Balance: $30,000
  Vehicle Value: $20,800
  Current Payment: $763
  Interest Rate: 6.5%

Expected Output:
  Negative Equity: $9,200
  6-month extra payment: ~$1,564
  12-month extra payment: ~$791
```

**Test Case 2: No Negative Equity**
```
Input:
  Remaining Balance: $15,000
  Vehicle Value: $18,000
  Current Payment: $350
  Interest Rate: 4.5%

Expected Output:
  Success message: "No negative equity"
```

## ⚠️ Disclaimer

This calculator provides estimates based on standard loan amortization formulas. Actual results may vary based on your lender's specific terms and conditions. Always consult with your lender for exact payoff amounts and requirements.

**Assumptions:**
- Extra payments are applied directly to principal
- Interest compounds monthly
- No prepayment penalties
- Vehicle value remains stable

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🗺️ Roadmap

### v2.0 (Future)
- [ ] PDF export functionality
- [ ] User accounts / saved calculations
- [ ] Loan refinancing calculator
- [ ] Dark mode toggle
- [ ] Multiple vehicle comparison
- [ ] Integration with KBB/Edmunds APIs

### v3.0 (Future)
- [ ] Native mobile apps (iOS/Android)
- [ ] Offline functionality
- [ ] Payment reminder notifications

## 📞 Support

If you have questions or need help:

- Open an issue on GitHub
- Review the [PRD.md](PRD.md) for detailed specifications
- Check the [calculation examples](#-how-it-works) above

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ by Chad**

*Not financial advice. Always consult with a financial professional for important decisions.*
