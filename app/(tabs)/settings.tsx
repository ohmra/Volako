import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState } from 'react'
import SettingItem from '../../components/settingItem';
import Icons from '@/constants/Icons';
import ThemedText from '@/components/ThemedText';
import BalanceModal from '../../components/BalanceModal';
import AboutModal from '@/components/AboutModal';

const Settings = () => {
    const [showBalanceModal, setShowBalanceModal] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="header" color="darkGray">Settings</ThemedText>
        </View>
        <TouchableOpacity onPress={() => setShowBalanceModal(true)}>
            <SettingItem label="Set Balance" icon={Icons.Balance} />
        </TouchableOpacity>
        <BalanceModal showBalanceModal={showBalanceModal} setShowBalanceModal={setShowBalanceModal} />

        <TouchableOpacity>
            <SettingItem label="Choose Language (work in progress...)" icon={Icons.Language} />
        </TouchableOpacity>


        <TouchableOpacity>
            <SettingItem label="Choose Currency (work in progress...)" icon={Icons.Currency} />
        </TouchableOpacity>


        <TouchableOpacity onPress={() => setShowAboutModal(true)}>
            <SettingItem label="About" icon={Icons.About} />
        </TouchableOpacity>
        <AboutModal showAboutModal={showAboutModal} setShowAboutModal={setShowAboutModal} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    header: {
      flexDirection: "row",
      flex: 1/6,
      backgroundColor: "#EEEEEE",
      marginHorizontal: -16,
      padding: 16
    },
})

export default Settings