import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  use: {
    headless: false,   // run visibly (set to true for CI)
    baseURL: 'https://demo.spikerz.com',
    screenshot: 'on',
    video: 'on',
  },
});
