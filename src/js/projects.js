import { isMobile } from "./common.js";

let elements = {
  imageryElements: null,
  copyElements: null,
  heroButtons: null,
  articleElements: null,
  navElements: null,
  contentElement: null,
};

const initElements = () => {
  elements.copyElements = [...document.querySelectorAll("div.copy")];
  elements.imageryElements = [...document.querySelectorAll("div.imagery")];
  elements.heroButtons = [...document.querySelectorAll(".heroButton")];
  elements.articleElements = [...document.querySelectorAll("article")];
  elements.navElements = [...document.querySelectorAll("nav a")];
  elements.contentElement = document.querySelector("div.content");
};

let isAutoScrolling = true;

// ==== Settings ====
const autoScrollPixelsPerSecond = 100;
const autoScrollFPS = 60;
// ==================

const autoScrollPeriod = 1000 / autoScrollFPS;
const autoScrollPixelsPerFrame = autoScrollPixelsPerSecond / autoScrollFPS;

console.log(autoScrollPixelsPerFrame)

const d_autoScroll = () => {
  if (!isAutoScrolling) {
    return;
  }
  window.scrollBy(0, autoScrollPixelsPerFrame);
};

const m_autoScroll = () => {
  if (!isAutoScrolling) {
    return;
  }

  elements.contentElement.scrollBy(Math.ceil(autoScrollPixelsPerFrame / 2), 0);
};

const d_initImageryDragScroll = (el) => {
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
  activeNavElement.scrollIntoView({ behavior: "smooth" });
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
  articleIntersections.length &&
    setActiveArticle(articleIntersections[articleIntersections.length - 1]);
};

const m_onCopyClick = (event) => {
  event.target.classList.toggle("open");
};

const initInfiniteScroll = () => {
  const firstArticle = document.querySelector("article:first-of-type");
  const firstArticleClone = firstArticle.cloneNode(true);
  firstArticleClone.id = "__infiniteScrollFirstClone";
  firstArticleClone.dataset.original = firstArticle.id;
  const lastArticle = document.querySelector("article:last-of-type");
  const lastArticleClone = lastArticle.cloneNode(true);
  lastArticleClone.id = "__infiniteScrollLastClone";
  lastArticleClone.dataset.original = lastArticle.id;

  firstArticle.insertAdjacentElement("beforebegin", lastArticleClone);
  lastArticle.insertAdjacentElement("afterend", firstArticleClone);

  // If the page is loading with an anchor in the URL, it automatically moves
  // us to the right place. But if we're coming in to the plain URL we need
  // to shift ourselves downwards by the height of the clone article we just added
  // at the top.
  if (!window.location.hash.length) {
    firstArticle.scrollIntoView({
      behavior: "instant",
      block: "start",
      inline: "start",
    });
  }

  const onCloneIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id === lastArticleClone.id) {
          return lastArticle.scrollIntoView({
            behavior: "instant",
            block: "end",
            inline: "end",
          });
        }
        if (entry.target.id === firstArticleClone.id) {
          return firstArticle.scrollIntoView({
            behavior: "instant",
            block: "start",
            inline: "start",
          });
        }
      }
    });
  };

  const topEdgeObserver = new IntersectionObserver(onCloneIntersection, {
    rootMargin: "0px 0px -100% 0px",
  });
  const leftEdgeObserver = new IntersectionObserver(onCloneIntersection, {
    rootMargin: "0px -100% 0px 0px ",
  });
  topEdgeObserver.observe(firstArticleClone);
  leftEdgeObserver.observe(firstArticleClone);

  const bottomEdgeObserver = new IntersectionObserver(onCloneIntersection, {
    rootMargin: "-100% 0px 0px 0px",
  });
  const rightEdgeObserver = new IntersectionObserver(onCloneIntersection, {
    rootMargin: "0px  0px 0px -100%",
  });
  bottomEdgeObserver.observe(lastArticleClone);
  rightEdgeObserver.observe(lastArticleClone);
};

document.addEventListener("DOMContentLoaded", () => {
  initElements();

  const articleObserver = new IntersectionObserver(onIntersection, {
    rootMargin: "-30%",
  });
  elements.articleElements.forEach((article) => {
    articleObserver.observe(article);
  });

  if (isMobile.matches) {
    setInterval(m_autoScroll, autoScrollPeriod);

    elements.copyElements.forEach((copyElement) => {
      copyElement.addEventListener("click", m_onCopyClick);
    });

    // Move the hero buttons so they blend with the right container
    elements.heroButtons.forEach((heroButton) => {
      heroButton.parentElement.before(heroButton);
    });
  } else {
    setInterval(d_autoScroll, autoScrollPeriod);

    // No need for this on mobile since the horizontal scroll works automatically
    elements.imageryElements.forEach(d_initImageryDragScroll);
  }

  initInfiniteScroll();

  console.debug("projects init complete");
});
