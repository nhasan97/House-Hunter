import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Loading from "../components/shared/Loading";
import useAuth from "../hooks/useAuth";

const OwnerRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (user?.role === "House Owner") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

OwnerRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default OwnerRoute;
