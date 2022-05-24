import React from "react";
import { useNavigate } from "react-router";
import Button from "../../Button/Button"



const Card = ({ id="", title = "", image = "" }) => {
    let navigate = useNavigate();
    //remember to change the width of the card to full once you start to produce them with the images
    return (
        <>
            <div className=" group w-80 h-80 lg:w-60 lg:h-60  m-4 rounded-xl shadow-lg  bg-cover  " style={{ backgroundImage: `url(${image})` }}>
                <div className="  w-full h-full rounded-xl flex flex-col justify-center  justify-items-center place-content-center gap-4 backdrop-filter group-hover:backdrop-blur-lg transition ease-in duration-500">
                    <p className="text-center m-4 md:m-8 invisible group-hover:visible font-normal font-semibold text-purple-400  overflow-x-hidden">{title}</p>
                    <Button onClick={() => {navigate(`/posts/${id}`)}} localStyle="h-8 rounded-xl invisible group-hover:visible transition bg-purple-400 m-8 text-white font-bold " text="See More" />
                </div>
            </div >
        </>
    )
}


export default Card;