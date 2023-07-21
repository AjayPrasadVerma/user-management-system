# User Management System App

This repository contains the code for a User Management System App built using React for the frontend, Node.js for the backend, and MongoDB for the database and JWT authentication. It provides a RESTful API for performing CRUD (Create, Read, Update, Delete) operations on user details.

## Features

- User Registration:

  - To create an account, the user needs to provide their Name, Email, and Password.

- User Login:

  - For logging in, users need to provide their Email and Password.

- CRUD Operations:

  - After logging in, users can perform CRUD operations on user data.
  - The API endpoints for these operations are located at `/users`.

- JWT authentication:
  - User authentication using JWT (JSON Web Tokens)

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Node.js: A JavaScript runtime environment for server-side development.
- Express.js: A web application framework for Node.js.
- MongoDB: A NoSQL database for storing user details.
- Mongoose: An object modeling library for MongoDB and Node.js.
- JSON Web Tokens (JWT): A standard for secure authentication and authorization.
- Bcrypt: A library for password hashing and salting.

## Requirements

Make sure you have the following installed:

- Node.js (https://nodejs.org)
- MongoDB (https://www.mongodb.com)

## Installation

1. Clone this repository to your local machine.

   ```shell
   git clone https://github.com/your-username/user-management-system.git
   cd user-management-system
   ```

2. Navigate to the project directory.

   ```shell
   cd your-repo
   ```

3. Install the dependencies using npm (Node Package Manager).

   ```shell
   npm install
   ```

4. Configure the environment variables.

   - Create a `.env` file in the root directory.
   - Provide the necessary environment variables:

     ```plaintext
     PORT=3000
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ```

5. Start the application.

   ```shell
   npm start
   ```

6. The application should now be running on `http://localhost:3000`.

## API Documentation

### Authentication

#### Register a User

- **Endpoint:** `POST /signup`
- **Request Body:**

  ```json
  {
    "name": "example",
    "email": "example@gmail.com",
    "password": "secretpassword"
  }
  ```

- **Response:**

  ```json
  {
    "message": "Successfully Signup please login!."
  }
  ```

#### Login

- **Endpoint:** `POST /login`
- **Request Body:**

  ```json
  {
    "username": "example@gmail.com",
    "password": "secretpassword"
  }
  ```

- **Response:**

  ```json
  {
    "token": "<jwt-token>"
  }
  ```

### User Details

#### Get User Details

- **Endpoint:** `GET /users`
- **Response:**

  ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone" : 00000xxxx
    }

  ```

#### Create a User Detail

- **Endpoint:** `POST /users`
- **Request Body:**

  ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone" : 00000xxxx
    }

  ```

- **Response:**

  ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone" : 00000xxxx
    }

  ```

#### Update User:

- **Endpoint:** `PUT /users/:id`
- **Response:**

  ```json
  {
    "name": "Updated Name",
    "email": "updated@example.com",
    "phone": "updatedphone"
  }
  ```

#### Delete a User Detail

- **Endpoint:** `DELETE /users/:id`
- **Response:**

  ```json
  {
    "message": "User deleted successfully."
  }
  ```

## Contribution

Contributions are welcome! If you find any issues or want to enhance the project, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to customize the content according to your project's specific requirements. The `README.md` file serves as a detailed guide for developers to understand your web app, its features, how to install it, and how to use its API endpoints.

Make sure to update the installation steps, API endpoints, and any other relevant information specific to your project.
