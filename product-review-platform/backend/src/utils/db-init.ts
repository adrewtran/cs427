import pool from '../config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PoolConnection } from 'mysql2/promise';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const initializeDatabase = async (): Promise<void> => {
  const connection = await pool.getConnection();
  
  try {
    console.log('Initializing database...');
    
   
    const sqlFilePath = path.join(__dirname, '..', 'config', 'init.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
   
    const statements = sqlContent
      .replace(/--.*$/gm, '')
      .split(';')
      .filter(statement => statement.trim() !== '');
    
   
    for (const statement of statements) {
      await connection.query(statement);
    }
    
    console.log('Database initialized successfully.');
    
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    connection.release();
  }
};


if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log('Running database initialization and migrations...');
  
  initializeDatabase()
    .then(() => {
      console.log('Database initialization and migrations completed successfully.');
      process.exit(0);
    })
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
} 