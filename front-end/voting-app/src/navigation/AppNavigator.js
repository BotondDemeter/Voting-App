// src/navigation/AppNavigator.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthStack from './AuthStack'; 
import AppStack from './AppStack';
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigation } from 'react-native-paper';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      {isAuthenticated ? <BottomNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
