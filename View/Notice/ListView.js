import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";

import announcement from "../../assets/announcement.png"
import alarm from "../../assets/alarm.png"

import { fetchAllNotice, setNotice, createNoticeTable, deleteNotice } from "../../Database/Notice";



export default function ListView(){

    const [notice, setNotice] = useState([
        "Nahin", "Luffy", "Zoro", "Uchiha Madra", "Gojo Satoru"
    ])
    const [noticeIcon, setNoticeIcon] = useState({"announcement": announcement, "emergency":alarm})
    const backgroundcolor = {"0": "#419bf0", "1": "#2cd168", "2": "#3ed1de"}

    useState(()=>{
        fetchAllNotice((values)=>{console.log(values); setNotice(values)});
    })

    const onDeleteHandler = (index, notice)=>{
        // delete from database
        console.log("Delete notice button", notice);
        deleteNotice(notice["ID"]);

        fetchAllNotice((values)=>{setNotice(values)});
    }

    const onRenderHandler =(index, notice)=>{

        console.log("Rendering list view "+index+" "+notice["ID"]);
        let backColor = backgroundcolor["1"];
        if(notice["ID"]%3 == 0){
            backColor = backgroundcolor["0"];
        }else if(notice["ID"]%3 == 1){
            backColor = backgroundcolor["1"];
        }else if(notice["ID"]%3 == 2){
            backColor = backgroundcolor["2"];
        }
        
        return(
            <View style={[styles.noticeView, styles.shadowProp, {backgroundColor:backColor}]}>
                <Image source={noticeIcon[notice["ANNOUNCEMENT"]]} style={styles.noticeIcon} />
                <TouchableOpacity style={styles.delete} onPress={()=>{onDeleteHandler(index, notice)}}>
                    <Text style={{fontSize:40, fontWeight:"500", marginTop:-5}}>-</Text>
                </TouchableOpacity>
                <Text style={{fontSize:20, fontWeight:"500", margin:5}}>{notice["NOTICE"]}</Text>
            </View>
        )

    }
        

    return(

        <FlatList 
        
            data={notice}
            renderItem={({index, item})=>onRenderHandler(index, item)}
            contentContainerStyle={styles.flatList}
            numColumns={2}

        />



    )



}

const styles = StyleSheet.create({
    flatList: {
        // flex:1, 
        // flexDirection:"row", 
        // flexWrap:"wrap",
        // width: 300,
        // borderColor: "black",
        // borderWidth: 2,
        // borderRadius: 10,
        // alignItems: 'center',
        justifyContent: "center",
    },

    noticeView: {
        backgroundColor: "skyblue", 
        margin: 5, 
        flexDirection: 'column',
        width: 130,
        height: 130,
        borderRadius: 10,
        alignItems: "center",
        
    },

    shadowProp: {
        shadowColor: "#fff",
        shadowOffset: {width: -4, height:4},
        shadowOpacity: 0.5
    },

    noticeIcon: {
        width: 48, 
        height: 48,
        marginLeft: -70
    },

    delete: {
        backgroundColor: "red",
        width: 40,
        height: 40,
        borderRadius: 40,
        alignItems: "center",
        marginTop: -45,
        marginRight: -85
    }

})