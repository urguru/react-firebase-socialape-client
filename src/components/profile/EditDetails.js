import React, { Component } from "react";
import PropTypes from "prop-types";
import theme from "../theme";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from '../../utils/MyButton'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";

import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";
const styles = {...theme,
    button:{
        float:"right"
    }
};

export class EditDetails extends Component {
  state = {
    bio: " ",
    website: " ",
    location: " ",
    open: false,
  };
  componentDidMount() {
    const { credentials } = this.props;
      this.mapUserDetailsToState(credentials)
  }

  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : " ",
      website: credentials.website ? credentials.website : " ",
      location: credentials.location ? credentials.location : " ",
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials)
  };
  handleClose=()=>{
      this.setState({open:false})
  }
handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
}

handleSubmit=()=>{
    const userDetails={
        bio:this.state.bio,
        location:this.state.location,
        website: this.state.website,
    }
    this.props.editUserDetails(userDetails)
    this.handleClose()
}
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <MyButton tip="Edit Details" onClick={this.handleOpen} btnClassName={classes.button}>
                <EditIcon color="primary" />
        </MyButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
            <DialogTitle> Edit Your Details</DialogTitle>
            <DialogContent>
                <form action="">
                        <TextField name='bio' type='text' label="Bio" multiline rows='3' placeHolder="A short bio about yourself" className={classes.text} value={this.state.bio} onChange={this.handleChange} fullWidth />
                    <TextField name='website' type='text' label="Website" placeHolder="Your personal/professional website" className={classes.text} value={this.state.website} onChange={this.handleChange} fullWidth />
                         
                        <TextField name='location' type='text' label="Location"  placeHolder="Your home" className={classes.text} value={this.state.location} onChange={this.handleChange} fullWidth />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">Cancel</Button>
                    <Button onClick={this.handleSubmit} color="primary">Submit</Button>
            </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
