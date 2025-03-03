import CategoryIcons from '@/constants/CategoryIcons'
import { getDatabaseInstance } from '@/database';

type categoryType = keyof typeof CategoryIcons
type Transaction = {
    id: number;
    amount: number;
    icon: categoryType;
    category: string;
    income: boolean;
    description: string;
    created_at: Date;
  };

  // Create function to insert data into the transactions table
export async function create (
    amount: number,
    icon: categoryType,
    category: string,
    income: boolean,
    description: string
  ) {
    // Prepare the insert statement
    const db = await getDatabaseInstance();
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

export async function getAll(){
    const db = await getDatabaseInstance();
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
export async function getTodayTransactions() {
      const db = await getDatabaseInstance();
      const statement = await db.prepareAsync(`
        SELECT * FROM transactions 
        WHERE strftime('%Y-%m-%d', datetime(created_at, 'utc', 'localtime')) = date('now', 'localtime')
        ORDER BY created_at DESC
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
export async function getYesterdayTransactions() {
  // Get yesterday's date in YYYY-MM-DD format
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const db = await getDatabaseInstance();
  const statement = await db.prepareAsync(`
      SELECT * FROM transactions 
      WHERE strftime('%Y-%m-%d', datetime(created_at, 'utc', 'localtime')) = date('now', 'localtime', '-1 day')
      ORDER BY created_at DESC
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

export async function getTransactionByMonth (month: number, year: number) {
    const db = await getDatabaseInstance();
    const statement = await db.prepareAsync(`
      SELECT * FROM transactions 
      WHERE strftime('%m', datetime(created_at, 'utc', 'localtime')) = $month 
      AND strftime('%Y', datetime(created_at, 'utc', 'localtime')) = $year
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
        created_at: new Date(row.created_at)
      }));
      
      return transactions;
}
