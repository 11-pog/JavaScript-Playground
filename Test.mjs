import Comms from "./SerialCom.mjs";

let com = new Comms("COM4", 9600, 50);

console.log("Logging.")

await com.EnsureOpen();

while (true) {
    var data = await com.ReadIfAvailable();

    if (data) {
        console.log(data);
    }
}