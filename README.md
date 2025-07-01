# Playwright Demo Project

This project is a demonstration of using Playwright with TypeScript and Node.js v22+ for automated testing. It tests the [OWASP Juice Shop](https://github.com/juice-shop/juice-shop).

## Project Structure

```
api-fixtures/         # Contains API-related fixtures for tests
ui-fixtures/          # Contains UI-related fixtures for tests
base/                 # Base components used by over the framework
components/           # Reusable UI components like page headers etc.
pages/                # Page Object Models for different pages in the application
tests/                # Contains test scripts
types/                # TypeScript type definitions
```

## Local Execution

1. **Setup Application Under Test**:
   - Clone the [OWASP Juice Shop](https://github.com/juice-shop/juice-shop) repository.
   - Follow the setup instructions in the repository to run the application locally.
   - Ensure the application is accessible at `http://localhost:3000`.

2. **Setup This Project**:
   - Clone this repository and navigate to the project root folder.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Install Playwright and browsers:
     ```bash
     npx playwright install --with-deps
     ```

3. **Run Tests**:
   - Execute all tests:
     ```bash
     npx playwright test
     ```

## GitHub Actions CI

This project uses GitHub Actions to automatically run Playwright tests on every push and pull request to the `main` branch. The workflow is defined in `.github/workflows/playwright.yml` and includes the following steps:

- **Checkout code**: Uses the latest code from the repository.
- **Setup Node.js**: Installs the latest LTS version of Node.js.
- **Install dependencies**: Runs `npm ci` to install project dependencies.
- **Install Playwright browsers**: Installs the Chromium browser for testing.
- **Clone and start Juice Shop**: Clones the Juice Shop repository, installs its dependencies, and starts the server. Waits until the app is available at `http://localhost:3000`.
- **Run Playwright tests**: Executes all Playwright tests in CI mode.
- **Publish JUnit summary**: Publishes a JUnit test summary to the GitHub PR.
- **Upload Playwright report**: Uploads the Playwright HTML report as a workflow artifact for later review if there were failed tests.

This ensures that all tests are run in a clean environment and results are available for every code change.

## Additional Notes

- Test reports are generated in the `playwright-report/` folder.
- Snapshots for visual regression testing are stored in the `tests/signup.test.ts-snapshots/` folder.
- The project is designed to be modular, with reusable components and page objects.


