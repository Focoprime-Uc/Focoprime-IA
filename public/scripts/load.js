window.addEventListener("load", () => {
  const loader = document.getElementById("ai-loader");

  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("hide");

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);

  }, 800); // tempo mínimo para animação
});

// Alternar views
const loginView = document.getElementById("loginView");
const registerView = document.getElementById("registerView");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const loginTitle = document.getElementById("loginTitle");
const loginSubtitle = document.getElementById("loginSubtitle");

showRegister.addEventListener("click", () => {
  loginView.style.display = "none";
  registerView.style.display = "block";
  loginTitle.textContent = "Criar Conta";
  loginSubtitle.textContent = "Junte-se à FocoPrime";
});

showLogin.addEventListener("click", () => {
  registerView.style.display = "none";
  loginView.style.display = "block";
  loginTitle.textContent = "Bem-vindo à FocoPrime";
  loginSubtitle.textContent = "Entrar com a sua conta";
});

const previewPhoto = document.getElementById("previewPhoto");
const changePhotoBtn = document.getElementById("changePhotoBtn");

changePhotoBtn.addEventListener("click", () => {
  photoInput.click();
});

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      previewPhoto.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});