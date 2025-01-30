import { StyleSheet, Text, View, Image } from "react-native";
import ThemedText from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import KTextInput from '../../components/KTextInput';
import CategoryIcons from '@/constants/CategoryIcons'
import ListItem from '../../components/ListItem';
import ListGroup from '../../components/ListGroup';
import Overview from '../../components/Overview'

type categoryType = keyof typeof CategoryIcons

type ItemType = {
    category: categoryType,
    description: string,
    amount: number,
    income: boolean
}

const items: ItemType[] = [
  {
    category: "Cafe",
    description: "Cafe with mom",
    amount: 400,
    income: false
  },
  {
    category: "Groceries",
    description: "Voanjobory tsaramaso",
    amount: 250,
    income: false
  },
  {
    category: "Savings",
    description: "Karama eoah",
    amount: 1000,
    income: true
  },
  {
    category: "Savings",
    description: "Karama eoah",
    amount: 1000,
    income: true
  },
  {
    category: "Savings",
    description: "Karama eoah",
    amount: 1000,
    income: true
  }
  ]

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedText type="header" color="focused">yes</ThemedText> 
      <StatusBar backgroundColor="rgba(33, 33, 33, 0.18)" />
      <KTextInput label="Category name">Groceries</KTextInput>
      <KTextInput label="Category name" focused>Groceries</KTextInput>
      <ListItem icon={CategoryIcons.Cafe} category="Cafe" description="Eggs & Veggies" amount={800}/>
      <ListGroup items={items}/>
      <Overview />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
})
