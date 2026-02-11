# Troubleshooting Guide - Lyne Digital Studio

## 🔧 Common Issues & Solutions

---

## Development Issues

### Issue: `npm install` fails

**Symptoms:**
```bash
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**

1. **Clear npm cache**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

2. **Use legacy peer deps**
```bash
npm install --legacy-peer-deps
```

3. **Update npm**
```bash
npm install -g npm@latest
```

---

### Issue: `npm run dev` not starting

**Symptoms:**
- Server doesn't start
- Port already in use
- Build errors

**Solutions:**

1. **Check if port 5173 is in use**
```bash
lsof -ti:5173 | xargs kill -9
```

2. **Clear Vite cache**
```bash
rm -rf node_modules/.vite
npm run dev
```

3. **Check Node version**
```bash
node --version  # Should be v18+
```

---

### Issue: TypeScript errors

**Symptoms:**
```
TS2307: Cannot find module 'X' or its corresponding type declarations
```

**Solutions:**

1. **Restart TypeScript server** (VS Code)
   - Cmd+Shift+P → "TypeScript: Restart TS Server"

2. **Check tsconfig.json**
```json
{
    "compilerOptions": {
        "moduleResolution": "bundler",
        "types": ["vite/client", "vitest/globals"]
    }
}
```

3. **Install missing types**
```bash
npm install --save-dev @types/react @types/react-dom
```

---

## Testing Issues

### Issue: Tests failing with "Cannot find module"

**Symptoms:**
```
Error: Cannot find module '../Component'
```

**Solutions:**

1. **Check import paths**
```typescript
// ✅ Correct
import { Component } from '../Component';

// ❌ Wrong
import { Component } from '../Component.tsx';
```

2. **Clear test cache**
```bash
npx vitest --clearCache
```

3. **Check vitest.config.ts**
```typescript
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
```

---

### Issue: Tests timeout

**Symptoms:**
```
Test timed out in 5000ms
```

**Solutions:**

1. **Increase timeout**
```typescript
it('should load data', async () => {
    // test code
}, { timeout: 10000 });
```

2. **Use waitFor correctly**
```typescript
await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
}, { timeout: 5000 });
```

3. **Check for infinite loops**
```typescript
// ❌ Bad - infinite loop
useEffect(() => {
    setValue(value + 1);
}, [value]);

// ✅ Good - controlled update
useEffect(() => {
    setValue(10);
}, []);
```

---

### Issue: "act" warnings

**Symptoms:**
```
Warning: An update to Component inside a test was not wrapped in act(...)
```

**Solutions:**

1. **Use userEvent instead of fireEvent**
```typescript
// ✅ Good
const user = userEvent.setup();
await user.click(button);

// ❌ Bad
fireEvent.click(button);
```

2. **Wrap state updates in act**
```typescript
import { act } from '@testing-library/react';

act(() => {
    result.current.setValue(10);
});
```

3. **Use waitFor for async updates**
```typescript
await waitFor(() => {
    expect(screen.getByText('Updated')).toBeInTheDocument();
});
```

---

### Issue: Mock not working

**Symptoms:**
- Mock function not called
- Original implementation runs

**Solutions:**

1. **Mock before import**
```typescript
// ✅ Correct order
vi.mock('./module');
import { Component } from './Component';

// ❌ Wrong order
import { Component } from './Component';
vi.mock('./module');
```

2. **Use correct mock syntax**
```typescript
// For default export
vi.mock('./Component', () => ({
    default: vi.fn(() => <div>Mocked</div>),
}));

// For named export
vi.mock('./utils', () => ({
    myFunction: vi.fn(() => 'mocked'),
}));
```

3. **Clear mocks between tests**
```typescript
beforeEach(() => {
    vi.clearAllMocks();
});
```

---

## Build Issues

### Issue: Build fails

**Symptoms:**
```
Build failed with X errors
```

**Solutions:**

1. **Check for TypeScript errors**
```bash
npm run type-check
```

2. **Clear build cache**
```bash
rm -rf dist node_modules/.vite
npm run build
```

3. **Check for circular dependencies**
```bash
npx madge --circular src/
```

---

### Issue: Large bundle size

**Symptoms:**
- Slow page load
- Large JavaScript files

**Solutions:**

1. **Analyze bundle**
```bash
npm run build -- --mode analyze
```

2. **Code splitting**
```typescript
const Component = lazy(() => import('./Component'));
```

3. **Tree shaking**
```typescript
// ✅ Good - tree-shakeable
import { specific } from 'library';

