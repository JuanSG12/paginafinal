function mostrarPerfiles(lista) {
  const contenedor = document.getElementById("profiles-container");
  contenedor.innerHTML = "";

  lista.forEach(perfil => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";

    tarjeta.innerHTML = `
      <img src="${perfil.photo}" alt="${perfil.name}" class="foto" />
      <h2>${perfil.name}</h2>
      <p><strong>Iniciales:</strong> ${perfil.initials}</p>
      <p><strong>Contacto:</strong> ${perfil.contact}</p>
      <p><strong>Educación:</strong> ${perfil.education}</p>
      <p><strong>Experiencia:</strong> ${perfil.experience}</p>
      <p><strong>Habilidades:</strong> ${perfil.skills.join(", ")}</p>
    `;

    contenedor.appendChild(tarjeta);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarPerfiles(profiles);

  document.getElementById("search").addEventListener("input", function () {
    const valor = this.value.toLowerCase();
    const filtrados = profiles.filter(p =>
      p.name.toLowerCase().includes(valor) || p.initials.toLowerCase().includes(valor)
    );
    mostrarPerfiles(filtrados);
  });
});
