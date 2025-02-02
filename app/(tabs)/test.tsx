import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
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
        <FlatList data={fullTransactionData} renderItem={({item}) => <Text>{item.category} {item.created_at}</Text>}/>
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
  buttonContainer: {
    position: "absolute",
    width: 130,
    bottom: 24,
    left: "50%",
    transform: [{ translateX: -49 }],
  }
})
