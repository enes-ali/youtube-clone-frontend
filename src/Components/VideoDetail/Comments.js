import React from "react";
import axios from 'axios';
import ThumbsUp from "../../Icons/VideoDetail/thumb_up.svg";
import ThumbsDown from "../../Icons/VideoDetail/thumb_down.svg";
import {connect} from 'react-redux';
import SortIcon from "../../Icons/VideoDetail/sort.svg";
import {Link, withRouter} from 'react-router-dom';


class Comments extends React.Component{

    state = {
        comments: [],
        comment_count: 0,
    }

    componentDidMount(){
        // get the comments of the video
        axios.get(`http://127.0.0.1:8000/comments/${this.props.video_id}`).then(
            (res) =>{
                this.setState({
                    comments: res.data,
                    comment_count: res.data.length,
                });
            }
        );
    }

    getMakeCommentImage = () => {
        return this.props.isSigned 
        ? (<img id="AddCommentUserImage" src={this.props.channel.channel_photo}/>)
        : (<img id="AddCommentUserImage"/>)
    }

    makeComment = (e) => {
        e.preventDefault();

        if(this.props.isSigned){
            let text = this.new_comment_text.value; // get the comment text from input
            this.new_comment_text.value = null; // clear the input

            // prepare the comment for posting to the server
            let post_body = {
                user: this.props.channel.user,
                video: this.props.video_id,
                text: text,
            }
            let post_headers = {
                headers:{
                    Authorization: `TOKEN ${this.props.token}`,
                }
            }
            // post the comment to server
            // if the post is succesful the server is gonna return created comment
            // show created comment in page
            axios.post("http://127.0.0.1:8000/makeComment", post_body, post_headers).then(
                (res) =>{
                    this.setState({
                        comments: [res.data, ...this.state.comments],
                        comment_count: this.state.comment_count + 1,
                    });
                }
            );
        }
        else{
            this.props.history.push("/login");
        }
    }

    render(){

        let commentsJSX = this.state.comments.map(
            (comment) => {
                return(
                    <div className="Comment">
                        <Link to={`/channel/${comment.user.user}`}> <img className="CommentOwnerImage"src={comment.user.channel_photo} /> </Link>
                        <div className="CommentContentContainer">
                            <div className="CommentTitle">
                                <Link to={`/channel/${comment.user.user}`}> <p className="CommentOwner">{comment.user.channel_name}</p> </Link>
                                <p className="CommentPostDate">4 months ago</p>
                            </div>
    
                            <p className="CommentText"> {comment.text} </p>
    
                            <div className="CommentButtons">
                                <img src={ThumbsUp}/>
                                <p className="CommentLikeCount">6.5K</p>
                                <img src={ThumbsDown}/>
                                <button className="ReplyCommentButton">REPLY</button>
                            </div>
                        </div>
                    </div>
                );
            }
        );

        return(
            <div id="CommentsContainer">

                <div id="CommentCount">
                    <p>{this.state.comment_count} Comments</p>
                    <button id="SortCommentsButton"><img src={SortIcon}/> <p>SORT BY</p></button>
                </div>

                <div id="AddCommentContainer">

                    {this.getMakeCommentImage()}

                    <form id="AddCommentForm" onSubmit={this.makeComment}>
                        <input type="text" placeholder="Add a public comment" ref={(ref)=> this.new_comment_text = ref}/>
                        <button id="MakeCommentButton">COMMENT</button>
                    </form>
                </div>

                <div id='Comments'>
                    {commentsJSX}
                </div>

            </div>

        );
    }
}


function mapStateToProps(state){
    return{
        token: state.Account.token,
        isSigned: state.Account.isSigned,
        channel: state.Account.channel,
    }
}

export default withRouter(connect(mapStateToProps)(Comments));