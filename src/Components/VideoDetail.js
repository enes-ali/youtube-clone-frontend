import React from 'react';
import axios from "axios";
import "../Styles/VideoDetail.css";
import {connect} from 'react-redux';
import NextVideos from "./VideoDetail/NextVideos"
import Comments from './VideoDetail/Comments';
import UserActions from './VideoDetail/UserActions';
import { Link } from 'react-router-dom';



class VideoDetail extends React.Component{

    state = {
        video:{},
        channel:{},
        comments: null,

        is_subscribed: false,
    }

    componentDidMount(){
        const id = this.props.match.params.id;

        // Get The Video
        axios.get(`http://127.0.0.1:8000/video/${id}`)
        .then( (response) => {
            let video = response.data;
            this.setState({
                video: video,
                channel: video.channel,
            });

            // Check Is User Subscribed To Channel Or Not
            // We gotta do this in .then() because this.setState() is delayed
            let get_subscriber_data = {
                params:{
                    subscriber: this.props.channel.user,
                    subscribed_channel: video.channel.user,
                }
            }
            axios.get("http://127.0.0.1:8000/subscribe", get_subscriber_data).then(
                (res) => {
                    this.setState({
                        is_subscribed: res.data.is_subscribed,
                    });
                }
            );
        });
    }   


    handleSubscription = (e) =>{
        if(this.props.isSigned){
            // Change The Subscription Button
            e.target.id = e.target.id == "SubscribeButton" ? "SubscribeButtonActive" : "SubscribeButton";
            
            // Submit The Subscription Change To Server
            let headers = {
                headers:{
                    Authorization: `TOKEN ${this.props.token}`
                }
            }

            let post_body = {
                subscriber: this.props.channel.user,
                subscribed_channel: this.state.channel.user,
            }
            axios.post("http://127.0.0.1:8000/subscribe",post_body, headers);
        }
        else{
            this.props.history.push("/login");
        }
    }

    showMoreDescription = (e) =>{
        let currentLength = this.video_description_text.innerText.length;
        let shorText = this.state.video.description.slice(0, 250) + "...";
        let normalText = this.state.video.description;
        this.video_description_text.innerText = currentLength > 255 ? shorText : normalText;
    }

    render(){
        return(
            <div id="VideoDetail">
                <div id="VideoSide">
                    <video src={this.state.video.video_file} id="Video" controls/>
                    
                    <div id="VideoInfo">

                        <p id="VideoTitle">{this.state.video.title}</p>

                        <div id="VideoTitleContainer">
                            <p id="VideoView">{this.state.video.view_count} Views • {this.state.video.upload_date}</p>
                            <UserActions video_id={this.props.match.params.id} like_count={this.state.video.like_count} dislike_count={this.state.video.dislike_count}/>
                        </div>

                    </div>

                    <div id="VideoDescription">
                        <div id="VideoChannel">
                            <div id="VideoChannelInfo">

                                <Link to={`/channel/${this.state.channel.user}`}> <img id="VideoChannelPhoto" src={this.state.channel.channel_photo}/> </Link>

                                <div>
                                    <Link to={`/channel/${this.state.channel.user}`}> <p id="VideoChannelName">{this.state.channel.channel_name}</p> </Link>
                                    <p id="VideoSubCount">{this.state.channel.subscriber_count} subscribers</p>
                                </div>

                            </div>

                            <button id={this.state.is_subscribed ? "SubscribeButtonActive" : "SubscribeButton"}  onClick={this.handleSubscription}>
                                Subscribe
                            </button>
                        </div>

                        <div id="DecriptionTextContainer">
                            <p id="VideoDescriptionText" ref={(ref) => this.video_description_text = ref}>{this.state.video.description ? this.state.video.description.slice(0, 250) : this.state.video.description}</p>
                            <button id="ShowMoreButton" onClick={this.showMoreDescription}>SHOW MORE</button>
                        </div>
                    </div>

                    <Comments video_id={this.props.match.params.id} />

                </div>

                <NextVideos />

                <br/><br/><br/><br/><br/>
            </div>
        );
    }
}

function mapStateToProps(state){

    return{
        isSigned: state.Account.isSigned,
        token: state.Account.token,
        channel: state.Account.channel,
    }
}

export default connect(mapStateToProps)(VideoDetail);



/*
    <div id="NextVideoSide">
        {this.getNextVideos()}
    </div>                
*/

/*
getNextVideos = () => {
let nextVideosJsx;

if(this.state.nextVideos){
    nextVideosJsx = this.state.nextVideos.map( (video) => {
        return(

            <div className="NextVideo">
                <Link to={`${video.id}`} className="VideoDetails">
                    <img src={video.cover_image} className="NextVideoCover"/>
                </Link>
                <Link to={`${video.id}`} className="VideoDetails">
                    <p className="NextVideoTitle">{video.title}</p>
                    <p className="NextVideoChannelName">{video.channel.channel_name}</p>
                    <p className="NextVideoViewCount">16MN views • 4 months ago</p>
                </Link>
            </div>

        );

    });
}
return nextVideosJsx;
}
*/





