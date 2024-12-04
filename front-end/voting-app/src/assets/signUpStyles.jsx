import { StyleSheet } from "react-native";

const signUpStyles = StyleSheet.create({
    idButtonContainer: {
        marginTop: 20,
        alignSelf: 'center',
    },
    IdButton:{
        flexDirection: 'row',
        padding: 40,
        borderRadius: 5,
        borderColor: '#0DB8DE',
        borderRadius: 0,
        fontWeight: 'bold',
        color: '0DB8DE',
        borderWidth: 1,
        alignItems: 'center'
    },
    cameraIcon:{
        color: '#007bff',
        marginRight: 8,
        alignItems: 'center'
    },
    IdButtonText: {
        color: '#007bff',
        fontWeight: 'bold',
        alignItems: 'center',
        fontSize: 14
    },
});

export default signUpStyles;