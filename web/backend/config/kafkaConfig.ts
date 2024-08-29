import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"], // Thay đổi theo cấu hình thực tế
  ssl: true, // Nếu bạn sử dụng SSL
  sasl: {
    mechanism: "plain", // PLAIN, SCRAM-SHA-256, SCRAM-SHA-512, v.v.
    username: "your-username",
    password: "your-password",
  },
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "my-group" });
