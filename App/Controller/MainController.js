import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
import BotttomNavigator from './BottomController';

const Stack = createStackNavigator();

const getHeaderName = (route)=>{
  const routeName = getFocusedRouteNameFromRoute(route);
  console.log(routeName);
	return routeName;
}

export default function MainController({ navigation, route }) {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="BottomNavigator"
            component={BotttomNavigator}
            options={{
              headerShown:false,
            }}
        />
    </Stack.Navigator>
  );
}