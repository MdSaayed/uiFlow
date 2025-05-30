"use strict";

// Active Menu Color on Desktop
const menuItems = document.querySelectorAll(".menu__item");
if (menuItems.length > 0) {
    const currentUrl = window.location.pathname.split("/").pop();
    menuItems.forEach((item) => {
        const link = item.querySelector("a");
        if (!link) return;
        const linkHref = link.getAttribute("href");
        if (linkHref === "#" || linkHref === "" || linkHref === null) return;
        if (linkHref === currentUrl) {
            item.classList.add("menu__item--active");
        }
        item.addEventListener("click", function () {
            menuItems.forEach((el) => el.classList.remove("menu__item--active"));
            this.classList.add("menu__item--active");
        });
    });
}

// Mobile Menu
const menuToggle = document.querySelector('.header__menu-toggle');
if (menuToggle) {
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.mobile-nav__close-btn');
    const body = document.body;

    const closeAllDropdowns = () => {
        document.querySelectorAll('.mobile-nav__item--has-dropdown').forEach(item => {
            item.classList.remove('active');
        });
    };

    menuToggle.addEventListener('click', () => {
        mobileNav.classList.add('active');
        body.classList.add('menu-open');
    });

    closeBtn.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        body.classList.remove('menu-open');
        closeAllDropdowns();
    });

    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target) && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            body.classList.remove('menu-open');
            closeAllDropdowns();
        }
    });

    document.querySelectorAll('.mobile-nav__item--has-dropdown').forEach(item => {
        const link = item.querySelector('.mobile-nav__link');
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            item.classList.toggle('active');
            const parentItem = item.closest('.mobile-nav__item--has-dropdown');
            if (parentItem) {
                parentItem.querySelectorAll('.mobile-nav__item--has-dropdown').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            } else {
                document.querySelectorAll('.mobile-nav__item--has-dropdown').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            }
        });
    });

    document.querySelectorAll('.mobile-nav__item:not(.mobile-nav__item--has-dropdown) .mobile-nav__link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}


// Dynamically set background images
document.addEventListener('DOMContentLoaded', function () {
    const bgDivs = document.querySelectorAll('[data-bg-img]');
    if (bgDivs.length > 0) {
        bgDivs.forEach(div => {
            const bgImg = div.getAttribute('data-bg-img');
            if (bgImg) {
                div.style.background = `url(${bgImg})`;
                div.style.backgroundSize = 'cover';
                div.style.backgroundPosition = 'center';
                div.style.zIndex = '999';
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
  if (typeof Swiper !== "undefined") {
    const caseStudyEl = document.querySelector('.case-study__gallery');
    
    if (caseStudyEl) {
      const caseStudy = new Swiper('.case-study__gallery', {
        slidesPerView: 1.5,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        breakpoints: {
          768: {
            slidesPerView: 2.5,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      });
    }
  } else {
    console.warn("Swiper is not defined. Skipping .case-study__gallery initialization.");
  }
});



document.addEventListener("DOMContentLoaded", function() {
  const faqItems = document.querySelectorAll(".faq__item");
  
  // Initialize first item as open
  const firstItem = faqItems[0];
  const firstAnswer = firstItem.querySelector(".faq__answer");
  firstAnswer.style.maxHeight = firstAnswer.scrollHeight + "px";
  
  faqItems.forEach(item => {
    const question = item.querySelector(".faq__question");
    const answer = item.querySelector(".faq__answer");
    
    question.addEventListener("click", () => {
      // Check if this item is already active
      const isActive = item.classList.contains("faq__item--active");
      
      // Close all items
      faqItems.forEach(el => {
        el.classList.remove("faq__item--active");
        const otherAnswer = el.querySelector(".faq__answer");
        otherAnswer.style.maxHeight = "0";
      });
      
      // Toggle current item if it wasn't active
      if (!isActive) {
        item.classList.add("faq__item--active");
        answer.style.maxHeight = answer.scrollHeight + "px";

      }
    });
  });
  
  // Handle window resize to adjust open item height
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const activeItem = document.querySelector(".faq__item--active");
      if (activeItem) {
        const activeAnswer = activeItem.querySelector(".faq__answer");
        activeAnswer.style.maxHeight = activeAnswer.scrollHeight + "px";
      }
    }, 250);
  });
});


var testimonialSlider = new Swiper(".testimonial__slider", {
  watchSlidesProgress: true,
  spaceBetween: 20,
  slidesPerView: 3.2,
  allowTouchMove: true,
  keyboard: {
    enabled: true,
  },
  loop:true,
  freeMode: true,
    breakpoints: {
    0: {
      slidesPerView: 1,
    },
    470: {
      slidesPerView: 1.2,
    },
    768: {
      slidesPerView: 2.2,
    },
    1024: {
      slidesPerView: 3.2,
    },
  }
});
