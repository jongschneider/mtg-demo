import { sqliteTable, text, real, integer, primaryKey } from 'drizzle-orm/sqlite-core';

// Cards table
export const cards = sqliteTable('cards', {
  // Primary identifier
  id: text('id').primaryKey(), // SHA1 hash: setCode + cardName + cardImageName

  // Basic card information
  name: text('name').notNull(),
  names: text('names'), // JSON array for split/flip cards ["Side A", "Side B"]
  manaCost: text('mana_cost'), // e.g., "{3}{U}{U}"
  cmc: real('cmc'), // Converted mana cost (float for fractional costs)

  // Colors
  colors: text('colors'), // JSON array: ["White","Blue","Red"]
  colorIdentity: text('color_identity'), // JSON array: ["W","U","R"]

  // Type information
  type: text('type'), // Full type line: "Legendary Creature — Angel"
  supertypes: text('supertypes'), // JSON array: ["Legendary"]
  types: text('types'), // JSON array: ["Creature"]
  subtypes: text('subtypes'), // JSON array: ["Angel"]

  // Card text
  text: text('text'), // Oracle text
  flavor: text('flavor'), // Flavor text
  originalText: text('original_text'), // Original printed text
  originalType: text('original_type'), // Original printed type

  // Stats (creatures/planeswalkers/vanguard)
  power: text('power'), // String because can be "*" or "1+*"
  toughness: text('toughness'), // String because can be "*" or "1+*"
  loyalty: text('loyalty'), // Planeswalker loyalty
  hand: text('hand'), // Vanguard hand modifier
  life: text('life'), // Vanguard life modifier

  // Set information
  setCode: text('set_code').notNull(), // Set code (e.g., "SOI")
  setName: text('set_name'), // Set name
  rarity: text('rarity'), // Common, Uncommon, Rare, Mythic Rare
  number: text('number'), // Collector number (string: can have letters)
  artist: text('artist'),

  // Card layout and special attributes
  layout: text('layout'), // normal, split, flip, double-faced, etc.
  multiverseid: integer('multiverseid'), // Gatherer multiverseid
  variations: text('variations'), // JSON array of multiverseids for alternate art
  watermark: text('watermark'),
  border: text('border'), // black, white, silver
  timeshifted: integer('timeshifted', { mode: 'boolean' }).default(false),
  reserved: integer('reserved', { mode: 'boolean' }).default(false), // Reserved list status
  starter: integer('starter', { mode: 'boolean' }).default(false), // Core box set only

  // Images and URLs
  imageUrl: text('image_url'),

  // Promo/Special release info
  releaseDate: text('release_date'), // YYYY-MM-DD (for promo cards)
  source: text('source'), // Where promo was obtained

  // Printings
  printings: text('printings'), // JSON array of set codes where printed

  // Legalities
  legalities: text('legalities'), // JSON: [{"format":"Standard","legality":"Legal"}]

  // Foreign names
  foreignNames: text('foreign_names'), // JSON: [{"name":"X","language":"Y","multiverseid":Z}]

  // Rulings
  rulings: text('rulings'), // JSON: [{"date":"YYYY-MM-DD","text":"ruling"}]

  // Metadata
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'),
});

// Users table
export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // UUID or auth provider sub
  email: text('email').unique().notNull(),
  displayName: text('display_name').notNull(),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'),
});

// User collections table
export const userCards = sqliteTable('user_cards', {
  userId: text('user_id').notNull().references(() => users.id),
  cardId: text('card_id').notNull().references(() => cards.id),
  quantity: integer('quantity').notNull().default(1),
  // Optional: isFoil: integer('is_foil', { mode: 'boolean' }).default(false), // Future extension
}, (table) => ({
  pk: primaryKey(table.userId, table.cardId), // Composite primary key
}));
