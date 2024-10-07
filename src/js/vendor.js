import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".swiper", {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      320: {
        slidesPerView: 1.1,
        spaceBetween: 10,
        navigation: {
          enabled: false,
        },
        pagination: {
          enabled: false,
        },
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 10,
        centeredSlides: true,
        initialSlide: 1,
        navigation: {
          enabled: true,
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          enabled: true,
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    },
  });
});
