import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, 
  Image, 
  Button, 
  Alert, 
  TextInput, 
  KeyboardAvoidingView
} from 'react-native';
import styles from './styles';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.sendData = this.sendData.bind(this);

    //initialise states
    this.state = { 
			feedback: '', 
			name: '', 
      email: '', 
      interest: ''      
		};
  }

  sendData() {
    fetch('http://rnworkshop.herokuapp.com/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        feedback: this.state.feedback, 
        interest: this.state.interest
      })
    })
    .then(() => {
      Alert.alert(
        'Thank you. Your feedback is recorded!'
      ); 
      this.setState({
        feedback: '', 
        name: '', 
        email: '', 
        interest: ''
      });      
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image style={{height:100, width:100}} source={require('./assets/thankyou.png')} />
        <Text style={styles.welcome}>
          THANKS FOR TAKING PART IN THIS WORKSHOP
        </Text>
        <View>      
          <Text>Do you have any feedback regarding the workshop?</Text>
          <TextInput 
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(feedback) => 
            {
              this.setState({feedback: feedback})
            }}
            value={this.state.feedback}
          />
          
          <Text>GeeksHacking will organize events from time to time, would you be keen to hear about these events? (Yes/No)</Text>
          <TextInput 
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(interest) => 
            {
              this.setState({interest: interest})
            }}
            value={this.state.interest}
          />

          <Text>What is your name?</Text>
          <TextInput 
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(name) => 
            {
              this.setState({name: name})
            }}
            value={this.state.name}
          />
          
          <Text>What is your email?</Text>
          <TextInput 
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(email) => 
            {
              this.setState({email: email})
            }}
            value={this.state.email}
          />

        </View>
        <Button 
          onPress={this.sendData}
          title='Send Feedback'
        />
      </KeyboardAvoidingView>
    );
  }
}