import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import Scream from '../components/scream/Scream'
import Profile from '../components/profile/Profile'

import {connect} from 'react-redux';
import { getScreams } from '../redux/actions/dataActions'


class Home extends Component {
    componentDidMount(){
       this.props.getScreams()
    }
    render() {
        console.log(process.env.REACT_APP_SERVER_URL)
        const {screams,loading}=this.props.data
        let recentScreamsMarkup=!loading?
            screams.map(scream=><Scream key={scream.screamId} scream={scream}/>):<p>Loading</p>
        return (
           <Grid container spacing={2} >
               <Grid item sm={8} xs={12}>
                  {recentScreamsMarkup}
               </Grid>
                <Grid item sm={4} xs={12}>
                    {console.log("hello")}
                    <Profile/>
                </Grid>
           </Grid>
        )
    }
}

const mapStateToProps=(state)=>({
    data:state.data
})

const mapActionToProps={
    getScreams
}

Home.propTypes={
    getScreams:PropTypes.func.isRequired,
    data:PropTypes.object.isRequired
}

export default connect(mapStateToProps,mapActionToProps)(Home)