import React, { Component } from 'react'
import MyButton from './MyButton'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

// Redux
import {connect} from 'react-redux'
import { likeScream, unlikeScream } from '../redux/actions/dataActions'

export class LikeButton extends Component {
    likedScream = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId)) {
            return true
        }
        return false
    }
    likeScream = () => {
        this.props.likeScream(this.props.screamId)
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId)
    }


    render() {
        const { user:{authenticated}}=this.props
        const likeButton  = !authenticated ? (
            <MyButton tip="Like">
                <Link to='/login'>
                    <FavoriteBorder color="primary" />
                </Link>
            </MyButton>
        ) : (this.likedScream() ? (<MyButton tip="Unlike" onClick={this.unlikeScream}>
            <Favorite color="primary" />
        </MyButton>) : (<MyButton tip="Like" onClick={this.likeScream}>
            <FavoriteBorder color="primary" /></MyButton>))
        return likeButton
    }
}

LikeButton.propTypes={
    user:PropTypes.object.isRequired,
    screamId:PropTypes.string.isRequired,
    likeScream:PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,

}

const mapStateToProps=(state)=>({
    user:state.user
})

const mapActionsToProps={
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
