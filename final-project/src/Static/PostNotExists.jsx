import { Link } from "react-router-dom";
import { CgSmileSad } from "react-icons/cg";
import {FaHome} from 'react-icons/fa';
function PostNotExists() {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col bg-gray-100">
      <div className="text-9xl text-indigo-600 mb-10">
        <CgSmileSad />
      </div>
      <div className="font-round xl:text-2xl font-semibold">
        <p>Sorry, the requested post does not exist</p>
        <Link to="/home" className="flex gap-x-3 underline text-gray-600 justify-center text-lg mt-3 items-center"><FaHome/> Go back home</Link>
      </div>
    </div>
  );
}

export default PostNotExists;
