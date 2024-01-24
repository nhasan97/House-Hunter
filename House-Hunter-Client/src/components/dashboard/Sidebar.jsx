import useAuth from "../../hooks/useAuth";
import { showAlertOnError } from "../../utilities/displaySweetAlert";
import MainLogo from "../shared/MainLogo";
import { useState } from "react";
import OwnerMenu from "./OwnerMenu";
import RenterMenu from "./RenterMenu";
import axiosSecure from "../../api/axiosSecure";

const Sidebar = () => {
  const { user, loading } = useAuth();
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleLogout = () => {
    axiosSecure.post("/logout", user).then((res) => console.log(res.data));
  };

  return (
    <div>
      <div
        className="flex justify-end items-center p-10 md:hidden"
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        open
      </div>
      {/* bg-[#F2F2F2] */}
      <div
        className={`w-64 min-h-screen bg-[url(../public/sidebarBg.png)] bg-no-repeat bg-center bg-cover rounded-r-[36px] absolute md:fixed z-10 md:translate-x-0 ${
          openSidebar
            ? `translate-x-0 transition duration-300 ease-in-out`
            : `-translate-x-full transition duration-300 ease-in-out`
        }`}
      >
        <div className="w-full py-6">
          <MainLogo caller={"d"}></MainLogo>
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-3 ">
          <div className="avatar">
            <div className="w-20 mask mask-hexagon">
              <img src={user?.profileImage} />
            </div>
          </div>
          <h1 className="normal-case text-2xl text-[#FF0F48] font-medium">
            {user?.displayName}
          </h1>
          <p className="normal-case text-lg text-[#a5a5a5]">{user?.email}</p>
        </div>

        <div className="flex flex-col justify items-start text-[#a5a5a5] p-6">
          {user?.role === "House Owner" && <OwnerMenu></OwnerMenu>}
          {user?.role === "House Renter" && <RenterMenu></RenterMenu>}
          <button
            className="btn w-full text-[#FF0F48] text-lg mt-5"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
