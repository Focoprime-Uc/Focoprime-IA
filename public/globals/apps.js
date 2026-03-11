// modelo
const appsPage = document.getElementById("appsPage");
const closeAppsPage = document.getElementById("closeAppsPage");
const appsMenuBtn = document.querySelector(".novo-item");

appsMenuBtn.addEventListener("click", () => {
  appsPage.classList.add("active");
  closeMenu(); // fecha sidebar
});

closeAppsPage.addEventListener("click", () => {
  appsPage.classList.remove("active");
});
