import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import BottomTabNavigator from './src/navigation/BottomNavigator';
import { AuthProvider } from './src/context/AuthContext';
import CompleteSignUp from './src/screens/CompleteSignUp';
import CreateVotingScreen from './src/screens/CreateVotingScreen';
import VoteDetailedScreen from './src/screens/VoteDetailedScreen';
import AccountSettingsScreen from './src/screens/AccountSettingsScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="CompleteSignUp" component={CompleteSignUp} options={{ headerShown: false }} />
          <Stack.Screen name="CreateVotingScreen" component={CreateVotingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="VoteDetailedScreen" component={VoteDetailedScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AccountSettingsScreen" component={AccountSettingsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
