import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyNewService from './src/MyNewService'

const App = () => {
  return (
    <View style={styles.container}>
      <MyNewService/>
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