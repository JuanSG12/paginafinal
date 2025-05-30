// Función para renderizar los perfiles en el contenedor
function renderProfiles(profiles) {
  const container = document.getElementById("profiles-container");
  container.innerHTML = ""; // limpia contenido anterior

  if (profiles.length === 0) {
    container.innerHTML = "<p>No se encontraron perfiles.</p>";
    return;
  }

  profiles.forEach(profile => {
    const card = document.createElement("div");
    card.className = "profile-card";
    card.innerHTML = `
      <img src="${profile.photo}" alt="Foto de ${profile.name}" class="profile-photo"/>
      <h3>${profile.name} (${profile.initials})</h3>
      <p><strong>Contacto:</strong> ${profile.contact}</p>
      <p><strong>Educación:</strong> ${profile.education}</p>
      <p><strong>Experiencia:</strong> ${profile.experience}</p>
      <p><strong>Habilidades:</strong> ${profile.skills.join(", ")}</p>
    `;
    container.appendChild(card);
  });
}

// Evento que se dispara al escribir en el input de búsqueda
document.getElementById("search").addEventListener("input", function () {
  const query = this.value.trim().toLowerCase();

  const filtered = profiles.filter(profile => {
    return profile.name.toLowerCase().includes(query) ||
           profile.initials.toLowerCase().includes(query);
  });

  renderProfiles(filtered);
});

// Mostrar todos los perfiles al cargar la página
renderProfiles(profiles);
