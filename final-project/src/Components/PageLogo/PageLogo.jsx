import candyLogo from "../../Assets/candy_logo.svg";

function PageLogo(props) {
  return (
    <div className="flex md:w-80 md:h64 w64 h-32 justify-evenly items-center mt-4 md:mt-10">
      <div className="md:h-32 md:w-32 h-24 w-24">
        <img src={candyLogo} alt=""></img>
      </div>
      <div className="md:w-40 w-32 h-24">
        <p
          className={`font-styled md:text-5xl text-4xl ${props.fontColor} text-center`}
        >
          Sweet Dreams
        </p>
      </div>
    </div>
  );
}

export default PageLogo;
