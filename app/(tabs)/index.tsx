import { Image, StyleSheet, Platform, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
/*
This is an WAS simulator that allows you to practice creating different AWS resources.  
A user can click a button to create a resource.
A user can click a button to edit a resource.
A user can click a button to delete a resource.
A user can click a button to start a resource.
*/



//Use AMI - Amazon Machine Image
//https://docs.aws.amazon.com/pdfs/AWSEC2/latest/UserGuide/ec2-ug.pdf#get-ec2-instance-type-recommendations
//AMI must match architecture.
const EC2_options = [
  {
    images: ['Amazon Linux 2', 'Windows'],
    regions: ['US East (N. Virginia', 'US East (Ohio)'],
    instance_types: ['t2.micro', 't3.micro']
  }
]

const EC2_List = [
  {
    id: '1',
    type: 't2.micro',
    description: 'General purpose, small size, ideal for development and testing',
    cpu: '1 vCPU',
    memory: '1 GB',
    storage: 'EBS-only storage',
    network: '1000 Mbps',
    price: '$0.0135 per hour',
    image: 'Amazon Linux 2',
    region: 'US East (N. Virginia)',
   
  },
  {
    id: '2',
    type: 't2.micro',
    description: 'General purpose, small size, ideal for development and testing',
    cpu: '1 vCPU',
    memory: '1 GB',
    storage: 'EBS-only storage',
    network: '1000 Mbps',
    price: '$0.0135 per hour',
    image: 'Amazon Linux 2',
    region: 'US East (N. Virginia)',
   
  },
];


function EC2({ ec2_instance }) {
  return (
    <View style={styles.ec2Box}>
      <text>Id={ec2_instance.id}</text>
      <text>
        {ec2_instance.type}: {ec2_instance.description} - {ec2_instance.price}
        
      </text>
    </View>
  );
}

function S3() {
  return <text>S3 bucket</text>;
}

function Lambda() {
  return <text>Lambda function</text>;
}

function RDS() {
  return <text>RDS database</text>;
}

function CloudFront() {
  return <text>CloudFront distribution</text>;
}

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>

     
        <ThemedText type="title">This is an AWS Simulator</ThemedText>
        <text>Go ahead a practice creating different AWS resources</text>
        <text>You have the following resources to choose from:</text>
        <text>You have the following resources running</text>
     

      <text>EC2 instances</text>
      {EC2_List.map(ec2_instance => (
        <EC2 key={ec2_instance.id} ec2_instance={ec2_instance} />
      ))}
      
      <text>S3 buckets</text>
      <S3 />
      <Lambda />
      <RDS />
      <CloudFront />
         
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>



      <text>This is some text</text>
      
      </ThemedView>
      


    </ParallaxScrollView>
  );
}

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
  ec2Box: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
});
