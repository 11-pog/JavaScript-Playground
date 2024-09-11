import { SerialPort } from "serialport";

class Comms {
  constructor(port = "COM3", baudrate = 9600) {
    this.port = port;
    this.baud = baudrate;
    this.Comms = new SerialPort({ path: port, baudRate: baudrate });
  }
}
