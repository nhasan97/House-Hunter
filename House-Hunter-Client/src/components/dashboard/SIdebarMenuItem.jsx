import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const SIdebarMenuItem = ({ icon, menuText, route }) => {
  return (
    <NavLink
      to={route}
      className="flex justify-center items-center gap-3 p-2 text-lg hover:text-[#FF0F48] transition duration-150"
    >
      {icon}
      {menuText}
    </NavLink>
  );
};

SIdebarMenuItem.propTypes = {
  icon: PropTypes.node.isRequired,
  menuText: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};
export default SIdebarMenuItem;
