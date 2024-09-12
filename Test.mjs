import Comms from "./SerialCom.mjs";

const com = new Comms("Cfsdfdsf", 9600);

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