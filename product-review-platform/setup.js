/**
 * Simple setup script for Product Review Platform
 * 
 * This script helps beginners set up the project by:
 * 1. Installing dependencies for both frontend and backend
 * 2. Creating a basic .env file if it doesn't exist
 * 3. Building the project
 * 
 * Run with: node setup.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

// Print a section header
function printHeader(text) {
  console.log('\n' + colors.bright + colors.blue + '==================================');
  console.log(text);
  console.log('==================================' + colors.reset + '\n');
}

// Print a success message
function printSuccess(text) {
  console.log(colors.green + '✓ ' + text + colors.reset);
}

// Print an error message
function printError(text) {
  console.log(colors.red + '✗ ' + text + colors.reset);
}

// Execute a command with pretty output
function runCommand(command, directory) {
  const cwd = directory ? path.join(process.cwd(), directory) : process.cwd();
  
  console.log(colors.yellow + '$ ' + command + colors.reset);
  
  try {
    execSync(command, { 
      cwd, 
      stdio: 'inherit'
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Create a basic .env file for the backend
function createEnvFile() {
  const envPath = path.join(process.cwd(), 'backend', '.env');
  
  if (fs.existsSync(envPath)) {
    printSuccess('.env file already exists');
    return;
  }
  
  const envContent = `# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=product_reviews_db

# Mistral API Configuration (Optional)
MISTRAL_API_KEY=your_mistral_api_key

# Server Configuration
PORT=5000
NODE_ENV=development
`;

  try {
    fs.writeFileSync(envPath, envContent);
    printSuccess('Created a basic .env file in the backend directory');
    console.log(colors.yellow + 'Note: Please edit the file with your database credentials' + colors.reset);
  } catch (error) {
    printError('Failed to create .env file');
    console.error(error);
  }
}

// Main setup function
async function setup() {
  try {
    printHeader('Setting up Product Review Platform');
    
    // Install backend dependencies
    printHeader('Installing backend dependencies');
    if (runCommand('npm install', 'backend')) {
      printSuccess('Backend dependencies installed');
    } else {
      printError('Failed to install backend dependencies');
    }
    
    // Create .env file
    printHeader('Setting up environment');
    createEnvFile();
    
    // Install frontend dependencies
    printHeader('Installing frontend dependencies');
    if (runCommand('npm install', 'frontend')) {
      printSuccess('Frontend dependencies installed');
    } else {
      printError('Failed to install frontend dependencies');
    }
    
    // Build backend
    printHeader('Building backend');
    if (runCommand('npm run build', 'backend')) {
      printSuccess('Backend built successfully');
    } else {
      printError('Failed to build backend');
    }
    
    printHeader('Setup Complete!');
    console.log(`
${colors.green}What's next?${colors.reset}

1. Edit the ${colors.bright}backend/.env${colors.reset} file with your database credentials
2. Start the backend: ${colors.yellow}cd backend && npm run dev${colors.reset}
3. Start the frontend: ${colors.yellow}cd frontend && npm run dev${colors.reset}
4. Open your browser and go to ${colors.blue}http://localhost:5173${colors.reset}

Enjoy your Product Review Platform!
`);
    
  } catch (error) {
    printError('Setup failed');
    console.error(error);
  } finally {
    rl.close();
  }
}

setup(); 