document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("lista-perfiles");
  const inputBusqueda = document.getElementById("buscador");

  // Asegúrate de tener el array "profiles" declarado en algún lugar accesible
  // Por ejemplo: 
  // const profiles = [
  //   { name: "Ana", image: "ana.jpg", title: "Desarrolladora", bio: "Bio...", skills: ["JS", "CSS"], initials: "A" },
  //   ...
  // ];

  // Función para activar lightbox al hacer click en imagen
  function setupLightbox() {
    document.querySelectorAll('.card img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
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

    // Activa la lightbox después de renderizar
    setupLightbox();
  }

  // Función para buscar perfiles
  function buscarPerfiles() {
    const texto = inputBusqueda.value.trim().toLowerCase();

    const filtrados = profiles.filter(perfil =>
      perfil.name.toLowerCase().includes(texto) ||
      perfil.initials.toLowerCase().includes(texto)
    );

    renderProfiles(filtrados);
  }

  // Eventos para la búsqueda
  inputBusqueda.addEventListener("input", buscarPerfiles);
  inputBusqueda.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      buscarPerfiles();
    }
  });

  // Renderiza todos los perfiles al cargar
  renderProfiles(profiles);
});

// Filtrado en tiempo real
document.getElementById("searchInput").addEventListener("input", function () {
  const searchValue = this.value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const name = card.querySelector("h2").textContent.toLowerCase();
    if (name.includes(searchValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Mostrar detalles al hacer clic en una tarjeta
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", function () {
    this.classList.toggle("show-details");
  });
});

