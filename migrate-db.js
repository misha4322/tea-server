import pool from './db.js';
import fs from 'fs';

const runMigrations = async () => {
  const client = await pool.connect();
  try {
    const sql = fs.readFileSync('schema.sql', 'utf8');
    await client.query(sql);
    console.log('Миграции успешно выполнены');
  } catch (error) {
    console.error('Ошибка миграций:', error);
  } finally {
    client.release();
    pool.end();
  }
};

runMigrations();
