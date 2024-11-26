import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import loginStyles from '../assets/loginStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import useLogin from '../hooks/useLogin';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser, loading, error } = useLogin();

  const handleLogin = async () => {
    
    if (!username.trim() || !password.trim()) {
      Alert.alert('Missing Information', 'Please fill in both username and password.');
      return;
    }

    const isSuccess = await loginUser(username, password);

    if (isSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    } else if (error) {
      Alert.alert('Login Failed', 'The username or password is incorrect.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[loginStyles.loginBox, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}
      >
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
              disabled={loading}
            >
              <Text style={loginStyles.loginButtonText}>
                {loading ? 'Logging in...' : 'LOG IN'}
              </Text>
            </TouchableOpacity>
            <Text style={loginStyles.register}>
              Don't have an account?{' '}
              <Text style={loginStyles.signUp} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'SignUp' }] })}>
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
