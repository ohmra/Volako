import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import React from 'react'
import ThemedText from '../components/ThemedText';

type ListItemType = {
  icon: ImageSourcePropType,
  income?: boolean,
  category: string,
  description?: string
  amount: number
}

const ListItem = ({icon, income=false, category, description, amount }: ListItemType) => {
  return (
    <View style={styles.container}>
      <Image style={styles.icon}
      source={icon}
      resizeMode="contain" /> 
      <View style={styles.textContainer}>
        {description ?
          <>
            <ThemedText>{description}</ThemedText>
            <ThemedText type="caption" color="blackGray">{category}</ThemedText>
          </>
          :
          <ThemedText>{category}</ThemedText>
        }
      </View>
      <ThemedText style={styles.amount} color={income ? "darkGreen" : "red"}>{income? "+" : "-"}{amount.toLocaleString('fr-FR')} MGA</ThemedText>  
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    padding: 8
  },
  textContainer: {
    flex: 1
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  amount: {
    marginLeft: "auto",
    minWidth: 64,
    textAlign: "right"
  }
});

export default ListItem