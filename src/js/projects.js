import { throttle } from "./utils.js";
import { isMobile } from "./common.js";

let elements = {
  imageryElements: null,
  copyElements: null,
  heroButtons: null,
};

const initElements = () => {
  elements.copyElements = [...document.querySelectorAll("div.copy")];
  elements.imageryElements = [...document.querySelectorAll("div.imagery")];
  elements.heroButtons = [...document.querySelectorAll(".heroButton")];
};

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

const m_onCopyClick = () => {
  elements.copyElements.forEach((element) => {
    element.classList.toggle("open");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initElements();
  document.addEventListener("scroll", throttle(onScroll, 100));
  onScroll(); // Call once to set initial value

  elements.imageryElements.forEach(initImageryElement);

  if (isMobile.matches) {
    elements.copyElements.forEach((copyElement) => {
      copyElement.addEventListener("click", m_onCopyClick);
    });

    // Move the hero buttons so they blend with the right container
    elements.heroButtons.forEach((heroButton) => {
      heroButton.parentElement.before(heroButton);
    });
  }

  setInterval(autoScroll, autoScrollPeriod);
  console.debug("projects init complete");

});
