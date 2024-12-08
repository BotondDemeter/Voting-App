import { apiClient } from './client';

export const createVoting = async (votingData) => {
    try {
        const response = await apiClient.post('/votings/create', votingData);
        return response.data;
    } catch (error) {
        console.error('Error creating voting:', error);
        throw new Error('Failed to create voting.');
    }
};

export const getActiveVotings = async () => {
    try {
        const response = await apiClient.get('/votings/active');
        return response.data;
    } catch (error) {
        console.error('Error fetching active votings:', error);
        throw new Error('Failed to fetch active votings.');
    }
};

export const setVotingInactive = async (id) => {
    try {
        const response = await apiClient.patch(`/votings/inactive/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error setting voting inactive:', error);
        throw new Error('Failed to set voting inactive.');
    }
};

export const voteForCandidate = async (votingId, candidateId) => {
    try {
        const response = await apiClient.post(`/votings/vote/${votingId}/${candidateId}`);
        return response.data;
    } catch (error) {
        console.error('Error voting for candidate:', error);
        throw new Error('Failed to vote for candidate.');
    }
};

export const getVotingHistory = async (userId) => {
    try {
        const response = await apiClient.get(`/votings/history/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching voting history:', error);
        throw new Error('Failed to fetch voting history.');
    }
};

export const getVotingsByCityName = async (countyName, cityName) => { 
    try {
        const response = await apiClient.get(`/votings/county/${countyName}/city/${cityName}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching votings by city name:', error);
        throw new Error('Failed to fetch votings by city name.');
    }
};

export const getVotingsByCountyName = async (countyName) => {
    try {
        const response = await apiClient.get(`/votings/county/${countyName}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching votings by county name:', error);
        throw new Error('Failed to fetch votings by county name.');
    }
};
