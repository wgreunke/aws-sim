import { Image, StyleSheet, Platform, View, Text, Button, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useReducer } from 'react';
import { Dropdown } from 'react-native-element-dropdown';


import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


// Add AMI options
const AMI_Options = [
  "Amazon Linux 2023",
  "Amazon Linux 2",
  "Ubuntu Server 22.04 LTS",
  "Ubuntu Server 20.04 LTS",
  "Red Hat Enterprise Linux 9",
  "Windows Server 2022",
];

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

// Define action types for better TypeScript support
type ActionType =
  | { type: 'START_CREATE' }
  | { type: 'START_EDIT'; payload: EC2Instance }
  | { type: 'UPDATE_FORM'; field: string; value: string }
  | { type: 'SUBMIT_CREATE' }
  | { type: 'SUBMIT_UPDATE' }
  | { type: 'RETURN_TO_LIST' };

// Define the state interface
interface EC2Instance {
  id: number;
  name: string;
  ami: string;
  instanceType: string;
  availabilityZone: string;
  instanceStatus: string;
}

interface State {
  instances: EC2Instance[];
  mode: 'ShowList' | 'create' | 'edit';
  currentInstance: EC2Instance | null;
  formData: Omit<EC2Instance, 'id'>;
}

const initialState: State = {
  instances: [{
    id: 1,
    name: 'EC2 Instance 1',
    ami: 'Linux 2023',
    instanceType: 't2.nano',
    availabilityZone: 'us-east-1a',
    instanceStatus: 'Running',
  }],
  mode: 'ShowList',
  currentInstance: null,
  formData: {
    name: '',
    ami: '',
    instanceType: '',
    availabilityZone: '',
    instanceStatus: '',
  }
};

const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case 'START_CREATE':
      return {
        ...state,
        mode: 'create',
        formData: initialState.formData,
        currentInstance: null
      };

    case 'START_EDIT':
      return {
        ...state,
        mode: 'edit',
        currentInstance: action.payload,
        formData: {
          name: action.payload.name,
          ami: action.payload.ami,
          instanceType: action.payload.instanceType,
          availabilityZone: action.payload.availabilityZone,
          instanceStatus: action.payload.instanceStatus,
        }
      };

    case 'UPDATE_FORM':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value
        }
      };

    case 'SUBMIT_CREATE':
      const newInstance = {
        id: state.instances.length + 1,
        ...state.formData
      };
      return {
        ...state,
        instances: [...state.instances, newInstance],
        mode: 'ShowList',
        formData: initialState.formData
      };

    case 'SUBMIT_UPDATE':
      const updatedInstances = state.instances.map(instance =>
        instance.id === state.currentInstance?.id
          ? { ...instance, ...state.formData }
          : instance
      );
      return {
        ...state,
        instances: updatedInstances,
        mode: 'ShowList',
        currentInstance: null,
        formData: initialState.formData
      };

    case 'RETURN_TO_LIST':
      return {
        ...state,
        mode: 'ShowList',
        currentInstance: null,
        formData: initialState.formData
      };

    default:
      return state;
  }
};

const EC2Component = ({ Availability_Zone_Options }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFormChange = (field: string, value: string) => {
    dispatch({ type: 'UPDATE_FORM', field, value });
  };

  const handleSubmit = () => {
    if (state.mode === 'create') {
      dispatch({ type: 'SUBMIT_CREATE' });
    } else {
      dispatch({ type: 'SUBMIT_UPDATE' });
    }
  };

  return (
    <View style={styles.componentBox}>
      <Text style={styles.heading}>Active EC2 Instances</Text>
      
      {/* Instance List */}
      {state.mode === 'ShowList' && (
        <>
          {state.instances.map((instance) => (
            <View key={instance.id}>
              <Text style={{fontWeight: 'bold'}}>{instance.name}</Text><TouchableOpacity 
                onPress={() => dispatch({ type: 'START_EDIT', payload: instance })}
              >
                <Text style={styles.linkText}>Edit</Text>
              </TouchableOpacity>
              <Text>{instance.ami}</Text>
              <Text>{instance.instanceType}</Text>
              <Text>{instance.availabilityZone}</Text>
              <Text>{instance.instanceStatus}</Text>
              
              <Text>------</Text>
            </View>
          ))}
          <Button 
            title="New EC2 Instance" 
            onPress={() => dispatch({ type: 'START_CREATE' })} 
          />
        </>
      )}

      {/* Form */}
      {(state.mode === 'create' || state.mode === 'edit') && (
        <>
          <Text style={styles.heading}>Crud Mode {state.mode}</Text>
          <TextInput
            value={state.formData.name}
            onChangeText={(text) => handleFormChange('name', text)}
            style={{ borderWidth: 1, padding: 8, marginVertical: 8 }}
            placeholder="Enter EC2 instance name"
          />
          
          {/* AMI Dropdown */}
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
            value={state.formData.ami}
            onChange={item => handleFormChange('ami', item.value)}
          />

          {/* Instance Type Dropdown */}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={[
              { label: 't2.nano', value: 't2.nano' },
              { label: 't2.micro', value: 't2.micro' },
              { label: 't2.small', value: 't2.small' },
              { label: 't2.medium', value: 't2.medium' },
            ]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Instance Type"
            value={state.formData.instanceType}
            onChange={item => handleFormChange('instanceType', item.value)}
          />

          {/* Availability Zone Dropdown */}
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
            placeholder="Select Availability Zone"
            value={state.formData.availabilityZone}
            onChange={item => handleFormChange('availabilityZone', item.value)}
          />

          {/* Instance Status Dropdown */}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={[
              { label: 'Running', value: 'Running' },
              { label: 'Stopped', value: 'Stopped' },
              { label: 'Terminated', value: 'Terminated' },
            ]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Instance Status"
            value={state.formData.instanceStatus}
            onChange={item => handleFormChange('instanceStatus', item.value)}
          />

          <Button 
            title={state.mode === 'create' ? "Save EC2 Instance" : "Update EC2 Instance"} 
            onPress={handleSubmit}
          />
          <Button 
            title="Cancel" 
            onPress={() => dispatch({ type: 'RETURN_TO_LIST' })}
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
    height: 178,g
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
  linkText: {
    color: '#007AFF',  // iOS blue color
    textDecorationLine: 'underline',
  },
});