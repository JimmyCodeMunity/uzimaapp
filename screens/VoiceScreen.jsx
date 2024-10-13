import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const VoiceScreen = ({ navigation }) => {
  const [listening, setListening] = useState(false);
  return (
    <View className="flex-1 justify-center items-center">
      <View className="space-y-2 justify-center items-center">
        <TouchableOpacity onPress={()=>setListening(true)}>
          <Image
            source={require("../assets/images/voice.png")}
            className="h-32 w-32"
          />
        </TouchableOpacity>
        <Text className="text-slate-500">Click to start chat...</Text>
        {listening ? (
          <Text className="text-lg font-semibold">Listening....</Text>
        ) : (
          <Text className="text-lg font-semibold">Start Listening</Text>
        )}
      </View>

      <View className="absolute bottom-20 justify-center items-center">
        {listening && (
          <TouchableOpacity
          onPress={()=>setListening(false)}
          className="bg-slate-500 justify-center items-center h-16 w-16 rounded-full">
            <Icon name="window-close" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default VoiceScreen;

const styles = StyleSheet.create({});
