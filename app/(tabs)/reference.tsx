//This page is a quick reference for the different AWS services.

import {View,Text} from 'react-native'

export default function Reference() {
    return (
        <View style={{ padding: 16 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>EC2</Text>
            <Text style={{ marginBottom: 24 }}>Amazon EC2 (Elastic Compute Cloud) is a cloud-based service that lets you rent virtual servers—called instances—on demand, so you can run applications without buying and maintaining physical hardware. You choose the instance type (CPU, memory, storage, and networking capacity), operating system, and configuration, and pay only for the time you use it. EC2 is highly scalable—you can quickly launch more instances or shut them down as needed—and integrates with other AWS services for storage, security, and networking. It supports various workloads, from small web apps to large-scale data processing, making it a flexible and cost-efficient way to run computing tasks in the cloud.</Text>
            
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>S3 - Simple Storage Service</Text>
            <Text style={{ marginBottom: 24 }}>Amazon S3 is a cloud-based object storage service that provides secure, durable, and scalable storage for data. It offers high-performance, low-cost storage for a wide range of use cases, including websites, mobile apps, backup and restore, data lakes, and big data analytics. S3 is designed to be highly available and fault-tolerant, with automatic replication and multi-region availability. It supports versioning, lifecycle management, and access control policies, making it a robust solution for storing and managing large amounts of data.</Text>
                 
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Lambda</Text>
            <Text style={{ marginBottom: 24 }}>Amazon Lambda is a serverless computing service that allows you to run code without provisioning or managing servers. You can write code in languages like Python, Node.js, Java, and more, and Lambda will automatically run it in response to events or triggers. It's designed for cost efficiency, scalability, and ease of use, making it ideal for tasks like image processing, data processing, and API backends. Lambda automatically scales based on demand, charges only for the actual compute time, and integrates with other AWS services for storage, database, and security. It's a powerful tool for building event-driven architectures and serverless applications.</Text>
            



        </View>
    








);
}
