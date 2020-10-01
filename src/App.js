import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import SigninButtonComp from "../src/components/SigninButtonComp";
import axios from "axios";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "signin",
      loading: false,
      userTypes: [],
    };
  }

  componentDidMount = async () => {
    let data = await axios.get("./data/userdata.json");
    this.setState({ userTypes: data.data.userTypes });
    console.log(data.data);
  };

  handleChangeView = (thisView) => {
    console.log(thisView);
    this.setState({ currentView: thisView });
  };

  render() {
    const { classes } = this.props;
    const { currentView, loading } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {loading && <CircularProgress />}
          {currentView === "signin" && !loading && (
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <ul>
                {this.state.userTypes.length > 0 && this.state.userTypes.map((row, i) => (
                  <div key={i}>
                    <h1>Element {i + 1}</h1>
                    <li>{row}</li>
                  </div>
                ))}
              </ul>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <SigninButtonComp
                buttonText="Sign In Once"
                onChangeView={this.handleChangeView}
              />
            </form>
          )}
          {currentView === "signup" && !loading && <h2>Sign up view</h2>}
          {currentView === "forgotpwd" && !loading && (
            <h2>Forgot password view</h2>
          )}
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(App);
