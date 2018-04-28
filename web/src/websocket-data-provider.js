import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const { Provider, Consumer } = React.createContext({ data: [] });

class WebSocketDataProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    websocketUrl: PropTypes.string.isRequired
  };

  static defaultProps = {
    websocketUrl: "ws://localhost:9000"
  };

  state = {
    data: []
  };

  constructor(props) {
    super(props);

    this.websocket = new WebSocket(props.websocketUrl);
  }

  componentDidMount() {
    this.websocket.addEventListener("open", this.handleOpen);
    this.websocket.addEventListener("message", this.handleMessage);
  }

  componentWillUnmount() {
    this.websocket.removeEventListener("open", this.handleOpen);
    this.websocket.removeEventListener("message", this.handleMessage);
    this.websocket.close();
  }

  handleOpen = event => console.log("WebSocket connection established");

  handleMessage = event => {
    this.setState(({ data }) => this.updateData(data, JSON.parse(event.data)));
  };

  updateData = (currentData, newData) => {
    const data = _.chain([newData])
      .concat(currentData)
      .take(25)
      // .map(datum => ({...datum, bpm: 201, location: 'out_of_range'})) // simulate warnings for location and bpm
      .value();

    return { data };
  };

  render() {
    return <Provider value={this.state.data}>{this.props.children}</Provider>;
  }
}

export { WebSocketDataProvider as default, Consumer };
