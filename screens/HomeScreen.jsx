import {
  Animated,
  StyleSheet,
  View,
  Text,
  Platform,
  RefreshControl,
  FlatList,
} from "react-native";
import {
  useLayoutEffect,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { useNavigation } from "@react-navigation/native";
import * as news from "../utils/gnews";

import TechGridTile from "../components/TechGridTile";
import GeneralNewsLine from "../components/GeneralNewsLine";

export default function HomeScreen({
  techNews,
  yOffset,
  headerOpacity,
  setTechNews,
  setGeneralNews,
  generalNews,
  onLayoutRootView,
  lastVisitedScreen,
  listViewRef,
}) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  function renderTechItem(itemData) {
    return (
      <TechGridTile data={itemData} lastVisitedScreen={lastVisitedScreen} />
    );
  }

  function renderGeneralTechItem(itemData) {
    return <GeneralNewsLine data={itemData} />;
  }
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (Platform.OS === "ios") {
      navigation.setOptions({
        headerStyle: {
          opacity: headerOpacity,
        },
        headerBackground: () => (
          <>
            <Animated.View
              style={{
                backgroundColor: "#E6E6E6",
                ...StyleSheet.absoluteFillObject,
                opacity: headerOpacity,
              }}
            >
              <Text style={styles.headerTitle}>GetTeched</Text>
            </Animated.View>
          </>
        ),
        headerTransparent: true,
      });
    }
  }, [headerOpacity, navigation]);

  useEffect(function () {
    (async function () {
      const techNews = await news.getTechNews();
      setTechNews([...techNews.reverse()]);
      const generalNews = await news.getGeneralNews();
      let result = [...generalNews.reverse().splice(0, 4)];
      setGeneralNews([...result]);
      console.log(result);
    })();
  }, []);

  return (
    <>
      <View
        style={{
          paddingTop: "30%",
        }}
      >
        <FlatList
          data={generalNews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderGeneralTechItem}
        />
      </View>
      <View style={styles.list} onLayout={onLayoutRootView}>
        <Animated.FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: yOffset,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={techNews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTechItem}
          ref={listViewRef}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  listHeader: {
    paddingTop: "25%",
  },
  generalNews: {},
  list: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 16 : 0,
    justifyContent: "center",
  },
  headerTitle: {
    marginTop: "15%",
    fontFamily: "Audiowide",
    fontSize: 20,
    justifySelf: "center",
    alignSelf: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    opacity: "center",
    zIndex: "-1",
  },
});
