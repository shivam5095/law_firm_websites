# Existing Production Database

Do not run `prisma migrate reset` against production. Before applying migrations, inspect the production schema using a read-only query and compare its exact table names, column names, types, and required indexes with the Prisma schema.

Run this query through a read-only production database connection:

```sql
SELECT table_name, column_name, data_type, udt_name, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('AdminUser', 'ContactMessage', 'ConsultationRequest')
ORDER BY table_name, ordinal_position;
```

The current Prisma names are case-sensitive PostgreSQL identifiers:

| Table | Columns |
|---|---|
| `AdminUser` | `id`, `name`, `email`, `passwordHash`, `role`, `createdAt`, `updatedAt` |
| `ContactMessage` | `id`, `name`, `email`, `phone`, `subject`, `message`, `status`, `createdAt`, `updatedAt` |
| `ConsultationRequest` | `id`, `name`, `email`, `phone`, `matterType`, `preferredMode`, `preferredDate`, `message`, `status`, `createdAt`, `updatedAt` |

The expected Prisma-generated indexes are the unique index on `AdminUser.email`, plus indexes on `createdAt` for all three models and on `email` and `status` for `ContactMessage` and `ConsultationRequest`. Confirm those indexes and compatible PostgreSQL types before resolving the baseline as applied.

If all three tables, columns, types, and indexes already match this Prisma schema, mark the baseline as applied from a computer with the production environment configured:

```bash
cd backend
npx prisma migrate resolve --applied 20261002064844_baseline_core_models
```

`migrate resolve` records migration history; it does not create or alter the tables. After the baseline is correctly marked, use `npx prisma migrate deploy` from a controlled local deployment workflow to apply future pending migrations. Do not run migration commands from application runtime startup.

If the existing schema does not match (for example, tables such as `contact_messages` and columns such as `matter_type` from the legacy Supabase SQL), do not mark this baseline as applied or run it unchanged. Choose an approach after reviewing the production schema and data:

- Add Prisma `@@map` model mappings and `@map` field mappings so the Prisma models target the existing names, then generate and review a migration for any remaining differences.
- Plan and execute a data migration into the Prisma-named schema, preserving the original tables until the copied data and application behavior have been verified.

No production database inspection or migration command is run by this project documentation change.