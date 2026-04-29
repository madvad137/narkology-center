function showCategory(selector){
  try{
    const categoryBlock = document.querySelector(selector)
    if(categoryBlock){
      const categoryNames = categoryBlock.querySelectorAll('.category-name')
      const categoryItems = categoryBlock.querySelectorAll('.category-item')

      if(categoryNames.length && categoryItems.length){
        categoryNames.forEach((categoryNameItem) =>{
          categoryNameItem.addEventListener('click', () =>{
            const categoyItemDataCat = categoryNameItem.getAttribute('data-category')
            if(categoyItemDataCat =="all"){
              categoryItems.forEach((categoryItem) =>{
                categoryItem.classList.remove('hidden')
              })
            } else{
              categoryItems.forEach((categoryItem) =>{
                categoryItem.classList.add('hidden')

                const categoryItemCat = categoryItem.getAttribute('data-category')
                if(categoyItemDataCat === categoryItemCat){
                  categoryItem.classList.remove('hidden')
                }
              })
            }
            categoryNames.forEach((categoryNameItem) =>{
              categoryNameItem.classList.remove('active')
            })
            categoryNameItem.classList.add('active')
            console.log('asdsa')
          })
        })
      }
      console.log(categoryBlock)
    }
  } catch(e){
    console.log('произошла ошибка')
  }
}


class Calculator {
    constructor(e) {
        (this.calculatorContainer = document.querySelector(e)),
        (this.etap = 0),
        (this.calculatorEtapLinks = this.calculatorContainer.querySelectorAll(".calculator__etap")),
        (this.calculatorEtapTabs = this.calculatorContainer.querySelectorAll(".calculator__etapsTab")),
        this.initCalculator()
    }
    initCalculator() {
        this.calculatorEtapLinks.forEach( (e, l) => {
            e.classList.remove("active"),
            l == this.etap && e.classList.add("active")
        }
        ),
        this.calculatorEtapTabs.forEach( (e, l) => {
            e.classList.remove("active"),
            l == this.etap && e.classList.add("active");
            let n = e.querySelector(".calculator__nextBlock");
            n && n.addEventListener("click", this.goToNextEtap.bind(this));
            let a = e.querySelector(".calculator__prevBlock");
            a && a.addEventListener("click", this.goToPrevEtap.bind(this))
        }
        )
    }
    goToNextEtap() {
        let e = document.querySelectorAll('.calculator__etapsTab.active .calculator__checkboxBlock input[type="checkbox"]:checked')
          , l = document.querySelectorAll('.calculator__etapsTab.active .calculator__checkboxBlock input[type="radio"]:checked');
        if (e.length || l.length) {
            if ((this.etap++,
            this.etap > 4))
                return;
            this.calculatorEtapLinks.forEach( (e, l) => {
                l < this.etap ? (e.classList.add("completed"),
                e.classList.remove("active")) : l == this.etap && e.classList.add("active")
            }
            ),
            this.calculatorEtapTabs.forEach( (e, l) => {
                e.classList.remove("active"),
                l == this.etap && e.classList.add("active")
            }
            )
        }
    }
    goToPrevEtap() {
        this.etap--,
        !(this.etap < 0) && (this.calculatorEtapLinks.forEach( (e, l) => {
            l > this.etap ? (e.classList.remove("completed"),
            e.classList.remove("active")) : l == this.etap && (e.classList.add("active"),
            e.classList.remove("completed"))
        }
        ),
        this.calculatorEtapTabs.forEach( (e, l) => {
            e.classList.remove("active"),
            l == this.etap && e.classList.add("active")
        }
        ))
    }
}

