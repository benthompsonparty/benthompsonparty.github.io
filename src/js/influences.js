const isMobile = window.matchMedia("(orientation: portrait)");

let highestZ = 1000;

let elements = {
  centerImage: null,
  draggableElements: null,
  cursor: null,
};

const initElements = () => {
  elements.centerImage = document.querySelector(".centerMeOnLoad");
  elements.draggableElements = [...document.querySelectorAll("div#cloud > *")];
  elements.cursor = document.querySelector("#cursor");
};

// This requires the element to use relative positioning with
// vw and vh units for its top and left properties. We update these
// properties to move the elements from their original positions
// because it handles subsequent viewport changes better than
// using pixel offsets. It also leaves the transform property
// available for other uses.
const initDraggableElement = (element) => {
  const onMouseMove = (event) => {
    let vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0,
    );
    let vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0,
    );

    let moveX = event.movementX;
    let moveY = event.movementY;

    const container = element.parentElement;
    const {
      top: cTop,
      bottom: cBottom,
      left: cLeft,
      right: cRight,
    } = container.getBoundingClientRect();
    const { top, bottom, left, right } = element.getBoundingClientRect();

    const relativePositionTop = parseFloat(element.style.top || "0vh");
    const relativePositionLeft = parseFloat(element.style.left || "0vw");

    let relativePositionTopPx = (relativePositionTop / 100) * vh;
    let relativePositionLeftPx = (relativePositionLeft / 100) * vw;

    // Only update the transforms if the element would remain
    // within its container.
    if (top + moveY >= cTop && bottom + moveY <= cBottom) {
      relativePositionTopPx = relativePositionTopPx + moveY;
    }

    if (left + moveX >= cLeft && right + moveX <= cRight) {
      relativePositionLeftPx = relativePositionLeftPx + moveX;
    }

    element.style.top = `${(relativePositionTopPx / vh) * 100}vh`;
    element.style.left = `${(relativePositionLeftPx / vw) * 100}vw`;
  };

  element.onmousedown = () => {
    highestZ += 1;
    element.style.zIndex = highestZ;
    element.classList.add("dragging");
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", onMouseMove);
      element.classList.remove("dragging");
    });
  };

  element.ondragstart = () => false;
};

const wiggleAnimations = ["wiggle1", "wiggle2", "wiggle3"];

const addWiggleAnimation = (element) => {
  const animation =
    wiggleAnimations[Math.floor(Math.random() * wiggleAnimations.length)];
  const duration = 15 + Math.round(Math.random() * 30);
  element.style.animation = `${animation} ${duration}s infinite linear`;
};

const initCloudCursor = () => {
  window.addEventListener("mousemove", (event) => {
    elements.cursor.style.top = `${event.clientY}px`;
    elements.cursor.style.left = `${event.clientX}px`;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initElements();

  elements.draggableElements.forEach((element) => {
    const top = element.style.top || "0vh";
    const left = element.style.left || "0vw";

    if (
      top.substring(top.length - 2) === "vh" &&
      left.substring(left.length - 2) === "vw"
    ) {
      if (!isMobile.matches) {
        initDraggableElement(element);
      }
    } else {
      console.error(
        "Use vw and vh units for 'top' and 'left' style properties for draggable elements",
      );
    }
    addWiggleAnimation(element);
  });
  document.ondragstart = () => false;

  if (isMobile.matches) {
    const scrollToCenterImage = () => {
      elements.centerImage.scrollIntoView({ behavior: "smooth" });
    };
    elements.centerImage.addEventListener("load", scrollToCenterImage);
    if (elements.centerImage.complete) {
      scrollToCenterImage();
    }
  } else {
    initCloudCursor();
  }

  console.debug("influences init complete");
});
