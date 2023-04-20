import { View, Button } from 'react-native';
import { useRouter } from "expo-router";

export default function App() {
    const router = useRouter();
    return (
        <>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button
                title="Alert"
                onPress={() => router.push("/home_page/alert_screen")}
            />
            </View>
        </>
    );
}