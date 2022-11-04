import React from 'react';
import {connect} from "react-redux";
import "../../Styles/Popups.css";


function NotificationsPopup(props){

    let currentClass = props.isActive ? "NotificationsPopupActive" : "NotificationsPopup";

    return(
        <div id={currentClass} className="BasePopup">

        </div>
    );
}


function mapStateToProps(state){
    return{
        isActive: state.IsActive.popups.Notifications,
    }
}

export default connect(mapStateToProps)(NotificationsPopup);