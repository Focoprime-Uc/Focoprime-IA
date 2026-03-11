const openUserPanelBtn = document.getElementById("openUserPanelBtn");
const userGeminiPanel = document.getElementById("userGeminiPanel");
const userGeminiOverlay = document.getElementById("userGeminiOverlay");
const closeUserGemini = document.getElementById("closeUserGemini");
const panelLogoutBtn = document.getElementById("panelLogoutBtn");

openUserPanelBtn.addEventListener("click", async () => {
  userGeminiPanel.classList.add("active");
  userGeminiOverlay.classList.add("active");

  const user = window.auth.currentUser;
  if (!user) return;

  document.getElementById("panelUserEmail").textContent = user.email;
  document.getElementById("panelUserName").textContent =
    user.displayName || "Usuário";

  // 🔥 BUSCAR FOTO DO FIRESTORE
  const userDoc = await getDoc(doc(window.db, "users", user.uid));

  let photo = "images/carta.png";

  if (userDoc.exists() && userDoc.data().photoBase64) {
    photo = userDoc.data().photoBase64;
  } else if (user.photoURL) {
    photo = user.photoURL;
  }

  document.getElementById("panelUserPhoto").src = photo;
});

function closeUserGeminiPanel() {
  userGeminiPanel.classList.remove("active");
  userGeminiOverlay.classList.remove("active");
}

closeUserGemini.addEventListener("click", closeUserGeminiPanel);
userGeminiOverlay.addEventListener("click", closeUserGeminiPanel);

panelLogoutBtn.addEventListener("click", async () => {
  await window.signOut(window.auth);
  closeUserGeminiPanel();
});

// ACTUALIZAR NOME
const editNameBtn = document.getElementById("editNameBtn");
const saveNameBtn = document.getElementById("saveNameBtn");
const panelUserName = document.getElementById("panelUserName");
const panelUserNameInput = document.getElementById("panelUserNameInput");

editNameBtn.addEventListener("click", () => {
  panelUserNameInput.value = panelUserName.textContent;

  panelUserName.style.display = "none";
  editNameBtn.style.display = "none";

  panelUserNameInput.style.display = "inline-block";
  saveNameBtn.style.display = "inline-block";

  panelUserNameInput.focus();
});

saveNameBtn.addEventListener("click", async () => {
  const newName = panelUserNameInput.value.trim();
  if (!newName) return alert("Nome vazio");

  const user = window.auth.currentUser;
  if (!user) return alert("Sem utilizador");

  try {
    await updateProfile(user, {
      displayName: newName
    });

    // 🔥 Força atualizar dados locais
    await user.reload();
    const updatedUser = window.auth.currentUser;

    // ✅ Atualiza UI imediatamente
    panelUserName.textContent = updatedUser.displayName;
    document.getElementById("sidebarUserName").textContent = updatedUser.displayName;
    document.getElementById("userChipName").textContent =
      updatedUser.displayName.split(" ")[0];

    // Atualiza heading principal
    const heading = document.querySelector(".heading");
    if (heading) {
      heading.textContent = "Olá, " + updatedUser.displayName;
    }

    // 🔥 Atualiza system prompt da IA
    if (typeof updateSystemPrompt === "function") {
      updateSystemPrompt(updatedUser.displayName);
    }

    // 🔄 Voltar modo normal
    panelUserName.style.display = "inline-block";
    editNameBtn.style.display = "inline-block";
    panelUserNameInput.style.display = "none";
    saveNameBtn.style.display = "none";

    showToast("Nome atualizado com sucesso!", "success");

  } catch (error) {
    console.error(error);
    showToast("Erro ao atualizar nome", "error");
  }
});

// IMAGEM CHANGE
const panelUserPhoto = document.getElementById("panelUserPhoto");
const photoOptions = document.getElementById("photoOptions");
const viewPhotoOption = document.getElementById("viewPhotoOption");
const uploadPhotoOption = document.getElementById("uploadPhotoOption");
const panelPhotoInput = document.getElementById("panelPhotoInput");
const panelAvatarError = document.getElementById("panelAvatarError");

