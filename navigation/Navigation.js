import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Accueil from "../screens/Accueil";
import Profil from "../screens/Profil";
import Rechercher from "../screens/Rechercher";
import Combinaisons from "../screens/Combinaisons";
import About from "../screens/About";
import Login from "../screens/Login";

const Tab = createBottomTabNavigator();

const Navigation = ({ navigation, user }) => {
  return (
    <Tab.Navigator initialRouteName="Accueil">
      <Tab.Screen
        name="Welcome"
        component={Accueil}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      >
        {(props) => <Profil {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen
        name="Search"
        component={Rechercher}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Combinations"
        component={Combinaisons}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Log off"
        component={Login}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            // Do something with the `navigation` object
            navigation.replace("Login");
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-out" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;