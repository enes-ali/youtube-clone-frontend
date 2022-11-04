import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import {BrowserRouter, Route, Redirect} from "react-router-dom"
import Sidebar from "./Components/Sidebar";
import HomePageVideos from './Components/HomePageVideos';
import VideoDetail from "./Components/VideoDetail";
import AddVideoPopup from './Components/Popups/AddVideoPopup';
import AppsPopup from './Components/Popups/AppsPopup';
import NotificationsPopup from "./Components/Popups/NotificationsPopup";
import SettingsPopup from "./Components/Popups/SettingsPopup";
import AccountPopup from "./Components/Popups/AccountPopup";
import Login from './Components/Login';
import UploadVideo from './Components/UploadVideo';
import Search from "./Components/Search";
import ChannelDetail from "./Components/ChannelDetail";


class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        
        <Navbar />
        <AddVideoPopup />
        <AppsPopup />
        <NotificationsPopup />
        <SettingsPopup />
        <AccountPopup />

        <Route exact path="/" component={Sidebar} />
        <Route exact path="/" component={HomePageVideos} />
        <Route exact path="/video/:id" component={VideoDetail} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/uploadVideo" component={UploadVideo} />
        <Route exact path="/search/:query" component={Search} />
        <Route exact path="/channel/:id/:content" component={ChannelDetail} />

      </BrowserRouter>
    );
  }
}

export default App;