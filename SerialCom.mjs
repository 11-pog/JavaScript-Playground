import { SerialPort } from "serialport";
import { EventEmitter } from "events";

class Comms extends EventEmitter {
    constructor(port = "COM3", baudrate = 9600) {
        super();

        this.port = port;
        this.baud = baudrate;

        this.Comms = new SerialPort({ path: port, baudRate: baudrate });

        this.Fragment = "";

        this.Comms.on("open", async () => {
            console.log(`Serial port ${port} is open`);
        });

        this.Comms.on("data", async (data) => {
            for (let i = 0; i < data.length; i++) {
                const c = data[i];

                await this._process(String.fromCharCode(c));
            }
        });
    }

    async _pushFrag() {
        var TrimdFrag = this.Fragment.trim();

        if (TrimdFrag.length) {
            this.emit("CMM_DATA", TrimdFrag);
            this.Fragment = "";
        }
    }

    async _process(c) {
        if (c == '\n' || c == ';') {
            await this._pushFrag();
            return;
        }

        this.Fragment += c;
    }

    async Send(data) {
        try {
            this.Comms.write(data);
            console.log(`Data sent to serial port: ${data}`);
        } catch (err) {
            console.error(`Error sending data to serial port: ${err}`);
        }
    }
}

export default Comms;
