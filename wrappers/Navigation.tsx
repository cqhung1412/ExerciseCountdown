import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

type IconName =
  | "timer"
  | "home"
  | "man"
  | "timer-outline"
  | "home-outline"
  | "man-outline";

export type Screen = {
  name: string;
  component: any;
};

type NavigationProps = {
  screens: Screen[];
};

const Navigation: React.FC<NavigationProps> = ({ screens }) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: IconName;
            switch (route.name) {
              case "Timer":
                iconName = "timer";
                break;
              case "Profile":
                iconName = "home";
                break;
              default:
                iconName = "man";
                break;
            }
            if (focused) iconName = `${iconName}-outline`;
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        {screens.map((screen, index) => (
          <Tab.Screen
            key={index}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
