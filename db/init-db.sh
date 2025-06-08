#!/bin/bash

echo "Initializing database schema..."

# Wait for PostgreSQL to be ready
until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER"; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

# Run SQL script
PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f /app/db/schema-init.sql

echo "Database schema initialized."
