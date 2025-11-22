import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from './config';

// Migration runner
async function runMigrations() {
  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migrations completed.');
}

runMigrations().catch(console.error);
