const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
  movie_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  review: { type: DataTypes.TEXT },
  rating: { type: DataTypes.INTEGER },
});

module.exports = Review;
