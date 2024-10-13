import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";

const RegisterScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View className="w-full px-5 space-y-16">
        <View className="w-full">
          <Text className="text-2xl">Create Account</Text>
        </View>

        <View className="w-full space-y-5">
          <Text className="text-slate-500">Username</Text>
          <TextInput className="border border-slate-300 border-t-0 border-r-0 border-l-0" />
          <Text className="text-slate-500">Email Address</Text>
          <TextInput className="border border-slate-300 border-t-0 border-r-0 border-l-0" />
          <Text className="text-slate-500">Phone</Text>
          <TextInput className="border border-slate-300 border-t-0 border-r-0 border-l-0" />
          <Text className="text-slate-500">Password</Text>
          <TextInput className="border border-slate-300 border-t-0 border-r-0 border-l-0" />

          <View className="w-full justify-center items-center">
            <TouchableOpacity
              onPress={() => navigation.navigate("Plans")}
              className="h-10 w-full rounded-lg bg-green-700 justify-center items-center"
            >
              <Text className="text-white text-lg">Login</Text>
            </TouchableOpacity>
          </View>

          <View className="w-full flex row justify-end items-end">
            <Pressable
              onPress={() => navigation.navigate("Register")}
              className="text-slate-500 text-sm"
            >
              <Text className="text-green-700">Forgot Password</Text>
            </Pressable>
          </View>
          <View className="w-full justify-start items-start">
            <Pressable
              onPress={() => navigation.navigate("Register")}
              className="text-slate-500 text-sm"
            >
              <Text className="text-green-700">
                Already have account? Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
