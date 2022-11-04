import React from 'react';
import {connect} from 'react-redux';
import "../../Styles/Popups.css";


function AppsPopup(props){

    let currentClass = props.isActive ? "AppsPopupActive" : "AppsPopup";

    return(
        <div id={currentClass} className="BasePopup">

        </div>
    );
}


function mapStateToProps(state){
    return{
        isActive: state.IsActive.popups.Apps,
    }
}

export default connect(mapStateToProps)(AppsPopup);