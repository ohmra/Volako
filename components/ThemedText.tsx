import { View, Text, TextProps, StyleSheet } from 'react-native'
import React from 'react'
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

type ThemedTextProps = TextProps & {
    color?: keyof typeof Colors.light
    type?: "header" | "caption" | "title" | "body1" | "default";
}

export default function ThemedText({type = "default", color, ...rest}: ThemedTextProps){
    const colors = useThemeColor();
  return (
    <View>
      <Text style={[styles[type], {color: colors[color ?? "lightBlack"] ?? "drakGray"}]} {...rest} />
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        lineHeight: 24,
        fontWeight: "bold"
    },
    caption: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "normal"
    },
    title: {
        fontSize: 10,
        lineHeight: 16,
        fontWeight: "medium"
    },
    default: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "normal"
    },
    body1: {
        fontSize: 14,
        lineHeight: 16,
        fontWeight: "medium"
    }
})
