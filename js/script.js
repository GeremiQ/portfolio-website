(() => {
  const header = document.querySelector("[data-site-header]");

  if (!header) {
    return;
  }

  const menuToggle = header.querySelector("[data-menu-toggle]");
  const mobileMenu = header.querySelector("[data-mobile-menu]");
  const logos = document.querySelectorAll("[data-logo-spin]");
  const desktopQuery = window.matchMedia("(min-width: 841px)");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
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

  const initializeSplitSection = ({
    sectionSelector,
    revealSelector,
    visualSelector,
    imageSelector,
    tiltProperty,
  }) => {
    const section = document.querySelector(sectionSelector);

    if (!section) {
      return;
    }

    const revealElements = section.querySelectorAll(revealSelector);
    const imageVisual = section.querySelector(visualSelector);
    const image = section.querySelector(imageSelector);
    let imageTiltDirection = -1;

    if (imageVisual && image) {
      imageVisual.addEventListener("mouseenter", () => {
        if (prefersReducedMotion.matches) {
          return;
        }

        image.style.setProperty(tiltProperty, `${imageTiltDirection * 1.5}deg`);
        imageTiltDirection *= -1;
      });
    }

    if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    section.classList.add("is-reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10%",
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  };

  setScrolledState();
  window.addEventListener("scroll", setScrolledState, { passive: true });

  initializeSplitSection({
    sectionSelector: "[data-home-about]",
    revealSelector: "[data-about-reveal]",
    visualSelector: ".home-about__visual",
    imageSelector: ".home-about__image",
    tiltProperty: "--about-image-tilt",
  });

  initializeSplitSection({
    sectionSelector: "[data-home-contact-cta]",
    revealSelector: "[data-contact-reveal]",
    visualSelector: ".home-contact-cta__visual",
    imageSelector: ".home-contact-cta__image",
    tiltProperty: "--contact-image-tilt",
  });

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
