import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
      <Tab.Screen name="Accueil" component={Accueil} />
      <Tab.Screen name="Profil">
        {(props) => <Profil {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Rechercher" component={Rechercher} />
      <Tab.Screen name="Combinaisons" component={Combinaisons} />
      <Tab.Screen name="About" component={About} />
      <Tab.Screen
        name="Logout"
        component={Login}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            // Do something with the `navigation` object
            navigation.replace("Login");
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default Navigation;