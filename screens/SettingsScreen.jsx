import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import { PlanContext } from "../context/PaymentPlanContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";

const SettingsScreen = ({ navigation }) => {
  const { setPlan, plan } = useContext(PlanContext);

  const clearPlan = async () => {
    await AsyncStorage.removeItem("userPlan");
    setPlan(null);
    navigation.goBack();
  };
  return (
    <ScrollView className="flex-1">
      <StatusBar style="light" />
      <ImageBackground
        className="h-80 w-full space-y-4"
        source={require("../assets/images/moodbg1.jpeg")}
      >
        <View className="w-full px-4 mt-32 space-y-4">
          <Text className="text-3xl font-semibold text-white">Settings</Text>

          <View className="flex-row items-center space-x-5">
            <View>
              <Image
                className="rounded-full border border-green-600 h-24 w-24"
                source={require("../assets/bot.png")}
              />
            </View>
            <View>
              <Text className="text-white text-2xl font-bold tracking-wider">
                Vivian
              </Text>
              <Text className="text-white text-lg tracking-wider">
                Vivian@gmail.com
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View className="w-full px-4 py-4">
        <View className="w-full my-4">
          <Text className="text-2xl font-semibold text-slate-600">Account</Text>
        </View>
        <View className="bg-white w-full rounded-md">
          <Pressable className="border border-slate-300 flex-row ml-4 h-12 border-t-0 border-r-0 border-l-0 justify-between items-center">
            <Text className="text-slate-600 text-lg">Profile</Text>
            <Icon
              name="chevron-right"
              size={30}
              color="gray"
              className="mr-4"
            />
          </Pressable>
          <Pressable className="border border-slate-300 flex-row ml-4 h-12 border-t-0 border-r-0 border-l-0 justify-between items-center">
            <Text className="text-slate-600 text-lg">Notifications</Text>
            <Icon
              name="chevron-right"
              size={30}
              color="gray"
              className="mr-4"
            />
          </Pressable>
          <Pressable className="border border-slate-300 flex-row ml-4 h-12 border-t-0 border-r-0 border-l-0 justify-between items-center">
            <Text className="text-slate-600 text-lg">Theme</Text>
            <Icon
              name="chevron-right"
              size={30}
              color="gray"
              className="mr-4"
            />
          </Pressable>
          <Pressable className="border border-slate-300 flex-row ml-4 h-12 border-t-0 border-r-0 border-l-0 justify-between items-center">
            <Text className="text-slate-600 text-lg">Profile</Text>
            <Icon
              name="chevron-right"
              size={30}
              color="gray"
              className="mr-4"
            />
          </Pressable>
        </View>
      </View>
      <View className="w-full px-4 py-4">
        <View className="w-full my-4">
          <Text className="text-2xl font-semibold text-slate-600">General</Text>
        </View>
        <View className="bg-white w-full rounded-md">
          <Pressable className="border border-slate-300 flex-row ml-4 h-12 border-t-0 border-r-0 border-l-0 justify-between items-center">
            <Text className="text-slate-600 text-lg">FAQ</Text>
            <Icon
              name="chevron-right"
              size={30}
              color="gray"
              className="mr-4"
            />
          </Pressable>
          <Pressable className="border border-slate-300 flex-row ml-4 h-12 border-t-0 border-r-0 border-l-0 justify-between items-center">
            <Text className="text-slate-600 text-lg">Share</Text>
            <Icon
              name="chevron-right"
              size={30}
              color="gray"
              className="mr-4"
            />
          </Pressable>
          <Pressable className="border border-slate-300 flex-row ml-4 h-12 border-t-0 border-r-0 border-l-0 justify-between items-center">
            <Text className="text-slate-600 text-lg">Terms & Conditions</Text>
            <Icon
              name="chevron-right"
              size={30}
              color="gray"
              className="mr-4"
            />
          </Pressable>
          <Pressable className="border border-slate-300 flex-row ml-4 h-12 border-t-0 border-r-0 border-l-0 justify-between items-center">
            <Text className="text-slate-600 text-lg">Privacy Policy</Text>
            <Icon
              name="chevron-right"
              size={30}
              color="gray"
              className="mr-4"
            />
          </Pressable>
          <Pressable
            onPress={clearPlan}
            className="border border-slate-300 flex-row ml-4 h-12 border-t-0 border-r-0 border-l-0 justify-between items-center"
          >
            <Text className="text-red-500 text-lg">Logout</Text>
            <Icon
              name="chevron-right"
              size={30}
              color="gray"
              className="mr-4"
            />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
