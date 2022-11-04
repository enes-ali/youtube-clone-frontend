import React from 'react';
import { Link } from 'react-router-dom';



class ChannelVideos extends React.Component{

    state = {
        
    }

    render(){
        console.log("VIDEOS COMP", this.props.videos);
        let videoJSX = this.props.videos.map(
            (video) => {
                return(
                    <Link to={`/video/${video.id}`} className="ChannelVideo">

                        <div className="ChannelVideoImageContainer">
                            <img src={video.cover_image}  alt={video.title}/>
                            <p>{video.duration}</p>
                        </div>

                        <div className="ChannelViedoInfo">
                            <p className="ChannelVideoTitle">{video.title}</p>
                            <p className="ChannelVideoViews">{video.view_count} • {video.upload_date}</p>
                        </div>

                    </Link>
                );
            }
        );

        return(
            <div>
                {videoJSX}
            </div>
        );
    }
}

export default ChannelVideos;