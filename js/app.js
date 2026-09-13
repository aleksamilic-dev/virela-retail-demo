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

  // Viber contact: a viber:// deep link opens the Viber app to a chat with the
  // account the desktop bridge is signed in as. Shown only when configured.
  const viberLink = document.querySelector(".viber-link");
  const viberNumber = config.VIBER_PHONE_NUMBER;
  if (viberLink && viberNumber) {
    const greeting = encodeURIComponent(config.VIBER_GREETING || "");
    viberLink.href = `viber://chat?number=${encodeURIComponent("+" + viberNumber)}&text=${greeting}`;
    viberLink.hidden = false;
  }

  // Viber call: viber://call dials the same account the desktop bridge is
  // signed in as, and the bridge answers it with the AI agent. Reuses the
  // chat number, so there is nothing extra to configure.
  const viberCallLink = document.querySelector(".viber-call-link");
  if (viberCallLink && viberNumber) {
    viberCallLink.href = `viber://call?number=${encodeURIComponent("+" + viberNumber)}`;
    viberCallLink.hidden = false;
  }

  // Telegram contact: a plain t.me link opens the bot's chat, where START
  // sends /start and the bot replies with the menu. Shown only when
  // configured, like Viber.
  const telegramLink = document.querySelector(".telegram-link");
  const telegramUser = config.TELEGRAM_BOT_USERNAME;
  if (telegramLink && telegramUser) {
    telegramLink.href = `https://t.me/${encodeURIComponent(telegramUser)}`;
    telegramLink.target = "_blank";
    telegramLink.rel = "noopener noreferrer";
    telegramLink.hidden = false;
  }
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
