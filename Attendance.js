import {
  button,
  Text,
  CheckBox,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect  } from 'react';
import { DataTable } from 'react-native-paper';

export default function Attendance({navigation}){
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
      case 'DBMS Lab Batch-I SW-II Lab (VBN)':
          return 7;
      case 'WP Lab Batch-I SW-IV Lab (VS)':
        return 8;
    }
  };
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
      'DBMS Lab Batch-I SW-II Lab (VBN)',
      'DM (MAH)',
      'SE (PTF)',
    ],
    ['AI&ML (YVSP)', 'DBMS (CKR)', 'NTC (AG)', 'DM (MAH)'],
    [
      'DBMS (CKR)',
      'WP Lab Batch-I SW-IV Lab (VS)',
      'WP (VS)',
    ],
  ];
    const Sub =  ['AI&ML (YVSP)','SE (PTF)','DM (MAH)','NTC (AG)','WP (VS)','DBMS (CKR)',
      'AI&ML Lab Lab (AG)','DBMS Lab Batch-I SW-II Lab (VBN)',
      'WP Lab Batch-I SW-IV Lab (VS)',]
  
  
  const [totalClasses,setTotalClasses] = useState(0)
  const [attendedClasses,setAttendedClasses] = useState(0)
   const [attended, setAttended] = useState({
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
  const [total,setTotal] = useState(new Array(9).fill(0))
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
  const p = ({idx})=>{
  let x=0
  if(attended[idx][0]!=0 && total[idx]!=0){
    x=((attended[idx][0]/total[idx])*100).toFixed(2)
  }
  return x
}
useEffect(()=>{
  
     
  
  const calTotal = async()=>{
    try{
    const date = new Date();
    const startDate = new Date('2025-07-28')
    let t=0
    const diff = parseInt((date-startDate)/(1000 * 60 * 60 * 24))
    let tclasses =  new Array(9).fill(0)
    for(let i = 0;i<=diff;i++){
      let d = new Date('2025-07-28')
      d.setDate(startDate.getDate()+i)
      const day = d.getDay();
      if(day!=0 && day!=6){
        t+=schedule[day-1].length
        console.log("date:")
        console.log(d.getDate())
        schedule[day-1].map((item,idx)=>(
          tclasses[getIdx(item)]+=1
        ))
      }
    }
    console.log(t)
    await setTotal(tclasses)
    await setTotalClasses(t)
  let val = await retrieve('attended')
  if(val){
  val = JSON.parse(val)
  console.log(val)
  setAttended(val)
  let x =0;
  for(const key in val){
    x+=val[key][0]
  }
  console.log(x)
  setAttendedClasses(x)
  }
  }
  catch(err){
    console.log(err)
  }
}
  calTotal();
},[])
return(
  <ScrollView>
  <View style={styles.container}>
  <Text style={styles.txt}>Total Classes: {totalClasses}</Text>
  <Text style={styles.txt}>Attended Classes: {attendedClasses}</Text>
  <Text style={styles.txt}>Attendance: {totalClasses > 0 
      ? ((attendedClasses/totalClasses)*100).toFixed(2) 
      : '0.00'}%</Text>
   <DataTable >
            <DataTable.Header>
              <DataTable.Title style={{ flex:3, justifyContent: 'center'}} textStyle={{fontWeight:'bold',fontSize:14 }}>Subject</DataTable.Title>
              <DataTable.Title style={{ flex:2, justifyContent: 'center' }} textStyle={{fontWeight:'bold',fontSize:14 }}>Attended</DataTable.Title>
              <DataTable.Title style={{ flex:1, justifyContent: 'center' }} textStyle={{fontWeight:'bold',fontSize:14 }}>Total</DataTable.Title>
              <DataTable.Title style={{ flex:1, justifyContent: 'center' }} textStyle={{fontWeight:'bold',fontSize:14 }}>P</DataTable.Title>
            </DataTable.Header>
           {Sub.map((item,idx)=>(
            <DataTable.Row key={idx}>
                <DataTable.Cell style={{ flex:3, justifyContent: 'center' }}>{item}</DataTable.Cell>
                <DataTable.Cell style={{ flex:2,justifyContent: 'center' }}>{attended[idx][0]}</DataTable.Cell>
                <DataTable.Cell style={{ flex:1,justifyContent: 'center' }}>{total[idx]}</DataTable.Cell>
                <DataTable.Cell style={{ flex:1,justifyContent: 'center' }} >{p({idx})}{'%'}</DataTable.Cell>
            </DataTable.Row>
           ))}
   
          </DataTable >
          <Pressable style={styles.btn} onPress={()=>{navigation.navigate('Edit')}}><Text>Edit Attendance</Text></Pressable>
  </View>
  </ScrollView>
)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    margin:5
    
  },
  txt: {
    margin:10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  box:{
    flexDirection: 'row',
    width:'100%',
    justifyContent:'space-between',
    margin:10,
    paddingLeft:10,
    paddingRight:20,
  },
   box2:{
    flexDirection: 'row',
    width:'100%',
    margin:10,

  },
  btn:{
    height:50,
    width:150,
    backgroundColor:'#6ecaf5',
    color:'white',
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius:50,
    borderWidth:1,
    margin:10,
    padding:10,   
  },
})
