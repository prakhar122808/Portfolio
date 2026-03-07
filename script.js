const reveals = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

reveals.forEach((el) => {
  observer.observe(el);
});
reveals.forEach((el, index) => {
  el.style.transitionDelay = `${index * 0.1}s`;

  observer.observe(el);
});
