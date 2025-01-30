import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import ThemedText from './ThemedText';
import Icons from '@/constants/Icons';

const Calendar = () => {
  return (
    <View style={styles.container}>
      <Image source={Icons.LeftArrow} />
      <View style={styles.date}>
        <Image source={Icons.calendar} />
        <ThemedText type="body2" color="darkGray">May, 2021</ThemedText>
      </View>
      <Image source={Icons.RightArrow} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        marginBottom: 20
    },
    date: {
        flexDirection: "row",
        backgroundColor: "#F5F5F5",
        borderRadius: 50,
        paddingHorizontal: 13,
        paddingVertical: 8,
        gap: 8
    }
})

export default Calendar