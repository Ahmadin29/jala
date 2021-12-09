import axios from 'axios';
import * as React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import Menu from '../Components/Index/menu';
import Pool from '../Components/Index/pool';
import Prices from '../Components/Index/prices';
import Colors from '../Helper/Colors';

const Index = ()=>{

  const [prices,setPrices] = React.useState();

  const getPrices = ()=>{
    axios.get('https://app.jala.tech/api/shrimp_prices')
    .then(response=>{
      setPrices(response.data.data)
    })
    .catch(e=>{
      Alert.alert('Terjadi kesalahan','Gagal untuk memuat harga udang terbaru')
    })
  }

  React.useEffect(()=>{
    getPrices();
  },[])

  return (
    <ScrollView style={{
      flex:1,
      backgroundColor:Colors.whiteColor,
    }} >
      <Pool/>
      <Menu/>
      <Divider
        style={{
          height:10,
          backgroundColor:Colors.grey2,
          borderBottomWidth:0,
        }}
      />
      <Prices
        data={prices}
      />
    </ScrollView>
  )
}

export default Index