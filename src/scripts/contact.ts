export const initContact = () => {
  const form = document.getElementById(
    "contact-form",
  ) as HTMLFormElement | null;
  const btn = document.getElementById(
    "form-submit-btn",
  ) as HTMLButtonElement | null;
  const statusMsg = document.getElementById(
    "form-status",
  ) as HTMLElement | null;

  if (!form || !btn || !statusMsg) return;

  const btnText = document.getElementById("btn-text") as HTMLElement;
  const btnIcon = document.getElementById("btn-icon") as HTMLElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validación de Email Simple
    const emailInput = form.querySelector("#email") as HTMLInputElement;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());

    if (!emailOk) {
      statusMsg.textContent = "Email inválido";
      statusMsg.className =
        "text-center text-[11px] font-black tracking-widest uppercase text-red-500 mb-2";
      return;
    }

    // Estado de Carga
    btnText.textContent = "Enviando...";
    btnIcon.style.display = "none";
    btn.disabled = true;
    btn.classList.add("opacity-70", "cursor-not-allowed");
    statusMsg.classList.add("hidden");

    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (res.ok) {
        // Éxito
        form.reset();
        btn.classList.replace("bg-cyan", "bg-green-500");
        btn.classList.replace(
          "hover:shadow-[0_0_20px_rgba(0,193,253,0.4)]",
          "hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]",
        );
        btnText.textContent = "¡Enviado con éxito!";

        statusMsg.textContent = "Te responderé lo antes posible.";
        statusMsg.className =
          "text-center text-[11px] font-black tracking-widest uppercase text-green-500 mt-2 mb-[-10px]";

        setTimeout(() => {
          btn.classList.replace("bg-green-500", "bg-cyan");
          btn.classList.replace(
            "hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]",
            "hover:shadow-[0_0_20px_rgba(0,193,253,0.4)]",
          );
          btnText.textContent = "Enviar Mensaje";
          btnIcon.style.display = "block";
          btn.disabled = false;
          btn.classList.remove("opacity-70", "cursor-not-allowed");
          statusMsg.classList.add("hidden");
        }, 5000);
      } else {
        throw new Error("Formspree returned an error");
      }
    } catch (error) {
      // Error de red o del servidor
      btn.classList.replace("bg-cyan", "bg-red-500");
      btn.classList.replace(
        "hover:shadow-[0_0_20px_rgba(0,193,253,0.4)]",
        "hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]",
      );
      btnText.textContent = "Error al enviar";

      statusMsg.textContent = "Comprueba tu conexión e inténtalo de nuevo.";
      statusMsg.className =
        "text-center text-[11px] font-black tracking-widest uppercase text-red-500 mt-2 mb-[-10px]";

      setTimeout(() => {
        btn.classList.replace("bg-red-500", "bg-cyan");
        btn.classList.replace(
          "hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]",
          "hover:shadow-[0_0_20px_rgba(0,193,253,0.4)]",
        );
        btnText.textContent = "Enviar Mensaje";
        btnIcon.style.display = "block";
        btn.disabled = false;
        btn.classList.remove("opacity-70", "cursor-not-allowed");
        statusMsg.classList.add("hidden");
      }, 5000);
    }
  });
};
