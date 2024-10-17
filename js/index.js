// form
const horseWhiteForm = document.getElementById("horseWhiteForm");
const horseWhiteFormFields = horseWhiteForm.querySelectorAll("input, textarea");
const horseWhiteModalMessage = document.getElementById("horseWhiteModalMessage");
const horseWhiteModalMessageText = document.getElementById("horseWhiteModalMessageText");

const showModal = (modal) => {
  modal.showModal();
  document.body.classList.add("scroll-lock");
};

const removeLock = () => {
  if (!horseWhiteModalMessage.open) {
    document.body.classList.remove("scroll-lock");
  }
};

// класс filled для заполненных полей нужен для стилизации
const setFilledClass = (input) => {
  if (input.value.trim() !== "") {
    input.classList.add("filled");
  } else {
    input.classList.remove("filled");
  }
};

horseWhiteFormFields.forEach((field) => {
  if (field.type === "text" || field.type === "textarea") {
    setFilledClass(field);
  }

  field.addEventListener("input", (event) => {
    if (event.target.type === "text" || event.target.type === "textarea") {
      setFilledClass(event.target);
    }
  });
});

horseWhiteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  event.target.reset();

  const message = `Данные формы Contact us отправлены`;
  horseWhiteModalMessageText.textContent = message;

  showModal(horseWhiteModalMessage);
});

horseWhiteModalMessage.addEventListener("click", ({ currentTarget, target }) => {
  const isClickOutside = target === currentTarget;
  if (isClickOutside) horseWhiteModalMessage.close();
});

horseWhiteModalMessage.addEventListener("close", () => {
  removeLock();
});
