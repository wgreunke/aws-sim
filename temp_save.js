import { Image, StyleSheet, Platform, View, Text, Button, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';


import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


//This is the list of availability zones that will be used for different objects.
const Availability_Zone_Options = [
  "us-east-1a",
  "us-east-1b",
  "us-east-1c",
  "us-east-1d",
  "us-west-1a",
  "us-west-1b",
  "us-west-1c",
  
];

const EC2Component = ({ Availability_Zone_Options }) => {
  //Define the possible options for the EC2
  const AMI_Options = [
    "Linux 2023",
    "Windows 2022",
    "macOS 14",
    "Microsoft Windows Server 2022",
    ];
    
    const Instance_Type_Options = [
    "t2.nano",
    "t2.micro",
    "t2.small",
    "t2.medium",
    "t2.large",
    "t3.nano",
    ];
    
    const VPC_Options = [
    "VPC",
    "Subnet",
    "Internet Gateway",
    "Route Table",
    "Security Group",
    ];
    
    const Subnet_Options = [
    "Public Subnet",
    "Private Subnet",
    "VPC Subnet",
    "Subnet Group",
    "Subnet Route Table",
    ];



//These are the list of EC2 instances that have been created
//Start with a dummy value to check the code.    
const [ec2_instances, setEc2_instances] = useState([
  {
    id: 1,
    name: 'EC2 Instance 1',
    ami: 'Linux 2023',
    instanceType: 't2.nano',
    availabilityZone: 'us-east-1a',
  },
]);


  // Add state management
  //This helps to manage the CRUD mode
  const [crudMode, setCrudMode] = useState('ShowList')
  
  const [selectedAMI, setSelectedAMI] = useState('');
  const [selectedInstanceType, setSelectedInstanceType] = useState('');
  const [selectedAvailabilityZone, setSelectedAvailabilityZone] = useState('');
  const [selectedName, setSelectedName] = useState('');  


  //When the button is pressed, create a new EC2 instance
  const createEC2Instance = () => {
    const newInstance = {
      id: ec2_instances.length + 1,
      name: selectedName,
      ami: selectedAMI,
      instanceType: selectedInstanceType,
      availabilityZone: selectedAvailabilityZone,
    };
    setEc2_instances([...ec2_instances, newInstance]);
    setCrudMode('ShowList');
    //After the instance is created, clear the name
    setSelectedName('');
  };


  return (
    <View style={styles.componentBox}>
      <Text style={styles.heading}>Active EC2 Instances</Text>
      {/* Display the list of EC2 instances */}
      {ec2_instances.map((instance) => (
        <View key={instance.id}>
        <Text>{instance.name}</Text>
        <Text>{instance.ami}</Text>
        <Text>{instance.instanceType}</Text>
        <Text>{instance.availabilityZone}</Text>
        <Text>------</Text>
        </View>
      ))}
      {/* Only show the button if the edit mode is showlist */}
       {crudMode === 'ShowList' && <Button title="New EC2 Instance" onPress={() => setCrudMode('create')} />}
      
       {/* If edit mode is true, show the edit mode */}
       {crudMode === 'create' && (
       <>
       <Text style={styles.heading}>Crud Mode {crudMode}</Text>
       <Text>Name your EC2 instance</Text>
       <TextInput
          value={selectedName}
          onChangeText={(text) => setSelectedName(text)}
          style={{ borderWidth: 1, padding: 8, marginVertical: 8 }}
          placeholder="Enter EC2 instance name"
        />
        <Text>Choose an AMI</Text>
        <Picker
          selectedValue={selectedAMI}
          onValueChange={(value) => setSelectedAMI(value)}
          style={styles.picker}>
          <Picker.Item label="Select an AMI" value="" />
          {AMI_Options.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
        <Text>Choose an Instance Type</Text>
        <Picker
          selectedValue={selectedInstanceType}
          onValueChange={(value) => setSelectedInstanceType(value)}
          style={styles.picker}>
          <Picker.Item label="Select an Instance Type" value="" />
          {Instance_Type_Options.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
        <Text>Choose an Availability Zone</Text>
        <Picker
          selectedValue={selectedAvailabilityZone}
          onValueChange={(value) => setSelectedAvailabilityZone(value)}
          style={styles.picker}>
          <Picker.Item label="Select an Availability Zone" value="" />
          {Availability_Zone_Options.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
        <Button title="Create EC2 Instance" onPress={createEC2Instance} />
        </>
       )}
    </View>
  );
};

// ************* Main Container *************

export default function HomeScreen() {
  return (
    <ScrollView style={{ margin: 10 }}>
      <Text>This is the parent container for the AWS Simulator</Text>
      {/* Button that creates a new EC2 instance */}
      <EC2Component Availability_Zone_Options={Availability_Zone_Options} />
  
    </ScrollView>
  );
}

// ************* Styles *************

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    marginVertical: 10,
  },
  componentBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    margin: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    margin: 10,
  },
});
