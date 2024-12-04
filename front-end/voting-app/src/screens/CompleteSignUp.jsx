import { View, Text } from "react-native";
import { TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import loginStyles from "../assets/loginStyles";
import { useState } from "react";
import useRegister from "../hooks/useRegister";
import completeSignUpStyles from "../assets/completeSignUpStyles";


const CompleteSignUp = ({route}) => {
    const {apiResponse} = route.params;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { registerUser } = useRegister();

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match', 'Please make sure both passwords are the same.');
            return;
        }

        const userData = {
            ...apiResponse,
            password,
            confirmPassword
        };

        
        console.log('User Data:', userData);

        try{
            registerUser(apiResponse.cnp, apiResponse.first_name, apiResponse.id_number, apiResponse.last_name, apiResponse.nationality, password, confirmPassword);
        } catch (err) {
            console.log(err);
        }
        

    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={completeSignUpStyles.container}>
           <View style={loginStyles.loginForm}>
                <View style={loginStyles.formGroup}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={completeSignUpStyles.label}>CNP: </Text>
                    <Text style={completeSignUpStyles.responses}>{apiResponse.cnp}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={completeSignUpStyles.label}>First Name: </Text>
                    <Text style={completeSignUpStyles.responses}>{apiResponse.first_name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={completeSignUpStyles.label}>Last Name: </Text>
                    <Text style={completeSignUpStyles.responses}>{apiResponse.last_name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={completeSignUpStyles.label}>Nationality: </Text>
                    <Text style={completeSignUpStyles.responses}>{apiResponse.nationality}</Text>
                </View>

                                <Text style={completeSignUpStyles.passwordLabel}>SET A PASSWORD</Text>
                                <TextInput
                                    style={completeSignUpStyles.input}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />

                                <Text style={completeSignUpStyles.passwordLabel}>CONFIRM YOUR PASSWORD</Text>
                                <TextInput
                                    style={completeSignUpStyles.input}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                />
                    </View>
            </View>

            <View style={completeSignUpStyles.submitButtonContainer}>
            <TouchableOpacity onPress={handleSubmit} style={completeSignUpStyles.submitButton}>
                        <Text style={completeSignUpStyles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )    
};

export default CompleteSignUp;