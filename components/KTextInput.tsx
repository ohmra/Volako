import { View, TextInput, StyleSheet, TextInputProps } from 'react-native'
import React, { useState } from 'react'
import { useThemeColor } from '../hooks/useThemeColor';
import ThemedText from "@/components/ThemedText";

type KTextInputProps = TextInputProps & {
    label?: string,
    readOnly?: boolean,
    placeholder?: string,
    keyboardType?: 
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "url",
    focus?: boolean
}

const KTextInput = ({label, readOnly=false, focus=false, placeholder, keyboardType="default", ...rest}: KTextInputProps) => {
    const colors = useThemeColor();
    const [focused, setFocused] = useState(false);
  return (
    <View style={[styles.container,
                 {borderColor: (focused || focus) ? colors.focused : colors.gray, 
                  borderWidth: (focused || focus) ? 2 : 1}
                  ]}>
      {label && <ThemedText style={styles.label} type="caption" color={(focused || focus) ? "focused" : "blackGray"}>{label}</ThemedText>}
      <TextInput
        placeholderTextColor={"#616161"}
        placeholder={placeholder}
        style={styles.textInput}
        editable={!readOnly}
        keyboardType={keyboardType}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...rest}
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
        position: "relative",
        marginBottom: 24,
    },
    label: {
        position: "absolute",
        backgroundColor: "#fff",
        left: 12,
        top: -8,
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