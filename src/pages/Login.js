import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

// MUI Stuff
import Grid from '@material-ui/core/Grid'
import AppIcon from '../images/icon.webp'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

//Redux
import {connect} from 'react-redux'
import {LoginUser} from '../redux/actions/userActions'


const styles ={
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

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.ui.errors){
            this.setState({errors:nextProps.ui.errors})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.LoginUser(userData,this.props.history)
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const { classes,ui:{loading} } = this.props
        const { errors} = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} className={classes.formImage} alt="Social App Logo" />
                    <Typography variant="h3" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id='email' name='email' type='email' label="Email" helperText={errors.email} error={errors.general||errors.email?true:false} className={classes.textField} value={this.state.email} onChange={this.handleChange} fullWidth />
                        <TextField id='password' name='password' type='password' helperText={errors.password} error={errors.general ||errors.password ? true : false} label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange} fullWidth />
                        {errors.general && <Typography variant="body2" className={classes.customError} >{errors.general}</Typography>}
                        <Button type="submit" variant="contained" color="primary" className={classes.Button}>
                         {loading|| 'Login'} {loading && (<CircularProgress disabled={loading}size={25}className={classes.progress}></CircularProgress>)}
                    </Button>
                    </form>
                    <small>Dont have an account ? Sign Up <Link to='/signup'>Here</Link></small>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    LoginUser:PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    ui:PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
    user:state.user,
    ui:state.ui
})

const mapActionsToProps={
    LoginUser
}


export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Login));