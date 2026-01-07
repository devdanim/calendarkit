# Contributing to CalendarKit Pro

Thank you for your interest in contributing to CalendarKit Pro! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/calendarkit-pro.git
   cd calendarkit-pro
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Development Workflow

### Running the Demo App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the demo application.

### Building the Library

```bash
npm run build:lib
```

This generates the distributable files in the `dist/` directory.

### Code Style

- We use TypeScript for type safety
- Follow the existing code patterns
- Use meaningful variable and function names
- Add comments for complex logic

## Submitting Changes

### Pull Request Process

1. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

3. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Open a Pull Request against the `main` branch

### Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add recurring event support
fix: correct timezone offset calculation
docs: update README with new props
```

## Reporting Issues

### Bug Reports

When reporting a bug, please include:

1. A clear description of the issue
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Browser/environment information
6. Code samples if applicable

### Feature Requests

We welcome feature requests! Please provide:

1. A clear description of the feature
2. Use cases and benefits
3. Any implementation suggestions (optional)

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on the best outcome for the project

## Questions?

If you have questions, feel free to:

- Open an issue with the "question" label
- Start a discussion in the GitHub Discussions tab

Thank you for contributing!
