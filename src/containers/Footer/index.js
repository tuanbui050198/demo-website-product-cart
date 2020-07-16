import { withStyles } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import React, { Component } from "react";
import iconZalo from "../../assets/images/iconZalo.png";
import * as text from "../../constants/text";
import styles from "./styles";

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.footer}>
        <div className="row container footer">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="btn-group">
              <a className="link-footer" href="##">
                {text.TXT_ABOUT_US}
              </a>
              <a className="link-footer" href="##">
                {text.TXT_CONTACT_US}
              </a>
              <a className="link-footer" href="##">
                {text.TXT_BLOG}
              </a>
              <a className="link-footer" href="##">
                {text.TXT_PROFILE}
              </a>
            </div>
          </div>

          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="btn-group">
              <a className="link-footer" href="##">
                <FacebookIcon /> <span> {text.TXT_FACEBOOK}</span>
              </a>
              <a className="link-footer" href="##">
                <InstagramIcon /> <span> {text.TXT_INSTAGRAM}</span>
              </a>
              <a className="link-footer link-zalo" href="##">
                <img
                  src={iconZalo}
                  alt="loading"
                  className={classes.iconZalo}
                />
                <span>{text.TXT_ZALO}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
