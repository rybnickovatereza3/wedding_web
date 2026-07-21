console.log("Wedding website loaded!");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".rsvp-form");
  const iframe = document.querySelector('iframe[name="hidden_iframe"]');
  const submitButton = form?.querySelector('button[type="submit"]');
  const status = document.getElementById("rsvp-status");

  if (!form || !iframe || !submitButton || !status) return;

  const originalButtonText = submitButton.textContent.trim();
  let pending = false;

  form.addEventListener("submit", () => {
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    pending = true;
    submitButton.disabled = true;
    submitButton.textContent = "Odesílám…";
    status.textContent = "Odesílám vaše potvrzení…";
    status.classList.remove("is-success", "is-error");
  });

  iframe.addEventListener("load", () => {
    if (!pending) return;

    pending = false;
    form.reset();
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
    status.textContent = "Děkujeme! Vaše odpověď byla uložena.";
    status.classList.add("is-success");
  });
});