# Contributing to Lyne Digital Studio

Thank you for contributing to Lyne Digital Studio! This guide will help you get started.

---

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)

---

## Getting Started

### Prerequisites

- **Node.js**: v18+ recommended
- **npm**: v9+
- **Git**: Latest version

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/lyne.git
cd lyne

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
```

---

## Development Workflow

### 1. Create a Branch

```bash
# Feature branch
git checkout -b feature/your-feature-name

# Bug fix branch
git checkout -b fix/bug-description

# Documentation branch
git checkout -b docs/what-you-are-documenting
```

### 2. Make Changes

- Write clean, readable code
- Follow existing code style
- Add tests for new features
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Check coverage
npm run test:coverage

# Lint code
npm run lint

# Type check
npm run type-check
```

### 4. Commit Changes

We use conventional commits:

```bash
# Format: <type>(<scope>): <description>

git commit -m "feat(hero): add new animation effect"
git commit -m "fix(navbar): resolve mobile menu issue"
git commit -m "test(services): add component tests"
git commit -m "docs(readme): update installation steps"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

---

## Code Standards

### TypeScript

```typescript
// ✅ Good: Use explicit types
interface UserProps {
    name: string;
    email: string;
    age?: number;
}

const User: React.FC<UserProps> = ({ name, email, age }) => {
    return <div>{name}</div>;
};

// ❌ Bad: Avoid 'any'
const User = (props: any) => {
    return <div>{props.name}</div>;
};
```

### React Components

```typescript
// ✅ Good: Functional components with TypeScript
import React from 'react';

interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
    label, 
    onClick, 
    disabled = false 
}) => {
    return (
        <button onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
};
```

### CSS/Tailwind

```tsx
// ✅ Good: Use Tailwind utilities
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-gray-900">Title</h2>
</div>

// ❌ Bad: Inline styles (avoid unless necessary)
<div style={{ display: 'flex', padding: '24px' }}>
    <h2 style={{ fontSize: '24px' }}>Title</h2>
</div>
```

### File Naming

- **Components**: PascalCase - `Hero.tsx`, `Navbar.tsx`
- **Utilities**: camelCase - `validation.ts`, `format.ts`
- **Hooks**: camelCase with 'use' prefix - `useScrollPosition.ts`
- **Tests**: Same as source + `.test` - `Hero.test.tsx`
- **Types**: PascalCase - `types.ts`, `interfaces.ts`

---

## Testing Requirements

### Coverage Requirements

All new code must maintain or improve coverage:

- **Overall**: 70%+ coverage
- **New Components**: 80%+ coverage
- **New Utilities**: 90%+ coverage

### Writing Tests

#### Component Tests

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
    it('should render correctly', () => {
        render(<MyComponent />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should handle user interaction', async () => {
        const user = userEvent.setup();
        render(<MyComponent />);
        
        await user.click(screen.getByRole('button'));
        expect(screen.getByText('Clicked')).toBeInTheDocument();
    });
});
```

#### Utility Tests

```typescript
import { describe, it, expect } from 'vitest';
import { myUtility } from '../myUtility';

describe('myUtility', () => {
    it('should handle valid input', () => {
        expect(myUtility('test')).toBe('expected');
    });

    it('should handle edge cases', () => {
        expect(myUtility('')).toBe('');
        expect(myUtility(null)).toBe(null);
    });
});
```

### Test Checklist

Before submitting a PR, ensure:

- [ ] All tests pass (`npm test`)
- [ ] Coverage meets requirements (`npm run test:coverage`)
- [ ] New features have tests
- [ ] Bug fixes have regression tests
- [ ] Tests are descriptive and clear

---

## Pull Request Process

### 1. Before Submitting

```bash
# Ensure all tests pass
npm test

# Check coverage
npm run test:coverage

# Lint code
npm run lint

# Build successfully
npm run build
```

### 2. PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] All tests pass
- [ ] Added new tests
- [ ] Coverage maintained/improved

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
```

### 3. Review Process

1. **Automated Checks**: CI/CD runs tests and linting
2. **Code Review**: Team member reviews code
3. **Feedback**: Address review comments
4. **Approval**: Get approval from maintainer
5. **Merge**: Squash and merge to main

---

## Project Structure

```
lyne/
├── src/
│   ├── components/       # React components
│   │   ├── home/        # Home page components
│   │   ├── layout/      # Layout components
│   │   └── ui/          # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── store/           # Zustand stores
│   ├── constants/       # Constants and config
│   ├── types/           # TypeScript types
│   └── test/            # Test utilities
├── public/              # Static assets
├── docs/                # Documentation
└── coverage/            # Coverage reports
```

### Key Files

- `vitest.config.ts` - Test configuration
- `tailwind.config.js` - Tailwind CSS config
- `tsconfig.json` - TypeScript config
- `package.json` - Dependencies and scripts

---

## Getting Help

### Resources

- **Documentation**: Check `/docs` folder
- **Testing Guide**: See `docs/TESTING.md`
- **Architecture**: See `docs/ARCHITECTURE.md`

### Communication

- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Use GitHub Discussions for questions
- **Team Chat**: Contact team for urgent matters

---

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow project guidelines

---

**Thank you for contributing!** 🎉

---

**Last Updated**: February 11, 2026  
**Maintained by**: Lyne Digital Studio Team
