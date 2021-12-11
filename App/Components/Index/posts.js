import * as React from 'react';
import { FlatList, View } from 'react-native';
import Colors from '../../Helper/Colors';
import KabarIcon from '../../../assets/images/icon/kabar.svg';
import Text from "../Text";
import moment from 'moment';
import SingleKabar from '../posts/single';

export default function Posts(props) {

    const [prices,setPrices] = React.useState();

    React.useEffect(()=>{
        setPrices(props.data)
    },[props.data])

    return(
        <View>
            <View style={{
                padding:15,
                paddingBottom:0,
                flexDirection:"row",
                alignItems:"center"
            }} >
                <KabarIcon width={20} height={20}/>
                <View style={{
                    marginLeft:8,
                }} >
                    <Text weight="semi" size={18} >Kabar Udang</Text>
                    {
                        prices && <Text color={Colors.secondaryTextColor} size={13} >{moment(prices[prices.length - 1].date).format('DD MMM YYYY')} - {moment(prices[0].date).format('DD MMM YYYY')}</Text>
                    }
                </View>
            </View>
            <FlatList
                data={prices}
                renderItem={({item,index})=><SingleKabar data={item} />}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}