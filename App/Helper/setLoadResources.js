import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          "source-bold": require("../../assets/source_sans/SourceSansPro-Bold.ttf"),
          "source-regular": require("../../assets/source_sans/SourceSansPro-Regular.ttf"),
          "source-semi": require("../../assets/source_sans/SourceSansPro-SemiBold.ttf"),
          "source-thin": require("../../assets/source_sans/SourceSansPro-Light.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}