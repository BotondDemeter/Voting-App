import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import settingsStyles from '../assets/settingsStyles';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const { user, logout } = useAuth();

  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: userLogOut, style: "destructive" }
      ]
    );
  };

  const userLogOut = async () => {
    await logout();
    navigation.navigate('Login');
  };




  const showNotImplementedAlert = (feature) => {
    Alert.alert(`${feature} Not Implemented`, `The ${feature} feature is not available yet.`);
  };


  return (
    <SafeAreaView style={settingsStyles.container}>
      <Text style={settingsStyles.title}>Settings</Text>

      <View style={settingsStyles.buttonContainer}>
        <TouchableOpacity
          style={[settingsStyles.button, settingsStyles.firstButton]}
          onPress={() => navigation.navigate('AccountSettingsScreen')}
        >
          <Text style={settingsStyles.buttonText}>Account Settings</Text>
        </TouchableOpacity>

        {user?.type === 'ORGANIZER' && (
          <TouchableOpacity
            style={settingsStyles.button}
            onPress={() => navigation.navigate('VotingSettingsScreen')}
          >
            <Text style={settingsStyles.buttonText}>Voting Settings</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={settingsStyles.button}
          onPress={() => showNotImplementedAlert("Privacy & Security")}
        >
          <Text style={settingsStyles.buttonText}>Privacy & Security</Text>
        </TouchableOpacity>



        <TouchableOpacity
          style={[settingsStyles.button, settingsStyles.lastButton]}
          onPress={() => showNotImplementedAlert("Help & Support")}
        >
          <Text style={settingsStyles.buttonText}>Help & Support</Text>
        </TouchableOpacity>
      </View>

      <View style={settingsStyles.logoutContainer}>
        <TouchableOpacity
          style={settingsStyles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={settingsStyles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;