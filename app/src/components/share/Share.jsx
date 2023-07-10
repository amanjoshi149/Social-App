import React, { useRef } from "react";
import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LabelIcon from "@mui/icons-material/Label";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Share() {
  const { user } = React.useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = React.useState(null);
  
  // const shareInput = document.getElementById("shareInput");

  const submitHandler = async (e) =>{
      e.preventDefault();
      const newPost = {
        userId: user._id,
        desc: desc.current.value,
      };
      if(file){
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name",fileName);
        newPost.img = fileName;
        data.append("file",file);
        try{
          await axios.post("http://localhost:5000/api/upload", data);
          window.location.reload();
        }
        catch(err){
          console.log(err);
        }

      } 

      // console.log(newPost);
      try{
        await axios.post("http://localhost:5000/api/posts", newPost);
        window.location.reload();
      }
      catch(err){
        console.log(err);
      }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/profiledefault.jpg"
            }
            alt=""
          />
          <input
            placeholder={"What is in your mind " + user.username + "?"}
            className="shareInput"
            name="shareInput"
            id="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg"/>
                <CancelIcon className="shareCancelImg" onClick={()=> setFile(null)}/>
          </div> 
        )}
        <form className="shareBottom" onSubmit={submitHandler} >
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>
            <div className="shareOption">
              <LabelIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <LocationOnIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}
