import 'react-native-gesture-handler';  
import { enableScreens } from 'react-native-screens';
enableScreens(true);
import {
  Button,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home.js';
import Attendance from './Attendance.js';
import Edit from './Edit.js';
import { Directions } from 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();

export default function App() {
  const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
  return (
    <NavigationContainer>
      
      
      <Stack.Navigator initialRouteName="Home">
        
        <Stack.Screen name="Home" 
         component={Home} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="Edit" component={Edit} />
      </Stack.Navigator>
     
      
      
    </NavigationContainer>
  );
  }

 const styles = StyleSheet.create({
  txt: {
    color:'black',
    fontSize:20,
  },
  container:{
    flexDirection:'row',
    display:'flex',
  }
});

