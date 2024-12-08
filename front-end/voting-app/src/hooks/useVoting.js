import { useState } from 'react';
import {
  createVoting as apiCreateVoting,
  getActiveVotings as apiGetActiveVotings,
  setVotingInactive as apiSetVotingInactive,
  voteForCandidate as apiVoteForCandidate,
  getVotingHistory as apiGetVotingHistory,
  getVotingsByCityName as apiGetVotingsByCityName,
  getVotingsByCountyName as apiGetVotingsByCountyName
} from '../api/voting';

const useVoting = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createVoting = async (votingData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCreateVoting(votingData);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to create voting.');
      throw err; // Re-throw error to handle it outside the hook if necessary
    } finally {
      setLoading(false);
    }
  };

  const fetchAllActiveVotings = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiGetActiveVotings();
      return result;
    } catch (err) {
      setError(err.message || 'Failed to fetch active votings.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const setVotingInactive = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiSetVotingInactive(id);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to set voting inactive.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const voteForCandidate = async (votingId, candidateId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiVoteForCandidate(votingId, candidateId);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to vote for candidate.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchVotingHistory = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiGetVotingHistory(userId);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to fetch voting history.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchVotingsByCityName = async (cityName, countyName) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiGetVotingsByCityName(cityName, countyName);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to fetch votings by city name.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchVotingsByCountyName = async (countyName) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiGetVotingsByCountyName(countyName);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to fetch votings by county name.');
      throw err;
    } finally {
      setLoading(false);
    }
  };


  return {
    createVoting,
    fetchAllActiveVotings,
    setVotingInactive,
    voteForCandidate,
    fetchVotingHistory,
    fetchVotingsByCityName,
    fetchVotingsByCountyName,
    loading,
    error,
  };
};

export default useVoting;