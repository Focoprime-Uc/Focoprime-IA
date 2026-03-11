// ABRIR UPGRADE 
const upgradePage = document.getElementById("upgradePage");
const closeUpgradePage = document.getElementById("closeUpgradePage");
const premiumItem = document.querySelector(".premium-item");

premiumItem.addEventListener("click", () => {
  upgradePage.classList.add("active");
});

closeUpgradePage.addEventListener("click", () => {
  upgradePage.classList.remove("active");
});

// GERAR PARTICULAS
const particlesContainer = document.querySelector(".particles");

for (let i = 0; i < 40; i++) {
  const particle = document.createElement("span");
  particle.style.left = Math.random() * 100 + "vw";
  particle.style.animationDuration = 5 + Math.random() * 10 + "s";
  particle.style.opacity = Math.random();
  particlesContainer.appendChild(particle);
}

