import { json, redirect } from "react-router-dom";
import AuthFrom from "../components/AuthForm";

const AuthenticationPage = () => {
  return <AuthFrom />;
};

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode");

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  let response;

  if (mode === "login") {
    const authData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    response = await fetch("http://localhost:8181/" + mode, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });
  } else if (mode === "signup") {
    const signupData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      password_confirmation: data.get("password_confirmation"),
    };

    console.log(signupData);

    response = await fetch("http://localhost:8181/" + mode, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const responseData = await response.json();
  const token = responseData.token;

  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expire", expiration.toISOString());

  return redirect("/");
};

export default AuthenticationPage;
