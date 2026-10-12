import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

/** Shared connection pool to the Plesk-hosted MySQL/MariaDB tracking database. */
export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 5,
      maxIdle: 5,
      idleTimeout: 30_000,
    });
  }
  return pool;
}
