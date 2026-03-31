export const initExperience = () => {
  const beam = document.getElementById("timeline-beam") as HTMLElement | null;
  const container = document.querySelector(
    ".relative.ml-4.md\\:ml-12",
  ) as HTMLElement | null;
  const nodes = document.querySelectorAll(".experience-node");

  if (!beam || !container || nodes.length === 0) return;

  const updateBeam = () => {
    const triggerPoint = window.innerHeight * 0.4;
    let activeNode: HTMLElement | null = null;
    let minDistance = Infinity;

    nodes.forEach((node) => {
      const rect = (node as HTMLElement).getBoundingClientRect();
      // Calculamos qué nodo está más cerca de nuestro "trigger point"
      const center = rect.top + 40; // 40px es donde está el LED
      const distance = Math.abs(triggerPoint - center);

      if (distance < minDistance) {
        minDistance = distance;
        activeNode = node as HTMLElement;
      }
    });

    if (activeNode) {
      const containerRect = container.getBoundingClientRect();
      const nodeRect = (activeNode as HTMLElement).getBoundingClientRect();

      // Posición exacta del LED respecto al contenedor de la línea
      const relativeTop = nodeRect.top - containerRect.top + 40;

      // Si el nodo está muy lejos del centro, bajamos la opacidad
      const opacity = Math.max(0, 1 - minDistance / 400);

      requestAnimationFrame(() => {
        beam.style.opacity = opacity.toString();
        // Centramos el rayo (de 160px de alto) sobre el LED
        beam.style.transform = `translateY(${relativeTop - 80}px)`;
      });
    }
  };

  window.addEventListener("scroll", updateBeam, { passive: true });
  window.addEventListener("resize", updateBeam);
  updateBeam();
};
