export const fadeOut = (el) => {
  (function fade() {
    if ((el.style.opacity -= 0.05) <= 0) {
      el.classList.add("hidden");
    } else {
      requestAnimationFrame(fade);
    }
  })();
};

export const fadeIn = (el, targetOpacity) => {
  el.style.opacity = 0;
  el.classList.remove("hidden");
  (function fade() {
    let val = parseFloat(el.style.opacity);
    if (!((val += 0.05) > targetOpacity)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
};
