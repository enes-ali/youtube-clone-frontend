
let SideBarStateAction = ()=>{
    return{
        type: "SET_SIDEBAR_STATE",
    }
}

let PopupAction = (popupName)=>{

    return{
        type: "ACTIVATE_POPUP",
        popup: popupName,
    }
}

let LoginAction = (data) => {
    return{
        type: "LOGIN",
        data: data,
    };
}

let LogoutAction = () => {
    return{
        type: "LOGOUT",
    }
}

export {SideBarStateAction, PopupAction, LoginAction, LogoutAction};