import * as React from "react";
import { ActivityIndicator, Alert, FlatList, RefreshControl, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import Text from "../../Components/Text";
import axios from "axios";
import SinglePrices from "../../Components/prices/single";
import Colors from "../../Helper/Colors";
import { Divider, Icon } from "react-native-elements";
import Layout from "../../Helper/Layout";
import BottomSheet from 'react-native-raw-bottom-sheet'
import { IconButton } from "react-native-paper";

export default function PricesIndex(params) {

  const [prices,setPrices] = React.useState();
  const [isPricesEnd,setIsPricesEnd] = React.useState(false);
  const [isGetPrices,setIsGetPrices] = React.useState(false);
  
  const [page,setPage] = React.useState(1);
  const [size,setSize] = React.useState(100);

  const [region,setRegion] = React.useState();
  const [regionPage,setRegionPage] = React.useState(1);
  const [selectedRegion,setSelectedRegion] = React.useState();
  const [search,setSearch] = React.useState("");
  const [isSearch,setIsSearch] = React.useState(false);

  const getPrices = () => {

    setIsGetPrices(true)

    axios.get("/shrimp_prices", {
      params: {
        with: "region,creator",
        page:1,
        per_page:30,
        region_id:selectedRegion && selectedRegion.id,
      },
    })
      .then((response) => {
        setIsGetPrices(false)
        setPrices(response.data.data);

        console.log(page,response.data.meta.last_page);

        if (page >= response.data.meta.last_page) {
          setIsPricesEnd(true)
        }
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
        region_id:selectedRegion && selectedRegion.id,
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

  const getRegion = () => {
    axios.get("/regions", {
      params: {
        has:"shrimp_prices",
        page:1,
        per_page:100,
        search:search ? search : null,
      },
    })
      .then((response) => {
        setRegionPage(1);
        setIsSearch(false);
        setRegion(response.data.data);
      })
      .catch((e) => {
        Alert.alert(
          "Terjadi kesalahan",
          "Gagal untuk memuat data region terbaru"
        );
      });
  };

  const getMoreRegion = ()=>{
    axios.get("/regions", {
      params: {
        has:"shrimp_prices",
        search:search,
        page:regionPage + 1,
        per_page:100,
      },
    })
      .then((response) => {
        setRegionPage(regionPage + 1);

        if (response.data.data.length > 0) {
          setRegion([...region,...response.data.data]);
        }
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
    getRegion();
  },[]);

  React.useEffect(()=>{
    regionSheetRef.current.close();
  },[prices])

  const sizeSheetRef = React.useRef();

  const sizeSheet = ()=>{
    return(
      <BottomSheet
        ref={sizeSheetRef}
        height={Layout.window.height - 100}
        closeOnDragDown
        closeOnPressMask
        closeOnPressBack
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        <View style={{
          padding:15,
          paddingTop:0,
          flex:1,
        }} >
          <View style={{
            alignItems:"center",
            marginBottom:10,
          }} >
            <Text weight="semi" size={17} >Ukuran Udang</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} >
            {renderSize()}
          </ScrollView>
          <TouchableOpacity style={{
            padding:15,
            backgroundColor:Colors.primaryColor,
            marginTop:10,
            alignItems:"center",
            borderRadius:100,
          }} onPress={()=>{
            sizeSheetRef.current.close();
          }} >
            <Text weight="semi" color={Colors.whiteColor} >Pilih</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    )
  }

  const renderSize = ()=>{
    const data = [];

    for (let index = 0; index < 19; index++) {
      data.push(20 + (index * 10))
    }

    return(
      data.map(v=>{
        return(
          <View style={{
            borderBottomWidth:1,
            borderBottomColor:Colors.grey2,
          }} >
            <TouchableOpacity style={{
              paddingVertical:10,
              flexDirection:"row",
              justifyContent:"space-between",
              alignItems:"center"
            }} onPress={()=>{
              setSize(v)
            }} >
              <Text>Size {v}</Text>
              <Icon
                name={size == v ? "md-radio-button-on" : "md-radio-button-off"}
                type="ionicon"
                color={Colors.primaryColor}
              />
            </TouchableOpacity>
          </View>
        )
      })
    )
  }

  const regionSheetRef = React.useRef();

  const regionSheet = ()=>{
    return(
      <BottomSheet
        ref={regionSheetRef}
        height={Layout.window.height - 100}
        closeOnDragDown
        closeOnPressMask
        closeOnPressBack
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        <View style={{
          padding:15,
          paddingTop:0,
          flex:1,
        }} >
          <View style={{
            alignItems:"center",
            marginBottom:10,
          }} >
            <Text weight="semi" size={17} >Kota / Kabupaten</Text>
          </View>
          <View style={{
            flexDirection:"row",
            alignItems:"center",
            width:Layout.window.width - 30,
            borderBottomWidth:1,
            borderBottomColor:Colors.grey2,
          }} >
            <Icon
              name="md-search"
              type="ionicon"
            />
            <TextInput
              style={{
                padding:10,
                width:Layout.window.width - 100,
              }}
              value={search}
              onChangeText={(text)=>{
                setSearch(text)
              }}
              onBlur={()=>{
                setIsSearch(true);
                getRegion()
              }}
            />
            {
              search != '' && !isSearch &&
              <IconButton
                icon={()=>(<Icon name="md-close" type="ionicon" />)}
                onPress={()=>{
                  setSearch(null);
                  setIsSearch(true);
                  setTimeout(() => {
                    getRegion();
                  }, 500);
                }}
              />
            }
            {
              isSearch && <ActivityIndicator color={Colors.primaryColor} style={{marginRight:-15}} ></ActivityIndicator>
            }
          </View>
          <FlatList
            data={region}
            renderItem={({item,index})=>renderRegion(item)}
            onEndReached={()=>getMoreRegion()}
          />
          <TouchableOpacity style={{
            padding:15,
            backgroundColor:Colors.primaryColor,
            marginTop:10,
            alignItems:"center",
            borderRadius:100,
          }} onPress={()=>{
            getPrices();
          }} >
            {
              isGetPrices ? <ActivityIndicator color={Colors.whiteColor} ></ActivityIndicator> : <Text weight="semi" color={Colors.whiteColor} >Pilih</Text>
            }
          </TouchableOpacity>
        </View>
      </BottomSheet>
    )
  }

  const renderRegion = (item)=>{
    return(
      <View style={{
        borderBottomWidth:1,
        borderBottomColor:Colors.grey2,
      }} >
        <TouchableOpacity style={{
          paddingVertical:10,
          flexDirection:"row",
          justifyContent:"space-between",
          alignItems:"center"
        }} onPress={()=>{
          if (selectedRegion && selectedRegion.id == item.id) {
            setSelectedRegion(null)
          }else{
            setSelectedRegion(item)
          }
        }} >
          <View style={{
            width:Layout.window.width - 100
          }} >
            <Text>{item.full_name}</Text>
          </View>
          <Icon
            name={selectedRegion ? item.id == selectedRegion.id ? "md-radio-button-on" : "md-radio-button-off" : "md-radio-button-off"}
            type="ionicon"
            color={Colors.primaryColor}
          />
        </TouchableOpacity>
      </View>
    )
  }

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
              setSelectedRegion(null);
              
              getPrices();
            }}
          />
        }
        ListFooterComponent={()=>(prices && !isPricesEnd ? <ActivityIndicator size={24} color={Colors.primaryColor} style={{
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
        elevation:10,
        borderRadius:100,
        flexDirection:"row"
      }} >
        <TouchableOpacity style={{
          flexDirection:"row",
          alignItems:"center",
          padding:15,
        }} onPress={()=>{
          sizeSheetRef.current.open();
        }} >
          <Icon name="archive" type="feather" style={{marginRight:10,}} color={Colors.textColor} />
          <Text weight="semi" size={17} >Size {size}</Text>
          <Icon name="chevron-down" type="feather" size={17} style={{marginLeft:10,}} color={Colors.textColor} />
        </TouchableOpacity>
        <Divider orientation="vertical" style={{width:2,backgroundColor:Colors.grey2,borderRightWidth:0,marginHorizontal:10,}} />
        <TouchableOpacity style={{
          flexDirection:"row",
          alignItems:"center",
        }} onPress={()=>{
          regionSheetRef.current.open();
        }} >
          <Icon name="map-pin" type="feather" style={{marginRight:10,}} color={Colors.textColor} />
          <Text weight="semi" size={17} >Indonesia</Text>
          <Icon name="chevron-down" type="feather" size={17} style={{marginLeft:10,}} color={Colors.textColor} />
        </TouchableOpacity>
      </View>

      {sizeSheet()}
      {regionSheet()}
    </View>
  );
}
