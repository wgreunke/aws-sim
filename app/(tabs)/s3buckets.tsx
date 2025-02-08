//S3 Bucket
//This file mimics the S3 Bucket

//Start by listing all running buckets

import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';



//store some sample async data

const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('test async data', "hhello there");
    } catch (e) {
      // saving error
    }
  };


//load the async data
const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('test async data');
      console.log(value);
    } catch (e) {
      // error reading value
    }
  };

const S3BucketInstances = () => {
    const [value, setValue] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('test async data');
            setValue(storedValue);
        } catch (e) {
            // error reading value
        }
    };

    return (
        <View>
            <Text>S3 Bucket Instances</Text>
            <Text>{value}</Text>
        </View>
    );
};

