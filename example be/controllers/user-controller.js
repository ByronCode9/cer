const User = require("../schemas/user-schema");

// Controller to create a new user
exports.createUser = async (req, res) => {
  try {
    console.log("req arrived in create user", req.body);
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all users
exports.getAllUsers = async (req, res) => {
  try {
    console.log("req arrived in get all users", req.body);
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Controller to get a single user by ID
exports.getUserById = async (req, res) => {
  try {
      console.log("req arrived in get user by id", req.body)
      const user = await User.findById(req.params.userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Controller to update a user by ID
exports.updateUserById = async (req, res) => {
  try {
      console.log("req arrived in update user", req.body);
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};