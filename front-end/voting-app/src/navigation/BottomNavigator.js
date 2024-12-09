import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import tabBarStyles from '../assets/tabBarStyles';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Profile') iconName = 'user';
          else if (route.name === 'History') iconName = 'history';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: tabBarStyles.activeTintColor,
        tabBarInactiveTintColor: tabBarStyles.inactiveTintColor,
        tabBarStyle: tabBarStyles.tabBarStyle,
        tabBarLabelStyle: tabBarStyles.labelStyle,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={ProfileScreen} />
      <Tab.Screen name="Profile" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
