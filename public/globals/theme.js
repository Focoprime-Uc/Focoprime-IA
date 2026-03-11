// ==============================
// THEME (claro por padrão)
// ==============================
const themeToggleBtn = document.querySelector("#theme-toggle-btn");

const savedTheme = localStorage.getItem("themeColor");

// se não houver nada salvo, assume claro
const isLightTheme = savedTheme !== "dark_mode";

document.body.classList.toggle("light-theme", isLightTheme);
themeToggleBtn.textContent = isLightTheme ? "dark_mode" : "light_mode";

themeToggleBtn.addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light-theme");
  localStorage.setItem("themeColor", isLight ? "light_mode" : "dark_mode");
  themeToggleBtn.textContent = isLight ? "dark_mode" : "light_mode";
});