import Comms from "./SerialCom.mjs";

const Serial = new Comms("COM4", 9600);

Serial.on("CMM_DATA", async (data) => {
    console.log(data);
    console.log('\n');
});

(async () => {

    

})();