# picoCTF Solves Predictor - Frontend

## Overview

This frontend application serves as the user interface for the picoCTF Solves Predictor, a tool designed to analyze, visualize, and predict solve rates for challenges in the picoCTF cybersecurity competition. The application provides an interactive interface for users to input challenge data, view predictions, and analyze historical performance metrics.

## Technology Stack

### Core Technologies
- **React 18** - Component-based UI library
- **TypeScript** - Statically typed JavaScript for improved developer experience
- **Vite** - Modern build tool for faster development and optimized production builds
- **Tailwind CSS** - Utility-first CSS framework with custom theme configuration
- **React Router DOM** - For client-side routing

### UI Components and Styling
- **Radix UI** - Headless UI components for accessibility and customization
- **Tailwind Merge** - Smart utility for merging Tailwind CSS classes
- **Lucide React** - Icon library
- **Class Variance Authority** - Tools for creating type-safe component variants

### Data Management and Visualization
- **React Query (TanStack Query)** - Data fetching, caching, and state management
- **Recharts** - Composable charting library for data visualization
- **React Hook Form** - Form state management and validation
- **Zod** - TypeScript-first schema validation

### Development Tools
- **ESLint** - Code quality and consistency
- **SWC** - Fast TypeScript/JavaScript compiler
- **Lovable Tagger** - Component tagging for development

## Project Structure

```
frontend/
├── public/              # Static assets served directly
├── src/                 # Source code
│   ├── assets/          # Static assets processed by Vite
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # Base UI components (shadcn)
│   │   ├── Header.tsx   # Site header component
│   │   ├── Footer.tsx   # Site footer component
│   │   ├── ChallengeInfo.tsx # Challenge information display
│   │   └── PredictionForm.tsx # Main form for prediction inputs
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and shared code
│   ├── pages/           # Route-based page components
│   ├── App.tsx          # Main App component
│   ├── App.css          # App-specific styles
│   ├── index.css        # Global styles (includes Tailwind)
│   └── main.tsx         # Entry point for the application
├── components.json      # UI component configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── vite.config.ts       # Vite build configuration
└── package.json         # Project dependencies and scripts
```

## Component Breakdown

### Core Application Components

- **PredictionForm** - Complex form for entering challenge details and parameters to generate predictions. This is a centerpiece component at 254 lines.
  
- **ChallengeInfo** - Displays information about a specific picoCTF challenge, including difficulty, category, and other metadata.

- **Header/Footer** - Standard application layout components for consistent UI structure.

### UI Library

The project uses a custom UI component library based on Radix UI primitives, likely using the shadcn/ui approach. These components include:

- Form controls (inputs, selects, checkboxes)
- Layout components (dialogs, dropdowns, navigation)
- Feedback elements (toasts, progress indicators)
- Data visualization components

## Theme and Styling

The application implements a custom design system with:

- Custom color palette with primary, secondary, muted, and accent colors
- Dark mode support
- Custom animations and transitions
- Responsive design using Tailwind's container system
- Custom gradients and theme colors (purple, blue, teal, orange)

## Setup and Development

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yvesHakizimana/picoCTF-solves-predictor.git
   cd picoCTF-solves-predictor/fronted
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```
   The development server will run on port 8000 by default.

### Build for Production

```bash
pnpm build
```

For development builds (with source maps and debug information):
```bash
pnpm build:dev
```

### Code Quality

Lint your code with:
```bash
pnpm lint
```

## Application Features

- **Challenge Prediction Form** - Input challenge details to generate solve predictions
- **Challenge Information Display** - View detailed information about picoCTF challenges
- **Data Visualization** - Charts and graphs for analyzing trends and predictions
- **Responsive Design** - Optimized for both desktop and mobile viewing

## Architecture

- **Component-Based Architecture** - Modular UI components for reusability
- **Custom Hooks** - Separates logic from UI for improved maintainability
- **Path Aliasing** - Uses `@/*` aliases for cleaner imports
- **Type-Safe Development** - TypeScript for catching errors during development

## Browser Compatibility

This application is designed to work with modern browsers. Internet Explorer is not supported.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies (`pnpm install`)
4. Make your changes
5. Run tests and linting (`pnpm lint`)
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## License

This project is licensed under the Rwanda Coding Academy License.
