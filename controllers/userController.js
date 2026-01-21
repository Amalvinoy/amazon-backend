const Users = require('../models/users');
const jwt = require('jsonwebtoken');

//register user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;

        // Check user already exists
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create new user
        const newUser = new Users({ username, email, password, phone });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
        console.error("Error during user registration:", error);
    }
};

//login user
exports.loginUser = async (req, res) => {
  console.log("Inside login user");
  const { email, password } = req.body;

  try {
    const existingUser = await Users.findOne({ email });
    console.log("Found user:", existingUser);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (existingUser.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userMail: existingUser.email, role: existingUser.role },
      process.env.jwtKey, 
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      user: existingUser,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};