import React, { useState } from "react";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import ResultCard from "./components/ResultCard";
import { fetchWordDetails } from "./services/aiService";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!word.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const data = await fetchWordDetails(word);
      setResult(data);
    } catch (error) {
      setResult("Xatolik yuz berdi. Qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Header />
      <SearchBox
        word={word}
        setWord={setWord}
        onSearch={handleSearch}
        loading={loading}
      />
      <ResultCard result={result} />
    </div>
  );
}

export default App;
