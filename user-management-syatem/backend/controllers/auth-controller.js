const UserAuth = require("../schema/auth-schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isValidText, isValidEmail } = require("../util/validation");

// signup
const signupUser = async (req, res) => {
  const { name, email, password, password_confirmation } = req.body;
  const user = await UserAuth.findOne({ email: email });

  if (user) {
    res.status(409).send({ status: "failed", message: "Email already exist" });
  } else {
    if (name && email && password && password_confirmation) {
      if (password === password_confirmation) {
        const hashPassword = await bcrypt.hash(password, 12);
        try {
          const newUser = UserAuth({
            name: name,
            email: email,
            password: hashPassword,
          });

          await newUser.save();

          res.status(201).send({
            status: "Success",
            message: "Account successfully created",
          });
        } catch (error) {
          res.status(500).send({ status: "failed", message: error });
        }
      } else {
        res.status(400).send({
          status: "failed",
          message: "Password and Confirm password not doesn't match",
        });
      }
    } else {
      res
        .status(422)
        .send({ status: "failed", message: "All fields are required" });
    }
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await UserAuth.findOne({ email: email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);

        if (email === user.email && isMatch) {
          // Generate JWT Token
          const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1h",
          });

          res.status(201).send({
            status: "Success",
            message: "Login success",
            token: token,
          });
        } else {
          res
            .status(401)
            .send({ status: "failed", message: "Invalid email or password" });
        }
      } else {
        res
          .status(404)
          .send({ status: "failed", message: "Account doesn't exist" });
      }
    } else {
      res
        .status(422)
        .send({ status: "failed", message: "All fields are required" });
    }
  } catch (error) {
    res.status(500).send({ status: "failed", message: error });
  }
};

module.exports = { signupUser, loginUser };
