import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory to start searching from
const rootDir = path.join(__dirname, 'src');

// Function to recursively find all TypeScript files
function findTsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findTsFiles(filePath, fileList);
    } else if (file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Function to fix imports in a file
function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Regular expression to match relative imports without file extensions
  // Captures: import statement, imported items, and the path
  const importRegex = /import\s+(?:(?:{[^}]*}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:{[^}]*}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"]([\.\/][^'"]*)['"]/g;
  
  const modified = content.replace(importRegex, (match, importPath) => {
    // Skip if it already has an extension
    if (importPath.endsWith('.js') || importPath.endsWith('.ts')) {
      return match;
    }
    
    // Add .js extension for relative imports
    if (importPath.startsWith('.')) {
      return match.replace(importPath, `${importPath}.js`);
    }
    
    return match;
  });
  
  // Save the file if it was modified
  if (content !== modified) {
    fs.writeFileSync(filePath, modified);
    console.log(`Fixed imports in: ${filePath}`);
  }
}

// Find all TypeScript files and fix their imports
const tsFiles = findTsFiles(rootDir);
tsFiles.forEach(fixImports);

console.log(`\nProcessed ${tsFiles.length} files.`);
console.log('Done! Now run "npm run build" to compile the project.'); 