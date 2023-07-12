import UserDetails from "../components/UserDetails";

const UserDetailsPage = () => {
  return <UserDetails />;
};

export default UserDetailsPage;

export async function loader({ params }) {
  const response = await fetch("http://localhost:8181/users/" + params.userId);
  const resData = await response.json();
  return resData;
}
