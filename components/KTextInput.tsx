import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import { useThemeColor } from '../hooks/useThemeColor';
import ThemedText from "@/components/ThemedText";

type TextInputProps = {
    children: ReactNode,
    label?: string
}

const KTextInput = ({children, label}: TextInputProps) => {
    const colors = useThemeColor();
  return (
    <View style={[styles.container, {borderColor: colors.gray}]}>
      <ThemedText style={styles.label} type="caption" color="blackGray">{label}</ThemedText>
      {/* <ThemedText type="body1" color="black" >{children}</ThemedText> */}
      <TextInput
        style={styles.textInput}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: 328,
        height: 48,
        borderRadius: 4,
        borderWidth: 1,
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