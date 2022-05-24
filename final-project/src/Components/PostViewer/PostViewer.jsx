import React, { useContext, useEffect, useState } from "react";
import SessionContext from "../../Contexts/SessionContext";
import { useNavigate, useParams } from "react-router";
import LoadingScreen from "../../Static/LoadingScreen";
import FetchPostsHelper from "../../Services/FetchPostsHelper";
import PostNotExists from "../../Static/PostNotExists";
import { BsArrowLeftShort } from "react-icons/bs";
import Content from "./Content/Content";
import AuthHelper from "../../Services/AuthHelper";
import CommentBox from "./CommentBox/CommentBox"

function PostViewer(props) {
  let { id } = useParams();
  const [postLoaded, setPostLoaded] = useState(false);
  const [content, setContent] = useState(<div></div>);
  const loading = <LoadingScreen />;
  const { authenticated } = useContext(SessionContext);
  let navigate = useNavigate();
  const returnHome = ()=>{
    navigate("/home");
  }
  useEffect(() => {
    if (!authenticated.logged) {
      navigate("/");
    } else {
      if (!postLoaded) {
        (async function () {
          let post = await FetchPostsHelper.getPost(id, authenticated.token);
          let user = await AuthHelper.whoami(authenticated.token);
          let favs = await FetchPostsHelper.getFavorites(authenticated.token);
          if (post.fetched && favs.fetched) {
            setContent(
              <div className="w-full min-h-screen flex justify-center bg-loginpattern pb-6">
                <div className="xl:w-2/5 w-10/12 mt-4 flex flex-col gap-y-5">
                  <div>
                    <button onClick={returnHome} className="absolute hover:bg-white rounded-full border-2 border-white ml-4 mt-3 text-white text-2xl hover:text-black text-center hover:border-0">
                      <BsArrowLeftShort />
                    </button>
                    <div>
                      <img className="w-full rounded-lg" src={post.image} alt="post"></img>
                    </div>
                  </div>
                  <Content postId={id} loggedUser={user} currentPost={post} favorites={favs.favorites}/>
                  <CommentBox comments={post.comments} postId={id} />
                </div>
              </div>
            );
          } else {
            setContent(<PostNotExists />);
          }
          setPostLoaded(true);
        })();
      }
    }
  }, [postLoaded]);

  return <>{postLoaded ? content : loading}</>;
}

export default PostViewer;
