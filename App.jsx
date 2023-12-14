import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyNewService from './src/MyNewService'
import MyNewServiceTwo from './src/MyNewServiceTwo'

const App = () => {
  return (
    <View style={styles.container}>
      {/* <MyNewService/> */}
      <MyNewServiceTwo/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})