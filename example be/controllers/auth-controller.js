const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../schemas/user-schema");

// Controller to handle individual user signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store the hashed password
    });
    await newUser.save();
    res.status(201).json({ message: "User signup successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare hashed password with provided password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const userDataToSend = {
      _id: user._id,
      username: user.username,
      token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY),
    };

    res.status(200).json({
      message: "Login successful",
      user: userDataToSend,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
