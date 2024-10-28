import { fadeIn, fadeOut } from "./utils.js";

let elements = {
  projectsButton: null,
  aboutButton: null,
  contactButton: null,
  about: null,
  contact: null,
  nav: null,
};

const initElements = () => {
  elements.projectsButton = document.querySelector("#projectsButton");
  elements.aboutButton = document.querySelector("#aboutButton");
  elements.contactButton = document.querySelector("#contactButton");
  elements.about = document.querySelector("#about");
  elements.contact = document.querySelector("#contact");
  elements.nav = document.querySelector("nav");
};

const isMobile = window.matchMedia("(orientation: portrait)");

const onProjectsClick = (event) => {
  if (isMobile.matches) {
    if (elements.projectsButton.classList.contains("secondary")) {
      elements.projectsButton.classList.add("primary");
      elements.projectsButton.classList.remove("secondary");
      elements.contactButton.classList.remove("primary");
      elements.contactButton.classList.add("secondary");
      elements.aboutButton.classList.remove("primary");
      elements.aboutButton.classList.add("secondary");
      fadeIn(elements.nav);
      fadeOut(elements.about);
      fadeOut(elements.contact);
    }
    event.preventDefault();
  }
};

const onAboutClick = () => {
  if (isMobile.matches) {
    if (elements.aboutButton.classList.contains("secondary")) {
      elements.projectsButton.classList.remove("primary");
      elements.projectsButton.classList.add("secondary");
      elements.contactButton.classList.remove("primary");
      elements.contactButton.classList.add("secondary");
      elements.aboutButton.classList.add("primary");
      elements.aboutButton.classList.remove("secondary");
      fadeIn(elements.about);
      fadeOut(elements.contact);
      fadeOut(elements.nav);
    }
    return;
  }
  if (elements.aboutButton.classList.contains("open")) {
    elements.aboutButton.classList.remove("open");
    elements.aboutButton.textContent = "About";
    fadeOut(elements.about);
  } else {
    elements.aboutButton.classList.add("open");
    elements.aboutButton.textContent = "Close";
    fadeIn(elements.about);
  }
};

const onContactClick = () => {
  if (isMobile.matches) {
    if (elements.contactButton.classList.contains("secondary")) {
      elements.projectsButton.classList.remove("primary");
      elements.projectsButton.classList.add("secondary");
      elements.aboutButton.classList.remove("primary");
      elements.aboutButton.classList.add("secondary");
      elements.contactButton.classList.add("primary");
      elements.contactButton.classList.remove("secondary");
      elements.aboutButton.classList.add("secondary");
      fadeIn(elements.contact);
      fadeOut(elements.about);
      fadeOut(elements.nav);
    }
    return;
  }
  if (elements.contactButton.classList.contains("open")) {
    elements.contactButton.classList.remove("open");
    elements.contactButton.textContent = "Contact";
    fadeOut(elements.contact);
  } else {
    elements.contactButton.classList.add("open");
    elements.contactButton.textContent = "Close";
    fadeIn(elements.contact);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initElements();
  elements.projectsButton.addEventListener("click", onProjectsClick);
  elements.aboutButton.addEventListener("click", onAboutClick);
  elements.contactButton.addEventListener("click", onContactClick);
  console.debug("common init complete");
});
