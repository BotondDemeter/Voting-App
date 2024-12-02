// src/screens/HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import homeStyles from '../assets/homeStyles';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const { user } = useAuth();
  return (
    <SafeAreaView style={homeStyles.container}>
      <Text style={homeStyles.text}>Welcome, {user.username}!, {user.type}</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
