import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { VoiceButton } from "../(voice)/voiceButton";

const MapScreen: React.FC = () => {
  const [region, setRegion] = useState<Region>({
    latitude: 13.0493,
    longitude: 80.1762,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // Function to Zoom In
  const zoomIn = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: Math.max(prevRegion.latitudeDelta / 2, 0.001), // Prevent excessive zoom
      longitudeDelta: Math.max(prevRegion.longitudeDelta / 2, 0.001),
    }));
  };

  // Function to Zoom Out
  const zoomOut = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 2,
      longitudeDelta: prevRegion.longitudeDelta * 2,
    }));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        zoomEnabled={true} // Enables gestures
        pitchEnabled={true} // Allows angle changes
      >
        <Marker
          coordinate={{ latitude: 13.0493, longitude: 80.1762 }}
          title="My Location"
          description="Valsaravakkam, Chennai"
        />
      </MapView>

      {/* Zoom Controls */}
      <View style={styles.zoomContainer}>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
          <Text style={styles.zoomText}>-</Text>
        </TouchableOpacity>
      </View>
      <VoiceButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  zoomContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    padding: 5,
  },
  zoomButton: {
    backgroundColor: "black",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  zoomText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});

export default MapScreen;
