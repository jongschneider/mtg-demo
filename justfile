# MTG Collection Project Commands
# Usage: just <command>

# Default recipe (shows help)
default:
    @just --list

# Development Setup
# =================

# Install all dependencies
install:
    npm install

# Setup development environment (install + setup db)
setup: install db-setup

# Type checking
type-check:
    npx tsc --noEmit

# Linting
lint:
    npx eslint src --ext .ts

# Format code
format:
    npx prettier --write src

# Check formatting
format-check:
    npx prettier --check src

# Full code quality check
check: type-check lint format-check

# Fix linting and formatting issues
fix: lint format
    npx eslint src --ext .ts --fix

# Database Operations
# ===================

# Generate new migration from schema changes
db-generate:
    npx drizzle-kit generate

# Run all pending migrations
db-migrate:
    npx tsx src/db/migrate.ts

# Push schema changes directly (development only)
db-push:
    npx drizzle-kit push

# Check migration status
db-check:
    npx drizzle-kit check

# Reset database (WARNING: destroys all data)
db-reset:
    rm -f sqlite.db
    @just db-generate
    @just db-migrate

# Setup fresh database for development
db-setup: db-generate db-migrate

# Seed database with initial data (placeholder)
db-seed:
    echo "Database seeding not yet implemented"
    # npx tsx scripts/seed.ts

# Build Operations
# ================

# Build TypeScript to JavaScript
build:
    npx tsc

# Clean build artifacts
clean:
    rm -rf dist drizzle sqlite.db

# Full clean rebuild
rebuild: clean build

# Development Commands
# ====================

# Start development server (placeholder - implement when we have an app)
dev:
    echo "Development server not yet implemented"
    # npx tsx src/index.ts

# Run tests (placeholder - implement when we add tests)
test:
    echo "Tests not yet implemented"
    # npx vitest

# Run tests with coverage (placeholder)
test-coverage:
    echo "Tests not yet implemented"
    # npx vitest --coverage

# Watch mode for development
watch:
    npx tsc --watch

# Quality Assurance
# =================

# Run all checks and tests
ci: check test

# Prepare for commit
pre-commit: check test

# Deployment Preparation
# ======================

# Build for production
build-prod: clean check test build

# Create production database
db-prod: db-generate db-migrate

# Database Inspection
# ===================

# Show database schema
db-schema:
    sqlite3 sqlite.db ".schema"

# Count records in each table
db-count:
    sqlite3 sqlite.db "SELECT 'cards' as table_name, COUNT(*) as count FROM cards UNION ALL SELECT 'users', COUNT(*) FROM users UNION ALL SELECT 'user_cards', COUNT(*) FROM user_cards;"

# Interactive database shell
db-shell:
    sqlite3 sqlite.db

# Utility Commands
# ================

# Show project structure
tree:
    tree src -I node_modules

# Show database file size
db-size:
    ls -lh sqlite.db

# Backup database
db-backup:
    cp sqlite.db "sqlite.backup.$(date +%Y%m%d_%H%M%S).db"

# Show available commands
help:
    @just --list

# Quick development cycle
dev-cycle: check db-reset db-seed dev
