import { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Animated, Platform, View } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import GamingNewsScreen from "./screens/GamingNewsScreen";
import AudioNewsScreen from "./screens/AudioNewsScreen";
import MobileNewsScreen from "./screens/MobileNewsScreen";
import BottomNavBar from "./components/BottomNavBar";

import * as news from "./utils/gnews";
import { articles } from "./dummy-data";

export default function App() {
  const [techNews, setTechNews] = useState([]);
  const [fakeNews, setFakeNews] = useState([]);

  const Stack = createNativeStackNavigator();

  const yOffset = useRef(new Animated.Value(0)).current;
  const headerOpacity = yOffset.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const MyTheme = {
    dark: true,
    colors: {
      primary: "rgba(255, 255, 255, 0.8)",
      background: "rgb(242, 242, 242)",
      card: "rgb(255, 255, 255)",
      text: "rgb(28, 28, 30)",
      border: "rgb(199, 199, 204)",
      notification: "rgb(255, 69, 58)",
    },
  };

  useEffect(function () {
    (async function () {
      // const techNews = await news.getTechNews();
      // setTechNews([...techNews.articles]);
      setFakeNews([...articles]);
      console.log(articles);
    })();
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerLeft: () => {
              return <View style={{ marginLeft: 50 }}></View>;
            },
          }}
        >
          <Stack.Screen
            options={{
              title: Platform.OS === "android" ? "GetTeched" : "",
              headerTitleAlign: "center",
              headerShown: true,
              headerStyle: {
                zIndex: 100,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
            }}
            name="HomeScreen"
          >
            {(props) => (
              <HomeScreen
                techNews={fakeNews}
                yOffset={yOffset}
                headerOpacity={headerOpacity}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            options={{
              title: Platform.OS === "android" ? "Gaming" : "",
              headerTitleAlign: "center",
              headerShown: true,
              headerStyle: {
                zIndex: 100,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
            }}
            name="GamingNewsScreen"
          >
            {(props) => (
              <GamingNewsScreen
                techNews={fakeNews}
                yOffset={yOffset}
                headerOpacity={headerOpacity}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            options={{
              title: Platform.OS === "android" ? "Audio" : "",
              headerTitleAlign: "center",
              headerShown: true,
              headerStyle: {
                zIndex: 100,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
            }}
            name="AudioNewsScreen"
          >
            {(props) => (
              <AudioNewsScreen
                techNews={fakeNews}
                yOffset={yOffset}
                headerOpacity={headerOpacity}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            options={{
              title: Platform.OS === "android" ? "Mobile" : "",
              headerTitleAlign: "center",
              headerShown: true,
              headerStyle: {
                zIndex: 100,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
            }}
            name="MobileNewsScreen"
          >
            {(props) => (
              <MobileNewsScreen
                techNews={fakeNews}
                yOffset={yOffset}
                headerOpacity={headerOpacity}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
        <BottomNavBar />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
});
