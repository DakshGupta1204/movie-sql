// controllers/userController.js
const { executeQuery } = require('../config/database');

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
const getUserById = async (req, res) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  const { id } = req.params;
  try {
    const user = await executeQuery(query, [id]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
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
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
