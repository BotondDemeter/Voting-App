// LoginScreen.jsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import useUser from '../hooks/useUser';

const LoginScreen = ({ navigation }) => {
  const { users, loading, error } = useUser();
  const handleLogin = () => {
    console.log('Login button pressed');
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome to the Voting App!</Text>
      <Button title="Login" onPress={handleLogin} />
      {loading && <Text>Loading users...</Text>}
      {error && <Text>Error: {error.message}</Text>}

      {!loading && !error && (
        <FlatList
          data={users}
          keyExtractor={user => user._id}
          renderItem={({ item }) => (
            <Text>{item.name}</Text>
          )}
        />
      )}
    </View>
  );
};

export default LoginScreen;
