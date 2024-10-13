import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { days, months } from "../constants";
import { PaperProvider, Portal, Modal } from "react-native-paper";
import CheckBox from "react-native-check-box";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

const TodoScreen = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  // Load todos from local storage on app start
  useEffect(() => {
    loadTodos();
  }, []);

  // Save todos to local storage when the todoList changes
  useEffect(() => {
    saveTodos(todoList);
  }, [todoList]);

  // Load todos from AsyncStorage
  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem("todos");
      if (storedTodos) {
        setTodoList(JSON.parse(storedTodos));
      }
    } catch (e) {
      console.error("Failed to load todos.");
    }
  };

  // Save todos to AsyncStorage
  const saveTodos = async (todos) => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    } catch (e) {
      console.error("Failed to save todos.");
    }
  };

  // Add a new todo
  const addTodo = () => {
    if (todo.trim() !== "") {
      setTodoList([
        ...todoList,
        { id: Date.now().toString(), text: todo, status: "incomplete" },
      ]);
      setTodo("");
      hideModal();
    }
  };

  // Remove a todo
  const removeTodo = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  // Toggle completion status of a todo
  const toggleComplete = (id) => {
    const updatedTodos = todoList.map((todoItem) => {
      if (todoItem.id === id) {
        return {
          ...todoItem,
          status: todoItem.status === "incomplete" ? "complete" : "incomplete",
        };
      }
      return todoItem;
    });
    setTodoList(updatedTodos);
  };

  // get date
  const formatDate = (date) => {
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} ${month} ${year}`;
  };

  const today = new Date();
  const formattedDate = formatDate(today);

  // handle modal
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    height: 300,
    borderRadius: 10,
  };

  return (
    <PaperProvider>
      <SafeAreaView className="flex-1">
        <StatusBar style="dark"/>
        {/* modal here */}
        <Portal className="px-4 justify-center items-center flex-1">
          <Modal
            className="h-full w-full rounded-2xl px-5 justify-center space-y-3"
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text className="text-xl font-semibold">Add new Task</Text>
            <TextInput
              value={todo}
              onChangeText={setTodo}
              className="w-full px-4 h-12 rounded-xl border border-slate-300"
              placeholder="enter task"
            />
            <TouchableOpacity
              onPress={addTodo}
              className="bg-green-700 justify-center items-center rounded-xl h-12 w-full"
            >
              <Text className="text-white text-xl">Create</Text>
            </TouchableOpacity>
          </Modal>
        </Portal>

        {/* /modal end */}
        <View className="w-full px-4 justify-between flex-row my-8 items-center">
          <View>
            <Text className="text-2xl font-bold">{formattedDate}</Text>
          </View>
          <View className="justify-end items-end">
            <TouchableOpacity
              className="rounded-full justify-center items-center bg-green-500 h-10 w-10"
              onPress={showModal}
            >
              <Icon name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="w-full px-4">
          <TextInput
            placeholder="Search..."
            value={todo}
            onChangeText={setTodo}
            className="h-12 w-full rounded-xl border border-slate-300 px-4"
          />
        </View>

        <View className="px-4 mt-4">
          <Text className="text-black text-lg font-semibold">Tasks</Text>
          {todoList.length > 0 ? (
            <FlatList
              data={todoList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Animated.View
                  entering={FadeInUp.delay(300).springify()}
                  exiting={FadeInDown.delay(300).springify()}
                  className="w-full h-16 rounded-md bg-slate-200 border border-slate-300 mb-4 px-4 justify-between items-center flex-row"
                >
                  <Text
                    style={[
                      styles.todoText,
                      {
                        textDecorationLine:
                          item.status === "complete" ? "line-through" : "none",
                      },
                    ]}
                  >
                    {item.text}
                  </Text>
                  <View className="flex-row items-center space-x-3">
                    <CheckBox
                      className=""
                      onClick={() => toggleComplete(item.id)} // Toggle completion status
                      isChecked={item.status === "complete"} // Set checkbox state based on todo status
                      // Label text
                    />
                    <TouchableOpacity onPress={() => removeTodo(item.id)}>
                      <Icon name="delete" color="gray" size={25} />
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              )}
            />
          ) : (
            <View className="w-full h-96 space-y-10  px-4 justify-center items-center">
              <Image
                className="object-container h-60 w-60"
                source={require("../assets/images/task1.png")}
              />
              <Text className="text-center">
                Click on plus button above to start
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  todoText: {
    fontSize: 16,
  },
});

export default TodoScreen;
