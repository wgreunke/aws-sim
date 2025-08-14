//This is the lamda tab
//The user can create a lamda function and see the list of lamda functions

import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
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
        name: "Python Lambda Function",
        description: "This python script multiplies two numbers.",
        code: sampleLamdaFunction.code,
        runtime: "python3.13",
        testJson: testJson
    },
    lamdaFunction2: {
        name: "Javascript Lambda Function",
        description: "This javascript script returns the length of a string.",
        code: sampleLamdaFunction.code,
        runtime: "python3.13",
        testJson: testJson
    },
    lamdaFunction3: {
        name: "Lamda Function 3",
        description: "This is the third lamda function",
        code: sampleLamdaFunction.code,
        runtime: "Node.js 22.x",
        testJson: testJson
    }
}

//The lamda function is hardcoded and just shown the the user.  
// It looks like pytyon but javascript is doing s
//The user will not be able to edit the lamda function.
//When you test the lamda function, take in the json and
//The input to the lamda function is the testJson
const testLamdaFunction = (lamdaFunction: string, testJson: any) => {

    //This is the code that will be run
    let num_c = testJson.num_a + testJson.num_b;
    let console_output = "num_c is: " + num_c;

    return (
        <View>
            <Text style={{ fontWeight: 'bold' }}>Console Output:<Text style={{ fontWeight: 'normal' }}> {console_output}</Text></Text>
            <Text style={{ fontWeight: 'bold' }}>Log Output: <Text style={{ fontWeight: 'normal' }}>{testJson.string_s} , {num_c}</Text></Text>
        </View>
    );
}



//This is a component for an individual lamda function
//It shows the name, description, code, and testJson
//It also has a button to run the lamda function
//It also has a button to delete the lamda function 
const LamdaFunctionInstance = ({ lamdaFunction, editTestScript }: { lamdaFunction: any, editTestScript: (name: string) => void }) => {
    const [testOutput, setTestOutput] = useState<JSX.Element | null>(null); // State to hold the output
    const [testJson, setTestJson] = useState(lamdaFunction.testJson); // Added state for testJson

    const handleTest = () => {
        const result = testLamdaFunction(lamdaFunction.code, testJson); // Use testJson here
        setTestOutput(result); // Update the output state with the result
    };

    // Define the editTestScript function
    const handleEditTestScript = () => {
        // Logic for editing the test script can be added here
        console.log(`Editing test script for: ${lamdaFunction.name}`);
    };

    return (
        <View>
            <Text>{lamdaFunction.name}</Text>
            <Text>{lamdaFunction.description}</Text>
            <Text>{lamdaFunction.runtime}</Text>
            <Text style={{ fontWeight: 'bold' }}>Code</Text>
            <View style={styles.codeBlock}>
                <Text style={{ fontFamily: 'monospace' }}>{lamdaFunction.code}</Text>
            </View>
   
            <Text style={{ fontWeight: 'bold' }}>Input Json</Text>


            <TextInput 
                
                value={JSON.stringify(lamdaFunction.testJson, null, 2)}
                onChangeText={(text) => {
                    try {
                        setTestJson(JSON.parse(text)); // Attempt to parse the input text
                    } catch (error) {
                        console.error("Invalid JSON input:", error); // Log the error for debugging
                    }
                }} 
                multiline={true}
                editable={true}
                style={{ 
                    marginVertical: 10, // Existing margin
                    borderWidth: 1, // Added border width
                    borderColor: '#000', // Added border color
                    padding: 5, // Added padding for better text visibility
                    borderRadius: 5, // Added rounded corners
                    height: 120, // Set height to make the box taller
                }} 
            />
            
            <Text>{'\n'}</Text>
   
   
            <Text style={{ fontWeight: 'bold' }}>Test</Text>
            <Text>{'\n'}</Text>
            <Button title="Test" onPress={handleTest} /> {/* Call handleTest on button press */}
            {testOutput} {/* Display the testoutput here */}
            <Text>.</Text>
   
        </View>
    )
}



//This shows the list of lamda functions the user has created
export default function LamdaViewer() {
    const [selectedFunction, setSelectedFunction] = useState<string | null>(null); // State to hold the selected function

    return (
        <ScrollView style={{ margin: 10, marginTop: 60, marginBottom: 50 }}>
            <Text style={{ fontWeight: 'bold' }}>Lamda Functions</Text>
            {/* Just show a list of lamda functions */}
            {Object.keys(lamdaFunctionList).map((key) => (
                <View style={{ width: 300 }} key={key}>
                    <Text onPress={() => setSelectedFunction(key)} style={{ color: 'blue', textDecorationLine: 'underline' }}>
                        {lamdaFunctionList[key].name}
                    </Text>
                </View>
            ))}
            <Button title="Create New Lamda Function" onPress={() => createNewLamdaFunction()} />

            {selectedFunction && ( // Conditionally render the selected LamdaFunctionInstance
                <LamdaFunctionInstance lamdaFunction={lamdaFunctionList[selectedFunction]} editTestScript={() => {}} />
            )}
        </ScrollView>
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


