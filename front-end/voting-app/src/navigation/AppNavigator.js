// src/navigation/AppNavigator.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthStack from './AuthStack'; 
import AppStack from './AppStack';
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigation } from 'react-native-paper';
import CreateVotingScreen from '../screens/CreateVotingScreen';
import HomeScreen from '../screens/HomeScreen';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      {isAuthenticated ? <BottomNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
