import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import ThemedText from './ThemedText';
import Icons from '@/constants/Icons';

const months = [
  'Jan', 'Feb', 'Mars', 'Apr', 'May', 'June',
  'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

type CalendarType = {
  currentDate: Date,
  setCurrentDate: (arg: Date) => void
}

const Calendar = ({currentDate, setCurrentDate}: CalendarType) => {
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const handleMonthChange = (monthIndex: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
    setShowMonthPicker(false);
  };

  const handleYearChange = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() + offset);
    setCurrentDate(newDate);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleYearChange(-1)}>
        <Image source={Icons.LeftArrow} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.date} onPress={() => setShowMonthPicker(true)}>
        <Image source={Icons.calendar} />
        <ThemedText type="body2" color="darkGray">
          {`${months[currentDate.getMonth()]}, ${currentDate.getFullYear()}`}
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleYearChange(1)}>
        <Image source={Icons.RightArrow} />
      </TouchableOpacity>

      <Modal visible={showMonthPicker}  animationType="fade" transparent={true}
            onRequestClose={() => setShowMonthPicker(false)}>
        <TouchableWithoutFeedback onPress={() => setShowMonthPicker(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.monthPicker}>
                <ThemedText type="title" style={{textAlign: "center", marginBottom: 8}}>PICK A MONTH</ThemedText>
                <View style={styles.monthContainer}>
                  {months.map((month, index) => (
                    <TouchableOpacity
                      key={month}
                      style={[styles.monthItem, {backgroundColor: (currentDate.getMonth() === index) ? "#007BEF" : "white"}]}
                      onPress={() => handleMonthChange(index)}
                    >
                      <ThemedText type="body2" color={(currentDate.getMonth() === index) ? "white" : "black"} style={styles.monthText}>{month}</ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 20,
  },
  date: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    paddingHorizontal: 13,
    paddingVertical: 8,
    gap: 8,
  },
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
  },
  monthPicker: {
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
  monthItem: {
    padding: 8,
    borderWidth: 1, 
    width: "30%",
    borderColor: "#E0E0E0",
    borderRadius: 4,
    marginVertical: 8,
  },
  monthText: {
    textAlign: "center"
  },
  monthContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  }
});

export default Calendar;