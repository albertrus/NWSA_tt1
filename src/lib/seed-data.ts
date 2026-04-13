export const seedChapters = [
  {
    order: 1,
    title: "Introduction to Message Systems",
    description: "Learn the fundamentals of message systems and protocols.",
    content: `# Introduction to Message Systems

Message systems are fundamental building blocks of modern distributed applications. In this chapter, we will explore the core concepts that underpin message-based communication.

## What is a Message System?

A message system is a software infrastructure that enables asynchronous communication between applications, services, or components. Rather than communicating directly (synchronously), components exchange messages through a shared intermediary.

## Key Concepts

### 1. Message
A message is the basic unit of data exchange. It typically consists of:
- **Header**: Metadata about the message (routing, priority, timestamps)
- **Body**: The actual payload data
- **Properties**: Additional attributes for message processing

### 2. Queue
A queue is a data structure that stores messages in FIFO (First-In, First-Out) order. Messages wait in the queue until a consumer is ready to process them.

### 3. Topic
A topic is a logical channel for publish/subscribe messaging. Multiple consumers can subscribe to receive copies of each message published to a topic.

### 4. Producer
A producer (or publisher) is the component that creates and sends messages to the message system.

### 5. Consumer
A consumer (or subscriber) is the component that receives and processes messages from the message system.

## Benefits of Message Systems

- **Decoupling**: Components do not need to know about each other
- **Scalability**: Easy to add more consumers for load distribution
- **Reliability**: Messages can be persisted and retried
- **Flexibility**: Different communication patterns (point-to-point, pub/sub)

## Summary

Understanding these foundational concepts is essential for the TT1 exam. In the following chapters, we will dive deeper into specific protocols, patterns, and best practices.`,
    quiz: {
      title: "Introduction to Message Systems - Quiz",
      questions: [
        {
          order: 1,
          text: "What is the primary purpose of a message system?",
          options: JSON.stringify([
            "To enable synchronous communication only",
            "To enable asynchronous communication between components",
            "To replace all direct API calls",
            "To store data permanently",
          ]),
          correctAnswer: 1,
          explanation:
            "Message systems primarily enable asynchronous communication between applications and components.",
        },
        {
          order: 2,
          text: "Which data structure does a queue use for message ordering?",
          options: JSON.stringify([
            "LIFO (Last-In, First-Out)",
            "Random order",
            "FIFO (First-In, First-Out)",
            "Priority-based only",
          ]),
          correctAnswer: 2,
          explanation:
            "A queue uses FIFO (First-In, First-Out) ordering — the first message added is the first to be processed.",
        },
        {
          order: 3,
          text: "What is the difference between a Queue and a Topic?",
          options: JSON.stringify([
            "Queues are faster than Topics",
            "Topics support point-to-point, Queues support pub/sub",
            "Queues support point-to-point, Topics support publish/subscribe",
            "There is no difference",
          ]),
          correctAnswer: 2,
          explanation:
            "Queues implement point-to-point messaging (one consumer gets each message), while Topics implement publish/subscribe (multiple subscribers can receive each message).",
        },
        {
          order: 4,
          text: "Which of these is NOT a benefit of message systems?",
          options: JSON.stringify([
            "Decoupling of components",
            "Scalability through adding consumers",
            "Requiring all components to be online simultaneously",
            "Message persistence and retry capability",
          ]),
          correctAnswer: 2,
          explanation:
            "Message systems actually REMOVE the requirement for simultaneous availability — this is one of their key advantages (asynchronous communication).",
        },
        {
          order: 5,
          text: "What does a message Header typically contain?",
          options: JSON.stringify([
            "Only the payload data",
            "Metadata such as routing info, priority, and timestamps",
            "The consumer's address",
            "Database connection strings",
          ]),
          correctAnswer: 1,
          explanation:
            "Message headers contain metadata about the message, such as routing information, priority, and timestamps.",
        },
      ],
    },
  },
  {
    order: 2,
    title: "Message Protocols and Standards",
    description: "Understand the key protocols used in enterprise messaging.",
    content: `# Message Protocols and Standards

In this chapter, we explore the protocols and standards that govern how messages are formatted, transmitted, and processed in enterprise environments.

## AMQP (Advanced Message Queuing Protocol)

AMQP is an open standard application layer protocol for message-oriented middleware. It defines:
- A wire-level protocol for message passing
- Message orientation, queuing, routing, reliability, and security
- Interoperability between different implementations

### AMQP Key Features:
- **Reliability**: At-most-once, at-least-once, exactly-once delivery
- **Security**: Built-in SASL authentication and TLS encryption
- **Flexibility**: Supports multiple messaging patterns

## MQTT (Message Queuing Telemetry Transport)

MQTT is a lightweight publish/subscribe messaging protocol, ideal for IoT and mobile applications.

### MQTT Characteristics:
- **Lightweight**: Minimal bandwidth and battery usage
- **QoS Levels**: 0 (at most once), 1 (at least once), 2 (exactly once)
- **Persistent Sessions**: Support for offline message storage

## JMS (Java Message Service)

JMS is a Java API for message-oriented middleware. It provides:
- A common interface for different messaging providers
- Support for queues and topics
- Transactional message processing

## Message Formats

### JSON
- Human-readable
- Widely supported
- Good for web applications

### XML
- Highly structured
- Schema validation support
- Verbose but well-supported

### Protocol Buffers (Protobuf)
- Binary format (compact)
- Fast serialization/deserialization
- Language-agnostic

## Summary

Understanding these protocols helps you select the right tool for different messaging scenarios. The TT1 exam tests knowledge of protocol differences, use cases, and trade-offs.`,
    quiz: {
      title: "Message Protocols and Standards - Quiz",
      questions: [
        {
          order: 1,
          text: "What does AMQP stand for?",
          options: JSON.stringify([
            "Automated Message Queue Protocol",
            "Advanced Message Queuing Protocol",
            "Application Message Queue Protocol",
            "Asynchronous Message Queue Protocol",
          ]),
          correctAnswer: 1,
          explanation:
            "AMQP stands for Advanced Message Queuing Protocol — an open standard for message-oriented middleware.",
        },
        {
          order: 2,
          text: "Which protocol is best suited for IoT and mobile applications due to its lightweight nature?",
          options: JSON.stringify(["AMQP", "JMS", "MQTT", "SOAP"]),
          correctAnswer: 2,
          explanation:
            "MQTT is designed to be lightweight with minimal bandwidth usage, making it ideal for IoT devices and mobile applications.",
        },
        {
          order: 3,
          text: "What are the three MQTT QoS levels?",
          options: JSON.stringify([
            "Fast, Medium, Slow",
            "Low, Medium, High",
            "0 (at most once), 1 (at least once), 2 (exactly once)",
            "Bronze, Silver, Gold",
          ]),
          correctAnswer: 2,
          explanation:
            "MQTT defines three Quality of Service levels: 0 (at most once), 1 (at least once), and 2 (exactly once).",
        },
        {
          order: 4,
          text: "Which message format uses binary encoding for compact and fast serialization?",
          options: JSON.stringify([
            "JSON",
            "XML",
            "Protocol Buffers (Protobuf)",
            "YAML",
          ]),
          correctAnswer: 2,
          explanation:
            "Protocol Buffers use a binary format, making them more compact and faster to serialize/deserialize compared to text-based formats like JSON or XML.",
        },
        {
          order: 5,
          text: "JMS is primarily associated with which programming language ecosystem?",
          options: JSON.stringify(["Python", "JavaScript", "Java", "C++"]),
          correctAnswer: 2,
          explanation:
            "JMS (Java Message Service) is a Java API specification for message-oriented middleware, primarily used in the Java ecosystem.",
        },
      ],
    },
  },
  {
    order: 3,
    title: "Message Patterns and Architecture",
    description:
      "Explore enterprise integration patterns and messaging architectures.",
    content: `# Message Patterns and Architecture

Enterprise Integration Patterns (EIP) define solutions for common messaging challenges. This chapter covers the most important patterns tested in TT1.

## Core Messaging Patterns

### 1. Point-to-Point (P2P)
In point-to-point messaging, a message is sent to exactly one consumer.
- **Use case**: Task distribution, work queues
- **Example**: Order processing where each order is handled by exactly one worker

### 2. Publish/Subscribe (Pub/Sub)
A message is broadcast to all interested subscribers.
- **Use case**: Event notifications, real-time updates
- **Example**: Price updates sent to all trading terminals

### 3. Request/Reply
A sender expects a response from the receiver.
- **Use case**: Remote procedure calls over messaging
- **Example**: Query a service and receive a result

### 4. Dead Letter Queue (DLQ)
Messages that cannot be processed are routed to a DLQ for inspection.
- **Use case**: Error handling, debugging
- **Importance**: Critical for production reliability

## Enterprise Integration Patterns (EIP)

### Message Router
Routes messages to different channels based on content or rules.

### Message Transformer
Transforms a message from one format to another.

### Message Filter
Removes unwanted messages from the stream.

### Aggregator
Combines multiple related messages into a single message.

### Splitter
Breaks one message into multiple smaller messages.

### Saga Pattern
Manages distributed transactions across multiple services using a sequence of local transactions, each publishing events to trigger the next.

## Architecture Considerations

### Message Broker vs. Peer-to-Peer
- **Message Broker**: Central intermediary (e.g., RabbitMQ, ActiveMQ)
- **Peer-to-Peer**: Direct communication (e.g., ZeroMQ)

### Event-Driven Architecture (EDA)
Components react to events asynchronously. Benefits:
- Loose coupling
- High scalability
- Better fault isolation

## Summary

Mastering these patterns is essential for the TT1 exam. Understand when to apply each pattern and the trade-offs involved.`,
    quiz: {
      title: "Message Patterns and Architecture - Quiz",
      questions: [
        {
          order: 1,
          text: "In which messaging pattern does each message go to exactly one consumer?",
          options: JSON.stringify([
            "Publish/Subscribe",
            "Point-to-Point",
            "Broadcast",
            "Multicast",
          ]),
          correctAnswer: 1,
          explanation:
            "In Point-to-Point (P2P) messaging, each message is consumed by exactly one consumer, making it suitable for task distribution.",
        },
        {
          order: 2,
          text: "What is the purpose of a Dead Letter Queue (DLQ)?",
          options: JSON.stringify([
            "To store all processed messages",
            "To archive old messages",
            "To hold messages that cannot be successfully processed",
            "To prioritize important messages",
          ]),
          correctAnswer: 2,
          explanation:
            "A Dead Letter Queue holds messages that failed processing after multiple attempts, allowing for inspection, debugging, and potential reprocessing.",
        },
        {
          order: 3,
          text: "Which EIP pattern combines multiple related messages into one?",
          options: JSON.stringify([
            "Splitter",
            "Filter",
            "Router",
            "Aggregator",
          ]),
          correctAnswer: 3,
          explanation:
            "The Aggregator pattern collects and combines multiple related messages into a single composite message.",
        },
        {
          order: 4,
          text: "What pattern manages distributed transactions through a sequence of local transactions?",
          options: JSON.stringify([
            "Two-Phase Commit",
            "Saga Pattern",
            "Circuit Breaker",
            "Bulkhead Pattern",
          ]),
          correctAnswer: 1,
          explanation:
            "The Saga Pattern manages distributed transactions by breaking them into a sequence of local transactions, with each step publishing events to trigger the next.",
        },
        {
          order: 5,
          text: "Which architecture style has components react to events asynchronously?",
          options: JSON.stringify([
            "Monolithic Architecture",
            "Event-Driven Architecture (EDA)",
            "Layered Architecture",
            "Client-Server Architecture",
          ]),
          correctAnswer: 1,
          explanation:
            "Event-Driven Architecture (EDA) is characterized by components that produce, detect, consume, and react to events asynchronously.",
        },
      ],
    },
  },
];
