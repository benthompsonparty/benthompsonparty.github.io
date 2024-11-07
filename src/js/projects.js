import { isMobile } from "./common.js";

let elements = {
  imageryElements: null,
  copyElements: null,
  heroButtons: null,
  articleElements: null,
  navElements: null,
};

const initElements = () => {
  elements.copyElements = [...document.querySelectorAll("div.copy")];
  elements.imageryElements = [...document.querySelectorAll("div.imagery")];
  elements.heroButtons = [...document.querySelectorAll(".heroButton")];
  elements.articleElements = [...document.querySelectorAll("article")];
  elements.navElements = [...document.querySelectorAll("nav a")];
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

const setActiveArticle = (articleId) => {
  elements.navElements.forEach((element) => element.classList.remove("active"));
  const hrefOfNavElement = `#${articleId}`;
  const activeNavElement = document.querySelector(
    `a[href='${hrefOfNavElement}']`,
  );
  activeNavElement.classList.add("active");
};

let articleIntersections = [];

const onIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      articleIntersections.push(entry.target.id);
    } else {
      articleIntersections = articleIntersections.filter(
        (id) => id !== entry.target.id,
      );
    }
  });
  setActiveArticle(articleIntersections[articleIntersections.length - 1]);
};

const m_onCopyClick = (event) => {
  event.target.classList.toggle("open");
};

document.addEventListener("DOMContentLoaded", () => {
  initElements();

  const articleObserver = new IntersectionObserver(onIntersection, {
    rootMargin: "-30%",
  });
  elements.articleElements.forEach((article) => {
    articleObserver.observe(article);
  });

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
