import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Voice from "@react-native-voice/voice";
import * as Haptics from "expo-haptics";
import { FontAwesome } from "@expo/vector-icons";

export function VoiceButton() {
  const [isListening, setIsListening] = useState(false);

  // Start voice recognition
  const startVoiceRecognition = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); // Haptic feedback
    setIsListening(true);
    Voice.start("en-US" as any);
  };

  // Stop voice recognition
  const stopVoiceRecognition = () => {
    setIsListening(false);
    Voice.stop();
  };

  // Handle voice commands
  useEffect(() => {
    Voice.onSpeechResults = (result) => {
      const command = result?.value?.[0] || "";
      console.log("Heard:", command); // Log what it heard
    };

    // Cleanup function
    return () => {
      Voice.destroy(); // Call destroy without awaiting
      Voice.removeAllListeners();
    };
  }, []);

  return (
    <TouchableOpacity
      style={[
        styles.micButton,
        isListening && styles.micButtonActive, // Change color when listening
      ]}
      onPressIn={startVoiceRecognition}
      onPressOut={stopVoiceRecognition}
    >
      <FontAwesome
        name="microphone"
        size={40}
        color={isListening ? "#fff" : "#6200ee"} // Change icon color when listening
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  micButton: {
    position: "absolute",
    bottom: 30,
    left: "45%",
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "black",
    padding: 15,
    elevation: 5,
  },
  micButtonActive: {
    backgroundColor: "#6200ee",
  },
});
