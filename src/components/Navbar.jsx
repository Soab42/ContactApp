/*=============================== 
Navbar Component
================================= */

import { RiFileList3Fill } from "react-icons/ri";
const Navbar = () => {
  return (
    <div className="my-4 h-[60px] rounded-lg bg-white flex justify-center items-center gap-2 text-xl font-medium">
      <RiFileList3Fill className="text-pink text-4xl" />

      <h1>Contact App</h1>
    </div>
  );
};

export default Navbar;
