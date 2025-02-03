import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from 'react'
import KDropdown from '../components/KDropdown';
import KTextInput from '../components/KTextInput';
import CategoryBottomSheet from '../components/CategoryBottomSheet';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigation  } from "expo-router";
import { create } from '@/hooks/useDatabase';
import CategoryIcons from '@/constants/CategoryIcons';
import { CommonActions } from '@react-navigation/native'

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
  const navigation = useNavigation();

  // Submission handler
  const handleSubmit = async () => {
    if(validations(data)){
      console.log('sumbimted data success');
      await create(parseFloat(data.amount), 
                      data.icon, 
                      data.category, 
                      data.transactionType === "income", 
                      data.description);
      const keyTabs = `(tabs)-${Date.now()}`;
      const keyIndex = `index-${Date.now()}`;
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              key: keyTabs,
              name: '(tabs)', // Your tab navigator
              state: {
                routes: [
                  {
                    key: keyIndex,
                    name: 'index', // Specific screen in the tab navigator
                    params: { showToast: 'true' } // <-- Params go here
                  }
                ]
              }
            }
          ]
        })
      );
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