# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Magic: The Gathering card database application using TypeScript with Drizzle ORM and SQLite.

## Tech Stack

- **Runtime**: TypeScript
- **ORM**: Drizzle ORM
- **Database**: SQLite
- **Schema**: Type-safe database schema with Drizzle Kit

## Project Structure

```
.docs/                    # Documentation only
├── sqlite_data.md        # Database schema documentation
drizzle/                  # Migration files
drizzle.config.ts         # Drizzle Kit config
justfile                  # Task runner commands
src/
├── db/
│   ├── index.ts          # DB client initialization
│   ├── config.ts         # Database configuration
│   ├── schema.ts         # Table schemas
│   ├── migrate.ts        # Migration runner
│   └── shared/
│       ├── columns.ts    # Reusable column definitions
│       └── enums.ts      # Shared enums
├── queries/
│   ├── cards.ts          # Card queries
│   ├── sets.ts           # Set queries
│   ├── collection.ts     # Collection queries
│   └── decks.ts          # Deck queries
└── types/
    └── index.ts          # Inferred types
```

## Data Model

The primary entity is the `cards` table with:
- Composite ID: SHA1 hash of setCode + cardName + cardImageName
- JSON-encoded arrays for colors, types, legalities, rulings, foreign names
- String-based power/toughness to handle special values like "*" or "1+*"

See `.docs/sqlite_data.md` for the complete schema.

## Development Commands

```bash
# Generate migrations
npx drizzle-kit generate

# Push schema to database
npx drizzle-kit push

# Open Drizzle Studio
npx drizzle-kit studio

# Run migrations
npx tsx src/db/migrate.ts
```
