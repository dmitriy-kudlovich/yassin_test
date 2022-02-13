const buttonLink = document.querySelectorAll(".card .button_link");
const formWrapper = document.querySelector("#formWrapper");
const close = document.querySelector("#close");
const mobileClose = document.querySelector("#mobileClose");
const model = document.querySelector("#model");
const cardName = document.querySelectorAll(".card__name");
const mobileMenu = document.querySelector("#mobileMenu");
const hamburger = document.querySelector("#hamburger");
let navMenuLinks = document.querySelectorAll(".nav-menu .nav__link");

const answer = document.querySelector("#answer");

$(document).ready(function () {
  $("#formWrapper").on("submit", function (event) {
    event.preventDefault();
    let string = $("#formWrapper").serialize();

    $.ajax({
      type: "POST",
      url: "./php/send.php",
      data: string,

      success: function (html) {
        $("#formWrapper").slideUp(800);
        answer.style.display = "block";
        $("#answer").html(html);

        let answer_button = document.querySelector("#answer_button");
        answer_button.addEventListener("click", () => {
          answer.style.display = "none";
          document.querySelector("html").classList.remove("overlay");
          document.querySelector("html").style.overflow = "visible";
        });
      },
    });

    return false;
  });
});

buttonLink.forEach((item, index) => {
  item.addEventListener("click", function () {
    // Автоматическое заполнение информации о выбранном автомобиле.
    let automobiles = [];

    cardName.forEach((elem) => {
      automobiles.push(elem.innerHTML);
    });
    model.value = automobiles[index];
    // Раскрываем форму.
    formWrapper.style.display = "block";
    document.querySelector("html").classList.add("overlay");
    document.querySelector("html").style.overflow = "hidden";
  });
});

close.addEventListener("click", function (event) {
  event.preventDefault();
  formWrapper.style.display = "none";
  document.querySelector("html").style.overflow = "visible";
  document.querySelector("html").classList.remove("overlay");
});

// Мобильное меню.

// Гамбургер.
hamburger.addEventListener("click", () => {
  mobileMenu.style.right = "0";
  document.querySelector("html").classList.add("overlay");
  document.querySelector("html").style.overflow = "hidden";
});

// Кнопка закрытия мобильного меню.
mobileClose.addEventListener("click", () => {
  mobileMenu.style.right = "-100%";
  document.querySelector("html").style.overflow = "visible";
  document.querySelector("html").classList.remove("overlay");
});

// При нажатии на ссылки в мобильном меню, меню закрывается сама.
navMenuLinks.forEach((item)=>{
  item.addEventListener("click", () => {
    document.querySelector("html").style.overflow = "visible";
    document.querySelector("html").classList.remove("overlay");
    mobileMenu.style.right = "-100%";
  });
});
