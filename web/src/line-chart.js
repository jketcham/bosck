import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { LineChart, Line, YAxis, ResponsiveContainer } from "recharts";

import withData from "./with-data";

class Chart extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired
  };

  getData() {
    return _.map(this.props.data, datum => ({
      name: "bpm",
      bpm: Number(datum.bpm)
    }));
  }

  render() {
    return (
      <div>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={this.getData()}>
            <YAxis />
            <Line type="monotone" dataKey="bpm" stroke="#000" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
        <h4>{this.props.label}</h4>
      </div>
    );
  }
}

export default withData(Chart);
