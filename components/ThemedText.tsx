import { View, Text, TextProps, StyleSheet } from 'react-native'
import React from 'react'
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

type ThemedTextProps = TextProps & {
    color?: keyof typeof Colors.light,
    type?: "header" | "caption" | "title" | "body1" | "default" | "body2",
    style?: object
}

export default function ThemedText({type = "default",style , color, ...rest}: ThemedTextProps){
    const colors = useThemeColor();
  return (
      <Text style={[styles[type], {color: colors[color ?? "lightBlack"] ?? "drakGray"}, style]} {...rest} />
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
    body2: {
        fontSize: 14,
        lineHeight: 16,
        fontWeight: "medium"
    },
    body1: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "normal"
    }
})
