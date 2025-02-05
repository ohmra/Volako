import { StyleSheet, View, Image } from "react-native";
import ThemedText from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryIcons from '@/constants/CategoryIcons'
import ListGroup from '../../components/ListGroup';
import Overview from '../../components/Overview';
import Icons from '@/constants/Icons'
import Calendar from '../../components/Calendar';
import PrimaryButton from '../../components/PrimaryButton';
import { router, useLocalSearchParams } from "expo-router";
import { getTodayTransactions, getYesterdayTransactions } from "@/hooks/useDatabase";
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
  const [todayTransactions, setTodayTransactions] = useState<ItemType[]>([]);
  const [yesterdayTransactions, setYesterdayTransactions] = useState<ItemType[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { showToast, updatedBalance } = useLocalSearchParams();
  console.log(new Date().toString());
  const fetchData = async () => {
    const todayTx = await getTodayTransactions(); // Fetch all data
    const today: ItemType[] = todayTx ? todayTx.map((t) => ({
        icon: t.icon,
        category: t.category,
        description: t.description,
        amount: t.amount,
        income: t.income        
      })) : []
    
    const yesterdayTx = await getYesterdayTransactions();
    const yesterday: ItemType[] = yesterdayTx ? yesterdayTx.map((t) => ({
      icon: t.icon,
      category: t.category,
      description: t.description,
      amount: t.amount,
      income: t.income        
    })) : []

      setTodayTransactions(today);
      setYesterdayTransactions(yesterday);
  };
  useEffect(() => {
    if (showToast === 'true') {
      Toast.show({
        type: 'success',
        text1: 'Transaction added successfully',
        visibilityTime: 2000
      });
    }

    if (updatedBalance === 'true') {
      Toast.show({
        type: 'success',
        text1: 'Your balance has been updated successfuly',
        visibilityTime: 2000
      });
    }
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={Icons.Logo} style={{width: 24, height: 24, margin: 4}} resizeMode="contain"/>
          <ThemedText type="header" color="darkGray">Kitty</ThemedText>
        </View>
        <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate}/>
        <Overview currentDate={currentDate}/>
        <ListGroup title="TODAY" items={todayTransactions}/>
        <ListGroup title="YESTERDAY" items={yesterdayTransactions}/>
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
