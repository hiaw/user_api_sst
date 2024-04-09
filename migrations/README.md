# Migration

[Kysely Migration Doc](https://kysely.dev/docs/migrations)

Migrations will be run in the alpha-numeric order of your migration names. An excellent way to name your migrations is to prefix them with an ISO 8601 date string.

## Create a new migration

Run the following command

`npm run createMigration`

A new file with the correct date string will be created. Please append the purpose of the migration to the end of the filename.
