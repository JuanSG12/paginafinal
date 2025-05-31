document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("lista-perfiles");
  const inputBusqueda = document.getElementById("buscador");
  const filtroSkill = document.getElementById("filtro-skill");

  // Suponiendo que tienes un array llamado "profiles" disponible
  // Ejemplo mínimo:
  // const profiles = [
  //   { name: "Ana", image: "ana.jpg", title: "Dev Frontend", bio: "Bio...", skills: ["JavaScript", "CSS"], initials: "A" },
  //   ...
  // ];

  function setupLightbox() {
    document.querySelectorAll('.card img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        const overlay = document.createElement('div');
        overlay.className = 'lightbox';
        overlay.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
        document.body.appendChild(overlay);
        overlay.addEventListener('click', () => overlay.remove());
      });
    });
  }

  function setupCardDetails() {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('show-details');
      });
    });
  }

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

  function filtrarPerfiles() {
    const texto = inputBusqueda.value.trim().toLowerCase();
    const skill = filtroSkill.value;

    const filtrados = profiles.filter(perfil => {
      const textoMatch = perfil.name.toLowerCase().includes(texto) || perfil.initials.toLowerCase().includes(texto);
      const skillMatch = skill === "" || perfil.skills.includes(skill);
      return textoMatch && skillMatch;
    });

    renderProfiles(filtrados);
  }

  inputBusqueda.addEventListener("input", filtrarPerfiles);
  filtroSkill.addEventListener("change", filtrarPerfiles);

  renderProfiles(profiles);
});
