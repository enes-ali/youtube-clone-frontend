
let baseState = {
    Account:{
        isSigned: false,
        token: null,
        channel: {
            channel_photo: null,
            channel_name: null,
        },
    },

    IsActive:{
        Sidebar: false,
        popups: {
            AddVideo: false,
            Apps: false,
            Notifications: false,
            NavProfile: false,
            Settings: false,
            Account: false,
        }
    }
}

function ActivateSidebar(state){
    let currentState = state.IsActive.Sidebar;
    let nextState = !currentState; // ? false : true

    return{
        ...state,
        IsActive: {
            ...state.IsActive,
            Sidebar: nextState,
        }
    }
}

function ActivatePopup(state, popupName){
    let currentState = state.IsActive.popups[popupName];
    let nextState = !currentState; //? false : true

    let oldPopups = {...state.IsActive.popups}
    let closedPopups = Object.keys(oldPopups).forEach( (key) => {
        oldPopups[key] = false;
    });

    return{
        ...state,
        IsActive:{
            ...state.IsActive,
            popups:{
                closedPopups,
                [popupName]: nextState,
            }
        }
    };

}

function LoginReducer(state, data){
    return{
        ...state,
        Account:{
            isSigned: true,
            token: data.token,
            channel: data.channel,
        }
    };
}

function LogoutReducer(state){
    return{
        ...state,
        Account:{
            isSigned: false,
            token: null,
            channel: {
                channel_photo: null,
                channel_name: null,
            },
        },
        
        IsActive:{
            ...state.IsActive,
            popups:{
                ...state.IsActive.popups,
                Account: false,
            }
        },
    };
}

export default function MainReducer(state=baseState, action){

    if(action.type == "SET_SIDEBAR_STATE"){
        return ActivateSidebar(state);
    }

    if(action.type == 'ACTIVATE_POPUP'){
        return ActivatePopup(state, action.popup);
    }

    if(action.type == "LOGIN"){
        return LoginReducer(state, action.data);
    }

    if(action.type == "LOGOUT"){
        return LogoutReducer(state);
    }

    return state;
}