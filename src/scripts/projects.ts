export const initProjects = () => {
  const filterBtns = document.querySelectorAll(".project-filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterBtns.length === 0 || projectCards.length === 0) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      // Actualizar botones
      filterBtns.forEach((b) => {
        b.classList.remove("bg-cyan", "text-white", "shadow-lg");
        b.classList.add("text-slate-500", "dark:text-slate-400");
      });
      btn.classList.add("bg-cyan", "text-white", "shadow-lg");
      btn.classList.remove("text-slate-500", "dark:text-slate-400");

      // Filtrar cards
      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          (card as HTMLElement).style.display = "block";
        } else {
          (card as HTMLElement).style.display = "none";
        }
      });
    });
  });

  // Acordeón móvil
  projectCards.forEach((card) => {
    (card as HTMLElement).onclick = (e: MouseEvent) => {
      if (window.innerWidth >= 768) return;
      if ((e.target as HTMLElement).closest("a")) return;
      const isExpanded = card.classList.contains("is-expanded");
      projectCards.forEach((c) => c.classList.remove("is-expanded"));
      if (!isExpanded) card.classList.add("is-expanded");
    };
  });
};
