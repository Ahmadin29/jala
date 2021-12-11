import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
import BotttomNavigator from './BottomController';
import PriceDetail from '../Screens/prices/detail';
import PostDetail from '../Screens/posts/detail';
import PricesIndex from '../Screens/prices';

const Stack = createStackNavigator();

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
        <Stack.Screen
            name="Prices"
            component={PricesIndex}
            options={{
              headerTitle:"Daftar Harga Udang",
            }}
        />
        <Stack.Screen
            name="PriceDetail"
            component={PriceDetail}
            options={{
              headerTitle:"Detail Harga",
            }}
        />
        <Stack.Screen
            name="PostDetail"
            component={PostDetail}
            options={{
              headerTitle:"Detail Posts",
            }}
        />
    </Stack.Navigator>
  );
}