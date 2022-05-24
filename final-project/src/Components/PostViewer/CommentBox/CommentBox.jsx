import React, { useContext, useState } from "react";
import SessionContext from "../../../Contexts/SessionContext";
import AuthHelper from "../../../Services/AuthHelper";
import Comment from "./Comment/Comment";
import CommentInput from "./CommentInput/CommentInput";
import { useNavigate } from "react-router";

function CommentBox(props) {
  const commentUrl = `https://posts-pw2021.herokuapp.com/api/v1/post/comment/${props.postId}`;
  const [comments, setComments] = useState(props.comments);
  const [incorrectFormat, setIncorrectFormat] = useState(false);
  //const [postedComment, setPostedComment] = useState(false);
  const { authenticated } = useContext(SessionContext);
  let navigate = useNavigate()
  const postButtonClick = async () => {
    let inputBox = document.querySelector("#comment");
    if (inputBox.value.length < 8) {
      setIncorrectFormat(true);
    } else {
      let currentUser = await AuthHelper.whoami(authenticated.token);
      if (currentUser.found) {
        let newComments = [
          ...comments,
          {
            description: inputBox.value,
            user: { username: currentUser.username },
            _id: `${inputBox.value}saloftheearth`,
          },
        ];
        let request = await fetch(commentUrl, {
          method: "PATCH",
          withCredentials: true,
          headers: { Authorization: `Bearer ${authenticated.token}`, "Content-Type": "application/x-www-form-urlencoded" },
          body: `description=${inputBox.value}`
        });
        if (request.ok) {
          inputBox.value = "";
          setComments(newComments);
          setIncorrectFormat(false);
        }
        else{
            navigate("/home");
        }
      }
    }
  };
  let badInput = (
    <p className=" text-red-500 text-sm">
      Comments must have at least 8 characters
    </p>
  );
  return (
    <div className="w-full rounded-xl bg-white flex flex-col py-5 px-3 md:px-7 gap-y-2">
      <div className="ml-2">
        <span className="font-styled text-xl font-medium">Comments</span>
      </div>
      <div>
        <CommentInput commentFunction={postButtonClick} />
      </div>
      {incorrectFormat ? badInput : <></>}
      <hr className="border-1 border-gray-400 mt-2" />
      <div className="flex flex-col gap-y-4">
        {comments.map((item) => {
          return <Comment key={item._id} comment={item} />;
        })}
      </div>
    </div>
  );
}

export default CommentBox;
