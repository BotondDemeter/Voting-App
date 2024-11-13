import React, { useState } from 'react';
import { View, Text, TextInput, Alert, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import signUpStyles from '../assets/signUpStyles';
import loginStyles from '../assets/loginStyles';

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match", "Please make sure both passwords are the same.");
            return;
        }

        if (!username || !password || !confirmPassword) {
            Alert.alert("Input Error", "Please fill in all the fields.");
            return;
        }

        console.log("Signing up!");
        navigation.navigate('Login');
    };

    const openCamera = async () => {
        // Request camera permissions
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert("Permission Denied", "Camera access is required to upload your ID.");
            return;
        }

        // Launch the camera
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log("Photo URI: ", result.assets[0].uri);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[loginStyles.loginBox, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
            >
                <View style={loginStyles.loginKey}>
                    <Icon name="key" size={40} color="white" />
                </View>
                <Text style={loginStyles.loginTitle}>Sign Up to the Voting App!</Text>
                
                <View style={signUpStyles.idButtonContainer}>
                    <TouchableOpacity style={signUpStyles.IdButton} onPress={openCamera}>
                        <Icon name="camera" style={signUpStyles.cameraIcon} />
                        <Text style={loginStyles.loginButtonText}>UPLOAD YOUR ID</Text>
                    </TouchableOpacity>
                </View>

                <View style={loginStyles.loginForm}>
                    <View style={loginStyles.formGroup}>
                        <Text style={loginStyles.label}>ENTER YOUR USERNAME</Text>
                        <TextInput
                            style={loginStyles.input}
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>

                    <View style={loginStyles.formGroup}>
                        <Text style={loginStyles.label}>SET A PASSWORD</Text>
                        <TextInput
                            style={loginStyles.input}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <View style={loginStyles.formGroup}>
                        <Text style={loginStyles.label}>CONFIRM YOUR PASSWORD</Text>
                        <TextInput
                            style={loginStyles.input}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
                    </View>

                    <View style={loginStyles.loginButtonContainer}>
                        <TouchableOpacity style={loginStyles.loginButton} onPress={handleSignUp}>
                            <Text style={loginStyles.loginButtonText}>SIGN UP</Text>
                        </TouchableOpacity>
                            <Text style={loginStyles.register}>
                                Already have an account? <Text style={loginStyles.signUp} onPress={() => navigation.navigate('Login')}>Log In!</Text>
                            </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default SignUpScreen;
