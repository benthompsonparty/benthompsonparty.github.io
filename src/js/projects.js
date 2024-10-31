import { throttle } from "./utils.js";

let isAutoScrolling = true;

// ==== Settings ====
const autoScrollPixelsPerSecond = 100;
const autoScrollFPS = 60;
// ==================

const autoScrollPeriod = 1000 / autoScrollFPS;
const autoScrollPixelsPerFrame = autoScrollPixelsPerSecond / autoScrollFPS;

const autoScroll = () => {
  if (!isAutoScrolling) {
    return;
  }
  window.scrollBy(0, autoScrollPixelsPerFrame);
};

const initImageryElement = (el) => {
  let isDown = false;
  let lastJump;

  const imageryMouseDown = () => {
    isDown = true;
    el.style.cursor = "grabbing";
  };
  const imageryMouseUp = () => {
    isDown = false;
    el.style.cursor = "grab";
  };
  const imageryMouseEnter = () => {
    isAutoScrolling = false;
  };
  const imageryMouseLeave = () => {
    isAutoScrolling = true;
    isDown = false;
    el.style.cursor = "grab";
  };
  const imageryMouseMove = (event) => {
    if (!isDown) {
      return;
    }
    let moveY = event.movementY;
    lastJump = moveY;
    window.scrollBy(0, -moveY);
  };

  el.addEventListener("mousedown", imageryMouseDown);
  el.addEventListener("mouseup", imageryMouseUp);
  el.addEventListener("mouseover", imageryMouseEnter);
  el.addEventListener("mouseout", imageryMouseLeave);
  el.addEventListener("mousemove", imageryMouseMove);
  el.ondragstart = () => false;
};

const onScroll = () => {
  const projects = [...document.querySelectorAll("article")];
  const distancesToCenterOfViewport = projects.map((element) => {
    const { top, height } = element.getBoundingClientRect();
    return Math.abs(top + height / 2 - window.innerHeight / 2);
  });
  const closestDistance = Math.min(...distancesToCenterOfViewport);
  const indexOfClosestElement =
    distancesToCenterOfViewport.indexOf(closestDistance);
  const activeProject = projects[indexOfClosestElement];
  const hrefOfNavElement = `#${activeProject.id}`;
  const activeNavElement = document.querySelector(
    `a[href='${hrefOfNavElement}']`,
  );
  const allNavElements = [...document.querySelectorAll("nav a")];
  allNavElements.forEach((element) => element.classList.remove("active"));
  activeNavElement.classList.add("active");
};

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("scroll", throttle(onScroll, 100));
  onScroll(); // Call once to set initial value

  [...document.querySelectorAll("div.imagery")].forEach(initImageryElement);

  setInterval(autoScroll, autoScrollPeriod);
  console.debug("projects init complete");
});
