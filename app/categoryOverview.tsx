import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react'
import CategoryIcons from '@/constants/CategoryIcons';
import ListItem from '@/components/ListItem';
import { useLocalSearchParams } from 'expo-router';

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

type Params = {
items?: string; // items is passed as a JSON string
};

const CategoryOverview = () => {

    const params = useLocalSearchParams() as Params;
    const rawItems: Transaction[] = params.items ? JSON.parse(params.items as string) : [];
    const items: Transaction[] = rawItems.map(item => ({
      ...item,
      created_at: new Date(item.created_at),
    }));
    const renderItem = ({item, index}: {item: Transaction, index: number}) => {
      const previousTransactionDate = index > 0 ? items[index-1].created_at.toDateString() : '';
    return (
        <>
            {(item.created_at.toDateString() !== previousTransactionDate) && 
            <Text>{item.created_at.toDateString()}</Text>}
            <ListItem icon={CategoryIcons[item.icon]}
            category={item.category}
            description={item.description}
            amount={item.amount}
            income={item.income} />
        </>
    )
}

  return (
    <View style={styles.container}>
      <FlatList data={items} renderItem={renderItem} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
        width: "100%"
    }
})

export default CategoryOverview