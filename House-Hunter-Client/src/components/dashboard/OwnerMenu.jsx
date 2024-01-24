import SIdebarMenuItem from "./SIdebarMenuItem";
import "./Sidebar.css";

const OwnerMenu = () => {
  return (
    <div className="sb flex flex-col justify-center items-start mx-auto">
      <SIdebarMenuItem
        icon={<i className="fa-solid fa-house"></i>}
        menuText="Houses"
        route="/dashboard/display-houses"
      ></SIdebarMenuItem>

      <SIdebarMenuItem
        icon={<i className="fa-solid fa-key"></i>}
        menuText="Bookings"
        route="/dashboard/manage-users"
      ></SIdebarMenuItem>

      <SIdebarMenuItem
        icon={<i className="fa-solid fa-arrow-left"></i>}
        menuText="Back to Site"
        route="/"
      ></SIdebarMenuItem>
    </div>
  );
};

export default OwnerMenu;
