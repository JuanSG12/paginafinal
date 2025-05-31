// Datos de ejemplo - aquí pon tus perfiles reales
const profiles = [
  {
    id: 1,
    name: "Ana Pérez",
    initials: "AP",
    title: "Desarrolladora Frontend",
    bio: "Apasionada por crear interfaces hermosas y funcionales.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    email: "ana.perez@example.com",
    cvLink: "https://example.com/cv-ana.pdf"
  },
  {
    id: 2,
    name: "Luis Gómez",
    initials: "LG",
    title: "Ingeniero de Datos",
    bio: "Especialista en análisis y visualización de datos masivos.",
    skills: ["Python", "SQL", "Machine Learning", "Tableau"],
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "luis.gomez@example.com",
    cvLink: "https://example.com/cv-luis.pdf"
  },
  {
    id: 3,
    name: "Carla Ruiz",
    initials: "CR",
    title: "Diseñadora UX/UI",
    bio: "Diseñando experiencias digitales centradas en el usuario.",
    skills: ["Figma", "Sketch", "Adobe XD", "Prototipado"],
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "carla.ruiz@example.com",
    cvLink: "https://example.com/cv-carla.pdf"
  },
  // Agrega más perfiles si quieres
];

const contenedor = document.getElementById("lista-perfiles");
const buscador = document.getElementById("buscador");
const filtroSkill = document.getElementById("filtro-skill");
const toggleTema = document.getElementById("toggle-tema");

// Renderiza perfiles
function renderProfiles(lista) {
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = '<p class="no-result">No se encontraron resultados.</p>';
    return;
  }

  lista.forEach(perfil => {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-aos", "fade-up");
    card.innerHTML = `
      <img src="${perfil.image}" alt="Foto de ${perfil.name}" />
      <h2>${perfil.name}</h2>
      <h3>${perfil.title}</h3>
      <p class="bio">${perfil.bio}</p>
      <p class="skills"><strong>Habilidades:</strong> ${perfil.skills.join(", ")}</p>
      <div class="card-buttons">
        <button class="contact-btn">📧 Contactar</button>
        <button class="cv-btn">📄 Ver CV</button>
        <button class="details-btn">ℹ️ Detalles</button>
      </div>
    `;
    contenedor.appendChild(card);

    // Eventos para botones
    const btnContact = card.querySelector(".contact-btn");
    btnContact.addEventListener("click", () => {
      Swal.fire({
        title: `Contacto de ${perfil.name}`,
        html: `<p>Email: <a href="mailto:${perfil.email}">${perfil.email}</a></p>`,
        icon: "info",
        confirmButtonText: "Cerrar"
      });
    });

    const btnCV = card.querySelector(".cv-btn");
    btnCV.addEventListener("click", () => {
      window.open(perfil.cvLink, "_blank");
    });

    const btnDetails = card.querySelector(".details-btn");
    btnDetails.addEventListener("click", () => {
      showDetails(perfil);
    });
  });

  setupLightbox();
  AOS.refresh();
}

// Lightbox para imagen
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

// Muestra modal con detalles completos
function showDetails(perfil) {
  Swal.fire({
    title: `${perfil.name} - ${perfil.title}`,
    html: `
      <img src="${perfil.image}" alt="Foto de ${perfil.name}" style="width:100px; border-radius:10px; margin-bottom:15px;">
      <p><strong>Biografía:</strong> ${perfil.bio}</p>
      <p><strong>Habilidades:</strong> ${perfil.skills.join(", ")}</p>
      <p><strong>Email:</strong> <a href="mailto:${perfil.email}">${perfil.email}</a></p>
      <a href="${perfil.cvLink}" target="_blank" style="color:#6200ea; font-weight:bold;">Ver CV completo</a>
    `,
    showCloseButton: true,
    focusConfirm: false,
    confirmButtonText: 'Cerrar',
    width: '400px',
  });
}

// Buscar perfiles según input y filtro
function filtrarPerfiles() {
  const texto = buscador.value.toLowerCase();
  const skillFilter = filtroSkill.value.toLowerCase();

  const filtrados = profiles.filter(perfil => {
    const matchNombre = perfil.name.toLowerCase().includes(texto) || perfil.initials.toLowerCase().startsWith(texto);
    const matchSkill = skillFilter === "" || perfil.skills.some(s => s.toLowerCase() === skillFilter);
    return matchNombre && matchSkill;
  });

  renderProfiles(filtrados);
}

// Llena el dropdown de habilidades
function cargarSkills() {
  const todasSkills = new Set();
  profiles.forEach(p => p.skills.forEach(s => todasSkills.add(s)));
  todasSkills.forEach(skill => {
    const option = document.createElement("option");
    option.value = skill;
    option.textContent = skill;
    filtroSkill.appendChild(option);
  });
}

// Cambia tema claro/oscuro
function toggleThemeMode() {
  document.body.classList.toggle("dark-mode");
  if(document.body.classList.contains("dark-mode")) {
    toggleTema.textContent = "☀️ Tema claro";
  } else {
    toggleTema.textContent = "🌙 Cambiar tema";
  }
}

window.onload = () => {
  cargarSkills();
  renderProfiles(profiles);

  buscador.addEventListener("input", filtrarPerfiles);
  filtroSkill.addEventListener("change", filtrarPerfiles);
  toggleTema.addEventListener("click", toggleThemeMode);

  AOS.init({
    duration: 800,
    once: true
  });
};
