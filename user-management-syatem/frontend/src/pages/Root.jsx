import { useEffect } from "react";
import { Outlet, useSubmit, useLoaderData } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { getTokenDuration } from "../util/auth";

const RootLayout = () => {
  const submit = useSubmit();
  const token = useLoaderData();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
