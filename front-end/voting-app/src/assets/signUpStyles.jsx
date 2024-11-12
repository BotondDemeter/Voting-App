import { StyleSheet } from "react-native";

const signUpStyles = StyleSheet.create({
    idButtonContainer: {
        marginTop: 1,
        alignSelf: 'left',
    },
    IdButton:{
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
    cameraIcon:{
        color: '#007bff',
        marginRight: 8
    }
});

export default signUpStyles;