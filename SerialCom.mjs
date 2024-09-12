import { SerialPort } from "serialport";
import { EventEmitter } from "events";
import { time } from "console";

class Comms /*extends EventEmitter*/ {
    constructor(port = "COM3", baudrate = 9600, OpenErrorMargin = 10) {
        //super();

        this.port = port;
        this.baud = baudrate;

        this.buf = [];

        this.OpenErrorIndex = 0;
        this.OpenErrorMargin = OpenErrorMargin;


        this.Comms = new SerialPort({ path: port, baudRate: baudrate });


        this.Comms.on("open", () => {
            console.log(`Serial port ${port} is open`);
        });

        this.Comms.on("data", (data) => {
            for (let i = 0; i < data.length; i++) {
                const char = data[i];
                this.buf.push(char);
                console.log(`Recieved: ${String.fromCharCode(char)}`)
            }
        });
    }

    async begin() {
        try {
            this.Comms.open();
            console.log("Porra");
        } catch (err) {
            console.log(`Error opening serial port: ${err.message}`);
        }
    }

    async EnsureOpen() {
        //console.log(".\n");
        while (!this.Comms.isOpen) {
            if (this.OpenErrorIndex <= this.OpenErrorMargin) {
                this.OpenErrorIndex += 1;
                await this.begin();

                while (this.Comms.opening) {}
                
                console.log("FUCK");

                return;
            }

            //console.error("Fuck");
            throw new Error("Serial port is not open");
        }
    }

    async Send(data) {
        await this.EnsureOpen();
        try {
            this.Comms.write(data);
            console.log(`Data sent to serial port: ${data}`);
        } catch (err) {
            console.error(`Error sending data to serial port: ${err}`);
        }
    }

    async ReadIfAvailable() {
        this.EnsureOpen();

        if (this.buf.length > 0) {
            console.log("CU");
            return this.ReadUntilDelimiter();
        }

        return null;
    }

    async ReadUntilDelimiter() {
        var Data = [];
        var Frag = "";

        function _pushFrag() {
            Frag = Frag.trim();
            Frag = Frag.replaceAll(' ', '');

            if (Frag.length) {
                Data.push(Frag);
                Frag = "";
            }
        }

        function _process() {
            var c = this.buf.shift();

            if (c == '\n' || c == ';') {
                _pushFrag();
                return true;
            }

            if (c == ' ') {
                _pushFrag();
            }
            else {
                Frag += c;
            }

            return false;
        }

        var stop = false;

        while (!(this.buf.length > 0 && stop) || !stop) {
            stop = _process();
        }

        return Data;
    }
}

export default Comms;
