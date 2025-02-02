import { View, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemedText from './ThemedText';
import Icons from '@/constants/Icons'
import { useDatabase } from '@/hooks/useDatabase';
import { useTransaction } from '../hooks/useTransaction';

const Overview = ({currentDate}: {currentDate: Date}) => {
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const transactions = await (await useDatabase()).getTransactionByMonth(currentDate.getMonth()+1, currentDate.getFullYear());
      const totals = useTransaction(transactions).getIncomeExpense();
      setIncome(totals[0]);
      setExpense(totals[1]);
    }
    fetchData();
  }, [currentDate])
  
  

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={Icons.Expenses} style={styles.icon}/>
        <ThemedText type="body2" color="red">{expense}€</ThemedText>
        <ThemedText type="caption" color="blackGray">Expenses</ThemedText>
      </View>
      <View style={styles.contentContainer}>
        <Image source={Icons.Balance} style={styles.icon}/>
        <ThemedText type="body2" color="darkGreen">12000€</ThemedText>
        <ThemedText type="caption" color="blackGray">Balance</ThemedText>
      </View>
      <View style={styles.contentContainer}>
        <Image source={Icons.Income} style={styles.icon}/>
        <ThemedText type="body2" color="black">{income}€</ThemedText>
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