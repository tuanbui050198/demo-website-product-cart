import React, { Component, useRef } from "react";
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import styles from "./styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ROUTES_LOGIN } from "../../constants/Routes";
import * as text from "../../constants/text";
import { connect } from "react-redux";
import * as actionAccount from "../../actions/login";
import { bindActionCreators } from "redux";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtEmail: "",
      txtPassword: "",
      txtCPassword: "",
    };
  }

  renderError() {
    let xhtml = null;
    const { txtCPassword, txtPassword } = this.state;
    if (txtPassword !== txtCPassword) {
      xhtml = text.TXT_CONFIRM_PASSWORD_FAILED;
    }
    return xhtml;
  }

  onCreateAccount = (e) => {
    const { txtEmail, txtPassword } = this.state;
    const { history } = this.props;
    e.preventDefault();
    const { actionAccountCreators } = this.props;
    const { createAccount } = actionAccountCreators;
    createAccount(txtEmail, txtPassword, history);
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
    var { txtEmail, txtPassword, txtCPassword } = this.state;
    return (
      <div className={classes.backgroundLogin}>
        <div className={classes.registerPage}>
          <Card>
            <CardContent>
              <form onSubmit={this.onCreateAccount}>
                <div className="text-title">
                  <Typography variant="caption" className="text-title-login">
                    {text.TXT_REGISTER_ACCOUNT}
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
                <TextField
                  id="cpassword"
                  label="Confirm Password"
                  className={classes.TextField}
                  type="password"
                  fullWidth
                  margin="normal"
                  name="txtCPassword"
                  value={txtCPassword}
                  onChange={this.actionValue}
                  placeholder="6 - 20 characters"
                  type="password"
                  required
                />
                <span className="error-password">{this.renderError()}</span>
                <FormControlLabel
                  control={<Checkbox value="agree" />}
                  label={text.TXT_AGREE_TERMS}
                  className="check-terms"
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  {text.TXT_REGISTER}
                </Button>
                <div className="link-register">
                  <Link to={ROUTES_LOGIN[0].path}>
                    <Button className="mt-10">{text.TXT_HAVE_ACCOUNT}</Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionAccountCreators: bindActionCreators(actionAccount, dispatch),
  };
};

export default withStyles(styles)(
  connect(null, mapDispatchToProps)(RegisterPage)
);
