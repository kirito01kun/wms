const { Kafka } = require('kafkajs');

class KafkaProducer {
  constructor() {
    this.kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092']
    });
    this.producer = this.kafka.producer({
      acks: 'all',          // Wait for all replicas to acknowledge
      retries: 5,           // Retry sending the message up to 5 times
      retry: {
        initialRetryTime: 300,  // Initial retry interval (in ms)
        maxRetryTime: 30000,    // Maximum retry interval (in ms)
        factor: 2,              // Exponential backoff factor
        multiplier: 1.5,        // Multiplier for additional retries
      },
    });
    this.isConnected = false;
  }


  async connect() {
    if (!this.isConnected) {
      try {
        await this.producer.connect();
        this.isConnected = true;
        console.log('Kafka producer connected');
      } catch (error) {
        this.isConnected = false;
        console.error('Error connecting Kafka producer:', error);
      }
    }
  }

  async produceMessage(topic, message) {
    await this.connect(); // Ensure connected before sending
    try {
      await this.producer.send({
        topic,
        messages: [{ value: message }]
      });
      console.log('Message sent to Kafka:', message);
    } catch (error) {
      console.error('Error sending message to Kafka:', error);
      this.isConnected = false; // Mark as disconnected to attempt reconnection on next use
    }
  }
}

const kafkaProducerInstance = new KafkaProducer();

process.on('SIGINT', async () => {
  try {
    await kafkaProducerInstance.producer.disconnect();
    console.log('Kafka producer disconnected');
    process.exit(0);
  } catch (error) {
    console.error('Error disconnecting Kafka producer:', error);
    process.exit(1);
  }
});

module.exports = kafkaProducerInstance;
