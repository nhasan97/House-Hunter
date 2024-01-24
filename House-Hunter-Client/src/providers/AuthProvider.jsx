import PropTypes from "prop-types";
import { createContext, useState } from "react";
import axiosSecure from "../api/axiosSecure";
import {
  showAlertOnError,
  showAlertOnSuccess,
} from "../utilities/displaySweetAlert";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //==================== Register Using Email and Password ====================

  const saveUserData = async (user) => {
    const { data } = await axiosSecure.post(`/users`, user);
    console.log(data);

    if (data.error === true) {
      showAlertOnError(data.message);
    } else {
      showAlertOnSuccess("Account created successfully!");
    }
    setLoading(true);
    return data;
  };

  //==================== Login Using Email and Password ====================
  const loginUser = async (user) => {
    setLoading(true);
    const { data } = await axiosSecure.post(`/login`, user);

    if (data.error === true) {
      showAlertOnError(data.message);
    } else {
      setUser(data);
      axiosSecure.post("/jwt", data).then((res) => {
        if (res.data === true) {
          showAlertOnSuccess("Logged in successfully!");
        }
      });
    }
    setLoading(false);
    return data;
  };
  //==================== Logout User ====================
  // const logoutUser = () => {
  //   setLoading(true);
  //   return signOut(auth);
  // };

  const authInfo = {
    user,
    saveUserData,
    loginUser,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider;
