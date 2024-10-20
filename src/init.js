import { fadeIn, fadeOut } from "./utils.js";

let elements = {
  aboutLink: null,
  contactLink: null,
  about: null,
  contact: null,
};

const initElements = () => {
  elements.aboutLink = document.querySelector("#aboutLink");
  elements.contactLink = document.querySelector("#contactLink");
  elements.about = document.querySelector("#about");
  elements.contact = document.querySelector("#contact");
};

const onAboutClick = () => {
  if (elements.aboutLink.classList.contains("open")) {
    elements.aboutLink.classList.remove("open");
    fadeOut(elements.about);
  } else {
    elements.aboutLink.classList.add("open");
    fadeIn(elements.about, 0.8);
  }
};

const onContactClick = () => {
  if (elements.contactLink.classList.contains("open")) {
    elements.contactLink.classList.remove("open");
    fadeOut(elements.contact);
  } else {
    elements.contactLink.classList.add("open");
    fadeIn(elements.contact, 0.8);
  }
};

const init = () => {
  initElements();
  elements.aboutLink.addEventListener("click", onAboutClick);
  elements.contactLink.addEventListener("click", onContactClick);
  console.log("init complete");
};

document.addEventListener("DOMContentLoaded", init);
