const mqtt = require("mqtt");
require("dotenv").config();

const client = mqtt.connect("mqtt://localhost", { port: 1883 });
// const client = mqtt.connect(process.env.MQTT_BROKER_URL);

client.on("connect", () => {
  console.log("MQTT connected");
  client.subscribe("#");
  client.publish("/shellies/shelly25-E8DB84AA15F4/relay/0/command", '1');
});

client.on("close", () => {
  console.log("MQTT disconnected");
});

client.on("message", (topic, msg) => {
  console.log(`${topic}, ${msg.toString()}`);
});
module.exports = client;
