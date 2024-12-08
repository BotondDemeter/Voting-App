// src/screens/HomeScreen.js
import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { FAB } from 'react-native-paper';
import homeStyles from '../assets/homeStyles';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    console.log('User:', user);
  }, [user])

  const handleCreateVoting = () => {
    navigation.navigate('CreateVotingScreen');
  };

  return (
    <SafeAreaView style={homeStyles.container}>
      <Text style={homeStyles.text}>Welcome, {user.first_name}, {user.type}</Text>

      {user.type === 'ORGANIZER' && (
        <FAB
          style={homeStyles.fab}
          icon="plus"
          label="Create Voting"
          onPress={handleCreateVoting}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
