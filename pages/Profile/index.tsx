import React from "react";
import { StyleSheet, View } from "react-native";
import Auth from "../../components/Auth";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDD",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
      <Auth />
    </View>
  );
};

export default Profile;
