import { StyleSheet } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { useThemeColor } from '@/hooks/useThemeColor';

type dropdownType = {
    label: string,
    value: string
}

type KdropdownType = {
    data: Array<dropdownType>,
    focused?: boolean
}

const KDropdown = ({data, focused=false}: KdropdownType) => {
    const colors = useThemeColor();
  return (
    <Dropdown style={[styles.dropdown, 
        {borderColor: focused ? colors.focused : colors.gray, 
        borderWidth: focused ? 2 : 1}]}
          data={data}
          labelField="label"
          valueField="value"
          placeholderStyle={styles.textStyle}
          selectedTextStyle={styles.textStyle}
          onChange={item => {
          }}
    />
  )
}

const styles = StyleSheet.create({
    dropdown: {
        width: "100%",
        height: 48,
        borderRadius: 4,
        justifyContent: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 24,
    },
    textStyle: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "normal",
        color: "#212121",
    }
})

export default KDropdown