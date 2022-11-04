import React from "react";
import "../Styles/Navbar.css";
import YoutubeBrandIcon from "../Icons/Navbar/youtubeBrand.png";
import SearchIcon from "../Icons/Navbar/search.svg";
import AddVideoIcon from "../Icons/Navbar/addVideo.svg";
import AppsIcon from "../Icons/Navbar/apps.svg";
import NotificationsIcon from "../Icons/Navbar/notifications.svg";
import SettingsIcon from "../Icons/Navbar/settings.svg"
import MenuIcon from "../Icons/Navbar/menu.svg";
import LoginButtonIcon from "../Icons/Navbar/loginButton.svg";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {SideBarStateAction, PopupAction} from '../Actions/MainActions';


/* <img src={SearchIcon}/> */

class Navbar extends React.Component{

    menuClick = (e) =>{
        this.props.ActivateSidebar();
    }

    handleIconClick = (e) => {
        let buttonName = e.target.id;
        this.props.ActivatePopup(buttonName);
    }

    getNavButtons(){

        let navButtons;

        if(this.props.isSigned){
            navButtons = (
                <div id="NavRight">
                    <img src={AddVideoIcon} id="AddVideo" onClick={this.handleIconClick}/>
                    <img src={AppsIcon} id="Apps" onClick={this.handleIconClick}/>
                    <img src={NotificationsIcon} id="Notifications" onClick={this.handleIconClick}/>
                    <img id="Account" onClick={this.handleIconClick} src={this.props.channel.channel_photo}/>
                </div>
            );
        }else{
            navButtons = (
                <div id="NavRight">
                    <img src={AddVideoIcon} id="AddVideo" onClick={this.handleIconClick}/>
                    <img src={AppsIcon} id="Apps" onClick={this.handleIconClick}/>
                    <img src={SettingsIcon} id="Settings" onClick={this.handleIconClick}/>
                    <Link to="/login" id='SignInButton'><img src={LoginButtonIcon}/> <p>SIGN IN</p></Link>
                </div>
            );
        }
        return navButtons;
    }

    makeSearch = (e) =>{
        e.preventDefault();
        let query = this.search_input.value;
        this.props.history.push("/redirect");
        setTimeout(() => this.props.history.push(`/search/${query}`), 1);
        
    }

    render(){
        return(
            <nav>
                <div id="NavLeft">
                    <img src={MenuIcon} id="NavMenuButton" onClick={this.menuClick}/>
                    <Link to="/" style={{color:"transparent"}}> <img src={YoutubeBrandIcon} id="NavBrand"/> </Link>
                </div>

                <form id="NavMiddle" onSubmit={this.makeSearch}>
                    <input type="text" placeholder="Search" ref={ref => this.search_input = ref}/>
                    <button id="NavSearchButton"> <img src={SearchIcon}/> </button>
                </form>

                {this.getNavButtons()}

            </nav>
        );
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
        ActivateSidebar: () => dispatch(SideBarStateAction()),
        ActivatePopup: (popupName) => dispatch(PopupAction(popupName)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));