import { createStackNavigator } from "@react-navigation/stack";
import { Paths } from "./paths";
import { Login, SignIn } from "@/screens";
import { AuthStackParamList } from "./types";


const AuthStack = createStackNavigator<AuthStackParamList>();

export function AuthStackNavigator() {
    return (
        <AuthStack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <AuthStack.Screen name={Paths.SignIn} component={SignIn} />
            <AuthStack.Screen name={Paths.Login} component={Login} />
        </AuthStack.Navigator>
    );
}