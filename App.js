import 'react-native-gesture-handler';
import React from "react";
import { Text } from 'react-native';
import { NativeBaseProvider, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from './components/Stack';

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StackNav/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}