import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import auth from "@react-native-firebase/auth";
import { Image } from "expo-image";

export default function Home() {
  const user = auth().currentUser;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>"Welcome Back {user?.email}🤩"</Text>
      <Image
        style={styles.image}
        source={{
          uri: "https://download01.xencelabs.com/Uploads/images/xencelabs/seo/20240419/4.jpg",
        }}
      />

      <View style={styles.buttonContainer}>
        <Link href="/(tabs)/navigation" style={styles.button}>
          Navigation
        </Link>
        <Link href={"/(tabs)/messages"} style={styles.button}>
          Messages
        </Link>
        <Link href={"/(tabs)/objectDetection"} style={styles.button}>
          Object Detection
        </Link>
        {/* <Button title="Sign Out" onPress={() => auth().signOut()} /> */}
        <TouchableOpacity
          style={styles.button2}
          onPress={() => auth().signOut()}
        >
          <Text style={styles.text2}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 50, // Makes the image circular
    marginBottom: 20, // Adds space below the image
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
  },
  button: {
    fontSize: 20,
    color: "black",
    backgroundColor: "lime",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textAlign: "center",
    width: 200, // Makes buttons uniform in width
  },
  button2: {
    justifyContent: "center",
    marginTop: 30,
  },
  text2: {
    color: "yellow",
    fontSize: 20,
  },
});
