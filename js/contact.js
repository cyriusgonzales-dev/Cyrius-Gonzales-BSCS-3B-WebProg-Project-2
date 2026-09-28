/* Native validation plus accessible FAQ disclosure and honest mailto behavior. */
(() => {
  const faqList = document.querySelector("[data-faq-list]");
  const contactForm = document.querySelector("[data-contact-form]");
  if (faqList) renderFaqs();
  if (contactForm) setupContactForm();

  function renderFaqs() {
    faqList.replaceChildren();
    if (!Array.isArray(faqs) || faqs.length === 0) {
      const empty = document.createElement("p");
      empty.className = "faq-empty";
      empty.textContent = "Frequently asked questions will be added here.";
      faqList.append(empty);
      return;
    }
    faqs.forEach((faq, index) => {
      const item = document.createElement("article");
      item.className = "faq-item";
      const question = document.createElement("button");
      question.className = "faq-question";
      question.type = "button";
      question.id = `faq-question-${index + 1}`;
      question.setAttribute("aria-expanded", "false");
      question.setAttribute("aria-controls", `faq-answer-${index + 1}`);
      const questionText = document.createElement("span");
      questionText.textContent = faq.question || "[QUESTION]";
      const plus = document.createElement("span");
      plus.setAttribute("aria-hidden", "true");
      plus.textContent = "+";
      question.append(questionText, plus);
      const answer = document.createElement("div");
      answer.className = "faq-answer";
      answer.id = `faq-answer-${index + 1}`;
      answer.setAttribute("role", "region");
      answer.setAttribute("aria-labelledby", question.id);
      const answerContent = document.createElement("div");
      const answerText = document.createElement("p");
      answerText.textContent = faq.answer || "[ANSWER]";
      answerContent.append(answerText);
      answer.append(answerContent);
      question.addEventListener("click", () => {
        const shouldOpen = question.getAttribute("aria-expanded") !== "true";
        faqList.querySelectorAll(".faq-question").forEach((otherQuestion) => {
          otherQuestion.setAttribute("aria-expanded", "false");
          otherQuestion.closest(".faq-item").classList.remove("is-open");
        });
        if (shouldOpen) {
          question.setAttribute("aria-expanded", "true");
          item.classList.add("is-open");
        }
      });
      item.append(question, answer);
      faqList.append(item);
    });
  }

  function setupContactForm() {
    const status = document.querySelector("[data-form-status]");
    const unavailableMessage = "This contact form isn't configured yet. Please use the social links on this page to get in touch.";
    if (status) status.textContent = contactEmail
      ? "Your message will open in your email application when you submit the form."
      : unavailableMessage;

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;
      if (!contactEmail) {
        status.textContent = unavailableMessage;
        return;
      }
      const formData = new FormData(contactForm);
      const subject = String(formData.get("subject") || "Portfolio enquiry");
      const body = [
        `Name: ${formData.get("name")}`,
        `Email: ${formData.get("email")}`,
        "",
        String(formData.get("message") || "")
      ].join("\n");
      window.location.href = `mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = "Your email application should open with this message prepared. The site does not send or store it.";
    });
  }
})();
