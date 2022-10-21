import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,
  Button, Platform, TouchableOpacity,
  SafeAreaView, FlatList, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';

import { createTaskTable, fetchAllTask, setAllTask, deleteTask } from "../../Database/Task";

import refresh from "../../assets/refresh.png"

export default function ListView(){
 
    const [listData, setListData] = useState( [

        {"ID": 1, "TASK": "Task 1", "DATE": "10-16-2022"},
        {"ID": 2, "TASK": "Task 2", "DATE": "10-17-2022"},
        {"ID": 3, "TASK": "Task 3", "DATE": "10-18-2022"},
        {"ID": 4, "TASK": "Task 4", "DATE": "10-19-2022"},

    ] );

    const [borderColor, setBorderColor] = useState([]) 


    useEffect( ()=>{
        fetchAllTask((values)=>{setListData( values.filter((item)=>{return new Date(item["DATE"]) >= new Date()}) )})
        
    }, [])

    useEffect(()=>{

    },[])



    const onTaskDeleteHandler=(id)=>{
        deleteTask(id);
        fetchAllTask((values)=>{setListData(values)});
    }


    const renderItem=(index, item)=>{

        let bordercolor = "none";
        let diff = (new Date(item["DATE"])-new Date()) / (60*60*1000)
        if( diff <= 24 ){
            bordercolor = "red";
        }else if(diff > 24 && diff <= 36){
            bordercolor = "yellow";
        }else{
            bordercolor = "green"
        }

        return(
            <TouchableOpacity style={[styles.taskItem, {borderColor:bordercolor, borderWidth:3}]}>


                {/* Assignment and date view */}
                <View style={styles.TaskView}>
                    <Text style={styles.TaskText}>Task:  {item["TASK"]}</Text>
                    <Text style={styles.TaskDate}>Date: {new Date (item["DATE"]).toLocaleString() }</Text>
                </View>

                {/* Edit and Delete button */}
                <View style={{flex: 1, flexDirection:"row"}}>

                    {/* <TouchableOpacity 
                        style={[styles.taskEditBtn, styles.shadowProp, {backgroundColor: "rgba(15, 209, 122, 1)"}]}
                        onPress={()=>{onTaskEditHandler(item)}}
                    >
                        <Text style={{fontSize:15, fontWeight:'500', alignSelf:"center"}}>Edit</Text>
                    </TouchableOpacity> */}

                    
                    <TouchableOpacity 
                        style={[styles.taskEditBtn, styles.shadowProp, {backgroundColor: "rgba(212, 8, 8, 1)"}]}
                        onPress={()=>{
                            onTaskDeleteHandler(item["ID"]);
                            fetchAllTask((values)=>{setListData( values.filter((values)=>{return new Date(item["DATE"]) >= new Date()}) )})
                         }}
                    >
                        <Text style={{fontSize:15, fontWeight:'500', alignSelf:"center"}}>Delete</Text>
                    </TouchableOpacity>

                </View>
                
            </TouchableOpacity>
        )
    }
    
    return(
        <View style={[styles.container, styles.shadowProp]}>

                <TouchableOpacity style={[styles.refresh, styles.shadowProp]}
                    onPress={()=>{
                        fetchAllTask((values)=>{setListData( values.filter((item)=>{return new Date(item["DATE"]) >= new Date()}) )})
                    }}
                >
                    <Image source={refresh} resizeMode="contain" style={{width:30, height:30}} />
                </TouchableOpacity>

            <FlatList 
                data={listData}
                renderItem={({index, item})=>renderItem(index, item)}
            />
        </View>
    );


}


const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#07a4f2',
        alignItems: 'start',
        // justifyContent: 'center',
        borderColor: "black",
        borderRadius: 10,
        borderWidth: 1,
        width: Dimensions.get("window").width-30,
        margin: 10,
    },

    shadowProp: {
        shadowColor: "#000000",
        shadowOffset: {width: -2, height:4},
        shadowOpacity: 0.5
    },

    taskItem: {
        flex: 2,
        flexDirection: 'row',
        margin: 10,
        width: Dimensions.get("window").width-60,
        height: 70,
        backgroundColor: "rgba(7, 24, 250, 0.1)",
        // opacity: 0.1,
        backfaceVisibility: 'hidden',
        borderRadius: 10
    },

    taskEditBtn: {
        backgroundColor: "#0769f2",
        height: 40,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        margin: 10,
    },

    TaskView: {
        flex: 3, 
        flexDirection:"row", 
        justifyContent:"space-around", 
        padding: 5
    },

    TaskText: {
        flex:2.5,
        fontSize: 14,
        color: "white",
        height: 50,
        flexWrap: "wrap",
        margin: 5,
        fontStyle: "bold"
    },

    TaskDate:{
        flex: 1.5, 
        fontSize: 13, 
        margin: 5, 
        color: "white"
    },

    addView: {
        marginTop:-10, 
        marginLeft: 50,
        position: "absolute", 
        zIndex: 3,

    },

    refresh: { 
        width:30, 
        height:30, 
        marginLeft:300, 
        marginTop:-15, 
        marginBottom:5,
    
    }

})