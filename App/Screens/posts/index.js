import axios from "axios";
import * as React from "react";
import { Alert, FlatList, View } from "react-native";
import SingleKabar from "../../Components/posts/single";
import Text from "../../Components/Text";
import Colors from "../../Helper/Colors";

export default function PostsIndex(params) {
  const [posts, setPosts] = React.useState();
  const [page, setPage] = React.useState(1);

  const getPost = () => {
    axios
      .get("/posts", {
        params: {
          with: "author",
          page:1,
          per_page:50,
        },
      })
      .then((response) => {
        setPosts(response.data.data);
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
      .get("/posts", {
        params: {
          with: "author",
          page:page + 1,
          per_page:50,
        },
      })
      .then((response) => {
        setPage(page + 1);
        setPosts([...posts,...response.data.data]);
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
        data={posts}
        renderItem={({item,index})=><SingleKabar data={item} />}
        showsHorizontalScrollIndicator={false}
        onEndReached={()=>getMorePost()}
      />
    </View>
  );
}
