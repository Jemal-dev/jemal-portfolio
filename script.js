/* ========================================
   MOBILE NAVIGATION
======================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


/* ========================================
   CLOSE MOBILE MENU
   WHEN A LINK IS CLICKED
======================================== */

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


/* ========================================
   HEADER SCROLL EFFECT
======================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background =
            "rgba(10, 10, 15, 0.95)";

    } else {

        header.style.background =
            "rgba(10, 10, 15, 0.75)";

    }

});


/* ========================================
   REVEAL SECTIONS ON SCROLL
======================================== */

const sections = document.querySelectorAll(".section");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.15
    }
);


sections.forEach((section) => {

    revealObserver.observe(section);

});


/* ========================================
   ACTIVE NAVIGATION LINK
======================================== */

const allSections =
    document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    allSections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});