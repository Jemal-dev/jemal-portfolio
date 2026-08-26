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


if (
    menuButton &&
    sidebar
) {

    menuButton.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle(
                "mobile-open"
            );


            const icon =
                menuButton.querySelector("i");


            if (
                sidebar.classList.contains(
                    "mobile-open"
                )
            ) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Close menu"
                );

            } else {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Open menu"
                );
            }
        }
    );
}



/* =====================================================
   CLOSE MOBILE MENU
   AFTER CLICKING NAVIGATION
===================================================== */

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


navLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                if (sidebar) {

                    sidebar.classList.remove(
                        "mobile-open"
                    );
                }


                if (menuButton) {

                    const icon =
                        menuButton.querySelector("i");


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );
                    }


                    menuButton.setAttribute(
                        "aria-label",
                        "Open menu"
                    );
                }
            }
        );
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

    let currentSection = "";


    allSections.forEach(
        function (section) {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute(
                        "id"
                    );
            }
        }
    );


    navLinks.forEach(
        function (link) {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href") ===
                "#" + currentSection
            ) {

                link.classList.add(
                    "active"
                );
            }
        }
    );
}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


window.addEventListener(
    "load",
    updateActiveNavigation
);
