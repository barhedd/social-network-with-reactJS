import { React, useState, useEffect, useContext } from 'react';
import Card from './Card/Card'
import SearchBar from './SearchBar/SearchBar';
import Menu from './Menu/Menu';
import Button from '../Button/Button';
import PostNotExists from "../../Static/PostNotExists";

import postsServices from '../../Services/posts.services'
import SessionContext from '../../Contexts/SessionContext';
import { useNavigate } from 'react-router';
import AuthHelper from '../../Services/AuthHelper';
import LoadingScreen from '../../Static/LoadingScreen';
import { useInfiniteLoading } from '../../CustomHooks/InfiniteLoading'





//Container component, only purpose is to keep in order all the mess inside

const Container = () => {
    const [posts, SetPosts] = useState([]);
    const [page, SetPage] = useState(0);
    const [clear, SetClear] = useState(false);
    const { authenticated } = useContext(SessionContext);
    let navigate = useNavigate();
    const [content, setContent] = useState(<div></div>);
    const [postLoaded, setPostLoaded] = useState(false);


    const loading = <LoadingScreen />;
    const token = authenticated.token;
    const [limit, SetLimit] = useState(15);
    const { loadMoreRef, items, hasMore, loadItems, loadNext, rendered } = useInfiniteLoading({ prevItems: posts, getter: postsServices.getPosts, token: token, limit: limit, page: page })

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

        if (clear && !postLoaded) {
            console.log("Esto era")
        }

        if (!postLoaded) {
            (async () => {
                try {
                    (async () => {
                        const response = await postsServices.getPosts(token, limit, page);
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
                    })();
                } catch (error) {
                    console.log(error)
                };
            })();
        }


        if (hasMore && rendered && !clear) {
            SetPosts(items);
            setPostLoaded(true);
        }



    }, [loadItems, postLoaded, clear]);

    return (<>{postLoaded ? (
        <main className=" min-w-screen min-h-screen m-0 flex flex-col flex-wrap justify-center justify-items-center content-evenly ">
            <Menu />
            <SearchBar searchFunction={SetPosts} clearFunction={SetClear} loading={() => { setPostLoaded() }} />
            <div className="min-w-screen  flex flex-row flex-wrap justify-center justify-items-center content-evenly p-20">
                {posts.map((post) => {
                    return <Card id={post.id} title={post.title} key={post.id} image={post.image} />
                })}

            </div>
            <div className="w-full h-40 flex flex-row justify-center justify-items-center sm:content-evenly ">

                {clear &&
                    (<Button localStyle="w-40 h-10 bg-pink-500 m-6 font-normal text-white rounded-md" text="Clear" onClick={(e) => { e.preventDefault(); SetPage(0); SetClear(false); setPostLoaded(false); }} />)}
                {!clear && hasMore &&
                    (<>
                        <button ref={loadMoreRef} className={""} onClick={() => { loadNext(); }} ></button>
                    </>)}
            </div>
            <div className="min-w-screen h-24 bg-loginpattern flex flex-row justify-end p-6">

            </div>
        </main >) : loading}</>);




}

export default Container;