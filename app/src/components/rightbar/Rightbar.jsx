import React from "react";
import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img className="rightbarAd" src={`${PF}ad.png`} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u?.id} user={u} />
          ))}
        </ul>
      </>
    );
  };


const ProfileRightbar = ({ user }) => {
    const [friends, setFriends] = React.useState([]);
    const {user:currentUser, dispatch} = React.useContext(AuthContext);

    React.useEffect(() => {
      const getFriends = async () => {
        try {
          const res = await axios.get(
            "http://localhost:5000/api/users/friends/" + user._id
          );
          setFriends(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFriends();
    }, [user._id]);

    const [followed, setFollowed] = React.useState(
      currentUser.followings.includes(user?._id)
    );

    React.useEffect(() => {
      setFollowed(currentUser.followings.includes(user?._id));
    }, [currentUser, user._id]);


    const handleClick = async () => {
      console.log(followed);
      try {
        if(followed)
        {
          await axios.put(`http://localhost:5000/api/users/${user._id}/unfollow`, {userId: currentUser._id});
          dispatch({type:"UNFOLLOW",payload:user._id});
          setFollowed(false);
        }
        else
        {
          await axios.put(`http://localhost:5000/api/users/${user._id}/follow`, {userId: currentUser._id});
          dispatch({ type: "FOLLOW", payload: user._id });
          setFollowed(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? ` Unfollow` : ` Follow`}
            {followed ? <RemoveIcon/> : <AddIcon />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "single"
                : user.relationship === 2
                ? "married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/profiledefault.jpg"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };


export default function Rightbar({ user }) {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar user={user} /> : <HomeRightbar />}
      </div>
    </div>
  );
}