function InitShowMoreItems(sectionContainer) {
  //Функция принимает контейнер (селектор) (весь блок где будет уже контейнер с элементами). Внутри контейнера должен быть блок showMore, а item внутри него должны быть show-item.
  //у showMore блока долен быть дата атрибут count с количеством показываемых элементов

  console.log(sectionContainer);
  if (sectionContainer) {
    const itemsContainer = sectionContainer.querySelector(".showMore");
    const viewCount = itemsContainer.dataset.count;
    const items = itemsContainer.querySelectorAll(".show-item");
    const moreBtn = sectionContainer.querySelector(".moreBtn");
    if (
      sectionContainer &&
      itemsContainer &&
      viewCount &&
      items.length &&
      moreBtn
    ) {
      if (items.length > viewCount) {
        items.forEach((item, index) => {
          if (index > viewCount - 1) {
            item.classList.add("hidden");
          }
        });

        moreBtn.addEventListener("click", () => {
          const hiddenItems =
            itemsContainer.querySelectorAll(".show-item.hidden");
          if (hiddenItems.length) {
            hiddenItems.forEach((hiddenItem, index) => {
              if (index < viewCount - 1) {
                hiddenItem.classList.remove("hidden");
              }
            });
          }
          const updateHiddenItems =
            itemsContainer.querySelectorAll(".show-item.hidden");
          if (!updateHiddenItems.length) {
            moreBtn.remove();
          }
        });
      } else {
        moreBtn.remove();
      }
    }
  }
}

function hideShowMaxContent(container, maxHeight) {
  //функция принимает контейнер с тестом (именно уже DOM элемент) и максимальную высоту.
  // ограничивает по высоте блок, и после текста добавляет кнопку показать еще (если необходимо)
  const textContainer = container;
  if (textContainer) {
    console.log(textContainer.scrollHeight)
    if (textContainer.clientHeight > maxHeight) {
      textContainer.setAttribute("style", `height:${maxHeight}px;`);
      const btnReadMore = document.createElement("button");
      btnReadMore.innerHTML = `<span>Читать полностью</span>`;
      btnReadMore.addEventListener("click", (e) => {
        btnReadMore.classList.toggle("opened");
        if (textContainer.classList.contains("opened")) {
          textContainer.setAttribute("style", `height:${maxHeight}px;`);
          btnReadMore.querySelector("span").innerHTML = "Читать полностью";
        } else {
          textContainer.setAttribute(
            "style",
            `height:${textContainer.scrollHeight}px;`
          );
          btnReadMore.querySelector("span").innerHTML = "Скрыть";
        }
        textContainer.classList.toggle("opened");
      });
      textContainer.insertAdjacentElement("afterend", btnReadMore);
    }
  }
}


function InitTabs(container) {
  //ищет внутри контейнера все элементы tab-item и tab-content. Если элементов поровну тогда активирует табы
  const tabContainer = document.querySelector(container);
  if (tabContainer) {
    const tabItems = tabContainer.querySelectorAll(".tab-item");
    const tabContents = tabContainer.querySelectorAll(".tab-content");

    if (
      tabContainer &&
      tabItems.length &&
      tabContents.length &&
      tabItems.length === tabContents.length
    ) {
      tabItems.forEach((tabItem, index) => {
        tabItem.addEventListener("click", (e) => {
          tabItems.forEach((item, index) => {
            item.classList.remove("active");
            tabContents[index].classList.remove("active");
          });
          tabItem.classList.add("active");
          tabContents[index].classList.add("active");
        });
      });
    }
  }
}
function InitFAQItems(FAQItems) {
  if (FAQItems.length) {
    FAQItems.forEach((question) => {
      question.addEventListener("click", () => {
        const questionBlock = question.querySelector(".question");
        const answerBlock = question.querySelector(".answer");
        answerBlock.addEventListener("click", (e) => {
          e.stopPropagation();
        });
        questionBlock.classList.toggle("opened");
        answerBlock.classList.toggle("opened");

        if (answerBlock.classList.contains("opened")) {
          answerBlock.setAttribute(
            "style",
            `height:${answerBlock.scrollHeight}px;`
          );
        } else {
          answerBlock.setAttribute("style", `height:0;`);
        }
      });
    });
  }
}

