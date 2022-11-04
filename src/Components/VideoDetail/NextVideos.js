import React from "react";
import axios from "axios";
import {Link, withRouter} from "react-router-dom";



class NextVideos extends React.Component{
    state = {
        videos: [],
    }

    componentDidMount(){
        axios.get("http://127.0.0.1:8000/").then(
            (res) => {
                this.setState({
                    videos: res.data,
                });
            }
        );
    }

    onVideoClick = (e, video_id) =>{
        this.props.history.push("/redirect");
        setTimeout(()=> this.props.history.push(`/video/${video_id}`), 1);
    }

    render(){

        let videoJsx = this.state.videos.map(
            (video) => {
                return(
                    <div className="NextVideo">

                        <div  className="VideoBoxImageContainer" onClick={(e) => this.onVideoClick(e, video.id)}>
                            <img src={video.cover_image} className="NextVideoCover"/>

                            <div className="VideoBoxVideoLength" style={{right: 10, bottom: 10}} >
                                <span>{video.duration}</span>
                            </div>
                        </div>

                        <div className="VideoDetails">
                            <p className="NextVideoTitle" onClick={(e) => this.onVideoClick(e, video.id)}>{video.title}</p>
                            <Link to={`/channel/${video.channel.user}`}> <p className="NextVideoChannelName">{video.channel.channel_name}</p> </Link>
                            <p className="NextVideoViewCount">16MN views • 4 months ago</p>
                        </div>
                    </div>
                );
            }
        );
    

        return(
            <div id="NextVideoSide">
                {videoJsx}
            </div>
        );
    }
}

export default withRouter(NextVideos);