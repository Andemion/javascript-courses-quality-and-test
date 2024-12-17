## 🎮 Hangman Game  
![Test Status](https://github.com/andemion/javascript-courses-quality-and-test/actions/workflows/node.js.yml/badge.svg)
![Branches](./badges/coverage-branches.svg)
![Functions](./badges/coverage-functions.svg)
![Lines](./badges/coverage-lines.svg)
![Statements](./badges/coverage-statements.svg)
![Coverage total](./badges/coverage-total.svg)

Welcome to the **Hangman Game** project! This is a small but powerful implementation of the classic Hangman game written in **JavaScript**.  
The primary goal is to practice **Test-Driven Development (TDD)** using **Jest** and end-to-end testing with **Playwright**.

---

## 📋 Table of Contents
1. [🚀 Getting Started](#-getting-started)  
2. [🧪 Running Tests](#-running-tests)  
3. [📁 Project Structure](#-project-structure)  
4. [🛠️ Tools Used](#%ef%b8%8f-tools-used)
5. [📊 Test Results](#-test-results)  
6. [📩 Contributing](#-contributing)
7. [📜 License](#-license)

---

## 🚀 Getting Started

### Prerequisites

1. Install **Node.js** (v20 or higher).
2. Clone the repository:
   ```bash
   git clone https://github.com/andemion/javascript-courses-quality-and-test.git
   cd javascript-courses-quality-and-test
   ```

3. Copy the `.env.example` file to `.env` and set the `PORT` variable to `3030`.

---

### Running the Game

Start the game server using the following command:

```bash
npm start
```

Visit the game in your browser at:

🌐 [http://localhost:3030](http://localhost:3030)

---

## 🧪 Running Tests

This project supports both unit tests (**Jest**) and end-to-end tests (**Playwright**). Use the following commands to run the tests:

| **Test Type**       | **Command**                  | **Description**                              |
|----------------------|-----------------------------|---------------------------------------------|
| **Unit Tests**       | `npm run test:unit`         | Runs Jest unit tests and shows coverage.    |
| **E2E Tests**        | `npm run test:e2e`          | Runs Playwright end-to-end tests.           |
| **All Tests**        | `npm run test:all`          | Runs all tests (unit + e2e).                |

---

## 📁 Project Structure

The project is organized as follows:

```plaintext
javascript-courses-quality-and-test/
├── public/          # Static assets (HTML, CSS, JS)
├── views/           # EJS templates for the interface
├── test/            # Jest & Playwright test files
│   ├── jest/        # Jest unit tests
│   └── playwright/  # Playwright end-to-end tests
├── game.js          # Core game logic
├── tools.js         # Utility functions
├── index.js         # Main server file
└── .env.example     # Example environment file
```

---

## 🛠️ Tools Used

| **Tool/Library**         | **Purpose**                      | **Documentation**                  |
|---------------------------|----------------------------------|------------------------------------|
| [**Node.js**](https://nodejs.org/)      | JavaScript runtime environment       | [Node.js Docs](https://nodejs.org/) |
| [**Express.js**](https://expressjs.com/) | Web server framework                 | [Express Docs](https://expressjs.com/) |
| [**Jest**](https://jestjs.io/)          | Unit testing framework               | [Jest Docs](https://jestjs.io/)     |
| [**Playwright**](https://playwright.dev/) | End-to-end testing                   | [Playwright Docs](https://playwright.dev/) |

---

## 📊 Test Results

![Test Status](https://github.com/andemion/javascript-courses-quality-and-test/actions/workflows/node.js.yml/badge.svg)

For the latest test results, visit the [GitHub Actions Page](https://github.com/andemion/javascript-courses-quality-and-test/actions).

---

## 📩 Contributing

Feel free to fork this project, submit issues, or propose improvements. Contributions are always welcome!  

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Make changes and commit:
   ```bash
   git commit -m "Add my new feature"
   ```
4. Push your branch:
   ```bash
   git push origin feature/my-feature
   ```

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

### 🎉 Thank You for Visiting!

Have fun playing and improving the **Hangman Game**! 😊
