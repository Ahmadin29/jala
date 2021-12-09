import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Index from '../Screens';
import Colors from '../Helper/Colors';
import Text from '../Components/Text';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

import Logo from '../../assets/images/logo.svg'
import { IconButton } from 'react-native-paper';
import None from '../Screens/none';

const BottomTab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function IndexStack(params) {
  return(
    <Stack.Navigator>
      <Stack.Screen
        name="IndexStack"
        component={Index}
        options={{
          headerTitle:()=>(
            <View>
              <Logo width={60} />
            </View>
          ),
          headerRight:()=>(
            <View style={{
              flexDirection:"row",
              marginRight:15,
            }} >
              <IconButton
                icon={()=>(<Icon name="download" size={20} type="feather" />)}
                onPress={()=>{}}
              />
              <IconButton
                icon={()=>(<Icon name="bell" size={20} type="feather" />)}
                onPress={()=>{}}
              />
            </View>
          )
        }}
      />
    </Stack.Navigator>
  )
}

function BotttomNavigator() {

    const INITIAL_ROUTE_NAME  = "Home";

    const route = [
        {
            name:"index",
            component:IndexStack,
            options:{
                title:"Beranda",
                tabBarIcon: ({ focused }) => (
                    <Icon type="feather" name="home" size={24} color={focused ? Colors.primaryColor : Colors.secondaryTextColor} />
                ),
            }
        },
        {
            name:"statistic",
            component:None,
            options:{
                title:"Grafik",
                tabBarIcon: ({ focused }) => (
                    <Icon type="feather" name="bar-chart-2" size={24} color={focused ? Colors.primaryColor : Colors.secondaryTextColor} />
                ),
            }
        },
        {
            name:"input",
            component:None,
            options:{
                title:"Input",
                tabBarIcon: ({ focused }) => (
                    <Icon type="feather" name="plus-square" size={24} color={focused ? Colors.primaryColor : Colors.secondaryTextColor} />
                ),
            }
        },
        {
            name:"help",
            component:None,
            options:{
                title:"Bantuan",
                tabBarIcon: ({ focused }) => (
                    <Icon type="feather" name="message-square" size={24} color={focused ? Colors.primaryColor : Colors.secondaryTextColor} />
                ),
            }
        },
        {
            name:"account",
            component:None,
            options:{
                title:"Akun",
                tabBarIcon: ({ focused }) => (
                    <Icon type="feather" name="user" size={24} color={focused ? Colors.primaryColor : Colors.secondaryTextColor} />
                ),
            }
        }
    ]

    return (
        <BottomTab.Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            barStyle={{ backgroundColor: Colors.whiteColor }}
            activeColor={Colors.primaryColor}
            inactiveColor={Colors.secondaryTextColor}
        >
            {
                route.map(v=>{
                    return <BottomTab.Screen name={v.name} key={v.name} component={v.component} options={v.options} />
                })
            }
        </BottomTab.Navigator>
    );
}

export default BotttomNavigator

