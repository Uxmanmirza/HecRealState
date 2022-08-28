import {View, Text} from 'react-native';
import React from 'react';
import { StatusBar } from 'native-base';
import AppNavigator from './src/navigation/AppNavigator';
import AuthContextProvider from './src/context/Authcontext';
import {NativeBaseProvider} from 'native-base';

export default function App() {
  return (
    <>
    <StatusBar barStyle={'dark-content'} backgroundColor="#E7C8DD" />
    <NativeBaseProvider>
      <AuthContextProvider>
        <AppNavigator />
      </AuthContextProvider>
    </NativeBaseProvider>
    </>
  );
}
