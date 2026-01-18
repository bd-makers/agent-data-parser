# Agent Guidelines: Bodoc Agent Parser

This repository is a monorepo for the Bodoc Agent Parser, supporting both React Native and Web platforms.

## Project Structure

- `packages/core`: Platform-agnostic parsing logic and utilities.
- `packages/renderers`: Shared interfaces, design tokens, and base types.
- `packages/react-native`: React Native implementation of components and renderers.
- `packages/web`: Web (React DOM) implementation of components and renderers.

## Development Commands

### Environment Setup

```bash
npm install
```

### Build

```bash
npm run build           # Build all packages
npm run build:core      # Build core only
npm run build:renderers # Build renderers only
```

### Linting & Formatting

```bash
npm run lint           # Run ESLint
npm run lint:fix       # Run ESLint and fix issues
npm run type-check     # Run TypeScript type checking across all packages
```

### Testing

```bash
npm run test           # Run all tests via Jest
npx jest <path_to_test> # Run a specific test file
```

## Code Style & Conventions

### 1. TypeScript & Types

- **Strict Typing**: Always use TypeScript. Avoid `any` at all costs (`@typescript-eslint/no-explicit-any`: error).
- **Type-only Imports**: Use `import type` for importing types to avoid circular dependencies and reduce bundle size (`@typescript-eslint/consistent-type-imports`: error).
  ```typescript
  import type { ReactNode } from 'react';
  import type { IRendererContext } from '@aijinet/bodoc-agent-parser-renderers';
  ```
- **Unused Variables**: Prefix unused variables with `_` (e.g., `_context`) to satisfy `@typescript-eslint/no-unused-vars`.
- **Explicit Returns**: Always define explicit return types for functions.
- **Interfaces vs Types**: Use `interface` for component props and theme definitions. Use `type` for unions, aliases, and utility types.
- **Interface Naming**: Shared interfaces in `packages/renderers` should be prefixed with `I` (e.g., `IViewProps`, `ITheme`).

### 2. Naming & Formatting

- **Formatting**: Managed by Prettier. Use single quotes (`'`), 2 spaces, semi-colons, and a 100 character print width.
- **Files**: Use `camelCase` for utilities/parsers (e.g., `htmlParser.ts`) and `PascalCase` for React components (e.g., `BDView.tsx`).
- **Variables & Functions**: Use `camelCase`.
- **Components**: Use `PascalCase` (e.g., `BDView`, `BDText`).
- **Constants**: Use `UPPER_SNAKE_CASE` for global constants.
- **Equality**: Always use strict equality (`===`) as per `eqeqeq` ESLint rule.

### 3. Imports & Exports

- **Workspace Packages**: Use absolute imports for cross-package dependencies.
  - `@aijinet/bodoc-agent-parser`
  - `@aijinet/bodoc-agent-parser-renderers`
- **Internal Imports**: Use relative paths for files within the same package.
- **Index Files**: Use `index.ts` to export the public API of a directory or package.

### 4. React Components

- **Functional Components**: Use arrow functions for components.
- **Memoization**: Wrap components in `memo()` to prevent unnecessary re-renders, especially for core UI components.
- **Prop Patterns**:
  - Prefer spreading `...rest` props to the underlying native/web component.
  - Use `useMemo` for style calculations that depend on multiple props.
- **Style Props**: Follow the design token pattern established in `BDView` (e.g., `m`, `p`, `flex`, `gap` props).

### 5. Error Handling & Safety

- **Optional Chaining**: Use `?.` and `??` liberally to handle potentially null/undefined values from parsers.
- **RegExp Safety**: When using `exec()` or `match()`, always check for null before accessing groups.
- **No Side Effects**: Parsers and utilities should be pure functions.

## Testing Guidelines

- **Location**: Place tests in a `__tests__` directory relative to the file being tested.
- **Suffix**: Use `.test.ts` or `.test.tsx` for test files.
- **Pattern**:
  - Use `describe` for grouping tests by function/component.
  - Use `it` or `test` for individual test cases.
- **Mocks**: Use Jest's mocking capabilities for platform-specific dependencies if needed in core logic.

## AI Assistant Best Practices

- When modifying parsers in `packages/core`, ensure they remain platform-agnostic.
- When adding UI components, ensure consistency between `react-native` and `web` implementations by following the interfaces defined in `renderers`.
- Always run `npm run type-check` after making changes to ensure cross-package type safety.
