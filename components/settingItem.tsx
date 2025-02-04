import { View, Image, ImageSourcePropType, StyleSheet } from 'react-native'
import React from 'react'
import ThemedText from './ThemedText';

type SettingItemType = {
    icon: ImageSourcePropType,
    label: string
}

const SettingItem = ({icon, label}: SettingItemType) => {
  return (
    <View style={styles.container}>
    <Image source={icon} style={styles.icon} resizeMode="contain"/>
      <ThemedText color="lightBlack">{label}</ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 8,
    }
})

export default SettingItem