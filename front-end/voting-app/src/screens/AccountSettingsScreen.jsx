import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AccountSettingsScreen = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        if (newPassword === confirmPassword) {
            Alert.alert('Success', 'Password has been changed successfully.');
        } else {
            Alert.alert('Error', 'Passwords do not match.');
        }
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: deleteAccount, style: "destructive" }
            ]
        );
    };

    const deleteAccount = () => {
        Alert.alert("Account Deleted", "Your account has been deleted.");
    };

    return (
        <SafeAreaView style={accountSettingsStyles.container}>
            <Text style={accountSettingsStyles.title}>Account Settings</Text>

            {/* Change Password Section */}
            <View style={accountSettingsStyles.buttonContainer}>
                <TextInput
                    style={accountSettingsStyles.input}
                    placeholder="New Password"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                />

                <TextInput
                    style={accountSettingsStyles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <TouchableOpacity
                    style={[accountSettingsStyles.button, accountSettingsStyles.firstButton]}
                    onPress={handleChangePassword}
                >
                    <Text style={accountSettingsStyles.buttonText}>Change Password</Text>
                </TouchableOpacity>
            </View>

            {/* Delete Account Section */}
            <View style={accountSettingsStyles.buttonContainer}>
                <TouchableOpacity
                    style={[accountSettingsStyles.button, accountSettingsStyles.deleteButton, accountSettingsStyles.lastButton]}
                    onPress={handleDeleteAccount}
                >
                    <Text style={accountSettingsStyles.buttonText}>Delete Account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const accountSettingsStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A2226',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        marginBottom: 40,
    },
    button: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#0DB8DE',
        marginBottom: 10,
    },
    firstButton: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    lastButton: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#34495E',
        color: '#FFFFFF',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#0DB8DE',
    },
    deleteButton: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: '#E74C3C', // Red for delete
    },
});

export default AccountSettingsScreen;