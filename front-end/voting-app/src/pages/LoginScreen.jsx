import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import loginStyles from '../assets/loginStyles';
import stylesForAll from '../assets/stylesForAll';


const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log("Logging in with:", username, password);
  };

  return (
    <View style={stylesForAll.container}>
      <View style={loginStyles.loginBox}>
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
            <TouchableOpacity style={loginStyles.loginButton} onPress={handleLogin}>
              <Text style={loginStyles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>
            <Text style={loginStyles.register}>
              Don't have an account? <Text style= {loginStyles.signUp} onPress={() => navigation.navigate('SignUp') }>Sign Up!</Text></Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
