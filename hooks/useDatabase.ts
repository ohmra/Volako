import * as SQLite from 'expo-sqlite';
import CategoryIcons from '@/constants/CategoryIcons'

type categoryType = keyof typeof CategoryIcons
type Transaction = {
    id: number;
    amount: number;
    icon: categoryType;
    category: string;
    income: boolean;
    description: string;
    created_at: string;
  };

export async function useDatabase() {
  const db = await SQLite.openDatabaseAsync('databaseName');
  
  // Creating the table if it doesn't exist
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS "transactions" (
      "id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "amount" NUMERIC NOT NULL,
      "icon" TEXT NOT NULL,
      "category" TEXT NOT NULL,
      "income" INTEGER NOT NULL,
      "description" TEXT,
      "created_at" DATETIME NOT NULL
    )
  `);
  
  // Create function to insert data into the transactions table
  const create = async (
    amount: number,
    icon: categoryType,
    category: string,
    income: boolean,
    description: string
  ) => {
        // Prepare the insert statement
        const statement = await db.prepareAsync(`
        INSERT INTO transactions 
        (amount, icon, category, income, description, created_at) 
        VALUES 
        ($amount, $icon, $category, $income, $description, $created_at)
        `);
        
        try {
            const createdAt = new Date().toISOString(); // Use ISO format for datetime
            const incomeValue = income ? 1 : 0; // Store boolean as 1 or 0
            
            let result = await statement.executeAsync({
                $amount: amount,
                $icon: icon,
                $category: category,
                $income: incomeValue,
                $description: description,
                $created_at: createdAt
            });
            
            console.log('Insert result:', result.lastInsertRowId, result.changes);
            return true;
        } catch (e) {
            console.error('Error inserting data:', e);
            return false;
        } finally {
            await statement.finalizeAsync(); // Always finalize the statement
        }
    };

    const getAll = async () => {
        const statement = await db.prepareAsync(`SELECT * FROM transactions`);
        try {
            const result = await statement.executeAsync();
            const rows = await result.getAllAsync();
            return convertDataToTransaction(rows);
        
        } catch (e) {
            console.error('Error retrieving data:', e);
            return [];
        } finally {
            await statement.finalizeAsync(); // Always finalize the statement
        }
    }

    // Function to get today's transactions
    const getTodaysTransactions = async () => {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      
      const statement = await db.prepareAsync(`
        SELECT * FROM transactions WHERE created_at LIKE '${today}%'
      `);
      
      try {
        const result = await statement.executeAsync();
        const rows = await result.getAllAsync();
        return convertDataToTransaction(rows);
      } catch (e) {
        console.error('Error retrieving today\'s transactions:', e);
        return [];
      } finally {
        await statement.finalizeAsync(); // Always finalize the statement
      }
    };

    const convertDataToTransaction = (data: any) => {
        const transactions: Transaction[] = data.map((row: any) => ({
            id: row.id,
            amount: row.amount,
            icon: row.icon as categoryType,
            category: row.category,
            income: !!row.income, // Convert 1 or 0 to true/false
            description: row.description,
            created_at: row.created_at
          }));
          
          return transactions;
    }

  return {create, getAll, getTodaysTransactions};
}
