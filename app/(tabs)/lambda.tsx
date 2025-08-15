//This is the lamda tab
//The user can create a lamda function and see the list of lamda functions

import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';



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
        description: "This python function multiplies two numbers.",
        
        runtime: "python3.13",
        testJson: testJson,
        code: `
        #Python
        def lambda_handler(event, context):
    
    #Throw error if json file is not in the correct format.
    try:
        #Read the event file and see if it is valid json
        json_input = event
    except:
        print("Error: Not a valid json file")
    

    #Convert the nums to float to allow math.
    num_a = float(event['num_a'])   
    num_b = float(event['num_b'])    
    num_c=num_a*num_b

    print("Print statements are printed to the log. ")
    print("num_c is: ", num_c)

    #Return statements are shown in the council
    return event["string_s"]

    # New code to be added
    # Additional processing or logic can be added here
    # For example, logging the input values
    print("Input values are: ", event['num_a'], event['num_b'])`



    },
         lamdaFunction2: {
         name: "Javascript Lambda Function",
         description: "This javascript function returns the length of a string.",
         runtime: "javascript",
         testJson: testJson,
         code: `
         //Javascript
         exports.handler = async (event) => {
             // Expecting event to have a field 'inputString'
             const inputString = event.inputString || "";

             const length = inputString.length;

             return {
                 statusCode: 200,
                 body: JSON.stringify({
                     length: length
                 }),
             };
         };`
     },
     
}

//The lamda function is hardcoded and just shown the the user. 
//There is a function in python and a function in javascript.
// It looks like pytyon but javascript is doing s
//The user will not be able to edit the lamda function.
//When you test the lamda function, take in the input json text and output the results.
const testLamdaFunction = (lamdaLanguage: string, InputJson: any) => {

if (lamdaLanguage == "python3.13") {

    //Python code just adds two numbers.
    let num_c = InputJson.num_a * InputJson.num_b;
    let console_output = "num_c is: " + num_c;

    return (
        <View>
            <Text style={{ fontWeight: 'bold' }}>Console Output:<Text style={{ fontWeight: 'normal' }}> {console_output}</Text></Text>
            <Text style={{ fontWeight: 'bold' }}>Log Output: <Text style={{ fontWeight: 'normal' }}>{InputJson.string_s} , {num_c}</Text></Text>
        </View>
    );
}
else if (lamdaLanguage == "javascript") {
 
    //Javascript code returns the length of the string.
    let num_c = InputJson.string_s.length;
    let console_output = "The length of num_c is: " + num_c;
 
    return (
        <View>
            <Text style={{ fontWeight: 'bold' }}>Console Output:<Text style={{ fontWeight: 'normal' }}> {console_output}</Text></Text>
            <Text style={{ fontWeight: 'bold' }}>Log Output: <Text style={{ fontWeight: 'normal' }}>{InputJson.string_s} , {num_c}</Text></Text>
        </View>
    );
}

}; // Add missing closing brace for testLamdaFunction




//This is a component for an individual lamda function
//It shows the name, description, code, and testJson
//It also has a button to run the lamda function
//It also has a button to delete the lamda function 
const LamdaFunctionInstance = ({ lamdaFunction, editTestScript }: { lamdaFunction: any, editTestScript: (name: string) => void }) => {
    const [testOutput, setTestOutput] = useState<JSX.Element | null>(null); // State to hold the output
    const [testJson, setTestJson] = useState(lamdaFunction.testJson); // Added state for testJson
    const [jsonText, setJsonText] = useState(JSON.stringify(lamdaFunction.testJson, null, 2)); // State for the text input

    const handleTest = () => {
        const result = testLamdaFunction(lamdaFunction.runtime, testJson); // Use testJson here
        setTestOutput(result); // Update the output state with the result
    };

    // Define the editTestScript function
    const handleEditTestScript = () => {
        // Logic for editing the test script can be added here
        console.log(`Editing test script for: ${lamdaFunction.name}`);
    };

    return (
        <View style={styles.functionContainer}>
            <Text>{'\n'}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Function Name: </Text>{lamdaFunction.name}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Description: </Text>{lamdaFunction.description}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Runtime: </Text>{lamdaFunction.runtime}</Text>
            <Text>{'\n'}</Text>
            <Text style={{ fontWeight: 'bold' }}>Function Code</Text>
            <View style={styles.codeBlock}>
                <Text style={{ fontFamily: 'monospace' }}>{lamdaFunction.code}</Text>
            </View>
   
            <Text style={{ fontWeight: 'bold' }}>Input Json</Text>


            <TextInput 
                value={jsonText}
                onChangeText={(text) => {
                    setJsonText(text); // Allow free typing
                    try {
                        const parsed = JSON.parse(text);
                        setTestJson(parsed); // Only update testJson if valid JSON
                    } catch (error) {
                        // Don't update testJson if JSON is invalid, but allow typing to continue
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
   
   
            <Text>{'\n'}</Text>
            <Button title="Test Json Input" onPress={handleTest} /> {/* Call handleTest on button press */}
            {testOutput} {/* Display the testoutput here */}
            
   
        </View>
    )
}

//****************************** Main Function ****************************** */

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
                        {lamdaFunctionList[key as keyof typeof lamdaFunctionList].name}
                    </Text>
                </View>
            ))}
        
            {selectedFunction && ( // Conditionally render the selected LamdaFunctionInstance
                <LamdaFunctionInstance lamdaFunction={lamdaFunctionList[selectedFunction as keyof typeof lamdaFunctionList]} editTestScript={() => {}} />
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
    functionContainer: {
        borderWidth: 2, // Border width
        borderColor: '#007BFF', // Blue border color
        padding: 15, // Padding inside the border
        borderRadius: 10, // Rounded corners
        marginVertical: 10, // Space above and below
        backgroundColor: '#f8f9fa', // Light background color
    },
});


