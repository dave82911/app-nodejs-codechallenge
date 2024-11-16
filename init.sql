DO
$$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_database
      WHERE datname = 'transactions'
   ) THEN
      CREATE DATABASE transactions;
   END IF;
END
$$;