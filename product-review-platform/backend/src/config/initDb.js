import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sqlPath = path.join(__dirname, 'init.sql');
const migrationsPath = path.join(__dirname, 'migrations.sql');

async function initializeDatabase() {
  console.log('Starting database initialization...');
  
 
  let connection;
  
  try {
   
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'password',
    });
    
   
    const sqlScript = fs.readFileSync(sqlPath, 'utf8');
    
   
    const statements = sqlScript
      .split(';')
      .filter(statement => statement.trim() !== '');
    
    for (const statement of statements) {
      await connection.query(statement);
      console.log('Executed SQL statement successfully');
    }
    
    console.log('Database initialized successfully');
    
   
    if (fs.existsSync(migrationsPath)) {
      console.log('Running database migrations...');
      
     
      const migrationsSql = fs.readFileSync(migrationsPath, 'utf8');
      
     
      const migrationStatements = migrationsSql
        .split(';')
        .filter(statement => statement.trim() !== '');
      
      for (const statement of migrationStatements) {
        if (statement.trim()) {
          try {
            await connection.query(statement);
            console.log('Executed migration statement successfully');
          } catch (error) {
           
            if (error.errno === 1060) {
              console.log('Column already exists, skipping...');
            } else if (error.errno === 1061) {
              console.log('Index already exists, skipping...');
            } else {
              console.warn('Migration statement error:', error.message);
            }
          }
        }
      }
      
      console.log('Database migrations completed successfully');
    } else {
      console.log('No migrations file found');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initializeDatabase(); 