import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import profileStyles from '../assets/profileStyles';

const ProfileScreen = () => (
  <SafeAreaView style={profileStyles.container}>
    <Text style={profileStyles.text}>Profile</Text>
  </SafeAreaView>
);

export default ProfileScreen;
