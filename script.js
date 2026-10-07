document.addEventListener('DOMContentLoaded', function () {

    /* ================= SECTION ANIMATION ================= */
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });
    
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width;
                bar.style.width = width;
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.8 });

    skillBars.forEach(bar => {
        bar.dataset.width = bar.style.width;
        bar.style.width = '0';
        skillObserver.observe(bar);
    });


    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('Thank you for your message!');
            contactForm.reset();
        });
    }
});
// Open Resume
        function openResume() {
            window.open('https://docs.google.com/document/d/1yMQKSk45YNzZ8hWdpgQnJ5C6XvHnaGT_/edit?usp=sharing', '_blank');
        }

/* ================= PAGE SWITCH SYSTEM (DESKTOP) + SCROLL (MOBILE) ================= */

// ===== DESKTOP INITIAL STATE FIX =====
if (window.innerWidth >= 1024) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById("home").classList.add("active");
}

const loader = document.getElementById("page-loader");
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

function isDesktop() {
    return window.innerWidth >= 1024;
}

navLinks.forEach(link => {
    link.addEventListener("click", e => {

        const targetId = link.getAttribute("href").replace("#", "");
        const targetPage = document.getElementById(targetId);
        if (!targetPage) return;

        if (!isDesktop()) return; // mobile = normal scroll

        /* ================= DESKTOP ================= */
        e.preventDefault();
        loader.classList.add("active");

        setTimeout(() => {
            pages.forEach(p => p.classList.remove("active"));
            targetPage.classList.add("active");

            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            window.scrollTo(0, 0);
            loader.classList.remove("active");
        }, 400);
    });
});

// Ensure only HOME is visible on mobile initially
if (window.innerWidth < 1024) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById("home").classList.add("active");
}


/* ================= TYPEWRITER ================= */
const roles = [
    "B.Tech CSE",
    "Web Developer",
    "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;
const typingEl = document.getElementById("typing-text");

function typeEffect() {
    const role = roles[roleIndex];

    typingEl.textContent = deleting
        ? role.slice(0, --charIndex)
        : role.slice(0, ++charIndex);

    if (!deleting && charIndex === role.length) {
        setTimeout(() => deleting = true, 1200);
    }

    if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeEffect, deleting ? 60 : 120);
}
typeEffect();

/* ================= MOBILE MENU ================= */

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

hamburger.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    document.body.classList.add("menu-open");
});

closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
});

mobileLinks.forEach(link => {
    link.addEventListener("click", () => {

        const targetId = link.getAttribute("href").replace("#", "");
        const targetPage = document.getElementById(targetId);

        if (targetPage) {
            document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
            targetPage.classList.add("active");
        }

        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
    });
});