let scrollWidthFunc = () => {
  let scrollWidth = window.innerWidth - document.body.clientWidth;
  document.querySelector("html").style.paddingRight = scrollWidth + "px";
  //document.querySelector('header').style.paddingRight = scrollWidth + 'px';
};
// Popups
function popupClose(popupActive) {
  popupActive.classList.remove("open");
  setTimeout(() => {
    if (!popupActive.classList.contains("open")) {
      popupActive.classList.remove("active");
    }
  }, 400);
  document.body.classList.remove("lock");
  document.querySelector("html").style.paddingRight = 0;
  document.querySelector("html").classList.remove("lock");
  document.querySelector("header").removeAttribute("style");
}
const popupOpenBtns = document.querySelectorAll(".popup-btn");
const popups = document.querySelectorAll(".popup");
const originalTitlePopup2 =
  document.querySelector(".original-title")?.innerHTML;
const closePopupBtns = document.querySelectorAll(".close-popup-btn");
closePopupBtns.forEach(function (el) {
  el.addEventListener("click", function (e) {
    popupClose(e.target.closest(".popup"));
  });
});
popupOpenBtns.forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const path = e.currentTarget.dataset.path;
    const currentPopup = document.querySelector(`[data-target="${path}"]`);
    if (currentPopup) {
      popups.forEach(function (popup) {
        popupClose(popup);
        popup.addEventListener("click", function (e) {
          if (!e.target.closest(".popup__content")) {
            popupClose(e.target.closest(".popup"));
          }
        });
      });
      currentPopup.classList.add("active");
      setTimeout(() => {
        currentPopup.classList.add("open");
      }, 10);
      if (currentPopup.getAttribute("data-target") == "popup-change") {
        let originaTitle = currentPopup.querySelector(".original-title");
        if (el.classList.contains("change-item__btn")) {
          if (el.classList.contains("doctor__btn-js")) {
            let currentItem = el.closest(".change-item");
            let currentTitile = currentItem.querySelector(
              ".change-item__title",
            );
            originaTitle.innerHTML =
              "Записаться на приём к врачу: " + currentTitile.innerHTML;
          } else {
            if (el.classList.contains("change-item__btn_current")) {
              originaTitle.textContent = el.textContent;
            } else {
              let currentItem = el.closest(".change-item");
              let currentTitile = currentItem.querySelector(
                ".change-item__title",
              );
              originaTitle.innerHTML = currentTitile.innerHTML;
            }
          }
        } else {
          originaTitle.innerHTML = originalTitlePopup2;
        }
      }

      if (currentPopup.getAttribute("data-target") == "popup-jobs") {
        let currentItems = el.closest(".jobs__items");
        let originalText = currentPopup.querySelector(".jobs__inner_original");
        if (originalText && currentItems.querySelector(".jobs__inner")) {
          originalText.innerHTML =
            currentItems.querySelector(".jobs__inner").innerHTML;
        }
      }
      e.stopPropagation();
      scrollWidthFunc();
      document.querySelector("html").classList.add("lock");
    }
  });
});
// end popups

