import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import AddUserPage from "./pages/AddUser";
import UserDetailsPage, {
  loader as userDetailsLoader,
} from "./pages/UserDetails";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "add-user",
        element: <AddUserPage />,
      },
      {
        path: ":userId",
        element: <UserDetailsPage />,
        loader: userDetailsLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
