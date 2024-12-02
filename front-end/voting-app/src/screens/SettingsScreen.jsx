import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import settingsStyles from '../assets/settingsStyles';  


const SettingsScreen = () => (
  <SafeAreaView style={settingsStyles.container}>
    <Text style={settingsStyles.text}>Settings</Text>
  </SafeAreaView>
);

export default SettingsScreen;
