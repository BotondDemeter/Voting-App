import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1A2226',
        },
        text:{
            color: '#ECF0F5',
            fontSize: 20
        },
        fab: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: '#007bff',
            borderRadius: 50
          }
    });
    
export default homeStyles;