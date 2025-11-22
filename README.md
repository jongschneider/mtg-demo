# MTG Collection CLI

A Magic: The Gathering card database application using TypeScript with Drizzle ORM and SQLite.

## Prerequisites

### Required Software

- **[Node.js](https://nodejs.org/)** (v18.0.0 or higher) - JavaScript runtime
- **[just](https://github.com/casey/just)** - Command runner (optional, but recommended)

### Installation

#### macOS (Homebrew)

```bash
# Install Node.js
brew install node

# Install just (optional)
brew install just
```

#### Other platforms

- **Node.js**: Download from [nodejs.org](https://nodejs.org/) or use your package manager
- **just**: See [installation instructions](https://github.com/casey/just#installation)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up the database

```bash
# Using just
just setup

# Or manually
npx drizzle-kit generate
npx tsx src/db/migrate.ts
```

### 3. Run the CLI

```bash
npm run cli
```

## Development Commands

Using `just`:

```bash
just                    # Show available commands
just check              # Run type checking, linting, and format check
just db-generate        # Generate new migration
just db-migrate         # Run pending migrations
just db-push            # Push schema changes (dev only)
just db-studio          # Open Drizzle Studio
```

Using `npm`:

```bash
npm run cli             # Run the CLI
npm run type-check      # Type check
npm run lint            # Lint code
npm run format          # Format code
npm run check           # Run all checks
```

## Project Structure

```
.docs/                    # Documentation only
├── sqlite_data.md        # Database schema documentation
drizzle/                  # Migration files
drizzle.config.ts         # Drizzle Kit config
justfile                  # Task runner commands
src/
├── db/                   # Database layer
├── queries/              # Query functions
└── types/                # TypeScript types
```

## Tech Stack

- **TypeScript** - Language
- **Drizzle ORM** - Database ORM
- **SQLite** - Database (via better-sqlite3)
- **Clipanion** - CLI framework

## AI Development Tools

Tools used to build this project:

- **[Claude Code](https://claude.ai/code)** - Anthropic's CLI coding agent. Terminal-based, agentic workflows, file editing, shell commands
- **[Cursor](https://cursor.com/)** - AI-first IDE. VS Code fork with inline completions, chat, codebase-aware suggestions
- **[OpenCode](https://opencode.ai/)** - Open-source terminal AI assistant. Similar to Claude Code, multi-provider support
- **[Perplexity](https://perplexity.ai/)** - AI search engine. Research, documentation lookup, technical questions with citations
- **[DeepWiki](https://deepwiki.com/)** - AI-generated documentation for GitHub repos. Codebase exploration, architecture understanding
