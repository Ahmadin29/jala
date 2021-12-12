import axios from 'axios';
import * as React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import Posts from '../Components/Index/posts';
import Menu from '../Components/Index/menu';
import Pool from '../Components/Index/pool';
import Prices from '../Components/Index/prices';
import Colors from '../Helper/Colors';
import Config from '../Helper/Config';
import Diseas from '../Components/Index/diseas';

const Index = ()=>{

  const [prices,setPrices] = React.useState();
  const [post,setPost] = React.useState();
  const [diseas,setDiseas] = React.useState();

  const getPrices = ()=>{
    axios.get('/shrimp_prices',{
      params:{
        with:'region,creator'
      }
    })
    .then(response=>{
      setPrices(response.data.data);
    })
    .catch(e=>{
      Alert.alert('Terjadi kesalahan','Gagal untuk memuat harga udang terbaru')
    })
  }

  const getPost = ()=>{
    axios.get('/posts',{
      params:{
        with:'author',
        per_page:4,
      }
    })
    .then(response=>{
      setPost(response.data.data);
    })
    .catch(e=>{
      console.log(e.response);
      Alert.alert('Terjadi kesalahan','Gagal untuk memuat kabar udang terbaru')
    })
  }

  const getDiseas = ()=>{
    axios.get('/diseases',{
      params:{
        with:'author',
        per_page:4,
      }
    })
    .then(response=>{
      setDiseas(response.data.data);
    })
    .catch(e=>{
      console.log(e);
      Alert.alert('Terjadi kesalahan','Gagal untuk memuat kabar udang terbaru')
    })
  }

  React.useEffect(()=>{
    Config.setAuthorization();
    Config.setDefaultUrl();
    getPrices();
    getPost();
    getDiseas();
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
      <Posts
        data={post}
      />
      <Diseas
        data={diseas}
      />
    </ScrollView>
  )
}

export default Index