import { StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import React, { ReactNode } from 'react'
import ThemedText from './ThemedText';

type primaryButtonType = {
    icon?: ImageSourcePropType,
    style?: object,
    children: ReactNode
}

const PrimaryButton = ({icon, style, children}: primaryButtonType) => {
  return (
    <TouchableOpacity style={[styles.button, style]}>
       {icon && <Image source={icon} style={styles.icon} />}
      <ThemedText type="body2" color="white">{children}</ThemedText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#007BEF",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        flexDirection: "row",
        gap: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    icon : {
        width: 20,
        height: 20
    }
})

export default PrimaryButton