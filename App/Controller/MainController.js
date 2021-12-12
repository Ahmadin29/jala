import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
import BotttomNavigator from './BottomController';
import PriceDetail from '../Screens/prices/detail';
import PostDetail from '../Screens/posts/detail';
import PricesIndex from '../Screens/prices';
import PostsIndex from '../Screens/posts';
import DiseasesIndex from '../Screens/diseases';
import DiseasDetail from '../Screens/diseases/detail';

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
            name="Posts"
            component={PostsIndex}
            options={{
              headerTitle:"Kabar Udang",
            }}
        />
        <Stack.Screen
            name="PostDetail"
            component={PostDetail}
            options={{
              headerTitle:"Detail Posts",
            }}
        />

        <Stack.Screen
            name="Diseases"
            component={DiseasesIndex}
            options={{
              headerTitle:"Penyakit Udang",
            }}
        />
        <Stack.Screen
            name="DiseasesDetail"
            component={DiseasDetail}
            options={{
              headerTitle:"Detail Penyakit",
            }}
        />
    </Stack.Navigator>
  );
}