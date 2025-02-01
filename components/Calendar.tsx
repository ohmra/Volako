import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import ThemedText from './ThemedText';
import Icons from '@/constants/Icons';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
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

      <Modal visible={showMonthPicker} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.monthPicker}>
            {months.map((month, index) => (
              <TouchableOpacity
                key={month}
                style={styles.monthItem}
                onPress={() => handleMonthChange(index)}
              >
                <Text style={styles.monthText}>{month}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  monthPicker: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  monthItem: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  monthText: {
    fontSize: 16,
  },
});

export default Calendar;