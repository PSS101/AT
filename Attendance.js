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
   const [attended, setAttended] = useState( new Array(9).fill(0));
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
  const p = (idx)=>{
  let x=0
  if(attended[idx]!=0 && total[idx]!=0){
    x=((attended[idx]/total[idx])*100).toFixed(2)
  }
  return x
}
useEffect(()=>{
  
     
  
  const calTotal = async()=>{
    try{
    let t=0
    let tclasses = await retrieve('total')
    tclasses = JSON.parse(tclasses)
    tclasses.map((item,idx)=>(
      t+=item
    ))
    await setTotal(tclasses)
    await setTotalClasses(t)
  let val = await retrieve('attended')
  if(val){
  val = JSON.parse(val)
  setAttended(val)
  let x =0;
  for(const key in val){
    x+=val[key]
  }
  console.log('att')
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
              <DataTable.Title style={{ flex:1, justifyContent: 'center' }} textStyle={{fontWeight:'bold',fontSize:14 }}>Attended</DataTable.Title>
              <DataTable.Title style={{ flex:1, justifyContent: 'center' }} textStyle={{fontWeight:'bold',fontSize:14 }}>Total</DataTable.Title>
              <DataTable.Title style={{ flex:1, justifyContent: 'center' }} textStyle={{fontWeight:'bold',fontSize:14 }}>P</DataTable.Title>
            </DataTable.Header>
           {Sub.map((item,idx)=>(
            <DataTable.Row key={idx}>
                <DataTable.Cell style={{ flex:3, justifyContent: 'center' }}>{item}</DataTable.Cell>
                <DataTable.Cell style={{ flex:1,justifyContent: 'center' }}>{attended[idx]}</DataTable.Cell>
                <DataTable.Cell style={{ flex:1,justifyContent: 'center' }}>{total[idx]}</DataTable.Cell>
                <DataTable.Cell style={{ flex:1,justifyContent: 'center' }} >{p(idx)}{'%'}</DataTable.Cell>
            </DataTable.Row>
           ))}
   
          </DataTable >
          <Pressable style={styles.btn} onPress={()=>{navigation.navigate('Edit')}}><Text style={styles.btnTxt}>Edit Attendance</Text></Pressable>
          <Text style={styles.watermark}>©PSS</Text>
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
    justifyContent: 'center', 
    alignItems: 'center', 
    margin:10,
    marginLeft:'auto',
    marginRight:'auto',
    padding:10,   
    borderRadius:50,
    borderWidth:0,
  },
  btnTxt:{
    color:'white',
    fontWeight:'bold',
    fontFamily:'Roboto',
  },
   watermark: {
    marginRight:'auto',
    
    right: 10,
    fontSize: 20,
    color: 'rgba(0, 0, 0, 0.15)', // light, transparent text
    fontWeight: 'bold',
    zIndex: 9999, // make sure it's on top
  }
})
