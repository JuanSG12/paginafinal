document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("lista-perfiles");
  const inputBusqueda = document.getElementById("buscador");

  // Verifica que existan los elementos
  if (!contenedor || !inputBusqueda || typeof profiles === "undefined") {
    console.error("Error: Elementos o datos no disponibles.");
    return;
  }

  // Función para renderizar perfiles
  function renderProfiles(lista) {
    contenedor.innerHTML = "";

    if (lista.length === 0) {
      contenedor.innerHTML = '<p class="no-result">No se encontraron resultados.</p>';
      return;
    }

    lista.forEach(perfil => {
      const card = document.createElement("div");
      card.className = "card fade-in";
      card.innerHTML = `
        <img src="${perfil.image}" alt="${perfil.name}">
        <h2>${perfil.name}</h2>
        <h3>${perfil.title}</h3>
        <p class="bio">${perfil.bio}</p>
        <p class="skills"><strong>Habilidades:</strong> ${perfil.skills.join(", ")}</p>
      `;
      contenedor.appendChild(card);
    });
  }

  // Mostrar todos los perfiles al inicio
  renderProfiles(profiles);

  // Función para filtrar y buscar
  function buscarPerfiles() {
    const texto = inputBusqueda.value.trim().toLowerCase();
    const filtrados = profiles.filter(perfil =>
      perfil.name.toLowerCase().includes(texto) ||
      perfil.initials.toLowerCase().includes(texto)
    );
    renderProfiles(filtrados);
  }

  // Buscar en vivo
  inputBusqueda.addEventListener("input", buscarPerfiles);

  // Buscar con Enter
  inputBusqueda.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      buscarPerfiles();
    }
  });
});
