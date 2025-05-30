document.addEventListener("DOMContentLoaded", () => {
  const listaPerfiles = document.getElementById("lista-perfiles");
  const buscador = document.getElementById("buscador");

  function renderProfiles(perfiles) {
    listaPerfiles.innerHTML = "";

    if (perfiles.length === 0) {
      listaPerfiles.innerHTML = `<p class="no-result">No se encontraron coincidencias.</p>`;
      return;
    }

    perfiles.forEach(perfil => {
      const card = document.createElement("div");
      card.className = "card fade-in";

      card.innerHTML = `
        <img src="${perfil.image}" alt="${perfil.name}" />
        <h2>${perfil.name}</h2>
        <h3>${perfil.title}</h3>
        <p class="bio">${perfil.bio}</p>
        <p class="skills"><strong>Habilidades:</strong> ${perfil.skills.join(", ")}</p>
      `;

      listaPerfiles.appendChild(card);
    });
  }

  function filtrarPerfiles(valor) {
    const filtro = valor.toLowerCase();
    const resultados = profiles.filter(p =>
      p.name.toLowerCase().includes(filtro) || p.initials.toLowerCase().includes(filtro)
    );
    renderProfiles(resultados);
  }

  buscador.addEventListener("input", (e) => {
    filtrarPerfiles(e.target.value);
  });

  buscador.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      filtrarPerfiles(buscador.value);
    }
  });

  renderProfiles(profiles); // renderizar al cargar
});
