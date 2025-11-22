// All inferred types
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { cards, users, userCards } from '../db/schema';

export type Card = InferSelectModel<typeof cards>;
export type NewCard = InferInsertModel<typeof cards>;

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type UserCard = InferSelectModel<typeof userCards>;
export type NewUserCard = InferInsertModel<typeof userCards>;
