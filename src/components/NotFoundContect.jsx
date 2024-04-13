/*=============================== 
NotFoundContect Component
================================= */

import { PiUserListFill } from "react-icons/pi";
const NotFoundContect = () => {
  return (
    <div className="flex flex-col h-[80vh] items-center justify-center">
      <div>
        <PiUserListFill className="text-white text-7xl" />
      </div>
      <h3 className="text-white text-2xl font-semibold">Contact Not Found</h3>
    </div>
  );
};

export default NotFoundContect;
