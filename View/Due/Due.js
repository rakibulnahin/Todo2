import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, 
  Button, Platform, TouchableOpacity,
  SafeAreaView, TextInput } from 'react-native';
import { useState } from 'react';
import DateTimePiker from '@react-native-community/datetimepicker';

import ListView from './ListView';
import { Colors } from 'react-native/Libraries/NewAppScreen';



export default function Due() {

  const [task, setTask] = useState("") 
  const [showAddView, setShowAddView] = useState(true)


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Text style={[styles.header, styles.shadowProp]}>YOUR DUE ASSIGNMENTS!</Text>
      

      {/* List view of assignments */}
      <ListView />
      

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07a4f2',
    alignItems: 'center',
    backgroundColor: "#2b2828",
    // justifyContent: 'center',
    // backgroundColor: "rgba(240, 128, 10, 0.6)"
  },

  header: {
    marginTop: 20, 
    fontSize: 20, 
    fontWeight: "800",
    color: "#fc0505",
  },

  shadowProp: {
    shadowColor: "#fc0505",
    shadowOffset: {width: -3, height:3},
    shadowOpacity: 0.6
  },

  assignment_btn: {
    backgroundColor: "#0769f2",
    height: 40,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10
  },

  

});
