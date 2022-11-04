import React from 'react';
import {connect} from 'react-redux';
import "../../Styles/Popups.css";


function SettingsPopup(props){

    let currentID = props.isActive ? "SettingsPopupActive" : "SettingsPopup";

    return(
        <div id={currentID} className="BasePopup">

        </div>
    );
}

function mapStateToProps(state){
    return{
        isActive: state.IsActive.popups.Settings,
    }
}

export default connect(mapStateToProps)(SettingsPopup);