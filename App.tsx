import React, { Fragment, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Countdown from "./components/Countdown";
import Auth from "./components/Auth";

const MyButton = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const [isStarted, setIsStarted] = useState(false);

  const toggleCountdown = () => {
    setIsStarted(!isStarted);
  };

  return (
    <View style={styles.container}>
      <Auth />
      {!isStarted ? (
        <MyButton title={"Let us kill these!"} onPress={toggleCountdown} />
      ) : (
        <Fragment>
          <Countdown
            workTime={45}
            restTime={15}
            rep={10}
            finished={toggleCountdown}
          />
          <MyButton title={"Stop plsss"} onPress={toggleCountdown} />
        </Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDD",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#05DC72",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    margin: 20,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  text: {
    fontSize: 20,
  },
});

export default App;
