import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
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
      color: '#0DB8DE',
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
    
export default homeStyles;