import moment from 'moment';
import * as React from 'react';
import { Image, View } from 'react-native';
import Colors from '../../Helper/Colors';
import Layout from '../../Helper/Layout';
import Text from "../Text";

import Verified from '../../../assets/images/icon/verified.svg';
import Config from '../../Helper/Config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function SinglePrices(props) {

    const navigation = useNavigation();
    const price = props.data

    return(
        <View style={{
            elevation:3,
            backgroundColor:Colors.whiteColor,
            padding:10,
            margin:15,
            marginBottom:props.list ? 0 : 15,
            marginRight:10,
            borderRadius:10,
            minWidth:props.list ? Layout.window.width - 330 : Layout.window.width / 3 * 2
        }} >
            <View style={{
                marginBottom:15,
            }} >
                <Text size={12} color={Colors.secondaryTextColor} >{moment(price.date).format('DD MMMM YYYY')}</Text>
            </View>

            <View style={{
                flexDirection:"row",
                alignItems:"center",
            }} >
                <View style={{
                    width:40,
                    height:40,
                    borderRadius:100,
                    overflow:"hidden",
                    marginRight:10,
                }} >
                    <Image
                        source={{uri:"https://app.jala.tech/storage/"+price.creator.avatar}}
                        style={{
                            width:40,
                            height:40,
                        }}
                        resizeMode="cover"
                    />
                </View>
                <View>
                    <View style={{
                        flexDirection:"row",
                        alignItems:"center"
                    }} >
                        <Text weight="semi" size={15} >{price.creator.name}</Text>
                        {
                            price.creator.buyer && <Verified style={{
                                marginLeft:5,
                            }} />
                        }
                    </View>
                    <Text color={Colors.secondaryTextColor} >Supplier</Text>
                    <Text color={Colors.secondaryTextColor} >{price.region.regency_name && price.region.regency_name+' - '}{price.region.province_name}</Text>
                </View>
            </View>

            <View style={{
                marginTop:10,
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between",
                paddingTop:10,
                borderTopWidth:1,
                borderTopColor:Colors.grey2
            }} >
                <View>
                    <Text size={12} color={Colors.secondaryTextColor} >Size {props.size ? props.size : "100"}</Text>
                    <Text size={17} weight='semi' >Rp {Config.setNumber(props.size ? price['size_'+props.size] ? price['size_'+props.size] : '-' : price.size_100)}</Text>
                </View>
                <TouchableOpacity style={{
                    padding:7,
                    paddingHorizontal:20,
                    backgroundColor:Colors.primaryColor,
                    borderRadius:200,
                }} onPress={()=>{
                    navigation.navigate('PriceDetail',{
                        id:price.id
                    })
                }} >
                    <Text weight="semi" color={Colors.whiteColor} >Detail</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}