import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Signin } from '@screens/Signin';
import { Signup } from '@screens/Signup';

type AuthRoutes = {
  Signin: undefined;
  Signup: undefined;
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen 
        name="Signin" 
        component={Signin}
      />
      <Screen 
        name="Signup" 
        component={Signup} 
      />
    </Navigator>
  );
}
