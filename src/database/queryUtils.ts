import fs from 'fs';
import { Pool } from 'mysql2/promise';
import path from 'path';
import connection from './Connection';

export function readQueries(filePath = 'createDatabase.sql') {
  const importPath = path.resolve(__dirname, filePath);
  const seedDBContent = fs.readFileSync(importPath).toString();
  const queries = seedDBContent.split(';').filter((p) => p.trim());
  return queries;
}

export async function executeQueries(
  conn: Pool,
  queries = readQueries()
) {
  try {
    for (let i = 0; i < queries.length; i += 1) {
      const query = queries[i];
      await conn.query(query);
    }
  } catch (error) {
    console.error('Banco Falha em executar queries', error);
  }
}

if (require.main === module) {
  executeQueries(connection)
    .then(async () => {
      console.info('Queries executadas com sucesso');
      await connection.end();
      process.exit(0);
    });
}