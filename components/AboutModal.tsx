import { View, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import React from 'react'
import ThemedText from './ThemedText';

type balanceModalType = {
  showAboutModal: boolean,
  setShowAboutModal: (arg: boolean) => void
}

const About = ({showAboutModal, setShowAboutModal}: balanceModalType) => {

  return (
    <Modal visible={showAboutModal}  animationType="fade" transparent={true}
            onRequestClose={() => setShowAboutModal(false)}>
        <TouchableWithoutFeedback onPress={() => setShowAboutModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                <ThemedText>Kitty is a expense management app to track your daily expenses.</ThemedText>
                <ThemedText>Front Model ©: </ThemedText>
                <ThemedText type='caption'>figma.com/community/file/1141026080000052242</ThemedText>
                <ThemedText>v1.0.0</ThemedText>
                <ThemedText>©2025 Ranto RANAIVO</ThemedText>
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

export default About