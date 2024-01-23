import axiosSecure from "./axiosSecure";

export const saveUserData = async (user) => {
  const { data } = await axiosSecure.post(`/users`, user);
  console.log(data);
  return data;
};
