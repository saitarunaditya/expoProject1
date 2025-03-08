import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Button,
  View,
  Text,
  ScrollView,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { VoiceButton } from "../(voice)/voiceButton";

const AIChatbot = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<{ type: string; text: string }[]>(
    []
  );

  const handleSend = () => {
    if (text.trim()) {
      const newMessages = [...messages, { type: "user", text }];
      setMessages(newMessages);
      setText("");

      // Simulating AI response
      setTimeout(() => {
        setMessages([
          ...newMessages,
          { type: "bot", text: "I'm an AI chatbot! How can I assist you?" },
        ]);
      }, 1000);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.chatContainer}>
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.message,
                msg.type === "user" ? styles.userMessage : styles.botMessage,
              ]}
            >
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Voice Button above the input box */}
        <View style={styles.voiceButtonContainer}>
          <VoiceButton />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            placeholder="Type a message..."
          />
          <Button title="Send" onPress={handleSend} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#0078fe",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "green",
  },
  messageText: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
  voiceButtonContainer: {
    alignItems: "center",
    marginBottom: 5, // Space between button and input
  },
});

export default AIChatbot;
