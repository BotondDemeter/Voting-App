import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList, StyleSheet, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import VotingCard from '../components/VotingCard';
import useVoting from '../hooks/useVoting';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { fetchVotingsByCountyName, fetchVotingsByCityName } = useVoting();

  const [countyVotings, setCountyVotings] = useState([]);
  const [cityVotings, setCityVotings] = useState([]);

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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            Welcome, {user?.first_name || 'Guest'}
          </Text>
          <Text style={styles.infoText}>
            Role: {user?.type || 'USER'} | County: {user?.county || 'COUNTY'} | City: {user?.city || 'CITY'}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>County Votings</Text>
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
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <Text style={styles.noDataText}>No active votings in your county.</Text>
        )}

        <Text style={styles.sectionTitle}>City Votings</Text>
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
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <Text style={styles.noDataText}>No active votings in your city.</Text>
        )}
      </ScrollView>

      {user?.type === 'ORGANIZER' && (
        <FAB
          style={styles.fab}
          icon="plus"
          label="Create Voting"
          onPress={handleCreateVoting}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2226',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,  // Ensure there's space at the bottom for the FAB
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoText: {
    fontSize: 16,
    color: '#B0BEC5',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F9AA33',
    marginBottom: 10,
    marginTop: 20,
  },
  listContent: {
    marginBottom: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#B0BEC5',
    textAlign: 'center',
    marginVertical: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007bff',
    borderRadius: 50,
  
  },
});

export default HomeScreen;