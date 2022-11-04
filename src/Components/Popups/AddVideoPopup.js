import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import "../../Styles/Popups.css";
import VideoIcon from '../../Icons/Popups/AddPopup/video.svg'
import LiveIcon from '../../Icons/Popups/AddPopup/live.svg'


function AddVideoPopup(props){

    let isActive = props.IsActive ? "AddVideoPopupActive" : "AddVideoPopup";

    return (
        <div id={isActive} className="BasePopup">

            <Link to={props.isSigned ? "/uploadVideo" : "/login"} className="PopupIndex">
                <img src={VideoIcon}/>
                <p>Add Video</p>
            </Link>

            
            <div className="PopupIndex">
                <img src={LiveIcon}/>
                <p>Go Live</p>
            </div>
        </div>
    );
}

function mapStateToProps(state){
    return{
        IsActive: state.IsActive.popups.AddVideo,
        isSigned: state.Account.isSigned,
    }
}

export default connect(mapStateToProps)(AddVideoPopup);