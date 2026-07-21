document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rsvp-form");
  const submitButton = form?.querySelector('button[type="submit"]');
  const status = document.getElementById("rsvp-status");

  if (!form || !submitButton || !status) return;

  const ENDPOINT = "https://script.google.com/macros/s/AKfycby7m7QDR_sa-hqVDszWVTwuxybuC4JrxDJ6GRhHrKS2HTrbvhW0bgabgAHlhUdmWXhW/exec";
  const originalButtonText = submitButton.textContent.trim();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Odesílám…";
    status.textContent = "Odesílám vaše potvrzení…";
    status.classList.remove("is-success", "is-error");

    try {
      await fetch(ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        mode: "no-cors",
      });

      form.reset();
      status.textContent = "Děkujeme! Vaše odpověď byla uložena.";
      status.classList.add("is-success");
    } catch (error) {
      status.textContent = "Omlouváme se, něco se pokazilo. Zkuste to prosím znovu.";
      status.classList.add("is-error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
});