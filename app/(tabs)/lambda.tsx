//This is the lamda tab
//The user can create a lamda function and see the list of lamda functions

import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

//Sample lamda function to show in the viewer
const sampleLamdaFunction = {
    name: 'Sample Lamda Function',
    description: 'This is a sample lamda function',
    code: 'def sample_function(): return "Hello, World!"'
}


//This shows the list of lamda functions the user has created
export default function LamdaViewer() {
return (
    <View>
        <Text>Lamda Viewer</Text>
    </View>
)
}


