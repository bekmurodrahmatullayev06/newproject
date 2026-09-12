let form = document.querySelector("form");
let input = document.getElementById("input");
let container = document.querySelector(".item-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addElement(input.value);
});

function addElement(value) {
  container.innerHTML = "";

  container.innerHTML += ` 
    <div class="item">
            <p class="title">${value}</p>
            <button onclick="removeElement(event)" >Delete</button>
        </div>`;

  input.value = "";
}
function removeElement(event) {
  event.target.parentElement.remove();
  console.log(`delete bosildi`);
}
