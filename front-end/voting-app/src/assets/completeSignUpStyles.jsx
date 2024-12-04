import { StyleSheet } from "react-native";

const completeSignUpStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A2226',
    },
    label: {
        color: 'white',
        fontSize: 14,
        marginLeft: 5,
        lineHeight: 20, 
        marginBottom: 15
    },
    responses: {
        backgroundColor: '#1A2226',
        borderBottomWidth: 2,
        borderColor: '#0DB8DE',
        fontWeight: 'bold',
        color: '#ECF0F5',
        paddingHorizontal: 5,
        marginLeft: 5,
        alignSelf: 'center',
        lineHeight: 20,
        marginBottom: 15
    },
    passwordLabel: {
        color: 'white',
        fontSize: 14,
        marginBottom: 5,
        marginLeft: 5
    },
    input: {
        backgroundColor: '#1A2226',
        borderBottomWidth: 2,
        borderBottomColor: '#0DB8DE',
        fontWeight: 'bold',
        color: '#ECF0F5',
        paddingVertical: 10,
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 5,
    },
    submitButtonContainer: {
        marginTop: 1
    },
    submitButton: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 5,
        borderColor: '#0DB8DE',
        borderRadius: 0,
        fontWeight: 'bold',
        color: '0DB8DE',
        borderWidth: 1,
        alignItems: 'center'    
    },
    submitButtonText: {
        color: '#007bff',
        fontWeight: 'bold',
    }
    
});

export default completeSignUpStyles;