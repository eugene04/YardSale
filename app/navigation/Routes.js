import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ListScreen from "../screens/ListScreen";
import { NavigationContainer } from "@react-navigation/native";
import ProductStack from "./ProductStack";

export default function Routes() {
  return (
    <NavigationContainer>
      <ProductStack />
    </NavigationContainer>
  );
}
