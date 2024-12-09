import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

const HistoryVotingCard = ({ voting , onDetailsPress}) => {
    const { user } = useAuth();

    const hasVoted = voting.voters.includes(user._id);

    const getWinner = () => {
        if (!voting.isActive) {
            const winner = voting.candidates.reduce((prev, current) => {
                return (prev.votes > current.votes) ? prev : current;
            }, {});
            return winner.name;
        }
        return 'No Winner yet';  
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onDetailsPress}>
            <Text style={styles.winnerLabel}>Winner: {getWinner()}</Text>

            <View style={styles.header}>
                <Text style={styles.title}>{voting.name}</Text>
            </View>

            <Text style={styles.text}>{voting.description}</Text>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#37474F',
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
    text: {
        fontSize: 16,
        color: '#B0BEC5',
        marginBottom: 15,
    },
    winnerLabel: {
        backgroundColor: '#E0F7E7',
        color: '#0DB8DE',
        fontSize: 14,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        overflow: 'hidden',
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
});

export default HistoryVotingCard;