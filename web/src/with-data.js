import React from "react";

import { Consumer } from "./websocket-data-provider";

const withData = WrappedComponent => props => (
  <Consumer>{data => <WrappedComponent data={data} {...props} />}</Consumer>
);

export default withData;
