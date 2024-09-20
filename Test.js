const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.emqx.io:1883')

client.subscribe("ESP_COMMAND")

client.on('connect', function () {
    console.log("TESTE FOI");
})

client.on('message', function (topic, message) {
    console.log("Received message '" + message + "' on topic '" + topic + "'");
})