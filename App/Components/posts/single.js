import moment from 'moment';
import * as React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Colors from '../../Helper/Colors';
import Layout from '../../Helper/Layout';
import Text from "../Text";
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function SingleKabar(props) {

    const navigation = useNavigation();

    const post = props.data

    return(
        <TouchableOpacity style={{
            borderWidth:1,
            borderColor:Colors.grey2,
            backgroundColor:Colors.whiteColor,
            padding:10,
            margin:15,
            marginBottom:0,
            marginRight:0,
            borderRadius:10,
            width:Layout.window.width - 30,
        }} onPress={()=>{
            navigation.navigate('PostDetail',{
                id:post.id
            })
        }} >
            <Image
                source={{uri:'https://app.jala.tech/storage/'+post.image}}
                style={{
                    width:"100%",
                    height:200,
                    marginBottom:10,
                    borderRadius:10,
                }}
            />
            <Text color={Colors.secondaryTextColor} >{moment(post.created_at).format('DD MMM YYYY HH:mm')}</Text>
            <Text size={17} weight="semi" style={{
                marginVertical:5,
            }} >{post.title}</Text>
            <Text color={Colors.secondaryTextColor} >{post.excerpt}</Text>

            <View style={{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between",
                marginTop:15,
            }} >
                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                }} >
                    <View style={{
                        width:20,
                        height:20,
                        borderRadius:100,
                        overflow:"hidden",
                        marginRight:10,
                    }} >
                        <Image
                            source={{uri:"https://app.jala.tech/storage/"+post.author.avatar}}
                            style={{
                                width:20,
                                height:20,
                            }}
                            resizeMode="cover"
                        />
                    </View>
                    <Text>{post.author.name}</Text>
                </View>
                <View style={{
                    flexDirection:"row",
                    alignItems:"center"
                }} >
                    <View style={{
                        flexDirection:"row",
                        alignItems:"center",
                        marginRight:10,
                    }} >
                        <Icon size={18} style={{marginRight:3}} name="md-eye-outline" color={Colors.secondaryTextColor} type="ionicon" />
                        <Text color={Colors.secondaryTextColor}>{Math.floor(Math.random() * 100) + 30}</Text>
                    </View>
                    <View style={{
                        flexDirection:"row",
                        alignItems:"center"
                    }} >
                        <Icon size={15} style={{marginRight:3}} name="md-share-social-outline" color={Colors.secondaryTextColor} type="ionicon" />
                        <Text color={Colors.secondaryTextColor}>{Math.floor(Math.random() * 100) + 30}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}