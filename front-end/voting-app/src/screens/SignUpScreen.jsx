import React, { useState, useEffect } from 'react';
import { 
    View, Text, TextInput, Alert, KeyboardAvoidingView, Platform, TouchableOpacity, 
    TouchableWithoutFeedback, Keyboard, Image, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import signUpStyles from '../assets/signUpStyles';
import loginStyles from '../assets/loginStyles';
import axios from 'axios';

const SignUpScreen = ({ navigation }) => {
    const [scannedImage, setScannedImage] = useState(null);
    const [apiResponse, setApiResponse] = useState(null);

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


    const handlePickImage = async () => {
        try {
            const result = await launchImageLibraryAsync({
                mediaTypes: MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 1,
            });

            console.log('Image picker result:', result);

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const selectedAsset = result.assets[0];
                console.log('Selected image URI:', selectedAsset.uri);

                setScannedImage(selectedAsset.uri);

                // Prepare FormData for API call
                const formData = new FormData();
                formData.append('image', {
                    uri: selectedAsset.uri,
                    name: 'document.jpg', // Adjust if needed
                    type: 'image/jpeg', // Adjust based on file type
                });

                // Call the API
                const response = await axios.post('http://192.168.1.206:3000/api/process-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('API response:', response.data);

                setApiResponse(response.data);
                navigation.navigate('CompleteSignUp', { apiResponse: response.data });
            } else {
                console.log('No image selected or operation was canceled.');
                Alert.alert('No Image', 'You did not select any image.');
            }
        } catch (error) {
            console.error('Error selecting or uploading image:', error);
            Alert.alert('Error', 'An error occurred while selecting or uploading the image.');
        }
    };
    

    return (
        <View style={{ flex: 1}}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[loginStyles.loginBox]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}} keyboardShouldPersistTaps="handled">
                <View style={loginStyles.loginKey}>
                    <Icon name="key" size={40} color="white" />
                </View>
                <Text style={loginStyles.loginTitle}>Sign Up to the Voting App!</Text>

                <View style={signUpStyles.idButtonContainer}>
                    <TouchableOpacity 
                        style={signUpStyles.IdButton} 
                        onPress={handlePickImage}
                    >
                        <Icon name="camera" style={signUpStyles.cameraIcon} />
                        <Text style={signUpStyles.IdButtonText}>SELECT A PICTURE OF YOUR ID</Text>
                    </TouchableOpacity>
                </View>
                <View style={loginStyles.loginForm}>

                   

                    <View style={loginStyles.loginButtonContainer}>
                        <Text style={loginStyles.register}>Already have an account? 
                            <Text style={loginStyles.signUp} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}>Log In!</Text>
                        </Text>
                    </View>
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default SignUpScreen;
