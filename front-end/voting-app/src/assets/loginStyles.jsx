import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
      loginBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A2226',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
      },
      loginKey: {
        marginBottom: 20,
        marginTop: 30,
      },
      loginTitle: {
        marginTop: 15,
        textAlign: 'center',
        fontSize: 30,
        letterSpacing: 2,
        fontWeight: 'bold',
        color: '#ECF0F5',
        marginBottom: 20
      },
      loginForm: {
        marginTop: 25,
        alignSelf: 'stretch',
      },
      formGroup: {
        marginBottom: 15,
      },
      label: {
        color: 'white',
        fontSize: 14,
        marginBottom: 5,
      },
      input: {
        backgroundColor: '#1A2226',
        borderBottomWidth: 2,
        borderBottomColor: '#0DB8DE',
        fontWeight: 'bold',
        color: '#ECF0F5',
        paddingVertical: 10,
        marginBottom: 20,
      },
      loginButtonContainer: {
        marginTop: 1,
      },
      loginButton: {
        padding: 10,
        borderRadius: 5,
        borderColor: '#0DB8DE',
        borderRadius: 0,
        fontWeight: 'bold',
        color: '0DB8DE',
        borderWidth: 1,
        alignSelf: 'center'
      },
      loginButtonText: {
        color: '#007bff',
        fontWeight: 'bold',
      },
      register:{
        color: 'white',
        textAlign: 'left',
        marginTop: 20
      },
      signUp:{
        textDecorationLine: 'underline',
        color: '#007bff'
      }
});

export default loginStyles;