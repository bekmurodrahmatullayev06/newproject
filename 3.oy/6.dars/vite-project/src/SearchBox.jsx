import React from "react";

function SearchBox({ word, setWord, onSearch, loading }) {
  return (
    <div className="search-box">
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Masalan: Achievable, Practice..."
        className="input"
      />
      <button onClick={onSearch} disabled={loading} className="btn">
        {loading ? "Izlanmoqda..." : "Qidirish 🔍"}
      </button>
    </div>
  );
}

export default SearchBox;
