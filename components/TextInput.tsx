import { View, Text } from 'react-native'
import React from 'react'

type TextInputProps = {
    value: string
}

const TextInput = ({value}: TextInputProps) => {
  return (
    <View>
      <Text>value</Text>
    </View>
  )
}

export default TextInput