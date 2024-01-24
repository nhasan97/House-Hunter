import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showAlertOnError } from "../../utilities/displaySweetAlert";
// import { loginUser } from "../../api/authAPIs";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const [showPass, setShowPass] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //==================== Login Using Email and Password ====================
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: loginUser,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries("loginUser");
      navigate(from, { replace: true });
    },
    onError: (error) => {
      showAlertOnError(error);
    },
  });

  const onSubmit = async (data) => {
    try {
      const user = {
        email: data.email,
        password: data.pass,
      };

      mutation.mutate(user);
    } catch (err) {
      showAlertOnError(err.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[url('src/assets/others/authentication.png')]">
      <div className="max-w-screen-xl mx-auto flex justify-center items-center shadow-xl py-8">
        <div className="w-full px-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 text-left"
          >
            <h1 className="text-[#444] text-[40px] font-semibold text-center">
              Login
            </h1>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#FE7E51] rounded-lg">
                <i className="fa-solid fa-envelope text-xl text-white"></i>
              </div>
              <input
                type="email"
                id="in2"
                {...register("email")}
                placeholder="Email"
                required
                className="input bg-[#fe7f5121] w-full pl-16 rounded-lg border focus:border-[#FE7E51] focus:outline-none"
              />
            </div>

            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#FE7E51] rounded-lg">
                <i className="fa-solid fa-key text-xl text-white"></i>
              </div>

              <input
                type={showPass ? "text" : "password"}
                id="in3"
                {...register("pass")}
                placeholder="Password"
                required
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
            </div>

            <input
              type="submit"
              value="Sign In"
              className="btn w-1/2 mx-auto bg-[#ff0f48] text-lg font-medium text-white hover:text-[#ff0f48] normal-case rounded-lg"
            />
          </form>

          <div className="flex flex-col justify-center items-center gap-4 mt-4">
            <p className="text-lg text-[#444] text-center">
              New here?
              <Link className="font-bold" to="/register">
                Create a New Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
