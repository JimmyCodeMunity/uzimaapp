import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getOpenAIResponse } from "../utils/OpenAiService";
import { Modal, Portal, Button, PaperProvider } from "react-native-paper";

const REQUEST_LIMIT = 2;

const ChatScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [plan, setPlan] = useState(null);
  const [requestCount, setRequestCount] = useState(0);

  const getCurrentPlan = async () => {
    const storedPlan = await AsyncStorage.getItem("userPlan");
    if (storedPlan) {
      setPlan(storedPlan);
      console.log("Plan saved", storedPlan);
      // navigation.replace("Landing");
    }
  };

  const getRequestCount = async () => {
    const storedCount = await AsyncStorage.getItem("requestCount");
    if (storedCount) {
      setRequestCount(parseInt(storedCount, 10));
      console.log("counted",storedCount)
    }
  };

  const saveRequestCount = async (count) => {
    try {
      await AsyncStorage.setItem("requestCount", count.toString());
    } catch (error) {
      console.error("Failed to save request count to storage", error);
    }
  };

  useEffect(() => {
    getCurrentPlan();
    getRequestCount();
  }, []);

  console.log("My plan", plan);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 12,
  };

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    saveMessages();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem("chatMessages");
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      console.error("Failed to load messages from storage", error);
    }
  };

  const clearChat = async () => {
    setMessages([]);
    await AsyncStorage.removeItem("chatMessages");
    await AsyncStorage.setItem("requestCount", "0"); // Reset the request count
    setRequestCount(0); // Reset request count in state
    hideModal();
  };

  const saveMessages = async () => {
    try {
      await AsyncStorage.setItem("chatMessages", JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save messages to storage", error);
    }
  };

  const onSend = useCallback(async (newMessages = []) => {
    if (plan === "Free" && requestCount >= REQUEST_LIMIT) {
      const limitReachedMessage = {
        _id: Math.random().toString(36).substring(7),
        text: "You have reached the maximum number of requests for the Free plan. Please upgrade to continue.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
          avatar: require("../assets/bot.png"),
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, limitReachedMessage)
      );
      return;
    }

    const userMessage = newMessages[0];
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    setLoading(true);

    try {
      const botResponse = await getOpenAIResponse(userMessage.text);
      const botMessage = {
        _id: Math.random().toString(36).substring(7),
        text: botResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
          avatar: require("../assets/bot.png"),
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, botMessage)
      );

      // Increment and save the request count
      const newCount = requestCount + 1;
      setRequestCount(newCount);
      await saveRequestCount(newCount);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
      setLoading(false);
    }
  }, [plan, requestCount]);

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#34c759",
        },
        left: {
          backgroundColor: "#f0f0f0",
        },
      }}
      textStyle={{
        right: {
          color: "white",
        },
        left: {
          color: "black",
        },
      }}
    />
  );

  const renderSend = (props) => (
    <Send {...props}>
      <View style={styles.sendButton}>
        <Icon name="send" color="white" size={24} />
      </View>
    </Send>
  );

  return (
    <SafeAreaView style={styles.container}>
      <PaperProvider>
        <Portal>
          <Modal
            className="px-5 justify-center items-center flex-1"
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <View>
              <Text style={{ fontWeight: "bold" }}>
                Are you sure you want to clear the chat?
              </Text>
              <View className="flex-row justify-between items-center w-full">
                <Button className="" onPress={hideModal}>
                  Cancel
                </Button>
                <TouchableOpacity
                  onPress={clearChat}
                  className="bg-red-500 h-8 w-12 justify-center items-center rounded-md"
                >
                  <Text className="text-white">Clear</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </Portal>

        <View className="flex-row w-full justify-center items-center px-5 py-4 justify-between">
          <Text className="font-semibold text-lg text-slate-600">
            Chat With Uzima AI
          </Text>
          <TouchableOpacity onPress={showModal}>
            <Text className="font-semibold text-lg text-red-500">clear</Text>
          </TouchableOpacity>
        </View>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
            name: "User",
            avatar: require("../assets/icon.png"),
          }}
          renderBubble={renderBubble}
          renderSend={renderSend}
        />
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#34c759" />
          </View>
        )}
      </PaperProvider>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButton: {
    backgroundColor: "#34c759",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    marginRight: 5,
  },
});
