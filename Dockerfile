# Use official Playwright base image (with browsers preinstalled)
FROM mcr.microsoft.com/playwright:v1.49.0-jammy

# Set working directory
WORKDIR /app

# Copy only package.json and lock file first (for caching deps)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Run Playwright install (ensures all browsers/fonts are present)
RUN npx playwright install --with-deps

# Run tests by default
CMD ["npx", "playwright", "test", "--reporter=line"]

