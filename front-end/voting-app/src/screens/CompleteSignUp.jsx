import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const CompleteSignUp = ({route}) => {
    const {apiResponse} = route.params;
    return (
        <SafeAreaView>
        <View style={{ marginVertical: 20, width: '100%' }}>
                    <Text>CNP: {apiResponse.cnp}</Text>
                    <Text >
                        First Name: {apiResponse.first_name}
                    </Text>
                    <Text>
                        Last Name: {apiResponse.last_name}
                    </Text>
                    <Text >
                        Nationality: {apiResponse.nationality}
            </Text>
        </View>
        </SafeAreaView>
    )    
};

export default CompleteSignUp;