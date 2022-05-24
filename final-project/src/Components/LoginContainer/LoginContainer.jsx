import PageLogo from "../PageLogo/PageLogo";
import UsernameInput from "./UsernameInput/UsernameInput";
import PasswordInput from "./PasswordInput/PasswordInput";
import LoginButton from "./LoginButton/LoginButton";
import AuthHelper from "../../Services/AuthHelper";
import { useState, useEffect, useContext } from "react";
import AuthError from "./AuthError/AuthError";
import SessionContext from "../../Contexts/SessionContext";
import { useNavigate } from "react-router";

function LoginContainer(props) {
  const [loginFailed, setloginFailed] = useState(false);
  const [errorInfo, setErrorInfo] = useState(<div className="hidden"></div>); //invisible component when there is no error state

  const { authenticated, setAuthenticated } = useContext(SessionContext);

  let navigate = useNavigate();

  let newSession = {};

  useEffect(() => {
    if(authenticated.logged){
      navigate('/home');
    }
  }, [loginFailed]);

  const handleClick = async (e) => {
    let status = await AuthHelper.login(e);
    if (!status.logged) {
      setloginFailed(true);
      let statusError;
      for (let err in status.body) {
        statusError = status.body[err];
      }
      setErrorInfo(<AuthError errorMsg={statusError} />);
    } else {
      newSession = {
        logged: true,
        token: status.token,
      };
      setAuthenticated(newSession);
      setloginFailed(!loginFailed);
    }
  };

  return (
    <div className="h-screen w-screen min-w-full bg-loginpattern bg-no-repeat bg-cover flex items-center justify-center overflow-y-scroll min-h-600">
      <div className="xl:w-4/12 flex-grow-0 w-11/12 pt-2 pb-14 bg-white rounded-2xl flex items-center flex-col justify-start">
        <div className="md:mb-10 mb-4">
          <PageLogo />
        </div>
        <form className="flex flex-col md:w-4/6 sm:w-5/6 gap-10" id="loginForm">
          <UsernameInput />
          <PasswordInput />
          {errorInfo}
          <LoginButton clickHandler={handleClick} />
        </form>
      </div>
    </div>
  );
}

export default LoginContainer;
