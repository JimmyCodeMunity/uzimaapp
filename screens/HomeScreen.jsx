import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { days, months } from "../constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
} from "react-native-gifted-charts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlanContext } from "../context/PaymentPlanContext";
import Animated, { FadeInDown } from "react-native-reanimated";

const HomeScreen = ({ navigation }) => {
  // handle plan checking
  const { setPlan } = useContext(PlanContext);

  const getCurrentPlan = async () => {
    const storedPlan = await AsyncStorage.getItem("userPlan");
    if (storedPlan) {
      setPlan(storedPlan);
      console.log("Plan saved", storedPlan);
      // navigation.replace("Landing")
    } else {
      navigation.navigate("Plans");
    }
  };
  useEffect(() => {
    getCurrentPlan();
  }, []);

  // ...
  const data = [
    { value: 250, label: "S" },
    { value: 250, label: "M" },
    { value: 500, label: "T", frontColor: "#177AD5" },
    { value: 745, label: "W", frontColor: "#177AD5" },
    { value: 320, label: "T" },
    { value: 600, label: "F", frontColor: "#177AD5" },
    { value: 256, label: "S" },
    { value: 300, label: "S" },
  ];
  const formatDate = (date) => {
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName} ${day} ${month} ${year}`;
  };

  const today = new Date();
  const formattedDate = formatDate(today);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView className="" vertical={true}>
        <View className="w-full px-4 justify-between items-center my-8 space-y-5">
          <View className="flex-row w-full justify-between items-center">
            <View className="px-4 flex-row items-center space-x-3">
              <Icon name="calendar" size={15} color="green" />
              <Text className="text-xs font-normal">{formattedDate}</Text>
            </View>
            <TouchableOpacity className="px-4 rounded-full border border-green-300 border-lg p-3 justify-center items-center">
              <Icon name="bell-badge-outline" color="gray" size={20} />
            </TouchableOpacity>
          </View>

          <View className="flex-row space-x-5 items-center w-full px-4">
            <View>
              {/* <Image
                source={"../assets/images/chat.png"}
                className="rounded-full border border-green-600 h-24 w-24"
              /> */}
              <Image
                  className="rounded-full border border-green-600 h-24 w-24"
                  source={require("../assets/bot.png")}
                />
            </View>
            <View className="space-y-4">
              <Text className="text-3xl font-semibold">Hi,Vivian!</Text>
              <View className="flex-row space-x-6 items-center w-full">
                <View className="flex-row items-center space-x-3">
                  <Icon name="gamepad-circle" size={20} color="green" />
                  <Text>Free</Text>
                </View>
                <View className="flex-row items-center space-x-3">
                  <Icon name="emoticon" size={20} color="green" />
                  <Text>Happy</Text>
                </View>
              </View>
            </View>
          </View>

          {/* chart */}

          <View className="w-full justify-center items-start">
            <Text className="text-2xl">Mood Analysis</Text>
          </View>

          <View className="w-full flex-row justify-between items-center">
            <Animated.View
              entering={FadeInDown.delay(300).springify()}
              className="w-[46%]"
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("UzimaChat")}
                className="h-40 w-full p-4 bg-green-400 rounded-2xl relative"
              >
                <Text className="text-3xl">Chat with AI</Text>
                <Image
                  className="h-12 w-12 absolute bottom-4 right-4"
                  source={require("../assets/images/chat.png")}
                />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(300).springify()}
              className="w-[46%]"
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Voice")}
                className="h-40 w-full p-4 bg-black rounded-2xl relative"
              >
                <Text className="text-3xl text-white">Voice AI</Text>
                <Image
                  className="h-12 w-12 absolute bottom-4 right-4"
                  source={require("../assets/images/voice.png")}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* mental health metrics */}
          <View className="w-full justify-start items-start flex-row">
            <Text className="text-2xl">Mental Health Metrics</Text>
          </View>

          <View className="w-full bg-slate-100 shadow shadow-lg rounded-2xl p-2 justify-center items-center">
            <BarChart
              barWidth={22}
              noOfSections={4}
              barBorderRadius={4}
              frontColor="gray"
              data={data}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
