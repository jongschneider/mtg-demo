# MTG Collection CLI

A command-line interface for managing your Magic: The Gathering card collection using the database layer.

## Features

- **Add Cards**: Store card information in the database
- **Manage Collection**: Add cards to your personal collection with quantities
- **View Collection**: Display your collection in table or JSON format
- **Type Safe**: Full TypeScript integration with the database schema

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Database**:
   ```bash
   just db-setup
   ```

## Usage

All commands are run through the main CLI script:

```bash
npm run cli -- <command> [options]
```

**Note**: The `--` is important to separate npm arguments from CLI arguments.

### Available Commands

#### `add-card`

Add a new card to the database.

**Required Options:**
- `--name`: Card name
- `--set-code`: Set code (e.g., M21, WAR)

**Optional Options:**
- `--mana-cost`: Mana cost (e.g., "{1}{W}")
- `--cmc`: Converted mana cost (numeric)
- `--type`: Card type line (e.g., "Instant", "Creature — Angel")
- `--text`: Card text/oracle text
- `--power`: Creature power
- `--toughness`: Creature toughness
- `--rarity`: Rarity (Common, Uncommon, Rare, Mythic Rare)

**Examples:**
```bash
# Add a simple instant
npm run cli -- add-card --name "Lightning Bolt" --set-code "M21" --mana-cost "{R}" --cmc 1 --type "Instant" --rarity "Common"

# Add a creature
npm run cli -- add-card --name "Serra Angel" --set-code "M21" --mana-cost "{3}{W}{W}" --cmc 5 --type "Creature — Angel" --power 4 --toughness 4 --rarity "Uncommon"
```

#### `add-to-collection`

Add cards to your collection.

**Required Options:**
- `--card-id`: The card ID (shown when adding cards, or use database queries to find IDs)

**Optional Options:**
- `--quantity`: Number of copies to add (default: 1)

**Examples:**
```bash
# Add one copy
npm run cli -- add-to-collection --card-id "8ee2d01897f5e6326967fd4f4f46f2bbf44a9d77"

# Add multiple copies
npm run cli -- add-to-collection --card-id "8ee2d01897f5e6326967fd4f4f46f2bbf44a9d77" --quantity 4
```

#### `list-collection`

View your card collection.

**Optional Options:**
- `--format`: Output format - "table" (default) or "json"

**Examples:**
```bash
# View in table format (default)
npm run cli -- list-collection

# View in JSON format
npm run cli -- list-collection --format json
```

**Sample Table Output:**
```
Card Name                       Quantity    Set Code
------------------------------------------------------
Lightning Bolt                         4         M21
Serra Angel                            2         M21
```

## User Management

The CLI automatically creates and uses a default test user:
- **ID**: `test-user-001`
- **Email**: `test@example.com`
- **Display Name**: `Test User`

All collection operations apply to this default user. Future versions may support multiple users.

## Card IDs

Cards are identified by SHA1 hash IDs generated from:
- Set code + Card name (plus image name when available)

Example: `8ee2d01897f5e6326967fd4f4f46f2bbf44a9d77` for "Lightning Bolt" from M21.

## Development

### Building

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
npm run lint -- --fix  # Auto-fix issues
```

### Testing

```bash
# Setup fresh database for testing
just db-reset

# Run tests (when implemented)
npm test
```

## Database Integration

The CLI integrates with the existing database layer:

- Uses `src/db/` for database connections
- Uses `src/queries/` for data operations
- Uses `src/types/` for TypeScript types
- Maintains transaction safety and proper error handling

## Architecture

```
src/cli/
├── index.ts              # Main CLI entry point
├── commands/             # Individual command implementations
│   ├── add-card.ts
│   ├── add-to-collection.ts
│   └── list-collection.ts
└── utils/
    └── user.ts           # Default user management
```

Each command extends Clipanion's `Command` class and defines:
- `static paths`: Command names
- Options using `Option.*` helpers
- `execute()`: Main command logic

## Future Enhancements

- Card search functionality
- Bulk import operations
- Collection statistics
- Multiple user support
- Export functionality
- Advanced filtering options

## Troubleshooting

### Command not found
Make sure to use the `--` separator:
```bash
npm run cli -- list-collection  # ✅ Correct
npm run cli list-collection     # ❌ Wrong
```

### Database errors
Ensure the database is set up:
```bash
just db-setup
```

### Type errors
Run type checking:
```bash
npm run type-check
```
