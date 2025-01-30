import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import ThemedText from './ThemedText';
import ListItem from './ListItem';
import CategoryIcons from '@/constants/CategoryIcons';

type categoryType = keyof typeof CategoryIcons

type ItemType = {
    category: categoryType,
    description: string,
    amount: number,
    income: boolean
}

type ListGroup = {
    items: Array<ItemType>
}

const ListGroup = ({items}: ListGroup) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText type="title" color="darkGray">Today</ThemedText>
        <ThemedText type="title" color="darkGray">- 1125€</ThemedText>
      </View>
      <FlatList style={styles.contentContainer} data={items} renderItem={({item}) => 
          <ListItem icon={CategoryIcons[item.category]}
          category={item.category}
          description={item.description}
          amount={item.amount}
          income={item.income} />}
        />

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