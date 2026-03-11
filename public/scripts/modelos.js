// ===== MODEL MODAL =====

const modelModal = document.getElementById("modelModal");
const favorite = document.getElementById("favorite");

// abrir popup ao clicar no botão
favorite.addEventListener("click", () => {
  modelModal.classList.add("show");
});

// fechar clicando fora
modelModal.addEventListener("click", (e) => {
  if (e.target === modelModal) {
    modelModal.classList.remove("show");
  }
});

// selecionar modelo
document.querySelectorAll(".model-item").forEach(item => {
  item.addEventListener("click", async () => {

    const selectedModel = item.dataset.model;

    // 🔒 BLOQUEIO
    if (selectedModel === "v5.0" && userPlan !== "premium") {
      alert("🚀 O modelo v5.0 é exclusivo para Premium.");
      return;
    }

    currentModel = selectedModel;

    const user = window.auth.currentUser;
    if (user) {
      await loadUserUsage(user);
    }

    updateUsageDisplay();
    modelModal.classList.remove("show");
  });
});
