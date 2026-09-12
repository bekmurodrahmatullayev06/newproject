// 1. MASSIVLAR VA DASTLABKI O'ZGARUVCHILAR
let students = ["Ali", "Vali"];
let newStudents = [
  "Sardor",
  "Dilnoza",
  "Bekzod",
  "Gulbahor",
  "Jasur",
  "Malika",
  "Shahzoda",
  "Zarina",
  "Diyor",
  "Nilufar",
  "Aziz",
  "Gulshan",
  "Javohir",
  "Kamol",
  "Lola",
  "Murod",
  "Nodira",
  "Otabek",
  "Parvina",
  "Rashid",
  "Said",
  "Toshtemir",
  "Umid",
  "Vasila",
  "Xurshid",
  "Yulduz",
  "Zafar",
];

let colors = ["lightblue", "lightgreen", "khaki", "lightpink"];
let colorIndex = 0;
let clickCount = 0;

// 2. RO'YXATNI YANGILASH FUNKSIYASI
function updateList() {
  let listItems = "";
  for (let i = 0; i < students.length; i = i + 1) {
    listItems = listItems + "<li>" + students[i] + "</li>";
  }
  document.getElementById("studentList").innerHTML = listItems;
}

updateList();

// 3. QO'SHISH VA O'CHIRISH (Sodda ko'rinishda)
document.getElementById("addBtn").addEventListener("click", function () {
  if (newStudents.length > 0) {
    let student = newStudents.shift();
    students.push(student);
    updateList();
    document.getElementById("message").innerText = "";
  } else {
    document.getElementById("message").innerText = "Qo'shish uchun ism qolmadi";
  }
});

document.getElementById("removeBtn").addEventListener("click", function () {
  if (students.length > 0) {
    students.pop();
    updateList();
    document.getElementById("message").innerText = "";
  } else {
    document.getElementById("message").innerText = "Ro'yxat bo'sh";
  }
});

// 4. QIDIRUV QISMI (Alohida funksiyalarsiz, har bir tugma uchun to'g'ridan-to'g'ri)
document.getElementById("searchAliBtn").addEventListener("click", function () {
  if (students.includes("Ali")) {
    let index = students.indexOf("Ali");
    document.getElementById("searchResult").innerText =
      "Ali topildi (tartib raqami: " + index + ")";
  } else {
    document.getElementById("searchResult").innerText = "Ali topilmadi";
  }
});

document.getElementById("searchValiBtn").addEventListener("click", function () {
  if (students.includes("Vali")) {
    let index = students.indexOf("Vali");
    document.getElementById("searchResult").innerText =
      "Vali topildi (tartib raqami: " + index + ")";
  } else {
    document.getElementById("searchResult").innerText = "Vali topilmadi";
  }
});

document
  .getElementById("searchSardorBtn")
  .addEventListener("click", function () {
    if (students.includes("Sardor")) {
      let index = students.indexOf("Sardor");
      document.getElementById("searchResult").innerText =
        "Sardor topildi (tartib raqami: " + index + ")";
    } else {
      document.getElementById("searchResult").innerText = "Sardor topilmadi";
    }
  });

// 5. FON RANGINI O'ZGARTIRISH QISMI
document.getElementById("colorBtn").addEventListener("click", function () {
  document.body.style.backgroundColor = colors[colorIndex];

  colorIndex = colorIndex + 1;
  if (colorIndex === colors.length) {
    colorIndex = 0;
  }

  clickCount = clickCount + 1;
  document.getElementById("counter").innerText = "Bosilgan soni: " + clickCount;
});
