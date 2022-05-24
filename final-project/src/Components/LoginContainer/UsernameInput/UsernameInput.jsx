import { FaUserAlt } from "react-icons/fa";
function UsernameInput(props) {
  return (
    <div className="focus-within:ring-2 ring-gray-700 flex items-center bg-gray-200 w-full h-10 p-4 rounded-xl">
      <FaUserAlt />
      <input
        required={true}
        className="ml-4 font-round text-lg outline-none bg-gray-200 w-11/12"
        type="text"
        id="username"
        name="username"
        placeholder="Username"
      />
    </div>
  );
}

export default UsernameInput;
