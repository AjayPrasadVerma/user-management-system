import UserForm from "../components/UserForm";
import { useRouteLoaderData } from "react-router-dom";

const EditUserPage = () => {
  const data = useRouteLoaderData("user-details");
  const userData = data.user;

  return <UserForm userData={userData} method="put" heading="Edit Details" />;
};

export default EditUserPage;
