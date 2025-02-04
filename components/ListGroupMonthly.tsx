import { View, StyleSheet, FlatList, Text } from 'react-native'
import React from 'react'
import ThemedText from './ThemedText';
import ListItem from './ListItem';
import CategoryIcons from '@/constants/CategoryIcons';
import { useTransaction } from '../hooks/useTransaction';

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

type ListGroupMonthly = {
    items: Array<Transaction>,
    title: string,
}

const ListGroupMonthly = ({items, title}: ListGroupMonthly) => {
  const total = useTransaction(items).getTotal();

  const renderItem = ({item, index}: {item: Transaction, index: number}) => {
    const previousTransactionDate = index > 0 ? items[index-1].created_at : '';
    return (
        <>
            {(item.created_at !== previousTransactionDate) && 
            <Text>{(new Date(item.created_at)).toDateString()}</Text>}
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
      <View style={styles.titleContainer}>
        <ThemedText type="title" color="darkGray">{title}</ThemedText>
        <ThemedText type="title" color="darkGray">{total.toLocaleString('fr-FR')} MGA</ThemedText>
      </View>
      {(items && items.length > 0) ?
        <FlatList style={styles.contentContainer} data={items} renderItem={renderItem}
          keyExtractor={(item) => `${item.id}-${item.category}-${item.created_at}`}
          initialNumToRender={10}
          />
        :
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <ThemedText color="blackGray">No transactions</ThemedText>
        </View>
      }
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
        flex: 1,
        marginBottom: 12,
        position: "relative"
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 8,
        justifyContent: "space-between"
    },
    contentContainer : {

    }
})

export default ListGroupMonthly