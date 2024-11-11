export const fadeOut = (el) => {
  (function fade() {
    if ((el.style.opacity -= 0.1) <= 0) {
      el.classList.add("hidden");
    } else {
      requestAnimationFrame(fade);
    }
  })();
};

export const fadeIn = (el, targetOpacity = 1) => {
  el.style.opacity = 0;
  el.classList.remove("hidden");
  (function fade() {
    let val = parseFloat(el.style.opacity);
    if (!((val += 0.1) > targetOpacity)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
};

export const throttle = (fn, delayMs) => {
  let time = Date.now();
  return function () {
    if (time + delayMs - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
};
