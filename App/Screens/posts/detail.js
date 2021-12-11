import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as React from "react";
import { Icon } from "react-native-elements";
import { IconButton } from "react-native-paper";
import * as Progress from "react-native-progress";
import WebView from "react-native-webview";
import Colors from "../../Helper/Colors";

export default function PostDetail(props) {

  const id = props.route.params.id;
  const [progress,setProgress] = React.useState(0);
  const webView = React.useRef();

  const navigation = useNavigation();

  navigation.setOptions(({
    headerRight:()=>(
      <IconButton
        icon={()=><Icon name="refresh-cw" type="feather" />}
        onPress={()=>{
          webView.current.reload();
        }}
      />
    ),
    headerRightContainerStyle: {
      marginRight: 10,
    },
  }));

  return (
    <>
      <Progress.Bar
				progress={progress}
				color={Colors.primaryColor}
				width={null}
        height={5}
				borderRadius={0}
				borderWidth={0}
			/>
      <WebView
        ref={webView}
        source={{ uri:"https://app.jala.tech/web_view/posts/"+id}}
        onLoadProgress={({ nativeEvent }) =>
					setProgress(nativeEvent.progress)
				}
      />
    </>
  );
}
