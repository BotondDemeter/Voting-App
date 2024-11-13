import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import loginStyles from '../assets/loginStyles';  // Assume this is your custom styling
import Icon from 'react-native-vector-icons/FontAwesome';
import useLogin from '../hooks/useLogin';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Destructure the useLogin hook
  const { loginUser, loading, error } = useLogin();

  // Handle the login action
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    await loginUser(username, password); // Call the loginUser function

    if (error) {
      Alert.alert('Login Failed', error);
    } else {
      // Redirect to the home screen or another screen on successful login
      navigation.navigate('Home');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[loginStyles.loginBox, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
        <View style={loginStyles.loginKey}>
          <Icon name="key" size={40} color="white" />
        </View>
        <Text style={loginStyles.loginTitle}>Please log in!</Text>

        <View style={loginStyles.loginForm}>
          <View style={loginStyles.formGroup}>
            <Text style={loginStyles.label}>USERNAME</Text>
            <TextInput
              style={loginStyles.input}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <View style={loginStyles.formGroup}>
            <Text style={loginStyles.label}>PASSWORD</Text>
            <TextInput
              style={loginStyles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={loginStyles.loginButtonContainer}>
            <TouchableOpacity
              style={loginStyles.loginButton}
              onPress={handleLogin}
              disabled={loading}  // Disable button while loading
            >
              <Text style={loginStyles.loginButtonText}>
                {loading ? 'Logging in...' : 'LOG IN'}
              </Text>
            </TouchableOpacity>
            <Text style={loginStyles.register}>
              Don't have an account?{' '}
              <Text style={loginStyles.signUp} onPress={() => navigation.navigate('SignUp')}>
                Sign Up!
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
