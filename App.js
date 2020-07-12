import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Countdown from './components/Countdown';

const MyButton = props => {
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={props.onPress}
    >
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default class App extends Component {
  state = {
    isStarted: false
  }

  toggleCountdown = () => {
    this.setState({ isStarted: !this.state.isStarted })
  }

  render() {
    const { isStarted } = this.state
    return (
      <View style={styles.container}>
        {
          !isStarted ?
          <MyButton title={'Let us kill these!'} onPress={this.toggleCountdown} /> :
          <Fragment>
            <Countdown workTime={45} restTime={15} rep={10} finished={this.toggleCountdown}/>
            <MyButton title={'Stop plsss'} onPress={this.toggleCountdown} />
          </Fragment>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#05DC72',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    margin: 20,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  text: {
    fontSize: 20,
  }
});
