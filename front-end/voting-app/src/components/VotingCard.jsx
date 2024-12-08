import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useAuth } from '../context/AuthContext';

const VotingCard = ({ voting, onDetailsPress }) => {
    const { user } = useAuth();  // Current user

    const hasVoted = voting.voters.includes(user._id);

    return (
        <TouchableOpacity style={[styles.card, hasVoted && styles.votedCard]} onPress={onDetailsPress}>
            {hasVoted && <Text style={styles.votedLabel}>Already Voted</Text>}
            <View style={styles.header}>
                <Text style={styles.title}>{voting.name}</Text>
            </View>

            <Text style={styles.text}>{voting.description}</Text>

            <View style={styles.infoRow}>
                <View style={styles.infoBlock}>
                    <Text style={styles.infoLabel}>County</Text>
                    <Text style={styles.infoValue}>{voting.countyName}</Text>
                </View>

                {voting.cityName && (
                    <View style={styles.infoBlock}>
                        <Text style={styles.infoLabel}>City</Text>
                        <Text style={styles.infoValue}>{voting.cityName}</Text>
                    </View>
                )}

                <View style={styles.infoBlock}>
                    <Text style={styles.infoLabel}>Total Votes</Text>
                    <Text style={styles.infoValue}>{voting.totalVotes}</Text>
                </View>
            </View>

            <Text style={styles.candidateLabel}>Candidates</Text>
            <FlatList
                data={voting.candidates}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Text style={styles.candidateName}>• {item.name}</Text>
                )}
                contentContainerStyle={styles.candidateList}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#212121',  // Darker background for the card
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
        transition: 'transform 0.3s ease-in-out',
    },
    votedCard: {
        backgroundColor: '#37474F',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    votedLabel: {
        backgroundColor: '#E0F7E7',
        color: '#2E7D32',
        fontSize: 14,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        overflow: 'hidden',
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#B0BEC5',
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    infoBlock: {
        alignItems: 'center',
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        color: '#90A4AE',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    candidateLabel: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: '#B0BEC5',
    },
    candidateList: {
        paddingLeft: 8,
    },
    candidateName: {
        fontSize: 16,
        color: '#B0BEC5',
        marginBottom: 4,
    },
});

export default VotingCard;