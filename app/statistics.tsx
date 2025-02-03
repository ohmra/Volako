import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Calendar from '@/components/Calendar';

const Statistics = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate}/>
  )
}

export default Statistics