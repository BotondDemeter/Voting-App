// src/screens/HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import homeStyles from '../assets/homeStyles';
import { useAuth } from '../context/AuthContext';

const HomeScreen = () => {
  const { user } = useAuth();

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.text}>Welcome, {user.username}!</Text>
    </View>
  );
};


export default HomeScreen;
