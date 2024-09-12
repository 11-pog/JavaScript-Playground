import Comms from "./SerialCom.mjs";

let com = null

com = new Comms("COM4", 9600);
console.log("Logging.")

await com.EnsureOpen();

try {
    while (true) {
        var data = await com.ReadIfAvailable();

        if (data) {
            console.log(data);
        }
    }
}
catch (err) {
    console.error(`FUCK: ${err}`);
}