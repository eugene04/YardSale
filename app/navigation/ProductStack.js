import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ListScreen from "../screens/ListScreen";
import { IconButton } from "react-native-paper";
import DetailScreen from "../screens/DetailScreen";
import AddItemForm from "../screens/AddItemForm";

const Stack = createStackNavigator();

export default function ProductStack() {
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
      <Stack.Screen name="Products" component={ListScreen} />
      <Stack.Screen name="Details" component={DetailScreen} />
      <Stack.Screen name="AddItemForm" component={AddItemForm} />
    </Stack.Navigator>
  );
}
