import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";

import withData from "./with-data";

class DataStream extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  state = {
    pauseData: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (!nextState.pauseData && this.state.pauseData) || !this.state.pauseData
    );
  }

  toggleDataStream = () => {
    this.setState({ pauseData: !this.state.pauseData });
  };

  renderPauseButton() {
    let text = "Pause data stream";

    if (this.state.pauseData) {
      text = "Unpause data stream";
    }

    return (
      <div className="data__header">
        <button onClick={this.toggleDataStream}>{text}</button>
      </div>
    );
  }

  renderRow(datum, index) {
    const className = classnames({
      box: true,
      danger: datum.state === "fall"
    });

    return (
      <li key={`${datum}-${index}`}>
        <div className={className}>
          {_.map(datum, (value, key) => (
            <span key={key}>
              {key}: {value}
            </span>
          ))}
        </div>
      </li>
    );
  }

  renderList() {
    const { data } = this.props;

    if (!data || data.length === 0) {
      return <span>Loading...</span>;
    }

    const listItems = data.map(this.renderRow);

    return <ul className="list-unstyled">{listItems}</ul>;
  }

  render() {
    return (
      <div className="data__container">
        {this.renderPauseButton()}
        {this.renderList()}
      </div>
    );
  }
}

export default withData(DataStream);
