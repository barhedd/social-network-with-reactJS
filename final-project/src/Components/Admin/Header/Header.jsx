import React, { useContext } from 'react';
import { useNavigate } from "react-router";
import SessionContext from "../../../Contexts/SessionContext";

const Header = () => {
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
    return (
        <div className="min-w-screen h-20 bg-black flex flex-row justify-end p-6">
            <button
                onClick={ logOut }
                className='bg-purple-600 hover:bg-purple-800 text-white font-normal font-semibold rounded px-8'
            >Logout</button>
        </div>
    );
}

export default Header;