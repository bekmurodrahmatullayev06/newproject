const modal = document.getElementById("modal");
const openBtn = document.getElementById("open-modal-btn");
const closeBtn = document.getElementById("close-modal-btn");

openBtn.onclick = () => (modal.style.display = "block");
closeBtn.onclick = () => (modal.style.display = "none");
