import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground, StyleSheet, Text, View, 
  TouchableOpacity, Dimensions, ScrollView, TextInput, Button } from 'react-native';
import DateTimePiker from "@react-native-community/datetimepicker"
import { useState } from 'react';

import { setNotice, createNoticeTable } from '../../Database/Notice';

import ListView from "./ListView"

createNoticeTable()


export default function Notice() {

  // const [notice, setNotice] = useState([...Array(9).keys()])
  const [showAddView, setShowAddView] = useState(false)

  // add notice
  // const [noticeText, setNoticeText] = useState("")
  // const [noticeType, setNoticeType] = useState("announcement")
  // const [option1, setOption1] = useState("white")
  // const [option2, setOption2] = useState("white")



  


  const AddView = () =>{

      // add notice
    const [noticeText, setNoticeText] = useState("")
    const [noticeType, setNoticeType] = useState("announcement")
    const [option1, setOption1] = useState("white")
    const [option2, setOption2] = useState("white")

    const onAddNoticeHandler =()=>{
      // add data to database first check parameteres
      console.log("Adding notices to database after parameter checks");
      if(noticeText != ""){
        setNotice(noticeText, noticeType);
      }else{
        alert("No notice was given");
      }

      setNoticeText("");
      setNoticeType("announcement");
      setOption1("white");
      setOption2("white");


    }
    
    return(
    <View style={styles.AddView}>

      <Text style={[styles.header, styles.shadowProp, {color: 'white', marginTop: -10}]}>Add notice </Text>

      <TextInput 
        style={{
            height: 60, width: 230, color: "black",
            backgroundColor:"white", borderColor:"black", 
            borderWidth:1, borderRadius:5,
        }} 
        multiline={true} 
        blurOnSubmit={true}
        value={noticeText}
        onChangeText={setNoticeText}
        placeholder="Write your assignments here"
      />

      <View style={{flex:0.5, flexDirection: "row", justifyContent: "center"}}>

        <TouchableOpacity style={[styles.addNoticeBtn, styles.shadowProp, {backgroundColor: option1}]}
          onPress={()=>{setNoticeType("announcement"); setOption1("#4287f5"); setOption2("white"); }} >
          <Text style={{fontSize:15, fontWeight:'500', alignSelf:"center"}}>Announcement</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.addNoticeBtn, styles.shadowProp, {backgroundColor: option2}]}
          onPress={()=>{setNoticeType("emergency"); setOption1("white"); setOption2("#2dc4a1");}} >
          <Text style={{fontSize:15, fontWeight:'500', alignSelf:"center"}}>Emergency</Text>
        </TouchableOpacity> 

      </View>

      <TouchableOpacity style={[styles.addNoticeBtn, styles.shadowProp, {backgroundColor: "#514d52", color: "white"}]}
        onPress={()=>{onAddNoticeHandler()}} >
        <Text style={{fontSize:15, fontWeight:'500', alignSelf:"center", color:"white"}}>Add Notice</Text>
      </TouchableOpacity> 


    </View>
    )
  }


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={[styles.header, styles.shadowProp]}>YOUR NOTICES </Text>
      

      <View>
        <TouchableOpacity style={[styles.addNoticeBtn, styles.shadowProp]}
          onPress={()=>{setShowAddView(!showAddView)}} 
        >
          <Text style={{fontSize:15, fontWeight:'500', alignSelf:"center"}}>Add Notice</Text>
        </TouchableOpacity>

        {showAddView && <AddView />}


      </View>

      <ListView />    
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgb(50, 54, 51)"
  },

  header: {
    marginTop: 20, 
    fontSize: 20, 
    fontWeight: "800",
    color: "rgb(8, 236, 252)"
  },  

  shadowProp: {
    shadowColor: "#fff",
    shadowOffset: {width: -2, height:4},
    shadowOpacity: 0.5
  },

  textStyle: {
    fontSize:15, 
    fontWeight:'500', 
    alignSelf:"center"
  },

  noticeContainer: {
    flex: 1,
    height: 300,
    width: Dimensions.get("window").width-50,
    backgroundColor: "pink",
    borderColor: 'black',
    borderWidth: 2
  },

  noticeboard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    flexWrap: "wrap",
    // height: 200,
    // width: 350,
    // alignItems: "center",
    overflow: "scroll",
    // backgroundColor: "pink",
    // flexWrap: "wrap",
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

  addNoticeBtn: {
    backgroundColor: "#fff",
    height: 40,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10
  },

  AddView: {
    borderWidth: 2, 
    borderColor: "white", 
    borderRadius: 5, 
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  }

});
