# Node.js TypeScript Express Backend

A backend project built with **Node.js**, **TypeScript**, and **Express**.

## Features

- Built with **TypeScript** for type safety
- **Express.js** for API routing
- **ESLint** and **Prettier** configured for linting and formatting
- Hot-reloading in development mode using **ts-node-dev**
- Environment variables support using **dotenv**

## Prerequisites

- [Node.js](https://nodejs.org/) >= 16.x.x
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies

```bash
npm install
```

or if you use yarn:

```bash
yarn install
```

### 3. Setup environment variables

Create a `.env` file in the root directory and add your environment variables:

```env
PORT=3000
NODE_ENV=development
# Add other variables as needed
```

### 4. Run the project in development mode

This project uses **ts-node-dev** for automatic restarts and TypeScript transpilation on the fly.

```bash
npm run dev:api
```

This will start the API at `http://localhost:3000` (or your specified port).

---

## Available Scripts

- `npm run dev:api` - Runs the API in development mode with hot-reloading.
- `npm run build` - Builds the project for production (outputs to the `dist` folder).
- `npm start` - Runs the built project from the `dist` folder.
- `npm run lint` - Runs ESLint to check for linting errors.
- `npm run format` - Formats code using Prettier.

## Project Structure

```plaintext
├── src
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── index.ts         # Entry point
├── .env
├── .eslintrc.json
├── .prettierrc
├── package.json
├── tsconfig.json
└── README.md
```

## Recommended VSCode Extensions

- ESLint
- Prettier - Code formatter
- Path Intellisense
- DotENV

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Notes

- Make sure to configure your `.env` correctly before running in any environment.
- Contributions are welcome! Feel free to submit a PR or open an issue.

---