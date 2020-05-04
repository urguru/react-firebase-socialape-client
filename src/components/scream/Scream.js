import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MyButton from '../../utils/MyButton'
import ChatIcon from '@material-ui/icons/Chat'
import DeleteScream from '../../utils/DeleteScream'
import ScreamDialogue from './ScreamDialogue'
import LikeButton from '../../utils/LikeButton'
const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        position:'relative'
    },
    image: {
        minWidth: 150,
        objectFit:'cover'
    },
    content: {
        padding: 15,
        objectFit: 'cover'
    }
}


class Scream extends Component {
    render() {
        dayjs.extend(relativeTime)
        const { classes, scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount },user:{authenticated,credentials:{handle}} } = this.props
       

        const deleteButton=(authenticated &&  handle===userHandle)?(<DeleteScream screamId={screamId}/>):(null)
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} className={classes.image} title="Profile Image" />
                <CardContent className={classes.content}>
                    <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary " />
                    </MyButton>
        <span>{commentCount} comments </span>
                <ScreamDialogue screamId={screamId}  userHandle={userHandle} openDialog={this.props.openDialog}/>
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes={
    user:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
    scream:PropTypes.object.isRequired,
    openDialog:PropTypes.bool
}

const mapStateToProps=state=>({
    user: state.user 
})


export default connect(mapStateToProps)(withStyles(styles)(Scream))