import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const loadPlan = async () => {
      const storedPlan = await AsyncStorage.getItem("userPlan");
      if (storedPlan) {
        setPlan(storedPlan);
      }
    };

    loadPlan();
  }, []);

  return (
    <PlanContext.Provider value={{ plan, setPlan }}>
      {children}
    </PlanContext.Provider>
  );
};
