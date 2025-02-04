// controllers/userController.js
const { executeQuery } = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Fetch all users
const getAllUsers = async (req, res) => {
  const query = 'SELECT * FROM users'; // Write the SQL query here
  try {
    const users = await executeQuery(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Fetch user by ID
const getUserByToken = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    const userId = decoded.id; // Extract user ID from token

    const query = "SELECT * FROM users WHERE id = ?";
    const user = await executeQuery(query, [userId]);

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user[0]);
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

//login

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const query = "SELECT * FROM users WHERE email = ?";
    const user = await executeQuery(query, [email]);
    console.log(user);
    if (user.length === 0) {
      return res.status(404).json({ error: "User does not exist" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
      console.log("email", email);
      console.log("password", password);
      return res.status(401).json({ error: "Invalid credentials" });
      
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful", token, fullName: user[0].name });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
    console.log(error);
  }
};

const signupUser = async (req, res) => {
  const { email, password, fullName } = req.body;

  // Validate input fields
  if (!email || !password || !fullName) {
    return res.status(400).json({ error: "Email, password, and full name are required" });
  }

  try {
    // Check if the user already exists
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    const existingUser = await executeQuery(checkUserQuery, [email]);
    console.log("existingUser", existingUser);
    if (existingUser.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user into the database
    const insertUserQuery = "INSERT INTO users (email, password, name) VALUES (?, ?, ?)";
    await executeQuery(insertUserQuery, [email, hashedPassword, fullName]);

    // Generate JWT token
    const user = { email, fullName };
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error registering user" });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const query = 'INSERT INTO users (name, email,password) VALUES (?, ?, ?)';
  try {
    const result = await executeQuery(query, [name, email, password]);
    res.status(201).json({ message: 'User created', id: result.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
  try {
    await executeQuery(query, [name, email, id]);
    res.status(200).json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const query = 'DELETE FROM users WHERE id = ?';
  const { id } = req.params;
  try {
    await executeQuery(query, [id]);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

module.exports = {
  getAllUsers,
  getUserByToken,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  signupUser
};