/*
<div id="Comments">
    {this.getComments()}
</div>
*/

/*
       getComments = () => {
        let commentsJsx = null;

        if(this.state.comments){
            commentsJsx = this.state.comments.map( (comment) => {
                return (
                    <div className="Comment">
                        <img className="CommentOwnerImage"src={comment.user.channel_photo} />
                        <div className="CommentContentContainer">
                            <div className="CommentTitle">
                                <p className="CommentOwner">{comment.user.channel_name}</p>
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
            });

        }
        return commentsJsx;
    }
*/












/*
    <div id="CommentsContainer">
        <div id="CommentCount">
            <p>640 Comments</p>
            <button id="SortCommentsButton"><img src={SortIcon}/> <p>SORT BY</p></button>
        </div>

        <div id="AddCommentContainer">

            {this.getMakeCommentImage()}

            <form id="AddCommentForm">
                <input type="text" placeholder="Add a public comment"/>
                <button id="MakeCommentButton">COMMENT</button>
            </form>
        </div>
        

        <Comments video_id={this.props.match.params.id} />

    </div>
*/










/*
<div id="UserActionsContainer">
    <div id='VideoUserActions'>

        <div id="LikeContainer" className="LikeDislikeUnderline" ref={(ref) => this.like_underline = ref}>
            <img id="LikeButton" className={this.state.like_class} src={this.state.likeIcon} 
                onClick={this.handleLike}  ref={(ref) => this.likebutton = ref} />
            <p ref={(ref) => this.like_count = ref}>{this.state.video.like_count}</p>
        </div>

        <div id="DislikeContainer" className="LikeDislikeUnderline" ref={(ref) => this.dislike_underline = ref}>
            <img id="DislikeButton" className={this.state.dislike_class} src={this.state.dislikeIcon} 
                onClick={this.handleLike} ref={(ref) => this.dislikebutton = ref} />
            <p ref={(ref) => this.dislike_count = ref}>{this.state.video.dislike_count}</p>
        </div>

        <div id="ShareButton">
            <img src={ShareIcon} />
            <p>Share</p>
        </div>

        <div id="AddPlaylistButton">
            <img src={PlaylistAdd} />
            <p>Save</p>
        </div>

        <img id="MoreButton" src={MoreIcon} />

    </div>
</div>
*/

/*
handleLike = (e) =>{
    if(e.target.className == "LikeDislike"){
        if(e.target.id == "LikeButton"){
            e.target.src = ThumbsUpActive;
            e.target.className = "LikeDislikeActive";
            this.like_count.innerText++;
            this.like_underline.className = "LikeDislikeUnderlineActive";

            this.dislikebutton.src = ThumbsDown;
            if(this.dislikebutton.className == "LikeDislikeActive"){
                this.dislike_count.innerText--;
            }
            this.dislikebutton.className = "LikeDislike";
            this.dislike_underline.className = "LikeDislikeUnderline";
            
            
            let post_body = {
                isLike: true,
                liker: this.props.channel.user,
                liked_video: this.state.video.id,
            }
            axios.post("http://127.0.0.1:8000/likeDislike", post_body);
        }
        else{
            e.target.src = ThumbsDownActive;
            e.target.className = "LikeDislikeActive";
            this.dislike_underline.className = "LikeDislikeUnderlineActive"
            this.dislike_count.innerText++;

            this.likebutton.src = ThumbsUp;
            if(this.likebutton.className == "LikeDislikeActive"){
                this.like_count.innerText--;
            }
            this.likebutton.className = "LikeDislike";
            this.like_underline.className = "LikeDislikeUnderline";

            let post_body = {
                isLike: false,
                liker: this.props.channel.user,
                liked_video: this.state.video.id,
            }
            axios.post("http://127.0.0.1:8000/likeDislike", post_body);
        }
    }

    else if(e.target.className == "LikeDislikeActive"){
        e.target.src = e.target.id == "LikeButton" ? ThumbsUp : ThumbsDown;
        e.target.className = "LikeDislike";
        
        if(e.target.id == "LikeButton"){
            this.like_count.innerText--;
            this.like_underline.className = "LikeDislikeUnderline";
        }
        else if(e.target.id == "DislikeButton"){
            this.dislike_count.innerText--;
            this.dislike_underline.className = "LikeDislikeUnderline";
        }

        let post_body = {
            isLike: null,
            liker: this.props.channel.user,
            liked_video: this.state.video.id,
        }
        axios.post("http://127.0.0.1:8000/likeDislike", post_body);
    }
    
}
*/