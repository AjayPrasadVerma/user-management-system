const jwt = require("jsonwebtoken");
const UserAuth = require("../schema/auth-schema");

let auth = async (req, res, next) => {
  let token;

  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

      // Get user through token
      req.user = await UserAuth.findOne(
        { _id: verifyUser.id },
        { password: 0 }
      );

      next();
    } catch (error) {
      res.status(500).send({ status: "failed", message: error });
    }
  } else {
    res.status(403).send({ status: "failed", message: "Unauthorized User" });
  }
};

module.exports = auth;
