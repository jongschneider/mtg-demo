# MTG Collection Database Layer

This directory contains the complete Drizzle ORM setup for the Magic: The Gathering card collection application.

## Directory Structure

```
src/
├── db/                          # Database layer
│   ├── index.ts                 # Main DB exports
│   ├── config.ts                # Database connection configuration
│   ├── schema.ts                # Table definitions (cards, users, user_cards)
│   ├── migrate.ts               # Migration runner
│   └── shared/                  # Reusable database components
│       ├── columns.ts           # Common column definitions (timestamps)
│       └── enums.ts             # Shared enums (card rarity, etc.)
├── queries/                     # Database query functions
│   ├── index.ts                 # Export all queries
│   ├── cards.ts                 # Card-related database operations
│   ├── sets.ts                  # Set-related queries
│   ├── collection.ts            # User collection management
│   └── decks.ts                 # Deck queries (placeholder)
└── types/                       # TypeScript type definitions
    └── index.ts                 # Inferred types from schemas
```

## Database Schema

### Tables

#### `cards`
- **Purpose**: Stores all Magic card data
- **Key Fields**: `id` (SHA1 hash), `name`, `manaCost`, `colors`, `type`, `setCode`, etc.
- **JSON Fields**: `colors`, `types`, `rulings`, `legalities`, etc. stored as strings

#### `users`
- **Purpose**: User accounts for the collection app
- **Key Fields**: `id`, `email` (unique), `displayName`
- **Future**: Will integrate with auth providers

#### `user_cards`
- **Purpose**: User card collections (many-to-many relationship)
- **Key Fields**: `userId`, `cardId`, `quantity`
- **Composite PK**: `(userId, cardId)`

## Getting Started

### 1. Install Dependencies
```bash
npm install drizzle-orm better-sqlite3 drizzle-kit
npm install -D @types/better-sqlite3
```

### 2. Generate Initial Migration
```bash
npx drizzle-kit generate
```

### 3. Run Migrations
```bash
npm run migrate  # or: npx tsx src/db/migrate.ts
```

### 4. Initialize Database
```typescript
import { db } from './db';

// Database is now ready to use
```

## Usage Examples

### Basic Queries

```typescript
import { getAllCards, getCardById, searchCardsByName } from './queries/cards';
import { getUserCollection, addCardToCollection } from './queries/collection';

// Get all cards
const cards = await getAllCards();

// Find a specific card
const card = await getCardById('some-card-id');

// Search cards by name
const results = await searchCardsByName('Lightning Bolt');

// Get user's collection
const collection = await getUserCollection('user-123');

// Add cards to collection
await addCardToCollection('user-123', 'card-id', 4);
```

### Working with Types

```typescript
import type { Card, NewCard, User, UserCard } from './types';

// Card type is fully typed from schema
function displayCard(card: Card) {
  console.log(`${card.name} - ${card.manaCost}`);
}

// Insert new card
const newCard: NewCard = {
  id: 'generated-id',
  name: 'New Card',
  manaCost: '{1}{W}',
  cmc: 2,
  setCode: 'NEW',
  // ... other required fields
};
```

### Direct Database Operations

```typescript
import { db, cards, users } from './db';
import { eq, and } from 'drizzle-orm';

// Insert a card
await db.insert(cards).values(newCardData);

// Update a user
await db.update(users)
  .set({ displayName: 'New Name' })
  .where(eq(users.id, 'user-id'));

// Complex query with joins
const userCards = await db
  .select()
  .from(userCards)
  .innerJoin(cards, eq(userCards.cardId, cards.id))
  .where(eq(userCards.userId, 'user-123'));
```

## Development Workflow

### Adding New Tables
1. Define the table in `src/db/schema.ts`
2. Generate migration: `npx drizzle-kit generate`
3. Update types in `src/types/index.ts` (automatic)
4. Add queries in appropriate `src/queries/` file

### Adding New Queries
1. Create or update query functions in relevant `src/queries/` file
2. Export from `src/queries/index.ts`
3. Use typed parameters and return values

### Database Configuration
- **Database**: SQLite (via better-sqlite3)
- **Migrations**: Stored in `./drizzle/` directory
- **Connection**: Single file database at `./sqlite.db`

## Migration Management

### Generate Migrations
```bash
npx drizzle-kit generate
```

### Check Migration Status
```bash
npx drizzle-kit check
```

### Push Schema Changes (Development)
```bash
npx drizzle-kit push
```

## Best Practices

1. **Always use the query functions** from `src/queries/` rather than direct DB calls
2. **Type all database operations** using the exported types from `src/types/`
3. **Keep JSON fields as strings** - parse/serialize in application logic
4. **Use transactions** for multi-step operations
5. **Test queries** with realistic data before production

## Future Extensions

- **Decks Table**: Will add deck management functionality
- **Card Instances**: More detailed tracking (condition, foil, etc.)
- **Trades**: User-to-user card trading
- **Authentication**: Integrate with auth providers for users table
- **Search**: Full-text search capabilities
