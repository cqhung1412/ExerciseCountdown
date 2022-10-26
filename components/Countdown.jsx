import React, { Fragment, useEffect, useState } from "react";
import CountDown from "react-native-countdown-component";
import { StyleSheet, Text, Vibration } from "react-native";

const WorkCountdown = ({ until, onFinish }) => (
  <CountDown
    size={30}
    until={until}
    onFinish={onFinish}
    digitStyle={{
      backgroundColor: "#FFF",
    }}
    timeToShow={["M", "S"]}
    timeLabels={{ m: null, s: null }}
    showSeparator
  />
);

const RestCountdown = ({ until, onFinish }) => (
  <CountDown
    size={30}
    until={until}
    onFinish={onFinish}
    digitStyle={{
      backgroundColor: "#FFF",
    }}
    digitTxtStyle={{ color: "#05AC72" }}
    separatorStyle={{ color: "#05AC72" }}
    timeToShow={["M", "S"]}
    timeLabels={{ m: null, s: null }}
    showSeparator
  />
);

const Countdown = ({ workTime, restTime, rep, finished }) => {
  const [count, setCount] = useState(null);
  const [toggleTimer, setToggleTimer] = useState(false);

  useEffect(() => {
    setCount(1);
    setToggleTimer(true);
  }, []);

  const toggleTimerHandler = () => {
    Vibration.vibrate();
    if (!toggleTimer) incrementCounter();
    setToggleTimer(!toggleTimer);
  };

  const incrementCounter = () => setCount(count + 1);

  const finishHandler = () => {
    alert("Well done!!!");
    finished();
  };

  return (
    <>
      {count < rep + 1 ? (
        <Fragment>
          <Text style={styles.text}>{"Rep #" + count}</Text>
          {toggleTimer ? (
            <WorkCountdown until={workTime} onFinish={toggleTimerHandler} />
          ) : (
            <RestCountdown until={restTime} onFinish={toggleTimerHandler} />
          )}
          <Text style={styles.text}>
            {toggleTimer ? "Workout" : "Rest"} Time
          </Text>
        </Fragment>
      ) : (
        finishHandler()
      )}
    </>
  );
};

export default Countdown;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    // fontWeight: "bold",
    marginVertical: 20,
  },
});
