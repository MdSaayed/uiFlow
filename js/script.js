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