import React, { useState, useEffect } from 'react';
import { 
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  PaperProvider,
  handleSubmit
 } from 'react-native';
 import DateTimePicker  from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import createVotingStyles from '../assets/createVotingStyles';
import { fetchAllCounties } from '../api/county';
import { getCityByCountyName } from '../api/city';
import { createVoting } from '../api/voting';
const CreateVotingScreen = () => {
  const [votingData, setVotingData] = useState({
    name: '',
    description: '',
    isActive: true,
    region: '',
    countyName: '',
    cityName: '',
    candidates: [{ name: '', description: '', party: '' }],
    totalVotes: 0,
    startDate:'',
    endDate:'',
    createdAt: new Date(),
    voters: [],
  });

  const [counties, setCounties] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCounties, setLoadingCounties] = useState(true);
  const [loadingCities, setLoadingCities] = useState(true);
  const [showCountyPicker, setShowCountyPicker] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  
  const handleAddCandidate = () => {
    setVotingData({
      ...votingData,
      candidates: [...votingData.candidates, { name: '', description: '', party: '' }],
    });
  };

  const handleChange = (key, value) => {
    setVotingData({
      ...votingData,
      [key]: value,
    });
  };
  const loadCounties = async () => {
    try {
      const countiesData = await fetchAllCounties();
      setCounties(countiesData);
      setLoadingCounties(false);
    } catch (error) {
      console.error('Error fetching counties:', error);
      setLoadingCounties(false);
    }
  };

  useEffect(() => {
    loadCounties();
  }, []);

  const handleCountyChange = async (countyName) => {
    setVotingData({ ...votingData, countyName, cityName: '' }); 
    setLoadingCities(true);
    try {
      const citiesData = await getCityByCountyName(countyName); 
      setCities(citiesData);
    } catch (error) {
      console.error('Error fetching cities for selected county:', error);
      setCities([]);
    } finally {
      setLoadingCities(false);
    }
  };
  const handleCandidateChange = (index, field, value) => {
    const updatedCandidates = [...votingData.candidates];
    updatedCandidates[index][field] = value;
    setVotingData({ ...votingData, candidates: updatedCandidates });
  };
  const toggleStartDatePicker = () => {
    setShowStartDatePicker(!showStartDatePicker);
  };

  const toggleEndDatePicker = () => {
    setShowEndDatePicker(!showEndDatePicker);
  };

  const handleConfirmStartDate = () => {
    if (date instanceof Date && !isNaN(date)) {
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      setVotingData({
        ...votingData,
        startDate: formattedDate,
      });
      setShowStartDatePicker(false);
    } else {
      console.error("Invalid start date selected");
    }
  };
  const handleConfirmEndDate = () => {
    if (date instanceof Date && !isNaN(date)) {
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      setVotingData({
        ...votingData,
        endDate: formattedDate,
      });
      setShowEndDatePicker(false);
    } else {
      console.error("Invalid end date selected");
    }
  };
  
  const handleCancel = () => {
    setShowDatePicker(false); // Close the picker without saving
  };
  const handleSubmit = async () => {
    try {
      if (votingData.cityName === '') {
        votingData.region = 'Country';
      }else{
        votingData.region = 'City';
      }
      const result = await createVoting(votingData);
      console.log('Voting created successfully!', result);
    } catch (error) {
      console.error('Error creating voting:', error);
    }
  };
  return (
    <SafeAreaView style={createVotingStyles.container}>
      <ScrollView>
        <Text style={createVotingStyles.headerText}>Create New Voting</Text>

        {/* Voting Name */}
        <TextInput
          placeholder="Voting Name"
          style={[createVotingStyles.textInput, createVotingStyles.customTextInput]}
          placeholderTextColor="#0DB8DE"
          value={votingData.name}
          onChangeText={(text) => handleChange('name', text)}
        />

        {/* Voting Description */}
        <TextInput
          placeholder="Voting Description"
          style={[createVotingStyles.textInput, createVotingStyles.customTextInput]}
          placeholderTextColor="#0DB8DE"
          value={votingData.description}
          onChangeText={(text) => handleChange('description', text)}
        />

       {/* County Name Picker */}
       <TouchableOpacity onPress={() => setShowCountyPicker(!showCountyPicker)} style={createVotingStyles.inputWrapper}>
          <Text style={[createVotingStyles.textInput, createVotingStyles.customTextInput]}>
            {votingData.countyName || 'Select County'}
          </Text>
        </TouchableOpacity>
        {showCountyPicker && (
          <View>
            <Picker
              selectedValue={votingData.countyName}
              onValueChange={(itemValue) => handleCountyChange(itemValue)}
            >
              {counties.map((county) => (
                <Picker.Item key={county.id || county.name} label={county.name} value={county.name} color='#0DB8DE' />
              ))}
            </Picker>
          </View>
        )}

        {/* City Name Picker */}
        <TouchableOpacity onPress={() => setShowCityPicker(!showCityPicker)}>
          <Text style={[createVotingStyles.textInput, createVotingStyles.customTextInput]}>
            {votingData.cityName || 'Select City'}
          </Text>
        </TouchableOpacity>
        {showCityPicker && (
          <View>
            <Picker
              selectedValue={votingData.cityName}
              onValueChange={(itemValue) => setVotingData({ ...votingData, cityName: itemValue })}
              enabled={cities.length > 0}
            >
              {cities.map((city) => (
                <Picker.Item key={city.id || city.name} label={city.name} value={city.name} color='#0DB8DE' />
              ))}
            </Picker>
          </View>
        )}

        {/* Start Date */}
    <TouchableOpacity onPress={toggleStartDatePicker}>
      <Text style={[createVotingStyles.textInput, createVotingStyles.customTextInput]}>
        {votingData.startDate || 'Select Start Date'}
      </Text>
    </TouchableOpacity>

    {/* DateTimePicker */}
    {showStartDatePicker && (
      <View style={createVotingStyles.datePickerContainer}>
        <DateTimePicker
          textColor='#0DB8DE'
          alignSelf="center"
          mode="date"
          display="spinner"
          value={date}
          onChange={(event, selectedDate) => {
            if (event.type === 'set') {
              setDate(selectedDate);
            }
          }}
        />
        <View style={createVotingStyles.buttonContainer}>
        <View style={createVotingStyles.submitButtonContainer}>
        <TouchableOpacity
          style={createVotingStyles.submitButton} 
          onPress={handleConfirmStartDate}>
        <Text style={createVotingStyles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        </View>

        <View style={createVotingStyles.submitButtonContainer}>
        <TouchableOpacity 
        style={createVotingStyles.submitButton} 
        onPress={handleCancel}>
          <Text style={createVotingStyles.submitButtonText}>Cancel</Text>
        </TouchableOpacity>
        </View>
      </View>
      </View>
    )}

        {/* End Date */}
    <TouchableOpacity onPress={toggleEndDatePicker}>
      <Text style={[createVotingStyles.textInput, createVotingStyles.customTextInput]}>
        {votingData.endDate || 'Select End Date'}
      </Text>
    </TouchableOpacity>

    {/* DateTimePicker */}
    {showEndDatePicker && (
      <View style={createVotingStyles.datePickerContainer}>
        <DateTimePicker
          textColor='#0DB8DE'
          alignSelf="center"
          mode="date"
          display="spinner"
          value={date}
          onChange={(event, selectedDate) => {
            if (event.type === 'set') {
              setDate(selectedDate);
            }
          }}
        />
        <View style={createVotingStyles.buttonContainer}>
        <View style={createVotingStyles.submitButtonContainer}>
        <TouchableOpacity
          style={createVotingStyles.submitButton} 
          onPress={handleConfirmEndDate}>
        <Text style={createVotingStyles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        </View>

        <View style={createVotingStyles.submitButtonContainer}>
        <TouchableOpacity 
        style={createVotingStyles.submitButton} 
        onPress={handleCancel}>
          <Text style={createVotingStyles.submitButtonText}>Cancel</Text>
        </TouchableOpacity>
        </View>
      </View>
      </View>
    )}

        {/* Candidates Section */}
        <View>
          <Text style={createVotingStyles.headerText}>Candidates</Text>
          {votingData.candidates.map((candidate, index) => (
            <View key={index} style={createVotingStyles.candidateContainer}>
              <TextInput
                placeholder="Candidate Name"
                style={[createVotingStyles.textInput, createVotingStyles.customTextInput]}
                placeholderTextColor="#0DB8DE"
                value={candidate.name}
                onChangeText={(text) => handleCandidateChange(index, 'name', text)}
              />
              <TextInput
                placeholder="Candidate Description (optional)"
                style={[createVotingStyles.textInput, createVotingStyles.customTextInput]}
                placeholderTextColor="#0DB8DE"
                value={candidate.description}
                onChangeText={(text) => handleCandidateChange(index, 'description', text)}
              />
              <TextInput
                placeholder="Party (optional)"
                style={[createVotingStyles.textInput, createVotingStyles.customTextInput]}
                placeholderTextColor="#0DB8DE"
                value={candidate.party}
                onChangeText={(text) => handleCandidateChange(index, 'party', text)}
              />
            </View>
          ))}
        </View>

        {/* Add Candidate Button */}
        <TouchableOpacity style={createVotingStyles.addButton} onPress={handleAddCandidate}>
          <Text style={createVotingStyles.addButtonText}>+ Add Candidate</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity style={createVotingStyles.addButton} onPress={handleSubmit}>
        <Text style={createVotingStyles.addButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateVotingScreen;
