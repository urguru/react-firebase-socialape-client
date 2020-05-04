import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from '../../utils/MyButton'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from '@material-ui/core/circularProgress'
import {postScream,clearErrors} from '../../redux/actions/dataActions'
import {connect} from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import theme from '../theme'


const styles={
    ...theme,
    submitButton:{
        position:'relative',
        float:'right',
        marginTop:10
    },
    progressSpinner:{
        position:'absolute'
    },
    closeButton:{
        posiiton:'absolute',
        left:"45%",
        top:'10%'
    }
}

class PostScream extends Component{
    state={
        open:false,
        body:"",
        errors:{}
    }
    handleOpen=()=>{
        this.setState({
            open:true
        })
    }
    handleClose = () => {
        this.props.clearErrors()
        this.setState({
            open: false,
            errors:{},
            body:" "
        })
    }
    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        this.props.postScream({body:this.state.body})
    }
    componentWillReceiveProps(nextProps){
       if(nextProps.ui.errors){
           this.setState({
               errors:nextProps.ui.errors
           })
       } 
       if(!nextProps.ui.errors && !nextProps.ui.loading){
           this.setState({
               open:false,
               errors:{}
           })
       }
    }
    render(){
        const {errors}=this.state
        const {classes,ui:{loading}}=this.props;
        return(
            <React.Fragment>
                <MyButton onClick={this.handleOpen} tip="Post a scream!">
                    <AddIcon/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                     <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                     </MyButton>
                     <DialogTitle>
                         Post a new scream
                     </DialogTitle>
                     <DialogContent>
                         <form onSubmit={this.handleSubmit}>
                            <TextField name="body" type="text" label="Scream!!!" multiline rows="3" placeholder="Scream at your fellow apes" error={errors.comment?true:false} helperText={errors.comment} className={classes.textField} onChange={this.handleChange} fullWidth/>
                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                {loading && <CircularProgress size={30} className={classes.progressSpinner} />}
                                Submit
                            </Button>
                         </form>
                     </DialogContent>
                </Dialog>
            </React.Fragment>

        )
    }
}

const mapStateToProps=(state)=>({
    ui:state.ui
})


PostScream.propTypes = {
    postScream:PropTypes.func.isRequired,
    classes:PropTypes.object.isRequired,
    ui:PropTypes.object.isRequired
}

export default connect(mapStateToProps,{postScream,clearErrors})(withStyles(styles)(PostScream))