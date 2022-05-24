import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import SessionContext from "../../../Contexts/SessionContext";

function LikeCounter(props) {
  const [likes, setLikes] = useState(props.likes);
  const [likeIcon, setLikeIcon] = useState(<AiOutlineHeart />);
  const [likeStyle, setLikeStyle] = useState("text-xl");
  const [liked, setLiked] = useState(false);
  const likeUrl =
    "https://posts-pw2021.herokuapp.com/api/v1/post/like/" + props.postId;
  const likedStyle = "text-xl text-red-500";
  const normalStyle = "text-xl text-black";
  const { authenticated } = useContext(SessionContext);
  const likeHover = () => {
    setLikeIcon(<AiFillHeart />);
  };
  const likeLeave = () => {
    setLikeIcon(<AiOutlineHeart />);
  };
  const noneFunction = () => {};

  const likeClick = async (e) => {
    let request = await fetch(likeUrl, {
      method: "PATCH",
      withCredentials: true,
      headers: { Authorization: `Bearer ${authenticated.token}` },
    });
    if(request.ok){
        let temp = likes;
        if(!liked){
            temp.push({username:props.loggedUser.username});
            setLikes(temp);
            setLiked(true);
        }   
        else{
            temp = temp.filter((item)=>{return item.username !== props.loggedUser.username});
            setLikes(temp);
            setLiked(false);
        }
    }
  };
  
  useEffect(() => {
    for (let usr of likes) {
      if (usr.username === props.loggedUser.username) {
        setLiked(true);
        setLikeStyle(likedStyle);
        setLikeIcon(<AiFillHeart />);
      }
    }
    if (!liked) {
      setLikeStyle(normalStyle);
      setLikeIcon(<AiOutlineHeart />);
      console.log("now should have hover");
    }
  }, [liked]);
  return (
    <div className="flex items-center gap-x-3">
      <button
        className={likeStyle}
        onMouseEnter={liked?noneFunction:likeHover}
        onMouseLeave={liked?noneFunction:likeLeave}
        onClick={likeClick}
      >
        {likeIcon}
      </button>
      <div>
        <p className="font-semibold font-normal text-lg">{likes.length}</p>
      </div>
    </div>
  );
}

export default LikeCounter;