document.addEventListener("DOMContentLoaded", () => {
  Fancybox.bind("[data-fancybox]", {});
  if(document.querySelector("#calculator")){
    const calc = new Calculator("#calculator")
  }
  InitTabs(".header__nav-sublistContainer");
  InitTabs(".services");
  InitTabs(".gallery");
  InitTabs(".pageTabsblock");

  showCategory('.gallery-categoryblock')
  const gallerypabeblock = document.querySelector('.gallery-categoryblock')
  if(gallerypabeblock){
    InitShowMoreItems(gallerypabeblock)
  }

  const faqpageTabs = document.querySelectorAll('.faqpage__tab')
  if(faqpageTabs.length){
    faqpageTabs.forEach((faqTab) =>{
      InitShowMoreItems(faqTab)
    })
  }

   const articlepageTabs = document.querySelectorAll('.articlepage__tab')
  if(articlepageTabs.length){
    articlepageTabs.forEach((articlepageTab) =>{
      InitShowMoreItems(articlepageTab)
    })
  }

  const reviewspageTabs = document.querySelectorAll('.reviewspage-tab')
  if(reviewspageTabs.length){
    reviewspageTabs.forEach((reviewspageTab) =>{
      InitShowMoreItems(reviewspageTab)
    })
  }

  const faqs = document.querySelectorAll('.faq__item')
  InitFAQItems(faqs)


  const headerTop = document.querySelector(".header__top");
  const header__nav = document.querySelector(".header__nav");
  const mainTag = document.querySelector(".main");
  document.addEventListener("scroll", () => {
    if (
      document.body.getBoundingClientRect().y &&
      !headerTop.classList.contains("hidden") &&
      !header__nav.classList.contains("topnav") &&
      !mainTag.classList.contains("topPadding")
    ) {
      headerTop.classList.add("hidden");
      header__nav.classList.add("topnav");
      mainTag.classList.add("topPadding");
    } else if (
      !document.body.getBoundingClientRect().y &&
      headerTop.classList.contains("hidden") &&
      header__nav.classList.contains("topnav") &&
      mainTag.classList.contains("topPadding")
    ) {
      headerTop.classList.remove("hidden");
      header__nav.classList.remove("topnav");
      mainTag.classList.remove("topPadding");
    }
  });

  const introAdvantages1 = document.querySelector(
    ".intro__advantages-item.one",
  );
  const introAdvantages2 = document.querySelector(
    ".intro__advantages-item.four",
  );
  const intro = document.querySelector(".intro");

  function isSecondHalf(el) {
    const rect = el.getBoundingClientRect();
    const elementHalf = rect.top + rect.height / 2;

    return elementHalf <= window.innerHeight / 2;
  }
  function isTopReached(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= 0;
  }

  function isElementEndVisible(el) {
    const rect = el.getBoundingClientRect();
    return rect.bottom + 200 <= window.innerHeight;
  }

  function handleScroll() {
    if (isTopReached(intro)) {
      introAdvantages1.classList.remove("bottom");
      introAdvantages2.classList.remove("bottom");
      introAdvantages1.classList.remove("middle");
      introAdvantages2.classList.remove("middle");
    }

    if (isSecondHalf(intro)) {
      introAdvantages1.classList.remove("bottom");
      introAdvantages2.classList.remove("bottom");
      introAdvantages1.classList.add("middle");
      introAdvantages2.classList.add("middle");;
    }

    if (isElementEndVisible(intro)) {
      introAdvantages1.classList.remove("middle");
      introAdvantages2.classList.remove("middle");
      introAdvantages1.classList.add("bottom");
      introAdvantages2.classList.add("bottom");
    }
  }

  if (introAdvantages1 && introAdvantages2 && intro) {
    window.addEventListener("scroll", handleScroll);
  }

  const headerBurger = document.querySelector(".header__burger");
  const headerNav = document.querySelector(".header__nav");

  if (headerBurger && headerNav) {
    headerBurger.addEventListener("click", () => {
      headerBurger.classList.toggle("active");
      headerNav.classList.toggle("active");
    });
  }



  const mobileButtonTabs = document.querySelectorAll('.maintab-mobile-name')
  if(mobileButtonTabs.length){
    mobileButtonTabs.forEach((item) =>{
      item.addEventListener('click', () =>{
        const listContainer = item.closest('.services__tabscontainer')
        if(listContainer){
          const list = listContainer.querySelector('.maintab-container')
          if(list){
            list.classList.toggle('active')
            item.classList.toggle('active')
            const listItems = list.querySelectorAll('.maintab-item')

            if(listItems){
              listItems.forEach((listItem) =>{
                listItem.addEventListener('click', () =>{
                  item.querySelector("span").innerHTML = listItem.innerHTML
                  list.classList.remove('active')
                })
              })
            }
          }
        }
      })
    })
  }

  const textblockContents = document.querySelectorAll(
    ".textWithInfo__info-list"
  );
  const textBlocksTitles = document.querySelectorAll(
    ".textblock h2, .textblock h3"
  );

  if (textblockContents.length && textBlocksTitles.length) {
    textBlocksTitles.forEach((title, index) => {
      title.setAttribute("id", `title-${index}`);
      textblockContents.forEach((list) => {
        const contentItem = document.createElement("li");
        contentItem.classList.add('textWithInfo__info-item')
        contentItem.innerHTML = `<a href="#title-${index}">${title.innerHTML}</a>`;
        list.appendChild(contentItem);
      });
    });
  }

  const anchors = document.querySelectorAll('a[href*="#"]');
  for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const blockID = anchor.getAttribute("href").substr(1);
      const targetElement = document.getElementById(blockID);

      if (targetElement) {
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset - 100;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  }

});

