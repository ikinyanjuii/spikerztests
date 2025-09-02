Getting Started

Prerequisites
- [Node.js](https://nodejs.org) (v16+ recommended)
- npm (installed alongside Node.js) or Yarn
- Docker & Docker Compose
- Playwright 

Installation

```bash
git clone https://github.com/ikinyanjuii/spikerztests.git
cd spikerztests
npm install
# or yarn install

Step 1. Initialize a Node.js project
mkdir my-tests
cd my-tests
npm init -y


Install Playwright Test
npm install -D @playwright/test

Install Browsers
npx playwright install
 or
npx playwright install chromium

Create a test file and run tests 

```
Running Tests 
Locally 
npm test

Directly via Playwright
npx playwright test

Docker
docker-compose up --build
