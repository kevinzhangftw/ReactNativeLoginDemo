import React from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
// AWS configs
import Amplify, {Auth} from 'aws-amplify'
import config from './src/aws-exports'

Amplify.configure(config)

export default class App extends React.Component {
  state = { // 1
    authCode: ''
  }

  onChangeText(authCode) { // 2
    this.setState({ authCode })
  }

  signUp(){
    Auth.signUp({ //3
      username: 'admin',
      password: 'MyCoolP@ssword2!',
      attributes : {
        phone_number: '+16047608569',
        email: 'kevinctzhang@gmail.com'
      }
     }
    ).then(res =>{
      console.log('successful signup: ', res)
    }).catch(err => {
      console.log('error signing up: ', err)
    })
  }

  confirmUser(){ //4
    const {authCode} = this.state
    Auth.confirmSignUp('admin',authCode).then(
      res => {
        console.log('successful confirmation: ', res)
      }
    ).catch(err => {
      console.log('error confirming user: ', err)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title='Sign Up' onPress={this.signUp.bind(this)} />
        <TextInput
          placeholder='Input Code'
          onChangeText={value => this.onChangeText(value)}
          style={styles.input}
        />
        <Button
            title='Confirm User'
            onPress={this.confirmUser.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#ededed',
    marginVertical: 10
  },
})
