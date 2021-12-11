import * as React from "react";
import { ActivityIndicator, Alert, FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import Text from "../../Components/Text";
import axios from "axios";
import SinglePrices from "../../Components/prices/single";
import Colors from "../../Helper/Colors";
import { Divider, Icon } from "react-native-elements";
import Layout from "../../Helper/Layout";

export default function PricesIndex(params) {

  const [prices,setPrices] = React.useState();
  
  const [page,setPage] = React.useState(1);
  const [size,setSize] = React.useState("100");

  const getPrices = () => {
    axios.get("/shrimp_prices", {
      params: {
        with: "region,creator",
        page:1,
        per_page:30,
      },
    })
      .then((response) => {
        setPrices(response.data.data);
      })
      .catch((e) => {
        Alert.alert(
          "Terjadi kesalahan",
          "Gagal untuk memuat harga udang terbaru"
        );
      });
  };

  const getMorePrices = ()=>{
    axios.get("/shrimp_prices", {
      params: {
        with: "region,creator",
        page:page + 1,
        per_page:30,
      },
    })
      .then((response) => {
        setPage(page + 1);
        setPrices([...prices,...response.data.data]);
      })
      .catch((e) => {
        Alert.alert(
          "Terjadi kesalahan",
          "Gagal untuk memuat harga udang terbaru"
        );
      });
  }

  React.useEffect(() => {
    getPrices();
  },[]);

  return (
    <View style={{
      flex:1,
      backgroundColor:Colors.whiteColor,
    }} >
      {!prices && <ActivityIndicator size={20} color={Colors.primaryColor} ></ActivityIndicator>}
      <FlatList
        data={prices}
        renderItem={({item})=><SinglePrices data={item} list size={size} />}
        contentContainerStyle={{
          paddingBottom:15,
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={()=>{
              setPage(1);
              setPrices();
              
              getPrices();
            }}
          />
        }
        ListFooterComponent={()=>(prices ? <ActivityIndicator size={24} color={Colors.primaryColor} style={{
          marginTop:20,
        }} ></ActivityIndicator> : <></>)}
        onEndReached={()=>getMorePrices()}
      />
      <View style={{
        position:"absolute",
        bottom:0,
        margin:30,
        backgroundColor:Colors.whiteColor,
        width:Layout.window.width - 60,
        padding:15,
        elevation:10,
        borderRadius:100,
        flexDirection:"row"
      }} >
        <TouchableOpacity style={{
          flexDirection:"row",
          alignItems:"center",
        }} >
          <Icon name="archive" type="feather" style={{marginRight:10,}} color={Colors.textColor} />
          <Text weight="semi" size={17} >Size {size}</Text>
          <Icon name="chevron-down" type="feather" size={17} style={{marginLeft:10,}} color={Colors.textColor} />
        </TouchableOpacity>
        <Divider orientation="vertical" style={{width:2,backgroundColor:Colors.grey2,borderRightWidth:0,marginHorizontal:10,}} />
        <TouchableOpacity style={{
          flexDirection:"row",
          alignItems:"center",
        }} >
          <Icon name="map-pin" type="feather" style={{marginRight:10,}} color={Colors.textColor} />
          <Text weight="semi" size={17} >Indonesia</Text>
          <Icon name="chevron-down" type="feather" size={17} style={{marginLeft:10,}} color={Colors.textColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
