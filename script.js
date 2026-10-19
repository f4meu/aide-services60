(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
      const label = menuButton.querySelector(".sr-only");
      if (label) label.textContent = isOpen ? "Ouvrir le menu" : "Fermer le menu";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        const label = menuButton.querySelector(".sr-only");
        if (label) label.textContent = "Ouvrir le menu";
      });
    });
  }

  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const form = document.querySelector("#booking-form");
  const feedback = document.querySelector("#form-feedback");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const name = document.querySelector("#customer-name").value.trim();
      const phone = document.querySelector("#customer-phone").value.trim();
      const service = document.querySelector("#service-type").value;
      const message = document.querySelector("#customer-message").value.trim();

      if (!name || !phone || !service) {
        if (feedback) feedback.textContent = "Veuillez remplir les champs obligatoires.";
        return;
      }

      const lines = [
        "Bonjour Aide&Services60, je souhaite faire une demande de renseignements ou de réservation.",
        "",
        "Nom : " + name,
        "Téléphone : " + phone,
        "Prestation souhaitée : " + service,
        message ? "Message : " + message : ""
      ].filter(Boolean);

      const whatsappUrl = "https://wa.me/33749502758?text=" + encodeURIComponent(lines.join("\n"));
      if (feedback) feedback.textContent = "WhatsApp va s'ouvrir avec votre demande préremplie. Vérifiez le message puis envoyez-le vous-même.";
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }
})();