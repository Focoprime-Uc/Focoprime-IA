(function () {
  const ua = navigator.userAgent.toLowerCase();

  const isWebView =
    ua.includes("wv") ||
    ua.includes("webview") ||
    ua.includes("appcreator") ||
    (!window.chrome && ua.includes("android"));

  const bar = document.getElementById("appInstallBar");
  const closeBtn = document.getElementById("closeAppBar");

  /* Não mostrar dentro do App (WebView) */
  if (isWebView && bar) {
    bar.style.display = "none";
    return;
  }

  /* Fechar temporariamente */
  if (closeBtn && bar) {
    closeBtn.addEventListener("click", () => {
      bar.style.opacity = "0";
      bar.style.transform = "translateY(-10px)";
      bar.style.transition = "0.3s ease";

      setTimeout(() => {
        bar.style.display = "none";
      }, 300);
    });
  }
})();
