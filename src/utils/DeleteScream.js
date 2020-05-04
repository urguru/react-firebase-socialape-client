import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MyButton from '../utils/MyButton'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import {deleteScream} from '../redux/actions/dataActions'
import { withStyles } from '@material-ui/core'


const styles={
    deleteButton:{
        left:"90%",
        top:"10%",
        position:'absolute'
    }
}
export class DeleteScream extends Component {

    state={
        open:false
    }
    handleOpen=()=>this.setState({open:true});
    handleClose=()=>this.setState({open:false})
    deleteScream=()=>{
        this.props.deleteScream(this.props.screamId)
        this.setState({open:false})
    }


    render() {
        const {classes}=this.props
        return (
           <React.Fragment>
               <MyButton tip="deleteScream" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                   <DeleteOutline color="secondary"></DeleteOutline>
               </MyButton>
               <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                   <DialogTitle>
                       Are you sure you want to delete the scream
                   </DialogTitle>
                   <DialogActions>
                       <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={this.deleteScream} color="secondary">Delete</Button>
                   </DialogActions>
               </Dialog>
           </React.Fragment>
        )
    }
}

DeleteScream.propTypes={
    deleteScream:PropTypes.func.isRequired,
    classes:PropTypes.object.isRequired,
    screamId:PropTypes.string.isRequired
}

export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream))
