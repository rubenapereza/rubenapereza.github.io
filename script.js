document.addEventListener("DOMContentLoaded", () => {
  // Menú móvil
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu");

  const closeMenu = () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  menu
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));

  // Animación de aparición al hacer scroll
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  // Resaltar enlace activo del menú
  const links = [...menu.querySelectorAll("a:not(.menu-cta)")];
  const sections = links
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) =>
            l.classList.toggle(
              "active",
              l.getAttribute("href") === "#" + entry.target.id,
            ),
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  sections.forEach((s) => spy.observe(s));
});
