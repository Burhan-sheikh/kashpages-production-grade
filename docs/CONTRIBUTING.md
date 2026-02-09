# Contributing to KashPages

Thank you for your interest in contributing to KashPages! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Git
- Firebase account
- Cloudinary account

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/kashpages-production-grade.git
   cd kashpages-production-grade
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables (see `.env.example`)

5. Run development server:
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions/updates

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions/updates
- `chore`: Build process or auxiliary tool changes

**Examples:**
```
feat(builder): add drag-and-drop for sections
fix(auth): resolve Google sign-in redirect issue
docs(readme): update installation instructions
```

### Pull Request Process

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Run tests and linting:
   ```bash
   npm run lint
   npm run type-check
   npm test
   ```

4. Commit your changes:
   ```bash
   git commit -m "feat: add amazing feature"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request on GitHub

### Pull Request Guidelines

- Provide a clear description of the changes
- Reference related issues (e.g., "Fixes #123")
- Include screenshots for UI changes
- Ensure all tests pass
- Update documentation if needed
- Keep PRs focused and atomic

## Code Style

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type unless absolutely necessary
- Use type inference when possible

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use meaningful component names
- Extract reusable logic into custom hooks

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `kebab-case.ts`
- Hooks: `use-hook-name.ts`
- Types: `kebab-case.ts`

### Code Formatting

- We use Prettier for code formatting
- Run `npm run format` before committing
- 2 spaces indentation
- Single quotes for strings
- No semicolons

## Testing

### Writing Tests

- Write tests for new features
- Ensure existing tests pass
- Aim for >80% code coverage

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Documentation

### Code Comments

- Add JSDoc comments for functions and components
- Explain complex logic
- Keep comments up-to-date

### README Updates

- Update README for new features
- Add examples for new APIs
- Keep installation instructions current

## Project Structure

```
src/
├── app/           # Next.js App Router
├── components/    # React components
├── lib/           # Utilities and configurations
├── hooks/         # Custom React hooks
├── store/         # Zustand stores
├── types/         # TypeScript types
└── styles/        # Global styles
```

## Feature Development Guidelines

### Adding New Components

1. Create component file in appropriate directory
2. Add TypeScript interfaces for props
3. Include JSDoc comments
4. Export component
5. Add to index file if needed

### Adding New Features

1. Discuss feature in GitHub Issues first
2. Create feature branch
3. Implement feature with tests
4. Update documentation
5. Submit Pull Request

### Adding New Dependencies

1. Check if existing dependency can be used
2. Verify license compatibility
3. Consider bundle size impact
4. Document why dependency is needed

## Performance Considerations

- Optimize images using Next/Image
- Lazy load heavy components
- Minimize bundle size
- Use React.memo for expensive components
- Implement proper caching strategies

## Security Guidelines

- Never commit sensitive data
- Validate user inputs
- Sanitize data before rendering
- Follow OWASP security practices
- Report security issues privately

## Getting Help

- Check existing documentation
- Search GitHub Issues
- Ask questions in Discussions
- Join our community chat

## Recognition

Contributors will be recognized in:
- README contributors section
- GitHub contributors page
- Release notes

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to KashPages!** 🚀