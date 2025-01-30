import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import { useThemeColor } from '../hooks/useThemeColor';
import ThemedText from "@/components/ThemedText";

type TextInputProps = {
    children: ReactNode,
    label?: string,
    focused?: boolean
}

const KTextInput = ({children, label, focused}: TextInputProps) => {
    const colors = useThemeColor();
  return (
    <View style={[styles.container,
                 {borderColor: focused ? colors.focused : colors.gray, 
                  borderWidth: focused ? 2 : 1}
                  ]}>
      {label && <ThemedText style={styles.label} type="caption" color={focused ? "focused" : "blackGray"}>{label}</ThemedText>}
      <TextInput
        style={styles.textInput}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 48,
        borderRadius: 4,
        justifyContent: "center",
        position: "relative"
    },
    label: {
        position: "absolute",
        backgroundColor: "#fff",
        left: 12,
        top: -8,
        height: 16,
        paddingHorizontal: 4
    },
    textInput: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "normal",
      color: "#212121",
      paddingHorizontal: 16,
      paddingVertical: 12,
      height: "100%",
      width: "100%"
    }
})

export default KTextInput