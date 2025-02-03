import * as SQLite from 'expo-sqlite';

// Declare a variable to hold the singleton instance.
let dbInstance: SQLite.SQLiteDatabase | null = null;

// Function to initialize the database and create tables if needed.
async function initializeDatabase(db: SQLite.SQLiteDatabase): Promise<void> {
  // Execute your SQL to create tables, etc.
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount NUMERIC NOT NULL,
      icon TEXT NOT NULL,
      category TEXT NOT NULL,
      income INTEGER NOT NULL,
      description TEXT,
      created_at DATETIME NOT NULL
    )
  `);
}

// Function that returns the singleton database instance.
export async function getDatabaseInstance(): Promise<SQLite.SQLiteDatabase> {
  if (!dbInstance) {
    // Open the database (using the asynchronous API)
    dbInstance = await SQLite.openDatabaseAsync('databaseName');
    // Initialize the database (e.g., create tables)
    await initializeDatabase(dbInstance);
  }
  return dbInstance;
}
