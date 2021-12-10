import * as React from 'react';
import { FlatList, View } from 'react-native';
import Colors from '../../Helper/Colors';
import Harga from '../../../assets/images/icon/harga.svg';
import Text from "../Text";
import SinglePrices from '../prices/single';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Prices(props) {

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
                alignItems:"center",
                justifyContent:"space-between"
            }}>
                <View style={{
                    paddingBottom:0,
                    flexDirection:"row",
                    alignItems:"center"
                }} >
                    <Harga width={20} height={20}/>
                    <View style={{
                        marginLeft:8,
                    }} >
                        <Text weight="semi" size={18} >Harga Udang</Text>
                        {
                            prices && <Text color={Colors.secondaryTextColor} size={13} >{moment(prices[prices.length - 1].date).format('DD MMM YYYY')} - {moment(prices[0].date).format('DD MMM YYYY')}</Text>
                        }
                    </View>
                </View>
                <TouchableOpacity>
                    <Text weight="semi" color={Colors.primaryColor} >Lihat Semua</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                data={prices}
                renderItem={({item,index})=><SinglePrices data={item} />}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}