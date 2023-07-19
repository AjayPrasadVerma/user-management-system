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

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
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
              },
            ],
          },
          {
            path: "new",
            element: <NewUserPage />,
            action: manuplateUserAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
