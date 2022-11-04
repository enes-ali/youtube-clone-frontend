import React from 'react';
import axios from 'axios';
import "../Styles/Search.css";
import Sidebar from "./Sidebar";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";


class Search extends React.Component{
    
    state = {
        videos: [],
    }

    componentDidMount(){
        let query = this.props.match.params.query;
        let get_params = {
            params:{
                query: query,
            }
        }
        axios.get("http://127.0.0.1:8000/search", get_params).then(
            (res) =>{
                this.setState({
                    videos: res.data,
                });
            }
        );
    }

    render(){
        console.log(this.state.style);
        let jsx = this.state.videos.map(
            (video) => {
                return(
                    <Link to={`/video/${video.id}`} className="SearchVideo">
                        <div className="VideoBoxImageContainer">
                            <img src={video.cover_image} className="SearchVideoCoverImage"/>
                            <div className="VideoBoxVideoLength" style={{right: 20, bottom: 10}} >
                                <span>{video.duration}</span>
                            </div>
                        </div>
                        
                        <div>
                            <p className="SearchVideoTitle">{video.title}</p>
                            <p className="SerachVideoViewCount">{video.view_count} Views • {video.upload_date}</p>
                            <div className="SearchChannelContainer">
                                <img src={video.channel.channel_photo} className="SearchVideoChannelImage"/>
                                <p className="SearchVideoChannel">{video.channel.channel_name}</p>
                            </div>
                            <p className="SeacrhVideoDescription">{video.description.slice(0, 100) + "..."}</p>
                        </div>
                    </Link>
                );
            }
        );

        return(
            <div id="SearchPage">
                <Sidebar />
                
                <div id="SearchResults" style={{marginLeft: this.props.isSidebarActive ? 120 : 260}}>
                    {jsx}
                </div>
                
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        isSidebarActive: state.IsActive.Sidebar,
    };
}

export default connect(mapStateToProps)(Search);