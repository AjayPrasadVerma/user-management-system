import { json } from "react-router-dom";
let url = "http://localhost:8181/users";

export const addUser = async (data, method) => {
  if (method === "PUT") {
    let id = data._id;
    url = "http://localhost:8181/users/" + id;
  }

  try {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (response.status === 422) {
      return responseData;
    }

    if (!response.ok) {
      throw json({ message: "Could not save user." }, { status: 500 });
    }

    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return json({ message: "Could not fetch user." }, { status: 500 });
    } else {
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (id) => {
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

export const deleteUser = async (id) => {
  try {
    const response = await fetch("http://localhost:8181/users/" + id, {
      method: "delete",
    });

    if (!response.ok) {
      throw json({ message: "Could not delete user." }, { status: 500 });
    }
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.log(err);
  }
};
