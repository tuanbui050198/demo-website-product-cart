import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import PropTypes from "prop-types";
import MenuHeader from "./MenuHeader";
import MenuSidebar from "./MenuSidebar";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as uiActions from "../../actions/ui";
import cn from "classnames";

class Dashboard extends Component {
  handleToggleSidebar = (value) => {
    const { uiActionCreators } = this.props;
    const { showSidebar, hideSidebar } = uiActionCreators;
    if (value === true) {
      showSidebar();
    } else {
      hideSidebar();
    }
  };

  render() {
    const { classes, children, name, showSidebar } = this.props;
    return (
      <div className={classes.products}>
        <div className="all-page">
          <div className="menu-sidebar-header">
            <MenuHeader
              name={name}
              showSidebar={showSidebar}
              onToggleSidebar={this.handleToggleSidebar}
              className="menu-header"
            />
            <div className={(classes.wrapper, "wrapper menu-sidebar")}>
              <MenuSidebar
                showSidebar={showSidebar}
                onToggleSidebar={this.handleToggleSidebar}
                className="item-menu-sidebar"
              />
            </div>
          </div>

          <div className="wrapperContent">
            <div
              // className="children-content"
              className={cn(classes.wrapperContent, {
                [classes.shiftLeft]: showSidebar === false,
                "img-slick-breadcrumb": showSidebar === true,
              })}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object,
  name: PropTypes.string,
  showSidebar: PropTypes.bool,
  uiActionCreators: PropTypes.shape({
    showSidebar: PropTypes.func,
    hideSidebar: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  return {
    showSidebar: state.ui.showSidebar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uiActionCreators: bindActionCreators(uiActions, dispatch),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withStyles(styles))(Dashboard);
