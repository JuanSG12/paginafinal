// main.js
document.addEventListener("DOMContentLoaded", () => {
  const listaPerfiles = document.getElementById("lista-perfiles");
  const buscador = document.getElementById("buscador");

  function renderProfiles(perfiles) {
    listaPerfiles.innerHTML = "";
    if (perfiles.length === 0) {
      listaPerfiles.innerHTML = "<p>No se encontraron perfiles.</p>";
      return;
    }

    perfiles.forEach(perfil => {
      const div = document.createElement("div");
      div.classList.add("perfil");
      div.innerHTML = `
        <h2>${perfil.name}</h2>
        <p><strong>Título:</strong> ${perfil.title}</p>
        <p>${perfil.bio}</p>
        <p><strong>Skills:</strong> ${perfil.skills.join(", ")}</p>
      `;
      listaPerfiles.appendChild(div);
    });
  }

  function buscar(event) {
    const texto = event.target.value.toLowerCase().trim();
    const filtrados = profiles.filter(p => 
      p.name.toLowerCase().includes(texto) || 
      p.initials.toLowerCase().includes(texto)
    );
    renderProfiles(filtrados);
  }

  // Mostrar todos al cargar
  renderProfiles(profiles);

  // Escuchar cambios en el input (búsqueda en vivo)
  buscador.addEventListener("input", buscar);
});
