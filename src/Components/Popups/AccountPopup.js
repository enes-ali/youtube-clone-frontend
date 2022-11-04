import React from 'react';
import {connect} from "react-redux";
import "../../Styles/Popups.css";
import {LogoutAction} from "../../Actions/MainActions";
import {withRouter} from 'react-router-dom';

import SettingsIcon from '../../Icons/Sidebar/settings.svg';
import HelpIcon from '../../Icons/Sidebar/help.svg';
import FeedBackIcon from '../../Icons/Sidebar/feedback.svg';

class AccountPopup extends React.Component{

    handleLogout = (e) => {
        this.props.logout();
        this.props.history.push("/");
    }
    
    render(){
        let currentId = this.props.isActive ? "AccountPopupActive" : "AccountPopup";
        return(
            <div id={currentId} className="BasePopup">
                <div id="AccountInfo">
                    <img src={this.props.account.channel_photo} />
                    <div>
                        <p id="AccountUsername">{this.props.account.channel_name}</p>
                        <p id="AccountEmail">{this.props.account.email}</p>
                    </div>
                </div>

                <div className="SidebarCase">

                    <div className="SidebarIndex">
                        <img src={SettingsIcon}/>
                        <p>Your Channel</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={FeedBackIcon}/>
                        <p>Purchases and memberships</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={HelpIcon}/>
                        <p>Youtube Studio</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={FeedBackIcon}/>
                        <p>Switch Account</p>
                    </div>

                    <div className="SidebarIndex" onClick={this.handleLogout}>
                        <img src={FeedBackIcon}/>
                        <p>Logout</p>
                    </div>

                </div>

                <div className="SidebarCase">

                    <div className="SidebarIndex">
                        <img src={SettingsIcon}/>
                        <p>Apperance: Dark</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={FeedBackIcon}/>
                        <p>Language: English</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={HelpIcon}/>
                        <p>Location: Turkey</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={SettingsIcon}/>
                        <p>Settings</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={FeedBackIcon}/>
                        <p>Your data in youtube</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={HelpIcon}/>
                        <p>Help</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={FeedBackIcon}/>
                        <p>Send Feedback</p>
                    </div>

                    <div className="SidebarIndex">
                        <img src={FeedBackIcon}/>
                        <p>Keyboard Shortcuts</p>
                    </div>

                </div>

            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        isActive: state.IsActive.popups.Account,
        account: state.Account.channel,
    };
}

function mapDispatchToProps(dispatch){
    return{
        logout: () => dispatch(LogoutAction()),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountPopup));