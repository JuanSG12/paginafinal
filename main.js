document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("lista-perfiles");
  const inputBusqueda = document.getElementById("buscador");
  const filtroSkill = document.getElementById("filtro-skill");

  // Ejemplo: Debes tener el array profiles cargado desde data.js o similar
  // const profiles = [...]

  // Función para activar lightbox al hacer click en imagen
  function setupLightbox() {
    document.querySelectorAll('.card img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', (e) => {
        e.stopPropagation(); // Para que no dispare el toggle detalles
        const overlay = document.createElement('div');
        overlay.className = 'lightbox';
        overlay.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
        document.body.appendChild(overlay);

        overlay.addEventListener('click', () => {
          overlay.remove();
        });
      });
    });
  }

  // Mostrar / ocultar detalles al hacer click en la tarjeta
  function setupCardDetails() {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('show-details');
      });
    });
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
        <div class="card-buttons">
          <button onclick="alert('Contacto de ${perfil.name}')">📧 Contactar</button>
          <button onclick="alert('CV de ${perfil.name}')">📄 Ver CV</button>
        </div>
      `;
      contenedor.appendChild(card);
    });

    setupLightbox();
    setupCardDetails();
  }

  // Función para filtrar perfiles por texto y skill
  function filtrarPerfiles() {
    const texto = inputBusqueda.value.trim().toLowerCase();
    const skill = filtroSkill.value;

    const filtrados = profiles.filter(perfil => {
      const coincideTexto = perfil.name.toLowerCase().includes(texto) || perfil.initials.toLowerCase().includes(texto);
      const coincideSkill = skill === "" || perfil.skills.includes(skill);
      return coincideTexto && coincideSkill;
    });

    renderProfiles(filtrados);
  }

  // Eventos para filtros
  inputBusqueda.addEventListener("input", filtrarPerfiles);
  filtroSkill.addEventListener("change", filtrarPerfiles);

  // Renderizar perfiles inicialmente
  renderProfiles(profiles);
});
