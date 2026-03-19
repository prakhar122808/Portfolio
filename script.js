/* ===========================
   SCROLL REVEAL
   =========================== */
const revealEls = document.querySelectorAll(
  ".reveal, .reveal-up, .reveal-scale, .reveal-left, .reveal-right"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => {
  revealObserver.observe(el);
});

/* ===========================
   NAVBAR SCROLL EFFECT
   =========================== */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}, { passive: true });

/* ===========================
   MOBILE MENU TOGGLE
   =========================== */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    const spans = menuToggle.querySelectorAll("span");
    const isOpen = navLinks.classList.contains("open");

    if (isOpen) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    }
  });

  // Close menu on link click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.querySelectorAll("span").forEach((s) => {
        s.style.transform = "";
        s.style.opacity = "";
      });
    });
  });
}

/* ===========================
   ACTIVE NAV LINK (index only)
   =========================== */
const sections = document.querySelectorAll("section[id], div[id]");
const navLinkItems = document.querySelectorAll(".navLinks a");

if (sections.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinkItems.forEach((a) => {
            a.style.color = "";
            if (a.getAttribute("href") === `#${id}`) {
              a.style.color = "var(--text)";
            }
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((s) => sectionObserver.observe(s));
}

/* ===========================
   CONTACT FORM FEEDBACK
   =========================== */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector("button[type='submit']");
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Message Sent!</span>';
    btn.style.background = "var(--emerald)";
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = "";
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

/* ===========================
   CURSOR TRAIL (subtle)
   =========================== */
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;
let rafId = null;

const trail = document.createElement("div");
trail.style.cssText = `
  position: fixed;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.5);
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  opacity: 0;
`;
document.body.appendChild(trail);

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  trail.style.opacity = "1";

  if (!rafId) {
    rafId = requestAnimationFrame(animateTrail);
  }
});

document.addEventListener("mouseleave", () => {
  trail.style.opacity = "0";
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.18;
  trailY += (mouseY - trailY) * 0.18;
  trail.style.left = trailX + "px";
  trail.style.top = trailY + "px";
  rafId = requestAnimationFrame(animateTrail);
}
