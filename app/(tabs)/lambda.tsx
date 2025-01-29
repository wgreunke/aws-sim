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
    code: `def lambda_handler(event, context):
    
    #Throw error if json file is not in the correct format.
    try:
        #Read the event file and see if it is valid json
        json_input = event
    except:
        print("Error: Not a valid json file")
    

    #Convert the nums to float to allow math.
    num_a = float(event['num_a'])   
    num_b = float(event['num_b'])    
    num_c=num_a+num_b

    print("Print statements are printed to the log. ")
    print("num_c is: ", num_c)

    #Return statements are shown in the council
    return event["string_s"]

    # New code to be added
    # Additional processing or logic can be added here
    # For example, logging the input values
    print("Input values are: ", event['num_a'], event['num_b'])`
}

const testJson = {
    num_a: 1,
    num_b: 2,
    string_s: "I Like Lambda Functions"
}

//This is the list of lamda functions the user has created
//For each function, store the name, description, and code, and testJson    
const lamdaFunctionList = {
    lamdaFunction1: {
        name: "Lamda Function 1",
        description: "This is the first lamda function",
        code: sampleLamdaFunction.code,
        testJson: testJson
    },
    lamdaFunction2: {
        name: "Lamda Function 2",
        description: "This is the second lamda function",
        code: sampleLamdaFunction.code,
        testJson: testJson
    },
    lamdaFunction3: {
        name: "Lamda Function 3",
        description: "This is the third lamda function",
        code: sampleLamdaFunction.code,
        testJson: testJson
    }
}

//The lamda function is hardcoded and just shown the the user.  
// It looks like pytyon but javascript is doing s
//The user will not be able to edit the lamda function.
//When you test the lamda function, take in the json and
//The input to the lamda function is the testJson
const testLamdaFunction = (lamdaFunction: string, testJson: any) => {
    console.log(lamdaFunction);
    console.log(testJson);
}



//This is a component for an individual lamda function
//It shows the name, description, code, and testJson
//It also has a button to run the lamda function
//It also has a button to delete the lamda function 
const LamdaFunctionInstance = ({ lamdaFunction }: { lamdaFunction: any }) => {
    return (
        <View>
            <Text>{lamdaFunction.name}</Text>
            <Text>{lamdaFunction.description}</Text>
            <View style={styles.codeBlock}>
                <Text style={{ fontFamily: 'monospace' }}>{lamdaFunction.code}</Text>
            </View>
            <Text>{JSON.stringify(lamdaFunction.testJson)}</Text>
            
            <Button title="Test" onPress={() => testLamdaFunction(lamdaFunction.code, lamdaFunction.testJson)} />
            <Button title="Delete" onPress={() => deleteLamdaFunction(lamdaFunction.name)} />
        </View>
    )
}



//This shows the list of lamda functions the user has created
export default function LamdaViewer() {
return (
    <View style={{ margin: 10 }}>
        <Text>Lamda Viewer</Text>
        {Object.keys(lamdaFunctionList).map((key) => (
            <View>
                <LamdaFunctionInstance lamdaFunction={lamdaFunctionList[key]} />
                 
            </View>
        ))}
    </View>
)
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007BFF', // Blue background
        color: '#FFFFFF', // White text
        padding: 10, // Padding around the text
        borderRadius: 20, // More rounded corners
        marginVertical: 5, // Space between buttons
        width: '80%', // Set a specific width
        alignSelf: 'center', // Center the button
    },
    codeBlock: {
        borderWidth: 1, // Border width
        borderColor: '#000', // Border color
        padding: 10, // Padding inside the border
        borderRadius: 5, // Rounded corners
        marginVertical: 5, // Space above and below
    },
});


