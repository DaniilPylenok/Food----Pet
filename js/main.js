window.addEventListener("DOMContentLoaded", function () {
  //Табы в заголовке
  let tabsH = document.querySelectorAll(".tabheader__item"),
    tabsHContent = document.querySelectorAll(".tabcontent"),
    tabsHParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsHContent.forEach((item) => {
      item.style.display = "none";
    });

    tabsH.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsHContent[i].style.display = "block";
    tabsH[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsHParent.addEventListener("click", function (event) {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabsH.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //Табы в предложении
  const prevTab = document.querySelector(".offer__slider-prev");
  const nextTab = document.querySelector(".offer__slider-next");
  const tabxOfferContent = document.querySelectorAll(".offer__slide");
  const indexOffer = document.getElementById("current");

  function hideTabOfferImage() {
    tabxOfferContent.forEach((item) => {
      item.style.display = "none";
    });
  }

  function showTabOfferContent(i = 0) {
    tabxOfferContent[i].style.display.remove = "none";
    tabxOfferContent[i].style.display = "block";
  }

  hideTabOfferImage();
  showTabOfferContent();
  let i = 0;
  nextTab.addEventListener("click", function () {
    if (i < 3 && i != 3) {
      i++;
      hideTabOfferImage();
      showTabOfferContent(i);
      indexOffer.textContent = `0${i + 1}`;
    }
  });

  prevTab.addEventListener("click", function () {
    if (i > 0 && i < 4) {
      i--;
      hideTabOfferImage();
      showTabOfferContent(i);
      indexOffer.textContent = `0${i + 1}`;
    }
  });

  //Таймер

  const deadline = "2022-07-12";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    if (t <= 0) {
      const promotion = document.querySelector(".promotion");
      promotion.innerHTML = "";
    }

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = t.days;
      hours.innerHTML = t.hours;
      minutes.innerHTML = t.minutes;
      seconds.innerHTML = t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  //Модальное окно

  const modalTrigger = document.querySelectorAll("[data-modal]");
  const modal = document.querySelector(".modal");
  const modalClosedBtn = document.querySelector("[data-closed]");

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  function showModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
  }
  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => showModal());
  });

  modalClosedBtn.addEventListener("click", () => closeModal());

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(showModal, 300000);
  // Изменил значение, чтобы не отвлекало

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      showModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);

  // Используем классы для создание карточек меню

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
              <img src=${this.src} alt=${this.alt}>
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
              </div>
          `;
      this.parent.append(element);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    25,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    34,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    48,
    ".menu .container"
  ).render();

  // Forms

  const forms = document.querySelectorAll("form");
  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
              display: block;
              margin: 0 auto;
          `;
      form.insertAdjacentElement("afterend", statusMessage);

      const request = new XMLHttpRequest();
      request.open("POST", "server.php");
      request.setRequestHeader(
        "Content-type",
        "application/json; charset=utf-8"
      );
      const formData = new FormData(form);

      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      const json = JSON.stringify(object);

      request.send(json);

      request.addEventListener("load", () => {
        if (request.status === 200) {
          console.log(request.response);
          showThanksModal(message.success);
          statusMessage.remove();
          form.reset();
        } else {
          showThanksModal(message.failure);
        }
      });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    showModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
          <div class="modal__content">
              <div class="modal__close" data-close>×</div>
              <div class="modal__title">${message}</div>
          </div>
      `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }
});
