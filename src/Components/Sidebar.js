import React from 'react';
import {connect} from "react-redux";
import "../Styles/Sidebar.css";
import HomeIcon from '../Icons/Sidebar/home.svg';
import TrendIcon from '../Icons/Sidebar/trend.svg';
import SubsIcon from '../Icons/Sidebar/subscriptions.svg';

import DownArrowIcon from '../Icons/Sidebar/downArrow.svg';
import FeedBackIcon from '../Icons/Sidebar/feedback.svg';
import GamingIcon from '../Icons/Sidebar/gaming.svg';
import HelpIcon from '../Icons/Sidebar/help.svg';
import HistoryIcon from '../Icons/Sidebar/history.svg';
import LiveIcon from '../Icons/Sidebar/live.svg';
import PlayListICon from '../Icons/Sidebar/playlist.svg';
import PremiumIcon from '../Icons/Sidebar/premium.svg';
import ReportHistoryIcon from '../Icons/Sidebar/reportHistory.svg';
import SettingsIcon from '../Icons/Sidebar/settings.svg';
import VideoLiblaryIcon from '../Icons/Sidebar/videoLibrary.svg';
import VideoCallIcon from '../Icons/Sidebar/videoCall.svg';
import WatchLaterIcon from '../Icons/Sidebar/watchLater.svg';
import YourVideosIcon from '../Icons/Sidebar/yourVideos.svg';
import AddVideoIcon from "../Icons/Navbar/addVideo.svg";
import LoginButtonIcon from "../Icons/Navbar/loginButton.svg";
import {Link, NavLink} from 'react-router-dom';
import axios from 'axios';


class Sidebar extends React.Component{

    state = {
        subscriptions:[],
    }

    componentDidMount(){
        let get_params = {
            params:{
                channel_id: this.props.channel.user
            }
        }
        axios.get("http://127.0.0.1:8000/getSubscriptions", get_params).then(
            (res) => {
                this.setState({
                    subscriptions: res.data,
                });
            }
        );
    }

    getSubscriptions = () =>{
        let subJsx = this.state.subscriptions.map(
            (subscription) => {
                console.log(this.state.subscriptions);
                let channel = subscription.subscribed_channel;
                return(
                    <div className="SidebarIndex">
                        <img src={channel.channel_photo} className="SidebarChannelImage"/>
                        <p>{channel.channel_name}</p>
                    </div>
                );
            }
        );
        return subJsx;
    }

