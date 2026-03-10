const controlTopic = 'esp32/led/control';
const statusTopic = 'esp32/led/status';

const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe(statusTopic);
});

client.on('message', (topic, message) => {
  if (topic === statusTopic) {
    const status = message.toString().toUpperCase();
    const statusDiv = document.getElementById('led-status');

    statusDiv.innerText = status;

    if (status === 'ON')
      statusDiv.style.color = 'green';
    else if (status === 'OFF')
      statusDiv.style.color = 'red';
    else
      statusDiv.style.color = 'white';
  }
});

function toggleLED(cmd) {
  if (client.connected) {
    client.publish(controlTopic, cmd);
  } else {
    alert("MQTT not connected!");
  }
}
