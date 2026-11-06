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
    "Frontend and Backend Web Developer",
    "Telegram Bot Developer",
    "Reliable MVP Delivery Partner",
    "Problem Solver and Technology Enthusiast",
    "programmer and software developer"
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
   ABOUT IMAGE ON NAVIGATION CLICK
===================================================== */

const aboutSection =
    document.getElementById("about");

const aboutNavLink =
    document.querySelector(
        '.navigation .nav-link[href="#about"]'
    );


if (aboutSection && aboutNavLink) {

    navLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    if (link === aboutNavLink) {

                        // Show image when About is clicked
                        aboutSection.classList.add(
                            "show-about-photo"
                        );

                    } else {

                        // Hide image when another section is clicked
                        aboutSection.classList.remove(
                            "show-about-photo"
                        );
                    }
                }
            );
        }
    );
}



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
   PORTFOLIO SECTION NAVIGATION
===================================================== */

const allSections = document.querySelectorAll(
    ".main-content section[id]"
);

const mainContent = document.querySelector(".main-content");

const navLogo = document.querySelector(".nav-logo");


/* =====================================================
   SHOW ALL OR SELECTED SECTION
===================================================== */

function showSection(sectionId, updateAddress = true) {

    const selectedSection =
        document.getElementById(sectionId);

    // Make sure the selected section belongs to main content
    if (
        !mainContent ||
        !selectedSection ||
        !mainContent.contains(selectedSection) ||
        !selectedSection.matches("section[id]")
    ) {
        console.error("Portfolio section not found:", sectionId);
        return;
    }

    const isHome = sectionId === "home";


    // Home displays everything.
    // Other navigation links display one section.

    mainContent.classList.toggle(
        "show-all-sections",
        isHome
    );


    allSections.forEach(function (section) {

        section.classList.toggle(
            "active-section",
            !isHome && section === selectedSection
        );

        // Ensure selected sections can display their reveal animation
        if (isHome || section === selectedSection) {
            section.classList.add("show");
        }

    });


    // Update active navigation link

    navLinks.forEach(function (link) {

        const href = link.getAttribute("href");

        link.classList.toggle(
            "active",
            href === "#" + sectionId
        );

    });


    // About profile image

    if (aboutSection) {

        aboutSection.classList.toggle(
            "show-about-photo",
            sectionId === "about"
        );

    }


    // Update browser URL

    if (
        updateAddress &&
        window.location.hash !== "#" + sectionId
    ) {

        history.pushState(
            { sectionId: sectionId },
            "",
            "#" + sectionId
        );

    }


    // Return to the top

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   NAVIGATION CLICK EVENTS
===================================================== */

navLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const href = link.getAttribute("href");

        if (!href || !href.startsWith("#")) {
            return;
        }

        const sectionId = href.substring(1);

        const targetSection =
            document.getElementById(sectionId);

        if (
            !targetSection ||
            !mainContent.contains(targetSection)
        ) {
            return;
        }

        event.preventDefault();

        showSection(sectionId);

        closeMobileMenu();

    });

});


/* =====================================================
   WORKFLOW BUTTON - OPEN CONTACT SECTION
===================================================== */

document.querySelectorAll(".workflow-floating-cta").forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        showSection("thanks");

    });

});


/* =====================================================
   LOGO - SHOW COMPLETE PORTFOLIO
===================================================== */

if (navLogo) {

    navLogo.addEventListener("click", function (event) {

        event.preventDefault();

        showSection("home");

    });

}


/* =====================================================
   BROWSER BACK AND FORWARD
===================================================== */

window.addEventListener("popstate", function () {

    const sectionId =
        window.location.hash.substring(1) || "home";

    const targetSection =
        document.getElementById(sectionId);

    if (
        targetSection &&
        mainContent.contains(targetSection)
    ) {

        showSection(sectionId, false);

    } else {

        showSection("home", false);

    }

});


/* =====================================================
   INITIALIZE PORTFOLIO
===================================================== */

function initializePortfolio() {

    const initialSection =
        window.location.hash.substring(1) || "home";

    const targetSection =
        document.getElementById(initialSection);

    if (
        targetSection &&
        mainContent.contains(targetSection)
    ) {

        showSection(initialSection, false);

    } else {

        showSection("home", false);

    }

    updateMenuIcon();

}


if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializePortfolio
    );

} else {

    initializePortfolio();

}


/* =====================================================
   INITIALIZE MENU STATE
===================================================== */

updateMenuIcon();