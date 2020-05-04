import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../utils/MyButton";
import Typography from "@material-ui/core/Typography";
import Notifications from './Notifications'
//Material Ui Stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

//ICons
import HomeIcon from "@material-ui/icons/Home";
import NotificationIcon from "@material-ui/icons/Notifications";
import PostScream from "../scream/PostScream";
class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <React.Fragment>
              <PostScream />
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <Notifications/>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link to="/login">
                <Typography style={{ color: "white" ,margin:"0 20px",textTransform:'uppercase'}}>Login</Typography>
              </Link>
              <Link to="/">
                  <Typography style={{ color: "white", margin: "0 20px", textTransform:'uppercase'}}>Home</Typography>
              </Link>
              <Link to="/signup">
                  <Typography style={{ color: "white", margin: "0 20px", textTransform: 'uppercase'}}>Signup</Typography>
              </Link>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Navbar);
