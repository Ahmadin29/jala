import * as React from 'react';
import { ScrollView, View } from 'react-native';
import Text from "../Text";

import Monitoring from '../../../assets/images/icon/monitor.svg';
import Kolam from '../../../assets/images/icon/tambak.svg';
import Keuangan from '../../../assets/images/icon/keuangan.svg';
import Harga from '../../../assets/images/icon/harga.svg';
import Kabar from '../../../assets/images/icon/kabar.svg';
import Penyakit from '../../../assets/images/icon/penyakit.svg';
import Layout from '../../Helper/Layout';

export default function Menu(params) {
    return(
        <View style={{
            marginVertical:20,
        }} >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between"
                }} >
                    <View style={{
                        alignItems:"center",
                        width:Layout.window.width / 4 - 40,
                        marginHorizontal:10,
                    }} >
                        <Monitoring width={40} height={40} style={{
                            marginBottom:5
                        }} />
                        <Text size={12} >Monitoring</Text>
                    </View>
                    <View style={{
                        alignItems:"center",
                        width:Layout.window.width / 4 - 40,
                        marginHorizontal:10,
                    }} >
                        <Kolam width={40} height={40} style={{
                            marginBottom:5
                        }} />
                        <Text size={12} >Kolam</Text>
                    </View>
                    <View style={{
                        alignItems:"center",
                        width:Layout.window.width / 4 - 40,
                        marginHorizontal:10,
                    }} >
                        <Keuangan width={40} height={40} style={{
                            marginBottom:5
                        }} />
                        <Text size={12} >Keuangan</Text>
                    </View>
                    <View style={{
                        alignItems:"center",
                        width:Layout.window.width / 4 - 40,
                        marginHorizontal:10,
                    }} >
                        <Harga width={40} height={40} style={{
                            marginBottom:5
                        }} />
                        <Text size={12} >Harga</Text>
                    </View>
                    <View style={{
                        alignItems:"center",
                        width:Layout.window.width / 4 - 40,
                        marginHorizontal:10,
                    }} >
                        <Kabar width={40} height={40} style={{
                            marginBottom:5
                        }} />
                        <Text size={12} >Kabar</Text>
                    </View>
                    <View style={{
                        alignItems:"center",
                        width:Layout.window.width / 4 - 40,
                        marginHorizontal:10,
                    }} >
                        <View style={{
                            width:40,
                            height:40,
                            alignItems:"center",
                            justifyContent:"center"
                        }}>
                            <Penyakit width={30} height={30} style={{
                                marginBottom:5
                            }} />
                        </View>
                        <Text size={12} >Penyakit</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}