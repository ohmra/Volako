import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import ThemedText from './ThemedText';
import Icons from '@/constants/Icons'
const Overview = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={Icons.Expenses} style={styles.icon}/>
        <ThemedText type="body2" color="red">12000€</ThemedText>
        <ThemedText type="caption" color="blackGray">Expenses</ThemedText>
      </View>
      <View style={styles.contentContainer}>
        <Image source={Icons.Balance} style={styles.icon}/>
        <ThemedText type="body2" color="darkGreen">12000€</ThemedText>
        <ThemedText type="caption" color="blackGray">Balance</ThemedText>
      </View>
      <View style={styles.contentContainer}>
        <Image source={Icons.Income} style={styles.icon}/>
        <ThemedText type="body2" color="black">2000€</ThemedText>
        <ThemedText type="caption" color="blackGray">Income</ThemedText>
      </View>
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
        flexDirection: "row",
        justifyContent: "space-around",
        height: 95
    },
    contentContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        width: 24,
        height: 24,
    }
})

export default Overview