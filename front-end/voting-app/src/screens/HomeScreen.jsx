import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList, StyleSheet, ScrollView } from 'react-native';
import { LogBox } from 'react-native';
import { FAB } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import VotingCard from '../components/VotingCard';
import useVoting from '../hooks/useVoting';
import homeStyles from '../assets/homeStyles';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { fetchVotingsByCountyName, fetchVotingsByCityName } = useVoting();

  const [countyVotings, setCountyVotings] = useState([]);
  const [cityVotings, setCityVotings] = useState([]);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  useEffect(() => {
    fetchVotingsByCountyName(user?.county)
      .then((fetchedVotings) => {
        setCountyVotings(fetchedVotings.filter((v) => v.isActive));
      })
      .catch(() => Alert.alert('Error', 'Failed to load county votings.'));
  }, [user?.county]);

  useEffect(() => {
    fetchVotingsByCityName(user?.city, user?.county)
      .then((fetchedVotings) => {
        setCityVotings(fetchedVotings.filter((v) => v.isActive));
      })
      .catch(() => Alert.alert('Error', 'Failed to load city votings.'));
  }, [user?.city, user?.county]);

  const handleCreateVoting = () => {
    navigation.navigate('CreateVotingScreen');
  };

  return (
    <SafeAreaView style={homeStyles.container}>
      <ScrollView contentContainerStyle={homeStyles.scrollContainer}>
        <View style={homeStyles.header}>
          <Text style={homeStyles.infoText}>
            Welcome, {user?.first_name || 'Guest'}
          </Text>
          <Text style={homeStyles.infoText}>
            Role: {user?.type || 'USER'} | County: {user?.county || 'COUNTY'} | City: {user?.city || 'CITY'}
          </Text>
        </View>

        <Text style={homeStyles.sectionTitle}>County Votings</Text>
        {countyVotings.length > 0 ? (
          <FlatList
            data={countyVotings}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <VotingCard
                voting={item}
                onDetailsPress={() =>
                  navigation.navigate('VoteDetailedScreen', { _id: item._id })
                }
              />
            )}
            contentContainerStyle={homeStyles.listContent}
          />
        ) : (
          <Text style={homeStyles.noDataText}>No active votings in your county.</Text>
        )}

        <Text style={homeStyles.sectionTitle}>City Votings</Text>
        {cityVotings.length > 0 ? (
          <FlatList
            data={cityVotings}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <VotingCard
                voting={item}
                onDetailsPress={() =>
                  navigation.navigate('VoteDetailedScreen', { _id: item._id })
                }
              />
            )}
            contentContainerStyle={homeStyles.listContent}
          />
        ) : (
          <Text style={homeStyles.noDataText}>No active votings in your city.</Text>
        )}
      </ScrollView>

      {user?.type === 'ORGANIZER' && (
        <FAB
          style={homeStyles.fab}
          icon="plus"
          label="Create Voting"
          onPress={handleCreateVoting}
        />
      )}
    </SafeAreaView>
  );
};


export default HomeScreen;