import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesForAll from '../assets/stylesForAll';
import loginStyles from '../assets/loginStyles';


const SignUpScreen = (navigation) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const handleSignUp = () => {
        console.log("Signing ip!");
        navigation.navigate('Login')
    }
    return (
        <View style={stylesForAll.container}>
            <View style={loginStyles.loginBox}>
            <View style={loginStyles.loginKey}>
            <Icon name="key" size={40} color="white" />
            </View>
            <Text style={loginStyles.loginTitle}>Sign Up to the Voting App!</Text>
            </View>
        </View>
    );
};


export default SignUpScreen;
