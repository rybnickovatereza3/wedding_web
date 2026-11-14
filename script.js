document.addEventListener("DOMContentLoaded", () => {
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const fadeElements = document.querySelectorAll(".hero, main section");
  let fadeUpdatePending = false;

  function updateScrollFade() {
    fadeUpdatePending = false;
    fadeElements.forEach((element) => {
      if (motionPreference.matches) {
        element.style.removeProperty("opacity");
        return;
      }
      const bounds = element.getBoundingClientRect();
      const fadeDistance = window.innerHeight * 0.55;
      const fadeIn = (window.innerHeight - bounds.top) / fadeDistance;
      const fadeOut = bounds.bottom / fadeDistance;
      element.style.opacity = Math.max(0, Math.min(1, fadeIn, fadeOut));
    });
  }

  function scheduleScrollFade() {
    if (!fadeUpdatePending) {
      fadeUpdatePending = true;
      requestAnimationFrame(updateScrollFade);
    }
  }

  window.addEventListener("scroll", scheduleScrollFade, { passive: true });
  window.addEventListener("resize", scheduleScrollFade);
  motionPreference.addEventListener("change", scheduleScrollFade);
  updateScrollFade();

  const form = document.querySelector(".rsvp-form");
  const iframe = document.querySelector('iframe[name="hidden_iframe"]');
  const submitButton = form?.querySelector('button[type="submit"]');
  const status = document.getElementById("rsvp-status");
  const success = document.querySelector(".rsvp-success");

  if (!form || !iframe || !submitButton || !status || !success) return;

  const transport = form.querySelector("#transport");
  const transportDetails = form.querySelectorAll(".transport-detail");
  function updateTransportDetails() {
    const needsTransport = transport.value === "yes";
    transportDetails.forEach((detail) => {
      detail.hidden = !needsTransport;
      const input = detail.querySelector("input");
      input.disabled = !needsTransport;
      input.required = needsTransport;
      if (!needsTransport) input.value = "";
    });
  }
  transport.addEventListener("change", updateTransportDetails);
  form.addEventListener("reset", () => requestAnimationFrame(updateTransportDetails));

  const originalText = submitButton.textContent.trim();
  let submitted = false;
  // User submitted the rsvp 
  form.addEventListener("submit", () => {
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitted = true;
    submitButton.disabled = true;
    submitButton.textContent = "Odesílám…";
    status.textContent = "Odesíláme vaše potvrzení…";
  });
  //google script has finished processing the submission
  iframe.addEventListener("load", () => {
    if (!submitted) return;

    submitted = false;
    form.reset();

    submitButton.disabled = false;
    submitButton.textContent = originalText;
    status.textContent = "";

    form.classList.add("is-hidden");
    success.classList.remove("is-hidden");
  });
});

