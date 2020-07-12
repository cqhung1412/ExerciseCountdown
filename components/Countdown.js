import React, { Component, Fragment } from 'react'
import CountDown from 'react-native-countdown-component'
import { StyleSheet, Text, View } from 'react-native'

const WorkCountdown = props => (
  <CountDown
    size={70}
    until={props.until}
    onFinish={props.onFinish}
    digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
    digitTxtStyle={{color: '#1CC625'}}
    separatorStyle={{color: '#1CC625'}}
    timeToShow={['M', 'S']}
    timeLabels={{m: null, s: null}}
    showSeparator
  />
)

const RestCountdown = props => (
  <CountDown
    size={70}
    until={props.until}
    onFinish={props.onFinish}
    digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#000'}}
    digitTxtStyle={{color: '#000'}}
    separatorStyle={{color: '#000'}}
    timeToShow={['M', 'S']}
    timeLabels={{m: null, s: null}}
    showSeparator
  />
)

class Countdown extends Component {
  state = {
    count: null,
    toggleTimer: false
  }

  componentDidMount() {
    this.setState({ count: 1, toggleTimer: true })
  }

  toggleTimerHandler = () => {
    this.setState({ 
      count: this.state.toggleTimer ? this.state.count : this.state.count + 1,
      toggleTimer: !this.state.toggleTimer 
    })
  }

  incrementCounter = () => {
    this.setState({ count: this.state.count + 1 })
  }


  render() {
    const { workTime, restTime, rep } = this.props
    
    let countdownDisplay = null

    this.state.toggleTimer ?
    countdownDisplay = 
      <Fragment>
        <WorkCountdown until={workTime} onFinish={this.toggleTimerHandler} />
        <Text style={styles.text}>Workout Time</Text>
      </Fragment> :
    countdownDisplay = 
      <Fragment>  
        <RestCountdown until={restTime} onFinish={this.toggleTimerHandler} />
        <Text style={styles.text}>Rest Time</Text>
      </Fragment>

    return (
      <>
        <Text style={styles.text}>{'Rep #' + this.state.count}</Text>
        {countdownDisplay}
      </>
    )
  }
  
}

export default Countdown

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 20
  }
})
