const User = require("../schema/user-schema");
const { isValidText, isValidEmail } = require("../util/validation");

const addUser = async (req, res) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.name)) {
    errors.name = "Invalid name.";
  }

  if (!isValidEmail(data.email)) {
    errors.email = "Invalid email id.";
  }

  if (!isValidText(data.phone)) {
    errors.phone = "Invalid Phone Number.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the user is failed due to validation errors.",
      errors,
    });
  }

  const newUser = new User(data);

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const userData = await User.find({});
    res.status(200).json(userData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.params.id });
    res.status(200).json(userData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const data = req.body;

    let errors = {};

    if (!isValidText(data.name)) {
      errors.name = "Invalid name.";
    }

    if (!isValidEmail(data.email)) {
      errors.email = "Invalid email id.";
    }

    if (!isValidText(data.phone)) {
      errors.phone = "Invalid Phone Number.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        message: "Updating the user is failed due to validation errors.",
        errors,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const removedUser = await User.findByIdAndRemove(req.params.id);
    res.status(200).json(removedUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
