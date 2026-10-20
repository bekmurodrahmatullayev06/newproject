import React from "react";

function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="card">
      <h4 className="card-title">📌 AI Natijasi:</h4>
      <p className="card-text">{result}</p>
    </div>
  );
}

export default ResultCard;
