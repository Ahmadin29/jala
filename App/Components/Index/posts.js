import * as React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Colors from '../../Helper/Colors';
import KabarIcon from '../../../assets/images/icon/kabar.svg';
import Text from "../Text";
import moment from 'moment';
import SingleKabar from '../posts/single';
import { useNavigation } from '@react-navigation/native';

export default function Posts(props) {

    const [posts,setPrices] = React.useState();

    const navigation = useNavigation();

    React.useEffect(()=>{
        setPrices(props.data)
    },[props.data])

    return(
        <View>
            <View style={{
                padding:15,
                paddingBottom:0,
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between"
            }} >
                <View style={{
                    flexDirection:"row",
                    alignItems:"center"
                }} >
                    <KabarIcon width={20} height={20}/>
                    <View style={{
                        marginLeft:8,
                    }} >
                        <Text weight="semi" size={18} >Kabar Udang</Text>
                        {
                            posts && <Text color={Colors.secondaryTextColor} size={13} >{moment(posts[posts.length - 1].date).format('DD MMM YYYY')} - {moment(posts[0].date).format('DD MMM YYYY')}</Text>
                        }
                    </View>
                </View>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('Posts')
                }} >
                    <Text weight="semi" color={Colors.primaryColor} >Lihat Semua</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={posts}
                renderItem={({item,index})=><SingleKabar data={item} />}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}