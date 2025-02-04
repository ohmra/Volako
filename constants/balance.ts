import AsyncStorage from '@react-native-async-storage/async-storage';

const BALANCE_KEY = 'balance';

// Save balance to AsyncStorage
export const saveBalance = async (balance: number) => {
  try {
    await AsyncStorage.setItem(BALANCE_KEY, balance.toString());
    console.log('Balance saved:', balance);
  } catch (e) {
    console.error('Failed to save balance:', e);
  }
};

// Retrieve balance from AsyncStorage
export const getBalance = async () => {
  try {
    const balanceString = await AsyncStorage.getItem(BALANCE_KEY);
    if (balanceString !== null) {
      const balance = parseFloat(balanceString);
      return balance;
    }
    // Return a default value (e.g., 0) if no balance is stored
    return 0;
  } catch (e) {
    console.error('Failed to retrieve balance:', e);
    return 0;
  }
};

// Update balance (e.g., add or subtract an amount)
export const updateBalance = async (amountChange: number) => {
  try {
    const currentBalance = await getBalance();
    const newBalance = currentBalance + amountChange;
    await saveBalance(newBalance);
    return newBalance;
  } catch (e) {
    console.error('Failed to update balance:', e);
    return null;
  }
};
