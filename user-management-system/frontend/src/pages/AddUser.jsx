import { useSelector } from "react-redux";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import { useState } from "react";

const AddUserPage = () => {
  const [updateUser, setUpdateUser] = useState(null);
  const users = useSelector((state) => state.user.users);

  return (
    <>
      <UserForm
        method={updateUser ? "PUT" : "POST"}
        updateUserData={updateUser}
        setUpdate={setUpdateUser}
      />
      <UserList userList={users} onUpdateUser={setUpdateUser} />
    </>
  );
};
export default AddUserPage;
