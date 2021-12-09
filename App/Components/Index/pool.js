import * as React from 'react';
import { View } from 'react-native';
import Colors from '../../Helper/Colors';
import Text from "../Text";
import Logo from '../../../assets/images/logo-white.svg';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Pool(params) {
    return(
        <View style={{
            padding:15,
            backgroundColor:Colors.primaryColor,
            margin:15,
            marginBottom:0,
            borderRadius:10,
        }} >
            <View style={{
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                marginBottom:15,
                paddingBottom:15,
                borderBottomWidth:1,
                borderBottomColor:Colors.whiteColor+99,
            }} >
                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    borderWidth:1,
                    borderColor:Colors.whiteColor,
                    borderRadius:200,
                    paddingHorizontal:15,
                    paddingVertical:5,
                }} >
                    <Text color={Colors.whiteColor} size={17} weight="semi" style={{marginRight:5}} >Tambak </Text><Logo height={15} width={50} />
                </View>
                <View style={{
                    flexDirection:"row",
                    alignItems:"center"
                }} >
                    <Text color={Colors.whiteColor} >Tidak ada tambak</Text>
                    <Icon type="feather" name="map-pin" color={Colors.whiteColor} size={15} style={{
                        marginLeft:5,
                    }} />
                </View>
            </View>
            <View>
                <Text color={Colors.whiteColor} style={{
                    marginBottom:5,
                }} weight="semi" size={18}>Sepertinya Belum Ada Tambak</Text>
                <Text color={Colors.whiteColor}>Kamu tidak memiliki tambak jala yang terhubung, hubungkan tambak kamu untuk bisa melihat keadaan tambak</Text>
                <TouchableOpacity style={{
                    padding:13,
                    backgroundColor:Colors.whiteColor,
                    alignItems:"center",
                    marginTop:10,
                    borderRadius:20,
                }} >
                    <Text weight="semi" color={Colors.primaryColor} >Hubungkan Tambak</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}