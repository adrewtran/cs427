// This is a simple script to start the server without ESM-related issues
// It delegates to ts-node for TypeScript compilation but avoids some common pitfalls

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { join } from 'path';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set custom NODE_OPTIONS to avoid warnings
process.env.NODE_OPTIONS = '--no-warnings';

console.log('Starting server in development mode...');

try {
  // Run the TypeScript file directly
  const command = 'node --loader ts-node/esm src/index.ts';
  
  console.log(`Executing: ${command}`);
  execSync(command, { 
    stdio: 'inherit', 
    cwd: __dirname 
  });
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
} 