// ❌ Bad - imports everything
import * as library from 'library';
```

---

## Runtime Issues

### Issue: Animations not working

**Symptoms:**
- No animations
- Choppy animations

**Solutions:**

1. **Check Framer Motion version**
```bash
npm list framer-motion
```

2. **Ensure proper AnimatePresence usage**
```typescript
<AnimatePresence>
    {show && <motion.div>Content</motion.div>}
</AnimatePresence>
```

3. **Check for CSS conflicts**
```css
/* Remove if present */
* {
    transition: none !important;
}
```

---

### Issue: Images not loading

**Symptoms:**
- Broken image icons
- 404 errors

**Solutions:**

1. **Check image paths**
```typescript
// ✅ Correct - from public folder
<img src="/images/hero.jpg" />

// ❌ Wrong
<img src="./images/hero.jpg" />
```

2. **Verify image exists**
```bash
ls public/images/
```

3. **Check build output**
```bash
ls dist/images/
```

---

### Issue: Scroll not working

**Symptoms:**
- Page doesn't scroll
- Smooth scroll not working

**Solutions:**

1. **Check body overflow**
```css
/* Remove if present */
body {
    overflow: hidden;
}
```

2. **Check scroll lock**
```typescript
// Ensure cleanup
useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
        document.body.style.overflow = '';
    };
}, []);
```

3. **Check smooth scroll**
```css
html {
    scroll-behavior: smooth;
}
```

---

## Performance Issues

### Issue: Slow page load

**Solutions:**

1. **Optimize images**
```bash
# Convert to WebP
npm run optimize-images
```

2. **Lazy load components**
```typescript
const Portfolio = lazy(() => import('./Portfolio'));
```

3. **Use React.memo**
```typescript
export const Component = React.memo(({ prop }) => {
    return <div>{prop}</div>;
});
```

---

### Issue: Memory leaks

**Symptoms:**
- Increasing memory usage
- Browser becomes slow

**Solutions:**

1. **Clean up event listeners**
```typescript
useEffect(() => {
    const handler = () => {};
    window.addEventListener('scroll', handler);
    
    return () => {
        window.removeEventListener('scroll', handler);
    };
}, []);
```

2. **Cancel async operations**
```typescript
useEffect(() => {
    let cancelled = false;
    
    fetchData().then(data => {
        if (!cancelled) setData(data);
    });
    
    return () => {
        cancelled = true;
    };
}, []);
```

3. **Clear intervals/timeouts**
```typescript
useEffect(() => {
    const timer = setInterval(() => {}, 1000);
    
    return () => {
        clearInterval(timer);
    };
}, []);
```

---

## Deployment Issues

### Issue: Build works locally but fails in production

**Solutions:**

1. **Check environment variables**
```bash
# Ensure all required vars are set
echo $VITE_API_URL
```

2. **Test production build locally**
```bash
npm run build
npm run preview
```

3. **Check Node version on server**
```bash
node --version  # Should match local
```

---

## Getting Help

### Before Asking for Help

1. ✅ Check this troubleshooting guide
2. ✅ Search existing issues on GitHub
3. ✅ Check console for errors
4. ✅ Try clearing cache and reinstalling

### How to Ask for Help

Include:
- Error message (full stack trace)
- Steps to reproduce
- Expected vs actual behavior
- Environment (OS, Node version, npm version)
- Code snippet (if applicable)

### Resources

- [GitHub Issues](https://github.com/yourusername/lyne/issues)
- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [React Documentation](https://react.dev/)

---

**Last Updated**: February 11, 2026  
**Maintained by**: Lyne Digital Studio Team
