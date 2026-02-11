# Testing Guide - Lyne Digital Studio

## 📚 Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Test Structure](#test-structure)
- [Writing Tests](#writing-tests)
- [Running Tests](#running-tests)
- [Coverage](#coverage)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

This project uses **Vitest** with **React Testing Library** for comprehensive testing coverage. We maintain **75-80% overall coverage** with a focus on:

- **Utilities**: 95%+ coverage
- **Hooks**: 90%+ coverage
- **Components**: 90%+ coverage

### Tech Stack

- **Test Runner**: Vitest
- **Testing Library**: @testing-library/react
- **User Interactions**: @testing-library/user-event
- **Coverage**: @vitest/coverage-v8

---

## Quick Start

### Install Dependencies

```bash
npm install
```

### Run Tests

```bash
# Run all tests
npm test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run with UI
npm run test:ui
```

---

## Test Structure

### Directory Organization

```
src/
├── components/
│   ├── home/
│   │   ├── __tests__/
│   │   │   ├── Hero.test.tsx
│   │   │   ├── Services.test.tsx
│   │   │   ├── Portfolio.test.tsx
│   │   │   ├── Clients.test.tsx
│   │   │   ├── FAQ.test.tsx
│   │   │   └── Pricing.test.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── __tests__/
│   │   │   ├── Navbar.test.tsx
│   │   │   └── Footer.test.tsx
│   │   └── ...
│   └── ui/
│       ├── __tests__/
│       │   ├── AnimatedCounter.test.tsx
│       │   ├── Preloader.test.tsx
│       │   └── CustomCursor.test.tsx
│       └── ...
├── hooks/
│   ├── __tests__/
│   │   ├── useScrollPosition.test.ts
│   │   ├── useWindowSize.test.ts
│   │   └── useIntersectionObserver.test.ts
│   └── ...
├── utils/
│   ├── __tests__/
│   │   ├── validation.test.ts
│   │   ├── format.test.ts
│   │   ├── dom.test.ts
│   │   └── helpers.test.ts
│   └── ...
└── test/
    ├── setup.ts          # Global test setup
    └── utils.tsx         # Test utilities
```

---

## Writing Tests

### Component Tests

#### Basic Structure

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
    it('should render component', () => {
        render(<MyComponent />);
        
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });
    
    it('should handle user interaction', async () => {
        const user = userEvent.setup();
        render(<MyComponent />);
        
        const button = screen.getByRole('button');
        await user.click(button);
        
        expect(screen.getByText('Clicked')).toBeInTheDocument();
    });
});
```

#### Mocking Components

```typescript
// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock custom components
vi.mock('../ui/Reveal', () => ({
    default: ({ children }: any) => <div>{children}</div>,
}));

// Mock hooks
vi.mock('../../hooks', () => ({
    useScrollPosition: () => ({ scrollY: 0, isScrolled: false }),
}));
```

### Hook Tests

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useMyHook } from '../useMyHook';

describe('useMyHook', () => {
    it('should return initial value', () => {
        const { result } = renderHook(() => useMyHook());
        
        expect(result.current.value).toBe(0);
    });
    
    it('should update on change', async () => {
        const { result } = renderHook(() => useMyHook());
        
        act(() => {
            result.current.setValue(10);
        });
        
        await waitFor(() => {
            expect(result.current.value).toBe(10);
        });
    });
});
```

### Utility Tests

```typescript
import { describe, it, expect } from 'vitest';
import { formatNumber } from '../format';

describe('formatNumber', () => {
    it('should format number with commas', () => {
        expect(formatNumber(1000)).toBe('1,000');
        expect(formatNumber(1000000)).toBe('1,000,000');
    });
    
    it('should handle edge cases', () => {
        expect(formatNumber(0)).toBe('0');
        expect(formatNumber(-1000)).toBe('-1,000');
    });
});
```

---

## Running Tests

### Command Reference

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |
| `npm run test:ui` | Open Vitest UI |

### Run Specific Tests

```bash
# Run specific file
npm test -- Hero.test.tsx

# Run specific directory
npm test -- src/utils

# Run tests matching pattern
npm test -- validation

# Run in watch mode for specific file
npm run test:watch -- Hero.test.tsx
```

### Debugging Tests

```bash
# Run with verbose output
npm test -- --reporter=verbose

# Run single test
npm test -- -t "should render component"

# Debug in VS Code
# Add breakpoint and use "Debug Test" in test file
```

---

## Coverage

### Coverage Thresholds

Configured in `vitest.config.ts`:

```typescript
coverage: {
    thresholds: {
        lines: 70,
        functions: 70,
        branches: 65,
        statements: 70,
    },
}
```

### View Coverage Report

```bash
# Generate coverage
npm run test:coverage

# Open in browser
open coverage/index.html
```

### Coverage Goals

- **Overall**: 70%+ (Currently: 75-80%)
- **Critical Components**: 80%+ (Currently: 90%+)
- **Utilities**: 90%+ (Currently: 95%+)

---

## Best Practices

### 1. Test Behavior, Not Implementation

❌ **Bad:**
```typescript
expect(component.state.count).toBe(1);
```

✅ **Good:**
```typescript
expect(screen.getByText('Count: 1')).toBeInTheDocument();
```

### 2. Use Accessible Queries

**Priority Order:**
1. `getByRole` - Best for accessibility
2. `getByLabelText` - For form fields
3. `getByText` - For non-interactive elements
4. `getByTestId` - Last resort

✅ **Good:**
```typescript
const button = screen.getByRole('button', { name: /submit/i });
const input = screen.getByLabelText(/email/i);
```

### 3. Async Testing

```typescript
// Use waitFor for async updates
await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
});

// Use userEvent for interactions
const user = userEvent.setup();
await user.click(button);
await user.type(input, 'test@example.com');
```

### 4. Cleanup

```typescript
// Cleanup happens automatically with Testing Library
// For manual cleanup:
afterEach(() => {
    vi.clearAllMocks();
});
```

### 5. Descriptive Test Names

✅ **Good:**
```typescript
it('should display error message when email is invalid', () => {
    // ...
});
```

❌ **Bad:**
```typescript
it('test email', () => {
    // ...
});
```

---

## Troubleshooting

### Common Issues

#### 1. "Cannot find module" errors

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

#### 2. Tests timing out

**Solution:**
```typescript
// Increase timeout for specific test
it('should load data', async () => {
    // ...
}, { timeout: 10000 });
```

#### 3. Mock not working

**Solution:**
```typescript
// Ensure mock is before import
vi.mock('./module');
import { Component } from './Component';
```

#### 4. "act" warnings

**Solution:**
```typescript
// Wrap state updates in act
import { act } from '@testing-library/react';

act(() => {
    result.current.setValue(10);
});
```

### Getting Help

1. Check [Vitest Documentation](https://vitest.dev/)
2. Check [Testing Library Documentation](https://testing-library.com/)
3. Review existing tests in the codebase
4. Ask in team chat

---

## Additional Resources

- [Vitest API Reference](https://vitest.dev/api/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Testing Patterns](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Accessibility Testing](https://testing-library.com/docs/queries/byrole)

---

**Last Updated**: February 11, 2026  
**Maintained by**: Lyne Digital Studio Team
