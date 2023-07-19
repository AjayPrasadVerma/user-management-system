import { Outlet } from "react-router-dom";
import UserNavigation from "../components/UserNavigation";

const UserRootLayout = () => {
  return (
    <>
      <UserNavigation />
      <Outlet />
    </>
  );
};

export default UserRootLayout;
