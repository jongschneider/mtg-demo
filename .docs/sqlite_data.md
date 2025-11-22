# Magic The Gathering Data Schema
```sql
CREATE TABLE cards (
    -- Primary identifier
    id TEXT PRIMARY KEY,                    -- SHA1 hash: setCode + cardName + cardImageName
    
    -- Basic card information
    name TEXT NOT NULL,
    names TEXT,                             -- JSON array for split/flip cards ["Side A", "Side B"]
    mana_cost TEXT,                         -- e.g., "{3}{U}{U}"
    cmc REAL,                               -- Converted mana cost (float for fractional costs)
    
    -- Colors
    colors TEXT,                            -- JSON array: ["White","Blue","Red"]
    color_identity TEXT,                    -- JSON array: ["W","U","R"]
    
    -- Type information
    type TEXT,                              -- Full type line: "Legendary Creature — Angel"
    supertypes TEXT,                        -- JSON array: ["Legendary"]
    types TEXT,                             -- JSON array: ["Creature"]
    subtypes TEXT,                          -- JSON array: ["Angel"]
    
    -- Card text
    text TEXT,                              -- Oracle text
    flavor TEXT,                            -- Flavor text
    original_text TEXT,                     -- Original printed text
    original_type TEXT,                     -- Original printed type
    
    -- Stats (creatures/planeswalkers/vanguard)
    power TEXT,                             -- String because can be "*" or "1+*"
    toughness TEXT,                         -- String because can be "*" or "1+*"
    loyalty TEXT,                           -- Planeswalker loyalty
    hand TEXT,                              -- Vanguard hand modifier
    life TEXT,                              -- Vanguard life modifier
    
    -- Set information
    set_code TEXT NOT NULL,                 -- Set code (e.g., "SOI")
    set_name TEXT,                          -- Set name
    rarity TEXT,                            -- Common, Uncommon, Rare, Mythic Rare
    number TEXT,                            -- Collector number (string: can have letters)
    artist TEXT,
    
    -- Card layout and special attributes
    layout TEXT,                            -- normal, split, flip, double-faced, etc.
    multiverseid INTEGER,                   -- Gatherer multiverseid
    variations TEXT,                        -- JSON array of multiverseids for alternate art
    watermark TEXT,
    border TEXT,                            -- black, white, silver
    timeshifted BOOLEAN DEFAULT 0,
    reserved BOOLEAN DEFAULT 0,             -- Reserved list status
    starter BOOLEAN DEFAULT 0,              -- Core box set only
    
    -- Images and URLs
    image_url TEXT,
    
    -- Promo/Special release info
    release_date TEXT,                      -- YYYY-MM-DD (for promo cards)
    source TEXT,                            -- Where promo was obtained
    
    -- Printings
    printings TEXT,                         -- JSON array of set codes where printed
    
    -- Legalities
    legalities TEXT,                        -- JSON: [{"format":"Standard","legality":"Legal"}]
    
    -- Foreign names
    foreign_names TEXT,                     -- JSON: [{"name":"X","language":"Y","multiverseid":Z}]
    
    -- Rulings
    rulings TEXT,                           -- JSON: [{"date":"YYYY-MM-DD","text":"ruling"}]
    
    -- Metadata
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

## Users

```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,                    -- UUID or auth provider sub
    email TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

## User Collections

```sql
CREATE TABLE user_cards (
    user_id TEXT NOT NULL REFERENCES users(id),
    card_id TEXT NOT NULL REFERENCES cards(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    -- Optional: is_foil BOOLEAN DEFAULT 0,  -- Future extension for foil tracking
    PRIMARY KEY (user_id, card_id)
);
```

## Project structure (Drizzle + TypeScript)

This is a simple baseline way to organize our Drizzle + TypeScript MTG app, to be used later when implementing the code.

```

src/



├── db/

│   ├── index.ts                 # DB client initialization & export

│   ├── config.ts                # Database configuration

│   ├── schema.ts                # ALL table schemas in one file

│   ├── migrate.ts               # Migration runner

│   └── shared/

│       ├── columns.ts           # Reusable column definitions

│       └── enums.ts             # Shared enums

├── queries/

│   ├── index.ts                 # Export all queries

│   ├── cards.ts                 # Card-related queries

│   ├── sets.ts                  # Set-related queries

│   ├── collection.ts            # Collection queries

│   └── decks.ts                 # Deck queries

├── types/

│   └── index.ts                 # All inferred types

└── drizzle.config.ts            # Drizzle Kit configuration

```