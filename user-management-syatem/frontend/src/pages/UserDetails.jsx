import {
  json,
  defer,
  Await,
  useRouteLoaderData,
  redirect,
} from "react-router-dom";
import UserDetails from "../components/UserDetails";
import { Suspense } from "react";
import { getAuthToken } from "../util/auth";

const UserDetailsPage = () => {
  /**
   * getting data, redurn by the loader
   */
  const { user } = useRouteLoaderData("user-details");

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading....</p>}>
      <Await resolve={user}>
        {(loadedData) => <UserDetails userDetails={loadedData} />}
      </Await>
    </Suspense>
  );
};

export default UserDetailsPage;

/**
 * fetching data through id
 */

export const loadUserData = async (id) => {
  try {
    const response = await fetch("http://localhost:8181/users/" + id);
    if (!response.ok) {
      return json({ message: "Could not fetch data." }, { status: 500 });
    } else {
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    console.log(error);
  }
};

export async function loader({ params }) {
  const id = params.userId;
  return defer({
    user: await loadUserData(id),
  });
}

/**
 * delete Api
 */

export const action = async ({ request, params }) => {
  const token = getAuthToken();

  const id = params.userId;

  const response = await fetch("http://localhost:8181/users/" + id, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Could not delete user." }, { status: 500 });
  }
  return redirect("/users");
};
