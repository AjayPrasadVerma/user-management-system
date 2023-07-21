const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user-controller");

router.get("/", getUsers);

router.post("/", auth, addUser);

router.get("/:id", getUser);

router.put("/:id", auth, updateUser);

router.delete("/:id", auth, deleteUser);

module.exports = router;
