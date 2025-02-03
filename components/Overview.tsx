import { View, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemedText from './ThemedText';
import Icons from '@/constants/Icons'
import { getTransactionByMonth } from '@/hooks/useDatabase';
import { useTransaction } from '../hooks/useTransaction';
import { getBalance } from '@/constants/balance';

const Overview = ({currentDate}: {currentDate: Date}) => {
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const transactions = await getTransactionByMonth(currentDate.getMonth()+1, currentDate.getFullYear());
      const totals = useTransaction(transactions).getIncomeExpense();
      const b = await getBalance();
      setBalance(b);
      setIncome(totals[0]);
      setExpense(totals[1]);
    }
    fetchData();
  }, [currentDate])
  
  

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={Icons.Expenses} style={styles.icon}/>
        <ThemedText type="body2" color="red">{expense.toLocaleString('fr-FR')}</ThemedText>
        <ThemedText type="caption" color="blackGray">Expenses</ThemedText>
      </View>
      <View style={styles.contentContainer}>
        <Image source={Icons.Balance} style={styles.icon}/>
        <ThemedText type="body2" color={balance > 0 ? "darkGreen" : "red"}>{balance.toLocaleString('fr-FR')}</ThemedText>
        <ThemedText type="caption" color="blackGray">Balance</ThemedText>
      </View>
      <View style={styles.contentContainer}>
        <Image source={Icons.Income} style={styles.icon}/>
        <ThemedText type="body2" color="black">{income.toLocaleString('fr-FR')}</ThemedText>
        <ThemedText type="caption" color="blackGray">Income</ThemedText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 8,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#E0E0E0",
        flexDirection: "row",
        justifyContent: "space-around",
        height: 95,
        marginBottom: 16
    },
    contentContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        width: 24,
        height: 24,
    }
})

export default Overview