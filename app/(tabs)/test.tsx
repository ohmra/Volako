import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Calendar from '@/components/Calendar';
import DetailMonthly from '../../components/DetailMonthly';
import ThemedText from '@/components/ThemedText';

const Test = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="header" color="darkGray">Statistics</ThemedText>
        </View>
        <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate}/>
        <DetailMonthly date={currentDate}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        position: "relative",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        height: 48,
    },
})

export default Test