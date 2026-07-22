(() => {
  const header = document.querySelector("[data-site-header]");

  if (!header) {
    return;
  }

  const menuToggle = header.querySelector("[data-menu-toggle]");
  const mobileMenu = header.querySelector("[data-mobile-menu]");
  const logos = document.querySelectorAll("[data-logo-spin]");
  const desktopQuery = window.matchMedia("(min-width: 841px)");
  let shouldSpinClockwise = true;

  const setScrolledState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  const closeMobileMenu = () => {
    if (!menuToggle || !mobileMenu) {
      return;
    }

    header.classList.remove("is-menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    mobileMenu.setAttribute("aria-hidden", "true");
    mobileMenu.setAttribute("inert", "");
  };

  const openMobileMenu = () => {
    if (!menuToggle || !mobileMenu) {
      return;
    }

    header.classList.add("is-menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    mobileMenu.setAttribute("aria-hidden", "false");
    mobileMenu.removeAttribute("inert");
  };

  const toggleMobileMenu = () => {
    if (header.classList.contains("is-menu-open")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  setScrolledState();
  window.addEventListener("scroll", setScrolledState, { passive: true });

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", toggleMobileMenu);

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    });

    desktopQuery.addEventListener("change", (event) => {
      if (event.matches) {
        closeMobileMenu();
      }
    });
  }

  logos.forEach((logo) => {
    logo.addEventListener("pointerenter", () => {
      logo.classList.remove("is-rotating-clockwise", "is-rotating-anticlockwise");
      logo.classList.add(
        shouldSpinClockwise ? "is-rotating-clockwise" : "is-rotating-anticlockwise"
      );
      shouldSpinClockwise = !shouldSpinClockwise;
    });

    logo.addEventListener("pointerleave", () => {
      logo.classList.remove("is-rotating-clockwise", "is-rotating-anticlockwise");
    });
  });
})();
