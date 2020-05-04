import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
// MUI Stuff
import Grid from '@material-ui/core/Grid'
import AppIcon from '../images/icon.webp'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

// Redux
import {connect} from 'react-redux'
import {SignupUser} from '../redux/actions/userActions'

const styles = {
    form: {
        textAlign: 'center'
    },
    formImage: {
        width: 60,
        margin: "10px auto",
    },
    pageTitle: {
        margin: "10px auto"
    },
    textField: {
        margin: "10px auto"
    },
    Button: {
        marginTop: 20,
        position: 'relative'
    },
    customError: {
        color: "red",
        fontSize: "0.8rem",
        margin: "10v auto"
    },
    progress: {
        //position:"absolute",
        color: "black"
    }
}

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      confirmPassword: "",
      handle: "",
      password: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
  }


  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.SignupUser(newUserData, this.props.history);
    console.log(newUserData)
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
      console.log(this.props)
    const { classes,ui:{loading} } = this.props;
    const { errors} = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img
            src={AppIcon}
            className={classes.formImage}
            alt="Social App Logo"
          />
          <Typography variant="h3" className={classes.pageTitle}>
            Sign Up
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              helperText={errors.email}
              error={errors.general || errors.email ? true : false}
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              helperText={errors.password}
              error={errors.general || errors.password ? true : false}
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              helperText={errors.confirmPassword}
              error={errors.general || errors.password ? true : false}
              label="Confirm Password"
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              helperText={errors.handle}
              error={errors.general || errors.handle ? true : false}
              label="User Handle"
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.Button}
            >
              {loading || "Sign up"}{" "}
              {loading && (
                <CircularProgress
                  disabled={loading}
                  size={25}
                  className={classes.progress}
                ></CircularProgress>
              )}
            </Button>
          </form>
          <small>
            Already have an account ? Login <Link to="/login">Here</Link>
          </small>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user:PropTypes.object.isRequired,
    ui:PropTypes.object.isRequired,
    SignupUser:PropTypes.func.isRequired
}

const mapStateToProps=(state)=>({
    user:state.user,
    ui:state.ui
})

const mapActionsToProps=()=>({
    SignupUser
})
export default connect(mapStateToProps,mapActionsToProps())(withStyles(styles)(Signup));