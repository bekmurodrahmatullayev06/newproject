export const fetchWordDetails = async (word) => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const prompt = `Inglizcha "${word}" so'zini tahlil qil:
1. O'zbekcha ma'nosi
2. A1-A2 darajasida 1 ta oddiy inglizcha misol gap
3. Shu gapning o'zbekcha tarjimasi`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    },
  );

  if (!response.ok) {
    throw new Error("API so'rovida xatolik bo'ldi");
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};
