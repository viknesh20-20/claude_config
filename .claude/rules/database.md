# Database Rules

## Migrations
- Every schema change requires a migration file — never modify the database manually
- Always write both UP and DOWN migrations
- Migrations must be backwards-compatible where possible
- Never drop columns/tables without a data backup plan
- Adding NOT NULL columns requires a default value
- Test migrations against a copy of production data before deploying
- Run migrations on staging before production

## Queries
- Use parameterized queries — never concatenate user input into SQL
- Avoid SELECT * — select only the columns you need
- Always include WHERE clauses on UPDATE and DELETE — never update/delete all rows accidentally
- Use EXPLAIN/ANALYZE to verify query plans for complex queries
- Avoid queries inside loops — use JOINs or batch queries

## Indexes
- Always index foreign key columns
- Index columns used in WHERE, JOIN, and ORDER BY clauses
- Use composite indexes for multi-column queries (column order matters)
- Don't over-index — each index slows writes
- Review index usage periodically — remove unused indexes

## Naming
- Use snake_case for table and column names
- Use plural nouns for table names: `users`, `orders`, `products`
- Use singular for join tables: `user_role`, `order_product`
- Prefix boolean columns: `is_active`, `has_verified`, `can_delete`
- Suffix timestamp columns: `created_at`, `updated_at`, `deleted_at`
- Suffix ID columns: `user_id`, `order_id`

## Connections
- Always use connection pooling — never open/close per request
- Set appropriate pool size (typically 5-20 per application instance)
- Set query timeouts — never let queries run indefinitely
- Handle connection failures gracefully with retry logic

## Data Integrity
- Use foreign key constraints for referential integrity
- Use transactions for multi-step operations that must be atomic
- Prefer soft deletes (`deleted_at` timestamp) over hard deletes for important data
- Validate data at the application layer AND enforce constraints at the database layer
