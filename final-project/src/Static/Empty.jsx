import { useContext, useEffect, useRef, useState } from "react";
import { GiCat } from "react-icons/gi";
import { useNavigate } from "react-router";
import SessionContext from "../Contexts/SessionContext";
import TempButton from "../Components/PostViewer/TempButton";
import AuthHelper from "../Services/AuthHelper";
import LoadingScreen from "./LoadingScreen";

export default function Empty() {
  const { authenticated, setAuthenticated } = useContext(SessionContext);
  let navigate = useNavigate();
  const userRef = useRef({ username: "", role: "" });
  const [userLoaded, setuserLoaded] = useState(false);
  
  useEffect(() => {
    if (!authenticated.logged) {
      navigate("/");
    } else {
      console.log(authenticated.token);
      (async function () {
        let user = await AuthHelper.whoami(authenticated.token);
        //if request is not ok the token probably expired
        if (user.role === "admin") {
          navigate("/admin");
        }
        if (user.found) {
          userRef.current = user;
          if (userLoaded !== true) {
            console.log(authenticated.token);
            setuserLoaded(true);
          }
        } else {
          logOut();
        }
      })();
    }
  }, [userLoaded]);

  const logOut = () => {
    const emptySession = {
      logged: false,
      token: "",
    };
    setAuthenticated(emptySession);
    localStorage.setItem("login", JSON.stringify(emptySession));
    navigate("/login");
  };
  const emptyContent = (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-y-10 items-center">
        <div>
          <p className="font-styled text-2xl text-purple-500">
            Hello {userRef.current.username}
          </p>
        </div>
        <div className="flex font-round text-gray-800 gap-x-4 justify-center items-center w-full">
          <GiCat className="text-5xl xl:text-6xl" />
          <p className="w-6/12 text-2xl xl:text-5xl">
            Wow! there is nothing here
          </p>
        </div>
        <div>
          <button
            onClick={logOut}
            className="w-28 h-14 bg-indigo-600 hover:bg-indigo-700 font-semibold text-white rounded-xl text-2xl"
          >
            Logout
          </button>
        </div>
        <TempButton />
      </div>
    </div>
  );
  return <>{userLoaded ? emptyContent : LoadingScreen}</>;
}
