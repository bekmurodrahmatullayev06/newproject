import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React, { useState } from "react";

export default function App() {
  
  // 1-qism: Likes Counter State
  
  const [likes, setLikes] = useState(0);

  const handleLike = () => setLikes(likes + 1);
  const handleDislike = () => {
    if (likes > 0) {
      setLikes(likes - 1);
    }
  };
  const handleResetLikes = () => setLikes(0);

  // ----------------------------------------------------
  // 2-qism: Ismni o‘zgartirish (Oddiy tugma bilan)
  // ----------------------------------------------------
  const [name, setName] = useState("Ali");

  const changeName = () => {
    if (name === "Ali") {
      setName("Vali");
    } else {
      setName("Ali");
    }
  };

  
  // 3-qism: Input bilan ishlash
  
  const [inputName, setInputName] = useState("");

  
  // 4-qism: Show / Hide (Ma'lumotlar)
  
  const [showDetails, setShowDetails] = useState(false);

  
  // 5-qism: Light / Dark Mode
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  
  // 6-qism: Online / Offline
  
  const [isOnline, setIsOnline] = useState(true);

  
  // 7-qism: Age Counter
  
  const [age, setAge] = useState(18);

  const increaseAge = () => setAge(age + 1);
  const decreaseAge = () => {
    if (age > 0) {
      setAge(age - 1);
    }
  };

  
  // 8-qism: Favorite
  
  const [isFavorite, setIsFavorite] = useState(false);

  
  // 9-qism: Rasmni almashtirish
  
  const image1 = "https://via.placeholder.com/120/FF5733/FFFFFF?text=User+1";
  const image2 = "https://via.placeholder.com/120/33FF57/FFFFFF?text=User+2";
  const image3 = "https://via.placeholder.com/120/3357FF/FFFFFF?text=User+3";

  const [profileImage, setProfileImage] = useState(image1);

  
  // 10-qism: Card Rangini almashtirish
  
  const [cardColor, setCardColor] = useState("white");

  
  // 11-qism: Oddiy Form (Edit Profile)
  
  const [city, setCity] = useState("Toshkent");

  const [formName, setFormName] = useState("");
  const [formAge, setFormAge] = useState("");
  const [formCity, setFormCity] = useState("");

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (formName) setName(formName);
    if (formAge) setAge(Number(formAge));
    if (formCity) setCity(formCity);

    // Inputlarni tozalash
    setFormName("");
    setFormAge("");
    setFormCity("");
  };

  
  // 12-qism: Reset Profile (Boshlang'ich holatga qaytarish)
  
  const resetAll = () => {
    setLikes(0);
    setName("Ali");
    setInputName("");
    setShowDetails(false);
    setIsDarkMode(false);
    setIsOnline(true);
    setAge(18);
    setIsFavorite(false);
    setProfileImage(image1);
    setCardColor("white");
    setCity("Toshkent");
  };

  // Styles (Oddiy ko'rinish uchun)
  const appStyle = {
    backgroundColor: isDarkMode ? "#222" : "#f0f0f0",
    color: isDarkMode ? "#fff" : "#000",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "sans-serif",
  };

  const cardStyle = {
    backgroundColor: cardColor,
    color: "#000", // Card ichidagi matnlar doim aniq ko'rinishi uchun
    border: "2px solid #ccc",
    borderRadius: "12px",
    padding: "20px",
    maxWidth: "450px",
    margin: "0 auto",
  };

  const sectionStyle = {
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
    marginBottom: "10px",
  };

  return (
    <div style={appStyle}>
      {/* 5-qism: Theme Toggle */}
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <button onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? "🌙 Dark Mode" : "🌞 Light Mode"}
        </button>
      </div>

      {/* 13-qism: Mini Loyiha Card */}
      <div style={cardStyle}>
        <h2>👤 Profile</h2>

        {/* 9-qism: Profile Image */}
        <div style={sectionStyle}>
          <img
            src={profileImage}
            alt="Profil"
            style={{ borderRadius: "50%", width: "120px", height: "120px" }}
          />
          <br />
          <button onClick={() => setProfileImage(image1)}>Image 1</button>
          <button onClick={() => setProfileImage(image2)}>Image 2</button>
          <button onClick={() => setProfileImage(image3)}>Image 3</button>
        </div>

        {/* 2-qism: Ism va o'zgartirish */}
        <div style={sectionStyle}>
          <h3>Salom, {name}!</h3>
          <button onClick={changeName}>Ismni o‘zgartirish</button>
        </div>

        {/* 3-qism: Input bilan ishlash */}
        <div style={sectionStyle}>
          <label>Ism kiriting: </label>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Masalan: Sardor"
          />
          {inputName && <p>Salom, {inputName}!</p>}
        </div>

        {/* 6-qism: Online / Offline */}
        <div style={sectionStyle}>
          <p>{isOnline ? "🟢 Online" : "🔴 Offline"}</p>
          <p>
            {isOnline
              ? "User is currently online"
              : "User is currently offline"}
          </p>
          <button onClick={() => setIsOnline(!isOnline)}>Change Status</button>
        </div>

        {/* 7-qism: Age Counter */}
        <div style={sectionStyle}>
          <p>Age: {age}</p>
          <button onClick={increaseAge}>+</button>
          <button onClick={decreaseAge}>-</button>
          <p>Status: {age < 18 ? "Minor" : "Adult"}</p>
        </div>

        {/* Shahar haqida ma'lumot */}
        <div style={sectionStyle}>
          <p>
            <strong>Shahar:</strong> {city}
          </p>
        </div>

        {/* 4-qism: Show / Hide */}
        <div style={sectionStyle}>
          <h4>Mening ma’lumotlarim</h4>
          <button onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Hide" : "Show"}
          </button>
          {showDetails && (
            <ul>
              <li>Yosh: {age}</li>
              <li>Shahar: {city}</li>
              <li>Kasb: Frontend Dasturchi</li>
            </ul>
          )}
        </div>

        {/* 1-qism: Likes Counter */}
        <div style={sectionStyle}>
          <p>Likes: {likes}</p>
          <button onClick={handleLike}>Like</button>
          <button onClick={handleDislike}>Dislike</button>
          <button onClick={handleResetLikes}>Reset</button>
        </div>

        {/* 8-qism: Favorite */}
        <div style={sectionStyle}>
          <button onClick={() => setIsFavorite(!isFavorite)}>
            {isFavorite ? "❤️ Added to Favorites" : "🤍 Add to Favorites"}
          </button>
        </div>

        {/* 10-qism: Card Rangini almashtirish */}
        <div style={sectionStyle}>
          <p>Card rangi:</p>
          <button onClick={() => setCardColor("white")}>White</button>
          <button onClick={() => setCardColor("lightblue")}>Blue</button>
          <button onClick={() => setCardColor("lightgreen")}>Green</button>
          <button onClick={() => setCardColor("lightyellow")}>Yellow</button>
        </div>

        {/* 11-qism: Oddiy Form */}
        <div style={sectionStyle}>
          <h4>Profilni tahrirlash</h4>
          <form onSubmit={handleSaveProfile}>
            <div>
              <input
                type="text"
                placeholder="Yangi ism"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Yangi yosh"
                value={formAge}
                onChange={(e) => setFormAge(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Yangi shahar"
                value={formCity}
                onChange={(e) => setFormCity(e.target.value)}
              />
            </div>
            <button type="submit" style={{ marginTop: "5px" }}>
              Save
            </button>
          </form>
        </div>

        {/* 12-qism: Reset Profile */}
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <b
            onClick={resetAll}
            style={{
              backgroundColor: "#ff4d4d",
              color: "#fff",
              padding: "8px 12px",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Reset Profile
          </b>
        </div>
      </div>
    </div>
  );
}