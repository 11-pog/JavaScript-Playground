const Tele = require("mqtt")
const Comms = Tele.connect("mqtt://broker.emqx.io:1883")

Comms.subscribe("Testes")

Comms.on("message", (topic, msg) => {
    console.log(`Message recieved from broker: ${topic} => ${msg}`)
})