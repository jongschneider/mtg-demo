import { eq } from 'drizzle-orm';
import { db, cards } from '../db';

// Set-related queries
// Note: We don't have a dedicated sets table yet, so these work with cards

export async function getAllSets() {
  const result = await db
    .selectDistinct({
      setCode: cards.setCode,
      setName: cards.setName,
    })
    .from(cards)
    .where(eq(cards.setCode, cards.setCode)); // This ensures distinct

  return result;
}

export async function getSetByCode(setCode: string) {
  const result = await db
    .selectDistinct({
      setCode: cards.setCode,
      setName: cards.setName,
    })
    .from(cards)
    .where(eq(cards.setCode, setCode));

  return result[0] || null;
}

export async function getCardsInSet(setCode: string) {
  return await db.select().from(cards).where(eq(cards.setCode, setCode));
}
