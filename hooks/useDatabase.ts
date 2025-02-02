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
            console.log("created_at at creation: ", createdAt);
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
    const getTodayTransactions = async () => {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      
      const statement = await db.prepareAsync(`
        SELECT * FROM transactions WHERE created_at LIKE '${today}%' ORDER BY created_at DESC
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

    // Function to get yesterday's transactions
    const getYesterdayTransactions = async () => {
      // Get yesterday's date in YYYY-MM-DD format
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
      
      const statement = await db.prepareAsync(`
        SELECT * FROM transactions WHERE created_at LIKE '${yesterdayString}%' ORDER BY created_at DESC
      `);
      
      try {
        const result = await statement.executeAsync();
        const rows = await result.getAllAsync();
        return convertDataToTransaction(rows);
      } catch (e) {
        console.error('Error retrieving yesterday\'s transactions:', e);
        return [];
      } finally {
        await statement.finalizeAsync(); // Always finalize the statement
      }
    };

    const getTransactionByMonth = async (month: number, year: number) => {
      const statement = await db.prepareAsync(`
        SELECT * FROM transactions 
        WHERE strftime('%m', created_at) = $month 
        AND strftime('%Y', created_at) = $year
        ORDER BY created_at DESC
      `);
    
      try {
        const result = await statement.executeAsync({
          $month: month.toString().padStart(2, '0'), // Pad month to always have two digits
          $year: year.toString()
        });
        const rows = await result.getAllAsync();
        return convertDataToTransaction(rows);
      } catch (e) {
        console.error('Error retrieving data by month:', e);
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
            created_at: row.created_at.split('T')[0]
          }));
          
          return transactions;
    }

  return {create, getAll, getTodayTransactions, getYesterdayTransactions, getTransactionByMonth};
}
