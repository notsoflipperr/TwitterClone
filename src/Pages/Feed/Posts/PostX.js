


import React, { useEffect } from "react";
import "./Posts.css";
import { Avatar } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import useLoggedInUser from '../../../Hooks/useLoggedInUser';



function Post({ p }) {

  const [loggedInUser] = useLoggedInUser();

  const { name, username, photo, post, profilePhoto, prof, email } = p;

  useEffect(() => {
    console.log({email});
    console.log(loggedInUser[0]?.email);
  }, [])
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src={profilePhoto} />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>{name}{" "}
              <span className="post__headerSpecial">
                <VerifiedUserIcon className="post__badge" /> @{username}
              </span>
            </h3>
          </div>
            {
              //If condition to show or not
            }
          {
            (prof && loggedInUser[0]?.email !== email) ?
              <></> : 
              <div className="post__headerDescription">
                <p>{post}</p>
              </div>
          }
        </div>
        {
          (prof && loggedInUser[0]?.email !== email) ?
            <div className="private_head">
              <span>These Posts are Protected</span>
              <span>Only confirmed followers have access to @{username}'s posts and complete profile.</span>
            </div> :
            <div>
              <img src={photo} className="imgbr" alt="" /> 
              <div className="post__footer">
                <ChatBubbleOutlineIcon className="post__footer__icon" fontSize="small" />
                <RepeatIcon className="post__footer__icon" fontSize="small" />
                <FavoriteBorderIcon className="post__footer__icon" fontSize="small" />
                <PublishIcon className="post__footer__icon" fontSize="small" />
              </div>    
            </div>
        }
        
      </div>
    </div>
  );
}


export default Post;