import { text } from 'drizzle-orm/sqlite-core';

// Reusable column definitions
export const timestamps = {
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'),
};
