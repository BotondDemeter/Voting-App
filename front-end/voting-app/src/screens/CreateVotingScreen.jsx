import React from 'react';
import { View, Text, TextInput, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback,
    Keyboard
 } from 'react-native';
import createVotingStyles from '../assets/createVotingStyles';

const CreateVotingScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={createVotingStyles.container}>
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        ></KeyboardAvoidingView>
      <Text style={createVotingStyles.text}>Create New Voting</Text>
      <TextInput placeholder="Voting Name" style={createVotingStyles.text}/>
      <TextInput placeholder="Voting Description" />
      <Button title="Create Voting" onPress={() => { /* Handle create voting */ }} />
    </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateVotingScreen;
