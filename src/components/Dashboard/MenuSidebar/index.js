import { Drawer, withStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PropTypes from 'prop-types';
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES_PRODUCT } from "../../../constants/Routes";
import styles from "./styles";

class MenuSidebar extends Component {

  toggleDrawer = (value) => {
    const {onToggleSidebar} = this.props;
    if(onToggleSidebar){
      onToggleSidebar(value);
    }
  };

  renderListMenu() {
    const { classes } = this.props;
    let xhtml = null;
    xhtml = (
      <div className={classes.listMenu}>
        <List component="div">
          {ROUTES_PRODUCT.map((item) => {
            return (
              <NavLink
                to={item.path}
                key={item.path}
                exact
                className={classes.menuLink}
                activeClassName={classes.menuLinkActive}
              >
                <ListItem className={classes.menuItem} button>
                  {item.name}
                </ListItem>
              </NavLink>
            );
          })}
        </List>
      </div>
    );
    return xhtml;
  }

  render() {
    const { classes, showSidebar } = this.props;
    return (
      <Drawer
        open={showSidebar}
        onClose={() => this.toggleDrawer(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
        className = "responsive-drawer-paper"
        variant="persistent"
      >
        {this.renderListMenu()}
      </Drawer>
    );
  }
}

MenuSidebar.propTypes = {
  classes: PropTypes.object,
  showSidebar: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
}

export default withStyles(styles)(MenuSidebar);
