import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert ,ScrollView} from 'react-native';
import { LogBox } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import HistoryVotingCard from '../components/HistoryVotingCard';
import { useNavigation } from '@react-navigation/native';
import useVoting from '../hooks/useVoting';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [historyVotings, setHistoryVotings] = useState([]);  

  const { fetchVotingHistory } = useVoting();

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  useEffect(() => {
    fetchVotingHistory(user?._id)
      .then((fetchedVotings) => {
        console.log(fetchedVotings); 
        setHistoryVotings(fetchedVotings?.data || []); 
      })
      .catch(() => Alert.alert('Error', 'Failed to load county votings.'));
  }, [user?._id]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      
      <Text style={styles.sectionTitle}>History Votings</Text>
      {historyVotings.length > 0 ? (
        <FlatList
          data={historyVotings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <HistoryVotingCard
              voting={item}
              onDetailsPress={() =>
                navigation.navigate('VoteDetailedScreen', { _id: item._id })
              }
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.noDataText}>No votings found in your history.</Text>
      )}
      </ScrollView>
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
    paddingBottom: 100,  
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

export default ProfileScreen;