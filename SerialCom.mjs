import { SerialPort } from "serialport";

class Comms {
    constructor(port = "COM3", baudrate = 9600) {
        this.port = port;
        this.baud = baudrate;
        this.Comms = new SerialPort({ path: port, baudRate: baudrate });

        this.Comms.open();
    }

    async EnsureOpen() {
        if (!this.Comms.isOpen) {
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

    async Read() {
        await this.EnsureOpen();

        try {
            this.Comms.on("data", (data) => {
                console.log(`Data received from serial port: ${data}`);
            });
        } catch (err) {
            console.error(`Error reading data from serial port: ${err}`);
        }
    }
}
