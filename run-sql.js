import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

async function runSqlScript() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    const sql = fs.readFileSync(path.join(process.cwd(), 'database.sql'), 'utf8');
    await client.query(sql);
    console.log('database.sql executed successfully.');
  } catch (err) {
    console.error('Error executing database.sql:', err);
  } finally {
    await client.end();
  }
}

runSqlScript();
