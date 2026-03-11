const CACHE_NAME = "focoprime-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",

  // CSS internos
  "/estilos/header.css",
  "/estilos/modelos.css",
  "/estilos/estilos.css",
  "/estilos/historias.css",
  "/estilos/upgrade.css",
  "/estilos/login.css",
  "/estilos/sidebar.css",
  "/estilos/promo.css",
  "/estilos/codebloco.css",
  "/estilos/userpainel.css",

  // JS internos
  "/scripts/init.js",
  "/scripts/load.js",
  "/scripts/apk.js",
  "/scripts/historias.js",

  // imagens importantes
  "/images/favicon.png",
  "/images/Logo.png",
  "/images/entrada.png",
  "/images/user-placeholder.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
