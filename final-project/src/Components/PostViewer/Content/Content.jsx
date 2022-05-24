import FavToggle from "../FavToggle/FavToggle";
import LikeCounter from "../LikeCounter/LikeCounter";

function Content(props) {
  const currentPost = props.currentPost;
  const createdDate = new Date(currentPost.createdAt);
  return (
    <div className="shadow border border-gray-200 bg-white rounded-md w-full flex md:justify-around flex-col-reverse justify-end md:flex-row">
      <div className="md:w-3/4 py-5 px-7">
        <div className="flex items-center">
          <div className="pr-2 border-r border-gray-400 w-8/12 md:w-auto">
            <h2 className="font-bold text-gray-800 font-round text-lg break-words">
              {currentPost.title}
            </h2>
          </div>
          <div className="ml-2">
            <p className="font-medium text-gray-400">Created: {createdDate.toLocaleDateString("short")}</p>
          </div>
        </div>
        <div className="mt-4 w-full">
          <p>{currentPost.description}</p>
          <p className="text-sm font-light text-gray-300 mt-3">Post by: {currentPost.user.username}</p>
        </div>
      </div>
      <div className="md:w-1/4 h-full flex justify-evenly items-center mt-3 md:mt-0">
        <LikeCounter postId={props.postId} loggedUser={props.loggedUser} likes={currentPost.likes} />
        <FavToggle favorites={props.favorites} postId={props.postId} />
      </div>
    </div>
  );
}

export default Content;