document.addEventListener("DOMContentLoaded", () => {
  const advantagesSlider = new Swiper(".intro__advantages", {
    slidesPerView: 1.1,
    spaceBetween: 10,
    breakpoints: {
      850: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1700: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });


  const doctorsSlider = new Swiper(".doctors__slider", {
    slidesPerView: 1.1,
    spaceBetween: 10,
    centeredSlides: true,
     initialSlide: 4,
     navigation: {
      nextEl: ".doctors-button.next",
      prevEl: ".doctors-button.prev",
    },
     pagination: {
      el: ".doctors .slider-pagination",
      type: "bullets",
    },
    breakpoints: {
      951: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1700: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });


    const rewiewSlider = new Swiper(".reviews__slider", {
    slidesPerView: 1.1,
    spaceBetween: 10,
    centeredSlides: true,
     initialSlide: 4,
     navigation: {
      nextEl: ".reviews-button.next",
      prevEl: ".reviews-button.prev",
    },
     pagination: {
      el: ".reviews .slider-pagination",
      type: "bullets",
    },
    breakpoints: {
      951: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 2.4,
        spaceBetween: 20,
      },
      1700: {
        slidesPerView: 3.4,
        spaceBetween: 20,
      },
    },
  });
  const actionSlider = new Swiper(".actions__slider", {
    slidesPerView: 1.1,
    spaceBetween: 10,
    breakpoints: {
      1100: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1700: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  const gallerySlider = new Swiper(".gallery__galleryslider", {
    slidesPerView: 1.1,
    spaceBetween: 10,
     navigation: {
      nextEl: ".gallery-button.next",
      prevEl: ".gallery-button.prev",
    },
     pagination: {
      el: ".gallery__pagination.slider-pagination",
      type: "bullets",
    },
    breakpoints: {
      951: {
        slidesPerView: 1,
        spaceBetween: 0,
        
      }
    },
  });


  const licensesSlider = new Swiper(".gallery__licensesSlider", {
    slidesPerView: 1.1,
    spaceBetween: 10,
    navigation: {
      nextEl: ".lic-button.next",
      prevEl: ".lic-button.prev",
    },
     pagination: {
      el: ".gallery__licensesSlider-pagination",
      type: "bullets",
    },
    breakpoints: {
      951: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1700: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });



  const moreArticlesSlider = new Swiper(".moreArticles__slider", {
    slidesPerView: 1.1,
    spaceBetween: 10,
    navigation: {
      nextEl: ".moreArticles-button.next",
      prevEl: ".moreArticles-button.prev",
    },
     pagination: {
      el: ".moreArticles-pagination",
      type: "bullets",
    },
    breakpoints: {
      951: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1700: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });

  const tarifSlider = new Swiper(".tarifs__slider", {
    slidesPerView: 1.1,
    spaceBetween: 10,
    breakpoints: {
      1100: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1700: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  const detoxTimeSlider = new Swiper(".detoxTime__slider", {
    slidesPerView: 1.1,
    spaceBetween: 10,
     pagination: {
      el: ".detoxTime__pagination",
      type: "bullets",
    },
    breakpoints: {
      1100: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1700: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });


   const allRewiewsTexts = document.querySelectorAll('.reviews__item .reviews__item-text')
  if(allRewiewsTexts.length){
    allRewiewsTexts.forEach((text) =>{
      hideShowMaxContent(text, 160)
    })
  }
});




