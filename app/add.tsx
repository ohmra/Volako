import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from 'react'
import KDropdown from '../components/KDropdown';
import KTextInput from '../components/KTextInput';
import CategoryBottomSheet from '../components/CategoryBottomSheet';
import PrimaryButton from '../components/PrimaryButton';
import { router } from "expo-router";
import Toast from 'react-native-toast-message';
import { useDatabase } from '@/hooks/useDatabase';
import CategoryIcons from '@/constants/CategoryIcons';

const dataDropdown = [
  {label: "Expense", value: "expense"},
  {label: "Income", value: "income"},
]

const Add = () => {
  const [data, setData] = useState({
    transactionType: "",
    category: "",
    amount: "",
    icon: "" as keyof typeof CategoryIcons,
    description: "",
  });

  // Function to handle input changes
  const handleInputChange = (field: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Submission handler
  const handleSubmit = async () => {
    console.log('Data to submit:', data);
    if(validations(data)){
      console.log('sumbimted data success');
      const db = await useDatabase();
      await db.create(parseFloat(data.amount), 
                      data.icon, 
                      data.category, 
                      data.transactionType === "income", 
                      data.description);
      Toast.show({
        type: 'success',
        text1: 'Transaction added successfuly',
        visibilityTime: 1500
      });
      router.navigate("/(tabs)");
    }
  };

  const [showCategory, setShowCategory] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <KDropdown data={dataDropdown} handleChange={handleInputChange} />
      <TouchableOpacity onPress={() => setShowCategory(true)}>
        <KTextInput label="Category name" focus={showCategory} readOnly value={data.category} />
      </TouchableOpacity>
      <KTextInput placeholder='Enter amount' 
                  keyboardType="numeric"
                  value={data.amount}
                  onChangeText={(value) => handleInputChange("amount", value)}
                  />
      <KTextInput placeholder='Description (optional)' 
                  value={data.description} 
                  onChangeText={(value) => handleInputChange('description', value)}/>
      {showCategory && <CategoryBottomSheet showCategory={false} setShowCategory={setShowCategory} handleInputChange={handleInputChange}/>}
      <PrimaryButton style={{borderRadius: 84, 
                            marginTop: "auto",
                            paddingVertical: 12}}
                      handlePress={handleSubmit}>
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

const validations = (data: any) => {
  if (data.transactionType !== "expense" && data.transactionType !== "income") {
    Alert.alert('Error', 'Please choose a correct transaction type');
    return false;
  }

  if (!data.category) {
    Alert.alert('Error', 'Please select a category');
    return false;
  }

  if (isNaN(Number(data.amount)) || Number(data.amount) <= 0) {
    Alert.alert('Error', 'Please enter a valid amount');
    return false;
  }

  return true;
}

export default Add