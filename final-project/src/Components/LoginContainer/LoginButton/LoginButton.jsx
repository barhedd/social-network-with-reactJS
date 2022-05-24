function LoginButton(props) {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        onClick={props.clickHandler}
        className="cursor-pointer w-28 h-12 bg-lightgreen hover:bg-darkgreen rounded-2xl"
      >
        <label className="cursor-pointer font-bold font-normal text-xl text-white">
          Login
        </label>
      </button>
    </div>
  );
}

export default LoginButton;
