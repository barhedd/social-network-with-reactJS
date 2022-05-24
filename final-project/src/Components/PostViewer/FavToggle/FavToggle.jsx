import React, { useContext, useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import SessionContext from "../../../Contexts/SessionContext";
function FavToggle(props) {
  const favedStyle = "text-2xl text-yellow-500";
  const normalStyle = "text-2xl text-black";
  const favUrl = `https://posts-pw2021.herokuapp.com/api/v1/post/fav/${props.postId}`;
  const [favIcon, setFavIcon] = useState(<AiOutlineStar />);
  const [favs, setFavs] = useState(props.favorites);
  const [faved, setFaved] = useState(false);
  const [favStyle, setFavStyle] = useState(normalStyle);
  const { authenticated } = useContext(SessionContext);
  const favHover = () => {
    setFavIcon(<AiFillStar />);
  };
  const favLeave = () => {
    setFavIcon(<AiOutlineStar />);
  };
  const favNone = () => {};
  const favClick = async () => {
    let request = await fetch(favUrl, {
      method: "PATCH",
      withCredentials: true,
      headers: { Authorization: `Bearer ${authenticated.token}` },
    });
    if(request.ok){
        let tempFavs = favs;
        if(!faved){
            tempFavs.push(props.postId);
            setFavs(tempFavs);
            setFaved(true);
        }
        else{
            tempFavs = tempFavs.filter(item => {return item !== props.postId});
            setFavs(tempFavs);
            setFaved(false);
        }
    }
  };
   useEffect(()=>{
       console.log(favs);
       for(let f of favs){
           if(f === props.postId){
               setFaved(true);
               setFavStyle(favedStyle);
               setFavIcon(<AiFillStar />);
           }
       }
       if(!faved){
           setFavStyle(normalStyle);
           setFavIcon(<AiOutlineStar />);
       }
   },[faved]);
  return (
    <div className="flex justify-center flex-col items-center">
      <button
        onMouseEnter={faved ? favNone : favHover}
        onMouseLeave={faved ? favNone : favLeave}
        onClick={favClick}
        className={favStyle}
      >
        {favIcon}
      </button>
    </div>
  );
}

export default FavToggle;
