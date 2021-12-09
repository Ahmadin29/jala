import * as React from 'react';
import { View } from 'react-native';
import Colors from '../../Helper/Colors';
import Harga from '../../../assets/images/icon/harga.svg';
import Text from "../Text";

export default function Prices(props) {
    return(
        <View>
            <View style={{
                padding:15,
                flexDirection:"row",
                alignItems:"center"
            }} >
                <Harga width={20} height={20}/>
                <View style={{
                    marginLeft:8,
                }} >
                    <Text weight="semi" size={18} >Harga Udang</Text>
                    <Text color={Colors.secondaryTextColor} size={13} >29 Des 2021 - 30 Des 2021</Text>
                </View>
            </View>
            <Text>asd</Text>
        </View>
    )
}