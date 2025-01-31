import { StyleSheet, Text, View, Image } from "react-native";
import ThemedText from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import KTextInput from '../../components/KTextInput';
import CategoryIcons from '@/constants/CategoryIcons'
import ListItem from '../../components/ListItem';
import ListGroup from '../../components/ListGroup';
import Overview from '../../components/Overview'
import KDropdown from '../../components/KDropdown'
import PrimaryButton from '../../components/PrimaryButton';


const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

type categoryType = keyof typeof CategoryIcons

type ItemType = {
  icon: categoryType,
  category: string,
  description: string,
  amount: number,
  income: boolean
}

const items: ItemType[] = [
{
  icon: "Cafe",
  category: "Cafe",
  description: "Cafe with mom",
  amount: 400,
  income: false
},
{
  icon: "Groceries",
  category: "Groceries",
  description: "Voanjobory tsaramaso",
  amount: 250,
  income: false
},
{
  icon: "Savings",
  category: "Savings",
  description: "Karama eoah",
  amount: 1000,
  income: true
},
{
  icon: "Savings",
  category: "Savings",
  description: "Karama eoah",
  amount: 1000,
  income: true
},
{
  icon: "Savings",
  category: "Savings",
  description: "Karama eoah",
  amount: 1000,
  income: true
},
{
  icon: "Savings",
  category: "Savings",
  description: "Karama eoah",
  amount: 1000,
  income: true
},
{
  icon: "Savings",
  category: "Savings",
  description: "Karama eoah",
  amount: 1000,
  income: true
},
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
      <PrimaryButton icon={CategoryIcons.Cafe} style={{width: 200}}>OK</PrimaryButton>
      <KDropdown data={data}  />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
})
