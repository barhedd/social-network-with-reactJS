import React from "react";

function CommentInput(props) {
  return (
    <div className="w-full flex lg:gap-x-3 lg:gap-y-0 gap-y-4 text-sm md:text-lg flex-col lg:flex-row items-center">
      <div className="w-full bg-gray-300 rounded-2xl flex  justify-center">
        <textarea
          className="w-11/12 resize-none bg-transparent font-round my-3 outline-none"
          name="comment"
          id="comment"
          rows="2"
          placeholder="Leave a comment..."
        ></textarea>
      </div>
      <button onClick={props.commentFunction} className="bg-lightgreen hover:bg-darkgreen text-white font-round font-bold px-3 py-2 rounded-xl w-5/12 sm:w-4/12 md:w-auto lg:text-sm lg:py-2 lg:px-4">
        Respond
      </button>
    </div>
  );
}

export default CommentInput;
