import axios from "axios";
import * as React from "react";
import { Alert, FlatList, View } from "react-native";
import SingleDiseas from "../../Components/diseases/single";
import SingleKabar from "../../Components/posts/single";
import Text from "../../Components/Text";
import Colors from "../../Helper/Colors";

export default function DiseasesIndex(params) {
  const [diseases, setDiseases] = React.useState();
  const [page, setPage] = React.useState(1);

  const getPost = () => {
    axios
      .get("/diseases", {
        params: {
          page:1,
          per_page:50,
        },
      })
      .then((response) => {
        setDiseases(response.data.data);
      })
      .catch((e) => {

        console.log(e);

        Alert.alert(
          "Terjadi kesalahan",
          "Gagal untuk memuat kabar udang terbaru"
        );
      });
  };

  const getMorePost = () => {
    axios
      .get("/diseases", {
        params: {
          page:page + 1,
          per_page:50,
        },
      })
      .then((response) => {
        setPage(page + 1);
        setDiseases([...diseases,...response.data.data]);
      })
      .catch((e) => {
        Alert.alert(
          "Terjadi kesalahan",
          "Gagal untuk memuat kabar udang terbaru"
        );
      });
  };

  React.useEffect(()=>{
    getPost();
  },[])

  return (
    <View style={{
      flex:1,
      backgroundColor:Colors.whiteColor,
    }} >
      <FlatList
        data={diseases}
        renderItem={({item,index})=><SingleDiseas data={item} />}
        showsHorizontalScrollIndicator={false}
        onEndReached={()=>getMorePost()}
      />
    </View>
  );
}
