import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Error from "../pages/Error";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import OwnerRenterRoute from "./OwnerRenterRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import RenterRoute from "./RenterRoute";
import OwnerRoute from "./OwnerRoute";
import DisplayHouses from "../pages/Dashboard/DisplayHouses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <OwnerRenterRoute>
          <DashboardLayout></DashboardLayout>
        </OwnerRenterRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "display-houses",
        element: (
          <PrivateRoute>
            <OwnerRoute>{/* <DisplayHouses></DisplayHouses> */}</OwnerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "display-bookings",
        element: (
          <PrivateRoute>
            <RenterRoute>{/* <DisplaySurveys></DisplaySurveys> */}</RenterRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;
