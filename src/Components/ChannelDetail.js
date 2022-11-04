import React from 'react';
import {connect} from 'react-redux';
import Sidebar from './Sidebar';
import "../Styles/ChannelDetail.css";
import axios from 'axios';
import Tabs from "./ChannelDetail/Tabs";
import ChannelVideos from "./ChannelDetail/ChannelVideos";


class ChannelDetail extends React.Component{

    state = {
        channel: {},
        videos: [],
        playlists: [],
        isSubscriber: false,
    }

    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/channel/${this.props.match.params.id}`).then(
            (res) => {

                this.setState({
                    channel: res.data.channel,
                    videos: res.data.videos,
                    playlists: res.data.playlists,
                });

                // Check Subscribtion
                if(this.props.isSigned){
                    let get_params = {
                        params:{
                            subscriber: this.props.channel.user, 
                            subscribed_channel: res.data.channel.user,
                        }
                    }
                    axios.get("http://127.0.0.1:8000/subscribe", get_params).then(
                        (res) => {
                            this.setState({
                                isSubscriber: res.data.is_subscribed,
                            });
                        }
                    );
                }

            }
        );
    }

    getSubscribeButton = () => {
        if(this.state.isSubscriber){
            return(
                <button id="SubscribeButtonActive">Subscribe</button>
            );
        }
        else{
            return(
                <button id="SubscribeButton">Subscribe</button>
            );
        }
    }

    render(){
        let getTabs = () => {
            
            let tabs = [
                'HOME', 
                'VIDEOS',
                'PLAYLISTS', 
                'COMMUNITY', 
                'CHANNELS',
                'ABOUT', 
            ];

            return tabs;
        }
    

        return(
            <div>
                    
                <Sidebar />
                
                <div style={{marginLeft: this.props.is_sidebar_active ? 74 : 240, paddingTop: "55px",}}>
                    
                    <img src={this.state.channel.channel_poster} id="ChannelPoster" />

                    <div id="ContentContainer">
                        
                        <div style={{backgroundColor:"rgb(32, 32, 32)", paddingTop: 10, paddingBottom: 10, marginTop: -3}}>

                            <div id="ChannelDetail">

                                <div>
                                    <img src={this.state.channel.channel_photo} id="DetailChannelPhoto"/>

                                    <div>
                                        <p id="DetailChannelName">{this.state.channel.channel_name}</p>
                                        <p id="DeatilSubscriberCount">{this.state.channel.subscriber_count} subscribers</p>
                                    </div>
                                    
                                </div>

                                {this.getSubscribeButton()}
                                
                            </div>
                                
                        </div>

                        <Tabs tabs={getTabs()}/>

                    </div>

                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

                </div>

            </div>
        );
    }
}


function mapStateToProps(state){
    return{
        is_sidebar_active: state.IsActive.Sidebar,
        channel: state.Account.channel,
        isSigned: state.Account.isSigned,
    }
}

export default connect(mapStateToProps)(ChannelDetail);


/*
                {title:'HOME', content:(<div>HOME</div>)},
                {title:'VIDEOS', content:( <ChannelVideos videos={this.state.videos} /> )},
                {title:'PLAYLISTS', content:(<div>Playlists</div>)},
                {title:'COMMUNITY', content:(<div>COMMUNITY</div>)},
                {title:'CHANNELS', content:(<div>CHANNELS</div>)},
                {title:'ABOUT', content:(<div>ABOUT</div>)},
*/