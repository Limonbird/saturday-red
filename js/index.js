document.addEventListener("DOMContentLoaded", () => {
  // login
  const satrudayRedModalLogin = document.getElementById("satrudayRedModalLogin");
  const satrudayRedModalLoginOpenButton = document.getElementById("satrudayRedModalLoginOpenButton");
  const satrudayRedFormLoginSwitchToSignUp = document.getElementById("satrudayRedFormLoginSwitchToSignUp");
  const satrudayRedFormLogin = document.getElementById("satrudayRedFormLogin");
  const satrudayRedModalLoginOpenAction = document.getElementById("satrudayRedModalLoginOpenAction");

  // sign up
  const satrudayRedModalSignUp = document.getElementById("satrudayRedModalSignUp");
  const satrudayRedModalSignUpOpenButton = document.getElementById("satrudayRedModalSignUpOpenButton");
  const satrudayRedFormLoginSwitchToLogIn = document.getElementById("satrudayRedFormLoginSwitchToLogIn");
  const satrudayRedFormSignUp = document.getElementById("satrudayRedFormSignUp");

  // message
  const satrudayRedModalMessage = document.getElementById("satrudayRedModalMessage");
  const satrudayRedModalMessageText = document.getElementById("satrudayRedModalMessageText");

  const showModal = (modal) => {
    modal.showModal();
    document.body.classList.add("scroll-lock");
  };

  const removeLock = () => {
    if (!satrudayRedModalLogin.open && !satrudayRedModalSignUp.open) {
      document.body.classList.remove("scroll-lock");
    }
  };

  // login

  satrudayRedModalLoginOpenButton.addEventListener("click", () => {
    showModal(satrudayRedModalLogin);
  });

  satrudayRedModalLogin.addEventListener("click", ({ currentTarget, target }) => {
    const isClickOutside = target === currentTarget;
    if (isClickOutside) satrudayRedModalLogin.close();
  });

  satrudayRedModalLogin.addEventListener("close", () => {
    removeLock();
  });

  satrudayRedFormLoginSwitchToSignUp.addEventListener("click", () => {
    satrudayRedModalLogin.close();
    showModal(satrudayRedModalSignUp);
  });

  satrudayRedFormLogin.addEventListener("submit", function (event) {
    event.preventDefault();
    satrudayRedModalLogin.close();
    event.target.reset();

    const message = `Данные формы login отправлены`;
    satrudayRedModalMessageText.textContent = message;

    showModal(satrudayRedModalMessage);
  });

  satrudayRedModalLoginOpenAction.addEventListener("click", () => {
    showModal(satrudayRedModalLogin);
  });

  // sign up

  satrudayRedModalSignUpOpenButton.addEventListener("click", () => {
    showModal(satrudayRedModalSignUp);
  });

  satrudayRedModalSignUp.addEventListener("click", ({ currentTarget, target }) => {
    const isClickOutside = target === currentTarget;
    if (isClickOutside) satrudayRedModalSignUp.close();
  });

  satrudayRedModalSignUp.addEventListener("close", () => {
    removeLock();
  });

  satrudayRedFormLoginSwitchToLogIn.addEventListener("click", () => {
    satrudayRedModalSignUp.close();
    showModal(satrudayRedModalLogin);
  });

  satrudayRedFormSignUp.addEventListener("submit", function (event) {
    event.preventDefault();

    satrudayRedModalSignUp.close();
    event.target.reset();

    const message = `Данные формы sign up отправлены`;
    satrudayRedModalMessageText.textContent = message;

    showModal(satrudayRedModalMessage);
  });

  // header buttons to top (desktop)
  const header = document.querySelector("header");
  const satrudayRedHeaderAction = document.getElementById("satrudayRedHeaderAction");
  const headerOffset = header.offsetTop;

  window.addEventListener("scroll", () => {
    if (window.innerWidth >= 992) {
      if (window.scrollY > headerOffset) {
        satrudayRedHeaderAction.classList.add("to-top");
      } else {
        satrudayRedHeaderAction.classList.remove("to-top");
      }
    }
  });
});
