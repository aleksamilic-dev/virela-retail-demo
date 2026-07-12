(() => {
  const config = VIRELA_CONFIG;
  const panel = document.querySelector("#contact-panel");
  const modal = document.querySelector("#call-modal");
  const contactTriggers = document.querySelectorAll("[data-contact-open]");
  const phoneDisplay = document.querySelector("[data-phone-display]");
  const waLink = document.querySelector(".whatsapp-link");
  const phone = config.WHATSAPP_PHONE_NUMBER;

  waLink.href = `https://wa.me/${phone}?text=${encodeURIComponent(config.WHATSAPP_GREETING)}`;
  waLink.target = "_blank";
  waLink.rel = "noopener noreferrer";
  phoneDisplay.textContent = `+${phone}`;
  document.querySelector("#year").textContent = new Date().getFullYear();

  const setPanel = (open) => { panel.classList.toggle("is-open", open); panel.setAttribute("aria-hidden", String(!open)); };
  const setModal = (open) => { modal.classList.toggle("is-open", open); modal.setAttribute("aria-hidden", String(!open)); document.body.classList.toggle("no-scroll", open); };
  contactTriggers.forEach((button) => button.addEventListener("click", () => setPanel(true)));
  document.querySelector("[data-contact-close]").addEventListener("click", () => setPanel(false));
  document.querySelector("[data-call-open]").addEventListener("click", () => { setPanel(false); setModal(true); });
  document.querySelectorAll("[data-call-close]").forEach((button) => button.addEventListener("click", () => setModal(false)));
  modal.addEventListener("click", (event) => { if (event.target === modal) setModal(false); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") { setPanel(false); setModal(false); } });
})();
