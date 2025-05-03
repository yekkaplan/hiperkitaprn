import { View, Text } from "react-native";
import { TabScreenProps } from "@/navigation/types";

function Home({ navigation }: TabScreenProps<"HomeStack">) {
    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}

export default Home;