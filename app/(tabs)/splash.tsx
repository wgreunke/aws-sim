import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function Splash() {
    return (
        <View>
            <Text>Welcome to the AWS Simulator</Text>
            <Text>Please Note:</Text>
            <Text>1) ???? Is not affiliated with or endorsed by AWS</Text>
            <Text>2) All data is deleted when you close the app</Text>
            <Text>3) Uploaded files are stored locally, not shared and removed from the app when you close it.</Text>
            <Button title="Lets Go!" onPress={() => {
                router.push('/');
            }} />

        </View>
    );
}