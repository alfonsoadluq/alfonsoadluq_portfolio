export const initAbout = () => {
  const items = document.querySelectorAll(".stack-accordion-item");
  if (items.length === 0) return;

  items[0].classList.add("is-active");

  items.forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");

    trigger?.addEventListener("click", () => {
      items.forEach((i) => {
        if (i !== item) {
          i.classList.remove("is-active");
        }
      });

      item.classList.toggle("is-active");
    });
  });
};
