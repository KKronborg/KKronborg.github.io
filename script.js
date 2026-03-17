const storageKey = "sf-crime-theme";
const body = document.body;

function setTheme(mode) {
    body.classList.toggle("light-mode", mode === "light");
    const toggle = document.querySelector("[data-theme-toggle]");

    if (toggle) {
        toggle.textContent = mode === "light" ? "Dark Mode" : "Light Mode";
        toggle.setAttribute("aria-pressed", String(mode === "light"));
    }
}

function initTheme() {
    const saved = localStorage.getItem(storageKey);
    const mode = saved === "light" ? "light" : "dark";
    setTheme(mode);
}

function toggleMode() {
    const nextMode = body.classList.contains("light-mode") ? "dark" : "light";
    localStorage.setItem(storageKey, nextMode);
    setTheme(nextMode);
}

function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");

    if (!items.length) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.16
    });

    items.forEach((item) => observer.observe(item));
}

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initReveal();

    const toggle = document.querySelector("[data-theme-toggle]");

    if (toggle) {
        toggle.addEventListener("click", toggleMode);
    }
});
