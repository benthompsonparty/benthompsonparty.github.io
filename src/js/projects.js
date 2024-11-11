import { isMobile } from "./common.js";

let elements = {
  imageryElements: null,
  copyElements: null,
  heroButtons: null,
  articleElements: null,
  navElements: null,
  contentElement: null,
  firstArticle: null,
  lastArticle: null,
};

const initElements = () => {
  elements.copyElements = [...document.querySelectorAll("div.copy")];
  elements.imageryElements = [...document.querySelectorAll("div.imagery")];
  elements.heroButtons = [...document.querySelectorAll(".heroButton")];
  elements.articleElements = [...document.querySelectorAll("article")];
  elements.navElements = [...document.querySelectorAll("nav a")];
  elements.contentElement = document.querySelector("div.content");
  elements.firstArticle = document.querySelector("article:first-of-type");
  elements.lastArticle = document.querySelector("article:last-of-type");
};

let isAutoScrolling = true;

// ==== Settings ====
// Set to zero pixels per second to turn off autoscroll
const d_autoScrollPixelsPerSecond = 40;
const m_autoScrollPixelsPerSecond = 0;
// ==================

const _d_autoScrollPeriodMs = 1000 / d_autoScrollPixelsPerSecond;
const _m_autoScrollPeriodMs = 1000 / m_autoScrollPixelsPerSecond;

let _autoScrollLastFrame = 0;

const d_autoScroll = () => {
  const _d_autoScrollCb = (timestamp) => {
    if (
      isAutoScrolling &&
      timestamp - _autoScrollLastFrame > _d_autoScrollPeriodMs
    ) {
      _autoScrollLastFrame = timestamp;
      window.scrollBy(0, 1);
    }

    requestAnimationFrame(_d_autoScrollCb);
  };

  requestAnimationFrame(_d_autoScrollCb);
};

const m_autoScroll = () => {
  const _m_autoScrollCb = (timestamp) => {
    if (!isAutoScrolling) {
      return;
    }
    if (timestamp - _autoScrollLastFrame > _m_autoScrollPeriodMs) {
      _autoScrollLastFrame = timestamp;

      elements.contentElement.scrollBy(1, 0);
    }

    requestAnimationFrame(_m_autoScrollCb);
  };

  requestAnimationFrame(_m_autoScrollCb);
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

const onCloneIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const clone = entry.target;
      return elements[clone.dataset.original].scrollIntoView({
        behavior: "instant",
        block: clone.dataset.scrollPos,
        inline: clone.dataset.scrollPos,
      });
    }
  });
};

const initInfiniteScroll = () => {
  const firstArticleClone = elements.firstArticle.cloneNode(true);
  firstArticleClone.id = "__infiniteScrollFirstClone";
  firstArticleClone.dataset.original = "firstArticle";
  firstArticleClone.dataset.scrollPos = "start";
  const lastArticleClone = elements.lastArticle.cloneNode(true);
  lastArticleClone.id = "__infiniteScrollLastClone";
  lastArticleClone.dataset.original = "lastArticle";
  lastArticleClone.dataset.scrollPos = "end";

  elements.firstArticle.insertAdjacentElement("beforebegin", lastArticleClone);
  elements.lastArticle.insertAdjacentElement("afterend", firstArticleClone);

  // If the page is loading with an anchor in the URL, it automatically moves
  // us to the right place. But if we're coming in to the plain URL we need
  // to shift ourselves downwards by the height of the clone article we just added
  // at the top.
  if (!window.location.hash.length) {
    elements.firstArticle.scrollIntoView({
      behavior: "instant",
      block: "start",
      inline: "start",
    });
  }

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

const initAutoScroll = () => {
  if (isMobile.matches) {
    m_autoScrollPixelsPerSecond && m_autoScroll();
  } else {
    d_autoScrollPixelsPerSecond && d_autoScroll();
  }
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
    elements.copyElements.forEach((copyElement) => {
      copyElement.addEventListener("click", m_onCopyClick);
    });

    // Move the hero buttons so they blend with the right container
    elements.heroButtons.forEach((heroButton) => {
      heroButton.parentElement.before(heroButton);
    });
  } else {
    // No need for this on mobile since the horizontal scroll works automatically
    elements.imageryElements.forEach(d_initImageryDragScroll);
  }

  initInfiniteScroll();
  initAutoScroll();

  console.debug("projects init complete");
});
