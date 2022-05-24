import { RiLockPasswordFill } from "react-icons/ri";

function PasswordInput(props) {
  return (
    <div className="focus-within:ring-2 ring-gray-700 flex items-center bg-gray-200 w-full h-10 p-4 rounded-xl">
      <RiLockPasswordFill />
      <input
        className="ml-4 font-round text-lg outline-none bg-gray-200 w-11/12"
        type="password"
        id="password"
        name="password"
        placeholder="Password"
      />
    </div>
  );
}

export default PasswordInput;
