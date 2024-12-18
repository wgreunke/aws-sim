import { Image, StyleSheet, Platform, View, Text, Button, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';


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
    
    const Instance_Status_Options = [
    "Running",
    "Stopped",
    "Terminated",
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
    instanceStatus: 'Running',
  },
]);


  // Add state management
  //This helps to manage the CRUD mode
  const [crudMode, setCrudMode] = useState('ShowList')
  
  const [selectedAMI, setSelectedAMI] = useState('');
  const [selectedInstanceType, setSelectedInstanceType] = useState('');
  const [selectedAvailabilityZone, setSelectedAvailabilityZone] = useState('');
  const [selectedName, setSelectedName] = useState('');  
  const [selectedInstanceStatus, setSelectedInstanceStatus] = useState('');

  // Add new state for editing
  const [editingInstance, setEditingInstance] = useState(null);

  // Add function to handle edit save
  const updateEC2Instance = () => {
    const updatedInstances = ec2_instances.map(instance => 
      instance.id === editingInstance.id ? {
        ...instance,
        name: selectedName,
        ami: selectedAMI,
        instanceType: selectedInstanceType,
        availabilityZone: selectedAvailabilityZone,
        instanceStatus: selectedInstanceStatus,
      } : instance
    );
    setEc2_instances(updatedInstances);
    setCrudMode('ShowList');
    setEditingInstance(null);
    setSelectedName('');
  };

  // Add function to start editing
  const startEditing = (instance) => {
    setEditingInstance(instance);
    setSelectedName(instance.name);
    setSelectedAMI(instance.ami);
    setSelectedInstanceType(instance.instanceType);
    setSelectedAvailabilityZone(instance.availabilityZone);
    setSelectedInstanceStatus(instance.instanceStatus);
    setCrudMode('edit');
  };

  //When the button is pressed, create a new EC2 instance
  const createEC2Instance = () => {
    const newInstance = {
      id: ec2_instances.length + 1,
      name: selectedName,
      ami: selectedAMI,
      instanceType: selectedInstanceType,
      availabilityZone: selectedAvailabilityZone,
      instanceStatus: selectedInstanceStatus,
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
        <Text style={{fontWeight: 'bold'}}>{instance.name}</Text><Button 
          title="Edit" 
          onPress={() => startEditing(instance)}
        />
        <Text>{instance.ami}</Text>
        <Text>{instance.instanceType}</Text>
        <Text>{instance.availabilityZone}</Text>
        
        <Text>------</Text>
        </View>
      ))}
      {/* Only show the button if the edit mode is showlist */}
       {crudMode === 'ShowList' && <Button title="New EC2 Instance" onPress={() => setCrudMode('create')} />}
      
       {/* If edit mode is true, show the edit mode */
       /* ***************** Create Mode ****************** */}
       {(crudMode === 'create' || crudMode === 'edit') && (
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
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={AMI_Options.map(option => ({
            label: option,
            value: option,
          }))}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select an AMI"
          value={selectedAMI}
          onChange={item => setSelectedAMI(item.value)}
        />
        <Text>Choose an Instance Type</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={Instance_Type_Options.map(option => ({
            label: option,
            value: option,
          }))}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select an Instance Type"
          value={selectedInstanceType}
          onChange={item => setSelectedInstanceType(item.value)}
        />
        <Text>Choose an Availability Zone</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={Availability_Zone_Options.map(option => ({
            label: option,
            value: option,
          }))}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select an Availability Zone"
          value={selectedAvailabilityZone}
          onChange={item => setSelectedAvailabilityZone(item.value)}
        />
        <Text>Choose an Instance Status</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={Instance_Status_Options.map(option=>({
              label: option,
              value: option,
            }))}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select an Instance Status"
          value={selectedInstanceStatus}
          onChange={item => setSelectedInstanceStatus(item.value)}
        />
        <Button 
          title={crudMode === 'create' ? "Save EC2 Instance" : "Update EC2 Instance"} 
          onPress={crudMode === 'create' ? createEC2Instance : updateEC2Instance} 
        />
        </>
       )}
    </View>
  );
};

// ************* Main Container *************

export default function HomeScreen() {
  return (
    <ScrollView style={{ margin: 10, marginTop: 50 }}>
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 6,
    paddingHorizontal: 6,
    marginVertical: 6,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#666',
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  componentBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    margin: 10,
    marginBottom: 50,
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