    getSideBar(){
        let sidebar;
        if(this.props.isSigned){
            sidebar = (
                <div id={this.props.IsActive}>

                    <div className="SidebarCase">

                        <NavLink exact to="/" activeClassName="ActiveSidebarIndex" className="SidebarIndex">
                            <img src={HomeIcon}/>
                            <p>Home</p>
                        </NavLink>

                        <NavLink exact to="/trends" activeClassName="ActiveSidebarIndex" className="SidebarIndex">
                            <img src={TrendIcon}/>
                            <p>Trends</p>
                        </NavLink>

                        <NavLink exact to="/subscriptions" activeClassName="ActiveSidebarIndex" className="SidebarIndex">
                            <img src={SubsIcon}/>
                            <p>Subscriptions</p>
                        </NavLink>

                    </div>

                    <div className="SidebarCase">

                        <div className="SidebarIndex">
                            <img src={VideoLiblaryIcon}/>
                            <p>Library</p>
                        </div>

                        <div className="SidebarIndex">
                            <img src={HistoryIcon}/>
                            <p>History</p>
                        </div>

                        <div className="SidebarIndex">
                            <img src={YourVideosIcon}/>
                            <p>Your Videos</p>
                        </div>

                        <div className="SidebarIndex">
                            <img src={WatchLaterIcon}/>
                            <p>Watch Later</p>
                        </div>

                        <div className="SidebarIndex">
                            <img src={PlayListICon}/>
                            <p>All Videos In Order</p>
                        </div>

                        <div className="SidebarIndex">
                            <img src={DownArrowIcon}/>
                            <p>Show More</p>
                        </div>

                    </div>

                    <div className="SidebarCase">
                        <p className="SidebarCaseTitle">SUBSCRIPTIONS</p>
                        
                        {this.getSubscriptions()}

                    </div>

                    <div className="SidebarCase">
                        <p className="SidebarCaseTitle">YOUTUBE'DAN DAHA FAZLA İÇERİK</p>

                        <div className="SidebarIndex">
                            <img src={PremiumIcon}/>
                            <p>Youtube Premium</p>
                        </div>

                        <div className="SidebarIndex">
                            <img src={GamingIcon}/>
                            <p>Gameing</p>
                        </div>

                        <div className="SidebarIndex">
                            <img src={LiveIcon}/>
                            <p>Live</p>
                        </div>

                    </div>

                    <div className="SidebarCase">
                        <div className="SidebarIndex">
                            <img src={SettingsIcon}/>
                            <p>Settings</p>
                        </div>

                        <div className="SidebarIndex">
                            <img src={FeedBackIcon}/>
                            <p>Report History</p>
                        </div>

                        <div className="SidebarIndex">
                            <img src={HelpIcon}/>
                            <p>Help</p>
                        </div>

                        <div className="SidebarIndex">
                            <img src={FeedBackIcon}/>
                            <p>Send Feedback</p>
                        </div>

                    </div>


                    <div id="SidebarMiniCase">

                        <NavLink exact to="/" activeClassName="ActiveSidebarIndex" className="SidebarMiniIndex">
                            <img src={HomeIcon}/>
                            <p>Home</p>
                        </NavLink>

                        <NavLink exact to="/trends" activeClassName="ActiveSidebarIndex" className="SidebarMiniIndex">
                            <img src={TrendIcon}/>
                            <p>Trends</p>
                        </NavLink>

                        <NavLink exact to="/subscriptions" activeClassName="ActiveSidebarIndex" className="SidebarMiniIndex">
                            <img src={SubsIcon}/>
                            <p>Subscriptions</p>
                        </NavLink>

                        <NavLink exact to="/library" activeClassName="ActiveSidebarIndex" className="SidebarMiniIndex">
                            <img src={VideoLiblaryIcon}/>
                            <p>Library</p>
                        </NavLink>
                    </div>
                    <br/><br/>
                </div>
            );
        }
        
        
        
        else{
            sidebar = (
                <div id={this.props.IsActive}>

                <div className="SidebarCase">

                    <NavLink exact to="/" activeClassName="ActiveSidebarIndex" className="SidebarIndex">
                        <img src={HomeIcon}/>
                        <p>Home</p>
                    </NavLink>

                    <NavLink exact to="/trends" activeClassName="ActiveSidebarIndex" className="SidebarIndex">
                        <img src={TrendIcon}/>
                        <p>Trends</p>
                    </NavLink>

                    <NavLink exact to="/subscriptions" activeClassName="ActiveSidebarIndex" className="SidebarIndex">
                        <img src={SubsIcon}/>
                        <p>Subscriptions</p>
                    </NavLink>

                </div>

                <div className="SidebarCase">

                    <div className="SidebarIndex">
                        <img src={VideoLiblaryIcon}/>
                        <p>Library</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={HistoryIcon}/>
                        <p>History</p>
                    </div>

                </div>

                <div id="SidebarLogin">
                    <p>Sign in to like videos,</p>
                    <p>comment, and subscribe.</p>
                    <Link to="/login" id='SignInButton'><img src={LoginButtonIcon}/> <p>SIGN IN</p></Link>
                </div>

                <div className="SidebarCase">
                    <p className="SidebarCaseTitle">BEST OF YOUTUBE</p>

                    <div className="SidebarIndex">
                        <img src={AddVideoIcon}/>
                        <p>Music</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={DownArrowIcon}/>
                        <p>Sports</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={AddVideoIcon}/>
                        <p>Gaming</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={AddVideoIcon}/>
                        <p>News</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={AddVideoIcon}/>
                        <p>Live</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={AddVideoIcon}/>
                        <p>360 Video</p>
                    </div>
                </div>

                <div className="SidebarCase">
                    <div className="SidebarIndex">
                        <img src={PremiumIcon}/>
                        <p>Browse Channels</p>
                    </div>
                </div>

                <div className="SidebarCase">
                    <p className="SidebarCaseTitle">YOUTUBE'DAN DAHA FAZLA İÇERİK</p>

                    <div className="SidebarIndex">
                        <img src={PremiumIcon}/>
                        <p>Youtube Premium</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={LiveIcon}/>
                        <p>Live</p>
                    </div>

                </div>

                <div className="SidebarCase">
                    <div className="SidebarIndex">
                        <img src={SettingsIcon}/>
                        <p>Settings</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={FeedBackIcon}/>
                        <p>Report History</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={HelpIcon}/>
                        <p>Help</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={FeedBackIcon}/>
                        <p>Send Feedback</p>
                    </div>

                </div>


                <div id="SidebarMiniCase">

                    <NavLink exact to="/" activeClassName="ActiveSidebarIndex" className="SidebarMiniIndex">
                        <img src={HomeIcon}/>
                        <p>Home</p>
                    </NavLink>

                    <NavLink exact to="/trends" activeClassName="ActiveSidebarIndex" className="SidebarMiniIndex">
                        <img src={TrendIcon}/>
                        <p>Trends</p>
                    </NavLink>

                    <NavLink exact to="/subscriptions" activeClassName="ActiveSidebarIndex" className="SidebarMiniIndex">
                        <img src={SubsIcon}/>
                        <p>Subscriptions</p>
                    </NavLink>

                    <NavLink exact to="/library" activeClassName="ActiveSidebarIndex" className="SidebarMiniIndex">
                        <img src={VideoLiblaryIcon}/>
                        <p>Library</p>
                    </NavLink>
                </div>
                <br/><br/>
            </div>
            );
        }

        return sidebar;
    }


    render(){
        return this.getSideBar();
    }
}

function mapStateToProps(state, oldProps){
    return{
        IsActive: state.IsActive.Sidebar ? "SidebarActive" : "Sidebar",
        isSigned: state.Account.isSigned,
        channel: state.Account.channel,
    }
}

function mapDispatchToProps(dispatch){
    return{

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)