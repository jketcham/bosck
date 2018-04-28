import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import classnames from "classnames";

import withData from "./with-data";

class StatusBox extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    warnOn: PropTypes.oneOf(["state", "location", "bpm"])
  };

  statusMessage = {
    fall: "Warning",
    normal: "Normal"
  };

  warningValues = {
    state: "fall",
    location: "out_of_range",
    bpm: bpm => bpm > 200 || bpm < 40
  };

  isFall() {
    const warningValue = _.get(this.warningValues, this.props.warnOn);

    if (typeof warningValue === "function") {
      return _.some(this.props.data, datum =>
        warningValue(_.get(datum, this.props.warnOn))
      );
    }

    return _.some(
      this.props.data,
      datum => _.get(datum, this.props.warnOn) === warningValue
    );
  }

  getMessage() {
    return this.statusMessage[this.isFall() ? "fall" : "normal"];
  }

  render() {
    const className = classnames({
      "status-box": true,
      "danger animated infinite flash": this.isFall()
    });

    return (
      <div className={className}>
        <h4>{this.props.label}:</h4>
        <h2>{this.getMessage()}</h2>
      </div>
    );
  }
}

export default withData(StatusBox);
