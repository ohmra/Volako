import { View, FlatList, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDatabase } from '@/hooks/useDatabase';
import CategoryIcons from '@/constants/CategoryIcons';
import ThemedText from './ThemedText';
import StatGraph from './StatGraph';

type categoryType = keyof typeof CategoryIcons

type DetailMonthlyType = {
    date: Date,
}

type CategoryStat = {
    count: number;
    total: number;
    icon: categoryType,
};

const DetailMonthly = ({date}: DetailMonthlyType) => {
    const [categoryStats, setCategoryStats] = useState({});
    const [totalTxCount, setTotalTxCount] = useState(0);

    const fetch = async () => {
        const db = await useDatabase();
        const tx = await db.getTransactionByMonth(date.getMonth()+1, date.getFullYear());
        if(tx){
            const catStat: {[key: string]: CategoryStat} = {};
            tx.forEach(t => {
                const { category, amount } = t;
                // If the category doesn't exist in the stats object, initialize it
                if (!catStat[category]) {
                    catStat[category] = { count: 0, total: 0, icon: t.icon};
                }
                // Increment count and add to total cost
                catStat[category].count += 1;
                catStat[category].total = t.income ? catStat[category].total + amount : catStat[category].total - amount;
            });
            const totalCount = Object.values(catStat).reduce((acc: number, curr) => acc + (curr as CategoryStat).count, 0);
            setTotalTxCount(totalCount);
            setCategoryStats(catStat);
        }
    }
    useEffect(() => {
        fetch();
    }, [date]);

    // 1. Convert the object to an array and sort it by totalCost in ascending order
    const dataForFlatList = Object.entries(categoryStats)
    .map(([category, stats]) => {
        const percentage = (((stats as CategoryStat).count / totalTxCount) * 100).toFixed(2);
        return {
            category,
            percentage: `${percentage}%`,
            count: (stats as CategoryStat).count,
            total: (stats as CategoryStat).total,
            icon: (stats as CategoryStat).icon,
        }
    })
    .sort((a, b) => a.total - b.total);  // 2. Sort by totalCost in ascending order

    const CategoryItem = ({ category, count, total, icon, percentage } : 
                          {category: string, count: number, total: number, icon: categoryType, percentage: string}) => (
        <View style={styles.itemContainer}>
            <Image source={CategoryIcons[icon]} style={styles.icon} />
            <View style={styles.textContainer}>
                <ThemedText>{category}</ThemedText>
                <ThemedText type='caption' color='blackGray'>{count} transaction(s)</ThemedText>
            </View>
            <View style={styles.totalContainer}>
                <ThemedText style={{textAlign: "right"}}  color={total < 0 ? 'red' : 'darkGreen'}>{total}€</ThemedText>
                <ThemedText style={{textAlign: "right"}} type="caption">{percentage}</ThemedText>
            </View>
        </View>
      );

  return (
    <View style={styles.container}>
    <StatGraph items={dataForFlatList} />
      <FlatList data={dataForFlatList} renderItem={({item}) => 
           <CategoryItem percentage={item.percentage} icon={item.icon} total={item.total} category={item.category} count={item.count}/>
        }
        />
    </View>
  )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        padding: 8
    },
    container: {
        flex: 1,
    },
    textContainer: {
        flex: 1
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 8
    },
    totalContainer: {
        marginLeft: "auto",
        minWidth: 64,
        textAlign: "right",
    }

});

export default DetailMonthly