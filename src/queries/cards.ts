import { eq, like, and } from 'drizzle-orm';
import { db, cards } from '../db';

// Card-related queries

export async function getAllCards() {
  return await db.select().from(cards);
}

export async function getCardById(id: string) {
  const result = await db.select().from(cards).where(eq(cards.id, id));
  return result[0] || null;
}

export async function searchCardsByName(name: string) {
  return await db.select().from(cards).where(like(cards.name, `%${name}%`));
}

export async function getCardsBySet(setCode: string) {
  return await db.select().from(cards).where(eq(cards.setCode, setCode));
}

export async function getCardsByColor(color: string) {
  // Note: This assumes colors is stored as JSON string, you might need to parse it
  return await db.select().from(cards).where(like(cards.colors, `%${color}%`));
}
