import {
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';
import Checkbox from 'expo-checkbox';

export default function Home({ navigation }) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const schedule = [
    [
      'AI&ML (YVSP)',
      'SE (PTF)',
      'DM (MAH)',
      'NTC (AG)',
      'WP (VS)',
      'AI&ML Lab Batch-I SW-IV Lab (AG)',
    ],
    [
      'AI&ML (YVSP)',
      'SE (PTF)',
      'NTC (AG)',
      'WP (VS)',
      'AI&ML Lab Batch-II SW-IV Lab (AG)',
    ],
    [
      'DBMS (CKR)',
      'DBMS Lab Batch-I SW-II Lab (VBN) / WP Lab Batch-II SW-IV Lab (VS)',
      'DM (MAH)',
      'SE (PTF)',
    ],
    ['AI&ML (YVSP)', 'DBMS (CKR)', 'NTC (AG)', 'DM (MAH)'],
    [
      'DBMS (CKR)',
      'DBMS Lab Batch-II SW-II Lab (VBN) / WP Lab Batch-I SW-IV Lab (VS)',
      'WP (VS)',
    ],
  ];
  const add = async (key, item) => {
    try {
      await AsyncStorage.setItem(key, item);
    } catch (err) {
      console.log(err);
    }
  };
  const retrieve = async (key) => {
    try {
      let val = await AsyncStorage.getItem(key);
      return (val)
    } catch (err) {
      console.log(err);
    }
  };
  const [isSelected, setSelected] = useState(new Array(9).fill(false));
  const [isSubmitted,setSubmitted] = useState(false)

  const handleVal = (index) => {
    if(!isSubmitted){
    const newSelectedState = isSelected.map((item, idx) =>
      idx == index ? !item : item
    );
    setSelected(newSelectedState);
    }
  };
  const [obj, setObj] = useState({
    0: [0],
    1: [0],
    2: [0],
    3: [0],
    4: [0],
    5: [0],
    6: [0],
    7: [0],
    8: [0],
  });
  const getIdx = (item) => {
    switch (item) {
      case 'AI&ML (YVSP)':
        return 0;
      case 'SE (PTF)':
        return 1;
      case 'DM (MAH)':
        return 2;
      case 'NTC (AG)':
        return 3;
      case 'WP (VS)':
        return 4;
      case 'DBMS (CKR)':
        return 5;
      case 'AI&ML Lab Batch-II SW-IV Lab (AG)':
        return 6;
      case 'DBMS Lab Batch-II SW-II Lab (VBN) / WP Lab Batch-I SW-IV Lab (VS)':
        return 7;
      case 'DBMS Lab Batch-I SW-II Lab (VBN) / WP Lab Batch-II SW-IV Lab (VS)':
        return 8;
    }
  };
  const date = new Date();
  const day = date.getDay();
  
  const check = async() => {
    let val = await retrieve('attended');
    val = JSON.parse(val)
    return val
  };

  const calTotal = async()=>{
    const startDate = 28;
    const currentDate = date.getDate()
    let t=0
    for(let i = startDate;i<currentDate;i++){
      let d = currentDate-startDate
      if(d!=0 && d!=6){
        t+=schedule[d].length
      }
    }
    await add('total',JSON.stringify(t))

  }

  const total = async()=>{
    if(day>0 && day!=6){
      let val = schedule[day-1].length
       
      await add('total',JSON.stringify(val))
    }
  }
  const edit = async()=>{
    if(isSubmitted){
      setSubmitted(false)
      let newObj = obj
      isSelected.map((item, idx) => {
      if (item) {
        if(obj[idx][0]>0){
        newObj[idx][0] = obj[idx][0] - 1;
        console.log(obj);
        }
        else{
          newObj[idx][0] = 0
        }
      }
    });
    setObj(newObj);
    await add('attended', JSON.stringify(newObj));
    console.log('added');
    }
  }
  const submit = async() => {
    if(!isSubmitted){
    try{
    const c = isSelected.filter((item) => item === true).length;
  
    let newObj = await check()
    isSelected.map((item, idx) => {
      if (item) {
        
        newObj[idx][0] = obj[idx][0] + 1;
        console.log(obj);
      }
    });
    setObj(newObj);
    await add('attended', JSON.stringify(newObj));
    await add('selected',JSON.stringify(isSelected));
    console.log('added');
    total()
    navigation.navigate('Attendance')
    }
    catch(err){
      console.log(err)
    }
    }
    setSubmitted(true);
  };

  useEffect(()=>{
    const fetch = async()=>{
      try{
      let t = await retrieve('total')
      let o = await retrieve('attended')
      let x = await retrieve('selected')
      if(t==null){
        calTotal()
      }
      if(o==null){
        await add('attended',JSON.stringify(obj))
      }
      if(x==null){
        x = new Array(9).fill(false)
         setSelected(x)
        x = JSON.stringify(x)
        console.log(x)
      await add('selected',x)
        x = JSON.parse(x)
      }
      else{
        x = JSON.parse(x)
         setSelected(x)
      }
      setSubmitted(true)
     
      
    }
    catch(err){
      console.log(err)
    }
    }

    fetch()
  },[])
  if (day > 0 && day<6) {
    return (
      <View style={styles.container}>
      <Text style={styles.heading}>{date.getDate()} {months[date.getMonth()]}, {days[day]}</Text>
        <View>
          {schedule[day-1].map((item, index) => (          
            <View key={index} style={styles.box}>
              <Checkbox style={styles.cb}
                value={isSelected[getIdx(item)]}
                onValueChange={() => handleVal(getIdx(item))}>
               
              </Checkbox>
              <Text style={styles.txt}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={styles.btnContainer}>
        <Pressable style={styles.btn} onPress={submit}><Text>Submit</Text></Pressable>
        </View>
        <View style={styles.btnContainer}>
        <Pressable style={styles.btn1} onPress={edit}><Text>Edit attendance</Text></Pressable>
        </View>
      </View>
    );
  } else {<Text style={styles.heading}>{date.getDate()} {months[date.getMonth()]}, {days[day]}</Text>
    return <Text>Holidayv :</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 5,
    margin:5
    
  },
  heading:{
     margin:10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txt: {
    margin:10,
    padding:10,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cb:{
      textAlign: 'center',
       margin:10,
  },
  box: {
    flexDirection: 'row',
    padding:10,
    justifyContent:'start',
    alignItems:'center'
  },
  btnContainer:{
alignItems:'center',
margin:10,
  },
  btn:{
    height:40,
    width:100,
    backgroundColor:'#6ecaf5',
    color:'white',
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius:50,
    borderWidth:1,
    margin:10,
    padding:10,   
  },
  btn1:{
    height:40,
    width:150,
    backgroundColor:'#6ecaf5',
    color:'white',
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius:50,
    borderWidth:1,
    margin:10,
    padding:10,
  }
});
