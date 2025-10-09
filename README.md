# Matthieu Compérat - Resume

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

A modern, responsive web resume built with Next.js App Router, TypeScript, and Tailwind CSS v4. This project showcases Matthieu Compérat's professional experience as a Frontend Developer.

## ✨ Features

- 🌐 **Internationalization**: Support for English and French languages
- 📱 **Responsive Design**: Optimized for all device sizes
- ⚡ **Modern Stack**: Next.js 15 with App Router, React 19, and TypeScript
- 🎨 **Tailwind CSS v4**: Latest Tailwind with native CSS @theme support
- 🔧 **Developer Experience**: ESLint 9, Prettier, Husky, and lint-staged
- 🚀 **Performance**: Server-side rendering and static generation capabilities
- ♿ **Accessibility**: Built with accessibility best practices

## 🛠 Tech Stack

- **Framework**: Next.js 15.5 with App Router
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4.1 with PostCSS
- **Runtime**: React 19
- **Package Manager**: Yarn 4+ (managed via corepack)
- **Node.js**: 22+

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- Yarn 4+ (automatically managed via corepack)

### Installation

1. Clone the repository:

```bash
git clone git@github.com:Mitchnsun/mcomperat.git
cd mcomperat
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint checks
- `yarn lint --fix` - Auto-fix ESLint issues
- `yarn format` - Format code with Prettier
- `yarn test` - Run linting and type checking
- `yarn type-check` - TypeScript type checking

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles with Tailwind imports
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Homepage (redirects to /fr)
│   ├── not-found.tsx      # 404 page
│   ├── en/                # English pages
│   └── fr/                # French pages
├── components/            # Reusable React components
│   ├── layout.tsx         # Layout components
│   ├── seo.tsx           # SEO components
│   ├── card/             # Card components
│   ├── heading/          # Heading components
│   ├── post/             # Blog post components
│   ├── tag/              # Tag components
│   └── assets/           # Component assets
├── public/               # Static assets
│   └── data/            # JSON data files (en.json, fr.json)
├── types/               # TypeScript type definitions
└── docs/                # Project documentation
```

## 🔧 Development Tools

This project uses a comprehensive set of development tools to ensure code quality and consistency:

### Code Quality & Linting

- **ESLint 9** with modern flat config format (`eslint.config.js`)
- **TypeScript support** with `@typescript-eslint` parser and plugin
- **Next.js** optimized rules with `eslint-config-next`
- **Import management** with automatic sorting via `simple-import-sort`
- **Unused imports detection** with `unused-imports` plugin
- **Code quality** checks with `sonarjs` and `unicorn` plugins
- **Security** vulnerability detection with `security` plugin
- **Accessibility** rules with `jsx-a11y` plugin

### Code Formatting

- **Prettier 3.6+** for consistent code formatting
- **Tailwind CSS class sorting** via `prettier-plugin-tailwindcss`
- **Multi-language support** for JavaScript, TypeScript, JSON, CSS, and Markdown
- **Git hooks** with Husky and lint-staged for pre-commit formatting

### Styling Architecture

- **Tailwind CSS v4** with native CSS support
- **Custom theme configuration** using CSS `@theme` directive
- **PostCSS integration** with `@tailwindcss/postcss`
- **Responsive design** utilities and components

## 🌐 Internationalization

The project supports multiple languages through a file-based approach:

- **English**: `/en` routes with `public/data/en.json`
- **French**: `/fr` routes with `public/data/fr.json`
- **Default language**: French (homepage redirects to `/fr`)

## ⚙️ Configuration

### Package Management

- Check outdated modules: `yarn outdated`
- Interactive updates: `yarn upgrade-interactive`

### Environment Requirements

- Node.js 22+ (specified in `engines`)
- Yarn 4+ managed via `packageManager` field

## 🚀 Deployment

The project is configured for deployment on platforms like Vercel, Netlify, or any Node.js hosting service:

1. **Build the project**:

   ```bash
   yarn build
   ```

2. **Start production server**:

   ```bash
   yarn start
   ```

3. **Static export** (if needed):
   Configure `next.config.ts` for static export and use `next export`

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Code Quality**: All code must pass ESLint checks with zero errors
2. **Formatting**: Code is automatically formatted via Prettier on commit
3. **Type Safety**: Maintain TypeScript strict mode compliance
4. **Testing**: Run `yarn test` to ensure linting and type checking pass
5. **Commits**: Use conventional commit messages

### Development Workflow

1. Fork and clone the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes and test locally
4. Commit with pre-commit hooks (automatic formatting)
5. Push and create a pull request

## 📧 Contact

For any questions or information, please contact:
**Matthieu Compérat** - [matthieu.comperat@gmail.com](mailto:matthieu.comperat@gmail.com)

- 🌐 Website: [www.mcomper.at](http://www.mcomper.at)
- 💼 LinkedIn: [@matthieucomperat](https://www.linkedin.com/in/matthieucomperat/)
- 🐙 GitHub: [@Mitchnsun](https://github.com/Mitchnsun)

## 📈 Version History

- **v6.0** - October 2025: Next.js 15 App Router + Tailwind CSS v4
- **v5.0** - September 2025: Next.js 13 with SSR/SSG
- **v4.0** - October 2020: Gatsby migration
- **v3.0** - November 2018: React implementation
- **v2.0** - January 2016: Major redesign
- **v1.0** - Early 2014: Initial version

## 📄 License

This project is licensed under the ISC License - see the [package.json](package.json) for details.
