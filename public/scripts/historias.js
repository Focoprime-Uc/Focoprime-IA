const historySearchInput = document.getElementById("historySearch");

historySearchInput.addEventListener("input", () => {
  const query = historySearchInput.value.toLowerCase();

  const items = historyList.querySelectorAll(".history-item");
  let anyVisible = false;

  items.forEach(item => {
    const title = item.querySelector(".history-title").textContent.toLowerCase();
    if (title.includes(query)) {
      item.style.display = "flex";
      anyVisible = true;
    } else {
      item.style.display = "none";
    }
  });

  // Se nada encontrado
  if (!anyVisible) {
    if (!document.getElementById("noResults")) {
      const noRes = document.createElement("div");
      noRes.id = "noResults";
      noRes.style.color = "#fff";
      noRes.style.padding = "12px";
      noRes.style.textAlign = "center";
      noRes.textContent = "Não há resultados para a sua pesquisa.";
      historyList.appendChild(noRes);
    }
  } else {
    const noRes = document.getElementById("noResults");
    if (noRes) noRes.remove();
  }
});
