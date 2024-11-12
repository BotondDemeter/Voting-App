// src/navigation/AppNavigator.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthStack from './AuthStack'; 
import AppStack from './AppStack';

export default function AppNavigator() {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <AppStack /> : <AuthStack />;
}
