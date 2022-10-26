import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const styles = StyleSheet.create({
  button: {
    borderColor: "grey",
    padding: "5px",
    margin: "5px",
    borderWidth: 1,
    borderRadius: 2,
  },
  text: {
    fontSize: 14,
  },
});

type ButtonProps = {
  onPress?: (event: GestureResponderEvent) => void;
  title: string;
};

const Button: React.FC<ButtonProps> = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
