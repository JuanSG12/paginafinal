document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("lista-perfiles");
  const inputBusqueda = document.getElementById("buscador");
HEAD
  const filtroSkill = document.getElementById("filtro-skill");
  const toggleTema = document.getElementById("toggle-tema");

  // Verifica que existan los elementos
  if (!contenedor || !inputBusqueda || !filtroSkill || !toggleTema || typeof profiles === "undefined") {
    console.error("Error: Elementos o datos no disponibles.");
    return;
  }

  // Función para renderizar perfiles


  // Validar existencia de elementos
  if (!contenedor || !inputBusqueda || typeof profiles === "undefined") {
    console.error("Error: Elementos del DOM o datos no encontrados.");
    return;
  }

c6a2b6e (Actualización de estilos y funcionalidades visuales)
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
HEAD
        <div class="card-buttons">
          <button onclick="alert('Contacto de ${perfil.name}')">📧 Contactar</button>
          <button onclick="alert('CV de ${perfil.name}')">📄 Ver CV</button>
        </div>
      `;
      // Agregar evento para lightbox en la imagen
      card.querySelector("img").addEventListener("click", () => {
        const overlay = document.createElement("div");
        overlay.className = "lightbox";
        overlay.innerHTML = `<img
::contentReference[oaicite:0]{index=0}
      `;
      contenedor.appendChild(card);
    });
  }

  function buscarPerfiles() {
    const texto = inputBusqueda.value.trim().toLowerCase();

    const filtrados = profiles.filter(perfil =>
      perfil.name.toLowerCase().includes(texto) ||
      perfil.initials.toLowerCase().includes(texto)
    );

    renderProfiles(filtrados);
  }

  inputBusqueda.addEventListener("input", buscarPerfiles);
  inputBusqueda.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      buscarPerfiles();
    }
  });

  renderProfiles(profiles); // Mostrar todos al inicio
});
 c6a2b6e (Actualización de estilos y funcionalidades visuales)
