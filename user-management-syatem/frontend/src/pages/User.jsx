import { json, defer, useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import UserList from "../components/UserList";

const UserPage = () => {
  /**
   * accessing the data return by the loader
   * here get the promise data
   */
  const { userList } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading....</p>}>
      <Await resolve={userList}>
        {(resloveData) => <UserList userList={resloveData} />}
      </Await>
    </Suspense>
  );
};

export default UserPage;

/**
 * @description
 * fetching the company data
 *
 */

export const loadUserData = async () => {
  try {
    const response = await fetch("http://localhost:8181/users");
    if (!response.ok) {
      return json({ message: "Could not fetch events." }, { status: 500 });
    } else {
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * returning the data to the useLoaderData() as a promis
 */

export function loader() {
  return defer({
    userList: loadUserData(),
  });
}
