import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, 
  Button, Platform, TouchableOpacity,
  SafeAreaView, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import DateTimePiker from '@react-native-community/datetimepicker';


import { setAllTask } from "../../Database/Task";



export default function Add(props){

    const [task, setTask] = useState("");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());



    const onSubmitHandler = () =>{

        console.log(task);
        console.log(date);
        console.log(time);

        let d = date.toISOString().split("T");
        let t = time.toISOString().split("T")
        let datetime = d[0]+"T"+t[1];
        console.log(datetime);

        if(task!=""){
            setAllTask(task, datetime);
        }else{
            alert("Task is not added");
        }

        

    }

    const onDateHandler=(event, selectedDate)=>{
        let currentDate = new Date(selectedDate);
        setDate(currentDate);
        console.log(selectedDate);

    }

    const onTimeHandler=(event, selectedTime)=>{
        let currentTime = new Date(selectedTime);
        setTime(currentTime);
        console.log(selectedTime);
    }


    return(
        <View style={[styles.AddView]}>

            <Text style={[styles.header, styles.shadowProp]}>Add New Assignment</Text>

            {/* Add Task */}
            <View style={styles.addTask}>
                <Text style={{fontWeight:"700", fontSize:18, color: "white"}}>Set Assignment</Text> 
                
                <TextInput 
                    style={{
                        height: 60, width: 230, color: "black",
                        backgroundColor:"white", borderColor:"black", 
                        borderWidth:1, borderRadius:5,
                    }} 
                    multiline={true} 
                    blurOnSubmit={true}
                    value={task}
                    onChangeText={setTask}
                    placeholder="Write your assignments here"
                />
            </View>
            
            {/* Set Date */}
            <View style={styles.addAssignmentComponents}>
                <Text style={{fontSize: 20, fontWeight: "500"}}>Set Date</Text> 
                <DateTimePiker 
                    style = {{width: 130, height: 50}}
                    value={date}
                    onChange={onDateHandler}
                    is24Hour={true}
                />
            </View>

            {/* Set time */}
            <View style={styles.addAssignmentComponents}>
                <Text style={{fontSize: 20, fontWeight: "500"}}>Set Time</Text> 
                <DateTimePiker 
                    style = {{width: 100, height: 50}}
                    value={time}
                    mode={"time"}
                    onChange={onTimeHandler}
                    is24Hour={true}
                />
            </View>

            {/* Submit button */}
            <TouchableOpacity style={[styles.shadowProp, styles.addBtn]} onPress={onSubmitHandler}>
                <Text style={{fontSize:15, fontWeight:'500', alignSelf:"center"}}>Add Assignment</Text>
            </TouchableOpacity>
        
      </View>
    )

}

const styles = StyleSheet.create({

    AddView: {
        flex: 5,
        flexDirection: "column",
        textAlign: "center",
        justifyContent: 'center',
        flexWrap: "wrap",
        alignItems: 'center',
        // borderColor: "white",
        // borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "rgba(112, 112, 111, 1)",
        padding: 5,        
    },

    header: {
        fontWeight:"700", 
        fontSize:23, 
        margin: 5,
        fontStyle:'italic',
        color:"#07fa50",
    },

    addTask: {
        // flex: 2,
        flexDirection: "column",
        alignItems: "center",
        // backgroundColor: "yellow",
        marginTop: 10,
    },

    addAssignmentComponents:{
        // flex: 2,
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 5,
        width: 230,
        paddingLeft: 5,
        paddingRight: 5,
    },

    shadowProp: {
        shadowColor: "#000000",
        shadowOffset: {width: -2, height:4},
        shadowOpacity: 0.5
    },

    addBtn: {
        backgroundColor: "#0769f2",
        height: 40,
        width: 150,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        margin: 10
    },

})