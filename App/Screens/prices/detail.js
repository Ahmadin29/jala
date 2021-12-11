import axios from 'axios';
import moment from 'moment';
import * as React from 'react';
import { ActivityIndicator, Alert, Image, Linking, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';
import Text from "../../Components/Text";
import Verified from '../../../assets/images/icon/verified.svg';
import Colors from '../../Helper/Colors';
import Config from '../../Helper/Config';

export default function PriceDetail(params) {

    const id = params.route.params.id;
    const [detail,setDetail] = React.useState();

    const getPrice = ()=>{
        axios.get('/shrimp_prices/'+id,{
            params:{
                with:'region,creator'
            }
        }).then(response=>{
            setDetail(response.data.data);
        }).catch(e=>{
            console.log(e.response);
            Alert.alert('Terjadi Kesalahan!','Gagal untuk mendapatkan data detail harga, harap hubungi kami')
        })
    }

    React.useEffect(()=>{
        getPrice();
    },[])

    const isVerified = ()=>{
        if (detail.creator.buyer) {
            return(
                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                }} >
                    <Verified style={{
                        marginRight:5,
                    }} />
                    <Text>Terverifikasi</Text>
                </View>
            )
        }
    }

    const renderPrice = ()=>{

        const data = []

        for (let index = 0; index < 19; index++) {
            if (index == 0) {
                data.push({
                    size:'20',
                    price:detail['size_20'],
                })
            }else{
                const stack = 20 + (10 * index);
                data.push({
                    size:stack,
                    price:detail['size_'+stack],
                })
            }
        }

        return(
            data.map(v=>{
                return(
                    <View style={{
                        flexDirection:"row",
                        alignItems:"center",
                        marginVertical:5,
                    }} >
                        <View style={{
                            width:100,
                        }} >
                            <Text>Size {v.size}</Text>
                        </View>
                        <Text>{v.price ? 'Rp '+Config.setNumber(v.price) : 'Rp 0'}</Text>
                    </View>
                )
            })
        )
    }

    const makeCall = (phone)=>{
        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = `tel:${phone}`;
        } else {
            phoneNumber = `telprompt:${phone}`;
        }

        Linking.openURL(phoneNumber);
    }

    if (detail) {
        return(
            <ScrollView style={{
                backgroundColor:Colors.whiteColor,
                flex:1,
            }} >
                <View style={{
                    padding:15,
                }} >
                    <Text weight="semi" >{detail.region.province_name}</Text>
                    <Text>{detail.region.regency_name ? detail.region.regency_name : detail.region.province_name}</Text>
                </View>

                <Divider style={{
                    borderBottomWidth:0,
                    backgroundColor:Colors.grey2,
                    height:8,
                }} />

                <View style={{
                    padding:15,
                }} >
                    <View style={{
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:"center"
                    }} >
                        <Text>{moment(detail.date).format('DD MMMM YYYY')}</Text>
                        {isVerified()}
                    </View>

                    <View style={{
                        flexDirection:"row",
                        alignItems:"center",
                        marginVertical:15,
                    }} >
                        <View style={{
                            width:40,
                            height:40,
                            borderRadius:100,
                            overflow:"hidden",
                            marginRight:10,
                        }} >
                            <Image
                                source={{uri:"https://app.jala.tech/storage/"+detail.creator.avatar}}
                                style={{
                                    width:40,
                                    height:40,
                                }}
                                resizeMode="cover"
                            />
                        </View>
                        <View>
                            <Text size={13} color={Colors.secondaryTextColor} >Supplier</Text>
                            <Text weight="semi" size={15} >{detail.creator.name}</Text>
                        </View>
                    </View>

                    <View style={{
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"space-between"
                    }} >
                        <View>
                            <Text color={Colors.secondaryTextColor} >Kontak</Text>
                            <Text weight="semi" >{detail.creator.phone}</Text>
                        </View>
                        <TouchableOpacity style={{
                            padding:7,
                            paddingHorizontal:20,
                            backgroundColor:Colors.primaryColor,
                            borderRadius:200,
                        }} onPress={()=>{
                            makeCall(detail.creator.phone);
                        }} >
                            <Text weight="semi" color={Colors.whiteColor} >Hubungi</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Divider style={{
                    borderBottomWidth:0,
                    backgroundColor:Colors.grey2,
                    height:8,
                }} />

                <View style={{
                    padding:15,
                    marginBottom:100,
                }} >
                    <View style={{
                        marginBottom:10,
                    }} >
                        <Text weight="semi" size={17} >Daftar Harga</Text>
                    </View>
                    {renderPrice()}
                    <View style={{
                        marginVertical:10,
                    }} >
                        <Text weight="semi" size={17} >Catatan</Text>
                    </View>
                    {
                        detail.remark ? <Text>{detail.remark}</Text> : <Text>Tidak ada catatan</Text>
                    }
                </View>

            </ScrollView>
        )
    }else{
        return(
            <View style={{
                backgroundColor:Colors.whiteColor,
                flex:1,
            }} >
                <ActivityIndicator size={20} color={Colors.primaryColor} ></ActivityIndicator>
            </View>
        )
    }
}