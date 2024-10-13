import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { bg1 } from "../assets/images";
import Animated, { FadeInDown } from "react-native-reanimated";

const SplashScreen = ({ navigation }) => {
  return (
    <View className="w-full justify-center items-center flex-1 relative">
      <ImageBackground source={bg1} className="absolute flex-1 h-full w-full" />
      <View className="mb-[50%]">
        <Text className="text-2xl font-bold">Uzima AI</Text>
      </View>
      <Animated.View
      entering={FadeInDown.delay(300).springify()}
      className="absolute bottom-10 justify-center items-center">
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="bg-green-700 h-12 w-96 rounded-2xl justify-center items-center"
        >
          <Text className="text-white text-xl font-semibold">Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
