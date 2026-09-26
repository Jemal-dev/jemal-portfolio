/* =====================================================
   JEMAL SEID PORTFOLIO
   JAVASCRIPT
===================================================== */


/* =====================================================
   TYPING ANIMATION
===================================================== */

const typingElement =
    document.getElementById("typing");

const typingWords = [
    "Web Developer",
    "Programmer",
    "Computer Science Student",
    "Software Developer",
    "Problem Solver"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeEffect() {

    if (!typingElement) {
        return;
    }

    const currentWord =
        typingWords[wordIndex];


    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (
            characterIndex ===
            currentWord.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1600
            );

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            deleting = false;

            wordIndex++;

            if (
                wordIndex >=
                typingWords.length
            ) {

                wordIndex = 0;
            }
        }
    }


    const speed =
        deleting ? 50 : 100;


    setTimeout(
        typeEffect,
        speed
    );
}


typeEffect();



/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const sidebar =
    document.getElementById("sidebar");

const navLinks =
    document.querySelectorAll(".nav-link");


/* =====================================================
   GET MENU ICON
===================================================== */

function getMenuIcon() {

    if (!menuButton) {
        return null;
    }

    return menuButton.querySelector("i");
}



/* =====================================================
   UPDATE MENU ICON
===================================================== */

function updateMenuIcon() {

    if (!menuButton) {
        return;
    }

    const icon =
        getMenuIcon();

    const isOpen =
        sidebar &&
        sidebar.classList.contains("mobile-open");


    if (icon) {

        if (isOpen) {

            icon.classList.remove(
                "fa-bars"
            );

            icon.classList.add(
                "fa-xmark"
            );

        } else {

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );
        }
    }


    menuButton.setAttribute(
        "aria-label",
        isOpen
            ? "Close menu"
            : "Open menu"
    );


    menuButton.setAttribute(
        "aria-expanded",
        isOpen
            ? "true"
            : "false"
    );
}



/* =====================================================
   OPEN / CLOSE MOBILE MENU
===================================================== */

function closeMobileMenu() {

    if (!sidebar) {
        return;
    }

    sidebar.classList.remove(
        "mobile-open"
    );

    updateMenuIcon();
}


function openMobileMenu() {

    if (!sidebar) {
        return;
    }

    sidebar.classList.add(
        "mobile-open"
    );

    updateMenuIcon();
}



/* =====================================================
   MOBILE MENU BUTTON
===================================================== */

if (
    menuButton &&
    sidebar
) {

    menuButton.addEventListener(
        "click",
        function () {

            const isOpen =
                sidebar.classList.contains(
                    "mobile-open"
                );


            if (isOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();
            }
        }
    );
}



/* =====================================================
   CLOSE MENU AFTER NAVIGATION
===================================================== */

navLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                closeMobileMenu();
            }
        );
    }
);



/* =====================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        if (
            !sidebar ||
            !menuButton
        ) {
            return;
        }


        const isMobile =
            window.innerWidth <= 768;


        if (!isMobile) {
            return;
        }


        const isMenuOpen =
            sidebar.classList.contains(
                "mobile-open"
            );


        if (!isMenuOpen) {
            return;
        }


        const clickedInsideSidebar =
            sidebar.contains(
                event.target
            );


        const clickedMenuButton =
            menuButton.contains(
                event.target
            );


        if (
            !clickedInsideSidebar &&
            !clickedMenuButton
        ) {

            closeMobileMenu();
        }
    }
);



/* =====================================================
   CLOSE MOBILE MENU WHEN RESIZING
   FROM MOBILE TO DESKTOP
===================================================== */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 768 &&
            sidebar
        ) {

            closeMobileMenu();
        }
    }
);



/* =====================================================
   REVEAL SECTIONS ON SCROLL
===================================================== */

const sections =
    document.querySelectorAll(
        ".content-section"
    );


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );
                        }
                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    sections.forEach(
        function (section) {

            revealObserver.observe(
                section
            );
        }
    );

} else {

    sections.forEach(
        function (section) {

            section.classList.add(
                "show"
            );
        }
    );
}



/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const allSections =
    document.querySelectorAll(
        "section[id]"
    );


function updateActiveNavigation() {

    if (!allSections.length) {
        return;
    }


    let currentSection = "";


    const scrollPosition =
        window.scrollY + 220;


    allSections.forEach(
        function (section) {

            const sectionTop =
                section.offsetTop;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {

                currentSection =
                    section.getAttribute(
                        "id"
                    );
            }
        }
    );


    /*
       If the user is at the very top,
       keep Home active.
    */

    if (
        window.scrollY < 100 &&
        document.getElementById("home")
    ) {

        currentSection = "home";
    }


    navLinks.forEach(
        function (link) {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute(
                    "href"
                );


            if (
                href ===
                "#" + currentSection
            ) {

                link.classList.add(
                    "active"
                );
            }
        }
    );
}



/* =====================================================
   SCROLL EVENTS
===================================================== */

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);



/* =====================================================
   INITIALIZE ACTIVE NAVIGATION
===================================================== */

window.addEventListener(
    "load",
    function () {

        updateActiveNavigation();

        updateMenuIcon();
    }
);



/* =====================================================
   INITIALIZE MENU STATE
===================================================== */

updateMenuIcon();