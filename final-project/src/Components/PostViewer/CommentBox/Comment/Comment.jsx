function Comment(props) {
  const username = props.comment.user !== undefined? props.comment.user.username: 'someone';
  return (
    <div className="flex flex-col">
      <div>
        <span className="font-round font-semibold">{username} said:</span>
      </div>
      <div className="border-l-2 border-gray-700 ml-2 pl-3 mt-1">
        <p className="break-words">{props.comment.description}</p>
      </div>
    </div>
  );
}

export default Comment;
