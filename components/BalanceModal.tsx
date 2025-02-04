import { View, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react'
import KTextInput from './KTextInput';
import { getBalance, saveBalance } from '@/constants/balance';
import PrimaryButton from './PrimaryButton';
import { useNavigation } from 'expo-router';
import { CommonActions } from '@react-navigation/native';

type balanceModalType = {
    showBalanceModal: boolean,
    setShowBalanceModal: (arg: boolean) => void
}

const BalanceModal = ({showBalanceModal, setShowBalanceModal}: balanceModalType) => {
    const [balance, setBalance] = useState<string>('');
    const navigation = useNavigation();

    useEffect(() => {
        const fetchBalance = async () => {
          const currentBalance = await getBalance();
          setBalance(currentBalance.toLocaleString('fr-FR'));
        };
    
        if (showBalanceModal) {
          fetchBalance();
        }
      }, [showBalanceModal]);

    const handleOnChange = (value: string) => {
        // 1. Remove all non-digit characters
        const rawValue = value.replace(/\D/g, '');

        // 2. Remove leading zeros
        const sanitizedValue = rawValue.replace(/^0+/, '');

        // 3. Format with spaces (optional)
        const formattedValue = sanitizedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        setBalance(formattedValue);
    }

    const handleChangeBalance = () => {
        const amount = balance.replace(/\s/g, '');
        saveBalance(parseFloat(amount));
        console.log("Balance changed successfuly!");
        setShowBalanceModal(false);
        const keyTabs = `(tabs)-${(new Date).toISOString}`;
        const keyIndex = `index-${(new Date).toISOString}`;
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{
                        key: keyTabs,
                        name: '(tabs)',
                        state: {
                          routes: [{key: keyIndex, name: 'index', params: { updatedBalance: 'true' } }]
                        }
                      }]
            })
          );
    }

  return (
    <Modal visible={showBalanceModal}  animationType="fade" transparent={true}
            onRequestClose={() => setShowBalanceModal(false)}>
        <TouchableWithoutFeedback onPress={() => setShowBalanceModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                <KTextInput label="Set your balance here (MGA)" 
                            placeholder='Balance'
                            keyboardType="numeric"
                            value={balance}
                            onChangeText={(e) => handleOnChange(e)} />
                <PrimaryButton handlePress={handleChangeBalance}>CHANGE</PrimaryButton>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
  )
}

const styles = StyleSheet.create({
      modalOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      container: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 22,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 100,
      },
})

export default BalanceModal