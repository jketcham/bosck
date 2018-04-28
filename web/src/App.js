import React, { Component } from "react";
import "./App.css";

import StatusBox from "./status-box";
import DataStream from "./data-stream";
import LineChart from "./line-chart";
import WebSocketDataProvider from "./websocket-data-provider";

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <div className="app-logo">
            <span role="img" aria-label="sock">
              🧦
            </span>
          </div>
          <h1 className="app-title">BOSCK Safe Sock</h1>
        </header>
        <WebSocketDataProvider>
          <div className="app-content">
            <div className="column">
              <section>
                <StatusBox label="Fall state" warnOn="state" />
                <StatusBox label="Location status" warnOn="location" />
                <StatusBox label="Heart rate status" warnOn="bpm" />
              </section>
            </div>
            <div className="column">
              <section>
                <DataStream />
              </section>
            </div>
            <div className="column">
              <section>
                <LineChart label="BPM" />
              </section>
            </div>
          </div>
        </WebSocketDataProvider>
      </div>
    );
  }
}

export default App;
