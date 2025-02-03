import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CategoryIcons from '@/constants/CategoryIcons';
import { CategoryColors } from '../constants/Colors';
import ThemedText from './ThemedText';

type categoryType = keyof typeof CategoryIcons
type CategoryStat = {
    count: number;
    total: number;
    icon: categoryType,
    percentage: string,
    category: string,
};

const StatGraph = ({items}: {items: CategoryStat[]}) => {
  return (
    <View style={styles.container}>
        <ThemedText type='title' color="darkGray">OVERVIEW</ThemedText>
        <View style={styles.graphContainer}>
            {
                items.map((item) => 
                    <View key={item.category} style={{backgroundColor: CategoryColors[item.icon], width: `${parseFloat(item.percentage)}%`}} />
                )
            }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    graphContainer:{
        flexDirection: "row",
        width: "100%",
        height: 40,
        borderRadius: 8,
        overflow: "hidden",
        marginTop: 8,
        
    },
    container: {
        marginBottom: 20,
    }
});

export default StatGraph