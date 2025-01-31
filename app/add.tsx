import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from 'react'
import KDropdown from '../components/KDropdown';
import KTextInput from '../components/KTextInput';
import CategoryBottomSheet from '../components/CategoryBottomSheet';
import PrimaryButton from '../components/PrimaryButton';

const dataDropdown = [
  {label: "Expense", value: "expense"},
  {label: "Income", value: "income"},
]

const Add = () => {
  const [showCategory, setShowCategory] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <KDropdown data={dataDropdown} />
      <TouchableOpacity onPress={() => setShowCategory(true)}>
        <KTextInput label="Category name" readOnly> </KTextInput>
      </TouchableOpacity>
      <KTextInput placeholder='Enter amount' keyboardType="numeric"> </KTextInput>
      <KTextInput placeholder='Description (optional)'> </KTextInput>
      {showCategory && <CategoryBottomSheet showCategory={false} setShowCategory={setShowCategory}/>}
      <PrimaryButton style={{borderRadius: 84, 
                            marginTop: "auto",
                            paddingVertical: 12}}>
        add new
        </PrimaryButton>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: "#fff",
    position: "relative",
  }
})

export default Add