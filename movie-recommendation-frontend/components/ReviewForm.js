import React from "react";

const ReviewCard = ({ reviewerName, comment, rating, date }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 m-4 border border-gray-200">
      <h3 className="text-lg font-semibold">{reviewerName}</h3>
      <p className="text-gray-600 mt-2">"{comment}"</p>
      <p className="text-yellow-500 mt-2">Rating: ⭐ {rating}/5</p>
      <p className="text-gray-400 text-sm mt-2">Reviewed on: {date}</p>
    </div>
  );
};

export default ReviewCard;
