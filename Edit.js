import {
  button,
  Text,
  CheckBox,
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect  } from 'react';
import { DataTable } from 'react-native-paper';

export default function Edit({navigation}){
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
  let t = new Array(9).fill(0);
  let a = new Array(9).fill(0);
  const add = async (key, item) => {
    try {
      await AsyncStorage.setItem(key, item);
    } catch (err) {
      console.log(err);
    }
  };
   const handleAttendance = (val,idx) => {
    try{
      console.log(val)
      if(val.length!=0){
        val=val.trim()
        a = [...attended]
        a[idx] = parseInt(val)
        setAttended(a)
        console.log(a)
      }
   
    }
  
  catch(err){
    console.log("Error")
    console.log(err)
  }
  };
  const handleTotal = (val,idx) => {
    try{
     if(val.length!=0){
        val=val.trim()
        t = [...total]
        t[idx] = parseInt(val)
        setTotal(t)
        console.log(t)
      }
    }
  
  catch(err){
    console.log(err)
  }
  };
 const submit = async()=>{
  try{
    await add('total',JSON.stringify(total))
    await add('attended',JSON.stringify(attended))
    console.log("edited")
    console.log(total)
    console.log(attended)
    navigation.navigate('Home')
  }
  catch(err){
    console.log(err)
  }
 }

  const retrieve = async (key) => {
    try {
      let val = await AsyncStorage.getItem(key);
      return (val)
    } catch (err) {
      console.log(err);
    }
  };
useEffect(()=>{
  const calTotal = async()=>{
    try{
    let t=0
    let tclasses = await retrieve('total')
    tclasses = JSON.parse(tclasses)
    await setTotal(tclasses)
    await setTotalClasses(t)
  let val = await retrieve('attended')
  console.log(tclasses)
  console.log(val)
  if(val){
  val = JSON.parse(val)
  setAttended(val)
  let x =0;
  for(const key in val){
    x+=val[key]
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
   <DataTable >
            <DataTable.Header>
              <DataTable.Title style={{ flex:3, justifyContent: 'center'}} textStyle={{fontWeight:'bold',fontSize:14 }}>Subject</DataTable.Title>
              <DataTable.Title style={{ flex:2, justifyContent: 'center' }} textStyle={{fontWeight:'bold',fontSize:14 }}>Attended</DataTable.Title>
              <DataTable.Title style={{ flex:1, justifyContent: 'center' }} textStyle={{fontWeight:'bold',fontSize:14 }}>Total</DataTable.Title>
            </DataTable.Header>
           {Sub.map((item,idx)=>(
            <DataTable.Row key={idx}>
                <DataTable.Cell style={{ flex:3, justifyContent: 'center' }}>{item}</DataTable.Cell>
                <DataTable.Cell style={styles.inp}><TextInput keyboardType='numeric' onChangeText={(x)=>{handleAttendance(x,idx)}} value={String(attended[idx])}></TextInput></DataTable.Cell>
                <DataTable.Cell style={styles.inp}><TextInput keyboardType='numeric' value={String(total[idx])} onChangeText={(y)=>{handleTotal(y,idx)}} defaultValue={String(total[idx])}></TextInput></DataTable.Cell>
            </DataTable.Row>
           ))}
   
          </DataTable >
          <Pressable style={styles.btn} onPress={()=>{submit()}}><Text style={styles.btnTxt}>Edit Attendance</Text></Pressable>
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
    marginLeft:'auto',
    marginRight:'auto',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50,
    borderWidth:0,
    margin:10,
    padding:10,   
  },
  inp:{
    flex:1,
    justifyContent: 'center',
    borderWidth:1, 
    borderRadius:10,
    margin:5,
  },
  btnTxt:{
    color:'white',
    fontWeight:'bold',
    fontFamily:'Roboto',
  }
})
