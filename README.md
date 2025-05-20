# Playwright Demo Project
Demo project based on the Playwright, TypeScript, and Node.js v22+.  
As application under test was used [OWASP testing web app](https://github.com/juice-shop/juice-shop) which could be easily setup locally, and provides a possibility build UI and API tests.

## Local execution
Download and install Node.js v22 from [Nodejs.org](https://nodejs.org/en/download)

To setup application under test, to be available on your localhost, please clone repo [OWASP juice-shop](https://github.com/juice-shop/juice-shop). And follow the steps under the setup from sources section - https://github.com/juice-shop/juice-shop?tab=readme-ov-file#setup. After setup done and app process is running you should be able to open app using URL - http://localhost:3000.  

To start test run execution:  
1. Clone this repo, and `cd` to project root folder.
2. Install project dependencies using `npm install`
3. Install playwright with browsers using `npx playwright install --with-deps`
4. Start execution of all tests using `npx playwright test`  


