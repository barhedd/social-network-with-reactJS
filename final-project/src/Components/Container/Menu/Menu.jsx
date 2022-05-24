import React, { useContext } from "react";
import { GrFavorite } from "react-icons/gr";
import { useNavigate } from "react-router";
import SessionContext from "../../../Contexts/SessionContext";
import Button from "../../Button/Button";

const Menu = ({ fav = false }) => {
  const { setAuthenticated } = useContext(SessionContext);
  let navigate = useNavigate();
  const logOut = () => {
    const emptySession = {
      logged: false,
      token: "",
    };
    setAuthenticated(emptySession);
    localStorage.setItem("login", JSON.stringify(emptySession));
    navigate("/login");
  };

  const Favorites = () => {
    navigate("/favorites");
  }
  const Home = () => {
    navigate("/home");
  }


  if (fav === true) {
    return (
      <div className="min-w-screen h-24 bg-loginpattern flex flex-row justify-center sm:justify-end p-6  u-sm:mb-10 p-6  ">

        <Button
          onClick={Favorites}
          localStyle="bg-pink-500 text-white font-normal font-semibold p-2 w-32 mr-24"
          text="Favorites"
        />

        <Button
          onClick={logOut}
          localStyle="bg-pink-500 text-white font-normal font-semibold p-2 w-32 mr-4"
          text="Logout"
        />
      </div>
    );
  }
  else {
    return (
      <div className="min-w-screen h-24  bg-loginpattern flex flex-row justify-center sm:justify-end p-6  u-sm:mb-10 p-6  ">

        <Button
          onClick={Home}
          localStyle="bg-pink-500 text-white font-normal font-semibold p-2 w-32 mr-24"
          text="Home"
        />

        <Button
          onClick={logOut}
          localStyle="bg-pink-500 text-white font-normal font-semibold p-2 w-32 "
          text="Logout"
        />
      </div>
    );
  }

};

export default Menu;
