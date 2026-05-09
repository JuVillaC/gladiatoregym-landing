const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const revealEls = document.querySelectorAll(".reveal");
const counterEls = document.querySelectorAll("[data-count]");
const heroBgs = document.querySelectorAll(".hero-bg");

let heroIndex = 0;

function rotateHero() {
    heroBgs.forEach((bg, index) => {
        bg.classList.toggle("active", index === heroIndex);
    });
    heroIndex = (heroIndex + 1) % heroBgs.length;
}

setInterval(rotateHero, 4500);
rotateHero();

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
});

menuToggle?.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active");
    const isOpen =
        navLinks.classList.contains("open");
    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );
});

navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

function animateCount(el, target) {
    const duration = 1500;
    const start = 0;
    const startTime = performance.now();

    function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(start + (target - start) * (1 - Math.pow(1 - progress, 3)));
        el.textContent = value.toLocaleString("es-CL");
        if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count || 0);
        animateCount(el, target);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));

/* ========================================= */
/* MODAL PLANES */
/* ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const plansModal =
        document.getElementById("plansModal");

    const closeModal =
        document.getElementById("closeModal");

    const openButtons =
        document.querySelectorAll(".open-plans-modal");

    if (!plansModal) return;

    /* ABRIR MODAL */

    openButtons.forEach(button => {

        button.addEventListener("click", () => {

        plansModal.classList.add("active");

        document.body.style.overflow = "hidden";

        });

    });

    /* CERRAR CON X */

    closeModal?.addEventListener("click", () => {

        plansModal.classList.remove("active");

        document.body.style.overflow = "";

    });

    /* CERRAR OVERLAY */

    plansModal.addEventListener("click", (e) => {

        if (
        e.target.classList.contains(
            "plans-modal-overlay"
        )
        ) {

        plansModal.classList.remove("active");

        document.body.style.overflow = "";

        }

    });

    /* ESC */

    document.addEventListener("keydown", (e) => {

        if (
        e.key === "Escape" &&
        plansModal.classList.contains("active")
        ) {

        plansModal.classList.remove("active");

        document.body.style.overflow = "";

        }

    });
});