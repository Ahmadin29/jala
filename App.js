import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Index from './App/Screens/index';
import { StatusBar, View } from 'react-native';
import MainController from './App/Controller/MainController';
import { createStackNavigator } from '@react-navigation/stack';
import useCachedResources from './App/Helper/setLoadResources';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default function App() {

  const isLoadingComplete = useCachedResources();

  return (
    <SafeAreaProvider style={{
      flex:1,
    }} >
      <StatusBar backgroundColor="white" translucent={false} barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={MainController}
            options={{
              headerShown:false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}