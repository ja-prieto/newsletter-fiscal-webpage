// El filtro de las tablas de un documento: deja solo las filas que contienen lo que se
// escribe, sin distinguir mayúsculas ni acentos. Es el único JavaScript de la web, y sin él
// la tabla se ve entera igual: el campo del filtro solo aparece si esto se ejecuta.

const normaliza = (texto) => texto.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

for (const campo of document.querySelectorAll("[data-filtra]")) {
  const filas = [...document.getElementById(campo.dataset.filtra).tBodies[0].rows];
  const textos = filas.map((fila) => normaliza(fila.textContent));
  const cuenta = campo.nextElementSibling;
  campo.parentElement.hidden = false;

  campo.addEventListener("input", () => {
    const buscado = normaliza(campo.value.trim());
    let vistas = 0;
    filas.forEach((fila, i) => {
      fila.hidden = !textos[i].includes(buscado);
      if (!fila.hidden) vistas += 1;
    });
    cuenta.textContent = buscado ? `${vistas.toLocaleString("es-ES")} de ${filas.length.toLocaleString("es-ES")}` : "";
  });
}
