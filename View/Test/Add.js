import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

import { createNoticeTable } from "../../Database/Notice";
import { createTaskTable, fetchAllTask, setAllTask } from "../../Database/Task";



export default function Add(){

    const [data, setData] = useState(false);

    useEffect( ()=>{
        fetchAllTask((values)=>{setData(values)})
    }, [])


    const Myview=()=>{
        if(data != false){
            return(
                <View>
                    {data.map(( (item)=>(<Text>{item["TASK"]}</Text>) ))}
                </View>
            )
        }
    }
    
    return(
        <View>
            <Myview />
        </View>
    )
}