import {
  showAlertOnError,
  showAlertOnSuccess,
} from "../utilities/displaySweetAlert";
import axiosSecure from "./axiosSecure";

export const saveUserData = async (user) => {
  const { data } = await axiosSecure.post(`/users`, user);
  console.log(data);

  if (data.error === true) {
    showAlertOnError(data.message);
  } else {
    showAlertOnSuccess("Account created successfully!");
  }
  return data;
};

export const loginUser = async (user) => {
  const { data } = await axiosSecure.post(`/login`, user);

  if (data.error === true) {
    showAlertOnError(data.message);
  } else {
    axiosSecure.post("/jwt", data).then((res) => {
      if (res.data === true) {
        showAlertOnSuccess("Logged in successfully!");
      }
    });
  }
  return data;
};
