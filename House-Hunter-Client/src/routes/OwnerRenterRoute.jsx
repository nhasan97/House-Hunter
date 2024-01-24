import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Loading from "../components/shared/Loading";
import useAuth from "../hooks/useAuth";

const OwnerRenterRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (user?.role === "House Owner" || user?.role === "House Renter") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

OwnerRenterRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OwnerRenterRoute;
