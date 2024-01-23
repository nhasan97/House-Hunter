import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { uploadImage } from "../../utilities/imageUploader";
import { saveUserData } from "../../api/authAPIs";
import { showAlertOnError } from "../../utilities/displaySweetAlert";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [showPass, setShowPass] = useState(false);
  const roles = ["House Owner", "House Renter"];

  const navigate = useNavigate();

  //==================== Register Using Email and Password ====================

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["createUser"],
    mutationFn: saveUserData,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries("createUser");
      navigate(location?.state ? location.state : "/login");
    },
    onError: (error) => {
      showAlertOnError(error);
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    const imageData = await uploadImage(data.photo[0]);

    try {
      const user = {
        name: data.name,
        role: data.role,
        phone: data.phone,
        email: data.email,
        password: data.pass,
        profileImage: imageData?.data?.display_url,
      };

      mutation.mutate(user);
    } catch (err) {
      showAlertOnError(err.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[url('src/assets/others/authentication.png')]">
      <div className="max-w-screen-xl mx-auto flex justify-center items-center shadow-xl">
        <div className="px-10">
          <form
            className="flex flex-col gap-4 text-left"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-[#444] text-[40px] font-semibold text-center">
              Sign UP
            </h1>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#FE7E51] rounded-lg">
                <i className="fa-solid fa-signature text-xl text-white"></i>
              </div>
              <input
                id="in1"
                type="text"
                {...register("name", { required: true })}
                placeholder="Name"
                className="input bg-[#fe7f5121] w-full pl-16 rounded-lg border focus:border-[#FE7E51] focus:outline-none"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}
            </div>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#FE7E51] rounded-lg">
                <i className="fa-solid fa-user text-xl text-white"></i>
              </div>
              <select
                type="text"
                {...register("role")}
                placeholder="Role"
                required
                className="input bg-[#fe7f5121] w-full pl-16 rounded-lg border focus:border-[#FE7E51] focus:outline-none"
              >
                {roles.map((role) => (
                  <option key={role}>{role}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#FE7E51] rounded-lg">
                <i className="fa-solid fa-phone text-xl text-white"></i>
              </div>
              <input
                id="in1"
                type="text"
                {...register("phone", {
                  required: true,
                  maxLength: 11,
                  pattern: /(?=.*[0-9])/,
                })}
                placeholder="Cell"
                className="input bg-[#fe7f5121] w-full pl-16 rounded-lg border focus:border-[#FE7E51] focus:outline-none"
              />
              {errors.phone?.type === "required" && (
                <p className="text-red-500">Phone number is required</p>
              )}
              {errors.phone?.type === "maxLength" && (
                <p className="text-red-500">
                  Phone number has to be 11 digits long
                </p>
              )}
              {errors.phone?.type === "minLength" && (
                <p className="text-red-500">
                  Phone number has to be 11 digits long
                </p>
              )}
              {errors.phone?.type === "pattern" && (
                <p className="text-red-500">Only numbers are allowed</p>
              )}
            </div>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#FE7E51] rounded-lg">
                <i className="fa-solid fa-envelope text-xl text-white"></i>
              </div>
              <input
                id="in2"
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="input bg-[#fe7f5121] w-full pl-16 rounded-lg border focus:border-[#FE7E51] focus:outline-none"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}
            </div>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#FE7E51] rounded-lg">
                <i className="fa-solid fa-key text-xl text-white"></i>
              </div>
              <input
                id="in3"
                type={showPass ? "text" : "password"}
                {...register("pass", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="Password"
                className="input bg-[#fe7f5121] w-full pl-16 rounded-lg border focus:border-[#FE7E51] focus:outline-none"
              />
              <span
                className=" text-base absolute right-4 translate-y-[50%]"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </span>
              {errors.pass?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.pass?.type === "minLength" && (
                <p className="text-red-500">
                  Password has to be at least 6 characters long
                </p>
              )}
              {errors.pass?.type === "pattern" && (
                <p className="text-red-500">
                  <ul className="list-disc">
                    Password must have at least
                    <li>1 uppercase letter</li>
                    <li>1 lowercase letter</li>
                    <li>1 digit</li>
                    <li>1 special character</li>
                  </ul>
                </p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-base">
                  Pick your profile picture
                </span>
              </label>
              <input
                type="file"
                {...register("photo")}
                className="file-input file-input-bordered w-full"
              />
            </div>

            <input
              type="submit"
              value="Sign Up"
              className="btn w-1/2 mx-auto bg-[#ff0f48] text-lg font-medium text-white hover:text-[#ff0f48] normal-case rounded-lg"
            />
          </form>

          <div className="flex flex-col justify-center items-center gap-4 mt-4">
            <p className="text-lg text-[#444] text-center">
              Already registered?
              <Link className="font-bold" to="/login">
                Go to log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
