import { StyleSheet } from "react-native";

const createVotingStyles = StyleSheet.create({
    container: {
            flex: 1,
            alignItems: 'left',
            backgroundColor: '#1A2226',
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ECF0F5',
        marginBottom: 30,
        marginTop: 10,
        textAlign: 'center',
    },
    formContainer: {
        padding: 20,
        backgroundColor: '#1A2226',
    },
    textInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ECF0F5',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        color: '#ECF0F5',
    },
    customTextInput: {
        borderColor: '#0DB8DE',
    },
    addButton: {
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#0DB8DE',
        borderWidth: 1,
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 18,
    },
    candidateContainer: {
        marginBottom: 20,
    },
    submitButton: {
        padding: 10,
        borderRadius: 5,
        borderColor: '#0DB8DE',
        fontWeight: 'bold',
        color: '0DB8DE',
        borderWidth: 1,
        alignSelf: 'center',
    },
    submitButtonContainer: {
        marginTop: 1,
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    submitButtonText: {
        color: '#0DB8DE',
    },
    buttonContainer: {
        flexDirection: 'row', 
        alignSelf: 'center', 
        marginBottom: 20,
      },
});

export default createVotingStyles;
