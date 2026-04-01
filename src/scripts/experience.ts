// src/scripts/experience.ts

export const initExperience = () => {
  // ... (Tu código actual del rayo de luz se mantiene igual arriba)
  const beam = document.getElementById("timeline-beam") as HTMLElement | null;
  const nodes = document.querySelectorAll(".experience-node");

  if (!beam || nodes.length === 0) return;

  const scrollHandler = () => {
    const scrollCenter = window.scrollY + window.innerHeight / 2;
    let activeNode: HTMLElement | null = null;
    let minDistance = Infinity;

    nodes.forEach((node) => {
      const rect = (node as HTMLElement).getBoundingClientRect();
      const nodeCenter = rect.top + window.scrollY + rect.height / 2;
      const distance = Math.abs(scrollCenter - nodeCenter);
      if (distance < minDistance) {
        minDistance = distance;
        activeNode = node as HTMLElement;
      }
    });

    if (activeNode) {
      const containerRect = beam.parentElement!.getBoundingClientRect();
      const nodeRect = (activeNode as HTMLElement).getBoundingClientRect();
      const relativeTop = nodeRect.top - containerRect.top + 40;
      beam.style.opacity = "1";
      beam.style.transform = `translateY(${relativeTop}px)`;
    }
  };

  window.addEventListener("scroll", scrollHandler);
  requestAnimationFrame(scrollHandler);
};

export const initExperienceMobile = () => {
  const cards = document.querySelectorAll(".experience-card");

  cards.forEach((card) => {
    (card as HTMLElement).onclick = (e: MouseEvent) => {
      // Solo en móviles
      if (window.innerWidth >= 768) return;

      // Evitar que links cierren el acordeón
      if ((e.target as HTMLElement).closest("a")) return;

      const isExpanded = card.classList.contains("is-expanded");

      // Cerrar otros (opcional para un look más limpio)
      cards.forEach((c) => c.classList.remove("is-expanded"));

      if (!isExpanded) {
        card.classList.add("is-expanded");
      }
    };
  });
};
