# README

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This README documents steps are necessary to get your application up and running.

### What is this repository for?

- Web resume of Matthieu Compérat
- [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### Prerequisites

- Node.js 22+
- Yarn 4+ (managed via corepack)

### Set up

- `yarn install`
- `yarn dev` for development
- `yarn build` for production build
- `yarn start` for production server

### Development Tools

This project uses a comprehensive set of development tools to ensure code quality and consistency:

#### ESLint Configuration

- **ESLint 9** with modern flat config format (`eslint.config.js`)
- **TypeScript support** with `@typescript-eslint` parser and plugin
- **React/Next.js** rules with `eslint-config-next`
- **Import management** with automatic sorting via `simple-import-sort`
- **Unused imports detection** with `unused-imports` plugin
- **Code quality** checks with `sonarjs` and `unicorn` plugins
- **Security** vulnerability detection with `security` plugin
- **Accessibility** rules with `jsx-a11y` plugin

#### Prettier Configuration

- **Automatic code formatting** with Prettier 3.6+
- **Tailwind CSS class sorting** via `prettier-plugin-tailwindcss`
- **Consistent styling** across JavaScript, TypeScript, JSON, and Markdown files

#### Available Scripts

- `yarn lint` - Run ESLint checks
- `yarn lint --fix` - Auto-fix ESLint issues
- `yarn format` - Format code with Prettier
- `yarn test` - Run linting and type checking
- `yarn type-check` - TypeScript type checking

All code is automatically formatted on commit via `lint-staged` and `husky`.

### Configuration

- To see which modules are outdated: `yarn outdated`
- Using yarn: `yarn upgrade-interactive`

- Database configuration
- How to run tests
- Deployment instructions

### Contribution guidelines

- Writing tests
- Code review - No Lint errors allowed
- Other guidelines

### Who do I talk to?

For any information, contact matthieu.comperat@gmail.com

### Version

- v6.0 - October 2025 (NextJS App Router - Tailwind)
- v5.0 - September 2025 (NextJS 13 - SSR/SSG)
- v4.0 - October 2020 (Gatsby)
- v3.0 - November 2018 (React)
- v2.0 - January 2016
- v1.0 - Early 2014
