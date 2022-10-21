import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, 
  Button, Platform, TouchableOpacity,
  SafeAreaView, TextInput } from 'react-native';
import { useState } from 'react';
import DateTimePiker from '@react-native-community/datetimepicker';

import Add from './Add';
import ListView from './ListView';
import { deleteAllTask } from "../../Database/Task"



export default function Assigned() {

  const [task, setTask] = useState("")
  const [showAddView, setShowAddView] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Text style={[styles.header, styles.shadowProp]}>YOUR ASSIGNED ASSIGNMENTS!</Text>
      
      {/* Add and delete button view */}
      <View style={{flexDirection:'row'}}>

        <TouchableOpacity style={[styles.assignment_btn, styles.shadowProp]}
          onPress={()=>{setShowAddView(!showAddView)}} 
        >
          <Text style={{fontSize:15, fontWeight:'500', alignSelf:"center"}}>Add task</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.assignment_btn, styles.shadowProp]}
          onPress={()=>{deleteAllTask()}} 
        >
          <Text style={{fontSize:15, fontWeight:'500', alignSelf:"center"}}>Delete all task</Text>
        </TouchableOpacity>

      </View>

      {/* Add assignment view */}
      {showAddView && <Add/>}
      

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
    backgroundColor: "#080708"
    // justifyContent: 'center',
  },

  header: {
    marginTop: 20, 
    fontSize: 20, 
    fontWeight: "800",
    color: "rgb(5, 252, 21)"
  },  

  shadowProp: {
    shadowColor: "#05fc15",
    shadowOffset: {width: -2, height:4},
    shadowOpacity: 0.5
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
