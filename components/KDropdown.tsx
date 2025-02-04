import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { useThemeColor } from '@/hooks/useThemeColor';

type dropdownType = {
    label: string,
    value: string
}

type KdropdownType = {
    data: Array<dropdownType>,
    handleChange: (field: string, value: string) => void
}

const KDropdown = ({data, handleChange}: KdropdownType) => {
    const colors = useThemeColor();
    const [focused, setFocused] = useState(false);
  return (
    <Dropdown style={[styles.dropdown, 
        {borderColor: focused ? colors.focused : colors.gray, 
        borderWidth: focused ? 2 : 1}]}
          data={data}
          placeholder="Select transaction type"
          labelField="label"
          valueField="value"
          placeholderStyle={styles.textStyle}
          selectedTextStyle={styles.textStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(v) => {handleChange('transactionType', v.value)}}
    />
  )
}

const styles = StyleSheet.create({
    dropdown: {
        width: "100%",
        borderRadius: 4,
        justifyContent: "center",
        marginBottom: 24,
    },
    textStyle: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "normal",
        color: "#212121",
        paddingHorizontal: 16,
        paddingVertical: 12,
    }
})

export default KDropdown