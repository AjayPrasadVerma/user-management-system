import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import UserPage, { loader as userLoader } from "./pages/User";
import NewUserPage from "./pages/NewUser";
import EditUserPage from "./pages/EditUser";
import RootLayout from "./pages/Root";
import CompanyRootLayout from "./pages/UserRoot";
import UserDetailsPage, {
  loader as userDetailsLoader,
  action as userDeleteAction,
} from "./pages/UserDetails";
import { action as manuplateUserAction } from "./components/UserForm";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { action as logoutAction } from "./util/LogOut";
import { tokenLoader, checkAuthLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: "auth", element: <AuthenticationPage />, action: authAction },
      {
        path: "users",
        element: <CompanyRootLayout />,
        children: [
          {
            index: true,
            element: <UserPage />,
            loader: userLoader,
          },
          {
            path: ":userId",
            id: "user-details",
            loader: userDetailsLoader,
            children: [
              {
                index: true,
                element: <UserDetailsPage />,
                action: userDeleteAction,
              },
              {
                path: "edit",
                element: <EditUserPage />,
                action: manuplateUserAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewUserPage />,
            action: manuplateUserAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
