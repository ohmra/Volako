import { View, Text, Image, ImageSourcePropType, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import Icons from '@/constants/Icons'
import { TransitionSpecs } from '@react-navigation/bottom-tabs';
import { Easing } from 'react-native-reanimated';

type TabIconProps = {
  icon: ImageSourcePropType;        
};

const TabIcon = ({icon} : TabIconProps) => {
  return <View>
    <Image style={styles.icon}
      source={icon}
      resizeMode="contain"
    />
  </View>
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#616161',
          tabBarInactiveTintColor: '#616161',
          tabBarStyle: {height: 55},
          tabBarLabelStyle: {
            fontSize: 12,
            lineHeight: 16
          },
          tabBarButton: (props) => {
            const safeProps = Object.fromEntries(
              Object.entries(props).map(([key, value]) => [key, value === null ? undefined : value])
            );
          
            return <TouchableOpacity {...safeProps} />},
          animation: "shift",
          
        }}
      >
        <Tabs.Screen name="index" options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon
              icon={focused ? Icons.homeFocused : Icons.home}              
            /> 
          )
        }}
        />
        <Tabs.Screen name="report" options={{
          title: "Report",
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon
              icon={focused ? Icons.reportFocused : Icons.report}              
            /> 
          )
        }}
        />
        <Tabs.Screen name="settings" options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon
              icon={focused ? Icons.settingsFocused : Icons.settings}              
            /> 
          )
        }}
        />
      </Tabs>
    </>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  }
})
export default TabsLayout