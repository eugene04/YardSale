import React, { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ListScreen from "../screens/ListScreen";
import { IconButton } from "react-native-paper";
import AddItemForm from "../screens/AddItemForm";
import DetailScreen from "../screens/DetailScreen";
import RoomScreen from "../screens/RoomScreen";
import FormButton from "../components/FormButton";
import firebase from "../utils/Firebase";
import LoginScreen from "../screens/LoginScreen";
import { ScreenStackHeaderLeftView } from "react-native-screens";
import { AuthContext } from "./AuthProvider";

const Stack = createStackNavigator();

export default function ProductStack() {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: "lightgoldenrodyellow",
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTintColor: "teal",
      }}
    >
      <Stack.Screen
        name="YardSale"
        component={ListScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton
              icon="logout-variant"
              size={28}
              color="teal"
              onPress={() => logout()}
            />
          ),
        })}
      />
      <Stack.Screen name="Details" component={DetailScreen} />
      <Stack.Screen name="Add to YardSale" component={AddItemForm} />
      <Stack.Screen name="chatroom" component={RoomScreen} />
    </Stack.Navigator>
  );
}
