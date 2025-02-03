import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import ThemedText from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import Overview from '../../components/Overview';
import Icons from '@/constants/Icons'
import Calendar from '../../components/Calendar';
import CategoryIcons from '@/constants/CategoryIcons'
import { useEffect, useState } from "react";
import { useDatabase } from "@/hooks/useDatabase";
import ListGroupMonthly from '../../components/ListGroupMonthly';

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

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Report() {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [fullTransactionData, setFullTransactionData] = useState<Transaction[]>([]);

  const fetchData = async () => {
    const tx = await (await useDatabase()).getTransactionByMonth(currentDate.getMonth()+1, currentDate.getFullYear());
    setFullTransactionData(tx);
  }
  useEffect(() => {

    fetchData();
  }, [currentDate]);
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={Icons.Logo}/>
          <ThemedText type="header" color="darkGray">Kitty</ThemedText>
        </View>
        <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate}/>
        <Overview currentDate={currentDate}/>
        <TouchableOpacity style={styles.button}>
          <ThemedText type="body2" color="darkGray" style={styles.buttonContent}>View Statistics</ThemedText>
        </TouchableOpacity>
        <ListGroupMonthly items={fullTransactionData} title={months[currentDate.getMonth()]} />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    width: "100%"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
  },
  button: {
    alignItems: "center",
    alignContent: "center",
    marginBottom: 8
  },
  buttonContent : {
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    paddingHorizontal: 13,
    paddingVertical: 8,
  }
})
