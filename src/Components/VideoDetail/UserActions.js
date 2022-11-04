import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import ThumbsUp from "../../Icons/VideoDetail/thumb_up.svg";
import ThumbsDown from "../../Icons/VideoDetail/thumb_down.svg";
import ThumbsUpActive from "../../Icons/VideoDetail/thumb_up_active.svg";
import ThumbsDownActive from "../../Icons/VideoDetail/thumb_down_active.svg";
import ShareIcon from "../../Icons/VideoDetail/share.svg";
import MoreIcon from "../../Icons/VideoDetail/more_horiz.svg";
import PlaylistAdd from "../../Icons/VideoDetail/playlist_add.svg";
import {withRouter} from 'react-router-dom';




class UserActions extends React.Component{

    state = {
        likeIcon: ThumbsUp,
        like_class: "LikeDislike",
        dislikeIcon: ThumbsDown,
        dislike_class: "LikeDislike",
    }

    componentDidMount(){
        let get_like_body = {
            params:{
                liker: this.props.channel.user,
                liked_video: this.props.video_id,
            }
        }
        axios.get("http://127.0.0.1:8000/likeDislike", get_like_body)
        .then((res) => {

            if(res.data.isLike == true){
                this.setState({
                    likeIcon: ThumbsUpActive,
                    like_class: "LikeDislikeActive",
                });
                this.like_underline.className = "LikeDislikeUnderlineActive";
            }
            else if(res.data.isLike == false){
                this.setState({
                    dislikeIcon: ThumbsDownActive,
                    dislike_class: "LikeDislikeActive",
                });
                this.dislike_underline.className = "LikeDislikeUnderlineActive";
            }

            else{
                this.setState({
                    like_class: "LikeDislike",
                    dislike_class: "LikeDislike",
                });
            }
        });
    }

    handleLike = (e) =>{
        if(this.props.isSigned){

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
                    
                    let headers = {
                        headers:{
                            Authorization: `TOKEN ${this.props.token}`
                        }
                    }
                    let post_body = {
                        isLike: true,
                        liker: this.props.channel.user,
                        liked_video: this.props.video_id,
                    }
                    axios.post("http://127.0.0.1:8000/likeDislike", post_body, headers);
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
                    
                    let headers = {
                        headers:{
                            Authorization: `TOKEN ${this.props.token}`
                        }
                    }
                    let post_body = {
                        isLike: false,
                        liker: this.props.channel.user,
                        liked_video: this.props.video_id,
                    }
                    axios.post("http://127.0.0.1:8000/likeDislike", post_body, headers);
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
                
                let headers = {
                    headers:{
                        Authorization: `TOKEN ${this.props.token}`
                    }
                }
                let post_body = {
                    isLike: null,
                    liker: this.props.channel.user,
                    liked_video: this.props.video_id,
                }
                axios.post("http://127.0.0.1:8000/likeDislike", post_body, headers);
            }
        }

        else{
            this.props.history.push("/login");
        }
    }


    render(){
        return(
            <div id="UserActionsContainer">
                <div id='VideoUserActions'>

                    <div id="LikeContainer" className="LikeDislikeUnderline" ref={(ref) => this.like_underline = ref}>
                        <img id="LikeButton" className={this.state.like_class} src={this.state.likeIcon} 
                            onClick={this.handleLike}  ref={(ref) => this.likebutton = ref} />
                        <p ref={(ref) => this.like_count = ref}>{this.props.like_count}</p>
                    </div>

                    <div id="DislikeContainer" className="LikeDislikeUnderline" ref={(ref) => this.dislike_underline = ref}>
                        <img id="DislikeButton" className={this.state.dislike_class} src={this.state.dislikeIcon} 
                            onClick={this.handleLike} ref={(ref) => this.dislikebutton = ref} />
                        <p ref={(ref) => this.dislike_count = ref}>{this.props.dislike_count}</p>
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
        );
    }
}


function mapStateToProps(state){
    return{
        token: state.Account.token,
        channel: state.Account.channel,
        isSigned: state.Account.isSigned,
    }
}

export default withRouter(connect(mapStateToProps)(UserActions));