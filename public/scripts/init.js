async function loadComponent(id, path) {
  const container = document.getElementById(id);
  const response = await fetch(path);
  const html = await response.text();
  container.innerHTML = html;
}

async function initApp() {
  // Carrega componentes
  await loadComponent("header", "components/header.html");
  await loadComponent("userPanelContainer", "components/user-painel.html");
  await loadComponent("appInstallBar", "components/apk.html");
  await loadComponent("sugere", "components/sugestoes.html")
  
  
  // Depois que tudo existir no DOM
  await import("./base.js");
  await import("./sugere.js");
  await import("./apk.js");
  await import("./modelos.js");
}

initApp();
