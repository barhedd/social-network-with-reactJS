import { React, useState, useEffect, useContext } from 'react';
import Card from '../Card/Card'
import SearchBar from '../SearchBar/SearchBar';
import Menu from '../Menu/Menu';
import Button from '../../Button/Button';
import PostNotExists from "../../../Static/PostNotExists";

import postsServices from '../../../Services/posts.services'
import SessionContext from '../../../Contexts/SessionContext';
import { useNavigate } from 'react-router';
import AuthHelper from '../../../Services/AuthHelper';
import LoadingScreen from '../../../Static/LoadingScreen';




//Container component for favorites, only purpose is to keep in order all the mess inside

const Favorites = () => {
    const [posts, SetPosts] = useState([]);
    const [page, SetPage] = useState(0);
    const [clear, SetClear] = useState(false);
    const [limit] = useState(15);
    const { authenticated } = useContext(SessionContext);
    let navigate = useNavigate();
    const [content, setContent] = useState(<div></div>);
    const [postLoaded, setPostLoaded] = useState(false);

    const loading = <LoadingScreen />;





    useEffect(() => {
        (async () => {
            if (!authenticated.logged) {
                navigate("/");
            }
            else {
                let user = await AuthHelper.whoami(authenticated.token);
                if (user.role === "admin") {
                    navigate("/admin");
                }
            }
        })();

        const token = authenticated.token;


        if (!postLoaded) {
            (async () => {
                try {


                    const response = await postsServices.getFavorites(token);

                    if (!response["response"]) {
                        console.log(response['error']);
                    }
                    else {
                        //checking that the data has been loaded correctly

                        if (response.response) {
                            if (response['data'].length === 0)
                                SetPage(0)
                            else
                                SetPosts(response['data']);
                        }
                        else {
                            setContent(<PostNotExists />);
                        }

                        setPostLoaded(true);
                    }
                } catch (error) {
                    console.log(error)
                };
            })();
        }

    }, [page, clear, postLoaded]);



    //function that determines the new offset for the page  
    const changeOffset = (amount, sign) => {

        if (sign) {
            return amount + 1
        }
        else {
            if (amount === 0)
                return amount;
            else
                return amount = amount - 1;

        }
    }


    return (<>{postLoaded ? (<main className=" min-w-screen min-h-screen m-0 flex flex-col flex-wrap justify-center justify-items-center content-evenly ">
        <Menu fav={false} />
        <SearchBar searchFunction={SetPosts} clearFunction={SetClear} />
        <div className="min-w-screen   flex flex-row flex-wrap justify-center justify-items-center content-evenly p-20 ">


            {posts.map((post) => {
                return <Card id={post.id} title={post.title} key={post.id} image={post.image} />
            })}

        </div>
        <div className="w-full h-40 flex flex-row justify-center justify-items-center content-evenly ">


            {clear &&
                (<Button localStyle="w-40 h-10 bg-pink-500 m-6 font-normal text-white rounded-md" text="Clear" onClick={(e) => { e.preventDefault(); SetPage(0); SetClear(false); setPostLoaded(false); }} />)}
            {!clear &&
                (<>
                    <Button localStyle="w-40 h-10 bg-pink-500 m-6 font-normal text-white rounded-md" text="Previous" onClick={(e) => { e.preventDefault(); SetPage(changeOffset(page, false)); setPostLoaded(false) }} />
                    <Button localStyle="w-40 h-10 bg-pink-500 m-6 font-normal text-white rounded-md" text="Next" onClick={(e) => { e.preventDefault(); SetPage(changeOffset(page, true)); setPostLoaded(false) }} />
                </>)}
        </div>
        <div className="min-w-screen h-24 bg-loginpattern flex flex-row justify-end p-6">

        </div>
    </main >) : loading}</>);
}

export default Favorites;