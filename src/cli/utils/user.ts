import { eq } from 'drizzle-orm';
import { db, users } from '../../db';

/**
 * Default test user configuration
 */
const DEFAULT_USER = {
  id: 'test-user-001',
  email: 'test@example.com',
  displayName: 'Test User',
};

/**
 * Gets or creates the default test user
 * @returns The user ID of the default test user
 */
export async function getDefaultUser(): Promise<string> {
  // Try to find existing user
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.id, DEFAULT_USER.id))
    .limit(1);

  if (existingUser.length > 0) {
    return existingUser[0].id;
  }

  // Create new user if doesn't exist
  await db.insert(users).values(DEFAULT_USER);

  return DEFAULT_USER.id;
}
