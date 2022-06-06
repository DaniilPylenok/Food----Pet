window.addEventListener("DOMContentLoaded", function () {
  //Табы в заголовке
  let tabsH = document.querySelectorAll(".tabheader__item"),
    tabsHContent = document.querySelectorAll(".tabcontent"),
    tabsHParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsHContent.forEach((item) => {
      item.style.display = 'none';
    });

    tabsH.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsHContent[i].style.display = 'block';
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
  const prevTab = document.querySelector('.offer__slider-prev');
  const nextTab = document.querySelector('.offer__slider-next');
  const tabxOfferContent = document.querySelectorAll('.offer__slide');
  const indexOffer = document.getElementById("current");

  function hideTabOfferImage() {
    tabxOfferContent.forEach((item) => {
      item.style.display = 'none';
    });
  }

  function showTabOfferContent(i = 0) {
    tabxOfferContent[i].style.display.remove = 'none';
    tabxOfferContent[i].style.display = 'block';
  }
  
  hideTabOfferImage();
  showTabOfferContent();
  let i = 0;
  nextTab.addEventListener('click', function () {
    if (i < 3 && i != 3) {
      i++;
      hideTabOfferImage();
      showTabOfferContent(i);
      indexOffer.textContent = `0${i + 1}`;
    }
  });

  prevTab.addEventListener('click', function () {
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

  const modalTrigger = document.querySelectorAll('[data-modal]');
  const modal = document.querySelector('.modal');
  const modalClosedBtn = document.querySelector('[data-closed]');

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function showModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
  }
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => showModal());
  });

  modalClosedBtn.addEventListener('click', () => closeModal());

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  //Классы для карточек

  class MenuCard {
    constructor(src, alt ,title , descr, price, parantSelector, ...classes){
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes= classes;
      this.parent = document.querySelector(parantSelector);
    }
    render () {
      const element = document.createElement('div');
      if (this.classes.length == 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
        
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> р/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  let MenuCardArr = [{},{},{}];

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    "780",
    '.menu .container'
  ).render();
  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    "1350",
    '.menu .container'
  ).render();
  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    "690",
    '.menu .container'
  ).render();

});