// 🔥 Mostrar menu ao clicar na foto
panelUserPhoto.addEventListener("click", () => {
  photoOptions.classList.toggle("show");
});

// 👁️ Ver imagem
viewPhotoOption.addEventListener("click", () => {
  const src = panelUserPhoto.src;
  const win = window.open();
  win.document.write(`<img src="${src}" style="width:100%">`);
});

// 📤 Upload imagem
uploadPhotoOption.addEventListener("click", () => {
  panelPhotoInput.click();
});

// 🔥 Validar e converter
panelPhotoInput.addEventListener("change", async () => {
  const file = panelPhotoInput.files[0];
  if (!file) return;

  const maxSize = 1 * 1024 * 1024;

  if (file.size > maxSize) {
    panelAvatarError.classList.add("show");
    panelPhotoInput.value = "";
    return;
  }

  panelAvatarError.classList.remove("show");

  // 🔥 ATIVA LOADER
  avatarLoading.classList.add("active");

  const reader = new FileReader();

  reader.onload = async (e) => {
    const base64 = e.target.result;
    const user = window.auth.currentUser;
    if (!user) return;

    try {
      await updateDoc(doc(window.db, "users", user.uid), {
        photoBase64: base64
      });

      // Atualiza UI
      panelUserPhoto.src = base64;
      document.getElementById("sidebarUserPhoto").src = base64;
      document.getElementById("userPhoto").src = base64;

      currentUserPhoto = base64;

      showToast("Foto atualizada com sucesso!", "success");

    } catch (error) {
      showToast("Erro ao salvar imagem", "error");
    } finally {
      // 🔥 DESATIVA LOADER
      avatarLoading.classList.remove("active");
    }
  };

  reader.readAsDataURL(file);
});

// ADICIONAR ALCUNHA 
const addNicknameBtn = document.getElementById("addNicknameBtn");
const bioInputWrapper = document.getElementById("bioInputWrapper");
const nicknameInput = document.getElementById("nicknameInput");
const saveNicknameBtn = document.getElementById("saveNicknameBtn");
const bioText = document.getElementById("bioText");

// Função para salvar no Firestore
async function saveNickname(nickname) {
  const user = window.auth.currentUser;
  if (!user) return;

  try {
    await updateDoc(doc(db, "users", user.uid), {
      nickname: nickname
    });

    // Atualiza UI
    bioText.textContent = "@" + nickname;
    bioInputWrapper.style.display = "none";
    addNicknameBtn.style.pointerEvents = "none"; // impede clicar de novo
    addNicknameBtn.style.opacity = 0.8;

    // Atualiza prompt da IA
    if (typeof updateSystemPrompt === "function") {
      updateSystemPrompt(user.displayName || "Aluno", nickname);
    }

    showToast("Alcunha guardada!", "success");

  } catch (err) {
    console.error(err);
    showToast("Erro ao guardar alcunha", "error");
  }
}

// Abrir input ao clicar
addNicknameBtn.addEventListener("click", () => {
  bioInputWrapper.style.display = "flex";
  nicknameInput.focus();
});

// Guardar alcunha
saveNicknameBtn.addEventListener("click", () => {
  const nickname = nicknameInput.value.trim();
  if (!nickname) return showToast("Escreva uma alcunha válida", "error");
  saveNickname(nickname);
});

// Permite pressionar Enter
nicknameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") saveNicknameBtn.click();
});

// Carregar alcunha existente ao abrir painel
async function loadNickname() {
  const user = window.auth.currentUser;
  if (!user) return;

  const snap = await getDoc(doc(db, "users", user.uid));
  const data = snap.data();

  if (data?.nickname) {
    bioText.textContent = "@" + data.nickname;
    addNicknameBtn.style.pointerEvents = "none";
    addNicknameBtn.style.opacity = 0.8;
  }
}

// Chamar ao abrir painel
openUserPanelBtn.addEventListener("click", loadNickname);