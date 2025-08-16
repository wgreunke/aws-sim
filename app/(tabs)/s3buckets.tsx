//S3 Bucket
//This file mimics the S3 Bucket
 
//Start by listing all running buckets
 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as DocumentPicker from 'expo-document-picker';

// Sample S3 bucket data structure
const sampleBuckets = {
    bucket1: {
        name: "my-documents-bucket",
        region: "us-east-1",
        creationDate: "2024-01-15",
        size: "2.5 GB",
        objects: 150,
        description: "Storage for personal documents and files",
        uploadedFiles: []
    },
    bucket2: {
        name: "website-assets-bucket",
        region: "us-west-2", 
        creationDate: "2024-02-20",
        size: "1.8 GB",
        objects: 89,
        description: "Static assets for website hosting",
        uploadedFiles: []
    }
};

const S3BucketInstance = ({ bucket, bucketKey, onFileUpload }: { bucket: any, bucketKey: string, onFileUpload: (bucketKey: string, file: any) => void }) => {
    const handleUpload = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*', // Allow all file types
                copyToCacheDirectory: true,
            });

            if (result.canceled === false) {
                const file = result.assets[0];
                onFileUpload(bucketKey, file);
                Alert.alert('Success', `File "${file.name}" uploaded successfully!`);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to upload file');
            console.error('Upload error:', error);
        }
    };

    return (
        <View style={styles.bucketContainer}>
            <Text style={styles.bucketName}>{bucket.name}</Text>
            <Text><Text style={styles.label}>Region: </Text>{bucket.region}</Text>
            <Text><Text style={styles.label}>Created: </Text>{bucket.creationDate}</Text>
            <Text><Text style={styles.label}>Size: </Text>{bucket.size}</Text>
            <Text><Text style={styles.label}>Objects: </Text>{bucket.objects}</Text>
            <Text><Text style={styles.label}>Description: </Text>{bucket.description}</Text>
            
            <Button title="Add Object" onPress={handleUpload} />
            
            {/* Display uploaded files */}
            {bucket.uploadedFiles && bucket.uploadedFiles.length > 0 && (
                <View style={styles.filesContainer}>
                    <Text style={styles.filesTitle}>Uploaded Files:</Text>
                    {bucket.uploadedFiles.map((file: any, index: number) => (
                        <View key={index} style={styles.fileItem}>
                            <Text style={styles.fileName}>📄 {file.name}</Text>
                            <Text style={styles.fileSize}>Size: {file.size} bytes</Text>
                            <Text style={styles.fileType}>Type: {file.mimeType}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

//****************************** Main Component ****************************** */

const S3BucketInstances = () => {
    const [buckets, setBuckets] = useState(sampleBuckets);
    const [selectedBucket, setSelectedBucket] = useState<string | null>(null);

    useEffect(() => {
        // On startup, the buckets are already initialized with sample data
        console.log('S3 Buckets loaded:', Object.keys(buckets));
    }, []);

    const handleFileUpload = (bucketKey: string, file: any) => {
        setBuckets(prevBuckets => ({
            ...prevBuckets,
            [bucketKey]: {
                ...prevBuckets[bucketKey as keyof typeof prevBuckets],
                uploadedFiles: [
                    ...prevBuckets[bucketKey as keyof typeof prevBuckets].uploadedFiles,
                    file
                ],
                objects: prevBuckets[bucketKey as keyof typeof prevBuckets].objects + 1
            }
        }));
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>S3 Bucket Instances</Text>
            
            {/* List of bucket names */}
            {Object.keys(buckets).map((key) => (
                <View key={key} style={styles.bucketListItem}>
                    <Text 
                        onPress={() => setSelectedBucket(key)} 
                        style={styles.bucketLink}
                    >
                        {buckets[key as keyof typeof buckets].name}
                    </Text>
                </View>
            ))}
            
            {/* Display selected bucket details */}
            {selectedBucket && (
                <S3BucketInstance 
                    bucket={buckets[selectedBucket as keyof typeof buckets]} 
                    bucketKey={selectedBucket}
                    onFileUpload={handleFileUpload}
                />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginTop: 60,
        marginBottom: 50,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 15,
    },
    bucketListItem: {
        width: 300,
        marginVertical: 5,
    },
    bucketLink: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontSize: 16,
    },
    bucketContainer: {
        borderWidth: 2,
        borderColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: '#f8f9fa',
    },
    bucketName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
        color: '#007BFF',
    },
    label: {
        fontWeight: 'bold',
    },
    filesContainer: {
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    filesTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 10,
        color: '#333',
    },
    fileItem: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    fileName: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#007BFF',
    },
    fileSize: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    fileType: {
        fontSize: 12,
        color: '#666',
    },
});

// Add export default
export default S3BucketInstances;

