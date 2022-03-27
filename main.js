'use strict'

// Navbar Dynamic
const navi = document.querySelector('.navi__menu');

const sectionIds = ['#top', '#tracklist', '#credit' ];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-href="${id}"]`));

let selectedNavIndex = 0; 
let selectedNavItem = navItems[0];

const topTitle = document.querySelector('.top__title');
const topDescription = document.querySelector('.top__description');
setTimeout(() => { topTitle.classList.add("visible")},10);
setTimeout(() => { topDescription.classList.add("visible")},600);

function selectNavItem(selected)
{
    selectedNavItem.classList.remove("is-active");
    selectedNavItem = selected;
    selectedNavItem.classList.add("is-active");
}

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth', block:"center" });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

navi.addEventListener('click', (event) => {
    const target = event.target;
    const href = target.dataset.href;
    if (href == null)
        return;
    scrollIntoView(href);
})

let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
}

const trackItem = document.querySelectorAll('.tracklist__item');
const tracklistText = document.querySelector('.tracklist__text');
const creditText = document.querySelector('.credit__text');
let sectionCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            if (entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex = index - 1;
            }
        }
    });
}

let listCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    })
}

let sectionObserver = new IntersectionObserver(sectionCallback, options);
let listObserver = new IntersectionObserver(listCallback, options);
sections.forEach((item) => {
    sectionObserver.observe(item);
});

listObserver.observe(tracklistText);
trackItem.forEach((item) => {
    listObserver.observe(item);
})

document.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if (window.scrollY + window.innerHeight === document.body.clientHeight) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});