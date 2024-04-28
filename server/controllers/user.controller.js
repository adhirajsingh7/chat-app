const { user_model } = require("../models/user");

exports.get_users = async (req, res, next) => {
  try {
    const response = await user_model.find({});
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.get_user_by_id = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const response = await user_model.findOne({ _id: user_id });
    if (!response) throw new Error("User not found.");
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.create_user = async (req, res, next) => {
  console.log("================================================")
  const user = req.body;
  try {
    const response = await user_model.create(user);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.update_user = async (req, res, next) => {
  const { user_id } = req.params;
  const user = req.body;
  try {
    const response = await user_model.findOneAndUpdate({ _id: user_id }, user);
    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.delete_user = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const response = await user_model.findOneAndDelete({ _id: user_id });
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
