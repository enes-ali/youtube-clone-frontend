import React from 'react';
import axios from 'axios';
import "../Styles/UploadVideo.css";
import {connect} from "react-redux";
import ImageIcon from '../Icons/UploadVideo/image.svg';
import UploadIcon from '../Icons/UploadVideo/upload.svg';



class UploadVideo extends React.Component{

    state = {
        channel: this.props.channel,
        title: "",
        video_file: "",
        cover_image: "",
        description: "",
    }

    uploadVideoToServer = (e) => {
        e.preventDefault();
        console.log(this.state);
        
        let postProps = {
            headers:{
                Authorization: `TOKEN ${this.props.token}`,
                'content-type': 'multipart/form-data',
            }
        }

        let formData = new FormData();
        formData.append("channel", this.state.channel)
        formData.append("title", this.state.title)
        formData.append("video_file", this.state.video_file, this.state.video_file.name)
        formData.append("cover_image", this.state.cover_image, this.state.cover_image.name)
        formData.append("description", this.state.description)

        axios.post("http://127.0.0.1:8000/uploadVideo", formData, postProps);
        this.props.history.push("/");
    }

    setInputsToState = (e) =>{
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value,
        });
    }

    handleFileChange = (e) => {
        this.setState({
            [e.target.id]: e.target.files[0],
        });
    }


    render(){
        return(
            <form id='UploadVideoForm'>
                
                <div id="Uploads">
                    <label for="video_file" id="VideoUploadButton">
                        <img src={UploadIcon} />
                        <p>Upload Video</p>
                    </label>
                    <input id="video_file" type="file" placeholder="Video File" onChange={this.handleFileChange} hidden/>

                    <label for="cover_image" id="ImageUploadButton">
                        <img src={ImageIcon} />
                        <p>Upload Cover Image</p>
                    </label>
                    <input id="cover_image" type="file" placeholder="Cover Image" onChange={this.handleFileChange} hidden/>
                </div>
                
                <div id="UploadDescriptionsContainer">

                    <div id='UploadTitleContainer'>
                        <img id="UploadChannelImage" src={this.props.channelPhoto} />
                        <input id="title" type="text" placeholder="Title" onChange={this.setInputsToState}/>
                    </div>
                    

                    <textarea id="description" placeholder="Description" onChange={this.setInputsToState} />

                </div>
                <button id="UploadVideoButton" onClick={this.uploadVideoToServer}>Upload</button>

            </form>
        );
    }
}

function mapStateToProps(state){
    return{
        token: state.Account.token,
        channel: state.Account.channel.user,
        channelPhoto: state.Account.channel.channel_photo,
    };
}

export default connect(mapStateToProps)(UploadVideo);