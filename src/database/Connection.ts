import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { executeQueries, readQueries } from './queryUtils';
dotenv.config();
const conn = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  port: Number(process.env.MYSQLPORT || 3306)
});

if (['dev', 'development'].includes(process.env.NODE_ENV || 'development')) {
  const dropDatabase = readQueries('dropDatabase.sql');
  const createDatabase = readQueries('createDatabase.sql');
  executeQueries(conn, dropDatabase).then(() => executeQueries(conn, createDatabase));
}

export default conn;