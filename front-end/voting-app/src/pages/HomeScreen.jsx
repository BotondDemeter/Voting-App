// src/screens/HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import homeStyles from '../assets/homeStyles';
import { useAuth } from '../context/AuthContext';

const HomeScreen = () => {
  const { user } = useAuth();

  return (
    <View style={homeStyles.container}>
      <Text>Welcome to the Home Screen!</Text>
      {user ? (
        <Text>User: {user.username}, {user.cnp}</Text>  // Show username if user is logged in
      ) : (
        <Text>No user data available</Text>  // Handle the case when user is null
      )}
    </View>
  );
};


export default HomeScreen;
