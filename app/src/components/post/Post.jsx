import React from 'react'
import './post.css'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from 'axios';
import {format} from 'timeago.js';
// import { Link } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Post({post}) {

  const [like,setLike] = React.useState(post.likes.length);
  const [isLiked,setIsLiked] = React.useState(false);
  const [user, setUser] = React.useState({});
  const {user:currentUser} = React.useContext(AuthContext);

  React.useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id,post.likes]);  

  React.useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);


  const likeHandler = () =>{
      try{
        axios.put("http://localhost:5000/api/posts/"+post._id+"/like",{userId:currentUser._id});

      }
      catch(err){

      }
     setLike(isLiked ? like-1 : like+1);
     setIsLiked(!isLiked);
  }

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={`/profile/${user.username}`}
              style={{ textDecoration: "none" }}
            >
              <img
                className="postProfileImg"
                src={user.profilePicture ? PF+user.profilePicture : PF + "person/profiledefault.jpg"}
                alt=""
              />
            </Link>
              <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="/assets/like.png"
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src="/assets/heart.png"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
