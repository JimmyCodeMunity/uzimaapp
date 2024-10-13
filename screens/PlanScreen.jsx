import React, { useContext, useEffect } from "react";
import { StyleSheet,ScrollView, SafeAreaView, TouchableOpacity, Text, View } from "react-native";
import * as Icon from "react-native-feather";
import { PlanContext } from "../context/PaymentPlanContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { plans } from "../constants";


const PlanScreen = ({ navigation }) => {
  const { setPlan } = useContext(PlanContext);

  const getCurrentPlan = async()=>{
    const storedPlan = await AsyncStorage.getItem("userPlan");
    if(storedPlan){
      setPlan(storedPlan);
      console.log("Plan saved", storedPlan);
      navigation.replace("Landing")
    }
  }
  useEffect(()=>{
    getCurrentPlan();
  },[])

  const selectPlan = async(plan) => {
    
    setPlan(plan);
    await AsyncStorage.setItem("userPlan", plan);
    navigation.navigate("Landing");
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="my-4 w-full justify-center items-center">
        <Text className="text-2xl font-semibold text-center">
          Explore Uzima Plans
        </Text>
      </View>

      <ScrollView className="h-full w-full px-4 space-y-4">
        {/* <View className="px-4 rounded-2xl p-4">
          <Text className="text-white text-xl">Free</Text>
          <Text className="text-white text-lg">Kshs.0 for 7 Days</Text>

          <Text className="text-white text-sm">few features</Text>
          <TouchableOpacity className="bg-green-600 te mt-2 h-8 rounded-md justify-center items-center">
            <Text className="text-white text-lg">Choose Plan</Text>
          </TouchableOpacity>
        </View> */}
        {plans.map((plan) => {
          return (
            <View
              className={`px-4 ${
                plan.name === "Free"
                  ? "bg-green-500"
                  : plan.name === "Monthly"
                  ? "bg-blue-500"
                  : plan.name === "Yearly"
                  ? "bg-yellow-500"
                  : (plan.name = "Corporate" ? "bg-black" : null)
              } rounded-2xl p-4`}
            >
              <Text className="text-white text-xl">{plan.name} Plan</Text>
              <Text className="text-white text-lg">
                Kshs.{plan.price}/{plan.duration}
              </Text>
              {plan.features.map((feature) => (
                <Text className="text-white text-sm">{feature}</Text>
              ))}
              <TouchableOpacity
                onPress={() =>
                  // navigation.navigate(plan.name === "Free" ? "Home" : "Payment")
                  selectPlan(plan.name)
                }
                className="bg-white mt-2 h-10 rounded-md justify-center items-center"
              >
                <Text className="text-black text-lg">Choose Plan</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlanScreen;

const styles = StyleSheet.create({});
