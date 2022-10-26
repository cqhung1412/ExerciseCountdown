import React, { Fragment, useEffect, useState } from "react";
import CountDown from "react-native-countdown-component";
import { StyleSheet, Text, Vibration } from "react-native";

const WorkCountdown = ({ until, onFinish }) => (
  <CountDown
    size={70}
    until={until}
    onFinish={onFinish}
    digitStyle={{
      backgroundColor: "#FFF",
      borderWidth: 2,
      borderColor: "#05AC72",
    }}
    digitTxtStyle={{ color: "#05AC72" }}
    separatorStyle={{ color: "#05AC72" }}
    timeToShow={["M", "S"]}
    timeLabels={{ m: null, s: null }}
    showSeparator
  />
);

const RestCountdown = ({ until, onFinish }) => (
  <CountDown
    size={70}
    until={until}
    onFinish={onFinish}
    digitStyle={{
      backgroundColor: "#FFF",
      borderWidth: 2,
      borderColor: "#000",
    }}
    digitTxtStyle={{ color: "#000" }}
    separatorStyle={{ color: "#000" }}
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

  let countdownDisplay = (
    <Fragment>
      <RestCountdown until={restTime} onFinish={toggleTimerHandler} />
      <Text style={styles.text}>Rest Time</Text>
    </Fragment>
  );
  if (toggleTimer)
    countdownDisplay = (
      <Fragment>
        <WorkCountdown until={workTime} onFinish={toggleTimerHandler} />
        <Text style={styles.text}>Workout Time</Text>
      </Fragment>
    );
  return (
    <>
      {count < rep + 1 ? (
        <Fragment>
          <Text style={styles.text}>{"Rep #" + count}</Text>
          {countdownDisplay}
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
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 20,
  },
});
