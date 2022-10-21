import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Assigned from './View/Assigned/Assigned';
import Notice from './View/Notice/Notice';
import Due from './View/Due/Due';
import Test from './View/Test/Test';
import { createNoticeTable } from './Database/Notice';
import { createTaskTable, fetchAllTask, setAllTask } from './Database/Task';


import assigned_img from "./assets/assigned.png"
import notice_img from "./assets/notice.png"
import due_img from "./assets/due.png"


const Tab = createBottomTabNavigator();



export default function App() {
  return (
    <NavigationContainer>

      
        <Tab.Navigator
          initialRouteName='Assigned'
          screenOptions={({route})=>({
            tabBarIcon: ({focused, color, size})=>{
              let iconName;
              let rn = route.name;

              if(rn == "Assigned"){
                iconName = focused ? assigned_img : assigned_img
              }else if(rn == "Notice"){
                iconName = focused ? notice_img : notice_img
              }else if(rn == "Due"){
                iconName = focused ? due_img : due_img
              }

              return <Image source={iconName} 
                          style={{width: size, height: size, borderRadius: size}} />

            }
          })}

          tabBarOption = {{
            activeTintColor: "tomato",
            inactiveTintColor: "grey",
            labelStyle: {paddingBottom: 10, fontSize: 10},
            style: {padding: 10, height: 10}
          }}

        >

        <Tab.Screen name="Assigned" component={Assigned} />

        <Tab.Screen name="Notice" component={Notice} />

        <Tab.Screen name="Due" component={Due}/>

        {/* <Tab.Screen name="Test" component={Test}/> */}

        </Tab.Navigator>

      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
