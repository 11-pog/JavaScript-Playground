import Comms from "./SerialCom.mjs";

const Serial = new Comms("COM3", 9600);

Serial.on("CMM_DATA", async (data) => {
    console.log(data);
    console.log('\n');
});

(async () => {

    while (true) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        await Serial.Send("ON;");

        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await Serial.Send("OFF;");
    }

})();