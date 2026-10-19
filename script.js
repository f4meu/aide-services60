(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
      menuButton.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Ouvrir le menu");
    }));
  }

  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const serviceSelect = document.querySelector("#service-type");
  const nameInput = document.querySelector("#customer-name");
  const form = document.querySelector("#booking-form");
  const feedback = document.querySelector("#form-feedback");

  // Every launch-offer button opens the form and preselects the corresponding offer.
  document.querySelectorAll("[data-select-service]").forEach((link) => {
    link.addEventListener("click", () => {
      const service = link.getAttribute("data-select-service");
      if (serviceSelect && service) {
        const option = Array.from(serviceSelect.options).find((item) => item.value === service || item.textContent.trim() === service);
        if (option) serviceSelect.value = option.value;
      }
    });
  });

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (feedback) feedback.textContent = "";
      if (!form.reportValidity()) return;

      const name = nameInput.value.trim();
      const phone = document.querySelector("#customer-phone").value.trim();
      const service = serviceSelect.value;
      const area = document.querySelector("#customer-area").value.trim();
      const message = document.querySelector("#customer-message").value.trim();

      if (!name || !phone || !service) {
        if (feedback) feedback.textContent = "Merci de remplir les champs obligatoires.";
        return;
      }

      const lines = [
        "Bonjour Aide&Services60, je souhaite profiter d'une offre ou demander une réservation.",
        "",
        "Nom : " + name,
        "Téléphone : " + phone,
        "Offre souhaitée : " + service,
        area ? "Ville / secteur : " + area : "",
        message ? "Précisions : " + message : ""
      ].filter(Boolean);

      const whatsappUrl = "https://wa.me/33749502758?text=" + encodeURIComponent(lines.join("\n"));
      // Navigate in the same tab to avoid popup blockers, after the visitor submits the form.
      window.location.href = whatsappUrl;
    });
  }
})();
