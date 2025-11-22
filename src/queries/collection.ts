import { eq, and } from 'drizzle-orm';
import { db, userCards, cards, users } from '../db';

// Collection queries (user card collections)

export async function getUserCollection(userId: string) {
  return await db
    .select({
      userId: userCards.userId,
      cardId: userCards.cardId,
      quantity: userCards.quantity,
      card: cards,
    })
    .from(userCards)
    .innerJoin(cards, eq(userCards.cardId, cards.id))
    .where(eq(userCards.userId, userId));
}

export async function addCardToCollection(userId: string, cardId: string, quantity: number = 1) {
  // Check if card already exists in collection
  const existing = await db
    .select()
    .from(userCards)
    .where(and(eq(userCards.userId, userId), eq(userCards.cardId, cardId)));

  if (existing.length > 0) {
    // Update quantity
    await db
      .update(userCards)
      .set({ quantity: existing[0].quantity + quantity })
      .where(and(eq(userCards.userId, userId), eq(userCards.cardId, cardId)));
  } else {
    // Insert new
    await db.insert(userCards).values({
      userId,
      cardId,
      quantity,
    });
  }
}

export async function removeCardFromCollection(userId: string, cardId: string, quantity: number = 1) {
  const existing = await db
    .select()
    .from(userCards)
    .where(and(eq(userCards.userId, userId), eq(userCards.cardId, cardId)));

  if (existing.length > 0) {
    const newQuantity = existing[0].quantity - quantity;
    if (newQuantity <= 0) {
      await db
        .delete(userCards)
        .where(and(eq(userCards.userId, userId), eq(userCards.cardId, cardId)));
    } else {
      await db
        .update(userCards)
        .set({ quantity: newQuantity })
        .where(and(eq(userCards.userId, userId), eq(userCards.cardId, cardId)));
    }
  }
}
