console.log("Wedding website loaded!");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".rsvp-form");
  const iframe = document.querySelector('iframe[name="hidden_iframe"]');
  const submitButton = form?.querySelector('button[type="submit"]');

  if (!form || !iframe || !submitButton) return;

  const originalButtonText = submitButton.textContent.trim();
  let submitted = false;

  const status = document.createElement("p");
  status.className = "form-status";
  status.setAttribute("aria-live", "polite");
  form.appendChild(status);

  form.addEventListener("submit", () => {
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitted = true;
    submitButton.disabled = true;
    submitButton.textContent = "Odesílám…";
    status.textContent = "Odesílám vaše potvrzení…";
  });

  iframe.addEventListener("load", () => {
    if (!submitted) return;

    submitted = false;
    form.reset();
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
    status.textContent = "Děkujeme! Vaše odpověď byla uložena.";
    status.classList.add("is-success");
  });
});