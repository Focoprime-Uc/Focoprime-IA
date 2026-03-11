window.loadComponent = async function (id, file) {
  try {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch (err) {
    console.error("Erro ao carregar componente:", file, err);
  }
};