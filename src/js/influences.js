let highestZ = 1000;

const initDraggableElement = (element) => {
  const onMouseMove = (event) => {
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

    let tx = parseInt(element.dataset.tx) || 0;
    let ty = parseInt(element.dataset.ty) || 0;

    // Only update the transforms if the element would remain
    // within its container.
    if (top + moveY >= cTop && bottom + moveY <= cBottom) {
      ty = ty + moveY;
    }

    if (left + moveX >= cLeft && right + moveX <= cRight) {
      tx = tx + moveX;
    }

    element.style.transform = `translate(${tx}px, ${ty}px)`;
    element.dataset.tx = tx;
    element.dataset.ty = ty;
  };

  element.onmousedown = () => {
    highestZ += 1;
    element.style.zIndex = highestZ;
    element.classList.add("dragging")
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", onMouseMove);
      element.classList.remove("dragging")
    });
  };

  element.ondragstart = () => false;
};

document.addEventListener("DOMContentLoaded", () => {
  const draggableElements = [...document.querySelectorAll("div#cloud > *")];
  draggableElements.forEach(initDraggableElement);
  document.ondragstart = () => false;
  console.debug("influences init complete");
});
