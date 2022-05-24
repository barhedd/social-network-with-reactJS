import { React, useContext, useEffect } from "react";
import SessionContext from '../../Contexts/SessionContext';
import { renderMatches, useNavigate } from 'react-router';
import AuthHelper from '../../Services/AuthHelper';
import useResize from "../../CustomHooks/ResizeHook";


const Crossroad = () => {
    const [height, width] = useResize();
    const breakpointMobile = 768;
    const { authenticated } = useContext(SessionContext);

    let navigate = useNavigate();

    useEffect(() => {
        const redirect = async () => {
            if (!authenticated.logged) {
                navigate("/");
            }
            else {
                let user = await AuthHelper.whoami(authenticated.token);
                if (user.role === "admin") {
                    navigate("/admin");
                }
                else if (user.role === "user") {
                    //Chencking which site to load, if mobile or desktop
                    if (width >= breakpointMobile)
                        navigate("/main");
                    else
                        navigate("/mobile");
                }
            }
        };

        redirect()
    }, [])

    return null;
}


export default Crossroad;