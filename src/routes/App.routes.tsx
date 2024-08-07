import { Platform } from "react-native";
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Exercise } from "@screens/Exercise";
import { History } from "@screens/History";
import { Profile } from "@screens/Profile";
import { Home } from "@screens/Home";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import HomeSvg from "@assets/home.svg";
import HistorySvg from "@assets/history.svg";
import ProfileSvg from "@assets/profile.svg";
import ExerciseSvg from "@assets/series.svg";

type AppRoutes = {
  Home: undefined;
  Exercise: undefined;
  History: undefined;
  Profile: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {

  const { tokens } = gluestackUIConfig;
  const iconSize = tokens.space["6"]; 

  return (
    <Navigator 
      screenOptions={{ 
        headerShown: false, 
        tabBarShowLabel: false, 
        tabBarActiveTintColor: tokens.colors.green500,
        tabBarInactiveTintColor: tokens.colors.gray200,
        tabBarStyle: { 
          backgroundColor: tokens.colors.gray600,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: tokens.space["10"],
          paddingTop: tokens.space["6"]
        }
        }}
      >
      <Screen 
        name="Home" 
        component={Home}
        options={
          {
            tabBarIcon: ({ color }) => <HomeSvg fill={color} width={iconSize} height={iconSize}/>
          }
        } 
      /> 

      <Screen 
        name= "History" 
        component={History}
        options={
          {
            tabBarIcon: ({ color }) => <HistorySvg fill={color} width={iconSize} height={iconSize}/>
          }
        } 
      />

      <Screen 
        name= "Profile" 
        component={Profile}        
        options={
          {
            tabBarIcon: ({ color }) => <ProfileSvg fill={color} width={iconSize} height={iconSize}/>
          }
        } 
      />

      <Screen 
        name="Exercise" 
        component={Exercise}
        options={{
          tabBarButton: () => null
        }}
      />

    </Navigator>
  );
}