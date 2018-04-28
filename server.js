// bosck server

const WebSocket = require("ws");
const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;

const defaultConfig = {
  serialportPath: "/dev/ttyUSB0", // linux on macbook pro example
  websocketPort: 9000,
};

class Server {
  constructor(config = defaultConfig) {
    this.config = config;

    this.initSerialPort = this.initSerialPort.bind(this);
    this.initWebSocketServer = this.initWebSocketServer.bind(this);
    this.handleSerialData = this.handleSerialData.bind(this);

    this.initSerialPort();
    this.initWebSocketServer();
  }

  initSerialPort() {
    this.serialport = new SerialPort(this.config.serialportPath, {
      baudRate: 9600,
      autoOpen: false,
    });

    this.serialport.open(error => {
      if (!error) {
        return;
      }
      console.log(error);
      process.exit(1);
    });
    this.serialParser = this.serialport.pipe(new Readline());
  }

  initWebSocketServer() {
    this.websocket_server = new WebSocket.Server({
      port: this.config.websocketPort,
    });
    this.websocket_server.on("connection", ws => {
      this.websocket_connection = ws;
      console.log("websocket connection established");
    });
    this.websocket_server.on("close", () => {
      this.websocket_connection = null;
      console.log("websocket connection closed");
    });
  }

  listenOnSerial() {
    console.log(`Listening on serial port ${this.serialport.path}...`);
    this.serialParser.on("data", this.handleSerialData);
  }

  handleSerialData(data) {
    console.log(new Date(), data);

    if (!this.websocket_connection) {
      return;
    }

    try {
      this.websocket_connection.send(data);
    } catch (error) {
      console.log("websocket error sending", error);
    }
  }
}

const server = new Server();
server.listenOnSerial();
