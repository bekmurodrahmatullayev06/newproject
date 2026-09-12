// Elementlarni ushlab olamiz
let rejimTugmasi = document.getElementById("rejim-tugmasi");
let rejimMatni = document.getElementById("rejim-matni");
let tana = document.body;

// Tugma bosilganda ishlaydigan funksiya
rejimTugmasi.onclick = function () {
  // Agar hozir yorug' rejim bo'lsa
  if (tana.classList.contains("yorug-rejim")) {
    tana.classList.remove("yorug-rejim");
    tana.classList.add("tungi-rejim");
    rejimMatni.innerText = " Kunduzgi rejim";
  }
  // Aks holda tungi rejimdan yorug' rejimga o'tadi
  else {
    tana.classList.remove("tungi-rejim");
    tana.classList.add("yorug-rejim");
    rejimMatni.innerText = " Tungi rejim";
  }
};
