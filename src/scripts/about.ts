// src/scripts/about.ts

export const initAbout = () => {
  const items = document.querySelectorAll(".stack-accordion-item");
  if (items.length === 0) return;

  // UX SENIOR: Abrir el primer elemento por defecto para invitar a la interacción
  items[0].classList.add("is-active");

  items.forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");

    trigger?.addEventListener("click", () => {
      // Lógica Exclusiva: Cerramos todos menos el clickeado
      items.forEach((i) => {
        if (i !== item) {
          i.classList.remove("is-active");
        }
      });

      // Alternamos el estado del actual
      item.classList.toggle("is-active");
    });
  });
};
