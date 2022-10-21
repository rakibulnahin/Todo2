import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

import Add from "./Add"

import { fetchAllTask } from "../../Database/Task";


// createNoticeTable()
// createTaskTable()


export default function Test(){

    const [data, setData] = useState([]);
    const [blaa, setBlaa] = useState([])
 
    useEffect(()=>{
        fetchAllTask((values)=>{ setData( values.filter((item)=>{return new Date(item["DATE"]) > new Date()}) ) });
        let x = data
        setBlaa(x);
    }, [])

    const onPressHandler1=()=>{
        console.log("button1 pressed");
        // setAllTask("tour to bandarban", "2022-10-21T15:06:00.000Z")
    }

    const onPressHandler2=()=>{
        console.log("button2 pressed");
        // fetchAllTask()
    }



    return(

        <View>
            <Text>Hello</Text>
            <Button title="Button1" onPress={onPressHandler1} />
            <Button title="Button2" onPress={onPressHandler2} />

            {blaa.length > 0 && blaa.map((item)=>(<Text>{item["TASK"]}</Text>))}

        </View>

    )
}