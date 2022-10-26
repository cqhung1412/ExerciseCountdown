import React, { Fragment, useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../components/Button";
import Countdown from "../../components/Countdown";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDD",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Home: React.FC = () => {
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const toggleCountdown = () => {
    setIsStarted(!isStarted);
  };

  return (
    <View style={styles.container}>
      {!isStarted ? (
        <Button title={"Let us kill these!"} onPress={toggleCountdown} />
      ) : (
        <Fragment>
          <Countdown
            workTime={45}
            restTime={15}
            rep={10}
            finished={toggleCountdown}
          />
          <Button title={"Stop plsss"} onPress={toggleCountdown} />
        </Fragment>
      )}
    </View>
  );
};

export default Home;
