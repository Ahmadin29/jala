import * as React from 'react';
import { View } from "react-native";
import Text from "../Components/Text";
import Icon from '../../assets/images/icon.svg'
import Colors from '../Helper/Colors';

export default function None(params) {
    return(
        <View style={{
            alignItems:"center",
            justifyContent:"center",
            flex:1,
            padding:50,
            backgroundColor:Colors.whiteColor
        }} >
            <Icon width={100} height={100} style={{marginBottom:20,}}/>
            <Text size={20} weight="semi" >Ooops..</Text>
            <Text style={{
                textAlign:"center"
            }}>This app is on development, please wait until we finish to create a magic</Text>
        </View>
    )
}