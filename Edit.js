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

  export default function Edit(){
    const Sub =  ['AI&ML (YVSP)','SE (PTF)','DM (MAH)','NTC (AG)','WP (VS)','DBMS (CKR)',
        'AI&ML Lab Lab (AG)','DBMS Lab Batch-I SW-II Lab (VBN) / WP Lab Batch-II SW-IV Lab (VS)',
        'DBMS Lab Batch-II SW-II Lab (VBN) / WP Lab Batch-I SW-IV Lab (VS)',]
    return(
        <View>
            <Text>Edit</Text>
            {Sub.map((item,idx) => (
                <View>
                    <Text>{item}</Text>
                    <TextInput placeholder='100'></TextInput>
                </View>
            ))}
        </View>
    )
  }