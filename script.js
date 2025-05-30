const lista = document.getElementById("lista-perfiles");
const buscador = document.getElementById("buscador");

function mostrarPersonas(filtro = "") {
  lista.innerHTML = "";
  const filtradas = personas.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    p.nombre[0].toLowerCase() === filtro.toLowerCase()
  );

  filtradas.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.foto}" alt="${p.nombre}" />
      <h3>${p.nombre}</h3>
      <p>${p.resumen}</p>
      <a href="perfil.html?id=${p.id}">Ver más</a>
    `;
    lista.appendChild(card);
  });

  if (filtradas.length === 0) {
    lista.innerHTML = "<p>No se encontraron resultados.</p>";
  }
}

buscador.addEventListener("input", e => {
  mostrarPersonas(e.target.value);
});

mostrarPersonas();
