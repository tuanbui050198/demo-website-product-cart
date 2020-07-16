import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import { Route } from "react-router-dom";
import PropTypes from 'prop-types';

class LayoutLoginRoutes extends Component {
  render() {
    const {component : MyComponent, ...remainProps} = this.props;
    return (
      <Route
        {...remainProps}
        render={(routeProps) => {
          return (<MyComponent {...routeProps} />
          );
        }}
      />
    );
  }
}

LayoutLoginRoutes.propTypes = {
  path: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  exact: PropTypes.bool,
  name: PropTypes.string,
}

export default withStyles(styles)(LayoutLoginRoutes);
