const { Client } = require('pg');
const { DB_CONFIG: dbConfig } = require('./config');

const databaseName = 'transactions';

// Function to create the database
const createDatabase = async () => {
  const config = { ...dbConfig.connection };
  config.database = null;

  const client = new Client(config);

  try {
    await client.connect();
    console.log("Connected to PostgreSQL server.");

    // Create the new database
    await client.query(`CREATE DATABASE ${databaseName} IF NOT EXISTS;`);
    console.log(`Database '${databaseName}' created successfully!`);
  } catch (error) {
    console.error("Error creating database:", error);
  } finally {
    await client.end();
    console.log("Connection to PostgreSQL server closed.");
  }
};

createDatabase();