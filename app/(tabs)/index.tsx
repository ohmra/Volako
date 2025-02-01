import { StyleSheet, Text, View, Image } from "react-native";
import ThemedText from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryIcons from '@/constants/CategoryIcons'
import ListGroup from '../../components/ListGroup';
import Overview from '../../components/Overview';
import Icons from '@/constants/Icons'
import Calendar from '../../components/Calendar';
import PrimaryButton from '../../components/PrimaryButton';
import { router } from "expo-router";
import { useDatabase } from "@/hooks/useDatabase";
import { useEffect, useState } from "react";
import Toast from 'react-native-toast-message';
type categoryType = keyof typeof CategoryIcons

type ItemType = {
    icon: categoryType,
    category: string,
    description: string,
    amount: number,
    income: boolean
}

export default function Index() {
  const [todaysTransactions, setTodaysTransactions] = useState<ItemType[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const db = await useDatabase(); // Wait for the database to be set up
      // await db.create(1200, "Institute", "frais", false, "Not hehe");
      const tx = await db.getTodaysTransactions(); // Fetch all data
      const data: ItemType[] = tx ? tx.map((t) => ({
          icon: t.icon,
          category: t.category,
          description: t.description,
          amount: t.amount,
          income: t.income        
        })) : []
        setTodaysTransactions(data);
    };

    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={Icons.Logo}/>
          <ThemedText type="header" color="darkGray">Kitty</ThemedText>
        </View>
        <Calendar />
        <Overview />
        <ListGroup title="TODAY" total="+1500" items={todaysTransactions}/>
        <ListGroup title="YESTERDAY" total="-1500" items={[]}/>
        <View style={styles.buttonContainer}>
          <PrimaryButton icon={Icons.addPlus} 
                         style={{borderRadius: 44, paddingHorizontal: 20, paddingVertical: 16,
                                width: 130}}
                          handlePress={() => router.push('/add')}
          >
            Add new
            </PrimaryButton>
        </View>
        <Toast />
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
