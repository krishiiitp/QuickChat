# How to get started

git clone : https://github.com/krishiiitp/QuickChat.git

# Description

QuickChat is a real-time, scalable chat application addressing horizontal scaling challenges in socket.io, enabling communication across servers. Leveraged Redis with Pub/Sub to relay messages efficiently among users. Additionally, utilized Kafka for buffering chat data, preventing database overload during peak usage. Data is seamlessly sent to PostgreSQL for durable storage, ensuring uninterrupted chat functionality.

# Problem We Are Solving:

Horizontal Scaling: Users connected to different servers could not communicate in real-time. Database Write Load: High concurrent chatting could overwhelm the database, causing temporary downtimes.

# How We Are Solving It:

1.Socket.io for Real-Time Communication: Initially, Socket.io allowed clients to emit messages to the server.

2.Redis Pub/Sub for Cross-Server Communication: Messages emitted from clients are published to Redis. Redis Pub/Sub mechanism broadcasts these messages to all connected clients, enabling cross-server communication.

3.Kafka for Database Load Balancing: Kafka acts as a message buffer to handle high write loads. Messages are stored in Kafka (Producer) before being sent to the PostgreSQL database for durable storage.
