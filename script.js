document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".rsvp-form");
  const iframe = document.querySelector('iframe[name="hidden_iframe"]');
  const submitButton = form?.querySelector('button[type="submit"]');
  const status = document.getElementById("rsvp-status");
  const success = document.querySelector(".rsvp-success");

  if (!form || !iframe || !submitButton || !status || !success) return;

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