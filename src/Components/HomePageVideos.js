import React from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import "../Styles/Home.css";


class HomePageVideos extends React.Component{
    
    state = {
        videos: [],
        videosJsx: [],
    }

    componentDidMount(){
        let videos;
        let videosJsx;
        axios.get("http://127.0.0.1:8000/")
        .then((response) => {

            videos = response.data;

            videosJsx = videos.map( (video) => {
                return(
                    <Link to={`/video/${video.id}`} className="VideoBox">

                        <Link to={`/video/${video.id}`} className="VideoBoxImageContainer"> 
                            <img className="VideoBoxCoverImage" src={video.cover_image} alt={video.title} />
                            <div className="VideoBoxVideoLength">
                                <span>{video.duration}</span>
                            </div>
                        </Link>

                        <div className="VideoBoxInfo">
                            <Link to={`/channel/${video.channel.user}`}> <img className="VideoBoxChannelImage" src={video.channel.channel_photo}/> </Link>
                            <div className="VideoBoxTexts">
                                <p className="VideoBoxTitle">{video.title.split(0, 100)}</p>
                                <Link to={`/channel/${video.channel.user}`}> <p className="VideoBoxChannelName">{video.channel.channel_name}</p> </Link>
                                <p className="VideoBoxViews">{video.view_count} Views • {video.upload_date}</p>
                            </div>
                        </div>
                    </Link>
                );
            });

            this.setState({
                videos: videos,
                videosJsx: videosJsx,
            });
        });

    }

    render(){
        return(
            <div id="HomePageVideos" style={{left: this.props.IsSidebarActive ? 74 : 215,}}>
                {this.state.videosJsx}
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        IsSidebarActive: state.IsActive.Sidebar,
    }
}

export default connect(mapStateToProps)(HomePageVideos);


/*
    state = {
        videos: [],
        videosJsx: [],
        video_refs: {},
        image_refs: {},
    }

    onImageHover = (e) =>{
        e.target.style.display = "none";
        
        let id = e.target.id;
        setTimeout(() =>{
            this.state.video_refs[id].style.display = "block";
            this.state.video_refs[id].play();  
        }, 1);

    }

    onMouseLeave = (e) => {
        e.target.style.display = "none";
        e.target.pause();
        this.state.image_refs[e.target.id].style.display = 'block';
    }




    <div style={{width: "100%", height: "65%"}}>
        <Link to={`/video/${video.id}`} className="VideoBoxImageContainer"> 
            <img className="VideoBoxCoverImage" src={video.cover_image} alt={video.title} id={video.id} 
            onMouseOver={this.onImageHover}          
            ref={
                (ref) => {
                    setTimeout(()=>{
                        let id = video.id;
                        this.setState({
                            image_refs:{
                                ...this.state.image_refs,
                                [id]: ref,
                            }
                        });
                    }, 1);
                }}
            />
            <div className="VideoBoxVideoLength">
                <span>{video.duration}</span>
            </div>
        </Link>

        
        <video src={video.video_file} id={video.id} style={{display: "none", width: "100%", height: "100%"}} onMouseLeave={this.onMouseLeave}
        ref={(ref) => {
                setTimeout(()=>{
                    let id = video.id;
                    this.setState({
                        video_refs:{
                            ...this.state.video_refs,
                            [id]: ref,
                        }
                    });
                }, 1);
            }} />
    </div>

*/