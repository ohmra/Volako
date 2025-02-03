import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import ThemedText from './ThemedText';
import ListItem from './ListItem';
import CategoryIcons from '@/constants/CategoryIcons';
import { useTransaction } from '../hooks/useTransaction';

type categoryType = keyof typeof CategoryIcons

type ItemType = {
    icon: categoryType
    category: string,
    description: string,
    amount: number,
    income: boolean
}

type ListGroup = {
    items: Array<ItemType>,
    title: string,
}

const ListGroup = ({items, title}: ListGroup) => {
  const total = useTransaction(items).getTotal();
  const itemRender = ({item}: {item: ItemType}) => (
      <ListItem icon={CategoryIcons[item.icon]}
          category={item.category}
          description={item.description}
          amount={item.amount}
          income={item.income} />
  )

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText type="title" color="darkGray">{title}</ThemedText>
        <ThemedText type="title" color="darkGray">{total}€</ThemedText>
      </View>
      <FlatList style={styles.contentContainer} data={items} renderItem={itemRender} 
       keyExtractor={(item, index) => `${index}-${item.category}`}
       initialNumToRender={10} />

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
        height: 275,
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

export default ListGroup