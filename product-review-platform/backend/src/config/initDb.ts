import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function initializeDatabase(): Promise<void> {
  console.log('Starting database initialization...');

  let connection: mysql.Connection | undefined;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'password',
    });

    const dbName = process.env.DB_NAME;
    if (!dbName) {
      console.error('Error: DB_NAME environment variable is not set.');
      return;
    }

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database '${dbName}' created or already exists.`);

  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed.');
    }
  }
}

initializeDatabase();
