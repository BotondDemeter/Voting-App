import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList, Button, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import useVoting from '../hooks/useVoting';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VoteDetailedScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { _id } = route.params;  // Voting ID
    const { fetchVotingById, voteForCandidate } = useVoting();
    const { user } = useAuth(); // Current user

    const [voting, setVoting] = useState(null);

    useEffect(() => {
        fetchVotingById(_id)
            .then((response) => {
                console.log('Fetched voting:', response);
                setVoting(response.data);
            })
            .catch((error) => {
                console.error('Error fetching voting by ID:', error);
                Alert.alert('Error', 'Failed to load voting details.');
            });
    }, [_id]);

    const handleVote = async (candidateId) => {
        try {
            const result = await voteForCandidate(user._id, _id, candidateId);
            console.log('Vote registered:', result);
            Alert.alert('Success', 'Your vote was registered successfully.');
            fetchVotingById(_id).then((response) => setVoting(response.data));
            navigation.navigate('Home');
        } catch (error) {
            console.error('Vote error:', error);
            Alert.alert('Error', 'Failed to register your vote.');
        }
    };

    if (!voting) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </SafeAreaView>
        );
    }

    const hasVoted = voting.voters.includes(user._id);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>{voting.name}</Text>
            <Text style={styles.descriptionText}>{voting.description}</Text>

            <View style={styles.detailsContainer}>
                <Text style={styles.subHeading}>Region: <Text style={styles.detailsText}>{voting.region}</Text></Text>
                <Text style={styles.subHeading}>County: <Text style={styles.detailsText}>{voting.countyName}</Text></Text>
                {voting.cityName && <Text style={styles.subHeading}>City: <Text style={styles.detailsText}>{voting.cityName}</Text></Text>}
                <Text style={styles.subHeading}>Total Votes: <Text style={styles.detailsText}>{voting.totalVotes}</Text></Text>
                <Text style={styles.subHeading}>Start Date: <Text style={styles.detailsText}>{new Date(voting.startDate).toLocaleString()}</Text></Text>
                <Text style={styles.subHeading}>End Date: <Text style={styles.detailsText}>{new Date(voting.endDate).toLocaleString()}</Text></Text>
            </View>

            <Text style={styles.candidateHeading}>Candidates:</Text>
            <FlatList
                scrollEnabled={true}
                data={voting.candidates}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.candidateContainer}>
                        <Text style={styles.candidateName}>{item.name}</Text>
                        <Text style={styles.candidateDescription}>{item.description}</Text>

                        {!hasVoted && (
                            <Button
                                title={`Vote for ${item.name}`}
                                onPress={() => handleVote(item._id)}
                                color="#F9AA33"
                            />
                        )}
                    </View>
                )}
                ListFooterComponent={<View style={{ height: 100 }} />}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
};

export default VoteDetailedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1A2226',
    },
    scrollContainer: {
        paddingBottom: 100,
    },
    loadingText: {
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#F9AA33',
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 20,
    },
    detailsContainer: {
        marginBottom: 20,
        backgroundColor: '#2A2E36',
        padding: 15,
        borderRadius: 8,
        elevation: 3,
    },
    subHeading: {
        fontSize: 16,
        color: '#B0BEC5',
        marginBottom: 5,
    },
    detailsText: {
        fontWeight: 'bold',
        color: '#F9AA33',
    },
    candidateHeading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#F9AA33',
        marginVertical: 15,
    },
    candidateContainer: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        elevation: 2,
    },
    candidateName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    candidateDescription: {
        fontSize: 14,
        color: '#777',
        marginVertical: 10,
    },
    listContent: {
        paddingBottom: 50,
    },
});