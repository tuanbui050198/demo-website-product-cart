import React, { Component } from "react";
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import styles from "./styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as text from "../../constants/text";
import { ROUTES_LOGIN, ROUTES_PRODUCT } from "../../constants/Routes";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionAccount from "../../actions/login";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtEmail: "",
      txtPassword: "",
    };
  }

  onLogin = (e) => {
    const { txtEmail, txtPassword } = this.state;
    const { history } = this.props;
    e.preventDefault();
    const { actionAccountCreators } = this.props;
    const { loginPage } = actionAccountCreators;
    loginPage(txtEmail, txtPassword, history);
  };

  actionValue = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { txtEmail, txtPassword } = this.state;
    return (
      <div className={classes.loginPage}>
        <Card>
          <CardContent>
            <form onSubmit={this.onLogin}>
              <div className="text-title">
                <Typography variant="caption" className="text-title-login">
                  {text.TXT_LOGIN_TO_CONTINUE}
                </Typography>
              </div>
              <TextField
                id="email"
                label="Email"
                className={classes.TextField}
                fullWidth
                margin="normal"
                name="txtEmail"
                value={txtEmail}
                onChange={this.actionValue}
                placeholder="@example.com"
                type="email"
                required
              />
              <TextField
                id="password"
                label="Password"
                className={classes.TextField}
                type="password"
                fullWidth
                margin="normal"
                name="txtPassword"
                value={txtPassword}
                onChange={this.actionValue}
                placeholder="6 - 20 characters"
                type="password"
                required
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                {text.TXT_LOGIN}
              </Button>
              <div className="link-register">
                <Link to={ROUTES_LOGIN[1].path}>
                  <Button className="mt-10">{text.TXT_REGISTER_ACCOUNT}</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionAccountCreators: bindActionCreators(actionAccount, dispatch),
  };
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(LoginPage));
